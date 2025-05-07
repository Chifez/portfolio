import { Project } from './types';

export const projects: Project[] = [
  {
    title: 'ASSIGNGPT',
    description:
      'A GPT-4 based AI assistant for people to get quizzes on any subject',
    technologies: ['NEXTJS', 'TYPESCRIPT', 'TAILWINDCSS', 'OPENAI API'],
    link: 'https://assign-gpt.vercel.app/',
    image: '/assign.png',
  },
  {
    title: 'ECHO',
    description:
      'A personal blogging website, where I write about my experiences and thoughts',
    technologies: ['TAILWINDCSS', 'SVELTE', 'TYPESCRIPT', 'MONGODB', 'NODEJS'],
    link: 'https://echo-chifez.vercel.app/',
    image: '/echo.png',
  },
  {
    title: 'CONVERTLY',
    description:
      'A speech-to-text converter, with options for downloading, editing and sharing either as an image or a text file format of choice',
    technologies: [
      'TAILWINDCSS',
      'NEXTJS',
      'TYPESCRIPT',
      'MONGODB',
      'EXPRESSJS',
      'NODEJS',
    ],
    link: 'https://stt-app-roan.vercel.app/',
    image: '/convertly.png',
  },
  {
    title: 'CLI-TEMPLATE-STARTER',
    description:
      'A cli tool for scaffolding frontend projects with a framework of choice',
    technologies: ['JAVASCRIPT', 'NODEJS', 'YAML', 'NODEJS'],
    link: 'https://github.com/Chifez/cli-template-starter',
    image: '/user.webp',
  },
  {
    title: 'ENSUBEB',
    description:
      'A website and admin dashboard for the Ensubeb, a Nigerian government agency that oversees the primary education in ENUGU STATE',
    technologies: [
      'NEXTJS',
      'TYPESCRIPT',
      'TAILWINDCSS',
      'SANITY CMS',
      'DJANGO',
    ],
    link: 'https://frontend-et2i.onrender.com/',
    image: '/ensubeb.png',
  },
];
