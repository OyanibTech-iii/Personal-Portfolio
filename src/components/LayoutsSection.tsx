import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageWithSkeleton } from './ui/image-with-skeleton'
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from 'lucide-react'
import fashion from '../assets/layouts/FASHION.webp'
import step1 from '../assets/layouts/step 1.webp'
import step2 from '../assets/layouts/step 2.webp'
import step3 from '../assets/layouts/step 3.webp'

interface LayoutsSectionProps {
  onOpenDeviceModal?: (d: { src: string; title: string; desc: string }) => void
}

export default function LayoutsSection({ onOpenDeviceModal }: LayoutsSectionProps) {
  const layouts = [
    { src: fashion, title: 'Fashion Layout', desc: 'Clean magazine-style layout design with bold fashion imagery.' },
    { src: step1, title: 'Editorial Step 1', desc: 'Early-stage editorial grid exploring typography and flow.' },
    { src: step2, title: 'Editorial Step 2', desc: 'Refined composition balancing imagery, spacing and rhythm.' },
    { src: step3, title: 'Editorial Step 3', desc: 'Final editorial spread with polished hierarchy and detail.' },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<number>(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % layouts.length)
  }, [layouts.length])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + layouts.length) % layouts.length)
  }, [layouts.length])

  const handleSelect = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, handleNext])

  const currentItem = layouts[currentIndex]

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }
    })
  }

  return (
    <section id="layouts" className="mt-14 py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl text-neutral-900 dark:text-white"
          >
            Layouts Portfolio
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl text-balance"
          >
            A selection of editorial and page layout designs presented in a compact, interactive carousel.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative bg-neutral-900/90 dark:bg-neutral-900/90 border border-neutral-200/50 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Viewport */}
          <div className="relative h-[380px] sm:h-[480px] md:h-[540px] w-full overflow-hidden flex items-center justify-center bg-black/40">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) handleNext()
                  else if (info.offset.x > 50) handlePrev()
                }}
                className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 cursor-grab active:cursor-grabbing"
              >
                <div
                  className="relative max-h-full max-w-full flex items-center justify-center group cursor-pointer"
                  onClick={() =>
                    onOpenDeviceModal?.({
                      src: currentItem.src,
                      title: currentItem.title,
                      desc: currentItem.desc
                    })
                  }
                >
                  <ImageWithSkeleton
                    src={currentItem.src}
                    alt={currentItem.title}
                    className="max-h-[340px] sm:max-h-[420px] md:max-h-[460px] w-auto object-contain rounded-lg shadow-lg transition-transform duration-500 group-hover:scale-[1.02]"
                    containerClassName="flex items-center justify-center h-full w-full"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                    <span className="bg-black/75 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                      <Maximize2 className="w-3.5 h-3.5" /> View Full
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white backdrop-blur-md transition-all duration-200 border border-white/10 shadow-lg hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-neutral-900/70 hover:bg-neutral-900 text-white backdrop-blur-md transition-all duration-200 border border-white/10 shadow-lg hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Top Bar Status Badges */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="bg-black/60 backdrop-blur-md text-white/90 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
                {currentIndex + 1} / {layouts.length}
              </span>
              <button
                onClick={() => setIsAutoPlaying((prev) => !prev)}
                title={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
                className="bg-black/60 backdrop-blur-md text-white/80 hover:text-white p-1.5 rounded-full border border-white/10 transition-colors"
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Bottom Info Bar & Indicators */}
          <div className="p-4 sm:p-6 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-lg">{currentItem.title}</h3>
              <p className="text-neutral-400 text-sm mt-1 max-w-xl">{currentItem.desc}</p>
            </div>

            {/* Slide Pagination Dots */}
            <div className="flex items-center gap-2">
              {layouts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-8 bg-white'
                      : 'w-2.5 bg-neutral-600 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Thumbnail Selector Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {layouts.map((item, index) => {
            const isActive = index === currentIndex
            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                className={`relative group text-left rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  isActive
                    ? 'border-neutral-900 dark:border-white shadow-lg scale-[1.02]'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div className="h-20 bg-neutral-900/60 flex items-center justify-center p-2">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-2 bg-neutral-100 dark:bg-neutral-900/80">
                  <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                    {item.title}
                  </p>
                </div>
              </button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}