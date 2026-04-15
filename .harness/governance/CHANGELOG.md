# Changelog — `.harness/`

> Records changes to the Outer Harness template itself. Append-only; newest entry on top. Use [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) categories: Added, Changed, Deprecated, Removed, Fixed, Security.

## [0.1.1] — 2026-04-15

### Changed

- `init.sh` now enforces task ids of the form `DAT-<number>` (e.g. `DAT-001`, `DAT-42`). Previous regex `[A-Za-z0-9._-]+` accepted any ASCII id.
- `AGENTS.md` — Task tracking protocol section documents the new `DAT-<number>` convention.

## [0.1.0] — Initial template

### Added

- All five pillars wired up:
  - **Cost Attribution** — `logs/runs.jsonl` + `schema.json` + `validate.sh`, auto-populated by `hooks/on-stop.sh`.
  - **Multi-layer Knowledge Flow** — `knowledge/org.md` and `knowledge/project.md` linking to root `CLAUDE.md`.
  - **Task Tracking** — `tasks/TEMPLATE/` (spec, plan, approvals, progress) and `tasks/INDEX.md`; `init.sh` bootstraps new tasks.
  - **Quality Gates** — `gates/checklist.md`, `gates/evaluator-rubric.md`, `gates/run-gates.sh` reading commands from `config.env`.
  - **Audit & Analytics** — `analytics/summarize.sh`, `analytics/queries/{cost-by-task,failures}.md`, `analytics/retrospectives/TEMPLATE.md`.
- Walking Labs artifacts: `feature_list.example.json`, `init.sh`, session handoff section in task `progress.md`.
- `AGENTS.md` — operating instructions consumed by any AI coding agent in this repo.
- `config.env` + `config.example.env` — single source of truth for project-specific tooling commands.
- `governance/OWNERS.md` and this `CHANGELOG.md`.
