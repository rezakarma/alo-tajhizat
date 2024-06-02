import { newPasswordSchema } from "@/schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../prisma/client";
import bcrypt from "bcryptjs";
import {
  getPasswordResetIdentifier,
  getPasswordResetTokenByToken,
} from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
export async function POST(request: NextRequest, respoonse: NextResponse) {
  const body = await request.json();
  const validation = newPasswordSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors);
  }

  if (!body.token) {
    return NextResponse.json({ error: "در این لینک توکن ارائه نشده است" });
  }

  const existingToken = await getPasswordResetTokenByToken(body.token);

  if (!existingToken) {
    return NextResponse.json({ error: "توکن  ارائه شده اشتباه است" });
  }

  const isExpire = new Date(existingToken.expireDate) < new Date();

  if (isExpire) {
    return NextResponse.json({
      error:
        "زمان استفاده از این لینک به پایان رسیده است لطفا مجددا درخواست نماید",
    });
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return NextResponse.json({ error: "کاربری با این ایمیل وجود ندارد" });
  }

  const existingIdentifier = await getPasswordResetIdentifier(body.identifier);

  if (!existingIdentifier) {
    return NextResponse.json({
      error:
        "این دستگاه درخواست  بازیابی رمز عبور نداده است، لطفا با همان دستگاه برای بازیابی رمز عبور تلاش کنید",
    });
  }

  if (existingIdentifier.identifier !== body.identifier) {
    return NextResponse.json({
      error:
        "دستگاه فعلی شما درخواست کننده ی بازیابی رمز عبور نبوده ، لطفا با همان دستگاهی که درخواست بازیابی داده اید لینک را باز کنید",
    });
  }

  const resetPasswordWithEmails = await prisma.resetPassword.findUnique({
    where: { id: existingIdentifier.id },
    include: {
      emails: true,
    },
  });

  const hasRelation = resetPasswordWithEmails.emails.some(
    (emailDoc) => emailDoc.id === existingToken.id
  );

  if(!hasRelation) {
    return NextResponse.json({error: 'خطایی رخ داده، لطفا با دستکاهیی که درخواست بازیابی داده اید اقدام به تغییر رمز عبور کنید یا اینکه مجداد درخواست  تغییر رمز عبور دهید'})
  }



  const hashedPassword = await bcrypt.hash(body.password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });

  await prisma.emailForResetPassword.delete({
    where: { email: existingUser.email },
  });

  return NextResponse.json({ success: "رمزعبور شما با موفقیت تغییر کرد" });
}
