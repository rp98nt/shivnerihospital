import type { PersonnelRole } from "@/lib/personnel-access";
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role: PersonnelRole;
      accountRole: string;
    } & DefaultSession["user"];
  }

  interface User {
    username: string;
    role: PersonnelRole;
    accountRole: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    role?: PersonnelRole;
    accountRole?: string;
  }
}
