import { X } from 'lucide-react'
import { ImageWithSkeleton } from './ui/image-with-skeleton'

interface CertificateModalProps {
  cert: { src: string; title: string; issuer: string; year: string; url?: string } | null
  onClose: () => void
}

export default function CertificateModal({ cert, onClose }: CertificateModalProps) {
  if (!cert) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 shadow-sm transition-all hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white cursor-pointer border border-neutral-200/80 dark:border-neutral-700/80"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="grid gap-6 sm:grid-cols-2 items-center">
          <ImageWithSkeleton
            src={cert.src}
            alt={cert.title}
            containerClassName="h-56 sm:h-64 w-full rounded-xl"
            className="h-full w-full rounded-xl object-cover"
          />
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 pr-8">{cert.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{cert.issuer} • {cert.year}</p>
            {cert.url && (
              <div className="mt-4">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-block rounded-xl px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Open certificate
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}