import { Pool } from "@neondatabase/serverless";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id = searchParams.get("user_id");
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
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
      { message: "Fetched interets", interests: joinInterests.rows },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "Some error occured" }, { status: 500 });
  }
}
