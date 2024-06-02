import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import { Profile, UserRole } from "@prisma/client";
import { redirect } from 'next/navigation'
import { permanentRedirect } from 'next/navigation'
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@prisma/client";
import { getUserById, getUserProfileById } from "./data/user";

declare module "next-auth" {
  interface User {
    /** The user's postal address. */
    address: string
    profile: Profile
    role: UserRole
    userName: string
    phoneNumber: string
  }
}
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);

      if (!existingUser || !existingUser.phoneNumberVerified) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      console.log({ seassionToken: token });
      console.log({ seassion: session });
      console.log({ user: token.user });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.userName && session.user) {
        session.user.userName = token.userName as string;
      }

      // if (token.sub && session.user) {
      //   session.user.image = token.image;
      // }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (token.profile && session.user) {
        session.user.profile = token.profile as Profile;
        if(token.profile.profileImage){
          session.user.image = token.profile.profileImage
        }
      }

      if (session.user) {
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.email = token.email as string;
      }
    

      return session
    },
    async jwt({ token, user }) {

      if (!token.sub) return token;
      // const getUserById = async(id) => {
      //     const result = await fetch(`${baseUrl}/api/users/${id}`)
      //     if(result.ok) {
      //         const response = await result.json()
      //         console.log(response)
      //         if(response.success){
      //             return response.user
      //         } else if(response.error) {
      //             return response
      //         }
      //     } else {
      //         return null
      //     }
      // }
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      const profileExist =await getUserProfileById(token.sub)
      if(profileExist.profile) {
        token.profile = profileExist.profile as Profile
      }
      token.phoneNumber = existingUser.phoneNumber
     token.userName = existingUser.userName
     token.email = existingUser.email
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
