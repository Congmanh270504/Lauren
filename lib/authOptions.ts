import { NextAuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/prisma";
import clientPromise from "./mongodbClient";
import { ObjectId } from "mongodb";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
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
    async signIn({ user, account, profile }) {
      if (
        account &&
        (account.provider === "github" || account.provider === "facebook")
      ) {
        const client = await clientPromise;
        const db = client.db();

        // Check if the user already exists in the database
        const existingUser = await db.collection("Users").findOne({
          email: profile?.email ?? "",
        });

        if (!existingUser) {
          // Insert the user into the database
          await db.collection("Users").insertOne({
            name: profile?.name || (profile as any)?.login || "Unknown",
            email: profile?.email || "Unknown",
            image:
              (profile as any)?.picture || (profile as any)?.avatar_url || "",
            provider: account.provider,
            createdAt: new Date(),
            updateAt: new Date(),
          });
        }
      }
      return true; // Continue the sign-in process
    },
    async session({ session, token }) {
      // Attach user ID or other data to the session
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || new ObjectId().toString();
      }
      return token;
    },
  },
};
