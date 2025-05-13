'use server';

import connectDB from '@/lib/mongodb';
import { Like } from '../models/like';
import { Post, IPost, LeanPost } from '../models/post';
import { headers } from 'next/headers';

// Get user's IP address
async function getIpAddress(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return headersList.get('x-real-ip') || 'unknown';
}

// Check if a user has liked a post and get like count
export async function getLikeStatus(id: string): Promise<{
  success: boolean;
  likesCount: number;
  hasLiked: boolean;
  error?: string;
}> {
  try {
    await connectDB();

    const post = (await Post.findById(id).lean()) as unknown as LeanPost;
    if (!post) {
      return {
        success: false,
        likesCount: 0,
        hasLiked: false,
        error: 'Post not found',
      };
    }

    const ipAddress = await getIpAddress();
    const hasLiked = await Like.exists({ postId: post._id, userIp: ipAddress });

    return {
      success: true,
      likesCount: post.likesCount,
      hasLiked: !!hasLiked,
    };
  } catch (error) {
    console.error('Error getting like status:', error);
    return {
      success: false,
      likesCount: 0,
      hasLiked: false,
      error: 'Failed to get like status',
    };
  }
}

// Toggle like status for a post
export async function toggleLike(id: string): Promise<{
  success: boolean;
  liked: boolean;
  likesCount: number;
  error?: string;
}> {
  try {
    await connectDB();
    const ipAddress = await getIpAddress();

    // Check if the post exists
    const post = await Post.findById(id);
    if (!post) {
      return {
        success: false,
        liked: false,
        likesCount: 0,
        error: 'Post not found',
      };
    }

    // Check if user has already liked the post
    const existingLike = await Like.findOne({
      postId: post._id,
      userIp: ipAddress,
    });

    if (existingLike) {
      // Unlike: Remove the like and decrement likesCount
      await Like.deleteOne({ _id: existingLike._id });
      const updatedPost = (await Post.findOneAndUpdate(
        { _id: post._id },
        { $inc: { likesCount: -1 } },
        { new: true }
      ).lean()) as unknown as LeanPost;

      return {
        success: true,
        liked: false,
        likesCount: updatedPost.likesCount || 0,
      };
    } else {
      // Like: Add the like and increment likesCount
      await Like.create({ postId: post._id, userIp: ipAddress });
      const updatedPost = (await Post.findOneAndUpdate(
        { _id: post._id },
        { $inc: { likesCount: 1 } },
        { new: true }
      ).lean()) as unknown as LeanPost;

      return {
        success: true,
        liked: true,
        likesCount: updatedPost.likesCount || 0,
      };
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    return {
      success: false,
      liked: false,
      likesCount: 0,
      error: 'Failed to process like',
    };
  }
}

// Get like count for a post
export async function getLikeCount(postId: string): Promise<number> {
  try {
    await connectDB();
    const post = await Post.findById(postId).select('likesCount');
    return post?.likesCount || 0;
  } catch (error) {
    console.error('Error getting like count:', error);
    return 0;
  }
}
