import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const AchievementsSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">🏆 Achievements</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Recognition & milestones on my innovation journey
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const isExpanded = expandedCard === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  className="glass-strong rounded-2xl overflow-hidden hover-glow h-full flex flex-col"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  {/* Card Header */}
                  <div className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{achievement.icon}</span>
                      <span className="text-sm text-muted-foreground">{achievement.year}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 gradient-text-secondary line-clamp-2">
                      {achievement.title}
                    </h3>
                    
                    {/* Only show content when expanded */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {achievement.description}
                          </p>
                          
                          {achievement.type === "Certification" && achievement.certificateImage && (
                            <div className="mt-4 p-4 bg-muted/20 rounded-lg border-2 border-dashed border-muted/40">
                              <div className="text-center">
                                <span className="text-3xl mb-2 block">📋</span>
                                <p className="text-xs text-muted-foreground">
                                  Certificate will be displayed here
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  (Upload to content/certificates/)
                                </p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  {/* Type Badge Button - Always at bottom */}
                  <button
                    onClick={() => handleCardClick(index)}
                    className="w-full px-6 py-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 hover:from-primary/20 hover:via-secondary/20 hover:to-accent/20 border-t border-primary/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold gradient-text">
                        {achievement.type}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-primary group-hover:text-secondary transition-colors" />
                      </motion.div>
                    </div>
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;