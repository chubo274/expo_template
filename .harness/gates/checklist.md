# Pre-merge checklist

> A human walks through this list before declaring a task `completed` and merging. Anything not applicable should be marked `n/a` with a one-line reason; do not silently skip.

For the active task, copy this list into the task's `progress.md` (under a `### Pre-merge checklist — <date>` heading) and tick each box.

## Spec & approval

- [ ] `spec.md` is filled in (no placeholders left)
- [ ] At least one approval row exists in `approvals.md` and conditions are satisfied
- [ ] `plan.md` matches what was actually built (or has been updated to reflect the divergence)

## Code quality

- [ ] `bash .harness/gates/run-gates.sh` exits 0 (lint + typecheck + test)
- [ ] No new `console.log` calls (ESLint blocks these)
- [ ] No relative imports added across module boundaries (project rule)
- [ ] No new dependencies added unless approved in `approvals.md`
- [ ] No secrets, tokens, or PII in the diff

## Behavior

- [ ] Each item under `spec.md > Success criteria` is verified — link to evidence (screenshot, logs, test name)
- [ ] At least one end-to-end check was performed manually (not just unit tests)
- [ ] Rollback plan known: how to revert if production breaks

## Documentation

- [ ] Root `CLAUDE.md` updated if architecture or commands changed
- [ ] Any new public function/component has a brief docstring or usage comment **only where the logic is not self-evident**
- [ ] `tasks/INDEX.md` row updated to `completed`

## Audit

- [ ] `progress.md` `## Handoff` section is filled in
- [ ] `bash .harness/logs/validate.sh` exits 0 (no malformed log rows from this task's runs)
- [ ] If task crossed a cost ceiling defined in `knowledge/org.md`, the overrun is noted in `progress.md`
