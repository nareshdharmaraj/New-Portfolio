import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isBursting, setIsBursting] = useState(false);
  
  // Get the base URL for GitHub Pages deployment
  const baseUrl = import.meta.env.BASE_URL || '/';

  // Progress bar animation
  useEffect(() => {
    const duration = 3000; // 3 seconds to reach 100%
    const interval = 20; // Update every 20ms
    const increment = (100 / duration) * interval;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Show popup when progress reaches 100%
  useEffect(() => {
    if (progress >= 100 && !showPopup) {
      setTimeout(() => {
        setShowPopup(true);
      }, 300);
    }
  }, [progress, showPopup]);

  // Start burst animation after 5 seconds, then complete loading
  useEffect(() => {
    if (showPopup && !isBursting) {
      const timer = setTimeout(() => {
        setIsBursting(true);
        // Wait for burst animation to complete before hiding
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 300);
        }, 1500); // Duration of burst animation
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showPopup, isBursting, onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          {/* Background animated gradient - subtle overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-pink-500/10 to-blue-500/10 rounded-full blur-3xl"
            />
          </div>

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4">
            <AnimatePresence mode="wait">
              {!showPopup ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  {/* Robot GIF - Round shape */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="mb-8 relative"
                  >
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50" />
                    
                    {/* Round GIF container */}
                    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-purple-500/30 bg-background-secondary shadow-2xl">
                      <img
                        src={`${baseUrl}robot-4212.gif`}
                        alt="Loading Robot"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Progress text */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4 text-center"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Loading Portfolio
                    </h2>
                    <p className="text-lg md:text-xl font-semibold text-purple-300">
                      {Math.floor(progress)}%
                    </p>
                  </motion.div>

                  {/* Progress bar container */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-64 md:w-80 bg-gray-800/50 backdrop-blur-sm rounded-full p-1 shadow-xl"
                  >
                    <motion.div
                      className="h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full relative overflow-hidden"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1, ease: "linear" }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="relative max-w-md md:max-w-2xl w-full mx-4">
                  {/* Main popup box - only visible when not bursting */}
                  {!isBursting && (
                    <motion.div
                      key="popup"
                      initial={{ opacity: 0, scale: 0.5, y: 50 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="bg-background-secondary/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-purple-500/30 overflow-hidden"
                    >
                    {/* Popup content */}
                    <div className="relative p-8 md:p-12">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />

                    <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
                      {/* Welcome text */}
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="flex-1 text-center md:text-left"
                      >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">
                          Welcome to
                          <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                            My Portfolio
                          </span>
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base">
                          Explore my journey, projects, and skills
                        </p>

                        {/* Animated dots */}
                        <div className="flex justify-center md:justify-start gap-1 mt-4">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                              className="w-2 h-2 bg-purple-400 rounded-full"
                            />
                          ))}
                        </div>
                      </motion.div>

                      {/* Photo */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="relative"
                      >
                        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                          {/* Rotating gradient border */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md"
                          />
                          
                          {/* Photo container */}
                          <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-full p-1">
                            <img
                              src={`${baseUrl}IMG-20210305-WA0033.jpg`}
                              alt="Naresh Dharmaraj"
                              className="w-full h-full object-cover rounded-full shadow-2xl"
                            />
                          </div>

                          {/* Pulse effect */}
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                            }}
                            className="absolute inset-0 bg-purple-500/30 rounded-full"
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Progress indicator for popup */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 5, ease: "linear" }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
                      style={{ width: '100%' }}
                    />
                  </div>
                    </motion.div>
                  )}

                  {/* Burst pieces animation - fragments of the popup box */}
                  {isBursting && (
                    <div className="absolute inset-0 pointer-events-none">
                      {/* Create grid-based fragments of the box */}
                      {Array.from({ length: 6 }).map((_, row) => 
                        Array.from({ length: 8 }).map((_, col) => {
                          const i = row * 8 + col;
                          const angle = Math.atan2(row - 2.5, col - 3.5) + (Math.random() - 0.5) * 0.5;
                          const distance = 300 + Math.random() * 200;
                          const xOffset = Math.cos(angle) * distance;
                          const yOffset = Math.sin(angle) * distance * 0.5; // Less vertical spread initially
                          const rotation = (Math.random() - 0.5) * 720;
                          const delay = Math.random() * 0.15;

                          return (
                            <motion.div
                              key={`fragment-${i}`}
                              initial={{
                                x: (col - 4) * 80,
                                y: (row - 3) * 60,
                                scale: 1,
                                opacity: 1,
                                rotate: 0,
                              }}
                              animate={{
                                x: [(col - 4) * 80, xOffset],
                                y: [(row - 3) * 60, yOffset, yOffset + 1000],
                                scale: [1, 0.8, 0.3],
                                opacity: [1, 0.9, 0],
                                rotate: [0, rotation * 0.5, rotation],
                              }}
                              transition={{
                                duration: 1.5,
                                delay: delay,
                                ease: [0.25, 0.46, 0.45, 0.94],
                              }}
                              className="absolute top-1/2 left-1/2 bg-gradient-to-br from-background-secondary to-purple-900/80 backdrop-blur-xl shadow-xl"
                              style={{
                                width: 70,
                                height: 50,
                                marginLeft: -35,
                                marginTop: -25,
                                border: '1px solid rgba(168, 85, 247, 0.3)',
                                borderRadius: row === 0 && col <= 1 ? '24px 0 0 0' : 
                                              row === 0 && col >= 6 ? '0 24px 0 0' :
                                              row === 5 && col <= 1 ? '0 0 0 24px' :
                                              row === 5 && col >= 6 ? '0 0 24px 0' : '0',
                              }}
                            >
                              {/* Add texture to fragments */}
                              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent" />
                            </motion.div>
                          );
                        })
                      )}

                      {/* Explosion flash */}
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: [0, 1.5, 2],
                          opacity: [0, 0.6, 0]
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-purple-400 via-pink-400 to-transparent rounded-full blur-2xl"
                      />

                      {/* Sparkles and particles */}
                      {Array.from({ length: 30 }).map((_, i) => {
                        const angle = (i / 30) * Math.PI * 2;
                        const distance = 150 + Math.random() * 150;
                        const xOffset = Math.cos(angle) * distance;
                        const yOffset = Math.sin(angle) * distance;

                        return (
                          <motion.div
                            key={`sparkle-${i}`}
                            initial={{
                              x: 0,
                              y: 0,
                              scale: 0,
                              opacity: 1,
                            }}
                            animate={{
                              x: xOffset,
                              y: [yOffset, yOffset + 600],
                              scale: [0, 1, 0.5, 0],
                              opacity: [1, 1, 0.5, 0],
                            }}
                            transition={{
                              duration: 1.3,
                              delay: Math.random() * 0.1,
                              ease: "easeOut",
                            }}
                            className="absolute top-1/2 left-1/2 bg-white rounded-full shadow-lg"
                            style={{
                              width: 3 + Math.random() * 4,
                              height: 3 + Math.random() * 4,
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
