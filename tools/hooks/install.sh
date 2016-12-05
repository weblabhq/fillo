#!/usr/bin/env bash

# Install git pre-commit hook
cp -i tool/hooks/pre-push .git/hooks/pre-push
chmod +x .git/hooks/pre-push
