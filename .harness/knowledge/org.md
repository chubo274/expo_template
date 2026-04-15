# Organization-level context

This is the broadest layer of the knowledge stack. It captures rules and constraints that apply to **every project in the organization**, not just this repo. An agent reads this *before* the project- or task-level context to understand the non-negotiable defaults.

> Replace the placeholders below with values for your organization. If you are reusing this template for a new repo, copy the populated `org.md` from your central template repo rather than re-deriving it.

## Identity

- **Organization:** {{Organization name}}
- **Primary contact for harness questions:** {{name / handle}}

## Compliance & legal

- **Data residency:** {{e.g. all customer data must stay in EU regions; no cross-region replication without DPO sign-off}}
- **PII handling:** {{e.g. never log raw email/phone; hash before persisting}}
- **Open-source license policy:** {{e.g. MIT, Apache-2.0, and BSD-3 only; no GPL-family deps}}
- **Secret handling:** secrets never enter the repo, logs, prompts, or test fixtures. Use {{vault / 1Password / AWS Secrets Manager}} only.

## Engineering standards

- **Languages of choice:** {{e.g. TypeScript, Go, Python}}
- **Code style:** see each repo's lint config; never disable lint rules without a comment explaining why.
- **Commit messages:** {{e.g. Conventional Commits; subject ≤ 72 chars}}
- **Branch model:** {{e.g. trunk-based with short-lived feature branches}}
- **Code review:** at least one human reviewer on any change touching prod paths.

## Security

- **Threat model summary:** {{link or short paragraph}}
- **Forbidden patterns:** raw SQL string concatenation, `eval` of untrusted input, shell expansion of user input, disabling TLS verification, committing tokens of any kind.
- **Vulnerability disclosure contact:** {{email / channel}}

## AI agent policies

- Agents may read any file in the repo, but **must not exfiltrate** repo content to external services beyond the model API in use.
- Agents must follow the per-repo `.harness/AGENTS.md` operating instructions (logging, task tracking, gates).
- Cost ceilings per task: {{e.g. soft cap $5, hard cap $20 — escalate to human if approaching hard cap}}.
- Models permitted: {{enumerate explicitly}}.

## Where to escalate

| Situation | Channel |
|---|---|
| Suspected security issue | {{#sec-incident or email}} |
| Compliance question | {{compliance@... }} |
| Harness template change | {{owner of the meta-template repo}} |
| Cost overrun | {{finance / eng-leadership}} |
