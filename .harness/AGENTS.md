# Agent operating instructions

**Read this file at the start of every session.** It tells you what context to load, how to log your work, and what boundaries to respect. These instructions apply to any AI coding agent (Claude Code, Codex, Cursor, etc.) operating in this repository.

## Load order at session start

Read these in order. Each layer narrows scope:

1. `.harness/knowledge/org.md` — org-wide rules (style, compliance, security)
2. `.harness/knowledge/project.md` — project-level summary (points to root `CLAUDE.md`)
3. Root `CLAUDE.md` — repo architecture, commands, conventions
4. `.harness/tasks/<task-id>/spec.md` (if working on a tracked task) — what is being asked

If no task id is provided and the user gives you a non-trivial request, **first run `bash .harness/init.sh <task-id> "<title>"`** to create a task dir, then fill in `spec.md` before doing implementation work.

## Logging protocol (Pillar 1: Cost Attribution)

Every agent run **must** end with one row appended to `.harness/logs/runs.jsonl`. In repos where `.claude/settings.json` wires `.harness/hooks/on-stop.sh` as a `Stop` hook, this happens automatically. If you suspect the hook is not wired (no row appears after a session), append manually using the schema in `.harness/logs/schema.json`.

Required fields: `timestamp`, `task_id`, `agent`, `model`, `outcome`. See `.harness/logs/README.md` for the full protocol.

## Task tracking protocol (Pillar 3)

**Task ID format:** every task id must match `DAT-<number>` (e.g. `DAT-001`, `DAT-42`). `init.sh` enforces this — other formats will be rejected.

For any task that is more than a trivial fix:

1. Create `tasks/<id>/` with `bash .harness/init.sh <id> "<title>"`.
2. Fill in `spec.md` (what + why + success criteria + out of scope) before planning.
3. Record approval in `approvals.md` before implementation. "Approval" can be the user's plain-English go-ahead — capture the timestamp, who, and any conditions.
4. Append every meaningful step to `progress.md`. At end of session, write the `## Handoff` section at the bottom so the next session can resume cleanly.
5. Update `tasks/INDEX.md` with the new row.

A "trivial fix" = single-line change, typo, obvious rename. Anything touching multiple files or changing behavior is not trivial.

## Quality gate protocol (Pillar 4)

Before declaring a task complete:

1. Run `bash .harness/gates/run-gates.sh` (lint + typecheck + test from `config.env`). Must exit 0.
2. Walk through `gates/checklist.md`. Tick each item or note why it does not apply.
3. If the task warrants it, request an independent evaluator using `gates/evaluator-rubric.md`.

Do **not** mark a task `completed` in `tasks/INDEX.md` until gates pass.

## Boundaries

- **Do not edit `.harness/` itself** unless the task is explicitly "evolve the harness" — the harness is meta-tooling and changes there must be approved separately and recorded in `governance/CHANGELOG.md`.
- **Do not commit `runs.jsonl` rows for sessions you did not run.** The log is an audit trail.
- **Do not skip task tracking to "save time."** The whole point of the outer harness is the audit trail; skipping it defeats the purpose.
- **Match the user's language** when responding (Vietnamese in, Vietnamese out). Code comments stay in English (see root `CLAUDE.md`).

## Layout cheat sheet

```
.harness/
├── AGENTS.md            ← you are here
├── README.md            human-facing overview
├── init.sh              bootstrap a new task
├── config.env           project-specific commands (lint/typecheck/test)
├── knowledge/           org + project context (load order above)
├── tasks/               one dir per task, with spec/plan/approvals/progress
├── gates/               pre-merge checks
├── logs/                runs.jsonl + schema + validator
├── analytics/           summary scripts + jq query recipes + retro templates
├── hooks/               Claude Code hook scripts + settings example
└── governance/          OWNERS, CHANGELOG of the harness itself
```
