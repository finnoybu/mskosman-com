import { z, defineCollection } from 'astro:content';
import { SUBJECTS, GRADES } from '@lib/constants';

// SOL code validation regex - accepts formats like:
// - K.1, K.1a (Kindergarten) - standard two-part format
// - 4.2, 4.2b (Grades 1-12) - standard two-part format
// - MATH.4.1, CS.K.2 (subject prefix format) - three-part format
const solCodeRegex = /^([A-Za-z]+\.)?(K|k|[0-9]{1,2})\.[0-9]+[a-z]*$/;

const lessonsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subject: z.enum(SUBJECTS),
    grade: z.enum(GRADES),
    status: z.enum(['draft', 'published']).default('draft'),
    durationMinutes: z.number().min(10).max(25).default(15),
    solCodes: z.array(z.string().regex(solCodeRegex, 'Invalid SOL code format')),
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
  }).refine(
    (data) => {
      // If published, enforce stricter rules
      if (data.status === 'published') {
        return (
          data.solCodes.length >= 1 &&
          data.objective.trim().length > 0 &&
          data.materials.length >= 1
        );
      }
      return true;
    },
    {
      message: 'Published lessons must have at least 1 SOL code, a non-empty objective, and at least 1 material',
    }
  ),
});

const standardsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    subject: z.enum(SUBJECTS),
    grade: z.enum(GRADES),
    strand: z.string().optional(),
    solCodes: z.array(z.string()).optional(),
    solDocLinks: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    ),
    instructionalResources: z.array(
      z.object({
        label: z.string(),
        url: z.string().url(),
      })
    ).optional(),
    notes: z.string().optional(),
    updatedAt: z.date(),
  }),
});

export const collections = {
  lessons: lessonsCollection,
  standards: standardsCollection,
};
