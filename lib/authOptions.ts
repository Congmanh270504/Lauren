import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/prisma";
import clientPromise from "./mongodbClient";
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const client = await clientPromise;
        const db = client.db() as any;
        const bcrypt = require("bcryptjs");
        const user = await db.collection("Users").findOne({
          email: credentials?.email,
        });
        if (!user) {
          return null;
        }
        const passwordCorrect = await bcrypt.compare(
          credentials?.password,
          user?.password
        );
        if (passwordCorrect) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
  },
};
