import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { auth } from "@/auth";
export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const session = await auth();
  let currentEmail:string;
  if (session) {
    currentEmail = session.user.email;
  } else {
    currentEmail = body.currentEmail;
  }

  const userExist = await prisma.user.findUnique({
    where: { email: currentEmail },
  });

  if (!userExist) {
    return NextResponse.json({ error: "کاربر پیدا نشد" });
  }

  if(userExist.emailVerified) {
    if(userExist.email === body.email) {
      return NextResponse.json({error: 'ایمیل شما قبلا تایید شده است'})
    }
  }

  const verificationToken = await generateVerificationToken(
    body.email,
    currentEmail
  );

  if (typeof verificationToken === "object" && "email" in verificationToken) {
    const sendEmail = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return NextResponse.json({ sendEmail: sendEmail });
  } else {
    // Handle the error case where verificationToken is a NextResponse object
    console.log(
      "Error generating verification token:",
      verificationToken.error
    );
    return NextResponse.json({ error: verificationToken.error });
  }
}
