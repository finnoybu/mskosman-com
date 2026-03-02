/**
 * Deterministic hue stagger permutation
 * Maps item position to token index to avoid clustering
 */
const STAGGER = [0, 8, 1, 9, 2, 10, 3, 11, 4, 12, 5, 13, 6, 14, 7, 15] as const;

/**
 * Locked SOL hues in order (H0, H18, H32, H45, H62, H85, H110, H145, H165, H190, H210, H225, H245, H265, H290, H325)
 */
const HUES = [0, 18, 32, 45, 62, 85, 110, 145, 165, 190, 210, 225, 245, 265, 290, 325] as const;

export const SUBJECTS = [
  'Adult Education',
  'Family Life Education',
  'Career and Technical (CTE)',
  'Fine Arts',
  'Computer Science',
  'Health Education',
  'Digital Learning Integration',
  'History and Social Science',
  'Driver Education',
  'Mathematics',
  'Economics & Personal Finance',
  'Physical Education',
  'English',
  'Science',
  'English as a Second Language',
  'World Language',
] as const;

export type Subject = (typeof SUBJECTS)[number];

export const SUBJECT_SLUGS: Record<Subject, string> = {
  'Adult Education': 'adult-education',
  'Career and Technical (CTE)': 'career-technical-education',
  'Computer Science': 'computer-science',
  'Digital Learning Integration': 'digital-learning-integration',
  'Driver Education': 'driver-education',
  'Economics & Personal Finance': 'economics-personal-finance',
  'English': 'english',
  'English as a Second Language': 'english-second-language',
  'Family Life Education': 'family-life-education',
  'Fine Arts': 'fine-arts',
  'Health Education': 'health-education',
  'History and Social Science': 'history-social-science',
  'Mathematics': 'mathematics',
  'Physical Education': 'physical-education',
  'Science': 'science',
  'World Language': 'world-language',
};

/**
 * SOL Subject to Hue Mapping (Deterministic Stagger)
 * Each subject is assigned a hue using STAGGER[index] to map to HUES array
 * This ensures even distribution and avoids color clustering
 */
export const SUBJECT_HUES: Record<Subject, number> = {
  'Adult Education': HUES[STAGGER[0]],
  'Family Life Education': HUES[STAGGER[1]],
  'Career and Technical (CTE)': HUES[STAGGER[2]],
  'Fine Arts': HUES[STAGGER[3]],
  'Computer Science': HUES[STAGGER[4]],
  'Health Education': HUES[STAGGER[5]],
  'Digital Learning Integration': HUES[STAGGER[6]],
  'History and Social Science': HUES[STAGGER[7]],
  'Driver Education': HUES[STAGGER[8]],
  'Mathematics': HUES[STAGGER[9]],
  'Economics & Personal Finance': HUES[STAGGER[10]],
  'Physical Education': HUES[STAGGER[11]],
  'English': HUES[STAGGER[12]],
  'Science': HUES[STAGGER[13]],
  'English as a Second Language': HUES[STAGGER[14]],
  'World Language': HUES[STAGGER[15]],
};

export const GRADES = ['k', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const;

export type Grade = (typeof GRADES)[number];

export const GRADE_LABELS: Record<Grade, string> = {
  'k': 'Kindergarten',
  '1': '1st Grade',
  '2': '2nd Grade',
  '3': '3rd Grade',
  '4': '4th Grade',
  '5': '5th Grade',
  '6': '6th Grade',
  '7': '7th Grade',
  '8': '8th Grade',
  '9': '9th Grade',
  '10': '10th Grade',
  '11': '11th Grade',
  '12': '12th Grade',
};

/**
 * SOL Grade to Hue Mapping (Deterministic Stagger)
 * Each grade is assigned a hue using STAGGER[index] to map to HUES array
 * Uses outline style (border) instead of solid background
 */
export const GRADE_HUES: Record<Grade, number> = {
  'k': HUES[STAGGER[0]],
  '1': HUES[STAGGER[1]],
  '2': HUES[STAGGER[2]],
  '3': HUES[STAGGER[3]],
  '4': HUES[STAGGER[4]],
  '5': HUES[STAGGER[5]],
  '6': HUES[STAGGER[6]],
  '7': HUES[STAGGER[7]],
  '8': HUES[STAGGER[8]],
  '9': HUES[STAGGER[9]],
  '10': HUES[STAGGER[10]],
  '11': HUES[STAGGER[11]],
  '12': HUES[STAGGER[12]],
};
