---
title: playbook_list_templates
description: The template pack catalogue - which languages exist, how many rules each carries, and which placeholders it needs.
sidebar:
  order: 8
---

```python
playbook_list_templates(language: str = None)
```

Read-only. Called before scaffolding, to find out what can be scaffolded.

Returns the pack catalogue: available languages, rule counts, the placeholders each pack
requires, and per-pack detail when you name a `language`.

```python
playbook_list_templates()            # everything available
playbook_list_templates("python")    # just the Python pack, in detail
```

The six bundled language ids are `go`, `java`, `kotlin`, `python`, `rust` and `typescript`,
alongside the base pack that owns the shared documents.

## Why this is separate from scaffolding

Discovery data is expensive to carry in a tool description, because a description is paid for
in every conversation whether or not it is needed. Splitting the catalogue out means the tokens
are spent on the one conversation that is actually bootstrapping a repo.

## Placeholders

Each pack declares what it needs filled in - a package name, a module root. The values come
from the repo you are scaffolding, not from the person running the tool: if a placeholder is
missing, the error says where in the codebase to look for it.
