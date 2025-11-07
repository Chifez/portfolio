import { getBlogPosts } from '@/lib/actions/blog-actions';
import { Metadata } from 'next';
import Blog from '@/components/blog';
import { Suspense } from 'react';
import BlogLoading from './loading';

const siteOrigin = 'https://blog.emcodes.xyz';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'Blog',
  description:
    'Explore my thoughts, insights, and experiences through my blog posts about technology, development, and more.',
  openGraph: {
    title: 'Blog',
    description:
      'Explore my thoughts, insights, and experiences through my blog posts about technology, development, and more.',
    type: 'website',
    url: siteOrigin,
  },
  twitter: {
    title: 'Blog',
    description:
      'Explore my thoughts, insights, and experiences through my blog posts about technology, development, and more.',
  },
  alternates: {
    canonical: siteOrigin,
  },
};

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
