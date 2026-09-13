import { useRef, useState, useCallback, type MouseEvent as ReactMouseEvent } from 'react';
import normalImg from '@/assets/hero/normal.png';
import robotImg from '@/assets/hero/robot_form.png';
import './HeroImage.css';

interface HeroImageProps {
  className?: string;
  revealSize?: number;
}

const HeroImage = ({ className = '', revealSize = 180 }: HeroImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  const revealMask = isHovering
    ? `radial-gradient(circle ${revealSize}px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 70%, transparent 100%)`
    : `radial-gradient(circle 0px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 70%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      className={`hero-image-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base layer: normal image */}
      <img
        src={normalImg}
        alt="Pacifico Oyanib III"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="hero-image-base"
        draggable={false}
      />

      {/* Reveal layer: robot form, masked by cursor circle */}
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

      {/* Cursor ring indicator */}
      <span
        className={`hero-image-cursor ${isHovering ? 'hero-image-cursor--visible' : ''}`}
        style={{
          width: revealSize * 2,
          height: revealSize * 2,
          transform: `translate(${mousePos.x - revealSize}px, ${mousePos.y - revealSize}px)`,
        }}
      />
    </div>
  );
};

export default HeroImage;
