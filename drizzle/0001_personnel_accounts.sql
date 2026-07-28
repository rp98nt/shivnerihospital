CREATE TABLE "personnel_accounts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text NOT NULL,
  "role" text NOT NULL,
  "username" text NOT NULL,
  "password_hash" text NOT NULL,
  "is_active" boolean DEFAULT true NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
  CONSTRAINT "personnel_accounts_username_unique" UNIQUE("username")
);
--> statement-breakpoint
INSERT INTO "personnel_accounts" ("name", "role", "username", "password_hash")
VALUES (
  'Super Admin',
  'superadmin',
  'superadmin@shivnerihospital.com',
  '$2b$12$.G5.bU8uRGW5d.A4LSi0XewbsjUY6tgxdlMGwHJMSfAx1weT86eWC'
);
