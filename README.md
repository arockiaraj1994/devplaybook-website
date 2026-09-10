# devplaybook-website

The site behind [devplaybook.co.in](https://devplaybook.co.in): a landing page, the docs, the
changelog and a blog. Astro with Starlight, deployed to GitHub Pages.

The product itself lives in
[dev-agent-playbook](https://github.com/arockiaraj1994/dev-agent-playbook).

## Run it locally

### Prerequisites

- **Node 24** and npm. The version is pinned in `.nvmrc`, so with nvm installed:
  ```bash
  nvm use          # reads .nvmrc
  node --version   # expect v24.x
  ```
- A network connection on first load. Fonts come from Google Fonts, so the type falls back to
  system faces offline. Everything else is local.
- The product repo at `../dev-agent-playbook` — **only** if you want to re-run `npm run sync`.
  The synced files are committed, so the site builds without it.

### First run

```bash
git clone git@github.com:arockiaraj1994/devplaybook-website.git
cd devplaybook-website
npm install
npm run dev
```

Open **http://localhost:4321**. The dev server hot-reloads: save any file under `src/` and the
browser updates without a restart.

Worth walking on a first run: `/`, `/docs/`, `/changelog/`, `/blog/`, and any bad URL for the
404.

### The scripts

| Command | Does |
| --- | --- |
| `npm run dev` | Dev server on :4321, with hot reload. What you want day to day. |
| `npm run build` | Static output into `dist/`. Also builds the Pagefind search index. |
| `npm run preview` | Serves `dist/` — the real thing, including search. Run `build` first. |
| `npm run check` | `astro check`: TypeScript and content-collection errors. Run before pushing. |
| `npm run sync` | Pulls `CHANGELOG.md`, `TEMPLATE_SPEC.md` and the screenshots from the product repo. |
| `npm run sync:check` | Exits non-zero if those committed copies are stale. |

### Before you push

```bash
npm run check && npm run build
```

Both are quick, and between them they catch everything CI would.

### If something goes wrong

**Port 4321 already in use** — `npm run dev -- --port 4322`.

**Docs search returns nothing in `dev`** — expected. Pagefind indexes at build time, so search
only works via `npm run build && npm run preview`.

**`npm run sync` says "missing source"** — it cannot find the product repo. Either clone it
beside this one, or point at it: `PLAYBOOK_REPO=../some/other/path npm run sync`.

**`npm run preview` says a preview server is already running** — it is a daemon in this Astro
version, and a second one will not start on another port. `npx astro preview stop` (or
`status`, or `logs`) manages the running one.

**A stale page after editing `astro.config.mjs`** — config changes need a dev server restart;
content and component changes do not.

**Odd build errors after pulling** — clear the cache: `rm -rf .astro dist && npm run build`.

## Who owns which route

Starlight renders everything in `src/content/docs`, mapped to the site root. Explicit files in
`src/pages` are static routes and win over Starlight's catch-all, which is what lets the
landing page and the blog coexist with it.

| URL | Owner | Source |
| --- | --- | --- |
| `/` | Astro page | `src/pages/index.astro` |
| `/docs/*` | Starlight | `src/content/docs/docs/**` |
| `/changelog` | Starlight | `src/content/docs/changelog.md` (synced) |
| `/blog`, `/blog/<slug>` | Astro pages | `src/content/blog/*.md` |
| `/404` | Astro page | `src/pages/404.astro` |

Docs are nested one level under `docs/` on purpose: it earns the `/docs` prefix and keeps
`/blog` and `/` from ever colliding with a docs slug.

## Syncing from the product repo

Two files are docs-shaped already and are copied rather than rewritten:

```bash
npm run sync         # pull CHANGELOG.md, TEMPLATE_SPEC.md and the screenshots
npm run sync:check   # exit 1 if the committed copies are stale
```

Source repo defaults to `../dev-agent-playbook`; override with `PLAYBOOK_REPO`.

**The synced output is committed on purpose.** The Pages workflow only checks out this repo, so
a build that reached for a sibling directory would fail in CI. `sync` is an authoring step, not
a build step — run it when the product repo changes, and commit the result.

Synced files are written as `.md`, never `.mdx`: `CHANGELOG.md` contains `<verb>_<resource>`
and `{...}`, which MDX parses as JSX and fails on.

## Theming

One palette in `src/styles/custom.css`, loaded by both Starlight and `BaseLayout`. It follows
Starlight's mechanism: `data-theme` on `<html>`, dark values in `:root`, light as the override,
and the choice stored under the `starlight-theme` key. The header toggle writes that same key,
so the theme survives a move between `/` and `/docs`.

If you add a colour, define it in **both** `:root` and `:root[data-theme='light']`.

## Deploying

Push to `main`. `.github/workflows/deploy.yml` builds with `withastro/action` and publishes
with `actions/deploy-pages`.

One-time setup, in the repo settings:

1. **Pages → Source: GitHub Actions**.
2. Custom domain `devplaybook.co.in`, then **Enforce HTTPS**.
3. DNS at the registrar: apex `A` records to `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153`, and a `www` `CNAME` to `arockiaraj1994.github.io`.

`public/CNAME` is committed, so the custom domain survives each deploy.

## Copy

`copy/landing-page.md` is the working copy deck for the landing page — headline options,
section-by-section text, and a list of words the site deliberately avoids. Edit it alongside
`src/pages/index.astro` so the two do not drift.
