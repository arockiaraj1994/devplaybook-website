---
title: Running the server
description: Docker the simple way, Docker Compose, running from source, and which ports end up where.
sidebar:
  order: 1
---

Most people never need this page: [Get started](/docs/get-started/) runs the server with one
Docker command and the [plugin](/docs/plugin/) connects to it. This is the detail behind that -
Compose, source, ports and the dashboard.

## Docker, the simple way

Download the Compose file and start it. It builds dev-playbook from GitHub, so nothing else has to
be checked out:

```bash
curl -O https://raw.githubusercontent.com/arockiaraj1994/dev-playbook/main/docker-compose.yml
docker compose up -d
```

Dashboard at `http://localhost:8420/dashboard/`, MCP over SSE at `http://localhost:8420/sse`. Stop
it with `docker compose down`. It runs with a default `admin`/`admin` login, published to
`127.0.0.1` only.

## From source

```bash
cd mcp
uv sync
uv run server.py            # HTTP + SSE on :8420, plus the dashboard
uv run server.py --stdio    # MCP over stdio; no port, no dashboard
```

Both transports share one server instance and one set of initialization options, so the tool
surface is identical across them by construction. `--stdio` is what a from-source plugin setup
launches; SSE is what the Docker server and a shared team instance run.

## Docker, standalone

```bash
docker build -t dev-playbook .
docker run -d \
  --name dev-playbook \
  -p 127.0.0.1:8420:3000 \
  -e MCP_ADMIN_PASSWORD=changeme \
  -v playbook-data:/data \
  --restart unless-stopped \
  dev-playbook
```

## About that port

8420 is a dedicated port in a quiet band, clear of the common framework defaults (3000, 5000, 8000,
8080). The container listens on 3000 internally; the host publishes 8420, to `127.0.0.1` only, so
nothing on your network can reach it until you decide otherwise.

:::caution
Before binding to `0.0.0.0`, set a strong `MCP_ADMIN_PASSWORD`. A LAN-reachable instance on the
default `admin`/`admin` is not a configuration anyone chose on purpose.
:::

Next: [configuration](/docs/self-host/config/) and [auth and tokens](/docs/self-host/auth/).
