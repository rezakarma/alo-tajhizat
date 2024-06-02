import { forgetPasswordSchema } from "@/schema/index";
import { getUserByEmail } from "@/data/user";
import { NextRequest, NextResponse } from "next/server";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const validation = forgetPasswordSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const existingUser = await getUserByEmail(body.email);

  if (!existingUser) {
    console.log("user not exist");
    return NextResponse.json({
      success:
        "cاگر حسابی با ایمیل وارد شده یافت شود ایمیلی حاوی لینک بازیابی رمز عبور به ان ارسال میشود",
    });
  }

  try {
    const passwordResetToken = await generatePasswordResetToken(
      body.email,
      body.identifier,
      body.ipAddress
    );
    // console.log('here',passwordResetToken)

    if (typeof passwordResetToken === "object" && "email" in passwordResetToken) {
      
      const sendEmil =await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
        
      return NextResponse.json({
        success:
          "aاگر حسابی با ایمیل وارد شده یافت شود ایمیلی حاوی لینک بازیابی رمز عبور به ان ارسال میشود",
        });

    } else {
      // Handle the error case where verificationToken is a NextResponse object
      console.log(
        "Error generating reset token:",
        passwordResetToken.error
      );
      return NextResponse.json({error:passwordResetToken.error});
    }

    } catch (error) {
    console.log('here',error)
    return NextResponse.json({error : error.message});
  }

  return NextResponse.json({
    success:
      "bاگر حسابی با ایمیل وارد شده یافت شود ایمیلی حاوی لینک بازیابی رمز عبور به ان ارسال میشود",
  });
}
