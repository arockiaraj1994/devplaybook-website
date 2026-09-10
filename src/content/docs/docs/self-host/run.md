---
title: Running the server
description: uv, Docker and Docker Compose, the two transports, and which ports end up where.
sidebar:
  order: 1
---

You only need this if you want the dashboard, a shared team server, or a client with no plugin
system. For a single developer on Claude Code, [the plugin](/docs/start/install-plugin/) needs
none of it.

## From source

```bash
cd mcp
uv sync
uv run server.py            # HTTP + SSE on :3000, plus the dashboard
uv run server.py --stdio    # MCP over stdio; no port, no dashboard
```

Both transports share one server instance and one set of initialization options, so the tool
surface is identical across them by construction. `--stdio` is what the Claude Code plugin
launches; SSE is what a shared team instance runs.

## Docker Compose

```bash
cp .env.example .env      # set MCP_ADMIN_PASSWORD
docker compose up -d
```

## Docker, standalone

```bash
docker build -t dev-playbook .
docker run -d \
  --name dev-playbook \
  -p 127.0.0.1:3001:3000 \
  -e MCP_ADMIN_PASSWORD=changeme \
  -v playbook-data:/data \
  --restart unless-stopped \
  dev-playbook
```

Dashboard at `http://localhost:3001/dashboard/`, MCP over SSE at `http://localhost:3001/sse`.

## About that port

The host port is 3001 because 3000 is commonly taken on a development machine; the container
listens on 3000 internally. It is published to `127.0.0.1` only, so nothing on your network can
reach it until you decide otherwise.

:::caution
Binding to `0.0.0.0` requires a non-default `MCP_ADMIN_PASSWORD`. The server refuses to start
otherwise, because a LAN-reachable instance with the default password is not a configuration
anyone chose on purpose.
:::

Next: [configuration](/docs/self-host/config/) and [auth and tokens](/docs/self-host/auth/).
