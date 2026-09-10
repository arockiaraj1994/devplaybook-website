---
title: playbook_get_standard
description: Reads one standards document, addressed by relative path or by shorthand.
sidebar:
  order: 2
---

```python
playbook_get_standard(project: str, ref: str)
```

Read-only. Returns one document.

## Refs

`ref` is the document's relative path, or one of the shorthands:

```python
playbook_get_standard("billing", "core/guardrails.md")   # path
playbook_get_standard("billing", "guardrails")           # shorthand
playbook_get_standard("billing", "workflow:bug-fix")     # workflow by name
playbook_get_standard("billing", "gate:python")          # gate script
```

The full grammar is in [refs](/docs/concepts/refs/).

## When a ref does not resolve

The error lists the project's actual documents. That turns a guess into one round trip instead
of several, which matters when the caller is an agent rather than a person with a file tree in
front of them.

Storage is `standards_files(project, relative_path)`, and a test asserts that every ref the
tools print resolves back to the row it names. If a tool suggests a ref, that ref works.
