---
title: playbook_get_agents
description: The project's identity and context - AGENTS.md, ARCHITECTURE.md and the glossary.
sidebar:
  order: 1
---

```python
playbook_get_agents(project: str)
```

Read-only. The documents that orient an agent in a project.

## What comes back

- `AGENTS.md` - the working conventions, and which document governs what.
- `ARCHITECTURE.md` - module boundaries and dependency rules.
- The glossary of domain terms.

Read it to get your bearings. For the always-on rules use
[`playbook_get_guardrails`](/docs/tools/get-guardrails/); for a language's rules use
[`playbook_get_standards`](/docs/tools/get-standards/).

## On `project`

The basename of the workspace directory, matched case-insensitively. A wrong name returns another
team's standards, which is worse than returning nothing.
