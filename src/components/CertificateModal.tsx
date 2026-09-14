import { ImageWithSkeleton } from './ui/image-with-skeleton'

interface CertificateModalProps {
  cert: { src: string; title: string; issuer: string; year: string; url?: string } | null
  onClose: () => void
}

export default function CertificateModal({ cert, onClose }: CertificateModalProps) {
  if (!cert) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 mx-4 w-full max-w-3xl rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-900">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-neutral-100 cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="grid gap-4 md:grid-cols-2">
          <ImageWithSkeleton
            src={cert.src}
            alt={cert.title}
            containerClassName="h-64 w-full rounded-md"
            className="h-full w-full rounded-md object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{cert.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{cert.issuer} • {cert.year}</p>
            <div className="mt-4">
              {cert.url ? (
                <a href={cert.url} target="_blank" rel="noreferrer" className="btn-primary inline-block">Open certificate</a>
              ) : (
                <span className="inline-flex items-center rounded-md border border-neutral-200 px-3 py-2 text-sm">No link provided</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}