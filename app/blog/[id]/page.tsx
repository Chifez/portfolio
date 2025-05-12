import { getBlogPostById } from '@/lib/actions/blog-actions';
import BlogPost from '@/components/blog-post';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import BlogPostLoading from './loading';
import { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
}

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = (await params).id;
  if (!id) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  const post = await getBlogPostById(id);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  // Get the parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author?.name || 'Nwosu Emmanuel' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author?.name || 'Nwosu Emmanuel'],
      tags: post.tags,
      url: `https://emcodes.xyz/blog/${post.id}`,
      images: post.image
        ? [{ url: post.image.url, width: 1200, height: 630, alt: post.title }]
        : previousImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image.url] : '/twitter-image.png',
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  // Ensure params.id is available before proceeding
  const id = (await params).id;
  if (!id) {
    notFound();
  }

  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }
  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPost post={post} />
    </Suspense>
  );
}
