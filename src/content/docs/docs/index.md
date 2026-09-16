---
title: Overview
description: What dev-playbook is, and how to try it in a few minutes.
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

## What it does not do

It does not review your code, run your tests, or gate your pull requests. It puts the rules where
the agent will read them, and can block edits in a repo that has not been set up. That's it.

The full change history is in the [changelog](/changelog/).
