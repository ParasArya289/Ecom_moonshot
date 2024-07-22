// @ts-nocheck
import { Pool } from "@neondatabase/serverless";

export async function POST(request: Request) {
  let { fullname, email, password, isVerified = false } = await request.json();
  console.log(request.body);
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    // console.log(fullname,email,password,isVerified=false,otp)
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const result = await pool.query(
      `
      INSERT INTO users (fullname, email, password, isVerified, otp)
      VALUES ($1, $2, $3, $4,$5)
      RETURNING *;
    `,
      [fullname, email, password, isVerified, otp]
    );
    return Response.json(
      { message: "User Created", user: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error occured while creating user" },
      { status: 500 }
    );
  }
}
