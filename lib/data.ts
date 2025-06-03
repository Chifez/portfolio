import { BlogPost, Project } from './types';

// A base64-encoded SVG that creates a 400x300 pixel gray rectangle
// This is used as a blur placeholder for images while they load
export const blurDataURL = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgNDAwIDMwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg==`;

export const projects: Project[] = [
  {
    title: 'MEETLITE',
    description:
      'A Real-Time Video Conferencing platform, where users can create and join meetings with ease',
    technologies: [
      'REACT',
      'TYPESCRIPT',
      'NODEJS',
      'WEBRTC',
      'SOCKET.IO',
      'EXPRESSJS',
      'MONGODB',
      'AXIOS',
      'TAILWINDCSS',
    ],
    link: 'https://meetlit.netlify.app/',
    image: '/meetlite.png',
  },
  {
    title: 'MAINSTACK',
    description:
      'A responsive dashboard UI for mainstack admin panel for managing transactions and finances',
    technologies: ['NEXTJS', 'TYPESCRIPT', 'TAILWINDCSS', 'ZUSTAND'],
    link: 'https://mainstack-assesment.vercel.app/',
    image: '/mainstack.png',
  },
  {
    title: 'ASSIGNGPT',
    description:
      'A GPT-4 based AI assistant for people to get quizzes on any subject',
    technologies: [
      'NEXTJS',
      'TYPESCRIPT',
      'SUPABASE',
      'TAILWINDCSS',
      'VERCEL AI SDK',
      'OPENAI API',
    ],
    link: 'https://assign-gpt.vercel.app/',
    image: '/assign.png',
  },
  {
    title: 'ECHO',
    description:
      'A personal blogging website, where I write about my experiences and thoughts',
    technologies: ['TAILWINDCSS', 'SVELTE', 'TYPESCRIPT', 'MONGODB', 'NODEJS'],
    link: 'https://echo-chifez.netlify.app/',
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
  // {
  //   title: 'CLI-TEMPLATE-STARTER',
  //   description:
  //     'A cli tool for scaffolding frontend projects with a framework of choice',
  //   technologies: ['JAVASCRIPT', 'NODEJS', 'YAML', 'NODEJS'],
  //   link: 'https://github.com/Chifez/cli-template-starter',
  //   image: '/user.webp',
  // },
  {
    title: 'ENSUBEB',
    description:
      'A website and Admin dashboard for Ensubeb, a Nigerian government agency that oversees the primary education in ENUGU STATE',
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

export const fallbackPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    excerpt:
      'Exploring the latest trends and technologies shaping the future of web development.',
    content: `
      <p>The web development landscape is constantly evolving, with new technologies and methodologies emerging at a rapid pace. In this post, we'll explore some of the most exciting trends that are shaping the future of web development.</p>
      
      <h2>1. WebAssembly</h2>
      <p>WebAssembly (Wasm) is a binary instruction format that allows high-performance applications to run in the browser. It enables languages like C, C++, and Rust to be compiled to a format that can run alongside JavaScript, opening up new possibilities for web applications.</p>
      
      <h2>2. Edge Computing</h2>
      <p>Edge computing brings computation closer to the data source, reducing latency and improving performance. With platforms like Vercel and Cloudflare Workers, developers can now run server-side code at the edge, closer to the user.</p>
      
      <h2>3. AI-Powered Development</h2>
      <p>AI tools like GitHub Copilot and ChatGPT are revolutionizing how developers write code. These tools can suggest code completions, generate entire functions, and help developers solve complex problems more efficiently.</p>
      
      <h2>4. Headless Architecture</h2>
      <p>Headless architecture separates the frontend presentation layer from the backend data layer, allowing for more flexibility and better performance. This approach enables developers to use the best tools for each layer and create more modular, maintainable applications.</p>
      
      <h2>Conclusion</h2>
      <p>The future of web development is exciting, with new technologies and methodologies emerging that will enable developers to create faster, more powerful, and more user-friendly applications. By staying informed about these trends, developers can position themselves at the forefront of the industry and create cutting-edge web experiences.</p>
    `,
    createdAt: 'May 5, 2023',
    readTime: '5 min read',
    slug: 'the-future-of-web-development',
    category: 'Development',
    contentImages: [],
    image: {
      url: '/placeholder.svg?height=400&width=600',
    },
    author: {
      name: 'Ifeanyi Emmanuel',
      avatar: '/placeholder.svg?height=100&width=100',
      role: 'Frontend Engineer',
    },
    tags: ['WebAssembly', 'Edge Computing', 'AI', 'Headless'],
  },
  {
    id: '2',
    title: 'Designing for Accessibility',
    excerpt:
      'How to create inclusive designs that work for everyone, regardless of ability.',
    content: `
      <p>Accessibility is not just a nice-to-have feature; it's a fundamental aspect of good web design. In this post, we'll explore how to create inclusive designs that work for everyone, regardless of ability.</p>
      
      <h2>Understanding Accessibility</h2>
      <p>Web accessibility means that websites, tools, and technologies are designed and developed so that people with disabilities can use them. More specifically, people can perceive, understand, navigate, and interact with the web.</p>
      
      <h2>Key Principles of Accessible Design</h2>
      
      <h3>1. Perceivable</h3>
      <p>Information and user interface components must be presentable to users in ways they can perceive. This means providing text alternatives for non-text content, creating content that can be presented in different ways, and making it easier for users to see and hear content.</p>
      
      <h3>2. Operable</h3>
      <p>User interface components and navigation must be operable. This means making all functionality available from a keyboard, giving users enough time to read and use content, and not designing content in a way that is known to cause seizures.</p>
      
      <h3>3. Understandable</h3>
      <p>Information and the operation of the user interface must be understandable. This means making text readable and understandable, making web pages appear and operate in predictable ways, and helping users avoid and correct mistakes.</p>
      
      <h3>4. Robust</h3>
      <p>Content must be robust enough that it can be interpreted reliably by a wide variety of user agents, including assistive technologies. This means maximizing compatibility with current and future user tools.</p>
      
      <h2>Practical Tips for Accessible Design</h2>
      
      <ul>
        <li>Use semantic HTML to provide meaning and structure to your content</li>
        <li>Ensure sufficient color contrast between text and background</li>
        <li>Provide descriptive alt text for images</li>
        <li>Design keyboard-friendly interfaces</li>
        <li>Create responsive designs that work on all devices</li>
        <li>Use ARIA attributes when necessary to enhance accessibility</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Designing for accessibility is not just about compliance with standards; it's about creating a better user experience for everyone. By following the principles and tips outlined in this post, you can create more inclusive designs that work for all users, regardless of their abilities.</p>
    `,
    createdAt: 'April 18, 2023',
    readTime: '7 min read',
    slug: 'designing-for-accessibilty',
    category: 'Design',
    contentImages: [],
    image: {
      url: '/placeholder.svg?height=400&width=600',
    },
    author: {
      name: 'Ifeanyi Emmanuel',
      avatar: '/placeholder.svg?height=100&width=100',
      role: 'Frontend Engineer',
    },
    tags: ['Accessibility', 'Inclusive Design', 'UX', 'WCAG'],
  },
  {
    id: '3',
    title: 'My Journey as a Frontend Developer',
    excerpt:
      'Personal reflections on my path to becoming a frontend developer and lessons learned.',
    content: `
      <p>My journey as a frontend developer has been filled with challenges, growth, and countless learning opportunities. In this post, I'll share my personal reflections on this path and the valuable lessons I've learned along the way.</p>
      
      <h2>The Beginning</h2>
      <p>Like many developers, my journey began with curiosity. I was fascinated by websites and wanted to understand how they were built. I started with the basics: HTML, CSS, and JavaScript. I remember the excitement of creating my first webpage and seeing it come to life in the browser.</p>
      
      <h2>The Learning Curve</h2>
      <p>As I delved deeper into frontend development, I encountered the steep learning curve that comes with modern frameworks and tools. Learning React was a pivotal moment in my journey. It challenged me to think differently about building user interfaces and introduced me to concepts like component-based architecture and state management.</p>
      
      <h2>Challenges and Growth</h2>
      <p>One of the biggest challenges I faced was keeping up with the rapidly evolving frontend ecosystem. New frameworks, libraries, and tools emerge constantly, and it can be overwhelming to decide what to learn next. I learned to focus on understanding core concepts rather than chasing every new technology.</p>
      
      <p>Working on real projects was another significant source of growth. There's a vast difference between following tutorials and building something from scratch. Real projects forced me to solve complex problems, collaborate with others, and consider factors like performance, accessibility, and user experience.</p>
      
      <h2>Key Lessons Learned</h2>
      
      <h3>1. Fundamentals Matter</h3>
      <p>No matter how many frameworks or libraries you learn, a solid understanding of HTML, CSS, and JavaScript is essential. These fundamentals are the building blocks of everything we do as frontend developers.</p>
      
      <h3>2. Learn by Doing</h3>
      <p>Reading documentation and watching tutorials is important, but the real learning happens when you build things. Start small, but start building as soon as possible.</p>
      
      <h3>3. Embrace the Community</h3>
      <p>The developer community is incredibly supportive and a valuable resource for learning. Engage with other developers, contribute to open source, and don't be afraid to ask questions.</p>
      
      <h3>4. Never Stop Learning</h3>
      <p>Frontend development is a field that requires continuous learning. Embrace this aspect of the profession and cultivate a growth mindset.</p>
      
      <h2>Looking Forward</h2>
      <p>As I continue my journey as a frontend developer, I'm excited about the future of web development and the opportunities to create meaningful, accessible, and performant user experiences. The learning never stops, and that's what makes this field so exciting and rewarding.</p>
    `,
    createdAt: 'March 22, 2023',
    readTime: '10 min read',
    slug: 'my-journey-as-a-frontend-developer',
    category: 'Personal',
    contentImages: [],
    image: {
      url: '/placeholder.svg?height=400&width=600',
    },
    author: {
      name: 'Ifeanyi Emmanuel',
      avatar: '/placeholder.svg?height=100&width=100',
      role: 'Frontend Engineer',
    },
    tags: ['Career', 'Learning', 'Frontend', 'Personal Growth'],
  },
  {
    id: '4',
    title: 'Optimizing React Performance',
    excerpt:
      'Practical tips and techniques to make your React applications faster and more efficient.',
    content: `
      <p>React is known for its performance, but even React applications can suffer from performance issues as they grow in complexity. In this post, we'll explore practical tips and techniques to make your React applications faster and more efficient.</p>
      
      <h2>Understanding React's Rendering Process</h2>
      <p>Before diving into optimization techniques, it's important to understand how React renders components. React uses a virtual DOM to minimize direct manipulation of the actual DOM, which is a costly operation. When a component's state or props change, React creates a new virtual DOM tree, compares it with the previous one (a process called "diffing"), and then updates only the parts of the actual DOM that have changed.</p>
      
      <h2>Common Performance Issues and Solutions</h2>
      
      <h3>1. Unnecessary Re-renders</h3>
      <p>One of the most common performance issues in React applications is unnecessary re-renders. This happens when a component re-renders even though its props or state haven't changed.</p>
      
      <p><strong>Solution:</strong> Use React.memo for functional components and PureComponent for class components to prevent re-renders when props haven't changed. Additionally, be mindful of how you pass props to components, especially functions and objects, which can cause unnecessary re-renders if created on each render.</p>
      
      <h3>2. Large Component Trees</h3>
      <p>As your application grows, you might end up with large component trees that can be expensive to render and update.</p>
      
      <p><strong>Solution:</strong> Break down large components into smaller, more focused ones. This not only improves maintainability but also allows React to optimize rendering more effectively. Consider using techniques like code splitting and lazy loading to reduce the initial bundle size.</p>
      
      <h3>3. Expensive Calculations</h3>
      <p>Performing expensive calculations on each render can significantly slow down your application.</p>
      
      <p><strong>Solution:</strong> Use the useMemo hook to memoize expensive calculations and useCallback to memoize functions. This ensures that these operations are only performed when necessary.</p>
      
      <h2>Advanced Optimization Techniques</h2>
      
      <h3>1. Virtualization</h3>
      <p>When rendering large lists or tables, consider using virtualization libraries like react-window or react-virtualized. These libraries only render the items that are currently visible in the viewport, significantly reducing the number of DOM nodes.</p>
      
      <h3>2. Web Workers</h3>
      <p>For CPU-intensive tasks that might block the main thread, consider using Web Workers. This allows you to run JavaScript in a background thread, keeping your UI responsive.</p>
      
      <h3>3. Performance Monitoring</h3>
      <p>Use tools like React DevTools Profiler, Lighthouse, and Chrome DevTools Performance tab to identify performance bottlenecks in your application.</p>
      
      <h2>Conclusion</h2>
      <p>Optimizing React performance is an ongoing process that requires a good understanding of how React works and a proactive approach to identifying and addressing performance issues. By applying the techniques discussed in this post, you can create React applications that are not only feature-rich but also fast and efficient.</p>
    `,
    createdAt: 'February 14, 2023',
    readTime: '8 min read',
    slug: 'optimizing-react-performance',
    category: 'Development',
    contentImages: [],
    image: {
      url: '/placeholder.svg?height=400&width=600',
    },
    author: {
      name: 'Ifeanyi Emmanuel',
      avatar: '/placeholder.svg?height=100&width=100',
      role: 'Frontend Engineer',
    },
    tags: ['React', 'Performance', 'Optimization', 'JavaScript'],
  },
];
