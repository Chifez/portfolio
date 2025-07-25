'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import type { BlogPost as BlogPostType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/helpers';
import LikeButton from './like-button';
import ShareButton from './share-button';
import { blurDataURL } from '@/lib/data';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <motion.button
            className="flex text-xs items-center text-gray-400 hover:text-white transition-colors"
            onClick={() => router.push('/blog')}
            whileHover={{ x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </motion.button>
        </div>

        <motion.div
          ref={headerRef}
          className="mb-10 lg:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={
                  post.author?.avatar || '/placeholder.svg?height=40&width=40'
                }
                alt={post.author?.name || 'Author'}
                fill
                priority
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-medium">
                {post.author?.name || 'Anonymous'}
              </div>
              <div className="text-xs text-gray-500">
                {formatDate(post.createdAt)} · {post.readTime}
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="relative h-[400px] mb-8 rounded-md overflow-hidden bg-gray-800/50">
            <div
              className={`absolute inset-0 bg-gray-800 animate-pulse ${
                imageLoaded ? 'opacity-0' : 'opacity-100'
              } transition-opacity duration-300`}
            />
            <Image
              src={post.image.url || '/placeholder.svg'}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 1200px"
              quality={90}
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="object-cover"
              onLoad={() => setImageLoaded(true)}
              style={{ opacity: imageLoaded ? 1 : 0 }}
            />
          </div>

          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <LikeButton postId={post._id || post.id} />
              <ShareButton
                url={`${typeof window !== 'undefined' ? window.location.href : ''}`}
                title={post.title}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={contentRef}
          className="prose prose-invert max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-bold mb-4">Share this post</h3>
          <div className="flex items-center gap-4 my-4">
            <ShareButton
              url={`${typeof window !== 'undefined' ? window.location.href : ''}`}
              title={post.title}
            />
            <LikeButton postId={post._id || post.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
