# {{TASK_ID}} — Plan

> The approved approach. Filled in **after** spec is complete and **before** approvals are recorded.

## Approach

Describe the chosen approach in 3–8 bullets. Mention any alternatives you ruled out and why, but keep this section focused on what *will* be done, not all options considered.

- {{step / decision}}
- {{step / decision}}

## Affected files

List every file that will be created, modified, or deleted. Use repo-relative paths.

| Path | Change |
|---|---|
| `{{path}}` | {{create / modify / delete — one-line description}} |

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| {{e.g. migration could lock prod table}} | {{e.g. run with `CONCURRENTLY`, batch updates}} |

## Verification plan

How will we know the change works end-to-end? Reference real commands, real URLs, real fixtures.

1. {{e.g. run `bun lint` — expect 0 errors}}
2. {{e.g. open the app, navigate to X, expect Y}}
3. {{e.g. inspect logs/runs.jsonl for new rows}}

---

_Last edited: {{TIMESTAMP}}_
