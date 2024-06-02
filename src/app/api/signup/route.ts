import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "@/schema/index";
import bcrypt from "bcryptjs";
import prisma from "../../../prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = signupSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { error: "کاربر قبلا ثبت نام کرده است" },
      );
    }
    const signupIdentifier = await prisma.signupVerificationNumber.findUnique({
      where: { identifier: body.identifier },
    });

    if (!signupIdentifier) {
      return NextResponse.json({
        error: "خطایی رخ داده مجدد امتحان کنید",
        redirect: "signup",
        message: "identifier not found",
      });
    }

    if (!signupIdentifier.verifyPhoneNumber) {
      return NextResponse.json({
        error: "شماره موبایل تایید نشده است",
        message: "phone number not verified",
      });
    }
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        userName: body.userName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        password: hashedPassword,
      },
    });
    // send verificationemail
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const verificationToken = await fetch(`${baseUrl}/api/send-verification-email`,{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: newUser.email,
        currentEmail: newUser.email
      }),
    }) 
    console.log('this is result after signup for send email',verificationToken)
    return NextResponse.json({
      success: "حساب شما با موفقیت ساخته شد",
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      userName: newUser.userName,
      redirect:'login'
    });
  } catch (error) {
    return NextResponse.json({
      error: `خطایی رخ داده است : ${error}`,
      message: error,
    });
  }
}
