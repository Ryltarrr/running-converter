# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Running Converter is a Progressive Web App (PWA) for runners that provides speed/pace conversion, VMA (Max Aerobic Speed) training tables, and race time predictions using Riegel's formula.

## Tech Stack

- **Framework:** SvelteKit 2 with Svelte 5
- **Language:** TypeScript
- **Styling:** Tailwind CSS with @tailwindcss/forms plugin
- **Testing:** Vitest
- **Build:** Vite, static adapter (outputs to `build/`)

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # TypeScript/Svelte type checking
npm run lint         # Prettier check + ESLint
npm run format       # Auto-format with Prettier
npm test             # Run Vitest (watch mode by default)
npm test -- --run    # Run tests once without watch
```

CI runs: lint → build → test (Node 22.x)

## Version Control (Jujutsu)

This repo uses Jujutsu (jj) instead of git.

```bash
jj status                # Show working copy status
jj log                   # Show commit history
jj diff                  # Show changes in working copy
jj new                   # Create new change on top of current
jj describe -m "msg"     # Set commit message for current change
jj squash                # Squash current change into parent
jj edit <change>         # Edit an existing change
jj git push              # Push to git remote
jj git fetch             # Fetch from git remote
```

Key differences from git:

- No staging area - all changes are automatically tracked
- Working copy is always a commit (the "working copy commit")
- Use `jj new` to start fresh changes, `jj squash` to combine them
- Branches are called "bookmarks": `jj bookmark create/set/delete`

**Workflow requirement:** Every change must be in its own jj change with a
description. Before starting any edit use `jj new` to create a fresh change.
After completing work, use `jj describe -m "message"` to describe it.

## Architecture

### Routes (`src/routes/`)

- `/converter` - Speed ↔ Pace converter (default route, redirected from `/`)
- `/mas` - VMA training intensity table (5%-120%)
- `/race-predictor` - Race time prediction using Riegel's formula
- `/speed-predictor` - Calculate speed/pace from distance and time

### Business Logic (`src/lib/`)

- `speed.ts` / `pace.ts` - Unit classes implementing shared `Unit` interface with conversions
- `distance.ts` - Race distance constants, Riegel's formula, time formatting utilities
- `storage.ts` - localStorage helper for persisting VMA value

### Key Patterns

- Svelte 5 runes: `$state`, `$derived`, `$derived.by` for reactivity
- Static site deployment (SvelteKit adapter-static)
- PWA with service worker update detection in root layout

### Riegel's Formula

Used for race prediction: `T2 = T1 * (D2/D1)^1.06`
