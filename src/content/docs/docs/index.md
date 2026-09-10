---
title: Overview
description: What dev-playbook is, what it puts in front of a coding agent, and where to start reading.
---

dev-playbook holds your team's coding standards and serves them to coding agents over MCP:
guardrails, a definition of done, per-language rules, and a workflow for each kind of task.
The agent reads them before it writes, not after review.

If a repo has no standards yet, dev-playbook generates a full set from template packs. That
is the case most teams are actually in.

## The shape of it

There are three pieces, and you can use one without the others.

| Piece | What it is |
| --- | --- |
| The MCP server | Five `playbook_*` tools over stdio or SSE. This is the part agents talk to. |
| The Claude Code plugin | The server, two skills and two hooks, installed with two commands. No port, no token. |
| The dashboard | A browser UI for authoring standards and reading telemetry. Only exists when you run the server over HTTP. |

Standards live in SQLite. The MCP tools and the dashboard read the same store, so a document
edited in the browser is the document the agent reads on its next call.

## Where to start

- **Using Claude Code?** [Install the plugin](/docs/start/install-plugin/). It is two commands
  and needs no infrastructure.
- **Using Cursor or Windsurf?** They have no plugin system, so use
  [the manual MCP setup](/docs/start/other-clients/).
- **Want to see the flow first?** [Your first task](/docs/start/first-task/) walks one change
  from start to finish.
- **Repo has no standards?** [Template packs](/docs/templates/) explains what gets generated,
  and [`playbook_scaffold_standards`](/docs/tools/scaffold-standards/) is the tool that does it.

## What it does not do

It does not review your code, run your tests, or gate your pull requests. It puts the rules
where the agent will read them and records which ones get read. Enforcement exists, is
limited to blocking edits in a repo with no standards at all, and is off by default.
