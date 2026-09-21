import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import CtaButton from './CtaButton'

interface DeviceModalProps {
  device: {
    src: string
    title: string
    desc: string
    images?: string[]
    imageLabels?: string[]
    link?: string
    externalText?: string
  } | null
  onClose: () => void
}

export default function DeviceModal({ device, onClose }: DeviceModalProps) {
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    setActiveIdx(0)
  }, [device])

  const images = device?.images && device.images.length > 0 ? device.images : (device ? [device.src] : [])
  const currentSrc = images[activeIdx] || device?.src || ''

  useEffect(() => {
    if (!device) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (images.length > 1) {
        if (e.key === 'ArrowLeft') {
          setActiveIdx((prev) => (prev - 1 + images.length) % images.length)
        } else if (e.key === 'ArrowRight') {
          setActiveIdx((prev) => (prev + 1) % images.length)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [device, images.length, onClose])

  if (!device) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative z-50 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-neutral-900 transition-all duration-300 ease-out">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 sm:right-4 sm:top-4 z-20 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full aspect-square shrink-0 p-0 bg-black/10 text-neutral-700 backdrop-blur-md hover:bg-black/20 hover:text-neutral-900 dark:bg-white/10 dark:text-neutral-300 dark:hover:bg-white/20 dark:hover:text-white cursor-pointer transition-all border border-black/5 dark:border-white/10"
          aria-label="Close"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {/* Fixed aspect image container */}
        <div className="relative flex h-[400px] sm:h-[500px] w-full items-center justify-center bg-neutral-50 dark:bg-neutral-950/50">
          <img 
            key={currentSrc}
            src={currentSrc} 
            alt={device.title} 
            className="h-full w-full object-contain p-8 transition-transform duration-500 hover:scale-105" 
            loading="lazy"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev - 1 + images.length) % images.length)}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-full aspect-square shrink-0 p-0 bg-black/60 text-white backdrop-blur-md border border-white/15 transition-all duration-200 hover:bg-black/80 hover:scale-105 active:scale-95 shadow-lg cursor-pointer select-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev + 1) % images.length)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-full aspect-square shrink-0 p-0 bg-black/60 text-white backdrop-blur-md border border-white/15 transition-all duration-200 hover:bg-black/80 hover:scale-105 active:scale-95 shadow-lg cursor-pointer select-none"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-[11px] sm:text-xs font-semibold text-white/95 shadow-md backdrop-blur-sm ring-1 ring-white/20 pointer-events-none">
                {device.imageLabels?.[activeIdx] ? `${device.imageLabels[activeIdx]} (${activeIdx + 1} of ${images.length})` : `View ${activeIdx + 1} of ${images.length}`}
              </div>
            </>
          )}
        </div>

        {/* Text content area */}
        <div className="p-8">
          <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {device.title}
          </h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {device.desc}
          </p>

          {device.link && (
            <div className="mt-4">
              <CtaButton
                href={device.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="arrow"
                size="md"
              >
                {device.externalText || 'View Post on Facebook'}
              </CtaButton>
            </div>
          )}

          {images.length > 1 && (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Angles / Views:</span>
              <div className="flex flex-wrap gap-2">
                {images.map((img, idx) => {
                  const label = device.imageLabels?.[idx]
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      title={label || `View ${idx + 1}`}
                      className={`flex items-center gap-2 overflow-hidden rounded-xl border-2 transition-all p-1.5 bg-neutral-100 dark:bg-neutral-800 cursor-pointer ${
                        activeIdx === idx
                          ? 'border-shamrock-500 ring-2 ring-shamrock-500/20 scale-105 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                        <img src={img} alt={label || `View ${idx + 1}`} className="h-full w-full object-contain" />
                      </div>
                      {label && (
                        <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 pr-1.5 whitespace-nowrap">
                          {label}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}