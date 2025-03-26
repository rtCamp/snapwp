#!/usr/bin/env bash

# Exit immediately if a command fails
set -e

# Node script to execute TypeScript type checks in all workspace packages.

echo "Running TypeScript type checks in all workspace packages..."

WORK_SPACES=(
    "@snapwp/blocks"
    "@snapwp/core"
    "@snapwp/next"
    "@snapwp/query"
    "@snapwp/codegen-config"
    "@snapwp/types"
    "@snapwp/e2e-tests"
)

# Execute type checks in all workspace packages
for package in "${WORK_SPACES[@]}"; do
  npm run typecheck -w "$package"
done
