import { useState } from 'react';
import { motion } from 'framer-motion';

const AchievementsSection = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const achievements = [
    {
      year: "2024",
      title: "Innovation Ambassador",
      description: "Selected as Innovation Ambassador for IIC at MKCE for 2024-25",
      type: "Role",
      icon: "👑"
    },
    {
      year: "2025",
      title: "IBM Edunet Internship",
      description: "Completed industry-focused AI & Data Science internship with IBM Edunet Foundation",
      type: "Internship",
      icon: "💼",
      certificateImage: "/content/certificates/ibm-internship.jpg"
    },
    {
      year: "2025",
      title: "MSME Hackathon 5.0",
      description: "Successfully cleared Stage 1 with an innovative Solution for Low Carbon Footprints",
      type: "Hackathon",
      icon: "🥇"
    },
    
    {
      year: "2024",
      title: "Patent Filed - Smart Helmet",
      description: "Filed patent for emergency alert system, currently under review for publishing",
      type: "Patent",
      icon: "📜"
    },
    {
      year: "2024",
      title: "SIH 2024 Participant",
      description: "Participated in Smart India Hackathon, working on PMSS for Military families.",
      type: "Competition",
      icon: "🚀"
    },
    {
      year: "2025",
      title: "SIH 2025 Participant",
      description: "Participated in Smart India Hackathon, working on Migrant Workers Digital Health Record Managements in Kerala.",
      type: "Competition",
      icon: "🎓",
      certificateImage: "/content/certificates/aws-ml-specialist.jpg"
    }
  ];

  const handleCardClick = (index: number) => {
    const achievement = achievements[index];
    if (achievement.type === "Certification" && achievement.certificateImage) {
      setFlippedCards(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">🏆 Achievements</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Recognition & milestones on my innovation journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line - Responsive positioning */}
            <div className="absolute left-6 sm:left-8 lg:left-1/2 transform lg:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-secondary to-accent"></div>
            
            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:space-x-8`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"></div>
                  
                  {/* Content */}
                  <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                    <motion.div
                      className={`glass-strong rounded-2xl hover-float hover-glow overflow-hidden ${
                        achievement.type === "Certification" ? 'cursor-pointer' : ''
                      }`}
                      style={{ perspective: "1000px" }}
                      onClick={() => handleCardClick(index)}
                    >
                      <motion.div
                        className="relative w-full"
                        animate={{ rotateY: flippedCards.includes(index) ? 180 : 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Front of the card */}
                        <div 
                          className="w-full p-6"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{achievement.icon}</span>
                            <span className="text-sm font-medium text-accent">{achievement.type}</span>
                            <span className="text-sm text-muted-foreground ml-auto">{achievement.year}</span>
                            {achievement.type === "Certification" && (
                              <span className="text-xs text-primary">Click to view certificate</span>
                            )}
                          </div>
                          
                          <h3 className="text-xl font-semibold mb-2 gradient-text-secondary">
                            {achievement.title}
                          </h3>
                          
                          <p className="text-muted-foreground leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>

                        {/* Back of the card (for certifications) */}
                        {achievement.type === "Certification" && achievement.certificateImage && (
                          <div 
                            className="absolute inset-0 w-full p-6 flex flex-col items-center justify-center"
                            style={{ 
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg)"
                            }}
                          >
                            <div className="text-center mb-4">
                              <h3 className="text-lg font-semibold gradient-text mb-2">
                                {achievement.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">Certificate Image</p>
                            </div>
                            
                            <div className="w-full max-w-sm h-48 bg-muted/20 rounded-lg flex items-center justify-center border-2 border-dashed border-muted/40">
                              <div className="text-center">
                                <span className="text-4xl mb-2 block">📋</span>
                                <p className="text-sm text-muted-foreground">
                                  Certificate will be displayed here
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  (Upload certificate image to content/certificates/)
                                </p>
                              </div>
                            </div>
                            
                            <p className="text-xs text-muted-foreground mt-4">
                              Click again to flip back
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;