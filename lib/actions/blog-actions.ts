'use server';

import clientPromise from '@/lib/mongodb';
import { BlogPost } from '../types';
import { ObjectId } from 'mongodb';
import { fallbackPosts } from '../data';

// Function to get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const client = await clientPromise;
    const db = client.db('test');
    const posts = await db
      .collection('posts')
      .find({ isPublished: true })
      .toArray();

    // If we have posts in the database, return them
    if (posts && posts.length > 0) {
      return JSON.parse(JSON.stringify(posts)) as unknown as BlogPost[];
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

    const client = await clientPromise;
    const db = client.db('test');
    const post = await db
      .collection('posts')
      .findOne({ _id: new ObjectId(id) });

    // If we found the post in the database, return it
    if (post) {
      return JSON.parse(JSON.stringify(post)) as unknown as BlogPost;
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
