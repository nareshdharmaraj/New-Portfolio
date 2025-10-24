import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Home, User, Briefcase, Award, Code } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'achievements', label: 'Achievements', icon: Award },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 50], [0.95, 1]);
  const navBlur = useTransform(scrollY, [0, 50], [8, 16]);

  // Profile photos array
  const profilePhotos = [
    '/profile-photos/profile-1.jpg',
    '/profile-photos/profile-2.jpg',
  ];

  // Rotate through profile photos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % profilePhotos.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [profilePhotos.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Check if hero section has scrolled past
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        setIsSticky(rect.bottom < 100);
      }
      
      const sections = navItems.map(item => item.id);
      let currentSection = 'hero';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        style={{ opacity: navOpacity }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          style={{ backdropFilter: `blur(${navBlur}px)` }}
          className={`
            w-full px-4 sm:px-6 lg:px-8 py-3 lg:py-4
            bg-background/70 backdrop-blur-md border-b border-border/50
            transition-all duration-300
            ${isScrolled ? 'bg-background/90' : 'bg-background/70'}
            ${isHovered ? 'bg-background/95' : ''}
          `}
        >
          <div className="flex items-center justify-between gap-4">
            {/* Left Side - Sticky Profile + Logo/Brand */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              {/* Sticky Profile Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: isSticky ? 1 : 0,
                  scale: isSticky ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-10 h-10 sm:w-12 sm:h-12"
                style={{ 
                  pointerEvents: 'none',
                  display: isSticky ? 'block' : 'none'
                }}
              >
                {/* Glowing hexagonal border */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
                    <defs>
                      <linearGradient id="navHexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>
                    <polygon
                      points="50,5 90,25 90,75 50,95 10,75 10,25"
                      fill="rgba(0,0,0,0.3)"
                      stroke="url(#navHexGradient)"
                      strokeWidth="3"
                    />
                  </svg>
                </motion.div>

                {/* Profile image */}
                <div className="absolute inset-0 flex items-center justify-center p-0.5">
                  <div className="relative w-full h-full">
                    {profilePhotos.map((photo, index) => (
                      <motion.img
                        key={`nav-${photo}`}
                        src={`${import.meta.env.BASE_URL}${photo.startsWith('/') ? photo.slice(1) : photo}`}
                        alt="Naresh D"
                        className="absolute w-full h-full object-cover"
                        style={{
                          clipPath: 'polygon(50% 8%, 88% 28%, 88% 72%, 50% 92%, 12% 72%, 12% 28%)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                        transition={{ duration: 1 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Logo/Brand */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0"
              >
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  NARESH D
                </h1>
              </motion.div>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 overflow-x-auto">
              <div className="flex items-center space-x-1 sm:space-x-2">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={`
                          cursor-target relative overflow-hidden transition-all duration-300 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm
                          ${isActive 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                            : 'hover:bg-primary/10 hover:text-primary'
                          }
                        `}
                        onClick={() => scrollToSection(item.id)}
                      >
                        <motion.div
                          whileHover={{ 
                            rotate: [0, -10, 10, 0],
                            transition: { duration: 0.5 }
                          }}
                          className="flex items-center"
                        >
                          <Icon className="w-3 h-3 sm:w-4 sm:h-4 sm:mr-1 lg:mr-2" />
                          <span className="hidden sm:inline text-xs lg:text-sm">{item.label}</span>
                        </motion.div>
                        
                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-md"
                            initial={false}
                            transition={{ type: "spring", duration: 0.6 }}
                          />
                        )}
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Navigation Spacer */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};

export default Navigation;