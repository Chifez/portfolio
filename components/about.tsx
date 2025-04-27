'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useIsMobile } from '../hooks/use-mobile';
import ImageAnimate from './animations/image-reveal';
import { imageContainer } from './animations/variants';

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumArtUrl?: string;
  songUrl?: string;
}

export default function About() {
  const isMobile = useIsMobile();

  const { data: spotifyData } = useQuery<SpotifyData>({
    queryKey: ['spotify'],
    queryFn: async () => {
      const response = await fetch('/api/spotify');
      return response.json();
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  return (
    <div className="px-4 lg:px-0 lg:pl-10 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 py-20 lg:py-0">
      <div className="flex flex-col justify-center lg:pt-10">
        <motion.h1
          className="text-6xl font-bold mb-8 opacity-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.7 : 0.5 }}
        >
          WHO AM I?
        </motion.h1>
        <motion.p
          className="text-xl leading-relaxed text-gray-400 opacity-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: isMobile ? 0.7 : 0.5, delay: 0.2 }}
        >
          I'm Emmanuel, a frontend engineer who loves making things feel
          effortless — even when they're not. My work sits at the intersection
          of interaction and intention. I design and build interfaces that are
          fast, minimal, and thoughtful — not just in how they look, but how
          they work. I care about how users feel while using what I build. My
          toolkit shifts with the project, but you'll usually find me working
          with Next.js, Svelte, Supabase, and Tailwind. I've built everything
          from learning platforms to dashboards — with clean code and clean
          design going hand in hand. If it moves with purpose and looks like it
          belongs, I probably had something to do with it.
        </motion.p>

        {spotifyData?.isPlaying && (
          <motion.div
            className="mt-8 flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center mr-4">
              {spotifyData.albumArtUrl && (
                <Image
                  src={spotifyData.albumArtUrl}
                  alt="Album cover"
                  width={48}
                  height={48}
                  className="rounded"
                />
              )}
            </div>
            <div>
              <div className="text-sm">{spotifyData.title}</div>
              <div className="text-xs text-gray-500">{spotifyData.artist}</div>
            </div>
            <div className="ml-2 w-4 h-4 bg-green-500 rounded-sm"></div>
          </motion.div>
        )}
      </div>

      <motion.div
        variants={imageContainer}
        className="flex items-center justify-center"
        initial="hidden"
        animate="visible"
      >
        <div className="relative w-full h-[600px] lg:h-screen overflow-hidden">
          <ImageAnimate />
          <Image
            src="/user.webp?height=600&width=500"
            alt="Profile image with dot pattern"
            fill
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
