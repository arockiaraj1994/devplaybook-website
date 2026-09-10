---
title: More code is the expensive part
description: Writing code got cheap and writing good code didn't. But the bill that's actually growing is the one for all the extra code an agent is happy to produce.
pubDate: 2026-09-11
---

Writing code got cheap. An agent will turn out a thousand lines before lunch, and most of
them will run. That much is settled.

Writing *good* code didn't get cheap in the same move — it still needs a convention, a
boundary, a definition of done that the model doesn't carry on its own. That's the gap
dev-playbook exists to close.

But there's a third line, and it's the one that shows up on the invoice: **writing *more*
code is not cheap either.** It never was. The price just moved somewhere you don't see when
the diff lands green.

## Where the cost actually sits

The keystroke was never the expensive part of software. The expensive part is everything a
line of code obligates you to afterward:

- **Debugging.** Every line is a place a bug can live. Twice the code is roughly twice the
  surface to search when something breaks at 2am, and the agent that wrote it isn't the one
  paged.
- **Maintenance.** Code is read far more than it's written. A helper you didn't need, an
  abstraction one caller deep, a config flag nobody remembers — each is carried forward by
  every person who touches that file for years.
- **Review.** This is the one that's inverted the fastest. Generation went up by an order of
  magnitude; a human's reading speed did not. When the agent produces the volume, review
  stops being a checkpoint and becomes the bottleneck — and a reviewer skimming 1,200 lines
  approves more than one reading 120.

None of these got cheaper. If anything the cheap writing made them worse, because the cheapest
thing an agent can do is add.

## The default is more

Ask an agent to fix a bug and it will often add a branch rather than correct the one that's
wrong. Ask for a feature and it reaches for a new module before it looks for the function that
already does most of the job. Left alone, it merges instead of refuses, appends instead of
edits, wraps instead of deletes. Volume is the path of least resistance, and a model optimizing
for "make the request go away" takes it.

So the maintainability problems teams are already hitting aren't a surprise — they're the
predictable result of pointing a tireless writer at a codebase and grading it on output. The
line count goes up and to the right, and the cost follows it, one review and one on-call
rotation at a time.

## What standards do about it

This is the quiet reason to serve the agent your rules before it writes. A definition of done
that says *reuse before you add* is also a spending limit. A guardrail that says *no dead
config, no one-caller abstraction* is a maintenance budget. A convention the agent reads up
front is fewer things a reviewer has to catch after the fact.

dev-playbook isn't only about the code being *good*. It's about the code being *no larger than
it needs to be* — because the smallest correct change is almost always the cheapest one to own.

Writing code got cheap. Writing good code didn't. And writing more code is still the most
expensive thing you can do — it just sends the bill later.
