'use client';

import { useQuery } from '@tanstack/react-query';
import { getBlogPosts } from '@/lib/actions/blog-actions';
import Blog from './blog';
import type { BlogPost } from '@/lib/types';

export default function BlogContent() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: getBlogPosts,
  });

  if (isLoading) {
    return null; // This will trigger the Suspense fallback
  }

  if (error) {
    console.error('Error fetching blog posts:', error);
    return (
      <div className="min-h-screen py-20 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-gray-400">
          Failed to load blog posts. Please try again later.
        </p>
      </div>
    );
  }

  return <Blog initialPosts={posts || []} />;
}
