---
title: The dashboard
description: What each page shows - standards authoring, tool telemetry, users and tokens.
sidebar:
  order: 4
---

The dashboard exists whenever the server runs over HTTP, at `/dashboard/`. It reads the same
SQLite store the MCP tools do.

## Standards

The authoring side. Admins create projects through a six-step wizard, and edit any document in
a four-tab viewer: Formatted, Source, Code and Edit. Writes use optimistic concurrency, so two
people editing the same document get a conflict instead of a silent overwrite.

Corpus health scores the store's rows against the validation rules, which is how you find the
documents that were scaffolded and never touched.

## Telemetry

| Page | Shows |
| --- | --- |
| Home | Adoption and latency across the tool surface |
| Tools | Per-tool call counts and timings |
| Searches | What people and agents looked for |
| Activity | The raw call log, newest first |
| Users | Who has registered, and who has gone inactive |

Recorded calls are history and are never orphaned: when a tool is renamed, the legacy name is
mapped onto the new one rather than dropped, so the map only ever grows.

## Administration

Setup walks a new instance through verification. Tokens issues and revokes MCP bearer tokens.
Users-admin creates and manages local users. All three need auth enabled to be meaningful - see
[auth and tokens](/docs/self-host/auth/).
