import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  center?: boolean;
  animate?: boolean;
}

const ResponsiveContainer = ({
  children,
  className = '',
  as = 'div',
  maxWidth = 'xl',
  padding = 'md',
  center = true,
  animate = false
}: ResponsiveContainerProps) => {
  const Component = animate ? motion[as] : as;
  
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md', 
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full'
  };
  
  const paddingClasses = {
    none: '',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
    xl: 'px-8 sm:px-12 lg:px-16'
  };
  
  const baseClasses = [
    'w-full',
    maxWidthClasses[maxWidth],
    paddingClasses[padding],
    center ? 'mx-auto' : '',
    className
  ].filter(Boolean).join(' ');
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  } : {};
  
  return (
    <Component className={baseClasses} {...animationProps}>
      {children}
    </Component>
  );
};

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const ResponsiveGrid = ({
  children,
  className = '',
  cols = { base: 1, sm: 2, lg: 3 },
  gap = 'md',
  animate = false
}: ResponsiveGridProps) => {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6 sm:gap-8',
    lg: 'gap-8 sm:gap-10 lg:gap-12',
    xl: 'gap-10 sm:gap-12 lg:gap-16'
  };
  
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2', 
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };
  
  const responsiveClasses = [
    'grid',
    cols.base ? gridCols[cols.base] : 'grid-cols-1',
    cols.sm ? `sm:${gridCols[cols.sm]}` : '',
    cols.md ? `md:${gridCols[cols.md]}` : '',
    cols.lg ? `lg:${gridCols[cols.lg]}` : '',
    cols.xl ? `xl:${gridCols[cols.xl]}` : '',
    cols['2xl'] ? `2xl:${gridCols[cols['2xl']]}` : '',
    gapClasses[gap],
    className
  ].filter(Boolean).join(' ');
  
  if (animate) {
    return (
      <motion.div 
        className={responsiveClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={responsiveClasses}>
      {children}
    </div>
  );
};

interface ResponsiveTextProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  className?: string;
  center?: boolean;
  animate?: boolean;
}

const ResponsiveText = ({
  children,
  as = 'p',
  size = 'base',
  className = '',
  center = false,
  animate = false
}: ResponsiveTextProps) => {
  const Component = animate ? motion[as] : as;
  
  const sizeClasses = {
    xs: 'text-xs sm:text-sm',
    sm: 'text-sm sm:text-base',
    base: 'text-base sm:text-lg',
    lg: 'text-lg sm:text-xl',
    xl: 'text-xl sm:text-2xl',
    '2xl': 'text-2xl sm:text-3xl lg:text-4xl',
    '3xl': 'text-3xl sm:text-4xl lg:text-5xl',
    '4xl': 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl',
    '5xl': 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl'
  };
  
  const classes = [
    sizeClasses[size],
    center ? 'text-center' : '',
    className
  ].filter(Boolean).join(' ');
  
  const animationProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  } : {};
  
  return (
    <Component className={classes} {...animationProps}>
      {children}
    </Component>
  );
};

interface ResponsiveSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'glass' | 'solid';
  animate?: boolean;
}

const ResponsiveSection = ({
  children,
  id,
  className = '',
  padding = 'lg',
  background = 'transparent',
  animate = false
}: ResponsiveSectionProps) => {
  const paddingClasses = {
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-12 sm:py-16 lg:py-20',
    xl: 'py-16 sm:py-20 lg:py-24'
  };
  
  const backgroundClasses = {
    transparent: '',
    glass: 'glass',
    solid: 'bg-background'
  };
  
  const classes = [
    'relative',
    paddingClasses[padding],
    backgroundClasses[background],
    className
  ].filter(Boolean).join(' ');
  
  if (animate) {
    return (
      <motion.section
        id={id}
        className={classes}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.section>
    );
  }
  
  return (
    <section id={id} className={classes}>
      {children}
    </section>
  );
};

export { ResponsiveContainer, ResponsiveGrid, ResponsiveText, ResponsiveSection };
