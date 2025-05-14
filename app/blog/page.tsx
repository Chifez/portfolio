import { Suspense } from 'react';
import BlogLoading from './loading';
import { Metadata } from 'next';
import BlogContent from '@/components/blog-content';

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

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogContent />
    </Suspense>
  );
}
