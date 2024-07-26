import VerificationEmail from "public/email/VerificationEmail";
import { resend } from "~/lib/resend";

export async function sendVerificationEmail(
  email: string,
  fullname: string,
  verifyCode: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "ECOMMERCE <onboarding@resend.dev>",
      to: email,
      subject: "Verification code",
      react: VerificationEmail({ fullname, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Email sent to your Email",
    };
  } catch (error) {
    console.error("Failed to send verification Email", error);
    return {
      success: false,
      message: "Failed to send the verification Email",
    };
  }
}
