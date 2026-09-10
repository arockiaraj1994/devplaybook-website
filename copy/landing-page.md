# Landing page copy - devplaybook.co.in

Draft 1. Voice matched to the repo's README and CHANGELOG: short sentences, spaced
hyphens, specific numbers, no superlatives. Section numbers match the plan's
landing page outline.

---

## 1. Hero

### Headline

**Writing code got cheap. Writing good code didn't.**

### Subhead

Your agent can turn out a thousand lines before lunch. It still doesn't know that
your team logs and rethrows, that the tests sit beside the source, or what you mean
by done. dev-playbook serves those rules over MCP so the agent reads them before it
writes - and generates the whole set if your repo hasn't got any.

### Alternate headlines

- **Code is cheap now. Good code isn't.** (tightest; loses a little of the setup)
- **Generating code stopped being the hard part.** (more measured, less punch)
- **Writing code is nearly free. Writing code your team would approve isn't.**
  (most explicit about review being the real cost)

### Alternate subhead (shorter, if the hero feels heavy)

Volume was the easy part. dev-playbook puts your guardrails, definition of done and
per-language rules in front of the agent over MCP - before it writes, not in
review.

### Install block

```
/plugin marketplace add arockiaraj1994/dev-agent-playbook
/plugin install dev-playbook@dev-playbook
```

Two commands in Claude Code. No server to run, no port, no bearer token.

### Buttons

- Primary: **Install the plugin**
- Secondary: **Read the docs**

### Trust strip (small, under the fold line)

Apache-2.0 · self-hosted · 601 tests · six language packs

---

## 2. The problem

### Heading

**You already wrote the standards. Nobody reads them.**

### Body

They're in a Confluence page, or a README nobody opens, or in the head of whoever
reviews the PR.

So agent-written changes keep arriving technically correct and quietly wrong. The
wrong test framework. A service where your team uses a repository. An error
swallowed where your team logs and rethrows. You catch it in review, explain the
convention again, and watch the next change make a different version of the same
mistake.

The rules aren't the problem. Getting them in front of the agent at the moment it
matters is.

---

## 3. How it works

### Heading

**The agent asks first, then writes.**

### Steps

**1. It opens with the task, not a question.**
`playbook_start_task("billing", "add pagination to /orders")` returns the
guardrails, the workflow for that kind of change, and the few documents worth
reading next.

**2. It reads them.**
`playbook_get_standard` when it knows which document it wants,
`playbook_find_standards` when it doesn't.

**3. It builds against your definition of done.**
Not a generic one.

### Closer

In Claude Code you don't even see step one. A session-start hook puts this repo's
guardrails in context before you've typed anything, and the definition of done
arrives before the first edit of the session.

If the repo has no standards project yet, step one says so and names the tool that
fixes it.

---

## 4. The tool surface

### Heading

**Five tools. Four read, one writes.**

| Tool | What you get back |
|---|---|
| `playbook_start_task` | Guardrails, the matching workflow, and the refs to read next |
| `playbook_get_standard` | One document, by path or shorthand |
| `playbook_find_standards` | Search across a project's standards, or the whole list |
| `playbook_list_templates` | The pack catalogue: rule counts, placeholders, per-pack detail |
| `playbook_scaffold_standards` | A new standards project, written from the packs |

### Body

Every tool ships its MCP annotations, so your client knows which call needs a
confirmation before it makes one. A client that sees no annotations is entitled to
assume the worst, so none go out bare.

The one that writes is additive but not idempotent. It creates a standards project
and refuses to merge into an existing one. Call it with `dry_run=true` and you get
the manifest with nothing written, which is how an agent can show you what it's
about to create before it creates it.

---

## 5. Starting from nothing

### Heading

**No standards yet? That's the case this was built for.**

### Body

Ask most teams where their coding standards live and you get a shrug and a link to
something from 2021.

So the write tool generates the set: guardrails, definition of done, architecture
and git rules, task workflows, and per-language standards, anti-patterns and
testing docs. 290 rules across six languages, each one something a reviewer has
actually had to ask for.

You accept or reject them one at a time. Every rule carries two to four sentences
on what goes wrong without it and a do/don't pair, so you're deciding rather than
rubber-stamping a list you've never read.

```
playbook_list_templates()                        # what's available
playbook_scaffold_standards(project="billing", languages=["java"],
    placeholders={"package": "com.acme.billing"}, dry_run=true)
                                                 # the manifest, nothing written
playbook_scaffold_standards(..., dry_run=false)  # write it
```

Or click through the same thing in the dashboard wizard. Both paths call the same
function, and a test diffs the two results so they can't drift apart.

---

## 6. Language packs

### Heading

**A base pack, plus one per language.**

### Body

Go, Java, Kotlin, Python, Rust, TypeScript.

The base pack owns what every repo needs - AGENTS.md, guardrails, architecture,
git rules - and each language pack contributes its rules into those documents. Pick
two languages and you get one set of shared docs with both languages' rules in it,
not two copies fighting over the same filename.

Packs are just directories with a `pack.yaml`. Point the loader at your own
checkout and yours shadow the bundled ones, so a team with house rules doesn't have
to fork anything.

---

## 7. The dashboard

### Heading

**Author in the browser. See what's actually being read.**

### Body

Standards live in SQLite, and the dashboard reads the same store the MCP tools do.
Create projects through the wizard, edit any document in a four-tab viewer
(formatted, source, code, edit), and check corpus health against the validation
rules.

The telemetry side answers the question you'll have in month two: who's calling the
tools, which standards get read, and which ones nobody has touched since you wrote
them.

*[screenshot tour - 7 dashboard captures]*

---

## 8. Local or shared

### Two columns

**On your machine**

For one developer, or a repo you're trying this on. The plugin starts the server
itself over stdio against its own database. Nothing to deploy, no port, no
dashboard. It needs `uv` on your PATH and nothing else.

**For the team**

Everyone reads the same standards. Run the server, issue bearer tokens from the
dashboard, and point each plugin at it. One place for the standards, one place for
everyone's telemetry.

Same five tools either way.

---

## 9. Enforcement (short section or FAQ item)

### Heading

**Off by default.**

### Body

Installing a plugin should not stop anyone's work by surprise. Out of the box you
get the definition of done as context before your first edit, and one line naming
the scaffold command if the repo has no standards. Nothing is blocked.

Turn enforcement on and `Write` and `Edit` are denied in a repo with no standards
project, with a reason that names what's missing. Every edit, not just the first -
a gate that closes once is not a gate.

---

## 10. Footer CTA

### Heading

**Put it in front of your agent this afternoon.**

### Body

```
/plugin marketplace add arockiaraj1994/dev-agent-playbook
/plugin install dev-playbook@dev-playbook
```

Apache-2.0. Self-hosted - your standards and your database stay on your
infrastructure. Cursor and Windsurf have no plugin system, so they use the manual
MCP setup, which is two lines in the docs.

### Links

Docs · Changelog · GitHub · Blog

---

## Meta / OG

**Title:** dev-playbook - writing code got cheap, writing good code didn't

**Description:** Your agent can write a thousand lines before lunch, and still
doesn't know your team's conventions. dev-playbook serves your guardrails,
definition of done and per-language rules over MCP - and generates them if your
repo hasn't got any. Apache-2.0, self-hosted.

---

## Words this copy deliberately avoids

seamless, robust, leverage, unlock, elevate, empower, revolutionise, game-changer,
supercharge, "in today's fast-paced", "whether you're a X or a Y", "it's not just
X, it's Y", any sentence built out of three adjectives.
