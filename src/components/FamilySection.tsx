import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { Heart, GraduationCap, Briefcase } from 'lucide-react';

const FamilySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: false,
    margin: "-100px" 
  });

  const familyMembers = [
    {
      relation: "Father",
      name: "Dharmaraj K",
      profession: "Admission Officer",
      institution: "M. Kumarasamy College of Engineering, Karur",
      description: "A true pillar of our family, my father's dedication and encouragement have been the foundation of my growth. His unwavering support and values have shaped my journey and inspired my achievements.",
      icon: Briefcase,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      relation: "Mother",
      name: "Dr. K. Sudha",
      profession: "Guest Lecturer in Tamil",
      institution: "NKR College for Women, Namakkal",
      description: "My mother's love, wisdom, and tireless care are the heart of our family. Her belief in me and her sacrifices have been the driving force behind my success and happiness.",
      icon: GraduationCap,
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-10 sm:mb-14 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 fill-red-500 animate-pulse" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="gradient-text">Family Acknowledgment</span>
            </h2>
            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 fill-red-500 animate-pulse" />
          </div>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A heartfelt thank you to the pillars of my life who have been the foundation of my journey and achievements
          </p>
        </motion.div>

        {/* Family Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto">
          {familyMembers.map((member, index) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Card */}
                <div className="glass-strong p-6 sm:p-8 rounded-2xl hover-float relative overflow-hidden h-full">
                  {/* Gradient Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${member.gradient}`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header with Icon */}
                    <div className="flex items-start gap-4 mb-4 sm:mb-5">
                      <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br ${member.gradient} shadow-lg`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                          {member.relation}
                        </span>
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold gradient-text-accent mt-1">
                          {member.name}
                        </h3>
                      </div>
                    </div>

                    {/* Professional Info */}
                    <div className="mb-4 sm:mb-5 p-4 bg-background/50 rounded-xl border border-primary/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <p className="text-sm sm:text-base font-semibold text-foreground">
                          {member.profession}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground ml-6">
                        {member.institution}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {member.description}
                    </p>
                  </div>

                  {/* Decorative Corner Element */}
                  <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${member.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing Message */}
        <motion.div
          className="text-center mt-10 sm:mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="glass p-6 sm:p-8 rounded-2xl max-w-3xl mx-auto border border-primary/20">
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground italic leading-relaxed">
              "Their continuous effort, unconditional love, and endless support have been instrumental in every milestone I've achieved."
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              <Heart className="w-3 h-3 text-red-300 fill-red-300" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FamilySection;
