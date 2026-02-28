import { describe, it, expect } from 'vitest';
import {
  generateLessonSlug,
  isValidSOLCode,
  parseSlug,
  parseFilterQuery,
  mergeWithStandards,
} from '../src/lib/utils';

describe('Lesson Utils', () => {
  describe('generateLessonSlug', () => {
    it('should generate slug from subject and grade', () => {
      expect(generateLessonSlug('Mathematics', '4', 'Adding Fractions')).toBe(
        'mathematics-4'
      );
    });

    it('should handle multi-word subjects', () => {
      expect(generateLessonSlug('Computer Science', '10', 'Binary')).toBe(
        'computer-science-10'
      );
    });

    it('should handle ampersands in subjects', () => {
      expect(generateLessonSlug('Economics & Personal Finance', '12', 'Budget')).toBe(
        'economics-and-personal-finance-12'
      );
    });

    it('should handle kindergarten grade', () => {
      expect(generateLessonSlug('Science', 'k', 'Shapes')).toBe('science-k');
    });
  });

  describe('isValidSOLCode', () => {
    it('should validate standard K format', () => {
      expect(isValidSOLCode('K.1')).toBe(true);
      expect(isValidSOLCode('K.1a')).toBe(true);
    });

    it('should validate lowercase k', () => {
      expect(isValidSOLCode('k.2')).toBe(true);
    });

    it('should validate single digit grades', () => {
      expect(isValidSOLCode('4.2')).toBe(true);
      expect(isValidSOLCode('4.2b')).toBe(true);
    });

    it('should validate two digit grades', () => {
      expect(isValidSOLCode('10.3')).toBe(true);
      expect(isValidSOLCode('12.4a')).toBe(true);
    });

    it('should validate subject-prefixed format', () => {
      expect(isValidSOLCode('MATH.4.1')).toBe(true);
      expect(isValidSOLCode('CS.12.1')).toBe(true);
      expect(isValidSOLCode('DLI.K.2')).toBe(true);
    });

    it('should reject invalid formats', () => {
      expect(isValidSOLCode('K1')).toBe(false);
      expect(isValidSOLCode('K..1')).toBe(false);
      expect(isValidSOLCode('13.1')).toBe(false);
      expect(isValidSOLCode('K.1.2')).toBe(false);
    });
  });

  describe('parseSlug', () => {
    it('should parse simple subject slug', () => {
      const result = parseSlug('mathematics-4');
      expect(result).toEqual({ subject: 'Mathematics', grade: '4' });
    });

    it('should parse multi-word subject slug', () => {
      const result = parseSlug('computer-science-10');
      expect(result).toEqual({ subject: 'Computer Science', grade: '10' });
    });

    it('should parse slug with ampersand', () => {
      const result = parseSlug('economics-and-personal-finance-12');
      expect(result).toEqual({ subject: 'Economics & Personal Finance', grade: '12' });
    });

    it('should parse kindergarten slug', () => {
      const result = parseSlug('science-k');
      expect(result).toEqual({ subject: 'Science', grade: 'k' });
    });

    it('should return null for invalid grade', () => {
      const result = parseSlug('mathematics-13');
      expect(result).toBeNull();
    });
  });

  describe('parseFilterQuery', () => {
    it('should parse subject filter', () => {
      const result = parseFilterQuery('subject:mathematics');
      expect(result.subject).toBe('mathematics');
    });

    it('should parse grade filter', () => {
      const result = parseFilterQuery('grade:4');
      expect(result.grade).toBe('4');
    });

    it('should parse keyword query', () => {
      const result = parseFilterQuery('fractions');
      expect(result.keyword).toBe('fractions');
    });

    it('should parse combined filters', () => {
      const result = parseFilterQuery('subject:science grade:6 ecosystems');
      expect(result.subject).toBe('science');
      expect(result.grade).toBe('6');
      expect(result.keyword).toBe('ecosystems');
    });

    it('should parse multiple keywords', () => {
      const result = parseFilterQuery('algebra equations');
      expect(result.keyword).toBe('algebra equations');
    });

    it('should handle empty query', () => {
      const result = parseFilterQuery('');
      expect(result).toEqual({});
    });
  });

  describe('mergeWithStandards', () => {
    it('should match lesson with standards by subject and grade', () => {
      const lesson = { subject: 'Mathematics', grade: '4', solCodes: ['MATH.4.1'] };
      const standards = [
        {
          subject: 'Mathematics',
          grade: '4',
          solCodes: ['MATH.4.1', 'MATH.4.2'],
          solDocLinks: [{ label: 'SOL', url: 'https://example.com' }],
        },
        {
          subject: 'Science',
          grade: '4',
          solCodes: ['SCI.4.1'],
          solDocLinks: [],
        },
      ];

      const result = mergeWithStandards(lesson, standards);

      expect(result.lesson).toEqual(lesson);
      expect(result.matchingStandards).toHaveLength(1);
      expect(result.matchingStandards[0].subject).toBe('Mathematics');
    });

    it('should return empty array when no standards match', () => {
      const lesson = { subject: 'Mathematics', grade: '4' };
      const standards = [
        {
          subject: 'Science',
          grade: '5',
          solCodes: [],
          solDocLinks: [],
        },
      ];

      const result = mergeWithStandards(lesson, standards);

      expect(result.matchingStandards).toHaveLength(0);
    });
  });
});
