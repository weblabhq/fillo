#!/usr/bin/env bash

# Install git hooks
cp -i tools/hooks/pre-commit .git/hooks/pre-commit
cp -i tools/hooks/pre-push .git/hooks/pre-push
