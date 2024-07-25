import { Pool } from "@neondatabase/serverless";

export async function POST(request: Request) {
  const { user_id, category_id, is_interest } = await request.json();
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    if (is_interest) {
      const insertQuery = `
          INSERT INTO user_interests (user_id, category_id)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING;
        `;
      await pool.query(insertQuery, [user_id, category_id]);
    } else {
      const deleteQuery = `
          DELETE FROM user_interests
          WHERE user_id = $1 AND category_id = $2;
        `;
      await pool.query(deleteQuery, [user_id, category_id]);
    }
    const joinInterests = await pool.query(
      ` SELECT
  c.id AS category_id,
  c.name,
  CASE
    WHEN ui.user_id IS NOT NULL THEN TRUE
    ELSE FALSE
  END AS is_interest
FROM categories c
LEFT JOIN user_interests ui ON c.id = ui.category_id AND ui.user_id = $1;
    `,
      [user_id]
    );
    return Response.json(
      { message: "Interest changed", interests: joinInterests.rows },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
    return Response.json({ message: "Some error occured" }, { status: 500 });
  }
}
