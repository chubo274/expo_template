#!/usr/bin/env bash
# Bootstrap a new tracked task under .harness/tasks/<id>/.
# Usage: bash .harness/init.sh <task-id> "<short title>"
# Example: bash .harness/init.sh FEAT-auth-revamp "Replace legacy auth middleware"

set -euo pipefail

HARNESS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$HARNESS_DIR/.." && pwd)"

# shellcheck source=/dev/null
. "$HARNESS_DIR/config.env"

TASK_ID="${1:-}"
TASK_TITLE="${2:-}"

if [[ -z "$TASK_ID" || -z "$TASK_TITLE" ]]; then
  echo "Usage: bash .harness/init.sh <task-id> \"<short title>\"" >&2
  exit 64
fi

if [[ ! "$TASK_ID" =~ ^DAT-[0-9]+$ ]]; then
  echo "Error: task-id must match DAT-<number> (e.g. DAT-001, DAT-42) — got: $TASK_ID" >&2
  exit 65
fi

TASK_DIR="$HARNESS_DIR/tasks/$TASK_ID"
TEMPLATE_DIR="$HARNESS_DIR/tasks/TEMPLATE"

if [[ -d "$TASK_DIR" ]]; then
  echo "Error: task '$TASK_ID' already exists at $TASK_DIR" >&2
  exit 66
fi

if [[ ! -d "$TEMPLATE_DIR" ]]; then
  echo "Error: template dir missing at $TEMPLATE_DIR" >&2
  exit 70
fi

# Copy template, substituting placeholders.
mkdir -p "$TASK_DIR"
TIMESTAMP="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
for src in "$TEMPLATE_DIR"/*.md; do
  dst="$TASK_DIR/$(basename "$src")"
  sed \
    -e "s|{{TASK_ID}}|$TASK_ID|g" \
    -e "s|{{TASK_TITLE}}|$TASK_TITLE|g" \
    -e "s|{{TIMESTAMP}}|$TIMESTAMP|g" \
    "$src" > "$dst"
done

# Append a row to tasks/INDEX.md.
INDEX="$HARNESS_DIR/tasks/INDEX.md"
if [[ -f "$INDEX" ]]; then
  printf '| %s | %s | open | _unassigned_ | %s |\n' \
    "$TASK_ID" "$TASK_TITLE" "${TIMESTAMP%T*}" >> "$INDEX"
fi

# Stamp a `task_created` row into runs.jsonl so the audit trail starts immediately.
RUNS="$HARNESS_DIR/logs/runs.jsonl"
mkdir -p "$(dirname "$RUNS")"
touch "$RUNS"
printf '{"timestamp":"%s","task_id":"%s","agent":"%s","model":"%s","outcome":"task_created","input_tokens":0,"output_tokens":0,"cost_usd":0,"session_id":"init.sh","notes":"%s"}\n' \
  "$TIMESTAMP" "$TASK_ID" "${DEFAULT_AGENT:-unknown}" "${DEFAULT_MODEL:-unknown}" "$TASK_TITLE" \
  >> "$RUNS"

echo "Created $TASK_DIR"
echo "  - spec.md, plan.md, approvals.md, progress.md"
echo "  - logged task_created to $RUNS"
echo "  - appended row to $INDEX"
echo ""
echo "Next: fill in $TASK_DIR/spec.md, then capture approval in approvals.md."
