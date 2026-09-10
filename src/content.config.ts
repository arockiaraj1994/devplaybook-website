import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  // Starlight owns everything under src/content/docs.
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),

  // The blog is rendered by our own pages under src/pages/blog.
  blog: defineCollection({
    loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      author: z.string().default('Arockiaraj Rayappan'),
      draft: z.boolean().default(false),
    }),
  }),
};
