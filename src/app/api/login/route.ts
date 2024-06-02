import { NextRequest, NextResponse } from "next/server";
import { loginSchemaWithNumber } from "@/schema/index";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import prisma  from '@/prisma/client'

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = loginSchemaWithNumber.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { phoneNumber: body.phoneNumber },
  });

  if (!user) {
    return NextResponse.json({ error: "Email does not exist!" });
  }
  const { phoneNumber, password } = validation.data;
  try {

    
    await signIn("credentials", {
      phoneNumber,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json({ error: "invalid credentials!" });
        default:
          return NextResponse.json({ error: "یک چیزی مشکل دارد" });
      }
    }
    throw error;
  }
}
