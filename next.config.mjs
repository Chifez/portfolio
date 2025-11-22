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
        source: '/:slug/:id',
        destination: '/blog/:slug/:id',
        // has: [
        //   {
        //     type: 'host',
        //     value: 'blog.emcodes.xyz',
        //   },
        // ],
      },
    ];
  },
};

export default nextConfig;
