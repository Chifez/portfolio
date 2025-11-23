export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Get the site URL based on the environment
 * Uses localhost for development and the production URL for production
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // Default to localhost in development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }

  // Fallback to production URL
  return 'https://emcodes.xyz';
}

/**
 * Get the blog URL based on the environment
 * Uses localhost for development and the production URL for production
 */
export function getBlogUrl(): string {
  if (process.env.NEXT_PUBLIC_BLOG_URL) {
    return process.env.NEXT_PUBLIC_BLOG_URL;
  }

  // Default to localhost in development
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000/blog';
  }

  // Fallback to production URL
  return 'https://blog.emcodes.xyz';
}

/**
 * Get the blog hostname for middleware
 */
export function getBlogHost(): string {
  if (process.env.BLOG_HOST) {
    return process.env.BLOG_HOST;
  }

  // Default to localhost in development
  if (process.env.NODE_ENV === 'development') {
    return 'localhost';
  }

  // Fallback to production hostname
  return 'blog.emcodes.xyz';
}
