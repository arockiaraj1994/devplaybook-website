---
title: Cursor, Windsurf and other clients
description: The manual MCP setup for clients with no plugin system.
sidebar:
  order: 3
---

Cursor and Windsurf have no plugin system, so they connect to a running dev-playbook server
over SSE. That means you host the server yourself first - see
[running it](/docs/self-host/run/).

## Point a client at it

```bash
claude mcp add --transport sse dev-playbook http://localhost:3001/sse \
  --header "Authorization: Bearer <token>"
```

The same two values go into any client's MCP configuration: the SSE endpoint and an
`Authorization: Bearer` header. Drop the header if the server has auth disabled, which is the
default for a local instance.

Get a token with:

```bash
curl -s -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"<your MCP_ADMIN_PASSWORD>"}'
```

Longer-lived tokens are issued from the dashboard at `/dashboard/tokens`. See
[auth and tokens](/docs/self-host/auth/).

## The tools are identical

Both transports share one server instance and one set of initialization options, so the tool
surface does not vary by client. What differs is that a client without hooks won't get the
guardrails pushed to it at session start - it has to call `playbook_start_task` itself.

:::tip
This manual path also works in Claude Code, and is unaffected by the plugin. If the plugin's
SSE bridge ever gives you trouble, fall back to this.
:::
