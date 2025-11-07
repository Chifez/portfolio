/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'blog.emcodes.xyz',
          },
        ],
        destination: '/blog',
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'blog.emcodes.xyz',
          },
        ],
        destination: '/blog/:path*',
      },
    ];
  },
};

export default nextConfig;
