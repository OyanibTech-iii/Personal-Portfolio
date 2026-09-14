import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ImageWithSkeleton } from './ui/image-with-skeleton'
import { ChevronLeft, ChevronRight, Maximize2, X, Images, Sparkles, LayoutGrid, Layers } from 'lucide-react'

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
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0)
  const [viewMode, setViewMode] = useState<'spotlight' | 'grid'>('spotlight')
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

  const handleCategoryChange = (catId: 'all' | 'code-connect' | 'koica' | 'ilcdb') => {
    setActiveCategory(catId)
    setActiveImageIndex(0)
  }

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

  const handlePrevImage = useCallback(() => {
    if (!selectedGallery) return
    setSelectedGallery(prev => prev ? {
      ...prev,
      activeIndex: (prev.activeIndex - 1 + prev.images.length) % prev.images.length
    } : null)
  }, [selectedGallery])

  const handleNextImage = useCallback(() => {
    if (!selectedGallery) return
    setSelectedGallery(prev => prev ? {
      ...prev,
      activeIndex: (prev.activeIndex + 1) % prev.images.length
    } : null)
  }, [selectedGallery])

  // Keyboard navigation for lightbox modal
  useEffect(() => {
    if (!selectedGallery) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrevImage()
      else if (e.key === 'ArrowRight') handleNextImage()
      else if (e.key === 'Escape') setSelectedGallery(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedGallery, handlePrevImage, handleNextImage])

  const categories = [
    { id: 'all', label: 'Show All' },
    { id: 'code-connect', label: 'Code Connect' },
    { id: 'koica', label: 'KOICA Training' },
    { id: 'ilcdb', label: 'ILCDB-DICT' },
  ]

  const currentProgram = activeCategory !== 'all' 
    ? programs.find(p => p.id === activeCategory) 
    : null

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
                onClick={() => handleCategoryChange(cat.id as 'all' | 'code-connect' | 'koica' | 'ilcdb')}
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

        {/* Dynamic Display Area */}
        <AnimatePresence mode="wait">
          {/* CASE 1: 'Show All' Tab - Preserved 3-Column Overview Grid */}
          {activeCategory === 'all' && (
            <motion.div
              key="all-grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
            >
              {programs.map((program) => {
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
                              aria-label={`View ${program.title} photo ${i + 1}`}
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
            </motion.div>
          )}

          {/* CASE 2: Specific Chip Selected - Responsive Bigger Display Showing All Data & Images */}
          {activeCategory !== 'all' && currentProgram && (
            <motion.div
              key={currentProgram.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col rounded-3xl border border-neutral-200/80 bg-white p-6 sm:p-8 md:p-10 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/40 backdrop-blur-sm"
            >
              {/* Top Header & Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6 dark:border-neutral-800">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold bg-shamrock-50 dark:bg-shamrock-950/60 text-shamrock-600 dark:text-shamrock-400 border border-shamrock-200/60 dark:border-shamrock-800/40 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-shamrock-500" />
                    {currentProgram.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-3">
                    {currentProgram.title}
                  </h3>
                </div>

                {/* View Mode Switcher & Stats */}
                <div className="flex items-center gap-3 self-start sm:self-center">
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-3 py-1.5 rounded-full">
                    <Images className="w-3.5 h-3.5 text-shamrock-500" />
                    {currentProgram.images.length} Photos
                  </span>

                  <div className="inline-flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60">
                    <button
                      type="button"
                      onClick={() => setViewMode('spotlight')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        viewMode === 'spotlight'
                          ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" /> Spotlight
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        viewMode === 'grid'
                          ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-xs'
                          : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" /> Grid View
                    </button>
                  </div>
                </div>
              </div>

              {/* Program Description & Action Bar */}
              <div className="py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <p className="text-neutral-600 dark:text-neutral-300 text-base sm:text-lg leading-relaxed max-w-3xl">
                  {currentProgram.description}
                </p>
                <button
                  type="button"
                  onClick={() => openLightbox(currentProgram, activeImageIndex)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-shamrock-600 hover:text-shamrock-500 dark:text-shamrock-400 dark:hover:text-shamrock-300 shrink-0 transition-colors cursor-pointer"
                >
                  <Maximize2 className="w-4 h-4" /> Open Fullscreen Slideshow
                </button>
              </div>

              {/* VIEW MODE 1: SPOTLIGHT (Expansive Hero Stage + All Photos Grid) */}
              {viewMode === 'spotlight' && (
                <div className="flex flex-col mt-2">
                  {/* Hero Showcase Stage */}
                  <div
                    onClick={() => openLightbox(currentProgram, activeImageIndex)}
                    className="relative w-full h-[320px] sm:h-[440px] md:h-[500px] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 shadow-md group cursor-pointer"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeImageIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full"
                      >
                        <ImageWithSkeleton
                          src={currentProgram.images[activeImageIndex]}
                          alt={`${currentProgram.title} photo ${activeImageIndex + 1}`}
                          className="w-full h-full object-contain"
                          containerClassName="w-full h-full"
                          loading="eager"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Top Status Badges */}
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium border border-white/10 shadow-sm">
                        Photo {activeImageIndex + 1} of {currentProgram.images.length}
                      </span>
                    </div>

                    {/* Click to Enlarge Floating Pill */}
                    <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
                      <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-semibold border border-white/15 shadow-md">
                        <Maximize2 className="w-3.5 h-3.5 text-shamrock-400" /> Click to enlarge
                      </span>
                    </div>

                    {/* Navigation Arrows for Stage */}
                    {currentProgram.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveImageIndex((prev) => (prev - 1 + currentProgram.images.length) % currentProgram.images.length)
                          }}
                          aria-label="Previous photo"
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-all shadow-lg hover:scale-110 active:scale-95 z-20 cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveImageIndex((prev) => (prev + 1) % currentProgram.images.length)
                          }}
                          aria-label="Next photo"
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/15 transition-all shadow-lg hover:scale-110 active:scale-95 z-20 cursor-pointer"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* All Photos Gallery Strip Below Hero Stage */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                        <Images className="w-4 h-4 text-shamrock-500" />
                        All Program Photos ({currentProgram.images.length})
                      </span>
                      <span className="text-xs text-neutral-400">
                        Click any image to preview or view full resolution
                      </span>
                    </div>

                    <div className={`grid gap-3 sm:gap-4 ${
                      currentProgram.images.length > 4 
                        ? 'grid-cols-3 sm:grid-cols-6' 
                        : 'grid-cols-2 sm:grid-cols-4'
                    }`}>
                      {currentProgram.images.map((imgSrc, idx) => {
                        const isSelected = activeImageIndex === idx
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveImageIndex(idx)}
                            aria-label={`Select photo ${idx + 1}`}
                            className={`group/thumb relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all cursor-pointer bg-neutral-100 dark:bg-neutral-950 focus:outline-none ${
                              isSelected
                                ? 'border-shamrock-500 ring-2 ring-shamrock-500/30 scale-[1.02] shadow-md'
                                : 'border-neutral-200/80 dark:border-neutral-800 hover:border-shamrock-400/60 opacity-80 hover:opacity-100'
                            }`}
                          >
                            <ImageWithSkeleton
                              src={imgSrc}
                              alt={`${currentProgram.title} photo ${idx + 1}`}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                              containerClassName="h-full w-full"
                              loading="lazy"
                            />
                            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white">
                              #{idx + 1}
                            </div>
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW MODE 2: EXPANDED GRID VIEW (All Photos Displayed in Large Format) */}
              {viewMode === 'grid' && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs sm:text-sm font-semibold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                      <Images className="w-4 h-4 text-shamrock-500" />
                      All Program Photos ({currentProgram.images.length})
                    </span>
                    <span className="text-xs text-neutral-400">
                      Click any photo to open full resolution
                    </span>
                  </div>

                  <div className={`grid gap-4 sm:gap-6 ${
                    currentProgram.images.length > 4
                      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2'
                  }`}>
                    {currentProgram.images.map((imgSrc, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => openLightbox(currentProgram, idx)}
                        aria-label={`Open ${currentProgram.title} photo ${idx + 1}`}
                        className="group relative rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 aspect-[16/10] focus:outline-none cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                      >
                        <ImageWithSkeleton
                          src={imgSrc}
                          alt={`${currentProgram.title} photo ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          containerClassName="h-full w-full"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-40 group-hover:opacity-80 transition-opacity" />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-semibold border border-white/10">
                          Photo {idx + 1} of {currentProgram.images.length}
                        </div>
                        <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4 text-shamrock-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
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
                      aria-label={`Jump to photo ${idx + 1}`}
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

