'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import EmptyState from './empty-state';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/helpers';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { blurDataURL } from '@/lib/data';

interface BlogProps {
  initialPosts: BlogPost[];
}

export default function Blog({ initialPosts: posts }: BlogProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const handleImageLoad = (postId: string) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [postId]: true,
    }));
  };
  const categories = [
    'All',
    ...Array.from(new Set(posts.map((post) => post.category))),
  ];

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  useEffect(() => {
    console.log('blogs', posts);
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
    if (postsRef.current) observer.observe(postsRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (postsRef.current) observer.unobserve(postsRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="mb-4">
        <motion.button
          className="flex text-xs items-center text-gray-400 hover:text-white transition-colors"
          onClick={() => router.push('/')}
          whileHover={{ x: -5 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Home
        </motion.button>
      </div>
      <motion.h1
        ref={headingRef}
        className="text-6xl font-bold mb-4 opacity-0 text-center tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        BLOG
      </motion.h1>
      <motion.p
        ref={headingRef}
        className="mb-10 opacity-0 text-center tracking-tighter"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        I write more than just code
      </motion.p>

      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-gray-800 text-white'
                  : 'bg-transparent text-gray-400 hover:text-white'
              }`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        ref={postsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto opacity-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <Link href={`/blog/${post._id}`} key={index}>
              <motion.article
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative h-64 mb-6 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gray-800 animate-pulse ${imagesLoaded[post.id] ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                  />

                  <Image
                    src={post.image.url || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    onLoad={() => handleImageLoad(post.id)}
                  />
                  <div className="absolute bottom-0 left-0 bg-black bg-opacity-70 px-4 py-2">
                    <span className="text-sm text-white">{post.category}</span>
                  </div>
                </div>
                <div className="flex justify-between text-gray-500 text-sm mb-2">
                  <span>{formatDate(post.createdAt)}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-gray-300 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400">{post.excerpt}</p>
              </motion.article>
            </Link>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2">
            <EmptyState
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
}
