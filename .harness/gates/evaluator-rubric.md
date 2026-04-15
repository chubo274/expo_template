# Evaluator rubric

> An **independent** reviewer (a different human, or a fresh agent that did not implement the task) scores the change against this rubric. Independence matters — the implementing agent grading its own work defeats the gate.

The evaluator reads `spec.md`, `plan.md`, the diff, and `progress.md`, then fills in the table below and pastes it into the task's `progress.md` under a `### Evaluation — <date> — <evaluator>` heading.

## Scoring scale

- **0** — fails outright (criterion not met or actively wrong)
- **1** — partially met (gaps documented but not addressed)
- **2** — met (clean and verifiable)
- **n/a** — does not apply to this task (one-line reason required)

A task should not merge with any score of `0`. Two or more scores of `1` warrants a revisit before merge.

## Rubric

| # | Criterion | Score | Notes |
|---|---|---|---|
| 1 | **Scope discipline** — change matches `spec.md`; nothing in the diff is outside what was approved | | |
| 2 | **Correctness** — the change does what it claims, verified against `Success criteria` | | |
| 3 | **Completeness** — all `Success criteria` items have evidence; no obvious follow-ups left dangling | | |
| 4 | **Reversibility** — rollback plan is plausible and documented | | |
| 5 | **Observability** — failures will surface (logs, error tracking, alerts) where appropriate | | |
| 6 | **Code quality** — readable, idiomatic for the codebase, no dead code, no unjustified abstractions | | |
| 7 | **Security & compliance** — no new attack surface, secret leakage, or org-policy violation | | |
| 8 | **Audit trail** — `progress.md`, `runs.jsonl`, and `INDEX.md` reflect what happened | | |

## Decision

- [ ] **Approve to merge** (no score of 0; ≤1 score of 1)
- [ ] **Request changes** (list specific items above)
- [ ] **Reject** (fundamental issue with spec, approach, or implementation; explain)

**Evaluator:** {{name / handle}}  
**Date (UTC):** {{YYYY-MM-DD}}  
**Time spent:** {{minutes}}
