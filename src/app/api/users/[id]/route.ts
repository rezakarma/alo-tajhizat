import { NextResponse, NextRequest } from "next/server";
import { patchUser } from "@/schema/index";
import prisma from "@/prisma/client";
import { auth } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";
import crypto from "crypto";
export async function GET(req, props) {
  if (props.params.id) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: props.params.id },
      });

      if (user) {
        return NextResponse.json({ success: true, user });
      } else {
        return NextResponse.json({ error: "user not found" });
      }
    } catch (error) {
      return NextResponse.json({ error: error });
    }
  }
  return NextResponse.json({ error: "id not pass" });
}

export async function PATCH(request: NextRequest, props) {
  const body = await request.json();
  const validation = patchUser.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors);
  }
  const { email, userName, password, phoneNumber, id } = body;

  const user = await prisma.user.findUnique({
    where: { id: id },
  });

  if (!user) {
    return NextResponse.json({ error: "کاربر یافت نشد" });
  }

  const session = await auth();

  if (!session.user) {
      return NextResponse.json({
        error: "برای تغییر اطلاعات حساب کاربری لطفا وارد حساب کاربری خود شود",
      });
    }

    const userIdCheck = session.user.id === body.id;
  if (!userIdCheck) {
    return NextResponse.json({
      error: "کاربر ارائه شده با حساب شما مغایرت دارد",
    });
  }

  if (email) {
    let currentEmail: string;
    if (session) {
      currentEmail = session.user.email;
    } else if (body.currentEmail) {
      currentEmail = body.currentEmail;
    } else {
      return NextResponse.json({ error: "حطایی رخ داده است" });
    }
    console.log('email:23 ', currentEmail)
    const userExist = await prisma.user.findUnique({
      where: { email: currentEmail },
    });

    if (!userExist) {
      return NextResponse.json({ error: "کاربر پیدا نشد" });
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
      if (sendEmail.accepted.length > 0) {
        return NextResponse.json({
          success:
            "ایمیلی حاوی لینک تایید به ایمیل جدید شما ارسال شد لطفا ان را تایید کنید",
        });
      } else if (sendEmail.rejected.length > 0) {
        return NextResponse.json({
          error: "خطایی رخ داده لطفا مجددا در زمانی دیگر تلاش کنید",
        });
      }
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

  if (userName) {
    try {
      const userNameExist = await prisma.user.findUnique({
        where: { userName: userName },
      });

      if (userNameExist) {
        return NextResponse.json({
          error: "این نام کاربری در سیستم وجود دارد",
        });
      }

      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          userName: userName,
        },
      });

      return NextResponse.json({
        success: "نام کاربری شما با موفقیت تغییر کرد",
      });
    } catch (error) {
      return NextResponse.json({
        error: "خطایی رخ داده ، لطفا در زمانی دیگر مجددا امتحان کنید",
      });
    }
  }

  if (password) {
    try {
      const passwordsMatch = await bcrypt.compare(
        password.currentPassword,
        user.password
      );
      if (!passwordsMatch) {
        return NextResponse.json({ error: "رمزعبور فعلی اشتباه است" });
      }

      const hashedPassword = await bcrypt.hash(body.password.password, 10);

      const updatedUser = await prisma.user.update({
        where: { id: id },
        data: {
          password: hashedPassword,
        },
      });

      return NextResponse.json({ success: "رمزعبور با موفقیت تغییر کرد" });
    } catch (error) {
      return NextResponse.json({
        error: "خطایی رخ داده است ، لطفا در زمانی دیگر مجدد تلاش کنید",
      });
    }
  }
  if (phoneNumber) {
    const phoneNumberExist = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });

    if (phoneNumberExist) {
      return NextResponse.json({ error: "این شماره در سیستم وجود دارد" });
    }


    const changeVerificationExist =
      await prisma.changeVerificationNumber.findUnique({
        where: { userId: props.params.id },
      });

    if (!changeVerificationExist) {
      const newChangeVerificationNumber =
        await prisma.changeVerificationNumber.create({
          data: {
            user: {
              connect: { id: props.params.id },
            },
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

      const changeVerificationNumber =
        await prisma.changeVerificationNumber.findUnique({
          where: { id: newChangeVerificationNumber.id },
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

      const hasRelation = changeVerificationNumber.phoneNumbers.some(
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
                    countOfTryGetCodeForChange: {
                      increment: 1,
                    },
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
              message:
                "code expireDate not expire and have enough time not send sms",
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





      const changeVerificationNumberWithPhoneNumbers =
      await prisma.changeVerificationNumber.findUnique({
        where: { id: changeVerificationExist.id },
        include: {
          phoneNumbers: true,
        },
      });

    let phoneNumber = await prisma.phoneNumberForVerification.findUnique({
      where: { phoneNumber: body.phoneNumber },
    });

    if (phoneNumber) {
      const hasRelation =
      changeVerificationNumberWithPhoneNumbers.phoneNumbers.some(
          (phoneNumberDoc) => phoneNumberDoc.id === phoneNumber.id
        );
      if (!hasRelation) {
        if (changeVerificationExist.countOfChnageNumber > 10) {
          return NextResponse.json({
            error: "بیش از حد تلاش کرده اید لطفا بعدا مجددا تلاش کنید",
            message: `reached limit of ${changeVerificationExist.userId} user`,
          });
        }
        const updateCountOfChangedNumber =
          await prisma.changeVerificationNumber.update({
            where: { id: changeVerificationExist.id },
            data: {
              countOfChnageNumber: {
                increment: 1,
              },
            },
          });
        console.log("number exist but not have relation");
      }
    } else {
      if (changeVerificationExist.countOfChnageNumber > 10) {
        return NextResponse.json({
          error: "بیش از حد تلاش کرده اید لطفا بعدا مجددا تلاش کنید",
          message: `reached limit of ${changeVerificationExist.userId} user`,
        });
      }
      const updateCountOfCHangedNumber =
        await prisma.changeVerificationNumber.update({
          where: { id: changeVerificationExist.id },
          data: {
            countOfChnageNumber: {
              increment: 1,
            },
          },
        });
      console.log("number not exist and not have relation");
    }

    const newChangeVerificationNumber =
      await prisma.changeVerificationNumber.update({
        where: { id: changeVerificationExist.id },
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
    if (phoneNumber.countOfTryGetCodeForChange > 10) {
      return NextResponse.json({
        error: "بیش از حد تلاش کرده اید لطفا بعدا مجددا تلاش کنید",
        message: `reached limit of ${phoneNumber.phoneNumber} number`,
      });
    }

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
              countOfTryGetCodeForChange: {
                increment: 1
              },
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
  return NextResponse.json({ body: body });
}

export async function DELETE(request, props) {
  if (props.params.id > 10) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  return NextResponse.json({});
}
