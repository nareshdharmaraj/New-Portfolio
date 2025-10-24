import { useInView, motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Certificate {
  title: string;
  issuedBy: string;
  year: string;
  description: string;
  icon: string;
  certificateImage?: string;
}

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: false, // Animation triggers each time section comes into view
    margin: "-100px" 
  });

  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<NodeJS.Timeout | null>(null);

  const certificates: Certificate[] = [
    {
      title: "Innovation Ambassador",
      issuedBy: "MOE, IIC",
      year: "2024–25",
      description: "Foundation Level Training",
      icon: "👑",
      certificateImage: `${import.meta.env.BASE_URL}certificates/IA Online Training Certificate - foundation level.pdf`
    },
    {
      title: "Innovation Ambassador",
      issuedBy: "MOE, IIC",
      year: "2024–25",
      description: "MKCE - Leading innovation initiatives",
      icon: "👑",
      certificateImage: `${import.meta.env.BASE_URL}certificates/IA Participation Certificate.pdf`
    },
    {
      title: "IBM Edunet Foundation Internship",
      issuedBy: "IBM Edunet Foundation",
      year: "2025",
      description: "Virtual Internship",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/Intern ibm certificate - STU6864db32621cb1751440178.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "Applied Data Science with Python level 2",
      issuedBy: "IBM",
      year: "2025",
      description: "Certification",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "Bussiness Email",
      issuedBy: "HP Life",
      year: "2025",
      description: "Online course",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/Business Email.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    },
    {
      title: "AI powered IOT Boot Camp",
      issuedBy: "NoviTech",
      year: "2024",
      description: "Webinar Participation",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/ai webinar.pdf`
    }
  ];

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "💻",
      skills: [
        { name: "HTML", level: 80 },
        { name: "CSS", level: 80 },
        { name: "JavaScript", level: 40 },
        { name: "Java", level: 30 },
        { name: "Python", level: 30 },
        { name: "SQL", level: 70 },
        { name: "Java", level: 30 }
      ]
    },
    {
      title: "Tools",
      icon: "🔧",
      skills: [
        { name: "IBM Cloud", level: 40 },
        { name: "IBM SPSS", level: 90 },
        { name: "n8n", level: 30 },
        { name: "Excel", level: 70 },
        { name: "Word", level: 70 },
        { name: "PowerPoint", level: 70 }
      ]
    },
    {
      title: "Data Science",
      icon: "📊",
      skills: [
        { name: "Data Analysis", level: 35 },
        { name: "Statistics", level: 30 },
        { name: "Data Visualization", level: 40 }
      ]
    }
  ];

  // Carousel auto-scroll effect
  useEffect(() => {
    carouselRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % certificates.length);
    }, 5000); // 5 seconds per slide

    return () => {
      if (carouselRef.current) {
        clearInterval(carouselRef.current);
      }
    };
  }, [certificates.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
  };

  return (
    <section ref={sectionRef} className="py-6 sm:py-8 lg:py-10 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">⚡ Skills & Expertise</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Specialized in AI, data science, and software development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="glass-strong p-6 sm:p-8 rounded-2xl hover-float">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl">{category.icon}</span>
                <h3 className="text-xl sm:text-2xl font-semibold gradient-text-accent">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground text-sm sm:text-base">{skill.name}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-1.5 sm:h-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out hover:glow-primary"
                        style={{ 
                          width: isInView ? `${skill.level}%` : '0%',
                          transition: `width 1.5s ease-out ${skillIndex * 0.1}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Carousel */}
        <div className="mt-12 sm:mt-16 -mx-4 sm:-mx-6 lg:-mx-8">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center gradient-text-secondary px-4 sm:px-6 lg:px-8">📜 Certifications</h3>
          
          <div className="relative w-full overflow-hidden py-4">
            {/* Scrolling Container */}
            <motion.div 
              className="flex gap-6"
              animate={{
                x: ['0%', '-33.33%']
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear"
                }
              }}
            >
              {/* Render certificates three times for seamless infinite loop */}
              {[...certificates, ...certificates, ...certificates].map((cert, index) => (
                <motion.div
                  key={index}
                  className="glass-strong p-4 sm:p-5 rounded-xl hover-float flex-shrink-0 w-64 sm:w-72 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleDotClick(index % certificates.length)}
                >
                  <div className="text-3xl sm:text-4xl mb-3 text-center">{cert.icon}</div>
                  <h4 className="text-base sm:text-lg font-bold mb-2 gradient-text text-center line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-primary/80 font-medium mb-1 text-center">
                    Issued by: {cert.issuedBy}
                  </p>
                  <p className="text-xs text-muted-foreground/80 mb-2 text-center">
                    Year: {cert.year}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center line-clamp-2 mb-3">
                    {cert.description}
                  </p>
                  
                  {cert.certificateImage && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewCertificate(cert);
                      }}
                      className="w-full px-4 py-2 bg-gradient-primary text-white rounded-full font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      View Certificate
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {certificates.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? 'w-8 h-2 bg-gradient-primary'
                      : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Certificate Popup Modal */}
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={() => setSelectedCertificate(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative bg-background/95 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Certificate Header */}
                <div className="p-6 border-b border-border/50">
                  <h3 className="text-2xl font-bold gradient-text mb-2">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Issued by: <span className="text-primary font-medium">{selectedCertificate.issuedBy}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Year: <span className="text-primary font-medium">{selectedCertificate.year}</span>
                  </p>
                </div>

                {/* Certificate Image/PDF Viewer */}
                <div className="p-6 overflow-auto max-h-[calc(90vh-200px)] scrollbar-hide">
                  {selectedCertificate.certificateImage?.endsWith('.pdf') ? (
                    <iframe
                      src={selectedCertificate.certificateImage}
                      className="w-full h-[600px] rounded-lg border border-border/50"
                      title={selectedCertificate.title}
                    />
                  ) : selectedCertificate.certificateImage ? (
                    <img
                      src={selectedCertificate.certificateImage}
                      alt={selectedCertificate.title}
                      className="w-full h-auto rounded-lg shadow-lg object-contain"
                    />
                  ) : null}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;