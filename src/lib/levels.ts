/**
 * A "level" is where a lesson sits inside its subject: a grade (K-12) or a
 * named course. Browsing goes Subject, then level, then lessons.
 */
import {
  COURSES,
  GRADES,
  GRADE_HUES,
  GRADE_LABELS,
  SUBJECT_SLUGS,
  courseHue,
  type Course,
  type Grade,
  type Subject,
} from './constants';

export interface Level {
  kind: 'grade' | 'course';
  /** URL segment: "k", "4", "computer-science-foundations" */
  slug: string;
  label: string;
  hue: number;
}

export function gradeLevel(grade: Grade): Level {
  return { kind: 'grade', slug: grade, label: GRADE_LABELS[grade], hue: GRADE_HUES[grade] };
}

export function courseLevel(slug: Course): Level {
  const course = COURSES.find((c) => c.slug === slug)!;
  return { kind: 'course', slug, label: course.label, hue: courseHue(slug) };
}

/** The level of a lesson. The schema guarantees exactly one of grade or course. */
export function lessonLevel(data: { grade?: Grade; course?: Course }): Level {
  if (data.course !== undefined) return courseLevel(data.course);
  if (data.grade !== undefined) return gradeLevel(data.grade);
  throw new Error('Lesson has neither a grade nor a course');
}

/** Every level a subject can have: grades in order, then its courses. */
export function subjectLevels(subject: Subject): Level[] {
  return [
    ...GRADES.map(gradeLevel),
    ...COURSES.filter((course) => course.subject === subject).map((course) => courseLevel(course.slug)),
  ];
}

export function levelPath(subject: Subject, level: Level): string {
  return `/subjects/${SUBJECT_SLUGS[subject]}/${level.slug}`;
}

/**
 * Teaching order within one subject and level. Lesson files are numbered
 * (computer-science-3-01-..., -02-...), so slug order is teaching order.
 */
export function sortLessons<T extends { slug: string }>(lessons: T[]): T[] {
  return [...lessons].sort((a, b) => a.slug.localeCompare(b.slug, 'en', { numeric: true }));
}

/** Lessons of one subject and level, in teaching order. */
export function lessonsAt<T extends { slug: string; data: { subject: string; grade?: Grade; course?: Course } }>(
  lessons: T[],
  subject: Subject,
  level: Level
): T[] {
  return sortLessons(
    lessons.filter((lesson) => lesson.data.subject === subject && lessonLevel(lesson.data).slug === level.slug)
  );
}

export function lessonCountLabel(count: number): string {
  return `${count} lesson${count === 1 ? '' : 's'}`;
}
