"use server";
import { NextRequest, NextResponse } from "next/server";
import { loginSchemaWithNumber } from "@/schema/index";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { db } from "@/lib/db";

export  const loginAction = async (value) => {
    console.log(value)
    // const body = await value.json();
  const validation = loginSchemaWithNumber.safeParse(value);
  if (!validation.success) {
    // return NextResponse.json(validation.error.errors, { status: 400 });
    return {error: 'invalid input'}
  }


  const user = await db.user.findUnique({
    where: { phoneNumber: value.phoneNumber },
    include:{
      profile:true
    }
  });

  if (!user) {
    return { error: "این کاربر در سیستم وجود ندارد" }
  }
  const { phoneNumber, password } = validation.data;
  const redirectUrl = user.profile ? DEFAULT_LOGIN_REDIRECT : '/profile'
  try {
    const reslut = await signIn("credentials", {
      phoneNumber,
      password,
      redirectTo: redirectUrl,
    });
console.log(reslut)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return ({ error: "اطالاعات وارد شده صحیح نمی باشد" });
        default:
          return ({ error: "یک چیزی مشکل دارد" });
      }
    }
    throw error;
  }
}