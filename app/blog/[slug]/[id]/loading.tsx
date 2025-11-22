import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft } from 'lucide-react';

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <button className="flex text-xs items-center text-gray-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to all posts
          </button>
        </div>

        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>

          <Skeleton className="h-12 w-3/4 mb-6" />

          <Skeleton className="h-[400px] w-full mb-8 rounded-md" />

          <div className="flex flex-wrap gap-2 mb-8">
            <Skeleton className="h-6 w-20 rounded-sm" />
            <Skeleton className="h-6 w-24 rounded-sm" />
            <Skeleton className="h-6 w-16 rounded-sm" />
            <Skeleton className="h-6 w-28 rounded-sm" />
          </div>
        </div>

        <div className="space-y-6">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-10 w-1/2 my-8" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-10 w-1/2 my-8" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    </div>
  );
}
