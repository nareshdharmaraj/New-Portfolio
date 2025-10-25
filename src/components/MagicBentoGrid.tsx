import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  className?: string;
  children: ReactNode;
  delay?: number;
}

export const BentoGrid = ({ children, className = '' }: BentoGridProps) => {
  return (
    <div className={`grid auto-rows-[minmax(200px,auto)] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {children}
    </div>
  );
};

export const BentoCard = ({ className = '', children, delay = 0 }: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 2,
        rotateX: -2,
        transition: { duration: 0.3 }
      }}
      className={`relative group overflow-hidden rounded-2xl ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="relative z-10 h-full">
        {children}
      </div>
      
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
        }}
        whileHover={{
          boxShadow: '0 0 0 1px rgba(255,255,255,0.15), 0 20px 40px -10px rgba(0,0,0,0.3)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
