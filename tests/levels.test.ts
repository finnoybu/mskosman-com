import { describe, it, expect } from 'vitest';
import { COURSES, GRADES } from '../src/lib/constants';
import {
  courseLevel,
  gradeLevel,
  lessonCountLabel,
  lessonLevel,
  lessonsAt,
  levelPath,
  sortLessons,
  subjectLevels,
} from '../src/lib/levels';

describe('levels', () => {
  it('describes a grade', () => {
    expect(gradeLevel('k')).toMatchObject({ kind: 'grade', slug: 'k', label: 'Kindergarten' });
    expect(gradeLevel('4')).toMatchObject({ kind: 'grade', slug: '4', label: '4th Grade' });
  });

  it('describes a course', () => {
    expect(courseLevel('computer-science-foundations')).toMatchObject({
      kind: 'course',
      slug: 'computer-science-foundations',
      label: 'Computer Science Foundations',
    });
  });

  it('gives every course a slug that cannot be mistaken for a grade', () => {
    const gradeSlugs: readonly string[] = GRADES;
    for (const course of COURSES) {
      expect(gradeSlugs).not.toContain(course.slug);
      expect(course.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
    expect(new Set(COURSES.map((c) => c.slug)).size).toBe(COURSES.length);
  });

  it('reads the level from a lesson', () => {
    expect(lessonLevel({ grade: '3' }).slug).toBe('3');
    expect(lessonLevel({ course: 'computer-science-principles' }).kind).toBe('course');
    expect(() => lessonLevel({})).toThrow();
  });

  it('lists grades first, then the courses of that subject only', () => {
    const cs = subjectLevels('Computer Science');
    expect(cs.slice(0, 13).map((l) => l.slug)).toEqual([...GRADES]);
    expect(cs.slice(13).map((l) => l.slug)).toEqual([
      'middle-school-computer-science-elective',
      'computer-science-foundations',
      'computer-science-principles',
      'computer-science-programming',
    ]);
    expect(subjectLevels('English')).toHaveLength(13);
  });

  it('builds the subject and level address', () => {
    expect(levelPath('Computer Science', gradeLevel('k'))).toBe('/subjects/computer-science/k');
    expect(levelPath('Computer Science', courseLevel('computer-science-programming'))).toBe(
      '/subjects/computer-science/computer-science-programming'
    );
  });

  it('sorts lessons in teaching order, including past lesson 9', () => {
    const slugs = ['cs-3-10-b', 'cs-3-02-a', 'cs-3-01-z', 'cs-3-09-c'].map((slug) => ({ slug }));
    expect(sortLessons(slugs).map((l) => l.slug)).toEqual(['cs-3-01-z', 'cs-3-02-a', 'cs-3-09-c', 'cs-3-10-b']);
  });

  it('picks the lessons of one subject and level', () => {
    const lessons = [
      { slug: 'b', data: { subject: 'Computer Science', grade: '3' as const } },
      { slug: 'a', data: { subject: 'Computer Science', grade: '3' as const } },
      { slug: 'c', data: { subject: 'Computer Science', grade: '4' as const } },
      { slug: 'd', data: { subject: 'Mathematics', grade: '3' as const } },
      { slug: 'e', data: { subject: 'Computer Science', course: 'computer-science-foundations' as const } },
    ];
    expect(lessonsAt(lessons, 'Computer Science', gradeLevel('3')).map((l) => l.slug)).toEqual(['a', 'b']);
    expect(
      lessonsAt(lessons, 'Computer Science', courseLevel('computer-science-foundations')).map((l) => l.slug)
    ).toEqual(['e']);
  });

  it('counts lessons in words', () => {
    expect(lessonCountLabel(1)).toBe('1 lesson');
    expect(lessonCountLabel(0)).toBe('0 lessons');
    expect(lessonCountLabel(21)).toBe('21 lessons');
  });
});
