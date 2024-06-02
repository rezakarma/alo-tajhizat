import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getPasswordResetIdentifier } from "@/data/password-reset-token";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../prisma/client";
export const generateVerificationToken = async (
  email: string,
  currentEmail: string
) => {
  const token = uuidv4();
  const expireDate = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    if (existingToken.countOfgenerateToken > 10) {
      // return NextResponse.json({
      //   error: "بیش از حد تلاش کردید لطفا در زمانی دیگر اقدام کنید",
      // });

      return { error: "بیش از حد تلاش کردید لطفا در زمانی دیگر اقدام کنید" };
    }
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
      // return NextResponse.json({updatedVerificationToken });
      return updatedVerificationToken;
    } else {
      // return NextResponse.json({existingToken });
      return { error: "ایمیل قبلا ارسال شده است" };
    }

    //   const result = await prisma.verificationToken.delete({
    //     where: {
    //       id: existingToken.id,
    //     },
    //   });
    // }

    //   const verificationToken = await prisma.verificationToken.create({
    //     data: {
    //       email: body.email,
    //       token,
    //       expireDate,
    //     },
    //   });

    //   return NextResponse.json({ success: "true", verificationToken });
  } else {
    const emailsIsSame = currentEmail === email;

    if (!emailsIsSame) {
      const newEmailExist = await prisma.user.findUnique({
        where: { email: email },
      });
      if (newEmailExist) {
        if (newEmailExist.emailVerified) {
          return { error: "این ایمیل در سیستم موجود است" };
        }
      }
    }

    const verificationToken = await prisma.verificationToken.create({
      data: {
        email,
        currentEmail,
        token,
        expireDate,
      },
    });
    // return NextResponse.json({ verificationToken });
    return verificationToken;
  }
};

export const generatePasswordResetToken = async (
  email: string,
  identifier: string,
  ipAddress: string
) => {
  const token = uuidv4();
  const expireDate = new Date(new Date().getTime() + 3600 * 1000);
  try {
    const existingToken = await getPasswordResetTokenByEmail(email);
    const existIdentifier = await getPasswordResetIdentifier(identifier);
    if (existIdentifier) {
      if (existIdentifier.countOfChangeEmail > 10) {
        return { error: "بیش از حد تلاش کرده اید لطفا بعدا مجددا امتحان کنید" };
      }

      if (existingToken) {
        const resetPasswordWithEmails = await prisma.resetPassword.findUnique({
          where: { id: existIdentifier.id },
          include: {
            emails: true,
          },
        });

        const hasRelation = resetPasswordWithEmails.emails.some(
          (emailDoc) => emailDoc.id === existingToken.id
        );

        if (!hasRelation) {
          //   await prisma.resetPassword.update({
          //   where: { id: resetPasswordWithEmails.id },
          //   data: {
          //     countOfChangeEmail: {
          //       increment: 1,
          //     },
          //   },
          // });

          const updatedResetPassword = await prisma.resetPassword.update({
            where: { id: existIdentifier.id },
            data: {
              countOfChangeEmail: {
                increment: 1,
              },
              emails: {
                connectOrCreate: {
                  create: {
                    email,
                    token,
                    expireDate,
                  },
                  where: { email },
                },
              },
            },
          });

          const emailForResetPassword = await getPasswordResetTokenByEmail(
            email
          );
          if (emailForResetPassword.countOfgenerateToken > 10) {
            return {
              error:
                "بیش از حد تلاش کرده اید لطفا در زمانی دیگر مجددا امتحان کنید",
            };
          }
          const isExpire =
            emailForResetPassword.expireDate < new Date(Date.now());
          if (isExpire) {
            const updatedEmailForResetPassword =
              await prisma.emailForResetPassword.update({
                where: { id: emailForResetPassword.id },
                data: {
                  token,
                  expireDate,
                  countOfgenerateToken: {
                    increment: 1,
                  },
                },
              });
            return updatedEmailForResetPassword;
          } else {
            return { error: "توکن قبلا جنریت شده است" };
          }
        } else {
          const emailForResetPassword = await getPasswordResetTokenByEmail(
            email
          );
          if (emailForResetPassword.countOfgenerateToken > 10) {
            return {
              error:
                "بیش از حد تلاش کرده اید لطفا در زمانی دیگر مجددا امتحان کنید",
            };
          }
          const isExpire =
            emailForResetPassword.expireDate < new Date(Date.now());
          if (isExpire) {
            const updatedEmailForResetPassword =
              await prisma.emailForResetPassword.update({
                where: { id: emailForResetPassword.id },
                data: {
                  token,
                  expireDate,
                  countOfgenerateToken: {
                    increment: 1,
                  },
                },
              });
            return updatedEmailForResetPassword;
          } else {
            return { error: "توکن قبلا جنریت شده است" };
          }
        }
      } else {
        const updatedResetPassword = await prisma.resetPassword.update({
          where: { id: existIdentifier.id },
          data: {
            countOfChangeEmail: {
              increment: 1,
            },
            emails: {
              connectOrCreate: {
                create: {
                  email,
                  token,
                  expireDate,
                },
                where: { email },
              },
            },
          },
        });

        const newEmailForResetPassword = await prisma.emailForResetPassword.findUnique({
          where: {email : email}
        })

        return newEmailForResetPassword
      }
    } else {
      const newResetPassword = await prisma.resetPassword.create({
        data: {
          identifier,
          ipAddress,
          emails: {
            connectOrCreate: {
              create: {
                email,
                token,
                expireDate,
              },
              where: { email },
            },
          },
        },
      });
      const emailForResetPassword = await getPasswordResetTokenByEmail(email);
      if (emailForResetPassword.countOfgenerateToken > 10) {
        return {
          error: "بیش از حد تلاش کرده اید لطفا در زمانی دیگر مجددا امتحان کنید",
        };
      }
      const isExpire = emailForResetPassword.expireDate < new Date(Date.now());
      if (isExpire) {
        const updatedEmailForResetPassword =
          await prisma.emailForResetPassword.update({
            where: { id: emailForResetPassword.id },
            data: {
              token,
              expireDate,
              countOfgenerateToken: {
                increment: 1,
              },
            },
          });
        return updatedEmailForResetPassword;
      } else {
        return { error: "توکن قبلا جنریت شده است" };
      }
    }
  } catch (error) {
    return { error: "خطایی رخ داده است" };
  }
};
