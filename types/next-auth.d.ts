import type { PersonnelRole } from "@/lib/personnel-access";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role: PersonnelRole;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    role: PersonnelRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    role?: PersonnelRole;
  }
}
