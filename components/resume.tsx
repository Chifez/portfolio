'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Resume() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (headingRef.current) observer.observe(headingRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen px-4 lg:px-0 py-20">
      <motion.h1
        ref={headingRef}
        className="text-5xl md:text-6xl font-bold mb-8 opacity-0 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        RESUME
      </motion.h1>

      <motion.div
        ref={contentRef}
        className="opacity-0 space-y-12 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            NWOSU IFEANYI EMMANUEL
          </h2>
          <p className="text-xl text-gray-400">FRONTEND ENGINEER</p>

          <div className="space-y-1 text-gray-400">
            <p>Email: nwosuifeanyiemmanuel01@gmail.com</p>
            <p>
              Linkedin:{' '}
              <Link
                href="https://linkedin.com/in/nwosuifeanyiemmanuel"
                className="text-gray-300 hover:text-white underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/nwosuifeanyiemmanuel
              </Link>
            </p>
            <p>
              Github:{' '}
              <Link
                href="https://github.com/Chifez"
                className="text-gray-300 hover:text-white underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/Chifez
              </Link>
            </p>
            <p>Contact: +2349070712068</p>
          </div>

          <p className="mt-4 text-gray-300">
            Result Driven Front End Engineer with 3+ years of experience
            dedicated to creating visually appealing software solutions that
            address user needs. Highly Skilled in React, Nextjs, Svelte,
            typescript and JavaScript for crafting intuitive UIs that blend
            aesthetics with functionality to drive user satisfaction and
            business success.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">SKILLS</h2>
          <ul className="space-y-2 text-gray-300">
            <li>● Language: Typescript, JavaScript, PostgresQL, Yaml</li>
            <li>
              ● Frontend: Reactjs, Nextjs, Svelte/Svelte Kit, Zustand,
              Redux/Reduxtoolkit
            </li>
            <li>
              ● Backend: Nodejs, Express js, MongoDB, Supabase, Rest API,
              CMS(Content Management System)
            </li>
            <li>
              ● Platforms/Tools: Git/Github, Jest, Vitest, Docker, Vercel,
              Postman
            </li>
            <li>
              ● Soft skills: Ability to work independently, Excellent
              communication skills, Ability to work across distributed teams,
              Agile development.
            </li>
          </ul>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-white">EXPERIENCE</h2>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-white">
                ClassroomIO (Codacy pioneer '23), London, UK — Frontend Engineer
                (Svelte, Nextjs)
              </h3>
              <span className="text-gray-500">July 2023 - Present</span>
            </div>
            <p className="text-gray-400 italic">
              Open sourced AI driven Edtech Saas to streamline education across
              Africa
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>
                ● Developed a robust CLI tool and npm package for managing our
                platform's free and self-hostable LMS web application generator,
                demonstrating expertise in building developer tools.
              </li>
              <li>
                ● Built a high performance video upload and processing system
                using Cloudflare and AWS S3 SDK multipart file upload, reducing
                video upload time by 30%.
              </li>
              <li>
                ● Designed and built a REST API using vercel AI SDK and OpenAI
                API to implement an AI-driven automated grading system for
                tutors to efficiently grade submitted exercises, providing more
                robust and accurate results and accelerating the grading
                process.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-white">
                Uniflow, London, UK — FrontEnd Developer (React & Nextjs)
              </h3>
              <span className="text-gray-500">April 2023 - May 2023</span>
            </div>
            <p className="text-gray-400 italic">
              A decentralized platform for controlling financial assets and data
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>
                ● Led a seamless website migration from ReactJS to NextJS,
                unlocking a remarkable 94% boost in website performance and SEO
                rankings.
              </li>
              <li>
                ● Leveraged NextJS's built-in optimization techniques to elevate
                the website's user experience, cross browser compatibility and
                accessibility, achieving a 20% improvement in performance.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium text-white">
                Schulltech, Lagos, Nigeria — FrontEnd Developer (React)
              </h3>
              <span className="text-gray-500">August 2022 - December 2022</span>
            </div>
            <p className="text-gray-400 italic">IT consulting and E-learning</p>
            <ul className="space-y-2 text-gray-300">
              <li>
                ● Collaborated with the UI/UX team to translate Figma designs
                into pixel-perfect UI, using reusable and scalable components
                that reduced development time by 40%.
              </li>
              <li>
                ● Integrated an Agile methodology in Engineering the MVP for a
                library-based web application using React, JavaScript, and
                Tailwind CSS, projected to be used by 2000 academic scholars,
                with the backend team to design and implement RESTful API
                integrations, ensuring seamless data flow between frontend and
                backend services.
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">PROJECTS</h2>
          <ul className="space-y-2 text-gray-300">
            <li>
              ● Course-Builder (React, typescript, socketIO, Nodejs): 6+
              Deployment ready simple LMS web app templates.
            </li>
            <li>
              ● AssignGPT (Nextjs, typescript, Vercel AI sdk, Supabase):
              Leveraging the power of Generative UI to build a chat App(like
              chatGPT) that generates a quiz UI and quizzes you on your
              preferred topic on the fly.
            </li>
            <li>
              ● Convertly (Nextjs, typescript, Nodejs, Expressjs, MongoDB):
              Convert your speech to text on the go with Convertly.
            </li>
            <li>
              ● Main stack dashboard (Nextjs, typescript, Vitest): A desktop
              version of the main stack dashboard with unit test.
            </li>
            <li>
              ● CLI-Template-Starter (Javascript, Nodejs, YAML, NPM): A cli tool
              for scaffolding frontend projects quickly using a framework of
              choice.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">EDUCATION</h2>
          <p className="text-gray-300">
            Bachelor of Engineering(B.sc), Electronic and Computer Engineering.
            <br />
            University of Nigeria, Nsukka
          </p>
        </div>
      </motion.div>
    </div>
  );
}
