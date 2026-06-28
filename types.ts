export interface SocialLink {
  id: string;
  platform: 'github' | 'linkedin' | 'twitter' | 'mail' | 'globe' | 'instagram';
  url: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveChallenge {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  expectedOutput: string;
  hint: string;
}

export interface SyllabusTopic {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  summary: string;
  keyTakeaways: string[];
}

export interface CheatSheetNode {
  id: string;
  title: string;
  codeBlock: string;
  explanation: string;
  category: string;
}

export interface LearningData {
  appName: string;
  tagline: string;
  heroText: string;
  aboutText: string;
  email: string;
  discordUrl?: string;
  location: string;
  profileImageUrl?: string;
  mentorName: string;
  mentorTitle: string;
  socialLinks: SocialLink[];
  syllabus: SyllabusTopic[];
  challenges: InteractiveChallenge[];
  cheatsheets: CheatSheetNode[];
  quizzes: QuizQuestion[];
  footerText: string;
  themeId: string;
  fontId: string;
  visibleSections: {
    syllabus: boolean;
    challenges: boolean;
    cheatsheets: boolean;
    quizzes: boolean;
    about: boolean;
  };
}

export interface PortfolioTheme {
  id: string;
  name: string;
  bg: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  accentText: string;
  border: string;
  isDark: boolean;
}

export interface FontConfig {
  id: string;
  name: string;
  headingClass: string;
  bodyClass: string;
  monoClass: string;
}
