import { useState, useEffect, useRef, type ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"
import { isImageCached, loadedImagesCache } from "@/lib/image-cache"

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string
  skeletonClassName?: string
  showLoadingIndicator?: boolean
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  containerClassName,
  skeletonClassName,
  showLoadingIndicator = true,
  onLoad,
  onError,
  loading = "lazy",
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(() => (src ? !isImageCached(src) : true))
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (src && isImageCached(src)) {
      setIsLoading(false)
      return
    }

    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      if (src) loadedImagesCache.add(src)
      setIsLoading(false)
    }
  }, [src])

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (src) loadedImagesCache.add(src)
    setIsLoading(false)
    onLoad?.(e)
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false)
    setHasError(true)
    onError?.(e)
  }

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {isLoading && (
        <div className={cn("absolute inset-0 z-10 flex flex-col items-center justify-center bg-neutral-100/80 dark:bg-neutral-900/80", skeletonClassName)}>
          <Skeleton className="absolute inset-0 -z-10 h-full w-full rounded-inherit" />
          {showLoadingIndicator && (
            <div className="flex flex-col items-center justify-center gap-2 p-2 pointer-events-none select-none">
              <div className="h-6 w-6 rounded-full border-2 border-neutral-300 dark:border-neutral-700 border-t-shamrock-500 animate-spin" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Loading...
              </span>
            </div>
          )}
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-3 text-center bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
          <span className="text-xs font-medium">Unable to load image</span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={cn(
            className,
            "transition-opacity duration-500",
            isLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={loading}
          decoding="async"
          {...props}
        />
      )}
    </div>
  )
}
