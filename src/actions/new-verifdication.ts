"use server";

import prisma from "../prisma/client";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { auth } from "@/auth";
export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  let session = await auth();
  if (!session) {
    return { error: "لطفا وارد اکانت خود شوید" };
  }
  if (!existingToken) {
    return { error: "توکن ارائه شده یافت نشد" };
  }

  const isExpire = new Date(existingToken.expireDate) < new Date();

  if (isExpire) {
    return { error: "لینک شما منقضی شده است ، مجددا درخواست کنید" };
  }

  const existingUser = await getUserByEmail(existingToken.currentEmail);

  if (!existingUser) {
    return { error: "ایمیل شما در سیستم موجود نیست" };
  }
  session = await auth();

  if (session.user.email !== existingToken.currentEmail) {
    return { error: "این ایمیل متعلق به حساب شما نیست" };
  }
  if (session.user.email !== existingToken.email) {
    const newEmailExist = await prisma.user.findUnique({
      where: { email: existingToken.email },
    });

    if (newEmailExist) {
      if (!newEmailExist.emailVerified) {
        await prisma.user.update({
            where: { id : newEmailExist.id },
            data: {
                email: ''
            }
        })
      } else {
        return { error: 'این ایمیل هم اکنون در سیستم وجود دارد' }
      }
    }
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: true,
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "ایمیل شما تایید شد!" };
};
