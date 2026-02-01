// components/CosmicBackground.tsx
"use client"

import { motion } from "framer-motion"

export default function CosmicBackground() {
  // Now a subtle, clean gradient “glass” layer instead of busy cosmic particles
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <motion.div
        className="absolute -inset-[30%] bg-[radial-gradient(circle_at_top,_#38bdf820,_transparent_55%),radial-gradient(circle_at_bottom,_#22c55e15,_transparent_55%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
    </div>
  )
}
