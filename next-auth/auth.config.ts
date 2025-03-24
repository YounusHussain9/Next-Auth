import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validFiedls = LoginSchema.safeParse(credentials);
        if (validFiedls.success) {
          const { email, password } = validFiedls.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const matchPassword = await bcrypt.compare(password, user.password);
          if (matchPassword) return user;
        }
        return null;
      },
    }),
    Github({
      clientId: process.env.GITHUB_ClIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_ClIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
