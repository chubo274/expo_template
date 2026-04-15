# Project-level context

This file is the bridge between organization-level rules (`./org.md`) and the repo's actual code architecture (root `CLAUDE.md`). Keep it short — anything specific to code structure belongs in `CLAUDE.md`, not here.

## Where to read next

- **Repo architecture, commands, conventions:** [`../../CLAUDE.md`](../../CLAUDE.md)
- **Active task (if any):** `../tasks/<task-id>/spec.md`
- **Org-level rules:** [`./org.md`](./org.md)

## Project summary

Replace this section with a 3–5 sentence description of the product and its current phase. Example:

> A React Native (Expo) mobile app. Current phase: pre-MVP scaffolding. Auth, theming, i18n, and state management are wired; product features have not started. Primary platforms: iOS + Android via Expo managed workflow.

## Stakeholders

| Role | Name / handle |
|---|---|
| Product owner | {{name}} |
| Tech lead | {{name}} |
| Designer | {{name}} |
| QA | {{name}} |

## In-flight initiatives (high level)

Replace with a short bullet list of what is currently being worked on at the project level. For per-task detail, see `../tasks/INDEX.md`.

- {{initiative 1 — one line}}
- {{initiative 2 — one line}}

## Known constraints specific to this project

- {{e.g. must support iOS 15+; Android 8+}}
- {{e.g. backend API at `https://api.example.com` is rate-limited to 60 req/min per user}}
- {{e.g. release cadence: every other Thursday}}

## What's deliberately out of scope

- {{e.g. web platform — Expo web is enabled in app.json but not a target}}
- {{e.g. offline-first sync — defer until v2}}
