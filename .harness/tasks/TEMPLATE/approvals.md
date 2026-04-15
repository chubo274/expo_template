# {{TASK_ID}} — Approvals

> Audit trail of explicit go-aheads. Implementation does not start until at least one approval row is present and the conditions (if any) are satisfied.

| When (UTC) | Who | What was approved | Conditions |
|---|---|---|---|
| {{TIMESTAMP}} | _pending_ | spec.md + plan.md | _e.g. "only after design review", "do not touch the auth module"_ |

## Notes

- "Approval" can be the user's plain-English go-ahead in chat — capture it here verbatim if useful.
- A re-plan (material change to `plan.md`) requires a new approval row, not an edit to an existing row.
- Revocations: add a new row with `What approved` = "REVOKED: <ref>" and explain why.
