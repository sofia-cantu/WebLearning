/* src/app/api/auth/[...nextauth]/route.ts*/

import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      console.log("Session callback:", session, token);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("JWT callback:", token, user, account, profile, isNewUser);
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      console.log("SignIn callback:", user, account, profile, email, credentials);
      return true;
    },
  },
  events: {
    async signIn(message) {
      console.log("SignIn event:", message);
    },
    async signOut(message) {
      console.log("SignOut event:", message);
    },
    async createUser(message) {
      console.log("CreateUser event:", message);
    },
    async updateUser(message) {
      console.log("UpdateUser event:", message);
    },
    async linkAccount(message) {
      console.log("LinkAccount event:", message);
    },
    async session(message) {
      console.log("Session event:", message);
    },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

/*
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { NextAuthOptions } from 'next-auth'
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import type { Adapter } from "next-auth/adapters"

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  //max: 20,
  //idleTimeoutMillis: 30000,
  //connectionTimeoutMillis: 2000,
})

export const authOptions = {
  //adapter: PostgresAdapter(pool) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  
  session: {
    //strategy: "database" as const,
    strategy: "jwt" as const,
  }
  
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
*/



/*
import { authOptions } from '../../../helpers/db.js';
import { providerOptions } from '../../utils/authOptions';
import NextAuth from 'next-auth';

export const handler = NextAuth({
  ...authOptions,
  providers: providerOptions,
});
*/