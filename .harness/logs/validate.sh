#!/usr/bin/env bash
# Validates every line of .harness/logs/runs.jsonl against the contract in schema.json.
# A full JSON-Schema check would require an external validator (ajv, check-jsonschema);
# this script enforces the *minimum* contract using jq alone, so it has no extra deps.
#
# Usage: bash .harness/logs/validate.sh
# Exit code: 0 if every line passes; 1 if any line fails. Prints offending lines to stderr.

set -uo pipefail

HARNESS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUNS="$HARNESS_DIR/logs/runs.jsonl"

if ! command -v jq >/dev/null 2>&1; then
  echo "validate.sh: jq not installed; install jq to validate runs.jsonl" >&2
  exit 2
fi

if [[ ! -f "$RUNS" ]]; then
  echo "validate.sh: no runs.jsonl yet at $RUNS — nothing to validate" >&2
  exit 0
fi

REQUIRED=(timestamp task_id agent model outcome)
ALLOWED_OUTCOMES='task_created|succeeded|failed|partial|abandoned|stopped'

failed=0
lineno=0
while IFS= read -r line || [[ -n "$line" ]]; do
  lineno=$((lineno + 1))
  # Skip blank lines (tolerated, not required).
  [[ -z "${line// /}" ]] && continue

  if ! printf '%s' "$line" | jq -e . >/dev/null 2>&1; then
    echo "line $lineno: not valid JSON" >&2
    failed=$((failed + 1))
    continue
  fi

  for field in "${REQUIRED[@]}"; do
    if ! printf '%s' "$line" | jq -e --arg f "$field" 'has($f) and (.[$f] != null) and (.[$f] != "")' >/dev/null 2>&1; then
      echo "line $lineno: missing required field '$field'" >&2
      failed=$((failed + 1))
    fi
  done

  outcome=$(printf '%s' "$line" | jq -r '.outcome // ""')
  if [[ -n "$outcome" && ! "$outcome" =~ ^($ALLOWED_OUTCOMES)$ ]]; then
    echo "line $lineno: outcome '$outcome' not in {$ALLOWED_OUTCOMES}" >&2
    failed=$((failed + 1))
  fi
done < "$RUNS"

if (( failed == 0 )); then
  echo "validate.sh: $lineno line(s) checked, all valid"
  exit 0
else
  echo "validate.sh: $failed problem(s) found across $lineno line(s)" >&2
  exit 1
fi
