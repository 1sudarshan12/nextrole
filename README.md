<div align="center">
  <img src="public/favicon.svg" alt="Nextrole logo" width="72" />
  <h1>Nextrole</h1>
  <p><strong>Your remote career, in motion.</strong></p>
  <p>A private workspace to discover remote software engineering jobs, organize applications,<br/>compare opportunities, and focus on the next useful step.</p>
  <p>
    <img alt="React 19" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white" />
    <img alt="Cloudflare Workers" src="https://img.shields.io/badge/Cloudflare-Workers-f38020?logo=cloudflare&logoColor=white" />
    <img alt="Database" src="https://img.shields.io/badge/Database-D1%20%2B%20Drizzle-4b6b3c" />
  </p>
</div>

## Why Nextrole?

A job search can quickly become a collection of browser tabs, saved links, and forgotten follow-ups. Nextrole brings discovery and application tracking into one calm workspace, with a focus on remote software engineering roles.

It supports frontend, backend, and full-stack searches, including React, Next.js, and TypeScript. Nepal-focused source filters and explicit eligibility notes help make international listings easier to review.

## Features

| Workspace | What you can do |
| --- | --- |
| **Overview** | See your pipeline, application activity, compensation goal, and urgent next steps. |
| **Job discovery** | Search live Himalayas listings; filter by source location, experience, and sort order; view full descriptions; and load more results. |
| **Opportunities** | Add or edit roles, salary ranges, skills, priority, notes, listing links, and remote eligibility. Switch between list and board views. |
| **Application stages** | Move roles through Saved, Applied, Screening, Interview, Offer, and Closed. |
| **Next actions** | Track application deadlines and follow-ups, with overdue, weekly, and undated views. |
| **Role comparison** | Compare up to four opportunities using your own criteria, 1–5 ratings, and adjustable weights. |
| **Preferences & export** | Set a compensation target and download saved opportunities and preferences as JSON. |
| **Private storage** | Keep records scoped to the signed-in user in D1, behind the hosted Site's access controls. |

The interface adapts to desktop and mobile, including compact opportunity cards and mobile navigation. A separate fictional demo lets you explore tracking without changing your saved workspace.

### Job-source coverage

| Source | Current integration |
| --- | --- |
| **Himalayas** | Live results inside Nextrole using the official public search API. Each listing includes source attribution and the original application link. |
| **LinkedIn** | Opens a remote-job search on LinkedIn with the same keywords. Results are not imported into Nextrole. |
| **HiringCafe** | Opens a remote-only classic search on HiringCafe with the same keywords. Results are not imported into Nextrole. |

**This is not a combined feed from all three platforms.** Search results shown inside the app currently come from Himalayas.

Clicking **Apply** opens the source application page. Nextrole does not submit applications, contact employers, or automatically mark a role as applied. Saving a discovered role opens a prefilled opportunity form for review.

Location filters reflect source metadata. A listing can describe additional country, language, or timezone restrictions in its full description. Imported roles default to **Check eligibility** unless Nepal is explicitly listed in compatible source metadata.

## Tech stack

| Layer | Technology |
| --- | --- |
| Interface | React 19, TypeScript, responsive CSS, Lucide icons |
| Application runtime | Vinext with Next.js-compatible App Router APIs, Vite |
| Server | Cloudflare Workers |
| Data | Cloudflare D1 with Drizzle ORM and versioned SQL migrations |
| Validation | Zod on the client and server |
| Hosted identity | Sites-managed ChatGPT sign-in and Site access policies |
| Job discovery | Server-side Himalayas requests, caching, and pagination |

## Run locally

### Requirements

- **Node.js 24 or newer** is recommended. Verification scripts use Node's built-in SQLite API.
- **pnpm 11.25.0**, matching the repository's `packageManager` field.
- An internet connection for installation and live discovery.

### 1. Install dependencies

```bash
git clone https://github.com/1sudarshan12/nextrole.git
cd nextrole
pnpm install --frozen-lockfile
```

No job-feed API key is required for the current anonymous Himalayas integration.

### 2. Build and initialize local data

```bash
pnpm build
pnpm db:migrate:local
```

The migration initializes local D1 storage under `.wrangler/state`. Local and hosted databases are separate. Runtime state is excluded from Git.

### 3. Start development

```bash
pnpm dev
```

Open **http://localhost:5173**. A clean local clone uses the portable development profile. Its **Sign in with ChatGPT** link supplies a local test identity without production credentials. Mock identity is limited to loopback development and is not included in production builds.

If bindings or the database schema change, rebuild and apply new local migrations as appropriate.

## Useful commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start local development. |
| `pnpm build` | Build the Worker and browser assets. |
| `pnpm start` | Preview the built Worker locally. |
| `pnpm typecheck` | Check TypeScript without emitting files. |
| `pnpm test` | Run tracker and discovery verification scripts. |
| `pnpm db:generate` | Generate migrations after schema changes. |
| `pnpm db:migrate:local` | Apply the initial local migration. |

`db:migrate:local` is intended for initial setup. Apply later migrations in order rather than replaying already-applied migrations.

## Project structure

| Path | Responsibility |
| --- | --- |
| `app/tracker.tsx` | Dashboard, applications, comparisons, preferences, and actions. |
| `app/discovery.tsx` | Search interface, source links, result cards, and role details. |
| `app/api/` | Data, opportunity, preference, and discovery endpoints. |
| `app/chatgpt-auth.ts` | Helpers for platform-provided identity and sign-in paths. |
| `lib/model.ts` | Shared schemas, types, scoring, salaries, and action ordering. |
| `lib/discovery.ts` | Normalization, safe URLs, caching, queries, and import mapping. |
| `db/` and `drizzle/` | D1 access, Drizzle schema, and versioned migrations. |
| `worker/` | Production Worker entrypoint. |
| `scripts/` | Runtime, build, development, and verification helpers. |
| `.openai/hosting.json` | Logical hosting bindings; no live Site project ID is included. |

## Comparison scoring

Rate each criterion from **1** (poor fit) to **5** (excellent fit). Its weight determines its influence on the overall score:

```text
Score = 100 × Σ[(rating / 5) × weight] / Σ[rated criterion weights]
```

Unrated criteria are excluded, and rating coverage is visible, for example **3/5 criteria rated**. A role without ratings remains **Unrated**. Weights do not need to total 100.

Salary values retain their original currencies and pay periods. No automatic currency conversion or take-home estimate is performed. If an imported salary cannot be represented by the tracker's editable fields, its original value is preserved in the notes.

## Privacy and deployment

Hosted records belong to the stable authenticated Site user ID. Read, update, and delete queries are scoped to that ID. Mutating endpoints reject cross-origin requests.

The application uses **Sites** for owner-only access, ChatGPT authentication, Worker hosting, and D1 provisioning. This export contains no authentication tokens, database contents, local runtime state, or live deployment identity. A new deployment needs its own Site configuration and database.

For hosting outside Sites, supply an equivalent authentication and access layer before exposing the app. The `oai-authenticated-user-*` headers are trusted only when injected by the hosting platform; they are not a standalone authentication mechanism.

Source repository visibility and deployed workspace access are separate. The existing hosted workspace remains private.

## Verification

The included scripts cover **24 checks**:

- Opportunity persistence, stage updates, deletion, required fields, and salary ranges.
- User-scoped access, missing identity, and cross-origin write rejection.
- Goals, custom criteria, weighted scores, and next-action ordering.
- Source normalization, expiry, safe links, location metadata, and salary imports.
- Search parameters, duplicate removal, caching, rate limits, and invalid queries.

Tracker tests exercise the actual API handlers with a SQLite-backed D1 adapter and test identities. Discovery tests use controlled responses and optionally a real response fixture when available locally.

Desktop and a 390px mobile viewport were also checked. Live full-stack and React searches were verified against the hosted endpoint. These checks are not a full production test suite and do not guarantee that a listing remains open.

## Attribution

Live listings are provided by [Himalayas](https://himalayas.app). See the [Remote Jobs API documentation](https://himalayas.app/api) for integration details and usage requirements. Vendored libraries and helpers retain their included upstream license notices.

---

Built for a focused remote job search by [Sudarshan Adhikari](https://github.com/1sudarshan12).
