---
title: Plugin settings
description: Enforcement, local versus team mode, and the four settings the Claude Code plugin exposes.
sidebar:
  order: 1
---

Installation is in [Install the plugin](/docs/start/install-plugin/). This page is everything
you can change afterwards, from `/plugin` → dev-playbook → Configure.

| Setting | Default | For |
| --- | --- | --- |
| `enforce_standards` | `false` | Block `Write`/`Edit` when the repo has no standards, instead of only warning. |
| `server_url` | *(empty)* | Team mode: point at a shared server, e.g. `http://localhost:3001`. |
| `token` | *(empty)* | Bearer token for that server. Only when it has auth on. |
| `server_path` | *(empty)* | Path to the repo's `mcp/` directory, if the plugin cannot find it beside itself. |

## Enforcement

Off by default, because installing a plugin should not stop anyone's work by surprise.

**Advisory** (the default) - the definition of done arrives as context before your first edit.
A repo with no standards gets one line naming `/dev-playbook:scaffold-standards`. Nothing is
ever blocked.

**Enforcing** (`enforce_standards: true`) - a repo with no standards project has its `Write`
and `Edit` calls denied, with a reason naming what is missing. Every edit, not just the first:
a gate that closes once is not a gate.

:::caution
Enforcement never fires when there is no standards database at all. That would lock a first-run
user out of their own repo before they had any way to scaffold anything.
:::

## Local mode

The default. `scripts/playbook-mcp.sh` runs `server.py --stdio` against the plugin's own SQLite
database, in the plugin's data directory - which survives updates and uninstall. No
infrastructure, no port, no dashboard.

## Team mode

Set `server_url` and the same script runs `scripts/sse_bridge.py` instead, which pumps JSON-RPC
between Claude Code's stdio and the shared server's SSE endpoint. You get the dashboard and the
whole team's telemetry in one place.

The bridge inspects nothing, so the tools you see are exactly what that server advertises.

If the bridge gives you trouble, [the manual SSE setup](/docs/start/other-clients/) still works
and is unaffected.

## The hooks

| Hook | When | What |
| --- | --- | --- |
| SessionStart | New session | This project's guardrails, in context, unasked. |
| PreToolUse | First `Write`/`Edit` of a session | The definition of done. |

Both read the standards database directly with stdlib `sqlite3` - no MCP round trip, nothing to
time out. Any failure exits silently: a hook must never be the reason a session is broken.
