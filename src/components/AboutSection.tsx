const AboutSection = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">📖 About Me</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Curiosity drives me. Innovation defines me. AI shapes me.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="glass-strong p-6 sm:p-8 rounded-2xl hover-float">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 gradient-text-secondary">🎓 Education</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Pursuing AI & Data Science at MKCE with expertise in ML, DL, and NLP. 
                I thrive on connecting research with real-world problem-solving.
              </p>
            </div>

            <div className="glass-strong p-6 sm:p-8 rounded-2xl hover-float">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 gradient-text-accent">🚀 Innovation & Creativity</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Filed 1 patent (Smart Helmet – emergency alert system, under review). 
                Currently building 1 more patent + 1 copyright. Cleared MSME Hackathon 5.0 
                Stage 1 (2025) with an AI-driven solution.
              </p>
            </div>

            <div className="glass-strong p-6 sm:p-8 rounded-2xl hover-float">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 gradient-text">🤝 Collaboration & Impact</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Proudly serving as Innovation Ambassador of IIC (2024–25) at MKCE, sparking a 
                culture of research, innovation, and entrepreneurship. I collaborate on impactful 
                projects with ethical AI at the core.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            
            <div className="glass-strong p-8 rounded-2xl text-center hover-float">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-2xl font-semibold mb-4 gradient-text-secondary">Data Transformer</h3>
              <p className="text-muted-foreground">
                Turning raw data into decisions with analytics, predictive models, 
                and compelling visualizations.
              </p>
            </div>

            <div className="glass-strong p-8 rounded-2xl text-center hover-float">
              <div className="text-6xl mb-4">💡</div>
              <h3 className="text-2xl font-semibold mb-4 gradient-text-accent">Problem Solver</h3>
              <p className="text-muted-foreground">
                I don't just solve — I rethink. I create scalable, efficient solutions 
                that leave lasting impact. Reflected in SIH 2024, SIH 2025, and MSME Hackathon 5.0.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;