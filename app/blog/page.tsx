import { getBlogPosts } from '@/lib/actions/blog-actions';
import { Metadata } from 'next';
import Blog from '@/components/blog';
import { Suspense } from 'react';
import BlogLoading from './loading';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Explore my thoughts, insights, and experiences through my blog posts about technology, development, and more.',
  openGraph: {
    title: 'Blog',
    description:
      'Explore my thoughts, insights, and experiences through my blog posts about technology, development, and more.',
    type: 'website',
    url: 'https://emcodes.xyz/blog',
  },
  twitter: {
    title: 'Blog',
    description:
      'Explore my thoughts, insights, and experiences through my blog posts about technology, development, and more.',
  },
};

// Separate component for the blog content to use with Suspense
async function BlogContent() {
  const posts = await getBlogPosts();
  return <Blog initialPosts={posts} />;
}

export default async function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogContent />
    </Suspense>
  );
}
