'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import CustomCursor from '@/components/cursor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import { usePathname } from 'next/navigation';

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

export default function Providers({ children }: ProvidersProps) {
  const pathname = usePathname();
  const currentSection = pathname.split('/').pop() || 'home';

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        {children}
        <CustomCursor />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
