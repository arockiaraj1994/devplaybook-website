---
title: Your first task
description: One change, start to finish - what the agent asks for, what comes back, and what it reads next.
sidebar:
  order: 2
---

The pattern is always the same: open the task, read what you were pointed at, then write.

## 1. Open the task

```python
playbook_start_task(project="billing", intent="add pagination to /orders")
```

`project` is the basename of the workspace directory, and matching is case-insensitive.
Getting it wrong returns another team's standards, which is worse than returning nothing, so
this is the one argument worth being careful about.

What comes back is scoped to the change at hand: the guardrails, the workflow matching that
kind of task, and a short list of refs worth reading next. Not the whole corpus.

## 2. Read what it pointed at

```python
playbook_get_standard(project="billing", ref="core/guardrails.md")
playbook_get_standard(project="billing", ref="guardrails")          # same document
playbook_find_standards(project="billing", query="pagination")
```

`playbook_get_standard` when you know the document, `playbook_find_standards` when you don't.
Both are covered in [the ref grammar](/docs/concepts/refs/).

## 3. Write

Against the definition of done that came back in step one, rather than a generic one.

## When the project does not exist

`playbook_start_task` says so, and names the tool that fixes it. Nothing silently returns
empty standards, because an agent that reads no rules and an agent that reads zero rules
behave identically and only one of those is a bug you can see.

Go to [scaffolding](/docs/tools/scaffold-standards/) from there.

## In Claude Code you skip step one

With the plugin installed, the SessionStart hook has already put this repo's guardrails in
context before you type anything, and the definition of done arrives before your first edit.
The tools are still there when the agent needs a specific document.
