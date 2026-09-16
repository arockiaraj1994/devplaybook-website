---
title: Plugin settings
description: How the Claude Code plugin connects to your server, the four settings it exposes, and how enforcement works.
sidebar:
  order: 1
---

Installing the plugin and running `/dev-playbook-init` is covered in
[Get started](/docs/get-started/). This page is how it connects, and everything you can change
afterwards from `/plugin` → dev-playbook → Configure.

## How it connects

The plugin talks to a dev-playbook server you run yourself - a local Docker container by default -
over MCP (SSE). It carries no server of its own. The bundled connection points at `server_url`, and
`/dev-playbook-init` also registers the same server at user scope, so `dev-playbook` shows up in
`claude mcp list` and across your projects. If the tools appear twice, that is the two
registrations - drop the user-scope one with `claude mcp remove --scope user dev-playbook`.

| Setting | Default | For |
| --- | --- | --- |
| `server_url` | `http://localhost:8420/sse` | Your server's MCP SSE endpoint - a local Docker server, or a shared team server. |
| `token` | *(empty)* | Bearer token, from `POST /auth/login`. Only when the server has auth on. |
| `enforce_standards` | `false` | Force the edit gate on regardless of the marker (see below). |
| `server_path` | *(empty)* | Contributors only: run the server from a source checkout via `scripts/playbook-mcp.sh` instead of Docker. |

## Enforcement (the edit gate)

`/dev-playbook-init` **arms** the gate - it drops a marker the hook reads - and marks the repos it
configures. After that, in any repo that has **not** been configured, `Write` and `Edit` are denied,
with a reason naming `/dev-playbook-init`. Every edit, not just the first: a gate that closes once is
not a gate.

A repo counts as configured when a local standards database has its project, **or** init left a
per-repo marker - the path that works when the database lives inside a container. Set
`enforce_standards: true` to force the gate on without running init.

Off until you run init, because installing a plugin should not start blocking anyone's edits by
surprise.

## The hooks

| Hook | When | What |
| --- | --- | --- |
| SessionStart | New session | This project's guardrails, in context, unasked. |
| PreToolUse | `Write` / `Edit` | The definition of done, and the edit gate. |

The hooks read the standards database directly with stdlib `sqlite3` when it is on the same machine,
and fall back to the markers when the server is remote (Docker), so they never need an MCP round
trip. Any failure exits silently: a hook must never be the reason a session is broken.

## Contributors: run from source

Instead of Docker you can run the server from a checkout over stdio, wired up manually:

```bash
claude mcp add dev-playbook-local -- \
  env PLAYBOOK_SERVER_PATH=/path/to/dev-playbook/mcp \
  /path/to/plugin/scripts/playbook-mcp.sh
```

`scripts/playbook-mcp.sh` (and `scripts/sse_bridge.py` for team mode) need `uv` and the repo
sources; they are not used by the default SSE connection.
