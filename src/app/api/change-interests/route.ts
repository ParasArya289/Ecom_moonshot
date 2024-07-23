import { Pool } from "@neondatabase/serverless";

export async function POST(request: Request) {
  const { user_id, category_id,is_interest } = await request.json();
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
      `
        WITH user_interests AS (
        SELECT
          ui.user_id,
          c.id AS category_id,
          c.name,
          TRUE AS is_interest
        FROM user_interests ui
        JOIN categories c ON ui.category_id = c.id
        WHERE ui.user_id = $1
      ),
      remaining_interests AS (
        SELECT
          $1 AS user_id,
          c.id AS category_id,
          c.name,
          FALSE AS is_interest
        FROM categories c
        WHERE c.id NOT IN (SELECT category_id FROM user_interests WHERE user_id = $1)
      )
      SELECT * FROM user_interests
      UNION ALL
      SELECT * FROM remaining_interests;
      `,
      [user_id]
    );
    return Response.json(
      { message: "Interest changed", interests: joinInterests.rows },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: "Some error occured" }, { status: 500 });
  }
}
