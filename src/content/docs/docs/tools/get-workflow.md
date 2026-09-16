---
title: playbook_get_workflow
description: The workflow for a task - matched from your intent, or fetched by name.
sidebar:
  order: 5
---

```python
playbook_get_workflow(project: str, intent: str = None, name: str = None)
```

Read-only. The ordered steps for a kind of task.

With `intent`, it matches your words against each workflow's triggers and returns the best fit - a
bug fix and a new feature do not get the same one. With `name`, it returns that workflow. With
neither, it lists them.

```python
playbook_get_workflow("billing", intent="fix a crash on startup")  # -> the bug-fix workflow
playbook_get_workflow("billing", name="bug-fix")                   # by name
```

This folds in what the retired `playbook_start_task` did - matching an intent to a workflow - so the
entry point is now just a read tool like the rest. Read the always-on rules alongside it with
[`playbook_get_guardrails`](/docs/tools/get-guardrails/).
