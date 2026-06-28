import { PortfolioTheme, FontConfig, LearningData } from './types';

export const THEMES: PortfolioTheme[] = [
  {
    id: 'nana-mint',
    name: 'NANA Mint (Light Theme)',
    bg: 'bg-stone-50/60',
    cardBg: 'bg-white shadow-sm border border-emerald-200/50 hover:shadow-md transition-shadow duration-300',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-600',
    accent: 'bg-emerald-600 text-white font-medium',
    accentHover: 'hover:bg-emerald-700',
    accentText: 'text-emerald-700 font-semibold',
    border: 'border-emerald-100',
    isDark: false,
  },
  {
    id: 'emerald-dark',
    name: 'NANA Emerald (Dark Theme)',
    bg: 'bg-[#0f1b1a]',
    cardBg: 'bg-[#152725]/60 backdrop-blur-md border border-[#1f3735]',
    textPrimary: 'text-[#eef4f3]',
    textSecondary: 'text-[#9cb5b2]',
    accent: 'bg-[#a3e635] text-[#0f1b1a] font-semibold',
    accentHover: 'hover:bg-[#bef264]',
    accentText: 'text-[#bef264]',
    border: 'border-[#1f3735]/80',
    isDark: true,
  },
  {
    id: 'cosmic-dark',
    name: 'Space Tech (Dark Theme)',
    bg: 'bg-slate-950',
    cardBg: 'bg-slate-900/60 border border-slate-800/80',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    accent: 'bg-indigo-500 text-white',
    accentHover: 'hover:bg-indigo-600',
    accentText: 'text-indigo-400',
    border: 'border-slate-800/60',
    isDark: true,
  },
  {
    id: 'warm-minimalist',
    name: 'Warm Editorial (Light Theme)',
    bg: 'bg-[#faf8f5]',
    cardBg: 'bg-white border border-stone-200/60 shadow-xs',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-600',
    accent: 'bg-amber-800 text-white',
    accentHover: 'hover:bg-amber-950',
    accentText: 'text-amber-800',
    border: 'border-stone-200/50',
    isDark: false,
  },
  {
    id: 'cyberpunk',
    name: 'Neo Terminal (Dark Theme)',
    bg: 'bg-[#050505]',
    cardBg: 'bg-[#0e0e0e] border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.05)]',
    textPrimary: 'text-green-400',
    textSecondary: 'text-green-600/90',
    accent: 'bg-green-500 text-black font-semibold',
    accentHover: 'hover:bg-green-400',
    accentText: 'text-green-400',
    border: 'border-green-500/30',
    isDark: true,
  },
];

export const FONTS: FontConfig[] = [
  {
    id: 'modern',
    name: 'Poppins + Open Sans (Heading + Body)',
    headingClass: 'font-heading tracking-tight',
    bodyClass: 'font-sans',
    monoClass: 'font-mono',
  },
  {
    id: 'display',
    name: 'Space Grotesk (Tech Metric)',
    headingClass: 'font-display tracking-tight font-semibold',
    bodyClass: 'font-sans',
    monoClass: 'font-mono',
  },
  {
    id: 'monospace',
    name: 'Geist Mono (Developer Sandbox)',
    headingClass: 'font-mono tracking-normal font-bold',
    bodyClass: 'font-mono text-sm leading-relaxed',
    monoClass: 'font-mono',
  },
];

export const PRESETS: Record<string, LearningData> = {
  webdev: {
    appName: 'NANA Learning',
    tagline: 'Modern Web Engineering & Tailwind CSS v4 Masterclass',
    heroText: 'Become a highly capable frontend engineer. Master semantic HTML, standard-compliant JavaScript, React 19 concurrent features, and compile-time utility design with Tailwind v4.',
    aboutText: 'This track is designed to transition developers from utility classes to design systems specialists. We focus on modern layouts, fluid aspect-ratio boxes, fluid typography pairings, and avoiding high-frequency redraws in React 19 hook lifecycles. Guided by lead mentor Nana and our design engineering board.',
    email: 'nana@nana-learning.edu',
    discordUrl: 'https://discord.gg/nana-learning',
    location: 'San Francisco & London (Hybrid Workspace)',
    profileImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=256&auto=format&fit=crop',
    mentorName: 'Nana Thorne',
    mentorTitle: 'Principal Design Engineer & Co-Founder',
    socialLinks: [
      { id: '1', platform: 'github', url: 'https://github.com/nana-learning' },
      { id: '2', platform: 'twitter', url: 'https://twitter.com/nanalearning' },
      { id: '3', platform: 'globe', url: 'https://nana-learning.edu' },
    ],
    syllabus: [
      {
        id: 's1',
        title: 'Declaring Custom OKLCH Themes in Tailwind v4',
        difficulty: 'Beginner',
        duration: '1.5 Hours',
        summary: 'Transition away from hex color palettes and master uniform luminance OKLCH definitions inside the inline @theme block natively in Tailwind CSS v4.',
        keyTakeaways: [
          'Understand uniform luminance across different hue values',
          'Map semantic keys like --primary and --border efficiently',
          'Configure light/dark scheme media query variables natively'
        ]
      },
      {
        id: 's2',
        title: 'React 19 Server Components & Hooks Optimization',
        difficulty: 'Advanced',
        duration: '3.5 Hours',
        summary: 'Deep dive into concurrent rendering, state stabilization outside component loops, and avoiding recursive infinite re-renders inside high-frequency useEffect systems.',
        keyTakeaways: [
          'Master stable primitives inside Hook dependency matrices',
          'Deploy transitions and useOptimistic smoothly',
          'Avoid client-side visual layout flickers during initial mount'
        ]
      }
    ],
    challenges: [
      {
        id: 'c1',
        title: 'Dynamic OKLCH Border Declaration',
        description: 'Complete the Tailwind CSS v4 theme variables to declare a custom hover border color using a 70% luminance mint-teal.',
        initialCode: `// Tailwind v4 CSS Theme config\n@theme {\n  --color-primary: oklch(0.83 0.08 184);\n  /* Complete code below to set dynamic active border */\n  --color-border-hover: \n}`,
        solution: 'oklch(0.70 0.10 184)',
        expectedOutput: 'oklch(0.70 0.10 184)',
        hint: 'NANA Mint hue angle is 184, use a 0.70 lightness and 0.10 chroma.'
      },
      {
        id: 'c2',
        title: 'Optimized react-markdown Wrapper',
        description: 'Correct the syntax for wrapping markdown text into a stable container without passing className directly to react-markdown.',
        initialCode: `// INCORRECT:\n<Markdown className="markdown-body">{markdown}</Markdown>\n\n// CORRECT:\n<div className="markdown-body">\n  <Markdown>\n    {/* Complete render block */}\n  </Markdown>\n</div>`,
        solution: '{markdown}',
        expectedOutput: '{markdown}',
        hint: 'Simply render the raw markdown variable inside the Markdown tags as a JSX expression.'
      }
    ],
    cheatsheets: [
      {
        id: 'ch1',
        title: 'Tailwind v4 Cheat Sheet & Theme Directive',
        codeBlock: `@import "tailwindcss";\n\n@theme {\n  --font-sans: "Open Sans", sans-serif;\n  --color-nana-teal: oklch(0.83 0.08 184);\n  --color-nana-dark: oklch(0.15 0.02 184);\n  --radius-xl: 1.25rem;\n}`,
        explanation: 'Tailwind v4 utilizes post-CSS level theme specifications. Native variables are injected as standard CSS variables which you can read directly in your inline style sheets or use via utility classes instantly.',
        category: 'Tailwind v4'
      },
      {
        id: 'ch2',
        title: 'React 19 Safe Hook Dependencies',
        codeBlock: `// Avoid reference-type arrays in useEffect\nuseEffect(() => {\n  console.log("Mounted with primitive:", userEmail);\n}, [userEmail]); // Always use string or primitive`,
        explanation: 'Passing arrays or objects directly into dependency arrays triggers referential check failures on every rendering pass, causing browser crashes and visual lag.',
        category: 'React 19'
      }
    ],
    quizzes: [
      {
        id: 'q1',
        question: 'Which CSS directive is the correct way to import Tailwind CSS in version 4?',
        options: [
          '@import "tailwindcss";',
          '@tailwind base; @tailwind components;',
          '#import <tailwindcss>;',
          'link(href="tailwind.css");'
        ],
        correctIndex: 0,
        explanation: 'Tailwind v4 replaces legacy multi-line utility directives with a single, standard CSS @import statement.'
      },
      {
        id: 'q2',
        question: 'What is the primary visual security constraint on storing sensitive API keys in React code?',
        options: [
          'They should be prefixed with VITE_ and published directly',
          'They must remain server-side and proxy requests via /api/*',
          'They should be stored in public metadata.json',
          'They are encrypted automatically by the browser'
        ],
        correctIndex: 1,
        explanation: 'To avoid severe security leaks, all sensitive API keys (including Gemini and Stripe keys) must reside safely behind backend server gateways.'
      }
    ],
    footerText: '© NANA Learning. Empowering developers with standard-compliant design systems.',
    themeId: 'nana-mint',
    fontId: 'modern',
    visibleSections: {
      syllabus: true,
      challenges: true,
      cheatsheets: true,
      quizzes: true,
      about: true,
    }
  },
  aieng: {
    appName: 'NANA Learning',
    tagline: 'AI Systems Engineering & Gemini SDK Masterclass',
    heroText: 'Bridge the gap between raw generative models and pristine application wrappers. Build server-authoritative API routing pathways, structure system prompt instructions, and handle Live API streaming streams seamlessly.',
    aboutText: 'This track trains full-stack engineers to harness Google GenAI APIs safely. We focus on modern best practices: avoiding client-exposed API keys, lazy initialization to prevent server-side cold crashes, system instructions integration, and parsing markdown payloads reliably.',
    email: 'ai.director@nana-learning.edu',
    discordUrl: 'https://discord.gg/nana-learning-ai',
    location: 'London Tech Hub & Remote',
    profileImageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=256&auto=format&fit=crop',
    mentorName: 'Dr. Evelyn Carter',
    mentorTitle: 'Director of AI Architecture',
    socialLinks: [
      { id: '1', platform: 'github', url: 'https://github.com/nana-learning/ai' },
      { id: '2', platform: 'twitter', url: 'https://twitter.com/nana_learning_ai' },
    ],
    syllabus: [
      {
        id: 's1',
        title: 'Architecting Client-Proxy Gateway APIs',
        difficulty: 'Intermediate',
        duration: '2.5 Hours',
        summary: 'Learn why exposing GEMINI_API_KEY to Vite browser DevTools is highly dangerous and build a robust, server-secure Express middleware route to request model payloads safely.',
        keyTakeaways: [
          'Isolate private environment keys from standard client assets',
          'Mitigate rapid endpoint scraping and implement token check mechanisms',
          'Stream JSON outputs directly to React fetch chunk streams'
        ]
      },
      {
        id: 's2',
        title: 'Structuring Gemini System Instructions & Schemas',
        difficulty: 'Advanced',
        duration: '4 Hours',
        summary: 'Optimize model output accuracy up to 98% by binding structured input JSON schemas and writing highly predictive context constraints.',
        keyTakeaways: [
          'Implement schemas for strict JSON model response guidelines',
          'Mitigate halluncination loops with defensive instructions',
          'Construct temperature adjustments for specific content production rates'
        ]
      }
    ],
    challenges: [
      {
        id: 'c1',
        title: 'Lazy Initialization Wrapper',
        description: 'Complete the helper method to dynamically initialize the GoogleGenAI instance safely inside an Express API endpoint.',
        initialCode: `// Lazy loader prevents premature startup crashes\nlet aiClient: GoogleGenAI | null = null;\n\nexport function getGenAI() {\n  if (!aiClient) {\n    const key = process.env.GEMINI_API_KEY;\n    if (!key) throw new Error("Missing variable");\n    /* Complete initialization */\n    aiClient = \n  }\n  return aiClient;\n}`,
        solution: 'new GoogleGenAI({ apiKey: key })',
        expectedOutput: 'new GoogleGenAI({ apiKey: key })',
        hint: 'Use the new keyword and pass an object with the apiKey parameter initialized to the checked key.'
      }
    ],
    cheatsheets: [
      {
        id: 'ch1',
        title: 'Google GenAI SDK Initialization',
        codeBlock: `import { GoogleGenAI } from "@google/genai";\n\n// Keep server-side! Do not prefix with VITE_\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\nconst response = await ai.models.generateContent({\n  model: "gemini-2.5-flash",\n  contents: "Translate to high-fidelity clean JS Code"\n});`,
        explanation: 'Always use @google/genai client libraries on Node.js / Express servers. Initialize lazily during routing to prevent premature server container crashes on cold starts.',
        category: 'Gemini SDK'
      }
    ],
    quizzes: [
      {
        id: 'q1',
        question: 'Why should the GEMINI_API_KEY env variable NEVER have a VITE_ prefix in your React/Vite template?',
        options: [
          'Vite does not support key loading inside configuration scripts',
          'VITE_ prefix exposes secrets directly to the client browser DevTools',
          'The compiler forces Vite variables to fail on deployment',
          'It changes the key structure to lower-case'
        ],
        correctIndex: 1,
        explanation: 'Any key starting with VITE_ gets automatically bundled into client assets and is instantly visible to any visitor inspection.'
      }
    ],
    footerText: '© NANA Learning AI Syndicate. All guides are standard-compliant and verified.',
    themeId: 'emerald-dark',
    fontId: 'monospace',
    visibleSections: {
      syllabus: true,
      challenges: true,
      cheatsheets: true,
      quizzes: true,
      about: true,
    }
  }
};
