'use client';

import { useEffect, useState } from 'react';
import { RollingTitles } from '../rolling-title';
import LetterAnimate from './text-reveal';
import InfiniteCarousel from './infinite-carousel';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AnimatedName() {
  const isMobile = useIsMobile();
  let firstName = 'IFEANYI'.split('');
  let lastName = 'EMMANUEL'.split('');

  return (
    <div className="flex flex-col items-center">
      {/* Desktop Layout */}
      {!isMobile && (
        <div>
          <div className="flex items-center gap-4">
            <div className="w-full">
              <LetterAnimate
                data={firstName}
                className="text-[8rem] sm:text-[9rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-bold text-gray-400 leading-[0.85] tracking-tighter"
              />
            </div>
            <RollingTitles />
          </div>

          <LetterAnimate
            data={lastName}
            className="text-[8rem] sm:text-[9rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-bold text-gray-400 leading-[0.85] tracking-tighter"
          />
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div className="relative flex flex-col items-center justify-center h-[400px] w-full overflow-hidden">
          {/* Top Row - Right to Left */}
          <InfiniteCarousel text="IFEANYI EMMANUEL" direction="left" />

          {/* Middle - Rolling Title */}
          <RollingTitles />

          {/* Bottom Row - Left to Right */}
          <InfiniteCarousel text="IFEANYI EMMANUEL" direction="right" />
        </div>
      )}
    </div>
  );
}
