import React from 'react';
import Navigation from '@/components/Navigation';

const SimplifiedIndex = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Simplified Portfolio Page</h1>
          <p className="text-xl text-muted-foreground">
            This is a simplified version of the portfolio page to diagnose rendering issues.
          </p>
        </div>
      </main>
      
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            Built with passion for innovation and technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SimplifiedIndex;
