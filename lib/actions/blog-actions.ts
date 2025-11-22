'use server';

import connectDB from '@/lib/mongodb';
import { Post } from '../models/post';
import { BlogPost } from '../types';
import { fallbackPosts } from '../data';

// Function to get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    await connectDB();
    const posts = await Post.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .lean();

    // If we have posts in the database, return them
    if (posts && posts.length > 0) {
      return JSON.parse(JSON.stringify(posts)) as BlogPost[];
    }

    // Otherwise, return fallback data
    return fallbackPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    // Return fallback data if there's an error
    return fallbackPosts;
  }
}

// Function to get a single blog post by ID
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  try {
    // Validate id parameter
    if (!id) {
      return null;
    }

    await connectDB();
    const post = await Post.findById(id).lean();

    // If we found the post in the database, return it
    if (post) {
      return JSON.parse(JSON.stringify(post)) as BlogPost;
    }

    // Otherwise, look for it in the fallback data
    const fallbackPost = fallbackPosts.find((post) => post.id === id);
    return fallbackPost || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    // Look for the post in the fallback data
    const fallbackPost = fallbackPosts.find((post) => post.id === id);
    return fallbackPost || null;
  }
}
