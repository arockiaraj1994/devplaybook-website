---
title: Install the plugin
description: The two-command path for Claude Code. No server to run, no port, no bearer token.
sidebar:
  order: 1
---

This is the shortest path to having your standards in context, and the one to take unless you
already know you need a shared server.

```
/plugin marketplace add arockiaraj1994/dev-agent-playbook
/plugin install dev-playbook@dev-playbook
```

Restart Claude Code afterwards.

## What you just installed

| Component | What it does |
| --- | --- |
| MCP server, five tools | `playbook_start_task`, `playbook_get_standard`, `playbook_find_standards`, `playbook_list_templates`, `playbook_scaffold_standards` |
| `using-standards` skill | Model-invoked. How to read the standards, and how to name the project on every call. |
| `/dev-playbook:scaffold-standards` | Walks a repo that has none: detect languages, fill placeholders from the source, preview, write. |
| SessionStart hook | Puts this project's guardrails in context at session start, without anyone asking. |
| PreToolUse hook | The definition of done, once per session, before the first `Write` or `Edit`. |

The plugin launches the server itself over stdio and keeps its database in the plugin's own
data directory, which survives updates and uninstall.

## Requirements

[`uv`](https://docs.astral.sh/uv/getting-started/installation/) on your `PATH`. It manages the
server's Python and its dependencies, so there is nothing else to install.

## Check it worked

Ask Claude Code to list its tools, or just start a task in a repo. If the repo has a standards
project you will see its guardrails arrive at session start. If it does not, you will get one
line naming the scaffold command.

:::note
The hooks read the standards database directly with stdlib `sqlite3` rather than making an MCP
round trip, and any failure exits silently. A hook must never be the reason a session is
broken.
:::

## Next

- [Your first task](/docs/start/first-task/) - the flow, end to end.
- [Plugin settings](/docs/plugin/) - enforcement, and pointing it at a shared server.
- [Scaffolding](/docs/tools/scaffold-standards/) - if this repo has no standards yet.
