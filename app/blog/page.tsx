import { getBlogPosts } from '@/lib/actions/blog-actions';
import Blog from '@/components/blog';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <Blog initialPosts={posts} />;
}
