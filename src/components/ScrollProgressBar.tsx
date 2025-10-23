import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const ScrollProgressBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation for the progress with enhanced physics
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001
  });
  
  // Transform scroll progress to different visual effects
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.8, 1, 1, 0.8]);
  const glowIntensity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.2, 1, 1, 0.3]);
  const backgroundBlur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [2, 8, 8, 2]);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show progress bar after scrolling 30px for better responsiveness
      setIsVisible(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-1.5 bg-transparent"
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -10
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* Dynamic background track with blur effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-background/30 via-background/20 to-background/30 backdrop-blur-sm"
        style={{ 
          backdropFilter: useTransform(backgroundBlur, (latest) => `blur(${latest}px)`)
        }}
      />
      
      {/* Animated progress container */}
      <motion.div
        className="relative h-full overflow-hidden"
        style={{ opacity }}
      >
        {/* Main gradient progress bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-secondary to-accent origin-left relative"
          style={{ scaleX }}
        >
          {/* Inner gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-secondary/80 to-accent/80" />
        </motion.div>
        
        {/* Enhanced glow effect with pulsing */}
        <motion.div
          className="absolute inset-0 h-full bg-gradient-to-r from-primary/60 via-secondary/60 to-accent/60 blur-md origin-left"
          style={{ 
            scaleX,
            opacity: glowIntensity
          }}
          animate={{
            filter: ["blur(4px)", "blur(6px)", "blur(4px)"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Shimmer wave effect */}
        <motion.div
          className="absolute inset-0 h-full origin-left"
          style={{ scaleX }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{
              x: ["-100%", "300%"]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1
            }}
          />
        </motion.div>
        
        {/* Leading edge sparkle with trail */}
        <motion.div
          className="absolute top-0 right-0 w-6 h-full"
          style={{
            x: useTransform(scrollYProgress, [0, 1], ['-100%', '0%']),
            opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
          }}
        >
          <div className="w-full h-full bg-gradient-to-l from-white/90 via-white/50 to-transparent" />
          <motion.div
            className="absolute top-1/2 right-0 w-2 h-2 bg-white rounded-full transform -translate-y-1/2"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Progress particles effect */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
        >
          <motion.div
            className="absolute top-1/2 w-1 h-1 bg-white/60 rounded-full transform -translate-y-1/2"
            style={{
              left: useTransform(scrollYProgress, [0, 1], ['0%', '80%'])
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 w-1 h-1 bg-white/60 rounded-full transform -translate-y-1/2"
            style={{
              left: useTransform(scrollYProgress, [0, 1], ['20%', '85%'])
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 0.5,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-1/2 w-1 h-1 bg-white/60 rounded-full transform -translate-y-1/2"
            style={{
              left: useTransform(scrollYProgress, [0, 1], ['40%', '90%'])
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: 1,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Scroll percentage indicator with enhanced styling */}
      <motion.div
        className="absolute top-3 right-4 flex items-center space-x-2"
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0.7])
        }}
      >
        <motion.div
          className="text-xs font-mono text-primary/90 bg-background/90 px-3 py-1.5 rounded-full backdrop-blur-md border border-primary/20 shadow-lg"
          animate={{
            boxShadow: [
              "0 0 10px rgba(59, 130, 246, 0.3)",
              "0 0 20px rgba(59, 130, 246, 0.5)",
              "0 0 10px rgba(59, 130, 246, 0.3)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.span>
            {useTransform(scrollYProgress, (latest) => `${Math.round(latest * 100)}%`)}
          </motion.span>
        </motion.div>
        
        {/* Animated progress icon */}
        <motion.div
          className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ScrollProgressBar;
