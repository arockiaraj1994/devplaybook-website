---
title: playbook_start_task
description: The entry point. Returns the guardrails plus the workflow for the task at hand, and the refs to read next.
sidebar:
  order: 1
---

```python
playbook_start_task(project: str, intent: str)
```

Read-only. The call an agent makes before it writes anything.

## Arguments

| Argument | Notes |
| --- | --- |
| `project` | The basename of the workspace directory. Case-insensitive. |
| `intent` | What you are about to do, in your own words. This selects the workflow. |

## What comes back

- The project's guardrails.
- The workflow matching `intent` - a bug fix and a new feature do not get the same one.
- The definition of done.
- A short list of refs worth reading next.

Deliberately not the whole corpus. A project is around 25 documents; returning all of them
would cost a context window to answer a question that needed three files.

## On `project`

This is the one argument worth getting right. Working in `/home/you/code/billing-api` means
`project="billing-api"`. A wrong name returns another team's standards, which is worse than
returning nothing at all.

If the project does not exist, the response says so and names
[`playbook_scaffold_standards`](/docs/tools/scaffold-standards/) rather than returning an
empty set.

## Implementation note

The guardrails and workflow bodies are rendered by the same function
`playbook_get_standard` uses, with a byte-identity test holding the two together. That
duplication had crept back twice before the test existed, because earlier passes merged tool
*names* without merging their *renderers*.
