import { useRef, useState, useCallback, useEffect, type MouseEvent as ReactMouseEvent } from 'react';
import normalImg from '@/assets/hero/normal.png';
import robotImg from '@/assets/hero/robot_form.png';
import { isImageCached, loadedImagesCache, preloadImage } from '@/lib/image-cache';
import './HeroImage.css';

interface HeroImageProps {
  className?: string;
  revealSize?: number;
}

const HeroImage = ({ className = '', revealSize = 180 }: HeroImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseImgRef = useRef<HTMLImageElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(() => isImageCached(normalImg));

  useEffect(() => {
    if (isImageCached(normalImg)) {
      setIsLoaded(true);
      return;
    }

    if (baseImgRef.current?.complete && baseImgRef.current.naturalWidth > 0) {
      loadedImagesCache.add(normalImg);
      setIsLoaded(true);
      return;
    }

    // Preload robot form in the background so reveal transition is seamless
    preloadImage(robotImg);
  }, []);

  const handleBaseLoad = useCallback(() => {
    loadedImagesCache.add(normalImg);
    setIsLoaded(true);
    preloadImage(robotImg);
  }, []);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isLoaded) {
      setIsHovering(true);
    }
  }, [isLoaded]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const revealMask = (isHovering && isLoaded)
    ? `radial-gradient(circle ${revealSize}px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 70%, transparent 100%)`
    : `radial-gradient(circle 0px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 70%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      className={`hero-image-container ${className} ${!isLoaded ? 'hero-image-container--loading' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Loading Fallback Skeleton */}
      {!isLoaded && (
        <div
          className="hero-image-fallback w-full aspect-square max-h-[580px] sm:max-h-[700px] md:max-h-[800px] lg:max-h-[880px] xl:max-h-[940px] rounded-3xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-pulse"
          aria-label="Loading hero portrait"
        >
          <div className="relative flex items-center justify-center mb-4">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 border-neutral-300 dark:border-neutral-700 border-t-shamrock-500 animate-spin" />
            <div className="absolute h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-shamrock-500/20" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
            Loading showcase...
          </span>
          <span className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1">
            Pacifico Oyanib III
          </span>
        </div>
      )}

      {/* Base layer: normal image */}
      <img
        ref={baseImgRef}
        src={normalImg}
        alt="Pacifico Oyanib III"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onLoad={handleBaseLoad}
        className={`hero-image-base transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}
        draggable={false}
      />

      {/* Reveal layer: robot form, masked by cursor circle */}
      {isLoaded && (
        <img
          src={robotImg}
          alt="Pacifico Oyanib III - Robot Form"
          loading="eager"
          decoding="async"
          className="hero-image-reveal"
          draggable={false}
          style={{
            WebkitMaskImage: revealMask,
            maskImage: revealMask,
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}

      {/* Cursor ring indicator */}
      {isLoaded && (
        <span
          className={`hero-image-cursor ${isHovering ? 'hero-image-cursor--visible' : ''}`}
          style={{
            width: revealSize * 2,
            height: revealSize * 2,
            transform: `translate(${mousePos.x - revealSize}px, ${mousePos.y - revealSize}px)`,
          }}
        />
      )}
    </div>
  );
};

export default HeroImage;

