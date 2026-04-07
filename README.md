# HomeVision

Front-end for browsing houses: React, Vite, TypeScript, and TanStack Query. It includes a human-in-the-loop flow to approve or reject listings and export audit decisions.

## Live app (staging)

**Review / demo:** [https://home-vision-staging.vercel.app/](https://home-vision-staging.vercel.app/)

The houses API base URL is supplied at build time via `VITE_API_BASE_STAGING`. For this deployment, that variable is configured in the Vercel project (Project → Settings → Environment Variables). You can try the staging site without a local `.env`. See **Deploy (Vercel)** below for how variables are used and how to set them for other environments.

## Requirements

* **Node.js.** Use a version compatible with this repo's Vite toolchain (see Vite's [environment docs](https://vite.dev/guide/env-and-mode.html) and your local `npm` warnings if any).

## Run locally

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy [`.env.example`](.env.example) to `.env` and set the API origin:

   * `VITE_API_BASE_STAGING`: base URL of the houses API (no trailing slash required; the app normalizes it). Example: `https://api.example.com`

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

[All closed pull requests on GitHub](https://github.com/robertdb/homeVision/pulls?q=is%3Apr+is%3Aclosed)

## Deploy (Vercel)

The staging URL at the top of this README is deployed with the same flow. The Vercel project already defines `VITE_API_BASE_STAGING` for that environment (do not commit real API URLs or secrets in this repo).

This app is a **static Vite build**. Deploy it on [Vercel](https://vercel.com) by importing the Git repository.

1. **Import the project** in the Vercel dashboard and connect your Git provider (GitHub, GitLab, or Bitbucket).

2. **Build settings** (defaults are usually correct):

   * **Framework preset:** Vite
   * **Build command:** `npm run build`
   * **Output directory:** `dist`
   * **Install command:** `npm install` (or your package manager equivalent)

3. **Environment variables** (Project → Settings → Environment Variables):

   * Add `VITE_API_BASE_STAGING` with the API base URL for each environment you use (**Production**, **Preview**, etc.). Vite only exposes variables prefixed with `VITE_` to the client bundle.

4. **Deploy.** For the Rhythmic setup, `main` is the **Production** branch. Pushes to `main` trigger production deployments.

## API configuration

House requests are built from `VITE_API_BASE_STAGING` in [`src/features/api.ts`](src/features/api.ts) and the house API helpers under [`src/features/house/`](src/features/house/).
