import { getVerificationTokenByEmail } from "@/data/verification-token";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../../prisma/client";
export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const token = uuidv4();
  const expireDate = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(body.email);

  if (existingToken) {
    const isExpire = existingToken.expireDate < new Date(Date.now());
    if (isExpire) {
      const updatedVerificationToken = await prisma.verificationToken.update({
        where: { id: existingToken.id },
        data: {
          token: token,
          expireDate: expireDate,
          countOfgenerateToken: {
            increment: 1,
          },
        },
      });
      return NextResponse.json({ success: "توکن جدید جنریت شد", updatedVerificationToken });
    } else {
      return NextResponse.json({
        success: "توکن قبلا جنریت شده و زمان باقی مانده دارد", existingToken
      });
    }

    //   const result = await prisma.verificationToken.delete({
    //     where: {
    //       id: existingToken.id,
    //     },
    //   });
    // }

    const verificationToken = await prisma.verificationToken.create({
      data: {
        email: body.email,
        token,
        expireDate,
      },
    });

    return NextResponse.json({ success: "true", verificationToken });
  } else {
    const verificationToken = await prisma.verificationToken.create({
      data: {
        email: body.email,
        token,
        expireDate,
      },
    });

    return NextResponse.json({ success: true, verificationToken });
  }
}
