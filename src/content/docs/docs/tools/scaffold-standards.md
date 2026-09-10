---
title: playbook_scaffold_standards
description: The one tool that writes. Creates a standards project from the base pack plus the language packs you pick.
sidebar:
  order: 5
---

```python
playbook_scaffold_standards(project: str, languages: list[str],
                            placeholders: dict = None, dry_run: bool = False)
```

**This tool writes.** It is additive but not idempotent: it creates a standards project and
refuses to merge into an existing one.

## Always dry run first

```python
playbook_list_templates()

playbook_scaffold_standards(project="billing", languages=["python"],
    placeholders={"package": "acme.billing"}, dry_run=True)
# renders the manifest, writes nothing

playbook_scaffold_standards(project="billing", languages=["python"],
    placeholders={"package": "acme.billing"}, dry_run=False)
# writes it
```

`dry_run=True` renders the full manifest and writes nothing, so an agent can show you what it
is about to create before it creates it. Never write on the first call.

## What gets created

Guardrails, definition of done, architecture and git rules, task workflows, and per-language
standards, anti-patterns and testing docs. Around 25 documents for one language.

## It refuses to merge

Scaffolding over an existing project is an error, not a merge. The error says so and points at
the read tools. A merge would have to decide which of two conflicting rules wins, and nothing
in the store records which one you meant.

To change standards after scaffolding, edit them - in the dashboard's four-tab viewer, or
directly in the store.

## One implementation, two front doors

This tool contains no scaffolding logic of its own. It calls `scaffold_service.py`, the same
function the dashboard's creation wizard calls, and a test diffs the two resulting stores. The
path you took cannot change what you got.

## Turning it off

`config.toml` carries `[enable] scaffold`, default true. Set it false and the write tool is
neither advertised nor callable; the read tools are unaffected.

With auth enabled, scaffolding additionally requires an admin token. With auth disabled every
principal is `role="user"`, so an unconditional admin gate would lock the tool out of the
default local configuration entirely - which is why the gate is conditional on auth being on.
