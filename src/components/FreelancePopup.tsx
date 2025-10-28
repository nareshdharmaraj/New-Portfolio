import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Sparkles } from 'lucide-react';

const FreelancePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const SHOW_DELAY = 40000; // 30 seconds
  const AUTO_CLOSE_DELAY = 20000; // 20 seconds after showing

  const handleClose = () => {
    setIsVisible(false);
    setHasShown(true);
  };

  const handleConnect = () => {
    // Scroll to contact section smoothly
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    handleClose();
  };

  useEffect(() => {
    // Don't show if already shown in this session
    if (hasShown) {
      return;
    }

    // Show popup after 10 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      
      // Auto-close after 15 seconds of being visible
      const autoCloseTimer = setTimeout(() => {
        handleClose();
      }, AUTO_CLOSE_DELAY);

      // Cleanup auto-close timer
      return () => clearTimeout(autoCloseTimer);
    }, SHOW_DELAY);

    // Cleanup show timer on unmount
    return () => {
      clearTimeout(showTimer);
    };
  }, [hasShown]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200] flex items-center justify-center"
            onClick={handleClose}
          >
            {/* Popup Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.4 
              }}
              className="relative z-[201] w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-w-[600px] max-h-[90vh] overflow-y-auto m-4"
              onClick={(e) => e.stopPropagation()}
            >
            <div className="relative glass-strong p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl border border-primary/30 bg-background/95 backdrop-blur-xl">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-background/50 hover:bg-primary/20 border border-primary/20 transition-colors group"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.button>

              {/* Decorative Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex justify-center mb-4 sm:mb-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 blur-xl bg-primary/30 rounded-full"
                  />
                </div>
              </motion.div>

              {/* Content */}
              <div className="text-center space-y-4 sm:space-y-5">
                {/* Main Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold gradient-text mb-2 sm:mb-3 flex items-center justify-center gap-2">
                    <span className="text-2xl sm:text-3xl">👀</span>
                    <span>Something caught your eye?</span>
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    I'm always open to turning inspiration into real-world projects.
                  </p>
                </motion.div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5"
                >
                  <p className="text-sm sm:text-base text-foreground leading-relaxed">
                    Whether it's a <span className="text-primary font-semibold">website</span>, 
                    {' '}<span className="text-secondary font-semibold">portfolio</span>, or 
                    {' '}<span className="text-accent font-semibold">creative idea</span> —<br />
                    I'd love to help you bring it alive.
                  </p>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-2"
                >
                  <p className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-5 flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Need a freelancer to work with?
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleConnect}
                      className="flex-1 px-6 py-3 sm:py-3.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary hover:to-primary text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                    >
                      Let's Connect 🚀
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      className="flex-1 px-6 py-3 sm:py-3.5 bg-background/50 hover:bg-background/80 border-2 border-primary/30 hover:border-primary/50 text-foreground font-semibold rounded-xl transition-all duration-300 text-sm sm:text-base"
                    >
                      Maybe Later
                    </motion.button>
                  </div>
                </motion.div>
              </div>

              {/* Decorative Corner Elements */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-tl-2xl pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-secondary/20 to-transparent rounded-br-2xl pointer-events-none"
              />
            </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FreelancePopup;
