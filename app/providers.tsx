"use client"

import type { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import PageTransitions from "./page-transitions"
import CustomCursor from "@/components/cursor"

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <PageTransitions>{children}</PageTransitions>
      <CustomCursor />
    </ThemeProvider>
  )
}
