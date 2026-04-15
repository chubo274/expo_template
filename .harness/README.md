# `.harness/` — Outer Harness

This directory implements the **Outer Harness** for AI-assisted development in this repository. It is **process-centric** (workflow is the spine; humans and agents both follow it) and **data-driven** (every action emits structured data so it can be inspected, costed, and improved).

The Inner Harness is what the model vendor ships (the model itself, the execution environment, base tools). The Outer Harness is what *we* build on top: the rules, artifacts, and audit trail that make agent work reliable at scale.

## Sources

- Concept: <https://phucnt.substack.com/p/outer-harness-tai-sao-process-va>
- Artifacts: <https://walkinglabs.github.io/learn-harness-engineering/en/resources/>

## The five pillars

| # | Pillar | Lives in |
|---|---|---|
| 1 | Cost Attribution | `logs/` (+ auto-populated by `hooks/on-stop.sh`) |
| 2 | Multi-layer Knowledge Flow | `knowledge/` → root `CLAUDE.md` → `tasks/<id>/spec.md` |
| 3 | Task Tracking | `tasks/` (one dir per task, audit trail) |
| 4 | Quality Gates | `gates/` (independent checks before merge) |
| 5 | Audit & Analytics | `analytics/` (queries + retros over `logs/runs.jsonl`) |

## Quickstart

1. **Read `AGENTS.md` first** — it tells any agent (Claude Code, Codex, etc.) what to load and how to behave.
2. Edit `config.env` once per repo (commands for lint, typecheck, test).
3. Start a new task: `bash .harness/init.sh <task-id> "<short title>"`.
4. Fill in the generated `tasks/<id>/spec.md`, get approval recorded in `approvals.md`, log progress in `progress.md`.
5. Before merging, run `bash .harness/gates/run-gates.sh` and walk through `gates/checklist.md`.
6. Periodically run `bash .harness/analytics/summarize.sh` and write a retro from `analytics/retrospectives/TEMPLATE.md`.

## Reusing in another repo

`.harness/` is intentionally self-contained. To copy:

```bash
cp -r .harness /path/to/other-repo/
cp .harness/config.example.env .harness/config.env  # edit values
cp .harness/feature_list.example.json .harness/feature_list.json
cp .harness/hooks/settings.example.json .claude/settings.json
```

There is no path inside `.harness/` that hardcodes a project name or absolute path — everything project-specific is funneled through `config.env`.

## Layout

See `AGENTS.md` for the agent-facing layout summary, and the docs in each subdirectory for details.
