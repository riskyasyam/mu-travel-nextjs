import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { authConfig } from "./auth.config"; // <-- Impor config ringan
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // <-- Gunakan semua config ringan dari auth.config.js
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    // Definisikan provider HANYA di sini, bukan di auth.config.js
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (isPasswordCorrect) return user;
        
        return null;
      },
    }),
  ],
  callbacks: {
    // Gabungkan callbacks dari auth.config.js dengan callbacks untuk session
    ...authConfig.callbacks, // <-- Penting untuk membawa callback 'authorized'

    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.id = token.id;
      return session;
    },
  },
});