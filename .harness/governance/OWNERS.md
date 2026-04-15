# OWNERS — `.harness/`

> Who is responsible for keeping the Outer Harness alive in this repo. Distinct from product code ownership.

## Primary maintainer

- **Name:** {{name}}
- **Handle:** {{@handle}}
- **Contact:** {{email / chat}}

## Secondary maintainer (back-up)

- **Name:** {{name}}
- **Handle:** {{@handle}}

## Areas of ownership

| Area | Owner | Notes |
|---|---|---|
| Config (`config.env`, `feature_list.json`) | {{owner}} | Edit when project tooling changes |
| Knowledge (`knowledge/`) | {{owner}} | Keep org and project context current |
| Gates (`gates/`) | {{owner}} | Tighten gates as the project matures |
| Logs & analytics (`logs/`, `analytics/`) | {{owner}} | Run monthly retro |
| Hooks (`hooks/`) | {{owner}} | Keep `on-stop.sh` working as Claude Code evolves |

## Change protocol

Any change to `.harness/` itself (other than appending to `runs.jsonl`, `tasks/INDEX.md`, or creating new task dirs) requires:

1. A task tracked under `.harness/tasks/<id>/` like any other change.
2. A new entry in `governance/CHANGELOG.md`.
3. Approval from the primary maintainer (or secondary if primary is unavailable).
