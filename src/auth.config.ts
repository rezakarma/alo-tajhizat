import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchemaWithNumber } from "./schema";
import bcrypt from "bcryptjs";
import prisma from "./prisma/client";

export default {
  trustHost: true,
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchemaWithNumber.safeParse(credentials);
        if (validatedFields.success) {
          const { phoneNumber, password } = validatedFields.data;
          const user = await prisma.user.findUnique({
            where: { phoneNumber: phoneNumber },
          });
          if (!user) return null;  
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            console.log("logeed in");
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
