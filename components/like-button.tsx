'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { getLikeStatus, toggleLike } from '@/lib/actions/like-actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface LikeButtonProps {
  postId: string;
  initialLikes?: number;
  className?: string;
}

export default function LikeButton({
  postId,
  initialLikes = 0,
  className,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const { success, hasLiked, likesCount, error } =
          await getLikeStatus(postId);
        if (success) {
          setIsLiked(hasLiked);
          setLikeCount(likesCount);
        } else if (error) {
          toast({
            title: 'Error',
            description: error,
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error checking like status:', error);
        toast({
          title: 'Error',
          description: 'Failed to check like status. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkLikeStatus();
  }, [postId, toast]);

  const handleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { success, liked, likesCount, error } = await toggleLike(postId);
      if (success) {
        setIsLiked(liked);
        setLikeCount(likesCount);
      } else if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={cn(
        'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
        'hover:bg-gray-800/50 disabled:opacity-50 disabled:cursor-not-allowed',
        isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500',
        className
      )}
      aria-label={isLiked ? 'Unlike post' : 'Like post'}
    >
      <Heart
        className={cn(
          'w-5 h-5 transition-transform',
          isLiked && 'fill-current'
        )}
      />
      <span className="text-sm font-medium">{likeCount}</span>
    </button>
  );
}
