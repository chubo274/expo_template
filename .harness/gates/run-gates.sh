#!/usr/bin/env bash
# Runs the project's quality gates as configured in .harness/config.env.
# Exits non-zero on the first failing gate. Intended for pre-merge use,
# distinct from the per-commit Husky hook.
#
# Usage: bash .harness/gates/run-gates.sh

set -uo pipefail

HARNESS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$HARNESS_DIR/.." && pwd)"

# shellcheck source=/dev/null
. "$HARNESS_DIR/config.env"

cd "$REPO_ROOT"

run_gate() {
  local name="$1"
  local cmd="$2"
  if [[ -z "${cmd:-}" ]]; then
    printf '\n[gate] %-12s SKIP (no command configured)\n' "$name"
    return 0
  fi
  printf '\n[gate] %-12s RUN  %s\n' "$name" "$cmd"
  if bash -c "$cmd"; then
    printf '[gate] %-12s PASS\n' "$name"
    return 0
  else
    local rc=$?
    printf '[gate] %-12s FAIL (exit %d)\n' "$name" "$rc"
    return $rc
  fi
}

failures=()

run_gate "lint"      "${LINT_CMD:-}"      || failures+=("lint")
run_gate "typecheck" "${TYPECHECK_CMD:-}" || failures+=("typecheck")
run_gate "test"      "${TEST_CMD:-}"      || failures+=("test")

echo
if (( ${#failures[@]} == 0 )); then
  echo "[gate] all gates passed"
  exit 0
else
  echo "[gate] failed: ${failures[*]}"
  exit 1
fi
