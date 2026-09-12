import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageWithSkeleton } from './ui/image-with-skeleton'
import { ChevronLeft, ChevronRight, Maximize2, X, Images } from 'lucide-react'

// Import Code Connect photos (6 images)
import codeConnect01 from '../assets/code connect/01.webp'
import codeConnect02 from '../assets/code connect/02.webp'
import codeConnect03 from '../assets/code connect/03.webp'
import codeConnect04 from '../assets/code connect/04.webp'
import codeConnect05 from '../assets/code connect/05.webp'
import codeConnect06 from '../assets/code connect/06.webp'

// Import KOICA training photos (4 images)
import koica01 from '../assets/KOICA training/752371645_799372853201399_1595168922641361854_n.webp'
import koica02 from '../assets/KOICA training/753738443_958106467245049_5368518652102475940_n.webp'
import koica03 from '../assets/KOICA training/753932816_1587276313002219_7133902288636821914_n.webp'
import koica04 from '../assets/KOICA training/754699820_1026988080247467_1145187470146971317_n.webp'

// Import ILCDB-DICT photos (4 images)
import ilcdb01 from '../assets/ILCDB-DICT/746661071_122129077755224496_3842201627723828445_n.webp'
import ilcdb02 from '../assets/ILCDB-DICT/747536732_122129077809224496_5419325080763265165_n.webp'
import ilcdb03 from '../assets/ILCDB-DICT/747561441_122129077743224496_9049096089464338659_n.webp'
import ilcdb04 from '../assets/ILCDB-DICT/747573336_122129077827224496_5771217729217214914_n.webp'

interface Program {
  id: string
  title: string
  subtitle: string
  description: string
  images: string[]
}

export default function WorkshopsSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'code-connect' | 'koica' | 'ilcdb'>('all')
  const [selectedGallery, setSelectedGallery] = useState<{ programTitle: string; images: string[]; activeIndex: number } | null>(null)

  const programs: Program[] = [
    {
      id: 'code-connect',
      title: 'Code Connect',
      subtitle: 'Software Development & Bootcamps',
      description: 'Intensive hands-on developer bootcamps and workshops focused on core programming foundations, modern web technologies, and team collaboration.',
      images: [codeConnect01, codeConnect02, codeConnect03, codeConnect04, codeConnect05, codeConnect06],
    },
    {
      id: 'koica',
      title: 'KOICA Training',
      subtitle: 'Global Capacity Development',
      description: 'International training program sponsored by Korea International Cooperation Agency, enhancing technical skills and sharing digital transformation strategies.',
      images: [koica01, koica02, koica03, koica04],
    },
    {
      id: 'ilcdb',
      title: 'ILCDB-DICT',
      subtitle: 'Government ICT Competency Training',
      description: 'ICT capability-building training administered by the Department of Information and Communications Technology - ILCDB, focused on advanced networking and system solutions.',
      images: [ilcdb01, ilcdb02, ilcdb03, ilcdb04],
    }
  ]

  const filteredPrograms = activeCategory === 'all' 
    ? programs 
    : programs.filter(p => p.id === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const },
    },
  }

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  }

  const openLightbox = (program: Program, index: number) => {
    setSelectedGallery({
      programTitle: program.title,
      images: program.images,
      activeIndex: index
    })
  }

  const handlePrevImage = () => {
    if (!selectedGallery) return
    setSelectedGallery(prev => prev ? {
      ...prev,
      activeIndex: (prev.activeIndex - 1 + prev.images.length) % prev.images.length
    } : null)
  }

  const handleNextImage = () => {
    if (!selectedGallery) return
    setSelectedGallery(prev => prev ? {
      ...prev,
      activeIndex: (prev.activeIndex + 1) % prev.images.length
    } : null)
  }

  const categories = [
    { id: 'all', label: 'Show All' },
    { id: 'code-connect', label: 'Code Connect' },
    { id: 'koica', label: 'KOICA Training' },
    { id: 'ilcdb', label: 'ILCDB-DICT' },
  ]

  return (
    <motion.section
      id="workshops"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={containerVariants}
      className="mt-20 py-12"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <motion.div variants={headerVariants} className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Workshops & Training
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl text-balance text-lg">
            A compilation of professional training courses, technical bootcamps, and specialized programs completed to continuously sharpen my technical skills.
          </p>
        </motion.div>

        {/* Categories Tab Selector Chips */}
        <motion.div variants={tabVariants} className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(cat.id as 'all' | 'code-connect' | 'koica' | 'ilcdb')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 cursor-pointer select-none ${
                  isActive
                    ? 'bg-shamrock-500 text-white shadow-md scale-105'
                    : 'bg-white/80 text-neutral-600 border border-neutral-200/80 hover:bg-neutral-100 dark:bg-neutral-900/60 dark:text-neutral-300 dark:border-neutral-800 dark:hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* Dynamic Program Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((program) => {
              const previewImages = program.images.slice(0, 3)
              const remainingCount = program.images.length - 3

              return (
                <motion.div
                  layout
                  key={program.id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800/80 dark:bg-neutral-900/40 backdrop-blur-sm"
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-shamrock-500 dark:text-shamrock-400 tracking-wider uppercase block">
                      {program.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mt-1">
                      {program.title}
                    </h3>
                    <p className="mt-3 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {program.description}
                    </p>
                  </div>

                  {/* Immediate Photo Preview Strip */}
                  <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5 text-shamrock-500" /> Program Photos ({program.images.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => openLightbox(program, 0)}
                        className="text-xs font-bold text-shamrock-600 hover:text-shamrock-500 dark:text-shamrock-400 dark:hover:text-shamrock-300 flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        View All
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {previewImages.map((imgSrc, i) => {
                        const isLast = i === 2 && remainingCount > 0
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => openLightbox(program, i)}
                            className="relative group/img overflow-hidden rounded-xl aspect-square border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-100 dark:bg-neutral-950 focus:outline-none cursor-pointer"
                          >
                            <ImageWithSkeleton
                              src={imgSrc}
                              alt={`${program.title} thumbnail ${i + 1}`}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                              containerClassName="h-full w-full"
                              loading="lazy"
                            />
                            {isLast ? (
                              <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center text-white font-bold text-xs">
                                +{remainingCount} more
                              </div>
                            ) : (
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white">
                                <Maximize2 className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox Image Modal */}
      <AnimatePresence>
        {selectedGallery && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGallery(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative z-10 w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:px-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
                <div>
                  <h3 className="text-white font-bold text-base sm:text-lg">
                    {selectedGallery.programTitle}
                  </h3>
                  <p className="text-neutral-400 text-xs mt-0.5">
                    Photo {selectedGallery.activeIndex + 1} of {selectedGallery.images.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedGallery(null)}
                  className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Image Stage */}
              <div className="relative h-[360px] sm:h-[480px] md:h-[540px] w-full bg-black flex items-center justify-center overflow-hidden p-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedGallery.activeIndex}
                    src={selectedGallery.images[selectedGallery.activeIndex]}
                    alt={`Gallery photo ${selectedGallery.activeIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                  />
                </AnimatePresence>

                {/* Left/Right Navigation Arrows */}
                {selectedGallery.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrevImage}
                      aria-label="Previous photo"
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white backdrop-blur-md transition-all border border-white/10 shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextImage}
                      aria-label="Next photo"
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-900 text-white backdrop-blur-md transition-all border border-white/10 shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Strip */}
              {selectedGallery.images.length > 1 && (
                <div className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center justify-center gap-2 overflow-x-auto">
                  {selectedGallery.images.map((imgSrc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setSelectedGallery((prev) =>
                          prev ? { ...prev, activeIndex: idx } : null
                        )
                      }
                      className={`relative h-14 w-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        selectedGallery.activeIndex === idx
                          ? 'border-shamrock-500 scale-105 opacity-100 shadow-md'
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgSrc}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
