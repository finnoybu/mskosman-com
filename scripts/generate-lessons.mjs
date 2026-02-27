import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUBJECTS = [
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
];

const GRADES = ['k', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const GRADE_LABELS = {
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

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateLesson(subject, grade) {
  const gradeLabel = GRADE_LABELS[grade];
  const slug = `${slugify(subject)}-${grade}`;
  
  // Generate sample SOL codes
  const subjectCode = {
    'Computer Science': 'CS',
    'Digital Learning Integration': 'DLI',
    'Driver Education': 'DE',
    'Economics & Personal Finance': 'EPF',
    'English': 'ENG',
    'Family Life Education': 'FLE',
    'Fine Arts': 'FA',
    'Health Education': 'HE',
    'History and Social Science': 'HSS',
    'Mathematics': 'MATH',
    'Physical Education': 'PE',
    'Science': 'SCI',
    'World Language': 'WL',
  }[subject];

  const solCodes = [`${subjectCode}.${grade === 'k' ? 'K' : grade}.1`, `${subjectCode}.${grade === 'k' ? 'K' : grade}.2`];

  const content = `---
title: "${subject} Fundamentals for ${gradeLabel}"
subject: "${subject}"
grade: "${grade}"
durationMinutes: 15
solCodes: ${JSON.stringify(solCodes)}
objective: "Students will demonstrate understanding of foundational ${subject.toLowerCase()} concepts appropriate for ${gradeLabel}."
materials:
  - "Worksheet or notebook"
  - "Pencil or pen"
  - "Optional: computer or tablet for digital activities"
prerequisites:
  - "Basic literacy skills appropriate to grade level"
standardsLinks:
  - label: "Virginia SOL ${subjectCode}"
    url: "https://doe.virginia.gov/"
tags:
  - "fundamentals"
  - "introduction"
  - "${slugify(subject)}"
updatedAt: ${new Date().toISOString()}
---

## Warm-up (3 minutes)

Begin with a brief discussion to activate prior knowledge:
- Ask students what they already know about ${subject.toLowerCase()}
- Share one interesting fact or question related to today's topic
- Preview the lesson objective

## Direct Instruction (5 minutes)

Introduce the core concept for this lesson:

**Key Concept**: Foundational principles of ${subject} at the ${gradeLabel} level.

- Explain the main idea clearly and concisely
- Use grade-appropriate language and examples
- Connect to real-world applications
- Model the thinking process or procedure

## Guided Practice (4 minutes)

Work through examples together:

1. Present a sample problem or scenario
2. Think aloud while solving or analyzing
3. Invite student participation and questions
4. Check for understanding with quick verbal checks

**Example Activity**: A hands-on task that reinforces the concept taught in direct instruction.

## Independent Practice / Quick Check (3 minutes)

Students complete a brief assessment:

- 2-3 quick problems or questions
- Can be verbal, written, or digital
- Provides immediate feedback on understanding
- Identifies students who may need additional support

**Assessment Questions**:
1. What is the main concept we learned today?
2. Apply the concept to solve a simple problem
3. Explain your thinking

## Differentiation

**For Students Needing Support**:
- Provide additional visual aids or manipulatives
- Break tasks into smaller steps
- Offer sentence frames or templates
- Use peer partnerships

**For Advanced Students**:
- Extend the complexity of problems
- Encourage them to explain concepts to others
- Provide challenge questions that require deeper thinking
- Connect to more advanced topics

## Extensions

For students who finish early or want to explore further:
- Additional practice problems with increasing difficulty
- Research project related to the topic
- Creative application (art, writing, presentation)
- Connection to other subjects or real-world scenarios

## Notes for Parent/Instructor

**Preparation**:
- Review the Virginia SOL standards for ${subject} at the ${gradeLabel} level
- Gather necessary materials before the lesson
- Prepare any worksheets or digital resources

**Teaching Tips**:
- Keep the pace brisk to maintain engagement
- Watch for signs of confusion and adjust as needed
- Celebrate small successes to build confidence
- Follow up with additional practice if the concept is challenging

**What to Watch For**:
- Student engagement during warm-up and instruction
- Ability to complete guided practice successfully
- Accuracy on independent practice/quick check
- Questions that indicate misunderstandings

**Follow-up**:
- Review missed concepts in the next session
- Connect to upcoming lessons in the sequence
- Consider additional resources for struggling students
`;

  return { slug, content };
}

// Create lessons directory if it doesn't exist
const lessonsDir = path.join(__dirname, '..', 'src', 'content', 'lessons');
if (!fs.existsSync(lessonsDir)) {
  fs.mkdirSync(lessonsDir, { recursive: true });
}

// Generate all lessons
let count = 0;
for (const subject of SUBJECTS) {
  for (const grade of GRADES) {
    const { slug, content } = generateLesson(subject, grade);
    const filename = `${slug}.mdx`;
    const filepath = path.join(lessonsDir, filename);
    
    fs.writeFileSync(filepath, content);
    count++;
    console.log(`Created: ${filename}`);
  }
}

console.log(`\n✅ Generated ${count} placeholder lessons!`);
