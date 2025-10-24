import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import SplashCursor from '@/components/SplashCursor';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import HeroSection from '@/components/HeroSection';
import VisionMissionCards from '@/components/VisionMissionCards';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import AchievementsSection from '@/components/AchievementsSection';
import SkillsSection from '@/components/SkillsSection';
import ContactSection from '@/components/ContactSection';
import EnhancedMiniNaresh from '@/components/EnhancedMiniNaresh';
import TargetCursor from '@/components/TargetCursor';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Target Cursor - Custom animated cursor */}
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      {/* Interactive Fluid Background - Behind everything */}
      <SplashCursor 
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1024}
        DENSITY_DISSIPATION={2.5}
        VELOCITY_DISSIPATION={1.5}
        CURL={4}
        SPLAT_RADIUS={0.15}
        SPLAT_FORCE={5000}
        COLOR_UPDATE_SPEED={8}
        TRANSPARENT={true}
      />
      
      {/* Particle Background - Above fluid, behind content */}
      <ParticleBackground />
      
      {/* Scroll Progress Bar - At top of page */}
      <ScrollProgressBar />
      
      {/* Navigation - Fixed at top */}
      <Navigation />
      
      <main className="relative z-10">
        {/* Each section has its own container for better responsive control */}
        <section id="hero" className="w-full">
          <HeroSection />
        </section>
        
        <section className="w-full py-1 sm:py-2">
          <VisionMissionCards />
        </section>
        
        <section id="about" className="w-full py-2 sm:py-3 lg:py-4">
          <AboutSection />
        </section>

        <section id="projects" className="w-full py-2 sm:py-3 lg:py-4">
          <ProjectsSection />
        </section>

        <section id="achievements" className="w-full py-2 sm:py-3 lg:py-4">
          <AchievementsSection />
        </section>

        <section id="skills" className="w-full py-2 sm:py-3 lg:py-4">
          <SkillsSection />
        </section>

        <section id="contact" className="w-full py-2 sm:py-3 lg:py-4">
          <ContactSection />
        </section>
      </main>
      
      <EnhancedMiniNaresh />
      
      {/* Responsive Footer */}
      <footer className="py-6 sm:py-8 border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base text-muted-foreground">
            © 2025 Naresh D. Built with passion for innovation and technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;