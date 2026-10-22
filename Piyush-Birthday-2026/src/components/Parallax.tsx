import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

// Moves its content slower than the page while it scrolls past, for depth.
export function Parallax({ children, amount = 60, className }: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [amount, -amount])
  return <motion.div ref={ref} className={className} style={{ y }}>{children}</motion.div>
}
