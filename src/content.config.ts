import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.object({
        label: z.string(),
        color: z.enum(['blue', 'green', 'purple', 'yellow', 'red', 'indigo']).optional().default('blue')
    })),
    featured: z.boolean().optional().default(false),
  }),
});

const projectCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        description: z.string(),
        link: z.string().url(),
        featured: z.boolean().optional().default(false),
    })
});

export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
};