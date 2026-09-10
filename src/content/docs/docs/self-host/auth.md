---
title: Auth and tokens
description: Local users, pbkdf2 password hashes, and opaque bearer tokens for MCP clients.
sidebar:
  order: 3
---

Auth is entirely local. There is no identity provider to configure and nothing phones home.

- Users live in the server's own SQLite database, with pbkdf2 password hashes.
- Dashboard sessions are an HttpOnly cookie plus CSRF double-submit.
- MCP clients authenticate with an opaque bearer token.

Turn it on with `[enable] auth = true` in `config.toml`. It is off by default, because a
local-only instance has no one to authenticate against.

## Getting a token

For a quick one, log in:

```bash
curl -s -X POST http://localhost:3001/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"<your MCP_ADMIN_PASSWORD>"}'
```

For a token you intend to keep, issue it from the dashboard at `/dashboard/tokens`. Create
users at `/dashboard/users-admin`.

## Using it

```
Authorization: Bearer <token>
```

That is the whole contract. See [other clients](/docs/start/other-clients/) for where it goes
in each one, or set `token` in the [plugin settings](/docs/plugin/) for team mode.

## Roles

With auth on, scaffolding requires an admin token; the read tools do not. With auth off there
are no roles to check - every principal is `role="user"` - so the local operator may scaffold.
