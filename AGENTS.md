# AGENTS.md

## Project Basics
- Package manager/runtime: use `bun`.
- Preferred commands:
  - `bun install`
  - `bun run dev`
  - `bun run build`
  - `bun run lint`

## UI Guidance
- Keep UI minimal and clean.
- Use a strict black/white theme.
- Avoid decorative styles (heavy shadows, gradients, bright accents).
- Favor simple layouts, short copy, and clear hierarchy.

## Component Guidance
- Use existing shadcn components/patterns when possible.
- Keep component styling consistent and lightweight.

## Cursor Cloud specific instructions
- **Single service**: This is a static Astro site with no backend/database. The only service to run is `bun run dev` (Astro dev server on port 4321).
- **Commands**: See `README.md` for standard dev/build/lint commands. All use `bun run <script>`.
- **Pre-existing lint error**: `src/components/ui/button.tsx` has a `react-refresh/only-export-components` warning — this is a known pre-existing issue in the repo.
- **OG image generation**: `bun run build` runs `scripts/generate-og-image.mjs` (requires `sharp`) before `astro build`. The dev server does not need this step.
- **No env vars required**: The site URL defaults to `https://ade.codes` for local development; no `.env` file is needed.
