'use client';

import { cn } from '@/lib/utils';
import { RollingText } from './ui/rolling-text';

interface RollingTitlesProps {
  className?: string;
  prefix?: string;
}

export function RollingTitles({ className }: RollingTitlesProps) {
  const titles = [
    'FRONTEND ENGINEER',
    'FULLSTACK ENGINEER',
    'SOFTWARE ENGINEER',
  ];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center w-full h-28 max-w-3xl mx-auto p-2',
        className
      )}
    >
      <div className="perspective-1000 h-full w-full flex items-center overflow-hidden">
        <RollingText
          titles={titles}
          interval={3000}
          className="font-extrabold text-[1.7rem] md:text-xl lg:text-2xl"
        />
      </div>
    </div>
  );
}
