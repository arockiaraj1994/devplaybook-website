---
title: Why scaffolding refuses to merge
description: The write tool creates a standards project or it errors. It never merges into one, and that was the harder decision.
pubDate: 2026-09-10
---

`playbook_scaffold_standards` is the only tool in dev-playbook that writes. Point it at a
project that already exists and it does not merge, does not skip, does not append. It errors,
says the store never merges, and points at the read tools.

That looks like a missing feature. It is the feature.

## What merging would have to decide

A standards project is roughly 25 documents composed from a base pack and one pack per
language. Say a repo scaffolded for Python last year, and someone now scaffolds it again with
Python and Go.

The Go pack contributes rules into `core/guardrails.md` — a document the base pack owns and
that a human has since edited. To merge, the tool has to answer:

- Is the existing guardrails document the scaffolded one, or the edited one?
- If it was edited, does the new Go rule go above or below the hand-written paragraph?
- If a rule with the same id already exists but the text differs, which wins?
- If a human deleted a rule on purpose, does re-scaffolding bring it back?

Nothing in the store records the answers. `standards_files` holds a project, a relative path
and a body. It does not hold provenance, and it does not hold intent.

## The version where it merged

An earlier pass did merge, by rule id, newest wins. It worked in tests, because tests scaffold
into empty stores.

What it did on a real project was quietly resurrect three rules someone had deleted two weeks
earlier. Not with an error. With a successful call and a green result, discovered later by
someone wondering why the linter rule they had removed was back in the document.

A write tool that silently undoes a human decision is worse than one that refuses.

## Refusing is cheap when the error is good

The cost of refusing is one round trip, and only if the error is useless. So it is not:

```
Project "billing" already exists. The store never merges into an existing
project. To read what is there: playbook_find_standards(project="billing").
To change a document: edit it in the dashboard, or in the store.
```

That is the whole cost. The agent knows what happened, knows this is not a retry situation, and
knows the two things it can do instead.

## The general rule

An additive, non-idempotent tool should say so in its annotations and then behave like it. Ours
declares `destructiveHint: false` and `idempotentHint: false`, so a client confirms before
calling it, and `dry_run=True` renders the manifest without writing anything.

Three signals, all pointing the same way: this call creates something, calling it twice is not
the same as calling it once, and you can look before you leap.

The tool that merges is still not written. If it ever is, the store will have to learn
provenance first.
