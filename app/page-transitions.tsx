"use client"

import { type ReactNode, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface PageTransitionsProps {
  children: ReactNode
}

export default function PageTransitions({ children }: PageTransitionsProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-4xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="page"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
