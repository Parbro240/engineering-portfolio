import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/projects' }),
  schema: z.object({
    title: z.string(), subtitle: z.string(), date: z.string(), role: z.string(), type: z.string(),
    tools: z.array(z.string()), categories: z.array(z.string()), featured: z.boolean().default(false),
    order: z.number(), draft: z.boolean().default(false), status: z.string(),
    confidential: z.boolean().default(false), metric: z.boolean().default(false),
    coverImage: z.string().default(''), coverAlt: z.string().default(''), coverPlaceholder: z.string().default('Project image to be added'),
    gallery: z.array(z.object({ src: z.string().optional(), alt: z.string().optional(), caption: z.string(), placeholder: z.string().optional() })).default([]),
  }).superRefine((data, ctx) => {
    if(data.coverImage && !data.coverAlt.trim()) ctx.addIssue({code: 'custom', message: 'A cover image needs descriptive coverAlt text.'});
    for(const item of data.gallery) {
      if(item.src && !item.alt?.trim()) ctx.addIssue({code: 'custom', message: 'Every gallery image needs descriptive alt text.'});
      if(!item.src && !item.placeholder) ctx.addIssue({code: 'custom', message: 'A gallery item needs src or a placeholder label.'});
    }
  }),
});
export const collections = { projects };
