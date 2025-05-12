import { getBlogPosts } from '@/lib/actions/blog-actions';
import Blog from '@/components/blog';
import { Suspense } from 'react';
import BlogLoading from './loading';
import { Metadata } from 'next';

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

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <Suspense fallback={<BlogLoading />}>
      <Blog initialPosts={posts} />
    </Suspense>
  );
}
