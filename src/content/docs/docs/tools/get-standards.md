---
title: playbook_get_standards
description: One language's coding standards, testing rules and anti-patterns. Language is required.
sidebar:
  order: 3
---

```python
playbook_get_standards(project: str, language: str)
```

Read-only. One language's rules.

## Arguments

| Argument | Notes |
| --- | --- |
| `project` | Workspace directory basename. |
| `language` | The language to read, e.g. `kotlin`. **Required** - these documents only exist per language. |

## What comes back

That language's standards, testing rules and anti-patterns.

`language` is required on purpose: the standards, testing and anti-pattern documents exist only per
language, so there is nothing sensible to return without one. Call
[`playbook_find_standards`](/docs/tools/find-standards/) with no query to see which languages a
project covers.
