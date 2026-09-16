---
title: Overview
description: What dev-playbook is, how to try it in a few minutes, and where to read more.
sidebar:
  order: 0
---

dev-playbook holds your team's coding standards and serves them to your coding agent: guardrails, a
definition of done, per-language rules, and a workflow for each kind of task. The agent reads them
**before** it writes, not after review.

If a repo has no standards yet, dev-playbook generates a full set for you - which is where most
teams actually start.

## How you use it

1. **Run the server** with Docker - one command.
2. **Connect Claude Code** - install the plugin and run `/dev-playbook-init`.

Then your agent picks up the rules automatically every time you code in that repo.

→ [Get started](/docs/get-started/) walks through both steps.

## The pieces

| Piece | What it is |
| --- | --- |
| The MCP server | [Nine `playbook_*` tools](/docs/tools/) - one read tool per kind of document, plus search and scaffolding. What agents talk to. |
| The Claude Code plugin | [The plugin](/docs/plugin/) connects to the server, adds `/dev-playbook-init`, and enforces the guardrails with hooks. |
| The dashboard | A browser UI for [authoring standards](/docs/concepts/standards-store/) and reading telemetry. Runs alongside the server. |

## Read more

- [The tools](/docs/tools/) - each one, what it returns, why the surface is shaped this way.
- [Template packs](/docs/templates/) - what gets generated when a repo has no standards.
- [Self-hosting](/docs/self-host/run/) - running the server, configuration and auth.
- [Concepts](/docs/concepts/standards-store/) - how standards are stored.
- [Changelog](/changelog/) - the full history.

## What it does not do

It does not review your code, run your tests, or gate your pull requests. It puts the rules where
the agent will read them, and can block edits in a repo that has not been set up. That's it.
