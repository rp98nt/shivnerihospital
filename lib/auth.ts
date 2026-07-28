import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import type { PersonnelRole } from "@/lib/personnel-access";
import {
  ensureBootstrapSuperAdmin,
  verifyPersonnelCredentials,
} from "@/lib/personnel-users";

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

          await ensureBootstrapSuperAdmin();

          const user = await verifyPersonnelCredentials(
            parsed.data.username,
            parsed.data.password,
          );

          if (!user) {
            return null;
          }

          return {
            id: user.id,
            name: user.displayName,
            username: user.username,
            role: user.role as PersonnelRole,
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
        token.username = user.username;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.username = token.username as string;
        session.user.role = token.role as PersonnelRole;
      }

      return session;
    },
  },
});
