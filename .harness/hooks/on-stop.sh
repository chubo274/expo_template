#!/usr/bin/env bash
# Claude Code `Stop` hook. Receives a JSON payload on stdin describing the
# session; appends one row to .harness/logs/runs.jsonl summarizing the run.
#
# Wire it via .claude/settings.json (see hooks/settings.example.json).
#
# Design notes:
#   - Best-effort: any failure inside this hook MUST NOT block Claude Code.
#     We therefore swallow non-fatal errors and always exit 0.
#   - Token counts are summed from the transcript JSONL when readable;
#     fall back to 0 if anything goes wrong.
#   - Task scope is read from .harness/.current-task (a single line containing
#     the active task id). If missing, task_id is logged as "unscoped".

set -uo pipefail

HARNESS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUNS="$HARNESS_DIR/logs/runs.jsonl"
CURRENT_TASK_FILE="$HARNESS_DIR/.current-task"

# shellcheck source=/dev/null
[[ -f "$HARNESS_DIR/config.env" ]] && . "$HARNESS_DIR/config.env"

AGENT="${DEFAULT_AGENT:-claude-code}"
MODEL_DEFAULT="${DEFAULT_MODEL:-unknown}"

# Read stdin payload (may be empty if invoked outside Claude Code).
PAYLOAD="$(cat 2>/dev/null || true)"

extract() {
  local key="$1"
  local default="$2"
  if [[ -z "$PAYLOAD" ]]; then
    printf '%s' "$default"
    return
  fi
  if command -v jq >/dev/null 2>&1; then
    printf '%s' "$PAYLOAD" | jq -r --arg k "$key" --arg d "$default" '.[$k] // $d' 2>/dev/null || printf '%s' "$default"
  else
    printf '%s' "$default"
  fi
}

SESSION_ID="$(extract session_id "unknown-session")"
TRANSCRIPT_PATH="$(extract transcript_path "")"
HOOK_EVENT="$(extract hook_event_name "Stop")"

TIMESTAMP="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

# Resolve task scope.
if [[ -f "$CURRENT_TASK_FILE" ]]; then
  TASK_ID="$(head -n 1 "$CURRENT_TASK_FILE" | tr -d '[:space:]')"
  TASK_ID="${TASK_ID:-unscoped}"
else
  TASK_ID="unscoped"
fi

# Best-effort token + model extraction from transcript (Claude Code writes
# JSONL with assistant turns containing .message.usage and .message.model).
INPUT_TOKENS=0
OUTPUT_TOKENS=0
MODEL="$MODEL_DEFAULT"
if [[ -n "$TRANSCRIPT_PATH" && -r "$TRANSCRIPT_PATH" ]] && command -v jq >/dev/null 2>&1; then
  INPUT_TOKENS=$(jq -s '
    [.[] | .message.usage.input_tokens? // 0] | add // 0
  ' "$TRANSCRIPT_PATH" 2>/dev/null || echo 0)
  OUTPUT_TOKENS=$(jq -s '
    [.[] | .message.usage.output_tokens? // 0] | add // 0
  ' "$TRANSCRIPT_PATH" 2>/dev/null || echo 0)
  LAST_MODEL=$(jq -rs '
    [.[] | .message.model? // empty] | last // ""
  ' "$TRANSCRIPT_PATH" 2>/dev/null || echo "")
  [[ -n "$LAST_MODEL" ]] && MODEL="$LAST_MODEL"
fi

# Compose row. cost_usd left at 0 — we do not have authoritative pricing here;
# downstream analytics can multiply tokens by known per-model rates.
mkdir -p "$(dirname "$RUNS")"
touch "$RUNS"

# Use jq to ensure proper JSON escaping; fall back to a hand-crafted row if jq is missing.
if command -v jq >/dev/null 2>&1; then
  jq -c -n \
    --arg ts "$TIMESTAMP" \
    --arg task "$TASK_ID" \
    --arg agent "$AGENT" \
    --arg model "$MODEL" \
    --arg session "$SESSION_ID" \
    --arg notes "auto-logged by on-stop hook ($HOOK_EVENT)" \
    --argjson in_t "${INPUT_TOKENS:-0}" \
    --argjson out_t "${OUTPUT_TOKENS:-0}" \
    '{
      timestamp: $ts,
      task_id: $task,
      agent: $agent,
      model: $model,
      outcome: "stopped",
      input_tokens: $in_t,
      output_tokens: $out_t,
      cost_usd: 0,
      session_id: $session,
      notes: $notes
    }' >> "$RUNS" 2>/dev/null || true
else
  printf '{"timestamp":"%s","task_id":"%s","agent":"%s","model":"%s","outcome":"stopped","input_tokens":%s,"output_tokens":%s,"cost_usd":0,"session_id":"%s","notes":"auto-logged by on-stop hook (no jq)"}\n' \
    "$TIMESTAMP" "$TASK_ID" "$AGENT" "$MODEL" "${INPUT_TOKENS:-0}" "${OUTPUT_TOKENS:-0}" "$SESSION_ID" \
    >> "$RUNS" 2>/dev/null || true
fi

# Always succeed — we never want to block the agent harness.
exit 0
