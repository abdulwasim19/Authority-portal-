# RAAHAT — Authority Portal (M6)

React + Vite source for the Authority/Admin portal, restyled to match the
RAAHAT AI brand system used by the Counsellor Portal (dark indigo sidebar,
greeting topbar, icon KPI cards, tag-based case tables, confidence bars).

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

Open the printed local URL. Demo accounts (see Login screen): `authority1`
/ `admin1` (role = authority, full access) and `victim1` / `counsellor1`
(blocked, for testing RBAC) — password `raahat` for all.

> This was written and syntax/import-checked with esbuild in an offline
> sandbox (no network access to run `npm install` there), so please run
> `npm run dev` locally as your first step and report anything that breaks
> — happy to fix it in the next pass.

## What's real vs mocked

Everything routes through `src/services/apiClient.js`. Every feature's
`*Api.js` file (e.g. `src/features/cases/services/casesApi.js`) checks
`VITE_USE_MOCKS`:

- `true` (default) → serves data from `src/mocks/` (fake but structurally
  realistic, standing in for M3's backend).
- `false` → calls the real backend at `VITE_API_BASE_URL`.

**To go live:** set `VITE_USE_MOCKS=false` in `.env` once M3 confirms the
endpoints. No component code needs to change — that's the whole point of
routing everything through the `*Api.js` layer.

Each `*Api.js` file has a comment showing the expected real endpoint
shape — use these as the starting point for the M3↔M6 contract conversation
in `docs/api-dependencies.md` (per your Member 6 handoff spec).

## Folder structure

Matches your team's M6 spec at the top level:

```
src/
  app/            entry point, providers
  routes/         AppRoutes, ProtectedRoute (RBAC gate)
  pages/          one file per screen (auth, dashboard, cases, analytics, reports, errors)
  features/       feature-sliced: components/ hooks/ services/ per domain
  components/     shared layout, feedback (loading/empty/error), common (badges)
  services/       apiClient.js — the only place fetch() is called
  mocks/          mock data + handlers, swappable for the real API
  styles/         global.css — design tokens shared with Counsellor Portal
```

This pass consolidates some of the very granular files from the full spec
(e.g. one `KpiCard.jsx` primitive behind `CriticalCasesCard.jsx` /
`HighPriorityCasesCard.jsx` / etc., rather than fully separate markup per
card) to keep the codebase honest about what has real logic in it. Split
further as each piece grows real behavior.

## What M6 intentionally does NOT do here (per your spec)

- No case-decision UI (Keep Priority / Escalate / Submit Review) — that's
  the Counsellor Portal's (M5) job. The Case Review page here is
  **read-only oversight**.
- No client-side KPI math — every number in `mocks/mockData/aggregates.js`
  is pre-aggregated once, mirroring what M3 should return already computed.
  Components only display it.
- No causal language in Analytics — trend text stays descriptive.
- Session is in-memory only (no localStorage) until the team decides on a
  real auth persistence strategy with M3/M1.

## Still to do before this is demo/production ready

- [ ] Confirm real endpoint shapes with M3, flip `VITE_USE_MOCKS=false`
- [ ] Add `react-router-dom` types/tests, wire up `docs/` files per spec
- [ ] Accessibility pass (keyboard nav, focus states) beyond the basics here
- [ ] Real auth/session persistence strategy
- [ ] E2E tests (`e2e/authority-journey`, `e2e/rbac`) per your testing plan
