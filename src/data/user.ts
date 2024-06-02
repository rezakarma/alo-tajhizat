import prisma from "../prisma/client";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    return user;
  } catch {
    return null;
  }
};

export const getUserProfileById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { profile: true },
    });
    return user;
  } catch {
    return null;
  }
};
