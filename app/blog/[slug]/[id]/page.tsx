import { getBlogPostById } from '@/lib/actions/blog-actions';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import BlogPost from '@/components/blog-post';
import { Suspense } from 'react';
import BlogPostLoading from './loading';
import { getBlogUrl } from '@/lib/helpers';

interface PageProps {
  params: {
    slug: string;
    id: string;
  };
}

type Props = {
  params: { slug: string; id: string };
};

function getAbsoluteImageUrl(url: string, metadataBase: URL): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    if (url.includes('cloudinary.com')) {
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
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const siteOrigin = getBlogUrl();
  const { id } = await params;
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

  const metadataBase = new URL(siteOrigin);
  const defaultImage = {
    url: '/opengraph-image.png',
    width: 1200,
    height: 630,
    alt: 'Nwosu Emmanuel - Full Stack Developer',
  };

  // Get the post image URL, ensuring it's absolute
  const postImageUrl = post.image?.url
    ? getAbsoluteImageUrl(post.image.url, metadataBase)
    : getAbsoluteImageUrl(defaultImage.url, metadataBase);
  const postPath = `/${post.slug}/${post._id}`;
  const absolutePostUrl = `${siteOrigin}${postPath}`;

  return {
    metadataBase,
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author?.name || 'Nwosu Emmanuel' }],
    alternates: {
      canonical: absolutePostUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author?.name || 'Nwosu Emmanuel'],
      tags: post.tags,
      url: absolutePostUrl,
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

// Separate component for the blog post content to use with Suspense
async function BlogPostContent({ id }: { id: string }) {
  const post = await getBlogPostById(id);
  if (!post) {
    notFound();
  }
  return <BlogPost post={post} />;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug, id } = await params;
  if (!id) {
    notFound();
  }

  // Fetch the post to validate it exists and slug matches
  const post = await getBlogPostById(id);
  if (!post) {
    notFound();
  }

  // Validate that the slug in the URL matches the post's slug
  // This ensures only valid blog posts are served
  if (post.slug !== slug) {
    notFound();
  }

  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostContent id={id} />
    </Suspense>
  );
}
