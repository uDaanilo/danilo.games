# Copilot instructions

## Build, type-check, lint
- `npm run dev`
- `npm run build` (runs `type-check` then `build-only`)
- `npm run build-only`
- `npm run type-check` (uses `vue-tsc --build` for `.vue` type support)
- `npm run lint` (runs `lint:oxlint` and `lint:eslint`, both with `--fix`)
- `npm run format` (Prettier on `src/`)

## High-level architecture
- Vite + Vue 3 app. Entry point is `src/main.ts`, which creates the app, installs router and i18n, and loads global styles from `src/app/styles/main.css`.
- `App.vue` renders `HomePage` (`src/pages/home/ui`), which composes multiple “window” widgets from `src/widgets/*/ui`.
- Feature-sliced layout: `app` (bootstrap/i18n/styles), `pages` (route-level), `widgets` (page sections), `entities` (domain data), `features` (composables), `shared` (reusable UI + types).
- Page content is driven by `vue-i18n` locale files in `src/locales`; `entities/profile` and `entities/portfolio` expose typed composables that read structured translation data via `tm()`.

## Key conventions
- Use the `@` alias for `/src` imports (configured in `vite.config.ts`).
- `shared/ui/Window.vue` is the standard shell for widget windows; widgets pass window title/body content via props/slots.
- Structured locale content (profile/portfolio arrays/objects) is guarded in `entities/*/model` before use.
- Static assets live in `public/` and are referenced by absolute URLs (e.g., `/izumi_konata/scene.gltf` for the Three.js mascot).
