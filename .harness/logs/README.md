# `logs/` — Cost Attribution & raw audit data

This directory holds the raw, append-only record of every agent run in this repository. It is the data source for **Pillar 1 (Cost Attribution)** and the input for **Pillar 5 (Audit & Analytics)**.

## Files

| File | Purpose |
|---|---|
| `runs.jsonl` | Append-only log; one JSON object per line. Committed to the repo. |
| `schema.json` | Contract for each row in `runs.jsonl`. |
| `validate.sh` | Lightweight validator (no extra deps beyond `jq`). |

## Logging protocol

Every agent session must produce **at least one** row in `runs.jsonl` describing its outcome. Mechanisms (in order of preference):

1. **Automatic via `Stop` hook** — `.harness/hooks/on-stop.sh` is wired in `.claude/settings.json` and appends a row when a Claude Code session ends.
2. **Automatic via `init.sh`** — when a new task is created, a `task_created` row is stamped immediately.
3. **Manual** — if the hook did not fire (different agent, hook not wired), append a row by hand following `schema.json`.

Schema fields and constraints live in [`./schema.json`](./schema.json). The required-minimum is `timestamp`, `task_id`, `agent`, `model`, `outcome`. `outcome` must be one of `task_created`, `succeeded`, `failed`, `partial`, `abandoned`, `stopped`.

### Manual append example

```bash
printf '{"timestamp":"%s","task_id":"FEAT-foo","agent":"claude-code","model":"claude-opus-4-6","outcome":"succeeded","input_tokens":12000,"output_tokens":3400,"cost_usd":0.42,"session_id":"manual","notes":"shipped commit deadbeef"}\n' \
  "$(date -u +%Y-%m-%dT%H:%M:%SZ)" >> .harness/logs/runs.jsonl
```

## Validation

Run before merging or as a CI step:

```bash
bash .harness/logs/validate.sh
```

It checks every non-blank line against the minimum contract. Any failure prints the offending line number to stderr and the script exits 1.

## Retention

`runs.jsonl` is committed and grows over time. Suggested rotation:

- **Monthly archival:** at the start of each month, move the previous month's lines to `logs/archive/runs-YYYY-MM.jsonl` and gzip them. Keep `runs.jsonl` as the active file.
- **No deletion:** archives are retained indefinitely for audit; storage cost is negligible relative to the audit value.

Automate this with a cron / GitHub Action when the file exceeds a few MB. Until then, manual rotation is fine.

## Why JSONL (not JSON or CSV)

- **Append-only:** new rows do not touch existing ones, so concurrent sessions and git merges work cleanly.
- **Streamable:** `tail -f`, `head`, `grep`, `jq -c` all behave naturally.
- **Schema flexibility:** new optional fields can be added without rewriting old rows.
- **Human-readable:** every line is valid standalone JSON, viewable in any editor or `jq`.
