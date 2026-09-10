---
title: playbook_find_standards
description: Searches a project's standards, or lists all of them when given no query.
sidebar:
  order: 3
---

```python
playbook_find_standards(project: str, query: str = None,
                        type: str = None, top_k: int = None)
```

Read-only. With no `query`, it lists everything in the project - which is how you find out what
a project contains without guessing at refs.

## Arguments

| Argument | Notes |
| --- | --- |
| `project` | Workspace directory basename. |
| `query` | Optional. Omit to list the whole project. |
| `type` | Optional filter by document type. |
| `top_k` | Optional cap on results. |

## How it scores

In Python, over the store's file list. Not BM25, and not FTS5.

A project is around 25 documents. At that size the ranking algorithm is not what determines
whether the right document comes back, and an index would be a moving part that has to be kept
correct for no measurable gain. FTS5 is the escalation if corpora grow, not now.
