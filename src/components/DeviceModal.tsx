interface DeviceModalProps {
  device: { src: string; title: string; desc: string } | null
  onClose: () => void
}

export default function DeviceModal({ device, onClose }: DeviceModalProps) {
  if (!device) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative z-50 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-neutral-900 transition-all duration-300 ease-out">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/10 text-neutral-700 backdrop-blur-md hover:bg-black/20 hover:text-neutral-900 dark:bg-white/10 dark:text-neutral-300 dark:hover:bg-white/20 dark:hover:text-white"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Fixed aspect image container */}
        <div className="flex h-[400px] sm:h-[500px] w-full items-center justify-center bg-neutral-50 dark:bg-neutral-950/50">
          <img 
            src={device.src} 
            alt={device.title} 
            className="h-full w-full object-contain p-8 transition-transform duration-500 hover:scale-105" 
          />
        </div>

        {/* Text content area */}
        <div className="p-8">
          <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {device.title}
          </h3>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {device.desc}
          </p>
        </div>
      </div>
    </div>
  )
}