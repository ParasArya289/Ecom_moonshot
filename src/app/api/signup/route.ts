// @ts-nocheck
import { Pool } from "@neondatabase/serverless";
import { sendVerificationEmail } from "~/helpers/sendVerificationMail";

export async function POST(request: Request) {
  let { fullname, email, password, isVerified = false } = await request.json();
  console.log(fullname);
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    // console.log(fullname,email,password,isVerified=false,otp)
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const foundUser = await pool.query(
      `
      SELECT * FROM users WHERE email = $1
    `,
      [email]
    );
    if (foundUser.rows[0]) {
      if (foundUser.rows[0].isverified === true) {
        return Response.json(
          {
            message: "Account exist by this email",
          },
          { status: 400 }
        );
      } else {
        const updateUser = await pool.query(
          `UPDATE users
          SET 
          fullname = $1,
  password = $2,
  otp = $3
WHERE email = $4
RETURNING *;`,
          [fullname, password, otp, email]
        );
        const emailResponse = await sendVerificationEmail(email, fullname, otp);
        if (!emailResponse.success) {
          return Response.json(
            {
              success: false,
              message: emailResponse.message,
            },
            { status: 500 }
          );
        }
        return Response.json(
          {
            success: true,
            message: "Please verify your email",
            userId: foundUser.rows[0].id,
          },
          { status: 200 }
        );
      }
    }
    const result = await pool.query(
      `
      INSERT INTO users (fullname, email, password, isVerified, otp)
      VALUES ($1, $2, $3, $4,$5)
      RETURNING *;
    `,
      [fullname, email, password, isVerified, otp]
    );
    const emailResponse = await sendVerificationEmail(email, fullname, otp);
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }
    return Response.json(
      {
        message: "Signup complete please verify your email",
        userId: result.rows[0].id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.message);
    return Response.json(
      { message: "Error occured while creating user" },
      { status: 500 }
    );
  }
}
