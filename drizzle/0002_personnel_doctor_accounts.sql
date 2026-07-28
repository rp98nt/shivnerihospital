ALTER TABLE "personnel_accounts" ADD COLUMN IF NOT EXISTS "specialty" text;
--> statement-breakpoint
INSERT INTO "personnel_accounts" ("name", "role", "specialty", "username", "password_hash")
VALUES
  ('Dr. Sanjay Khillare', 'doctor', 'Medicine', 'sanjay-khillare@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW'),
  ('Dr. Govind Pawade Patil', 'doctor', 'Medicine', 'govind-pawade-patil@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW'),
  ('Dr. Sanjyot Gajendra Giri', 'doctor', 'Chest Medicine', 'sanjyot-gajendra-giri@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW'),
  ('Dr. Rahul Tengase Patil', 'doctor', 'Nephrology', 'rahul-tengase-patil@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW'),
  ('Dr. Pooja Tengase Khupase', 'doctor', 'Chest Medicine', 'pooja-tengase-khupase@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW'),
  ('Dr. Ninad Suryatale', 'doctor', 'Orthopaedics', 'ninad-suryatale@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW'),
  ('Dr. Prakash Chavan', 'doctor', 'Oncosurgery', 'prakash-chavan@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW'),
  ('Dr. Kailas Giri', 'doctor', 'Critical Care', 'kailas-giri@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW'),
  ('Dr. Anvesh Sattepar Jain', 'doctor', 'Neuro-Surgery', 'anvesh-sattepar-jain@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW'),
  ('Dr. Varsha Sanjay Killare', 'doctor', 'Physiotherapy', 'varsha-sanjay-killare@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW'),
  ('Dr. Ashok Bun', 'doctor', 'General Surgery', 'ashok-bun@shivnerihospital.com', '$2b$12$T7aV/7wUqmTVoHp27uXGKevOrCOBeyCmU431BZmHyh0hxgrLLq5hW')
ON CONFLICT ("username") DO NOTHING;
