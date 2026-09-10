---
title: Configuration
description: Every environment variable, and the two switches config.toml carries.
sidebar:
  order: 2
---

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `MCP_HOST` | `127.0.0.1` | Bind address. Use `0.0.0.0` for LAN. |
| `MCP_PORT` | `3000` | HTTP port. |
| `MCP_CONFIG` | `mcp/config.toml` | Override the config file path. |
| `MCP_DB_PATH` | `mcp/data/metrics.db` | SQLite file for metrics, auth and standards. |
| `MCP_INACTIVE_DAYS` | `2` | Days without a tool call before a user counts as inactive. |
| `MCP_SERVER_LABEL` | `dev-playbook` | Display name in the dashboard and MCP registration. |
| `MCP_ADMIN_USER` | `admin` | Default admin username, seeded on first boot. |
| `MCP_ADMIN_PASSWORD` | `admin` | Admin password, seeded on first boot. Required to be non-default when `MCP_HOST=0.0.0.0`. |
| `MCP_EDITOR` | `claude-code` | Under `--stdio`, the client name recorded in telemetry. Over SSE this comes from the `User-Agent`. |
| `MCP_STANDARDS_SEED` | `mcp/data/standards_seed.json` | Seed loaded into the standards tables on first boot, only when they are empty. |
| `MCP_TEMPLATE_CACHE` | `~/.cache/dev-playbook-templates` | Extra template pack search path, searched before the bundled packs. |

:::note
No password is committed to `config.toml`. `MCP_ADMIN_PASSWORD` is the only way to set one,
which is deliberate.
:::

## config.toml

Two switches:

```toml
[enable]
auth = false      # default
scaffold = true   # default
```

**`auth`** turns on local users, sessions and bearer tokens. Off by default, because a local
instance on `127.0.0.1` has no one to authenticate against.

**`scaffold`** controls the one tool that writes. With `scaffold = false` it is neither
advertised nor callable, and the four read tools are unaffected.

The two interact: with auth enabled, scaffolding also requires an admin token. With auth
disabled every principal is `role="user"`, so an unconditional admin gate would lock the tool
out of the default local configuration entirely.
