---
title: The standards store
description: Standards live in SQLite, and the MCP tools and the dashboard read the same rows.
sidebar:
  order: 2
---

Standards are rows, not files: `standards_projects` and `standards_files` in `metrics.db`. The
MCP tools and the dashboard read the same store, so a document edited in the browser is the
document the agent reads on its next call. There is no build step and no sync.

## Why not files on disk

Files were the original design and were cut in v1.0.0. Two things pushed it: the dashboard
needed to edit documents with optimistic concurrency, and `find` needed to list a project
without walking a tree that might not exist on the machine running the server. Both are
straightforward against rows and awkward against a directory.

A consequence worth knowing: there is no checked-in index of your standards to read in a pull
request. [`playbook_find_standards`](/docs/tools/find-standards/) or the dashboard's Standards
page is how you list them.

## First boot

The standards tables are seeded from a JSON file - `mcp/data/standards_seed.json` by default,
overridable with `MCP_STANDARDS_SEED`. The seed loads **only when the tables are empty**, so
restarting the server never overwrites what you have authored.

## Corpus health

`standards_scanner.py` runs validation rules against the store's rows and scores the result.
The dashboard surfaces that as corpus health, which is how you find the document that was
scaffolded and never edited.

## Authoring in the browser

Admins create projects through a six-step wizard and edit any document in a four-tab viewer:
Formatted, Source, Code, and Edit. Writes use optimistic concurrency, so two people editing the
same document get a conflict rather than a silent overwrite.
