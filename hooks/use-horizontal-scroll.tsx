import { useRef, useState, useCallback, useEffect } from 'react';

interface UseHorizontalScrollProps {
  disabled?: boolean;
}

interface UseHorizontalScrollReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  scrollProgress: number;
  isScrolling: boolean;
}

export function useHorizontalScroll({
  disabled = false,
}: UseHorizontalScrollProps = {}): UseHorizontalScrollReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Use refs for values that don't need to trigger re-renders
  const scrollStateRef = useRef({
    isWheelEventProcessing: false,
    totalScroll: 0,
    maxScroll: 0,
  });

  // Memoize scroll calculation function
  const calculateMaxScroll = useCallback(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      scrollStateRef.current.maxScroll =
        contentElement.scrollWidth - contentElement.clientWidth;
    }
  }, []);

  useEffect(() => {
    if (disabled) return;

    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (scrollStateRef.current.isWheelEventProcessing) return;
      scrollStateRef.current.isWheelEventProcessing = true;

      e.preventDefault();

      const scrollAmount = e.deltaY * 1.5;

      scrollStateRef.current.totalScroll = Math.max(
        0,
        Math.min(
          scrollStateRef.current.totalScroll + scrollAmount,
          scrollStateRef.current.maxScroll
        )
      );

      const progress =
        scrollStateRef.current.maxScroll > 0
          ? scrollStateRef.current.totalScroll /
            scrollStateRef.current.maxScroll
          : 0;
      setScrollProgress(progress);

      if (contentRef.current) {
        contentRef.current.scrollLeft = scrollStateRef.current.totalScroll;
        setIsScrolling(true);
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollStateRef.current.isWheelEventProcessing = false;
        setIsScrolling(false);
      }, 50);
    };

    calculateMaxScroll();
    window.addEventListener('resize', calculateMaxScroll);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', calculateMaxScroll);
      clearTimeout(scrollTimeout);
    };
  }, [disabled, calculateMaxScroll]);

  return {
    containerRef,
    contentRef,
    scrollProgress,
    isScrolling,
  };
}
