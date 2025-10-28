import { useInView, motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CertificateCarousel } from './CertificateCarousel';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const certificatesRef = useRef<HTMLDivElement>(null);
  const certificatesInView = useInView(certificatesRef, { 
    once: false,
    margin: "-100px" 
  });

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
      description: "Advanced Level Training",
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
      title: "Data analysis with python",
      issuedBy: "Cognitive class AI",
      year: "2024",
      description: "Online course",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/Data analysis with python.pdf`
    },
    {
      title: "Data Visualization",
      issuedBy: "Cognitive Class AI",
      year: "2025",
      description: "Online course",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/data visualization.pdf`
    },
    {
      title: "Describe Azure compute and networking services",
      issuedBy: "Microsoft",
      year: "2025",
      description: "Online course",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/Describe Azure compute and networking services.pdf`
    },
    {
      title: "Describe Azure storage services",
      issuedBy: "Microsoft",
      year: "2025",
      description: "Online Course",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/Describe Azure storage services- nareshd-3708.pdf`
    },
    {
      title: "Describe Cloud Computing",
      issuedBy: "Microsoft",
      year: "2025",
      description: "Online Course",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/Describe cloud computing - microsoft learn - naresh d.pdf`
    },
    {
      title: "Describe cloud service types",
      issuedBy: "Microsoft",
      year: "2025",
      description: "Online courses",
      icon: "🏢",
      certificateImage: `${import.meta.env.BASE_URL}certificates/Describe cloud service types - microsoft learn - naresh d.pdf`
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
    },
    {
      title: "Soft Skills",
      icon: "🤝",
      skills: [
        { name: "Time Management", level: 85 },
        { name: "Analytical Thinking", level: 80 },
        { name: "Team Collaboration", level: 90 },
        { name: "Adaptability", level: 85 },
        { name: "Effective Communication", level: 80 },
        { name: "Leadership", level: 75 }
      ]
    }
  ];

  const handleViewCertificate = (certificate: Certificate) => {
    // For PDFs, open in new tab directly
    if (certificate.certificateImage?.endsWith('.pdf')) {
      window.open(certificate.certificateImage, '_blank', 'noopener,noreferrer');
    } else {
      // For images, show in modal
      setSelectedCertificate(certificate);
    }
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

        {/* Certifications Circular Carousel */}
        <div ref={certificatesRef} className="mt-12 sm:mt-16">
          <motion.h3 
            className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10 text-center gradient-text-secondary"
            initial={{ opacity: 0, y: 20 }}
            animate={certificatesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            📜 Certifications ({certificates.length}+)
          </motion.h3>
          
          {/* Circular 3D Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={certificatesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <CertificateCarousel itemWidth={220}>
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative glass-strong p-4 sm:p-5 rounded-xl cursor-pointer group h-full border border-primary/10 hover:border-primary/30 transition-colors duration-300"
                  onClick={() => handleViewCertificate(cert)}
                  whileHover={{ 
                    scale: 1.03,
                    y: -5,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
                    animate={hoveredIndex === index ? {
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: hoveredIndex === index ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Icon with rotation animation */}
                  <motion.div 
                    className="text-3xl sm:text-4xl mb-3 text-center relative z-10"
                    animate={hoveredIndex === index ? {
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.15, 1]
                    } : {}}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                  >
                    {cert.icon}
                  </motion.div>

                  <motion.div
                    animate={hoveredIndex === index ? { y: -2 } : { y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="text-sm sm:text-base font-bold mb-2 gradient-text text-center line-clamp-2 min-h-[2.5rem] relative z-10">
                      {cert.title}
                    </h4>
                    
                    <motion.div
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <p className="text-xs sm:text-sm text-primary/80 font-medium mb-1 text-center line-clamp-1">
                        {cert.issuedBy}
                      </p>
                      <p className="text-xs text-muted-foreground/70 text-center">
                        {cert.year}
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* View button with slide-up animation */}
                  <motion.button
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ 
                      y: hoveredIndex === index ? 0 : 10, 
                      opacity: hoveredIndex === index ? 1 : 0 
                    }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewCertificate(cert);
                    }}
                    className="w-full mt-3 px-3 py-2 bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg font-semibold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all duration-300 relative z-10"
                  >
                    View Certificate
                  </motion.button>

                  {/* Corner accent with pulse */}
                  <motion.div
                    className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-primary/40 rounded-tr-lg"
                    animate={hoveredIndex === index ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredIndex === index ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Bottom accent */}
                  <motion.div
                    className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-secondary/40 rounded-bl-lg"
                    animate={hoveredIndex === index ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredIndex === index ? Infinity : 0,
                      ease: "easeInOut",
                      delay: 0.3
                    }}
                  />
                </motion.div>
              ))}
            </CertificateCarousel>
          </motion.div>
        </div>

        {/* Certificate Popup Modal */}
        <AnimatePresence>
          {selectedCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4"
              onClick={() => setSelectedCertificate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative bg-background/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary/20 max-w-6xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-background/90 hover:bg-primary/20 border border-primary/30 transition-colors shadow-lg group"
                >
                  <X className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.button>

                {/* Certificate Header */}
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 sm:p-8 border-b border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">
                    {selectedCertificate.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <p className="text-muted-foreground">
                      Issued by: <span className="text-primary font-semibold">{selectedCertificate.issuedBy}</span>
                    </p>
                    <p className="text-muted-foreground">
                      Year: <span className="text-primary font-semibold">{selectedCertificate.year}</span>
                    </p>
                  </div>
                </motion.div>

                {/* Certificate Image/PDF Viewer */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 sm:p-8 overflow-auto max-h-[calc(90vh-200px)] scrollbar-hide"
                >
                  {selectedCertificate.certificateImage?.endsWith('.pdf') ? (
                    <motion.iframe
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      src={selectedCertificate.certificateImage}
                      className="w-full h-[600px] rounded-xl border border-border/50 shadow-lg"
                      title={selectedCertificate.title}
                    />
                  ) : selectedCertificate.certificateImage ? (
                    <motion.img
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      src={selectedCertificate.certificateImage}
                      alt={selectedCertificate.title}
                      className="w-full h-auto rounded-xl shadow-2xl object-contain"
                    />
                  ) : null}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;