import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { verifyPersonnelCredentials } from "@/lib/personnel-users";

const credentialsSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/personnel/login",
  },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const parsed = credentialsSchema.safeParse(credentials);
          if (!parsed.success) {
            return null;
          }

          const account = await verifyPersonnelCredentials(
            parsed.data.username,
            parsed.data.password,
          );

          if (!account) {
            return null;
          }

          return {
            id: account.id,
            name: account.name,
            username: account.username,
            role: account.accessRole,
            accountRole: account.role,
          };
        } catch (error) {
          console.error("Personnel authorize failed:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.accountRole = user.accountRole;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.role = token.role as typeof session.user.role;
        session.user.accountRole = token.accountRole as string;
      }

      return session;
    },
  },
});
