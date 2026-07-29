ALTER TABLE "personnel_accounts"
ADD COLUMN IF NOT EXISTS "profile_settings" jsonb;
