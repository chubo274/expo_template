#!/usr/bin/env bash
# Aggregates .harness/logs/runs.jsonl into a markdown summary printed to stdout.
# Pipe to a file in retrospectives/ to capture it: e.g. > retrospectives/2026-04.md
#
# Usage: bash .harness/analytics/summarize.sh
#        bash .harness/analytics/summarize.sh > .harness/analytics/retrospectives/$(date +%Y-%m).md

set -uo pipefail

HARNESS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUNS="$HARNESS_DIR/logs/runs.jsonl"

if ! command -v jq >/dev/null 2>&1; then
  echo "summarize.sh: jq not installed" >&2
  exit 2
fi

echo "# Run summary"
echo
echo "_Generated: $(date -u +%Y-%m-%dT%H:%M:%SZ)_"
echo
echo "_Source: \`.harness/logs/runs.jsonl\`_"
echo

if [[ ! -s "$RUNS" ]]; then
  echo "## No data yet"
  echo
  echo "\`runs.jsonl\` is empty. Once agent sessions start logging, rerun this script."
  exit 0
fi

total=$(grep -cve '^\s*$' "$RUNS")
total_cost=$(jq -s 'map(.cost_usd // 0) | add' "$RUNS")
total_in=$(jq -s 'map(.input_tokens // 0) | add' "$RUNS")
total_out=$(jq -s 'map(.output_tokens // 0) | add' "$RUNS")

echo "## Totals"
echo
echo "| Metric | Value |"
echo "|---|---|"
echo "| Runs | $total |"
echo "| Input tokens | $total_in |"
echo "| Output tokens | $total_out |"
printf '| Cost (USD) | %.4f |\n' "$total_cost"
echo

echo "## By outcome"
echo
echo "| Outcome | Count |"
echo "|---|---|"
jq -r '.outcome // "unknown"' "$RUNS" | sort | uniq -c | awk '{printf "| %s | %d |\n", $2, $1}'
echo

echo "## By task (top 20 by cost)"
echo
echo "| Task ID | Runs | Input tokens | Output tokens | Cost (USD) |"
echo "|---|---|---|---|---|"
jq -s '
  group_by(.task_id // "unscoped")
  | map({
      task_id: (.[0].task_id // "unscoped"),
      runs: length,
      in: (map(.input_tokens // 0) | add),
      out: (map(.output_tokens // 0) | add),
      cost: (map(.cost_usd // 0) | add)
    })
  | sort_by(-.cost)
  | .[0:20]
  | .[]
  | "| \(.task_id) | \(.runs) | \(.in) | \(.out) | \(.cost | tostring) |"
' -r "$RUNS"
echo

echo "## Recent failures (last 10)"
echo
fail_count=$(jq -s 'map(select(.outcome == "failed")) | length' "$RUNS")
if [[ "$fail_count" == "0" ]]; then
  echo "_No failures recorded._"
else
  echo "| Timestamp | Task | Notes |"
  echo "|---|---|---|"
  jq -r 'select(.outcome == "failed") | "| \(.timestamp) | \(.task_id) | \(.notes // "") |"' "$RUNS" \
    | tail -n 10
fi
