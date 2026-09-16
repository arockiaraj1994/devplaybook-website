---
title: playbook_get_patterns
description: Implementation patterns - project-wide, addressed by name rather than by language.
sidebar:
  order: 4
---

```python
playbook_get_patterns(project: str, name: str = None)
```

Read-only. The reusable shapes for recurring work - repository, use-case, viewmodel.

With no `name` it lists the project's patterns; with one it returns that pattern in full.

```python
playbook_get_patterns("billing")                     # list them
playbook_get_patterns("billing", name="repository")  # one in full
```

Patterns are project-wide, not per language, so this tool takes no `language`. The name is the
pattern's, and the same shape reads the same whichever language wrote it.
