import { NextRequest, NextResponse } from "next/server";
import { userExistCheckSchema } from "@/schema/index";
import prisma from "../../../prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body)
  const validation = userExistCheckSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  if (body.email) {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (user) {
      console.log("user  exist by email");

      return NextResponse.json({
        error: "این ایمیل قبلا ثبت نام کرده است",
        userExist: true,
      });
    }
  }

  if (body.phoneNumber) {
    const user = await prisma.user.findUnique({
      where: { phoneNumber: body.phoneNumber },
    });
    if (user) {
      console.log("user  exist by phone number");

      return NextResponse.json({
        error: "این شماره موبایل قبلا ثبت نام کرده است",
        userExist: true,
      });
    }
  }

  if (body.userName) {
    const user = await prisma.user.findUnique({
      where: { userName: body.userName },
    });
    if (user) {
      console.log("user  exist by name");

      return NextResponse.json({
        error: "این نام کاربری قبلا ثبت نام کرده است",
        userExist: true,
      });
    }
  }
  console.log("user not exist");
  return NextResponse.json({ success: "user not exist", userExist: false });
}
