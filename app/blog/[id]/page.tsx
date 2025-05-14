import { getBlogPostById } from '@/lib/actions/blog-actions';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import BlogPostLoading from './loading';
import { Metadata, ResolvingMetadata } from 'next';
import BlogPostContent from '@/components/blog-post-content';

interface PageProps {
  params: {
    id: string;
  };
}

type Props = {
  params: { id: string };
};

// Helper function to ensure image URL is absolute and properly formatted
function getAbsoluteImageUrl(url: string, metadataBase: URL): string {
  // If the URL is already absolute (starts with http:// or https://), return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // If it's a Cloudinary URL, ensure it's optimized for social cards
    if (url.includes('cloudinary.com')) {
      // Add Cloudinary transformations for social cards if not already present
      if (!url.includes('/c_fill')) {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}c_fill,w_1200,h_630,q_auto,f_auto`;
      }
    }
    return url;
  }
  // If it's a relative URL, resolve it against the metadata base
  return new URL(url, metadataBase).toString();
}

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

  // Get the parent metadata and base URL
  const parentMetadata = await parent;
  const metadataBase = parentMetadata.metadataBase as URL;
  const defaultImage = {
    url: '/opengraph-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Nwosu Emmanuel - Full Stack Developer',
  };

  // Get the post image URL, ensuring it's absolute
  const postImageUrl = post.image?.url
    ? getAbsoluteImageUrl(post.image.url, metadataBase)
    : getAbsoluteImageUrl(defaultImage.url, metadataBase);

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
      images: [
        {
          url: postImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [postImageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const id = (await params).id;
  if (!id) {
    notFound();
  }

  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostContent id={id} />
    </Suspense>
  );
}
