# Query: failures

Find rows where `outcome` indicates the run did not succeed cleanly.

## All failed runs, newest first

```bash
jq -s '
  map(select(.outcome == "failed"))
  | sort_by(.timestamp)
  | reverse
' .harness/logs/runs.jsonl
```

## Tasks with the most failures

```bash
jq -s '
  map(select(.outcome == "failed"))
  | group_by(.task_id)
  | map({task_id: .[0].task_id, failure_count: length})
  | sort_by(-.failure_count)
' .harness/logs/runs.jsonl
```

## Failure rate per agent/model

```bash
jq -s '
  group_by("\(.agent)/\(.model)")
  | map({
      agent_model: "\(.[0].agent)/\(.[0].model)",
      total: length,
      failed: (map(select(.outcome == "failed")) | length),
      failure_rate: ((map(select(.outcome == "failed")) | length) / length)
    })
  | sort_by(-.failure_rate)
' .harness/logs/runs.jsonl
```

## Anything not strictly succeeded (broader view)

```bash
jq -s '
  map(select(.outcome != "succeeded" and .outcome != "task_created"))
  | group_by(.outcome)
  | map({outcome: .[0].outcome, count: length})
' .harness/logs/runs.jsonl
```
