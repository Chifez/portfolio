'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  // Log error immediately without useEffect - this is more appropriate for error boundaries
  console.error('Blog post error:', error);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <button
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-sm transition-colors inline-flex items-center"
            onClick={() => router.back()}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </button>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Something went wrong!</h1>
          <p className="text-gray-400 text-lg">
            {error.message || 'Failed to load the blog post. Please try again.'}
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={reset}>Try again</button>
            <button
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-sm transition-colors inline-flex items-center"
              onClick={() => router.push('/blog')}
            >
              Go to blog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
