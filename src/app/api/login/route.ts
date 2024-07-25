// @ts-nocheck
import { Pool } from "@neondatabase/serverless";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  let { email, password } = await request.json();
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const result = await pool.query(
      `
      SELECT * FROM users WHERE email = $1
    `,
      [email]
    );
    if (!result.rows[0]) {
      return Response.json({ message: "Invalid Email" }, { status: 404 });
    }
    if (result.rows[0].password !== password) {
      return Response.json({ message: "Invalid Password" }, { status: 404 });
    }
    if (result.rows[0].isverified === false) {
      return Response.json(
        { message: "Please verify your email" },
        { status: 401 }
      );
    }
    cookies().set("session", result.rows[0]);
    // console.log(cookies().get('session'))
    return Response.json(
      { message: "Logged in", user: result.rows[0] },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error occured while login" },
      { status: 500 }
    );
  }
}
