'use client';

import type React from 'react';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Message sent! (This is a demo)');
  };

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
    if (formRef.current) observer.observe(formRef.current);
    if (socialsRef.current) observer.observe(socialsRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (formRef.current) observer.unobserve(formRef.current);
      if (socialsRef.current) observer.unobserve(socialsRef.current);
    };
  }, []);

  const socialLinks = [
    { name: 'INSTAGRAM', url: '#' },
    { name: 'LINKEDIN', url: '#' },
    { name: 'X (TWITTER)', url: '#' },
    { name: 'GITHUB', url: '#' },
    { name: 'BEHANCE', url: '#' },
    { name: 'SPOTIFY', url: '#' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 lg:px-0 py-20">
      <motion.h1
        ref={headingRef}
        className="text-6xl font-bold mb-4 opacity-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        SAY HELLO!
      </motion.h1>

      <motion.p
        className="text-xl text-gray-400 mb-12 opacity-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        I&apos;m just a few pixels away
      </motion.p>

      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-lg opacity-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          <div className="flex-1">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <textarea
          name="message"
          placeholder="Hey! I liked your website, can we collab?"
          value={formData.message}
          onChange={handleChange}
          className="input-field h-32 resize-none mb-8"
          required
        />

        <div className="flex justify-end">
          <motion.button
            type="submit"
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send
          </motion.button>
        </div>
      </motion.form>

      <motion.div
        ref={socialsRef}
        className="mt-20 text-center opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-gray-500 mb-6">(I&apos;m everywhere)</p>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              className="social-link"
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        <p className="text-gray-500 text-sm mt-16">
          For your kind info: this website is designed in{' '}
          <a href="#" className="text-gray-400 hover:text-white">
            Figma
          </a>{' '}
          and developed in{' '}
          <a href="#" className="text-gray-400 hover:text-white">
            Next.js
          </a>
        </p>
      </motion.div>
    </div>
  );
}
