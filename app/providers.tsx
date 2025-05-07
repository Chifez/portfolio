'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import CustomCursor from '@/components/cursor';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { NavigationProvider } from '@/lib/context/navigation-context';
import PageTransition from '@/components/animations/page-transitions';

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
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <NavigationProvider>
          <PageTransition>{children}</PageTransition>
          <CustomCursor />
          <Toaster position="top-right" />
        </NavigationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
