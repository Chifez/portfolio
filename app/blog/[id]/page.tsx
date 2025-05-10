import { getBlogPostById } from '@/lib/actions/blog-actions';
import BlogPost from '@/components/blog-post';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
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

  return <BlogPost post={post} />;
}
