import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const lessons = await getCollection('lessons');
  
  const searchData = lessons.map((lesson) => ({
    slug: lesson.slug,
    title: lesson.data.title,
    subject: lesson.data.subject,
    grade: lesson.data.grade,
    objective: lesson.data.objective,
    tags: lesson.data.tags,
  }));

  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
