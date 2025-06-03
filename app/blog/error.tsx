'use client';

import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-8">
          <button
            className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-sm transition-colors inline-flex items-center"
            onClick={() => router.push('/')}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to home
          </button>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Something went wrong!</h1>
          <p className="text-gray-400 text-lg">
            {error.message ||
              'Failed to load the blog posts. Please try again.'}
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={reset}>Try again</button>
            <button
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-sm transition-colors inline-flex items-center"
              onClick={() => router.push('/')}
            >
              Go to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
