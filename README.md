# HomeVision

Front-end for browsing houses: React, Vite, TypeScript, and TanStack Query. It includes a human-in-the-loop flow to approve or reject houses and export audit decisions.

## Live app (staging)

**Review / demo:** [https://home-vision-staging.vercel.app/](https://home-vision-staging.vercel.app/)

The houses API base URL is supplied at build time via `VITE_API_BASE_STAGING`. For this deployment, that variable is configured in the Vercel project (Project → Settings → Environment Variables). You can try the staging site without a local `.env`. See **Deploy (Vercel)** below for how variables are used and how to set them for other environments.

## Requirements

- **Node.js.** Use a version compatible with this repo's Vite toolchain (see Vite's [environment docs](https://vite.dev/guide/env-and-mode.html) and your local `npm` warnings if any).

## Run locally

1. **Install dependencies**
  ```bash
   npm install
  ```
2. **Environment variables**
  Copy `[.env.example](.env.example)` to `.env` and set the API origin:
  - `**VITE_API_BASE_STAGING`:** base URL of the houses API (scheme + host, **no** trailing slash; the app strips one if present). Example: `https://api.example.com`. Vite only exposes variables prefixed with `VITE_` to the browser bundle.
  - **Optional empty value:** If you omit this variable or leave it blank, `[getApiOrigin()](src/features/api.ts)` returns `""` in non-production builds so requests use **same-origin relative** paths such as `/api_project/houses?...` (useful with a dev proxy or when the API is served from the same host).
3. **Start the dev server**
  ```bash
   npm run dev
  ```
   Open the URL Vite prints (usually `http://localhost:5173`).

### Other scripts


| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run build`   | Production build → `dist/`         |
| `npm run preview` | Serve the production build locally |
| `npm run lint`    | ESLint                             |
| `npm test`        | Jest                               |


## Testing strategy

Tests use **Jest** with **ts-jest** and `**@testing-library/react`** where the UI matters.

- **API / data layer:** `[src/features/house/apis.test.ts](src/features/house/apis.test.ts)` exercises `[fetchHousesPage](src/features/house/apis.ts)` for a valid page, non-OK HTTP (`FetchHousesPageError`), **rejected `fetch`** (`FetchHousesNetworkError` — offline, DNS, CORS, etc.), malformed JSON payloads (`HousesPageValidationError`), and bad `Content-Type` when headers are present.
- **Audit domain:** `[useAuditHistory.test.ts](src/components/audit-history/useAuditHistory.test.ts)` and `[auditHelpers.test.ts](src/components/audit-history/auditHelpers.test.ts)` cover store behavior and CSV helpers.
- **Components:** `[house-feed.test.tsx](src/components/house-feed/house-feed.test.tsx)` covers loading, first-page failure + retry, pagination / sentinel, and second-page failure UI; `[house-card.test.tsx](src/components/house-card/house-card.test.tsx)` covers the card; `[App.test.tsx](src/App.test.tsx)` smoke-tests the shell.

Run `npm test` before pushing; CI should do the same.

## Implementation timeline (pull requests)

This project was built incrementally via pull requests. **Each PR includes a description of what changed and why.** Open the links below for full context.

1. [Initial Architecture](https://github.com/robertdb/homeVision/pull/1)
2. [UI System and Mocks](https://github.com/robertdb/homeVision/pull/2)
3. [Domain Structure for the API and Hooks](https://github.com/robertdb/homeVision/pull/3)
4. [House Feed API Error Handling](https://github.com/robertdb/homeVision/pull/4)
5. [Placeholder When House Images Fail to Load](https://github.com/robertdb/homeVision/pull/5)
6. [Vercel Deploy and Production Branch Docs](https://github.com/robertdb/homeVision/pull/6)
7. [Human in the Loop Audit for Properties](https://github.com/robertdb/homeVision/pull/7)
8. [Component File Renaming and Test Updates](https://github.com/robertdb/homeVision/pull/8)
9. [UI Polish Favicon and README Rhythm](https://github.com/robertdb/homeVision/pull/9)

[All closed pull requests on GitHub](https://github.com/robertdb/homeVision/pulls?q=is%3Apr+is%3Aclosed)

## Deploy (Vercel)

1. Import this repository in [Vercel](https://vercel.com) (Framework: **Vite**).
2. Keep default build settings (`npm install`, `npm run build`, output `dist`).
3. Set `VITE_API_BASE_STAGING` for each environment and deploy (`main` is Production in this setup).

## API configuration

House requests are built from `VITE_API_BASE_STAGING` in `[src/features/api.ts](src/features/api.ts)` and the house API helpers under `[src/features/house/](src/features/house/)`.

## House grid and performance

I considered a virtualized list for the house grid at one point. Performance checks stayed consistently strong (for example Lighthouse on the staging URL: mobile performance **99**, FCP and LCP about **0.4s**, TBT **40ms**, CLS **0** in Chrome DevTools), so I did not prioritize building virtualization.

## Design rationale

- **No virtualization yet:** measured feed performance stayed strong on staging, so complexity was deferred.
- **Pagination UX:** auto-load keeps scrolling smooth, while explicit **Load more** and retry controls provide predictable behavior when intersection observers are unavailable or requests fail.

