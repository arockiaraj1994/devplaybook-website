---
title: The tool surface
description: Nine playbook_ tools - one read tool per kind of document, plus search, a catalogue, and the one that writes.
sidebar:
  order: 0
---

Nine tools, namespaced `playbook_`. One read tool per kind of document, a search, a catalogue, and
one that writes.

| Tool | Returns | Writes |
| --- | --- | --- |
| [`playbook_get_agents`](/docs/tools/get-agents/) | AGENTS.md, ARCHITECTURE.md and the glossary | no |
| [`playbook_get_guardrails`](/docs/tools/get-guardrails/) | The always-on rules and git conventions | no |
| [`playbook_get_standards`](/docs/tools/get-standards/) | One language's standards, testing and anti-patterns | no |
| [`playbook_get_patterns`](/docs/tools/get-patterns/) | Implementation patterns, or one by name | no |
| [`playbook_get_workflow`](/docs/tools/get-workflow/) | The workflow matching an intent, or one by name | no |
| [`playbook_get_gates`](/docs/tools/get-gates/) | The definition of done and the verify scripts | no |
| [`playbook_find_standards`](/docs/tools/find-standards/) | Search results, or the whole list when given no query | no |
| [`playbook_list_templates`](/docs/tools/list-templates/) | The pack catalogue: rule counts, placeholders, per-pack detail | no |
| [`playbook_scaffold_standards`](/docs/tools/scaffold-standards/) | A new standards project | **yes** |

## One tool per kind of document

Each read tool names the documents it returns rather than taking a generic "which document?"
argument. The description an agent reads says exactly what comes back, so it picks the right call
with no grammar to learn. The retired `playbook_get_standard` / `playbook_start_task` pair - one
catch-all reader plus a separate entry point - split into these six getters in v2.0.0.

## Annotations

Every tool declares `readOnlyHint`, `destructiveHint`, `idempotentHint` and `openWorldHint`, so a
client can decide which calls to confirm before making them. A client that sees no annotations is
entitled to assume the worst, so none go out bare.

The one that writes is additive but **not idempotent**: it creates a standards project and refuses
to merge into an existing one. Clients should confirm it; agents should call it with `dry_run=True`
first.

## Every error carries a next move

A tool that fails without saying what to do next costs another round trip, so none of these do.

- An unknown language lists the valid ids.
- A missing placeholder says where in the codebase to find the value.
- An unknown project names the projects that do exist, and how to scaffold one.
- Scaffolding over an existing project says the store never merges, and points at the read tools.

## Why `list_templates` is its own tool

The pack catalogue is discovery data. Folding it into the scaffold tool's description would spend
those tokens in every conversation, whether or not anything needed bootstrapping. As a separate
tool it is a round trip paid only when something does.
