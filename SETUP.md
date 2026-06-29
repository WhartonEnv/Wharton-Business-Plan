# Wharton Business Plan — Setup

A Next.js 15 dashboard with **Clerk** authentication and a **Convex** backend.
The original static dashboard is preserved in [`legacy/`](legacy/).

---

## Status

| Piece | State |
|-------|-------|
| Node.js 24 | ✅ installed at `~/.local/node` (added to your PATH in `~/.zshrc`) |
| Next.js app + dependencies | ✅ installed |
| Dashboard migrated to React (7 tabs) | ✅ done |
| Convex backend | ✅ **live** — project `wharton-business-plan`, deployment `quaint-poodle-7` |
| Team data seeded (16 people) | ✅ done |
| Clerk authentication | ✅ linked (app `Wharton Business Plan`), keys in `.env.local` |
| Clerk ↔ Convex JWT (`convex` template + issuer) | ✅ configured automatically via Clerk CLI |
| First admin user | ⏳ sign up in the app, then grant `role: admin` (see below) |

---

## Day-to-day: running the app

Open **two terminals** in this folder:

```bash
# Terminal 1 — backend (keeps types in sync, watches convex/)
npm run dev:backend     # = npx convex dev

# Terminal 2 — frontend
npm run dev             # http://localhost:3000
```

> The frontend will not load until the Clerk keys below are filled in.

---

## Clerk — already configured ✅

Set up via the Clerk CLI (`clerk init`) and the Clerk Backend API:

- App **Wharton Business Plan** (`app_3Fo7EMz8yq7gRPWe1CByxPScQMq`) linked; keys in `.env.local`.
- `ClerkProvider` added in `app/layout.tsx`; `ConvexProviderWithClerk` bridges Convex to Clerk.
- JWT template **`convex`** created with claims `{ "aud": "convex", "role": "{{user.public_metadata.role}}" }`.
- Convex issuer set: `CLERK_JWT_ISSUER_DOMAIN = https://exciting-ghost-60.clerk.accounts.dev`.

### Remaining: create the first admin (you)
Roles: **admin** (directors — can edit numbers) vs **viewer** (read-only, the default).

1. Start the app (below) and **sign up** at <http://localhost:3000> with your email.
2. Grant yourself admin — either:
   - **CLI:** `clerk api -X PATCH /users/<your_user_id>/metadata -d '{"public_metadata":{"role":"admin"}}' --yes`
     (find your id with `clerk api /users`), or
   - **Dashboard:** Clerk → **Users** → your user → **Public metadata** → set `{ "role": "admin" }`.
3. Reload the dashboard — you'll see the **Admin — can edit** pill and inline-editable fields.

Everyone else is a viewer unless explicitly given `"role": "admin"`.

### Run it
```bash
npm run dev:backend   # terminal 1
npm run dev           # terminal 2 → http://localhost:3000
```

---

## How it fits together

```
Browser ──> Clerk (who are you?) ──> Next.js (middleware login wall)
                  │
                  └── JWT (incl. role) ──> Convex (queries/mutations, admin checks)
```

- **`middleware.ts`** — blocks every route except `/sign-in` and `/sign-up`.
- **`app/ConvexClientProvider.tsx`** — wires Clerk + Convex (`ConvexProviderWithClerk`).
- **`convex/schema.ts`** — `teamMembers` + `settings` tables.
- **`convex/teamMembers.ts`, `settings.ts`** — reads for any signed-in user;
  writes require `role === "admin"` (enforced in `convex/auth.ts`).
- **`convex/seed.ts`** — one-off seed of current team data (`npx convex run seed:run`).

## Editing data
- **Bonus** tab → edit annual salaries inline.
- **Utilisation** tab → edit target util %, contracted hours, rate per hour.
- **Salary** tab → full team roster: edit salaries, add / remove people.

All edits are admin-only and persist instantly for every viewer.

## Useful commands
```bash
npx convex dashboard                       # open the Convex data/admin UI
npx convex run seed:run                     # re-seed (no-op if already populated)
npx convex env list                         # see backend env vars
npx convex env set CLERK_JWT_ISSUER_DOMAIN <url>
```
