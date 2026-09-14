import { useState, useEffect, useRef, type ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"
import { isImageCached, loadedImagesCache } from "@/lib/image-cache"

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string
  skeletonClassName?: string
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  containerClassName,
  skeletonClassName,
  onLoad,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(() => (src ? !isImageCached(src) : true))
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

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {isLoading && (
        <Skeleton className={cn("absolute inset-0 z-10", skeletonClassName || className)} />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn(
          className,
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={handleLoad}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  )
}
