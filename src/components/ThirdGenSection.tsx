import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { RotateCw, ExternalLink, Globe } from 'lucide-react'
import CtaButton from './CtaButton'

export default function ThirdGenSection() {
  const [isLoading, setIsLoading] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleReload = () => {
    setIsLoading(true)
    setIframeKey((prev) => prev + 1)
  }

  return (
    <section id="third-gen" className="mt-20 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-white"
          >
            Featured Website
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl text-balance text-lg"
          >
            Interactive live preview of THIRD GEN. Explore 3D character figurines directly below or visit the website in a new tab.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ delay: 0.15 }}
          className="group relative flex flex-col rounded-3xl border border-neutral-200/80 bg-white shadow-sm transition-all duration-300 dark:border-neutral-800/80 dark:bg-neutral-900/40 backdrop-blur-sm overflow-hidden"
        >
          {/* Top Browser / Window Chrome Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/80 dark:bg-neutral-900/80">
            {/* Monochrome Window Controls - No extra colors */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-3 w-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              <span className="h-3 w-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            </div>

            {/* Address bar mockup */}
            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 font-mono select-none max-w-[200px] sm:max-w-none truncate">
              <Globe className="h-3.5 w-3.5 shrink-0 text-neutral-400 dark:text-neutral-500" />
              <span className="truncate">thirdgen.vercel.app</span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReload}
                className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
                title="Reload preview"
                aria-label="Reload preview"
              >
                <RotateCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
              <a
                href="https://thirdgen.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-200/60 dark:hover:bg-neutral-800 transition-colors"
                title="Open in new window"
                aria-label="Open in new window"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Iframe Viewport Container */}
          <div className="relative w-full h-[460px] sm:h-[560px] lg:h-[640px] bg-neutral-100/50 dark:bg-neutral-950/50">
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-100/80 dark:bg-neutral-950/80 backdrop-blur-xs">
                <div className="h-8 w-8 rounded-full border-2 border-neutral-300 border-t-neutral-800 dark:border-neutral-700 dark:border-t-neutral-200 animate-spin mb-3" />
                <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">Loading interactive preview...</p>
              </div>
            )}

            <iframe
              key={iframeKey}
              ref={iframeRef}
              src="https://thirdgen.vercel.app/"
              title="THIRD GEN | Figurines Website Preview"
              className={`w-full h-full border-0 transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Bottom Information and CTA Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/20">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                THIRD GEN
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                An interactive 3D character figurine showcase website built with modern web technologies, smooth carousel animations, and dynamic transitions.
              </p>
            </div>

            <div className="w-full sm:w-auto shrink-0">
              <CtaButton
                href="https://thirdgen.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                variant="visit"
                size="md"
                className="w-full sm:w-auto"
              >
                Visit Website
              </CtaButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
