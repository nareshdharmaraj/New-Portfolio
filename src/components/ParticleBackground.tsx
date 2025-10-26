import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Enhanced particle creation with more variety
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random horizontal position
      particle.style.left = Math.random() * 100 + '%';
      
      // Random animation delay for staggered effect
      particle.style.animationDelay = Math.random() * 20 + 's';
      
      // More varied size distribution (smaller to larger)
      const sizeType = Math.random();
      let size;
      if (sizeType < 0.7) {
        // 70% small particles
        size = Math.random() * 2 + 0.5;
      } else if (sizeType < 0.9) {
        // 20% medium particles
        size = Math.random() * 3 + 2;
      } else {
        // 10% large particles
        size = Math.random() * 4 + 3;
      }
      
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Varied opacity based on size (smaller = more transparent)
      const opacity = Math.min(0.6, (size / 7) * 0.5 + Math.random() * 0.2);
      particle.style.opacity = opacity.toString();
      
      // Add subtle color variations
      const colorVariation = Math.random();
      if (colorVariation < 0.1) {
        // 10% slightly blue-tinted
        particle.style.background = 'radial-gradient(circle, rgba(100, 150, 255, 0.8), rgba(100, 150, 255, 0))';
      } else if (colorVariation < 0.2) {
        // 10% slightly purple-tinted
        particle.style.background = 'radial-gradient(circle, rgba(200, 100, 255, 0.8), rgba(200, 100, 255, 0))';
      }
      // Rest remain default white/primary color
      
      // Add animation variation
      const animationDuration = 15 + Math.random() * 10; // 15-25s
      particle.style.animationDuration = animationDuration + 's';
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, animationDuration * 1000);
    };

    // Create more initial particles with staggered timing
    for (let i = 0; i < 150; i++) {
      setTimeout(() => createParticle(), Math.random() * 3000);
    }

    // Create new particles more frequently
    const interval = setInterval(createParticle, 200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="particles" />;
};

export default ParticleBackground;