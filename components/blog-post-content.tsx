'use client';

import { useQuery } from '@tanstack/react-query';
import { getBlogPostById } from '@/lib/actions/blog-actions';
import BlogPost from './blog-post';
import type { BlogPost as BlogPostType } from '@/lib/types';
import { notFound } from 'next/navigation';
import BlogPostLoading from '@/app/blog/[id]/loading';
import { nullable } from 'zod';

interface BlogPostContentProps {
  id: string;
}

export default function BlogPostContent({ id }: BlogPostContentProps) {
  const {
    data: post,
    isLoading,
    error,
  } = useQuery<BlogPostType>({
    queryKey: ['blogPost', id],
    queryFn: async () => {
      const result = await getBlogPostById(id);
      if (!result) throw new Error('Post not found');
      return result;
    },
    retry: false,
  });

  if (isLoading) {
    return null; // This will trigger the Suspense fallback
  }

  if (error || !post) {
    console.error('Error fetching blog post:', error);
    notFound();
  }

  return <BlogPost post={post} />;
}
