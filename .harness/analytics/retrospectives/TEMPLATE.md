# Retrospective — {{period}}

> Run monthly or after each significant initiative. Anchor every observation in data from `runs.jsonl` or `tasks/`. Conclusions without evidence belong in a different document.

## Scope

- **Period covered:** {{YYYY-MM-DD to YYYY-MM-DD}}
- **Tasks reviewed:** {{count}}, listed below or by reference to `tasks/INDEX.md`
- **Author:** {{name / handle}}

## Numbers (paste from `summarize.sh`)

```
$(bash .harness/analytics/summarize.sh)
```

## What worked

- {{Specific behavior/process. Cite the task or rows.}}

## What failed or wasted effort

- {{Specific incident. Cite the task or runs.jsonl rows. Include rough cost/time impact if known.}}

## Surprises

- {{Things we didn't predict — both good and bad. These often point at gaps in `knowledge/`.}}

## Action items

| # | Action | Owner | Target date | Status |
|---|---|---|---|---|
| 1 | {{specific change to harness, knowledge, gates, or process}} | {{@handle}} | {{YYYY-MM-DD}} | open |

## Knowledge updates

If anything from this retro should become permanent guidance, list the file to update and the change:

- [ ] `knowledge/org.md` — {{what to add/change}}
- [ ] `knowledge/project.md` — {{what to add/change}}
- [ ] root `CLAUDE.md` — {{what to add/change}}
- [ ] `gates/checklist.md` — {{new gate item}}
- [ ] `governance/CHANGELOG.md` — {{record harness change}}
