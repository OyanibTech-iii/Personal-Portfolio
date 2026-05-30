import { useState, type ImgHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

interface ImageWithSkeletonProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  containerClassName,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {isLoading && (
        <Skeleton className={cn("absolute inset-0 z-10", className)} />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          className,
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  )
}
