<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/22d06bed-c6c6-4338-9511-1e7412ee7749

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`


## YM-ki server and login troubleshooting

YM-ki uses an Express backend for authentication and data. Do not deploy it as a static-only site: requests such as `/api/auth/login` must reach the Express process.

### Start in Google AI Studio / local development

1. Install dependencies with `npm install`.
2. Start the full application with `npm run dev` (this runs `tsx server.ts`, which mounts Vite and the `/api` routes in the same server).
3. Confirm the backend is reachable by opening `/api/health` on the same preview origin. A working backend returns JSON with `status: "ok"`.
4. Then try signing in again. If `/api/health` does not return JSON, the issue is the server/runtime configuration, not the account password.

### Production

Run `npm run build`, then set `NODE_ENV=production` and start with `npm start`. The start command uses `tsx` so the TypeScript Express server is executed correctly. The host must support a persistent Node.js server and writable `data/` storage; a static hosting target alone cannot provide login.

### Important data note

The existing `data/db.json` and `data/backups/backup_latest.json` are retained in this repair package. Do not delete or replace them when troubleshooting login. Keep a separate backup before deploying because file-based storage may be ephemeral on some hosting platforms.
