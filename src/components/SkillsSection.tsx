const SkillsSection = () => {
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

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
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
                          width: `${skill.level}%`,
                          animation: `skillFill 2s ease-out ${skillIndex * 0.1}s both`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 gradient-text-secondary">📜 Certifications & Awards</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-lg hover-float">
              <div className="text-3xl mb-3">📜</div>
              <div className="font-semibold">Patent Filed - Smart Helmet (2024)</div>
              <div className="text-sm text-muted-foreground mt-1">Emergency alert system, under review</div>
            </div>
            <div className="glass p-6 rounded-lg hover-float">
              <div className="text-3xl mb-3">👑</div>
              <div className="font-semibold">Innovation Ambassador (IIC, 2024–25)</div>
              <div className="text-sm text-muted-foreground mt-1">MKCE</div>
            </div>
            <div className="glass p-6 rounded-lg hover-float">
              <div className="text-3xl mb-3">🏢</div>
              <div className="font-semibold">IBM Edunet Foundation Internship (2023)</div>
              <div className="text-sm text-muted-foreground mt-1">AI & Data Science</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;