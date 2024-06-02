import { NextRequest, NextResponse } from "next/server";
import { signupVerificationSchema } from "@/schema/index";
import prisma from "../../../prisma/client";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = signupVerificationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const result = await fetch(`${baseUrl}/api/check-user-exist`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber: body.phoneNumber,
      email: body.email,
      userName: body.userName,
    }),
  });

  if (result.ok) {
    const response = await result.json();
    if (response.error) {
      return NextResponse.json({ error: response.error });
    }
  } else {
    return NextResponse.json({
      error: "خطایی رخ داده لطفا مجددا امتحان کنید",
    });
  }

  const phoneNumberExist = await prisma.phoneNumberForVerification?.findUnique({
    where: { phoneNumber: body.phoneNumber },
  });

  const signupVerificationExist =
    await prisma.signupVerificationNumber.findUnique({
      where: { identifier: body.identifier },
    });

  if (!signupVerificationExist) {
    const newSignupVerificationNumber =
      await prisma.signupVerificationNumber.create({
        data: {
          identifier: body.identifier,
          ipAddress: body.ipAddress,
          phoneNumbers: {
            connectOrCreate: [
              {
                create: {
                  phoneNumber: body.phoneNumber,
                  verificationData: {
                    code: crypto.randomInt(100_000, 1_000_000).toString(),
                    expireDate: new Date(new Date().getTime() + 120 * 1000),
                  },
                },
                where: { phoneNumber: body.phoneNumber },
              },
            ],
          },
        },
      });

    const signupVerificationNumber =
      await prisma.signupVerificationNumber.findUnique({
        where: { id: newSignupVerificationNumber.id },
        include: {
          phoneNumbers: true,
        },
      });

    const phoneNumber = await prisma.phoneNumberForVerification.findUnique({
      where: { phoneNumber: body.phoneNumber },
    });

    if (phoneNumber.countOfTryGetCodeForSignup > 10) {
      return NextResponse.json({
        error: `'بیش از حد تلاش کرده اید لطفا بعدا مجددا تلاش کنید'`,
        message: `reached limit of ${phoneNumber.phoneNumber} number`,
      });
    }

    // const hasRelation = await prisma.signupVerificationNumber.includes({
    //   where: {
    //     identifier: body.identifier,
    //   },
    //   phoneNumbers: {
    //     some: {
    //       id: phoneNumber.id,
    //     },
    //   },
    // });

    const hasRelation = signupVerificationNumber.phoneNumbers.some(
      (phoneNumberDoc) => phoneNumberDoc.id === phoneNumber.id
    );

    if (hasRelation) {
      console.log(`has relastion `);
      try {
        const isExpire =
      phoneNumber.verificationData.expireDate < new Date(Date.now());

    if (isExpire) {
      try {
        const updatedPhoneNumber =
          await prisma.phoneNumberForVerification.update({
            where: { id: phoneNumber.id },
            data: {
              verificationData: {
                code: crypto.randomInt(100_000, 1_000_000).toString(),
                expireDate: new Date(new Date().getTime() + 120 * 1000),
              },
              countOfTryGetCodeForSignup: {
                increment: 1
              }
                
            },
          });

        // call send sms api

        return NextResponse.json({
          success: "کد تایید به شماره شما ارسال شد",
          message: "code expire and re generate and send new sms",
          phoneNumber: updatedPhoneNumber.phoneNumber,
          expireDate: updatedPhoneNumber.verificationData.expireDate,
          status: 200,
        });
      } catch (error) {
        return NextResponse.json({
          error: `خطایی رخ داده است : ${error}`,
          message: error,
          status: error.status,
        });
      }
    } else {
      return NextResponse.json({
        success: "کد قبلا ارسال شده است لطفا ان را وارد کنید",
        message: "code expireDate not expire and have enough time not send sms",
        phoneNumber: phoneNumber.phoneNumber,
        expireDate: phoneNumber.verificationData.expireDate,
        status: 200,
      });
    }
      } catch (error) {
        return NextResponse.json({
          error: `خطایی رخ داده است : ${error}`,
          message: error,
          status: error.status,
        });
      }
    } else {
      console.log(`dosent have relation`);
      return NextResponse.json({
        error: "خطایی رخ داده است لطفا ممجد تلاش کنید",
        reason: "not have relation betwenn user and phoneNumber",
      });
    }
  } else {
    const signupVerificationNumberWithPhoneNumbers =
      await prisma.signupVerificationNumber.findUnique({
        where: { id: signupVerificationExist.id },
        include: {
          phoneNumbers: true,
        },
      });

    let phoneNumber = await prisma.phoneNumberForVerification.findUnique({
      where: { phoneNumber: body.phoneNumber },
    });

    if (phoneNumber) {
      const hasRelation =
        signupVerificationNumberWithPhoneNumbers.phoneNumbers.some(
          (phoneNumberDoc) => phoneNumberDoc.id === phoneNumber.id
        );
      if (!hasRelation) {
        if (signupVerificationExist.countOfChnageNumber > 10) {
          return NextResponse.json({
            error: "بیش از حد تلاش کرده اید لطفا بعدا مجددا تلاش کنید",
            message: `reached limit of ${signupVerificationExist.identifier} user`,
          });
        }
        const updateCountOfCHangedNumber =
          await prisma.signupVerificationNumber.update({
            where: { id: signupVerificationExist.id },
            data: {
              countOfChnageNumber: {
                increment: 1,
              },
            },
          });
        console.log("number exist but not have relation");
      }
    } else {
      if (signupVerificationExist.countOfChnageNumber > 10) {
        return NextResponse.json({
          error: "بیش از حد تلاش کرده اید لطفا بعدا مجددا تلاش کنید",
          message: `reached limit of ${signupVerificationExist.identifier} user`,
        });
      }
      const updateCountOfCHangedNumber =
        await prisma.signupVerificationNumber.update({
          where: { id: signupVerificationExist.id },
          data: {
            countOfChnageNumber: {
              increment: 1,
            },
          },
        });
      console.log("number not exist and not have relation");
    }

    const newSignupVerificationNumber =
      await prisma.signupVerificationNumber.update({
        where: { id: signupVerificationExist.id },
        data: {
          phoneNumbers: {
            connectOrCreate: {
              create: {
                phoneNumber: body.phoneNumber,
                verificationData: {
                  code: crypto.randomInt(100_000, 1_000_000).toString(),
                  expireDate: new Date(new Date().getTime() - 120 * 1000),
                },
              },
              where: { phoneNumber: body.phoneNumber },
            },
          },
        },
      });

    phoneNumber = await prisma.phoneNumberForVerification.findUnique({
      where: { phoneNumber: body.phoneNumber },
    });
    if (phoneNumber.countOfTryGetCodeForSignup > 10) {
      return NextResponse.json({
        error: "بیش از حد تلاش کرده اید لطفا بعدا مجددا تلاش کنید",
        message: `reached limit of ${phoneNumber.phoneNumber} number`,
      });
    }

    phoneNumber = await prisma.phoneNumberForVerification.findUnique({
      where: { phoneNumber: body.phoneNumber },
    });
    const isExpire =
      phoneNumber.verificationData.expireDate < new Date(Date.now());

    if (isExpire) {
      try {
        const updatedPhoneNumber =
          await prisma.phoneNumberForVerification.update({
            where: { id: phoneNumber.id },
            data: {
              verificationData: {
                code: crypto.randomInt(100_000, 1_000_000).toString(),
                expireDate: new Date(new Date().getTime() + 120 * 1000),
              },
              countOfTryGetCodeForSignup:
                (phoneNumber.countOfTryGetCodeForSignup += 1),
            },
          });

        // call send sms api

        return NextResponse.json({
          success: "کد تایید به شماره شما ارسال شد",
          message: "code expire and re generate and send new sms",
          phoneNumber: updatedPhoneNumber.phoneNumber,
          expireDate: updatedPhoneNumber.verificationData.expireDate,
          status: 200,
        });
      } catch (error) {
        return NextResponse.json({
          error: `خطایی رخ داده است : ${error}`,
          message: error,
          status: error.status,
        });
      }
    } else {
      return NextResponse.json({
        success: "کد قبلا ارسال شده است لطفا ان را وارد کنید",
        message: "code expireDate not expire and have enough time not send sms",
        phoneNumber: phoneNumber.phoneNumber,
        expireDate: phoneNumber.verificationData.expireDate,
        status: 200,
      });
    }
  }
}
