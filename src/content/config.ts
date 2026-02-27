import { z, defineCollection } from 'astro:content';
import { SUBJECTS, GRADES } from '@lib/constants';

const lessonsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subject: z.enum(SUBJECTS),
    grade: z.enum(GRADES),
    durationMinutes: z.number().default(15),
    solCodes: z.array(z.string()),
    objective: z.string(),
    materials: z.array(z.string()),
    prerequisites: z.array(z.string()),
    standardsLinks: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    ),
    tags: z.array(z.string()),
    updatedAt: z.date(),
  }),
});

export const collections = {
  lessons: lessonsCollection,
};
