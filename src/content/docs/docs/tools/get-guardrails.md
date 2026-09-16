---
title: playbook_get_guardrails
description: The always-on rules and git conventions a change is held to, whatever the language.
sidebar:
  order: 2
---

```python
playbook_get_guardrails(project: str)
```

Read-only. The rules that apply to every change, regardless of language.

## What comes back

- The **guardrails** - the MUST / MUST NOT rules for every change.
- The **git conventions** - branching, commit format, review and release.

Read it before you write code. With the plugin installed, the SessionStart hook has usually put the
guardrails in context already. For the "is it done" checks use
[`playbook_get_gates`](/docs/tools/get-gates/); for a language's rules use
[`playbook_get_standards`](/docs/tools/get-standards/).
