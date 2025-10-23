import { Button } from '@/components/ui/button';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles, Zap, Target } from 'lucide-react';

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      }
    }
  };

  const floatingIcons = [
    { icon: Sparkles, delay: 0, x: "10%", y: "20%" },
    { icon: Zap, delay: 1, x: "80%", y: "30%" },
    { icon: Target, delay: 2, x: "15%", y: "70%" },
  ];

  return (
    <section 
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic background elements that follow mouse */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute w-32 sm:w-48 lg:w-72 h-32 sm:h-48 lg:h-72 bg-primary/30 rounded-full blur-3xl"
          style={{
            x: mousePosition.x * 50 - 25,
            y: mousePosition.y * 50 - 25,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-64 lg:w-96 h-40 sm:h-64 lg:h-96 bg-secondary/30 rounded-full blur-3xl"
          style={{
            x: mousePosition.x * -30 + 15,
            y: mousePosition.y * -30 + 15,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 lg:w-[500px] h-64 sm:h-80 lg:h-[500px] bg-accent/20 rounded-full blur-3xl"
          style={{
            x: mousePosition.x * 20 - 10,
            y: mousePosition.y * 20 - 10,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Floating icons */}
      {floatingIcons.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary/50" />
          </motion.div>
        );
      })}

      <motion.div 
        className="container mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            variants={itemVariants}
          >
            <motion.span 
              className="gradient-text block mb-2 sm:mb-4"
              animate={{
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              Hi, I'm Naresh D
            </motion.span>
            <motion.span 
              className="text-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl block"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              AI & Data Science Engineer | Web Developer | Innovation Ambassador
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-4"
            variants={itemVariants}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              Innovating with intelligence, research, and creativity.
            </motion.span>
            <br className="hidden sm:block" />
            <motion.span 
              className="block sm:inline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              From hackathons to patents → I turn ideas into impact.
            </motion.span>
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 sm:mt-12 px-4"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold glow-primary relative overflow-hidden"
                onClick={() => scrollToSection('projects')}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">View My Work</span>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outline"
                size="lg"
                className="w-full sm:w-auto glass border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover-scale relative overflow-hidden"
                onClick={() => scrollToSection('about')}
              >
                <motion.div
                  className="absolute inset-0 bg-primary/10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Learn More</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated scroll indicator */}
          <motion.div 
            className="mt-12 sm:mt-16 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground hover:text-primary transition-colors duration-300" />
            </motion.div>
          </motion.div>

          {/* Tech stats - responsive grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 px-4"
            variants={itemVariants}
          >
            <motion.div 
              className="glass p-4 sm:p-6 rounded-lg hover-float"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-2xl sm:text-3xl font-bold gradient-text-accent"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              >
                5
              </motion.div>
              <div className="text-sm sm:text-base text-muted-foreground mt-2">Projects Completed</div>
            </motion.div>
            <motion.div 
              className="glass p-4 sm:p-6 rounded-lg hover-float"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-2xl sm:text-3xl font-bold gradient-text-secondary"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 2.7 }}
              >
                1
              </motion.div>
              <div className="text-sm sm:text-base text-muted-foreground mt-2">Virtual Internships</div>
            </motion.div>
            <motion.div 
              className="glass p-4 sm:p-6 rounded-lg hover-float sm:col-span-2 lg:col-span-1"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div 
                className="text-2xl sm:text-3xl font-bold gradient-text"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 2.9 }}
              >
                3+
              </motion.div>
              <div className="text-sm sm:text-base text-muted-foreground mt-2">Technologies Mastered</div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;