import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content', // 'content' for markdown, 'data' for json/yaml
  schema: z.object({
    title: z.string(),
    description: z.string(), // Used as excerpt
    pubDate: z.coerce.date(), // Coerces string to Date
    tags: z.array(z.object({
        label: z.string(),
        color: z.enum(['blue', 'green', 'purple', 'yellow', 'red', 'indigo']).optional().default('blue')
    })),
    featured: z.boolean().optional().default(false),
  }),
});

// Example for projects (could be content or data)
const projectCollection = defineCollection({
    type: 'content', // Example using data (e.g., src/content/projects/my-project.json)
    schema: z.object({
        name: z.string(),
        description: z.string(),
        link: z.string().url(),
        featured: z.boolean().optional().default(false),
        // Add tags, image, etc. if needed
    })
});


export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
};
