/**
 * Image Cache and Preload Utility
 * Provides in-memory tracking, browser preloading, and optional CacheStorage caching.
 */

export const loadedImagesCache = new Set<string>()

/**
 * Checks whether an image URL is already loaded and cached in memory.
 */
export function isImageCached(src?: string): boolean {
  if (!src) return false
  return loadedImagesCache.has(src)
}

/**
 * Preloads a single image into the browser cache and registers it in memory.
 * Also attempts to cache via the Cache Storage API if available.
 */
export function preloadImage(src: string): Promise<boolean> {
  if (!src) return Promise.resolve(false)
  if (loadedImagesCache.has(src)) return Promise.resolve(true)

  return new Promise((resolve) => {
    const img = new Image()
    img.src = src

    img.onload = () => {
      loadedImagesCache.add(src)
      // Cache Storage API for offline / persistent browser caching
      if (typeof window !== 'undefined' && 'caches' in window) {
        caches.open('portfolio-images-cache')
          .then((cache) => cache.add(src))
          .catch(() => {
            // Ignore cross-origin or unsupported scheme errors silently
          })
      }
      resolve(true)
    }

    img.onerror = () => {
      // Resolve false so batch operations continue smoothly
      resolve(false)
    }
  })
}

/**
 * Preloads an array of image URLs in parallel.
 */
export async function preloadImages(sources: string[]): Promise<void> {
  if (!sources || sources.length === 0) return
  await Promise.all(sources.map((src) => preloadImage(src)))
}
