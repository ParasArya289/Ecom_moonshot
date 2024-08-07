import { Pool } from "@neondatabase/serverless";

export async function POST(request: Request) {
  const { id, otp } = await request.json();
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const result = await pool.query(
      `
          SELECT * FROM users WHERE id = $1
        `,
      [id]
    );
    if (!result.rows[0]) {
      return Response.json({ message: "Invalid user id" }, { status: 404 });
    }
    if (result.rows[0].isverified === true) {
      return Response.json(
        { message: "Email already verified" },
        { status: 403 }
      );
    }
    if (result.rows[0].otp !== parseInt(otp)) {
      return Response.json({ message: "Otp does not match" }, { status: 401 });
    } else if (result.rows[0].otp === parseInt(otp)) {
      const insert = await pool.query(
        `
                UPDATE users SET isverified = $1 WHERE id = $2 RETURNING *
              `,
        [true, id]
      );
      return Response.json(
        { message: "Email verified", user: insert.rows[0] },
        { status: 200 }
      );
    }
  } catch (error) {
    return Response.json(
      { message: "Some error occured during verification" },
      { status: 500 }
    );
  }
}
