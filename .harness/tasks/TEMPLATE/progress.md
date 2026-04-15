# {{TASK_ID}} — Progress log

> Append-only running log of work done on this task. Newest entry at the bottom. End every session by writing the `## Handoff` section so the next session can pick up cleanly.

## Log

### {{TIMESTAMP}} — task created

Initialized via `init.sh`. Spec not yet filled in.

<!-- Append new entries below in the same format. Each entry: timestamp + 1–3 lines describing the change, decision, or blocker. Reference commit SHAs or file paths as you go. -->

---

## Handoff

> Overwrite this section at the end of every session. The goal: a fresh agent starting from zero context should be able to continue from here without re-reading the entire log.

**Status:** `open` | `in_progress` | `blocked` | `in_review` | `completed` | `abandoned`

**Where we left off:**

- _One paragraph: what was just done, what state the code is in._

**Next concrete step:**

- _The single next action. Be specific: "edit `src/foo.ts:42` to handle the null case", not "improve error handling"._

**Open questions for the user:**

- _List blockers requiring a human decision. Empty list = unblocked._

**Files currently dirty (uncommitted):**

- _List from `git status`. None = clean tree._
