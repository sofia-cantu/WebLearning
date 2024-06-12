import NextAuth, { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { handleLogin } from "../../../../db/insertActions"
import { db } from "../../../../db/schema"
import type { Adapter } from "next-auth/adapters"

const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ profile }) {
      return await handleLogin({ profile })
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
