import prisma from "../prisma/client";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const resetPasswordToken = await prisma.emailForResetPassword.findUnique({
      where: { token },
    });

    return resetPasswordToken;

  } catch (error) {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
      const resetPasswordToken = await prisma.emailForResetPassword.findUnique({
        where: { email },
      });
  
      return resetPasswordToken;
  
    } catch (error) {
      return null;
    }
  };

  export const getPasswordResetIdentifier = async (identifier: string) => {
    try {
      const resetPasswordToken = await prisma.resetPassword.findUnique({
        where: { identifier }
      });
  
      return resetPasswordToken;
  
    } catch (error) {
      return null;
    }
  };
