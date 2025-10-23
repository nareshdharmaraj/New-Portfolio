import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title: string;
  content: string;
  delay?: number;
}

const TypewriterText: React.FC<{ text: string; isActive: boolean }> = ({ text, isActive }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // Adjust typing speed here

      return () => clearTimeout(timer);
    }
  }, [text, currentIndex, isActive]);

  return (
    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-center px-2">
      {displayText}
      {isActive && currentIndex < text.length && (
        <span className="animate-pulse text-primary">|</span>
      )}
    </p>
  );
};

const FlipCard: React.FC<CardProps> = ({ title, content, delay = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={handleCardClick}
    >
      <motion.div
        className="relative w-full h-56 sm:h-64 md:h-72"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of the card */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-2xl hover:shadow-primary/20 transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-3 md:mb-4">
                {title}
              </h3>
              <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-3 md:mb-4"></div>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
                Click to reveal {title.toLowerCase()}
              </p>
            </div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-primary/60 group-hover:text-primary transition-colors duration-300">
              <svg width="16" height="16" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Back of the card */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/20 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-4 md:p-6 flex flex-col justify-center text-center shadow-2xl">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text mb-3 md:mb-4">
              {title}
            </h3>
            <div className="flex-1 flex items-center justify-center px-2 sm:px-0">
              <TypewriterText text={content} isActive={isFlipped} />
            </div>
            <p className="text-xs text-muted-foreground mt-3 md:mt-4">
              Click again to flip back
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const VisionMissionCards: React.FC = () => {
  const visionText = "To be at the forefront of AI-driven transportation innovation, shaping a future where accidents are minimized, systems are efficient, and technology truly serves humanity on the move.";
  
  const missionText = "My mission is to leverage artificial intelligence and data science in developing intelligent transportation solutions that prioritize safety, optimize efficiency, and integrate sustainability — ensuring every innovation moves us closer to accident-free, human-centered mobility.";

  return (
    <section className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text mb-4">
            My Vision & Mission
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Driven by purpose, guided by innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto">
          <FlipCard
            title="Vision"
            content={visionText}
            delay={0.2}
          />
          <FlipCard
            title="Mission"
            content={missionText}
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default VisionMissionCards;
