export const SUBJECTS = [
  'Computer Science',
  'Digital Learning Integration',
  'Driver Education',
  'Economics & Personal Finance',
  'English',
  'Family Life Education',
  'Fine Arts',
  'Health Education',
  'History and Social Science',
  'Mathematics',
  'Physical Education',
  'Science',
  'World Language',
] as const;

export type Subject = (typeof SUBJECTS)[number];

export const SUBJECT_SLUGS: Record<Subject, string> = {
  'Computer Science': 'computer-science',
  'Digital Learning Integration': 'digital-learning-integration',
  'Driver Education': 'driver-education',
  'Economics & Personal Finance': 'economics-personal-finance',
  'English': 'english',
  'Family Life Education': 'family-life-education',
  'Fine Arts': 'fine-arts',
  'Health Education': 'health-education',
  'History and Social Science': 'history-social-science',
  'Mathematics': 'mathematics',
  'Physical Education': 'physical-education',
  'Science': 'science',
  'World Language': 'world-language',
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
