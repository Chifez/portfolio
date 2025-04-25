import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Providers from "./providers"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio website",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#111111] text-gray-300">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
