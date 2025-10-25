import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CertificateCarouselProps {
  children: React.ReactNode[];
  itemWidth?: number;
  gap?: number;
}

export const CertificateCarousel = ({ 
  children, 
  itemWidth = 180,
  gap = 16 
}: CertificateCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalItems = children.length;

  // Calculate positions for circular layout
  const getItemTransform = (index: number) => {
    const position = index - currentIndex;
    const angle = (position * 18) * (Math.PI / 180); // Reduced from 25 to 18 degrees for closer spacing
    const radius = 600; // Reduced from 800 for tighter curve
    
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius - radius;
    const rotateY = -angle * (180 / Math.PI);
    
    // Calculate scale and opacity based on position
    const distanceFromCenter = Math.abs(position);
    const scale = Math.max(0.6, 1 - distanceFromCenter * 0.12); // Improved scaling
    const opacity = Math.max(0.4, 1 - distanceFromCenter * 0.18); // Better visibility
    
    return {
      x,
      z,
      rotateY,
      scale,
      opacity,
      zIndex: 100 - Math.abs(position)
    };
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(currentIndex);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (startX - x) / 100; // Adjust sensitivity
    const newIndex = Math.round(scrollLeft + walk);
    setCurrentIndex(((newIndex % totalItems) + totalItems) % totalItems);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalItems]);

  return (
    <div className="relative w-full py-8 sm:py-12 overflow-hidden">
      {/* Left Arrow Button - Edge Positioned */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ 
          scale: 1.15,
          x: -5,
          boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.5)'
        }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-gradient-to-r from-primary/30 to-primary/20 hover:from-primary/50 hover:to-primary/40 backdrop-blur-md border border-primary/40 shadow-lg transition-all duration-300"
        aria-label="Previous certificate"
      >
        <motion.div
          animate={{
            x: [-2, 0, -2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary drop-shadow-lg" />
        </motion.div>
      </motion.button>

      {/* Right Arrow Button - Edge Positioned */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ 
          scale: 1.15,
          x: 5,
          boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.5)'
        }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNext}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-gradient-to-r from-primary/20 to-primary/30 hover:from-primary/40 hover:to-primary/50 backdrop-blur-md border border-primary/40 shadow-lg transition-all duration-300"
        aria-label="Next certificate"
      >
        <motion.div
          animate={{
            x: [2, 0, 2],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-primary drop-shadow-lg" />
        </motion.div>
      </motion.button>

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className="relative h-[280px] sm:h-[320px] md:h-[350px] lg:h-[380px] cursor-grab active:cursor-grabbing px-4 sm:px-8 md:px-12"
        style={{ perspective: '1500px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {children.map((child, index) => {
            const transform = getItemTransform(index);
            
            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  width: `${itemWidth}px`,
                  transformStyle: 'preserve-3d',
                  pointerEvents: Math.abs(index - currentIndex) <= 3 ? 'auto' : 'none'
                }}
                animate={{
                  x: transform.x,
                  z: transform.z,
                  rotateY: transform.rotateY,
                  scale: transform.scale,
                  opacity: transform.opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 120,
                  damping: 25,
                  mass: 0.8
                }}
                onClick={() => setCurrentIndex(index)}
              >
                <div style={{ zIndex: transform.zIndex }}>
                  {child}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Indicators */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
        {/* Indicators */}
        <div className="flex gap-1.5 sm:gap-2">
          {children.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-6 sm:w-8 bg-primary shadow-lg shadow-primary/50'
                  : 'w-1.5 sm:w-2 bg-primary/30 hover:bg-primary/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={index === currentIndex ? {
                boxShadow: [
                  '0 0 0px rgba(var(--primary-rgb), 0)',
                  '0 0 15px rgba(var(--primary-rgb), 0.8)',
                  '0 0 0px rgba(var(--primary-rgb), 0)'
                ]
              } : {}}
              transition={{
                boxShadow: { duration: 2, repeat: Infinity }
              }}
              aria-label={`Go to certificate ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Instructions */}
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4"
      >
        <span className="hidden sm:inline">Drag, scroll, or use arrow keys to navigate • </span>
        <span className="font-semibold text-primary">{currentIndex + 1}</span>
        <span className="text-muted-foreground/70"> / {children.length}</span>
      </motion.p>
    </div>
  );
};
