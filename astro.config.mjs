import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const REPO = 'https://github.com/arockiaraj1994/dev-agent-playbook';
const SITE_REPO = 'https://github.com/arockiaraj1994/devplaybook-website';

// Loaded once here and once in BaseLayout, so the landing page and the docs
// share one type stack.
const fontHead = [
  {
    tag: 'link',
    attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  },
  {
    tag: 'link',
    attrs: {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: true,
    },
  },
  {
    tag: 'link',
    attrs: {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap',
    },
  },
];

export default defineConfig({
  // Apex domain on GitHub Pages: set `site`, never `base`.
  site: 'https://devplaybook.co.in',

  integrations: [
    starlight({
      title: 'dev-playbook',
      description:
        "Your team's coding standards, served to coding agents over MCP - and bootstrapped by them.",
      favicon: '/favicon.svg',
      customCss: ['./src/styles/custom.css'],
      head: fontHead,
      social: [{ label: 'GitHub', icon: 'github', href: REPO }],
      editLink: { baseUrl: `${SITE_REPO}/edit/main/` },
      expressiveCode: {
        themes: ['github-light', 'github-dark'],
      },
      // The landing page lives at `/`, so Starlight's home link points at it.
      logo: { src: './src/assets/logo.svg', replacesTitle: false },
      sidebar: [
        { label: 'Overview', slug: 'docs' },
        { label: 'Getting started', items: [{ autogenerate: { directory: 'docs/start' } }] },
        { label: 'The tools', items: [{ autogenerate: { directory: 'docs/tools' } }] },
        { label: 'Concepts', items: [{ autogenerate: { directory: 'docs/concepts' } }] },
        { label: 'Claude Code plugin', items: [{ autogenerate: { directory: 'docs/plugin' } }] },
        { label: 'Template packs', items: [{ autogenerate: { directory: 'docs/templates' } }] },
        { label: 'Self-hosting', items: [{ autogenerate: { directory: 'docs/self-host' } }] },
        { label: 'Contributing', items: [{ autogenerate: { directory: 'docs/contribute' } }] },
        { label: 'Changelog', slug: 'changelog' },
      ],
    }),
  ],
});
