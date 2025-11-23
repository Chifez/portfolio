import { NextResponse, type NextRequest } from 'next/server';
import { getBlogHost } from './lib/helpers';

const BLOG_HOST = getBlogHost();

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.toLowerCase();

  if (host === BLOG_HOST) {
    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    const isNextAsset =
      pathname.startsWith('/_next/') || pathname === '/favicon.ico';
    const isStaticAsset = /\.[^/]+$/.test(pathname);
    const isApiRoute = pathname.startsWith('/api');
    const alreadyOnBlog = pathname.startsWith('/blog');

    if (!isNextAsset && !isStaticAsset && !isApiRoute && !alreadyOnBlog) {
      url.pathname = pathname === '/' ? '/blog' : `/blog${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
