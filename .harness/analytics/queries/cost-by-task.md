# Query: cost by task

Slice `runs.jsonl` by `task_id` to see where tokens and dollars went.

## Total cost per task, descending

```bash
jq -s '
  group_by(.task_id)
  | map({
      task_id: .[0].task_id,
      runs: length,
      cost: (map(.cost_usd // 0) | add),
      tokens: (map((.input_tokens // 0) + (.output_tokens // 0)) | add)
    })
  | sort_by(-.cost)
' .harness/logs/runs.jsonl
```

## Cost per task, scoped to a date window

```bash
# Replace dates as needed (inclusive ISO-8601).
SINCE='2026-04-01T00:00:00Z'
UNTIL='2026-05-01T00:00:00Z'
jq -s --arg since "$SINCE" --arg until "$UNTIL" '
  map(select(.timestamp >= $since and .timestamp < $until))
  | group_by(.task_id)
  | map({task_id: .[0].task_id, runs: length, cost: (map(.cost_usd // 0) | add)})
  | sort_by(-.cost)
' .harness/logs/runs.jsonl
```

## Average cost per run, per agent/model

```bash
jq -s '
  group_by("\(.agent)/\(.model)")
  | map({
      agent_model: "\(.[0].agent)/\(.[0].model)",
      runs: length,
      avg_cost_usd: ((map(.cost_usd // 0) | add) / length)
    })
  | sort_by(-.avg_cost_usd)
' .harness/logs/runs.jsonl
```

## CSV export for spreadsheet analysis

```bash
jq -r '[.timestamp, .task_id, .agent, .model, .outcome, .input_tokens, .output_tokens, .cost_usd] | @csv' \
  .harness/logs/runs.jsonl > /tmp/runs.csv
```
