import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random horizontal position
      particle.style.left = Math.random() * 100 + '%';
      
      // Random animation delay
      particle.style.animationDelay = Math.random() * 20 + 's';
      
      // Random size
      const size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random opacity
      particle.style.opacity = (Math.random() * 0.3 + 0.1).toString();
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, 20000);
    };

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      setTimeout(() => createParticle(), Math.random() * 2000);
    }

    // Create new particles periodically
    const interval = setInterval(createParticle, 400);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="particles" />;
};

export default ParticleBackground;