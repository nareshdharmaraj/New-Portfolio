import { Button } from '@/components/ui/button';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles, Zap, Target, FileText } from 'lucide-react';

// Titles to cycle through with typewriter effect
const TITLES = [
  'AI & Data Science Engineer',
  'Web Developer','Problem Solver',
  'Innovation Ambassador'
];

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Typewriter animation states
  const [displayedText, setDisplayedText] = useState('');
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Profile photos array - add more photos by placing them in public/profile-photos/
  const profilePhotos = [
    '/profile-photos/profile-1.jpg',
    '/profile-photos/profile-2.jpg',
    '/profile-photos/profile-3.jpg'
    // Add more photos here as needed
  ];

  // Rotate through profile photos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % profilePhotos.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [profilePhotos.length]);

  // Typewriter effect for cycling titles
  useEffect(() => {
    const currentTitle = TITLES[currentTitleIndex];
    const typingSpeed = 80; // Speed for typing each character
    const deletingSpeed = 50; // Speed for deleting each character
    const pauseTime = 2000; // Pause time after completing a title

    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentTitle) {
      // Pause after completing the title
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === '') {
      // Move to next title after deleting
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length);
    } else if (isDeleting) {
      // Delete one character
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.substring(0, displayedText.length - 1));
      }, deletingSpeed);
    } else {
      // Type one character
      timeout = setTimeout(() => {
        setDisplayedText(currentTitle.substring(0, displayedText.length + 1));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTitleIndex]);

  // Handle sticky profile photo on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (profileRef.current) {
        const rect = profileRef.current.getBoundingClientRect();
        const navHeight = 80; // Approximate navigation bar height
        
        // Profile becomes sticky when it would scroll past the top of viewport
        const shouldBeSticky = rect.top <= navHeight && rect.bottom < window.innerHeight;
        setIsSticky(shouldBeSticky);
        
        // Debug log
        console.log('Sticky state:', shouldBeSticky, 'rect.top:', rect.top, 'navHeight:', navHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          {/* Left side - Text content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
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
                className="text-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl block min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem] lg:min-h-[4rem]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                {displayedText}
                <motion.span
                  className="inline-block w-0.5 h-5 sm:h-6 md:h-7 lg:h-9 bg-primary ml-1 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
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
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mt-8"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg"
                  className="cursor-target w-full sm:w-auto bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold glow-primary relative overflow-hidden"
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
                  size="lg"
                  className="cursor-target w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold relative overflow-hidden"
                  onClick={() => window.open(`${import.meta.env.BASE_URL}Naresh D - resume.pdf`, '_blank')}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <FileText className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Resume</span>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline"
                  size="lg"
                  className="cursor-target w-full sm:w-auto glass border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover-scale relative overflow-hidden"
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
          </div>

          {/* Right side - Hexagonal Profile Photo */}
          <motion.div
            ref={profileRef}
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            variants={itemVariants}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mb-8 lg:mb-0">
              {/* Glowing hexagonal border */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <polygon
                    points="50,5 90,25 90,75 50,95 10,75 10,25"
                    fill="none"
                    stroke="url(#hexGradient)"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                </svg>
              </motion.div>

              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.95, 1.05, 0.95],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full blur-xl">
                  <polygon
                    points="50,5 90,25 90,75 50,95 10,75 10,25"
                    fill="url(#hexGradient)"
                    opacity="0.4"
                  />
                </svg>
              </motion.div>

              {/* Hexagonal image container */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                      <clipPath id="hexClip">
                        <polygon points="50,8 88,28 88,72 50,92 12,72 12,28" />
                      </clipPath>
                    </defs>
                  </svg>
                  
                  {/* Profile images with fade transition */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {profilePhotos.map((photo, index) => (
                      <motion.img
                        key={photo}
                        src={`${import.meta.env.BASE_URL}${photo.startsWith('/') ? photo.slice(1) : photo}`}
                        alt={`Naresh D Profile ${index + 1}`}
                        className="absolute w-full h-full object-cover"
                        style={{
                          clipPath: 'polygon(50% 8%, 88% 28%, 88% 72%, 50% 92%, 12% 72%, 12% 28%)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: index === currentImageIndex ? 1 : 0,
                        }}
                        transition={{ duration: 1 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional decorative elements */}
              <motion.div
                className="absolute -inset-4 opacity-30"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-2 h-2 bg-primary rounded-full absolute top-0 left-1/2" />
                <div className="w-2 h-2 bg-secondary rounded-full absolute bottom-0 left-1/2" />
                <div className="w-2 h-2 bg-accent rounded-full absolute top-1/2 left-0" />
                <div className="w-2 h-2 bg-accent rounded-full absolute top-1/2 right-0" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="mt-4 sm:mt-6 flex justify-center"
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 px-4 max-w-7xl mx-auto"
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
      </motion.div>
    </section>
  );
};

export default HeroSection;