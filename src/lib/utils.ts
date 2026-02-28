/**
 * Utility functions for lesson and content handling
 */

/**
 * Generate a slug from lesson title and subject/grade
 * Used for consistent URL generation
 */
export function generateLessonSlug(subject: string, grade: string, title: string): string {
  // Convert subject: "Computer Science" → "computer-science"
  const subjectSlug = subject
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/&/g, 'and');

  // Combine subject-grade-keyword
  // e.g., "computer-science-12"
  return `${subjectSlug}-${grade}`;
}

/**
 * Validate SOL code format
 * Accepts: K.1, K.1a, 4.2, 4.2b, MATH.4.1, CS.K.2, DLI.K.2, etc.
 * Rejects: grades > 12 (except K), invalid formats, extra dots
 */
export function isValidSOLCode(code: string): boolean {
  // Check for invalid character patterns first
  if (code.includes('..')) {
    return false; // Double dots
  }

  // Count dots - should have 1 or 2 depending on format
  const dotCount = (code.match(/\./g) || []).length;
  if (dotCount !== 1 && dotCount !== 2) {
    return false;
  }

  // Basic format check
  const solCodeRegex = /^([A-Z]+\.)?(K|k|[0-9]{1,2})\.[0-9]+[a-z]*$/;
  if (!solCodeRegex.test(code)) {
    return false;
  }

  // Extract the grade part
  const gradeMatch = code.match(/^([A-Z]+\.)?(K|k|[0-9]{1,2})\./);
  if (!gradeMatch) {
    return false;
  }

  const gradePart = gradeMatch[2];
  
  // Grade must be K/k or 0-12
  if (gradePart !== 'K' && gradePart !== 'k') {
    const gradeNum = parseInt(gradePart, 10);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 12) {
      return false;
    }
  }

  // If 2 dots, must have a multi-letter subject prefix (2+ uppercase letters)
  // This rejects patterns like K.1.2 where K is a grade, not a subject prefix
  if (dotCount === 2) {
    const parts = code.split('.');
    // Prefix must be 2+ uppercase letters (MATH, CS, DLI, etc.)
    if (!/^[A-Z]{2,}$/.test(parts[0])) {
      return false;
    }
  }
  
  // If 1 dot and starts with letters, it's invalid (should have subject prefix with 2 dots)
  // Exception: K.x and k.x are valid (grade K without subject prefix)
  if (dotCount === 1 && /^[A-Z]/.test(code) && !/^(K|k)\./.test(code)) {
    // Starts with uppercase letter that's not K - invalid
    return false;
  }

  return true;
}

/**
 * Extract subject and grade from lesson slug
 * e.g., "computer-science-12" → { subject: "Computer Science", grade: "12" }
 */
export function parseSlug(slug: string): { subject: string; grade: string } | null {
  // Last part is the grade
  const parts = slug.split('-');
  const grade = parts[parts.length - 1];

  // Everything except the last part is the subject
  const subjectParts = parts.slice(0, -1);
  const subject = subjectParts
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
    .replace(/And/g, '&');

  // Validate grade is valid (k, 0-12)
  if (grade === 'k' || grade === 'K') {
    return { subject, grade };
  }

  const gradeNum = parseInt(grade, 10);
  if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 12) {
    return null;
  }

  return { subject, grade };
}

/**
 * Parse filter query string
 * e.g., "subject:mathematics grade:4" or "physics 10"
 * Returns object with parsed filters
 */
export function parseFilterQuery(query: string): {
  subject?: string;
  grade?: string;
  keyword?: string;
} {
  const filters: { subject?: string; grade?: string; keyword?: string } = {};

  if (!query.trim()) {
    return filters;
  }

  // Split by spaces
  const terms = query.toLowerCase().split(/\s+/);

  for (const term of terms) {
    if (term.startsWith('subject:')) {
      filters.subject = term.replace('subject:', '');
    } else if (term.startsWith('grade:')) {
      filters.grade = term.replace('grade:', '');
    } else if (!term.startsWith('-')) {
      // Treat as keyword search
      filters.keyword = (filters.keyword ? filters.keyword + ' ' : '') + term;
    }
  }

  return filters;
}

/**
 * Merge lesson data with matching standards
 * Combines lesson frontmatter with standards collection metadata
 */
export function mergeWithStandards(
  lesson: {
    subject: string;
    grade: string;
    solCodes?: string[];
  },
  standards: Array<{
    subject: string;
    grade: string;
    solCodes?: string[];
    solDocLinks?: Array<{ label: string; url: string }>;
  }>
): {
  lesson: typeof lesson;
  matchingStandards: typeof standards;
} {
  const matchingStandards = standards.filter(
    (s) => s.subject === lesson.subject && s.grade === lesson.grade
  );

  return {
    lesson,
    matchingStandards,
  };
}
