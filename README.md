# Nestora Interiors — Frontend (Next.js)

Marketing site for the interior-design business. Built with **Next.js 16 (App
Router) + TypeScript + Tailwind v4 + Framer Motion**. Talks to the Django REST
backend in `../K6_backend`.

> Branding ("Nestora", emerald + brass palette, copy, layout) is original.
> Use the reference site only for inspiration, never copy assets/text.

## Pages
- `/` — Home: hero, services, how it works, portfolio, testimonials, CTA
- `/services` — services grid + process
- `/portfolio` — project gallery with category filter
- `/about` — story + values
- `/contact` — free-consultation lead form

## Data flow
- Server Components fetch from the backend (`src/lib/api.ts`, `cache: "no-store"`).
- If the backend is down or unseeded, sections fall back to sensible defaults
  (the site never looks broken).
- The contact/consultation form (`LeadForm`) POSTs to `/api/contact/` and
  `/api/consultation/` from the browser.

## Run locally
```powershell
# 1. make sure the backend is running first (separate terminal):
#    cd ..\K6_backend ; venv\Scripts\Activate.ps1 ; python manage.py runserver

# 2. start the frontend
npm install      # first time only
npm run dev
```
- Site:    http://localhost:3000
- Backend: http://127.0.0.1:8000  (set via `NEXT_PUBLIC_API_URL` in `.env.local`)

## Config
`.env.local`:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```
Point this at your deployed backend URL in production (e.g. on Vercel).

## Re-skin
All brand colours/fonts live in `src/app/globals.css` (`@theme` block) and
`src/app/layout.tsx` (fonts). Change those to restyle the whole site.
