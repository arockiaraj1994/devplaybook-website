---
title: The ref grammar
description: How a tool call addresses one document - relative paths, shorthands, and why the older grammar went away.
sidebar:
  order: 1
---

A `ref` names one document in a project. It is the document's **relative path**, plus a few
aliases for the documents that get asked for constantly.

```
core/guardrails.md          the path
guardrails                  alias
definition-of-done          alias
workflow:bug-fix            a workflow, by name
gate:python                 a gate script
```

## Why the path is the grammar

Storage is `standards_files(project, relative_path)`. A ref that is the path needs no
translation table, so there is no table to fall out of date.

An earlier version used a typed grammar - `pattern:x`, `language:kotlin/testing`. That
addressed a filesystem corpus that no longer exists; standards moved into SQLite in v1.0.0 and
the types stopped corresponding to anything the store knew about.

## Refs the tools print always resolve

A test asserts that every ref any tool prints resolves back to the row it names. This matters
more than it sounds: the tools suggest refs constantly - in `start_task`'s "read next" list, in
the error when a ref misses - and an agent will call exactly what it was handed. A suggestion
that does not resolve costs a round trip and teaches the agent to distrust the next one.

## Finding refs

You do not have to guess. [`playbook_find_standards`](/docs/tools/find-standards/) with no
query lists every document in a project, and an unresolvable ref returns the list too.
