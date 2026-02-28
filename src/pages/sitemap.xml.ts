import { getCollection } from 'astro:content';
import { SUBJECTS, SUBJECT_SLUGS, GRADES } from '@lib/constants';

const BASE_URL = 'https://mskosman.com';

export async function GET() {
  const lessons = await getCollection('lessons');

  const urls = [
    {
      url: BASE_URL,
      changefreq: 'weekly',
      priority: '1.0',
    },
    {
      url: `${BASE_URL}/subjects`,
      changefreq: 'weekly',
      priority: '0.8',
    },
    {
      url: `${BASE_URL}/grades`,
      changefreq: 'weekly',
      priority: '0.8',
    },
  ];

  // Add subject pages
  SUBJECTS.forEach((subject) => {
    urls.push({
      url: `${BASE_URL}/subjects/${SUBJECT_SLUGS[subject]}`,
      changefreq: 'weekly',
      priority: '0.7',
    });
  });

  // Add grade pages
  GRADES.forEach((grade) => {
    urls.push({
      url: `${BASE_URL}/grades/${grade}`,
      changefreq: 'weekly',
      priority: '0.7',
    });
  });

  // Add lesson pages
  lessons.forEach((lesson) => {
    urls.push({
      url: `${BASE_URL}/lessons/${lesson.slug}`,
      changefreq: 'monthly',
      priority: '0.6',
    });
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${item.url}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
