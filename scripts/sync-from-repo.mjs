#!/usr/bin/env node
/**
 * Pulls the files that are already docs-shaped out of the dev-agent-playbook
 * repo and into this site's content collections.
 *
 *   node scripts/sync-from-repo.mjs           write
 *   node scripts/sync-from-repo.mjs --check   exit 1 if the committed output is stale
 *
 * The output is committed on purpose. The Pages workflow only checks out this
 * repo, so a build that reached for a sibling directory would fail in CI.
 *
 * Synced markdown is written as `.md`, never `.mdx`: CHANGELOG.md contains
 * `<verb>_<resource>` and `{...}`, which MDX parses as JSX and chokes on.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const SITE = resolve(import.meta.dirname, '..');
const REPO = resolve(SITE, process.env.PLAYBOOK_REPO ?? '../dev-agent-playbook');
const CHECK = process.argv.includes('--check');

const BANNER =
  '<!-- Synced by scripts/sync-from-repo.mjs. Edit the source in dev-agent-playbook, not here. -->';

/** @type {{from: string, to: string, title: string, description: string, sidebar?: number}[]} */
const PAGES = [
  {
    from: 'CHANGELOG.md',
    to: 'src/content/docs/changelog.md',
    title: 'Changelog',
    description:
      'Every notable change to dev-playbook, newest first. The MCP server follows semantic versioning.',
  },
  {
    from: 'mcp/templates/TEMPLATE_SPEC.md',
    to: 'src/content/docs/docs/templates/spec.md',
    title: 'Pack format',
    description:
      'The contract a template pack conforms to: layout, pack.yaml, search order and composition.',
    sidebar: 2,
  },
];

const SCREENSHOTS = { from: 'docs/screenshots', to: 'src/assets/screenshots' };

const yaml = (s) => `"${s.replace(/"/g, '\\"')}"`;

function render({ from, title, description, sidebar }) {
  const src = readFileSync(join(REPO, from), 'utf8');

  // Starlight renders the title as the page h1, so the source's own h1 would
  // duplicate it.
  const body = src.replace(/^#\s+.*(\r?\n)+/, '').trimEnd();

  const front = [
    '---',
    `title: ${yaml(title)}`,
    `description: ${yaml(description)}`,
    'editUrl: false',
    ...(sidebar === undefined ? [] : ['sidebar:', `  order: ${sidebar}`]),
    '---',
    '',
    BANNER,
    '',
    '',
  ].join('\n');

  return `${front}${body}\n`;
}

const stale = [];

for (const page of PAGES) {
  const source = join(REPO, page.from);
  if (!existsSync(source)) {
    console.error(`missing source: ${source}`);
    console.error(`set PLAYBOOK_REPO if the playbook repo is not at ../dev-agent-playbook`);
    process.exit(1);
  }

  const target = join(SITE, page.to);
  const next = render(page);
  const current = existsSync(target) ? readFileSync(target, 'utf8') : null;

  if (next === current) {
    console.log(`unchanged  ${page.to}`);
    continue;
  }
  if (CHECK) {
    stale.push(page.to);
    continue;
  }

  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, next);
  console.log(`${current === null ? 'created   ' : 'updated   '} ${page.to}`);
}

const shotDir = join(REPO, SCREENSHOTS.from);
if (existsSync(shotDir)) {
  mkdirSync(join(SITE, SCREENSHOTS.to), { recursive: true });
  for (const name of readdirSync(shotDir).filter((f) => f.endsWith('.png')).sort()) {
    const next = readFileSync(join(shotDir, name));
    const target = join(SITE, SCREENSHOTS.to, name);
    const current = existsSync(target) ? readFileSync(target) : null;

    if (current !== null && current.equals(next)) {
      console.log(`unchanged  ${SCREENSHOTS.to}/${name}`);
      continue;
    }
    if (CHECK) {
      stale.push(`${SCREENSHOTS.to}/${name}`);
      continue;
    }
    writeFileSync(target, next);
    console.log(`${current === null ? 'created   ' : 'updated   '} ${SCREENSHOTS.to}/${name}`);
  }
}

if (CHECK && stale.length > 0) {
  console.error(`\n${stale.length} file(s) out of date. Run: npm run sync`);
  for (const f of stale) console.error(`  ${f}`);
  process.exit(1);
}

console.log(CHECK ? '\nsync is up to date' : '\ndone');
