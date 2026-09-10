---
title: The tool surface
description: Five playbook_ tools, what each returns, and why every one of them declares its MCP annotations.
sidebar:
  order: 0
---

Five tools, namespaced `playbook_` and named `<verb>_<resource>`. Four read, one writes.

| Tool | Returns | Writes |
| --- | --- | --- |
| [`playbook_start_task`](/docs/tools/start-task/) | Guardrails, the matching workflow, and the refs to read next | no |
| [`playbook_get_standard`](/docs/tools/get-standard/) | One document, by path or shorthand | no |
| [`playbook_find_standards`](/docs/tools/find-standards/) | Search results, or the whole list when given no query | no |
| [`playbook_list_templates`](/docs/tools/list-templates/) | The pack catalogue: rule counts, placeholders, per-pack detail | no |
| [`playbook_scaffold_standards`](/docs/tools/scaffold-standards/) | A new standards project | **yes** |

## Annotations

Every tool declares `readOnlyHint`, `destructiveHint`, `idempotentHint` and `openWorldHint`, so
a client can decide which calls to confirm before making them. A client that sees no
annotations is entitled to assume the worst, so none go out bare.

The one that writes is additive but **not idempotent**: it creates a standards project and
refuses to merge into an existing one. Clients should confirm it. Agents should call it with
`dry_run=True` first.

## Every error carries a next move

A tool that fails without saying what to do next costs another round trip, so none of these do.

- An unknown language lists the valid ids.
- A missing placeholder says where in the codebase to find the value.
- An unresolvable ref lists the project's actual documents.
- Scaffolding over an existing project says the store never merges, and points at the read
  tools.

## Why `list_templates` is its own tool

The pack catalogue is discovery data. Folding it into the scaffold tool's description would
spend those tokens in every conversation, whether or not anything needed bootstrapping. As a
separate tool it is a round trip paid only when something does.
