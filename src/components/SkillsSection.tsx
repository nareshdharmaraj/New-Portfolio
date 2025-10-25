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
    }
  ];

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
            initial={{ opacity: 0, y: 30 }}
            animate={certificatesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <CertificateCarousel itemWidth={200}>
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  className="relative glass-strong p-3 sm:p-4 rounded-lg cursor-pointer group h-full"
                  onClick={() => handleViewCertificate(cert)}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"
                    animate={hoveredIndex === index ? {
                      scale: [1, 1.15, 1],
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: hoveredIndex === index ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Icon with rotation animation */}
                  <motion.div 
                    className="text-2xl sm:text-3xl mb-2 text-center"
                    animate={hoveredIndex === index ? {
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    } : {}}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut"
                    }}
                  >
                    {cert.icon}
                  </motion.div>

                  <h4 className="text-xs sm:text-sm font-bold mb-1 gradient-text text-center line-clamp-2 min-h-[2rem]">
                    {cert.title}
                  </h4>
                  
                  <motion.div
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                  >
                    <p className="text-[10px] sm:text-xs text-primary/70 font-medium mb-0.5 text-center line-clamp-1">
                      {cert.issuedBy}
                    </p>
                    <p className="text-[10px] text-muted-foreground/60 text-center">
                      {cert.year}
                    </p>
                  </motion.div>

                  {/* View button with slide-up animation */}
                  <motion.button
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ 
                      y: hoveredIndex === index ? 0 : 5, 
                      opacity: hoveredIndex === index ? 1 : 0 
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewCertificate(cert);
                    }}
                    className="w-full mt-2 px-2 py-1.5 bg-gradient-primary text-white rounded-full font-medium text-[10px] sm:text-xs shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    View
                  </motion.button>

                  {/* Corner accent */}
                  <motion.div
                    className="absolute top-1 right-1 w-4 h-4 border-t border-r border-primary/30 rounded-tr-lg"
                    animate={hoveredIndex === index ? {
                      scale: [1, 1.3, 1],
                    } : {}}
                    transition={{
                      duration: 1,
                      repeat: hoveredIndex === index ? Infinity : 0,
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