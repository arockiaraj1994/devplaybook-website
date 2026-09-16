---
title: playbook_get_gates
description: The definition of done and the verify scripts - what "done" means, and how to prove it.
sidebar:
  order: 6
---

```python
playbook_get_gates(project: str, language: str = None)
```

Read-only. What "done" means for the project, and how to check it.

## What comes back

- The **definition of done** - the completion checklist.
- The **verify scripts** (`gates/scripts/verify-<lang>.sh`) and any release scripts, with how to run
  them.

Pass `language` to narrow the verify script to one language; omit it for every gate. Call it before
you treat a change as finished. It reads the gate scripts - it does not run them.
