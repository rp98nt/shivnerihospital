CREATE TYPE "public"."personnel_role" AS ENUM(
  'super_admin',
  'reception',
  'clinical_lead',
  'finance',
  'operations'
);
--> statement-breakpoint
CREATE TABLE "personnel_users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "username" text NOT NULL,
  "password_hash" text NOT NULL,
  "display_name" text NOT NULL,
  "role" "personnel_role" NOT NULL,
  "is_active" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "personnel_users_username_unique" UNIQUE("username")
);
