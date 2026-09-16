---
title: Template packs
description: A base pack plus one per language, composed into one set of documents.
sidebar:
  order: 1
---

A standards project is composed from the **base pack** plus one or more **language packs**. The
[pack format](/docs/templates/spec/) is the full contract; this page is why it is shaped that
way.

## Base owns, languages contribute

Every language needs an `AGENTS.md`, a `guardrails.md` and an `ARCHITECTURE.md`. If each
language pack shipped its own copy, selecting two languages would mean two packs writing the
same file and one of them losing.

So the base pack **owns** the shared documents, and each language pack **contributes** its rules
into them. Pick Python and Go and you get one guardrails document containing both languages'
rules.

## The bundled packs

| Language | Pack id |
| --- | --- |
| Go | `go` |
| Java | `java` |
| Kotlin | `kotlin` |
| Python | `python` |
| Rust | `rust` |
| TypeScript | `typescript` |

The id is the string you pass to
[`playbook_scaffold_standards`](/docs/tools/scaffold-standards/) in `languages`.

Each language pack carries standards, anti-patterns and testing docs, namespaced under its own
id so two languages cannot collide, plus a verify gate script.

## Bringing your own

A pack is a directory with a `pack.yaml` in it. Packs are discovered by globbing for
`pack.yaml` at any depth under a search root, so one directory per language and one directory
per language *version* both work.

Search order, highest precedence first:

1. `$MCP_TEMPLATE_CACHE` (default `~/.cache/dev-playbook-templates`) - a synced checkout
2. the bundled `mcp/templates/`

First match by pack id wins, so your copy shadows the bundled one and the bundled set stays as
the offline fallback. A malformed pack is logged and skipped rather than taking the others down
with it.

## Rules carry their own explanation

The wizard asks you to accept or reject around 290 rules, one compressed sentence each. That
sentence cannot be lengthened, because it is written verbatim into the generated markdown.

So rules also carry `help:` - two to four sentences on what goes wrong without the rule - and
`example:` - a do/don't pair. Both show in a modal, which is what makes reviewing 290 rules a
decision rather than a rubber stamp.
