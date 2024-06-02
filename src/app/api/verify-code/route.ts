import { NextRequest, NextResponse } from "next/server";
import { verifyCodeSchema } from "@/schema/index";
import prisma from "../../../prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = verifyCodeSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  try {
    const phoneNumber = await prisma.phoneNumberForVerification.findUnique({
      where: { phoneNumber: body.phoneNumber },
    });

    const signupVerificationNumber =
      await prisma.signupVerificationNumber.findUnique({
        where: { identifier: body.identifier },
      });

    if (phoneNumber && signupVerificationNumber) {
      const signupVerificationNumberWithNumbers =
        await prisma.signupVerificationNumber.findUnique({
          where: { id: signupVerificationNumber.id },
          include: {
            phoneNumbers: true,
          },
        });
      const hasRelation = signupVerificationNumberWithNumbers.phoneNumbers.some(
        (phoneNumberDoc) => phoneNumberDoc.id === phoneNumber.id
      );
      if (hasRelation) {
        console.log(`has relastion `);
        const isExpire =
          phoneNumber.verificationData.expireDate < new Date(Date.now());

        if (isExpire) {
          return NextResponse.json({
            error: "کد منقضی شده است. دوباره درخواست کد دهید",
            message: "time is expire",
          });
        } else {
          const codeCheck = phoneNumber.verificationData.code === body.code;
          if (codeCheck) {
            await prisma.signupVerificationNumber.update({
              where: { id: signupVerificationNumber.id },
              data: {
                verifyPhoneNumber: true,
              },
            });
            return NextResponse.json({ success: "کد تایید صحیح است" });
          } else {
            return NextResponse.json({ error: "کد تایید صحیح نمی باشد" });
          }
        }
      } else {
        console.log(`dosent have relation`);
        return NextResponse.json({
          error: "خطایی رخ داده است لطفا ممجد تلاش کنید",
          reason: "not have relation betwenn user and phoneNumber",
        });
      }
    } else {
      return NextResponse.json({
        error: "مشکلی وجود دارد دوباره تلاش کنید",
        redirect: "signup",
      });
    }
  } catch (error) {
    return NextResponse.json({
      error: `مشکلی وجود دارد دوباره تلاش کنید : ${error}`,
      redirect: "signup",
    });
  }
}
