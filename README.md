# HomeVision

Front-end for browsing houses: React, Vite, TypeScript, and TanStack Query.

## Requirements

- **Node.js** — use a version compatible with this repo’s Vite toolchain (see Vite’s [environment docs](https://vite.dev/guide/env-and-mode.html) and your local `npm` warnings if any).

## Run locally

1. **Install dependencies**
  ```bash
   npm install
  ```
2. **Environment variables**
  Copy the example file and set your API origin:
   Edit `.env` and set:
  - `**VITE_API_BASE_STAGING`** — Base URL of the houses API (no trailing slash required; the app normalizes it). Example: `https://api.example.com`
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


## Deploy (Vercel)

This app is a **static Vite build**. Deploy it on [Vercel](https://vercel.com) by importing the Git repository.

1. **Import the project** in the Vercel dashboard and connect your Git provider (GitHub, GitLab, or Bitbucket).
2. **Build settings** (defaults are usually correct):
  - **Framework preset:** Vite  
  - **Build command:** `npm run build`  
  - **Output directory:** `dist`  
  - **Install command:** `npm install` (or your package manager equivalent)
3. **Environment variables** (Project → Settings → Environment Variables):
  - Add `**VITE_API_BASE_STAGING`** with the API base URL for each environment you use (**Production**, **Preview**, etc.).
   Vite only exposes variables prefixed with `VITE_` to the client bundle.
4. **Deploy** — for the Rhythmic setup, `**main`** is the **Production** branch: pushes to `main` trigger production deployments. 

## API configuration

House requests are built from `**VITE_API_BASE_STAGING`** in `[src/features/api.ts](src/features/api.ts)` and the house API helpers under `[src/features/house/](src/features/house/)`.