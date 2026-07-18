# Shivneri Hospital Website — Project Reference

> **Purpose:** Single source of truth for AI and developers throughout the project lifecycle — from authority demo through production go-live.

---

## 1. Project Overview

| Item | Detail |
|------|--------|
| **Client** | Shivneri Hospital (full professional multispecialty hospital) |
| **Delivery model** | Two-phase: **Authority demo first** → **Production with real data** |
| **Demo goal** | Convince hospital leadership the site is professional, complete, and adoptable |
| **Production goal** | Replace all placeholders with real data; enable staff to manage content via admin |

### Core principle

Build **one site structure** that survives both phases. Phase 1 uses placeholder/seed data; Phase 2 swaps data — **no redesign**.

---

## 2. Non-Negotiable Features

### Public site (must exist for demo)

1. **Trust & identity** — Logo, name, accreditations, About, 24/7 emergency contact, address + directions
2. **Find a Doctor** — Searchable/filterable directory (name, specialty, department)
3. **Departments / Specialties** — Full listing with detail pages
4. **Appointments** — Form flow (request → confirmation path); WhatsApp as primary CTA
5. **WhatsApp integration** — **MUST-HAVE** on every key touchpoint (see §5)
6. **Emergency access** — Dedicated emergency info; one-tap call; always visible in header
7. **Services & facilities** — Clinical services, diagnostics, infrastructure highlights
8. **Patient information hub** — Visiting hours, admission/discharge, documents, FAQs, billing info
9. **Contact & support** — Multiple channels, routed contact form, feedback
10. **Legal pages** — Privacy policy, terms, disclaimer, grievance/redressal
11. **Mobile-first, fast, HTTPS, accessible, SEO-ready**

### Strongly recommended (demo or Phase 2)

- Health checkup packages
- Insurance / cashless partners
- News & announcements
- Careers
- Multilingual (English + local language) — confirm with hospital

### Phase 3 (post go-live, when hospital is ready)

- Patient portal (reports, bills, visit history)
- HIS/EMR appointment sync
- Online payments (Razorpay — only if requested)
- WhatsApp Business API (chatbot/CRM — optional; not required for v1)

---

## 3. WhatsApp Integration (Non-Negotiable)

Use **`wa.me` deep links** — no third-party WhatsApp SaaS required for demo or v1.

### Config (env or `hospital_settings` in PostgreSQL)

```
WHATSAPP_NUMBER=91XXXXXXXXXX
WHATSAPP_DEFAULT_MESSAGE=Hello Shivneri Hospital, I need assistance with...
WHATSAPP_APPOINTMENT_TEMPLATE=I would like to book an appointment for {department}. Name: ___ Preferred date: ___
```

### URL format

```
https://wa.me/{number}?text={urlEncodedMessage}
```

### Required placements

| Location | Behavior |
|----------|----------|
| **Floating button** | Every page — highest priority |
| **Header / footer** | Official WhatsApp business number |
| **Home hero** | “Chat on WhatsApp” CTA |
| **Doctor profiles** | Pre-filled: book with Dr. {name} |
| **Appointment page** | Pre-filled: department, name, date fields |
| **Emergency / Contact** | Separate number if hospital uses one |
| **After form submit** | Option to open WhatsApp with submission summary |

Change number/templates in **one config place** → entire site updates.

---

## 4. Tech Stack (Final Decision)

### Minimize third-party SaaS accounts

**Target: essentially one platform account (Vercel)** plus assets the hospital already owns (domain, WhatsApp number, email SMTP).

| Layer | Choice | Notes |
|-------|--------|-------|
| **Framework** | Next.js (App Router) + TypeScript | SSR/SEO, Server Actions, API routes |
| **UI** | Tailwind CSS + shadcn/ui | Professional, consistent components |
| **Database** | PostgreSQL | All structured data, forms, admin users |
| **ORM** | Drizzle ORM (preferred) or Prisma | Migrations + type-safe queries |
| **Hosting** | Vercel | App deploy; preview URLs for demo |
| **DB hosting** | Vercel Postgres (via Vercel dashboard) OR hospital-owned Postgres | Single account preferred |
| **CMS** | Custom `/admin` in same Next.js app | No Sanity/Strapi/Contentful |
| **Auth (admin)** | Auth.js (NextAuth v5) | Credentials in PostgreSQL |
| **Forms** | React Hook Form + Zod + Server Actions | Appointments, contact, feedback |
| **Email** | Nodemailer + hospital SMTP | No Resend/SendGrid unless hospital prefers |
| **Search** | PostgreSQL full-text (`tsvector` / `ILIKE`) | No Algolia |
| **Maps** | Google Maps **link** (no API key) or OpenStreetMap embed | No Google Cloud billing account |
| **Analytics** | Vercel Web Analytics (optional) | Same Vercel account |
| **File uploads** | `/public` for demo → Vercel Blob for production | Same Vercel account |
| **WhatsApp** | `wa.me` links from config/DB | No WATI/Interakt for v1 |

### Explicitly avoid (early)

- WordPress + heavy plugins
- Microservices / Kubernetes
- Custom CMS from scratch beyond simple admin
- WhatsApp Business API on day one
- Cloning Narayana/Apollo mobile apps
- Google Maps Platform API (use link/embed instead)
- Separate CMS, search, or email SaaS accounts

### Accounts checklist

- [ ] Vercel (hosting, optional Postgres/Blob/Analytics)
- [ ] Domain registrar (if custom domain)
- [ ] Hospital WhatsApp number
- [ ] Hospital email SMTP credentials

---

## 5. Architecture

```
┌─────────────────────────────────────────────────┐
│              Vercel (single account)             │
│  ┌───────────────────────────────────────────┐  │
│  │           Next.js App                      │  │
│  │  • Public site (departments, doctors…)     │  │
│  │  • /admin (CMS — doctors, news, settings)  │  │
│  │  • Server Actions / API routes             │  │
│  └───────────────────────────────────────────┘  │
│         │                    │                   │
│  ┌──────▼──────┐    ┌───────▼────────┐          │
│  │  PostgreSQL │    │  Vercel Blob   │          │
│  │  (content,  │    │  (photos,      │          │
│  │   forms,    │    │   optional)    │          │
│  │   users)    │    └────────────────┘          │
│  └─────────────┘                                 │
└─────────────────────────────────────────────────┘

External (hospital-owned):
  WhatsApp  →  wa.me links
  Email     →  Nodemailer + SMTP
  Domain    →  DNS → Vercel
```

### Suggested repo layout (target)

```
shivnerihospital/
├── app/                      # App Router pages
│   ├── (public)/             # Marketing site routes
│   └── admin/                # CMS (Phase 2)
├── components/
├── doc/
│   └── PROJECT_REFERENCE.md  # Spec, docs, agent guidelines (this file)
├── lib/
│   ├── db/                   # Drizzle client
│   └── whatsapp.ts           # wa.me URL builder
├── data/                     # Demo seed JSON (Phase 1 bootstrap)
├── drizzle/                  # Migrations
├── public/
└── .env.local                # Local secrets (never commit)
```

---

## 6. PostgreSQL Schema (Conceptual)

```text
hospital_settings     ← name, address, phones, WhatsApp, messages, social links
departments           ← slug, name, description, icon/image
doctors               ← name, photo, qualifications, specialty, department_id, OPD timings
services              ← clinical services listing
health_packages       ← checkup packages (Phase 2)
appointments          ← form submissions (name, phone, dept, date, status)
contact_messages      ← general contact form
news                  ← announcements, camps, awards
admin_users           ← email, password hash, role
```

### Demo seed rules

- Use **realistic** Indian hospital naming — not "Dr. Test User"
- 8–12 sample doctors across key departments
- Placeholder photos in `/public/doctors/`
- Internal note: mark seed data as demo-only until hospital approves

---

## 7. Site Structure (Minimum Sitemap)

```
Home
├── About Us
├── Departments / Specialties
│   └── [department slug]
├── Find a Doctor
│   └── [doctor slug]
├── Book Appointment
├── Services & Facilities
├── Diagnostics / Lab
├── Insurance & Billing
├── Patient Information
├── Emergency
├── Health Packages
├── News & Events
├── Careers
├── Contact Us
└── Legal
    ├── Privacy Policy
    ├── Terms of Use
    └── Grievance / Redressal
```

---

## 8. Reference Websites — What to Borrow

| Site | URL | Borrow | Skip for now |
|------|-----|--------|--------------|
| Narayana Health | https://www.narayanahealth.org/ | Emergency + phone in header; Find a Doctor; Book Appointment; Specialties | NH Care app, Login, One Health ecosystem |
| Apollo / Fortis / Max | (Indian chains) | Department grid, doctor profiles, health packages, insurance | Enterprise patient portal, payments |
| Felix Hospital | https://www.felixhospital.com/ | Regional tone, WhatsApp-first contact, simpler scope | — |
| UHN | https://www.uhn.ca/ | "How can we help?" patient journey; Patient Information hub | SharePoint stack, research, refer-a-patient portal, myUHN |
| Hopkins | https://www.hopkinsmedicine.org/ | Trust/content quality, specialty depth | Academic research sections |

**Demo UX target:** Narayana/Fortis **layout patterns** + Felix-style **WhatsApp prominence** — not UHN/Hopkins enterprise depth.

---

## 9. Phased Delivery

### Phase 1 — Authority demo (priority)

- [ ] Next.js + Tailwind + shadcn/ui on Vercel (preview URL)
- [ ] PostgreSQL seeded with placeholder data (or JSON bootstrap → DB seed)
- [ ] All public pages from sitemap (content can be placeholder)
- [ ] WhatsApp floating button + contextual links everywhere
- [ ] Appointment form → save to DB (show in admin list)
- [ ] Emergency CTA always visible
- [ ] Mobile-responsive, fast load
- [ ] Images in `/public`

**Demo narrative for hospital authority:**

1. "This is how patients find you and reach you in one tap." (WhatsApp + emergency)
2. "This is how they choose a department and doctor."
3. "This is how appointment interest is captured."
4. "After approval, we populate real doctors, timings, and tariffs — structure stays the same."

### Phase 2 — Go-live

- [ ] Replace seed data with real doctors, departments, timings, tariffs
- [ ] `/admin` for hospital staff (CRUD doctors, news, WhatsApp settings)
- [ ] Custom domain on Vercel
- [ ] SMTP notifications to reception
- [ ] Vercel Blob for doctor photos (if needed)
- [ ] Legal pages with hospital-approved copy
- [ ] Sitemap, robots.txt, local SEO meta

### Phase 3 — Integrations (when hospital is ready)

- [ ] Patient login (Auth.js + PostgreSQL)
- [ ] HIS appointment sync (vendor-specific API)
- [ ] Online payments (Razorpay — if requested)
- [ ] WhatsApp Business API (optional)
- [ ] Multilingual (next-intl)

---

## 10. Environment Variables

```env
# Database
DATABASE_URL=postgresql://...

# WhatsApp
WHATSAPP_NUMBER=91XXXXXXXXXX
WHATSAPP_DEFAULT_MESSAGE=Hello Shivneri Hospital...

# Email (hospital SMTP)
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=appointments@shivnerihospital.com
SMTP_TO=reception@shivnerihospital.com

# Auth (admin)
AUTH_SECRET=                    # openssl rand -base64 32

# App
NEXT_PUBLIC_SITE_URL=https://shivnerihospital.com
NEXT_PUBLIC_HOSPITAL_NAME=Shivneri Hospital
```

---

## 11. Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
# Option B: Docker Postgres locally (when DB layer is added)
docker compose up -d

# Migrations (when DB layer added)
npm run db:migrate
npm run db:seed
```

### npm scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint |

No cloud accounts required for local dev beyond optional Vercel CLI for preview deploys.

---

## 12. Vercel Deployment

1. Push repo to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Use default settings (Next.js is auto-detected)
4. Add environment variables (`DATABASE_URL`, `WHATSAPP_*`, etc.) when wired up
5. Deploy — no extra configuration required for the starter
6. Optional: add Vercel Postgres from Storage tab in same project
7. Connect custom domain when hospital approves

---

## 13. Design & Content Guidelines

### Demo placeholders

- **Must feel real** — credible department names, realistic doctor cards
- **OK as placeholder** — exact qualifications, OPD schedules, tariffs, insurance full list, real photos
- **Never use** — obviously fake names, lorem ipsum on hero, broken links

### UI principles

- Mobile-first (majority of hospital site traffic is phone)
- Emergency + WhatsApp reachable in one tap
- High contrast, readable typography, accessible forms
- Professional medical palette — trust over flash

### Open questions (confirm with hospital)

- [ ] Single WhatsApp number or separate for emergency vs appointments?
- [ ] Languages required (English + Marathi/Hindi?)
- [ ] Top 5–8 departments to feature on homepage
- [ ] Logo and brand colors available?
- [ ] Bed count, accreditations (NABH, ISO), year established
- [ ] City/region for local SEO

---

## 14. Feature → Implementation Map

| Feature | Demo | Production |
|---------|------|------------|
| WhatsApp floating button | `wa.me` component | Same |
| Book appointment | Form → PostgreSQL | + SMTP notify; optional HIS sync |
| Find a Doctor | PostgreSQL + client search | Same + admin CRUD |
| Emergency CTA | Config-driven `tel:` + page | Same |
| Health packages | Seed data | Admin-managed |
| Insurance list | Static/seed page | Admin-managed |
| Patient portal | "Coming soon" or mock | Auth.js + hospital API |
| Admin CMS | Simple list view (Phase 1) | Full CRUD (Phase 2) |

---

## 15. Quality Checklist (Pre-Demo / Pre-Launch)

### Demo readiness

- [ ] All sitemap pages load without 404
- [ ] WhatsApp opens with correct pre-filled message on mobile
- [ ] Emergency phone click-to-call works on mobile
- [ ] Appointment form submits and persists
- [ ] Site usable on 375px viewport
- [ ] Lighthouse performance acceptable
- [ ] No console errors on key flows

### Production readiness

- [ ] Real data verified by hospital authority
- [ ] Legal pages approved
- [ ] SMTP notifications tested
- [ ] Admin auth secured (strong passwords, HTTPS)
- [ ] Backups for PostgreSQL configured
- [ ] Analytics enabled (if desired)
- [ ] Custom domain + SSL active

---

## 16. Conversation History Summary

Key decisions captured from project discussions:

1. Full professional hospital website — not a landing page
2. **WhatsApp integration is mandatory** — primary patient contact channel
3. **Demo first** for hospital authority approval; placeholders acceptable if credible
4. **Same codebase** for demo and production — swap data, not architecture
5. **Next.js on Vercel** — agreed framework and hosting
6. **PostgreSQL** — single database for content, forms, admin
7. **Minimal third-party accounts** — avoid Sanity, Algolia, SendGrid, WhatsApp SaaS for v1
8. Reference sites: Narayana, Apollo, Fortis, Max, Felix, UHN, Hopkins — borrow UX patterns, not enterprise infra

---

## 17. AI Agent Guidelines

> **This project has no root-level `AGENTS.md`, `CLAUDE.md`, or `README.md`.** All non-code documentation lives in `doc/PROJECT_REFERENCE.md`. AI agents (Cursor, Claude Code, Copilot, etc.) must read this file before any feature work.

### Next.js 16

This is **not** the Next.js version from older training data. APIs, conventions, and file structure may differ. Before writing Next.js code:

1. Read the relevant guide in `node_modules/next/dist/docs/`
2. Heed deprecation notices in the codebase and framework docs

### Agent workflow

1. Read this file (especially §2 features, §4 stack, §9 phases)
2. Match existing code conventions in `app/` and `components/`
3. Keep changes minimal and scoped to the requested task
4. Update this file if scope or stack decisions change

---

## 18. Repository File Roles

All **documentation** belongs in `doc/`. Every other root path exists for **development or runtime** only.

```
shivnerihospital/
├── app/                  # Next.js App Router — pages, layouts, routes
├── public/               # Static assets (images, icons, favicon)
├── doc/                  # Project spec & docs (not imported by the app)
│   └── PROJECT_REFERENCE.md
├── node_modules/         # Dependencies (gitignored)
├── .next/                # Build output (gitignored)
├── package.json          # Dependencies and npm scripts
├── package-lock.json     # Locked dependency versions
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint rules
├── postcss.config.mjs    # PostCSS / Tailwind pipeline
├── next-env.d.ts         # Next.js TypeScript declarations (auto-generated)
└── .gitignore            # Git ignore rules
```

| Path | Role |
|------|------|
| `app/` | Application source — routes, UI, Server Actions |
| `public/` | Publicly served static files |
| `doc/` | Spec, guidelines, agent instructions (this file) |
| `package.json` | Project metadata, scripts, dependencies |
| `package-lock.json` | Reproducible installs |
| `next.config.ts` | Next.js build and runtime config |
| `tsconfig.json` | TypeScript compiler options |
| `eslint.config.mjs` | Linting for code quality |
| `postcss.config.mjs` | CSS processing (Tailwind v4) |
| `next-env.d.ts` | Next.js type references for TypeScript |
| `.gitignore` | Excludes build artifacts and secrets from git |

### Target additions (not yet in repo)

These will appear during development per §5:

| Path | Role |
|------|------|
| `components/` | Shared React UI components |
| `lib/` | Utilities (`db/`, `whatsapp.ts`, etc.) |
| `data/` | Demo seed JSON (Phase 1 bootstrap) |
| `drizzle/` | Database migrations |
| `.env.local` | Local secrets (never commit) |

---

*Last updated: July 2026 — update this file when scope or stack decisions change.*
