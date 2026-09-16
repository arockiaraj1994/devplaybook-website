---
title: Adding a tool
description: The module contract for mcp/tools, and the one thing you must not skip.
sidebar:
  order: 1
---

Add a module under `mcp/tools/` exporting:

- `DEFINITIONS: list[Tool]`
- an async `dispatch(name, arguments, ctx, store)` that returns `None` for names it does not own

Then list it in `_TOOL_MODULES` in `mcp/server.py`. `server.py` concatenates the definitions and
routes calls; dispatch, timing and per-call telemetry are already wired around it.

## Annotate it

Every tool declares `readOnlyHint`, `destructiveHint`, `idempotentHint` and `openWorldHint`. A
client that sees no annotations is entitled to assume the worst, so none go out bare. Shared
annotations and argument coercion live in `tools/common.py`.

## Errors carry a next move

An error that only says what failed costs another round trip. Say what to do instead: list the
valid values, name the documents that do exist, point at the tool that fixes it.

## Do not re-implement a renderer

If your tool returns a document body, compose the existing renderer rather than writing a
second one. This duplication has crept back twice, because a pass merged tool *names* without
merging their *renderers*, and the byte-identity tests exist because of it.

## Before you push

```bash
cd mcp
uv run pytest
uv run ruff check .
uv run ruff format --check .
```
