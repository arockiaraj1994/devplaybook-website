---
title: Get started
description: Run dev-playbook with Docker, then connect Claude Code. A few commands, a few minutes.
sidebar:
  order: 1
---

Two steps: start the dev-playbook server, then point Claude Code at it. A few commands, and a few
minutes while Docker does the work.

## 1. Run the server with Docker

Download the Compose file and start it:

```bash
curl -O https://raw.githubusercontent.com/arockiaraj1994/dev-playbook/main/docker-compose.yml
docker compose up -d
```

That is the whole server. The Compose file builds and runs dev-playbook for you - nothing else to
download. When it finishes, it is running at **http://localhost:8420**, with a dashboard at
**http://localhost:8420/dashboard/**.

Stop it any time with `docker compose down`.

## 2. Connect Claude Code

Install the plugin and run the setup command:

```
/plugin marketplace add arockiaraj1994/dev-playbook
/plugin install dev-playbook@dev-playbook
/dev-playbook-init
```

`/dev-playbook-init` connects Claude Code to the server you just started, sets up your standards for
this repo - it offers to create them if the repo has none - and turns on the guardrails. Restart
Claude Code once when it asks.

That is it. From now on, whenever you code in that repo, the agent reads your guardrails and the
workflow before it writes, and checks the definition of done before it calls the work finished.

## Using another editor?

Any MCP client - Cursor, Windsurf, Zed and others - can connect to the same server over SSE at
`http://localhost:8420/sse`. Add it in your editor's MCP settings.
