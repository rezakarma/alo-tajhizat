import prisma from "@prisma/client"

export const updateUserEmail = async (id:string , email:string) => {
    const updatedUser = await prisma.UserRole.update
}