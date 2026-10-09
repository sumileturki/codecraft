export type Difficulty = "Beginner" | "Intermediate";
export type LessonLanguage = "python" | "javascript";

export interface CourseModule {
  title: string;
  lessons: { title: string; href: string }[];
}

export interface Course {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  language: "Python" | "JavaScript" | "HTML/CSS";
  difficulty: Difficulty;
  lessonCount: number;
  projectCount: number;
  estimatedHours: number;
  goals: string[];
  modules: CourseModule[];
}

export interface TestRule {
  kind:
    | "definesVariable"
    | "callsPrint"
    | "outputEquals"
    | "outputIncludes"
    | "definesFunction";
  variable?: string;
  expected?: string;
  values?: string[];
  hint: string;
}

export interface Lesson {
  slug: string;
  language: LessonLanguage;
  courseSlug: string;
  index: number;
  totalInPath: number;
  title: string;
  seoTitle: string;
  description: string;
  objectives: string[];
  steps: { title: string; body: string }[];
  starterCode: string;
  solutionHint: string;
  expectedOutput: string;
  tests: TestRule[];
  hints: string[];
  relatedLessons: { title: string; href: string }[];
  relatedProjects: { title: string; href: string }[];
  estimatedMinutes: number;
}

export type ProjectDifficulty = "Guided" | "Semi-Guided" | "Unguided";

export interface ProjectMilestone {
  title: string;
  description: string;
  hint: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  difficulty: ProjectDifficulty;
  estimatedHours: number;
  skills: string[];
  lessons: { title: string; href: string }[];
  overview: string[];
  starterCode: string;
  milestones: ProjectMilestone[];
  finalChallenge: string;
}

export interface CommunityThread {
  slug: string;
  title: string;
  category: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  excerpt: string;
  solved: boolean;
}

export type BlogBlock =
  | { type: "intro"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string; id: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "code"; language: string; code: string }
  | { type: "quote"; text: string };

export interface Faq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  tags: string[];
  blocks: BlogBlock[];
  faqs: Faq[];
  related: { title: string; href: string }[];
}

export interface UserProgress {
  completedLessons: string[];
  projectMilestones: Record<string, number[]>;
  currentCourse: string | null;
  streakDays: number;
  lastVisit: string | null;
  attempts: Record<string, number>;
  visitHistory: string[];
}

export interface ExecutionResult {
  ok: boolean;
  output: string;
  error: string | null;
  errorLine: number | null;
  engine: "pyodide" | "builtin";
  timedOut: boolean;
  executionMs: number;
}

export interface TraceStep {
  step: number;
  line: number;
  label: string;
  variables: Record<string, string>;
  output: string;
}
