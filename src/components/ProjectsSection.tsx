import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ProjectsSection = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects = [
    {
      title: "Smart Helmet",
      description: "Emergency alert system that automatically detects accidents and sends alerts to emergency contacts. Currently under review for publishing.",
      tech: ["Hardware", "IoT", "GPS"],
      category: "Patent",
      gradient: "bg-gradient-primary"
    },
    {
      title: "PMSS",
      description: "This project focuses on reducing the duration and the paper work for military families to avail the PMS Scheme.",
      tech: ["MERN Stack"],
      category: "Hackathon",
      gradient: "bg-gradient-secondary"
    },
    {
      title: "TOX-to-BOX -MSME 5.0",
      description: "Successfully cleared Stage 1 with an innovative AI prototype designed to solve real-world industry challenges.",
      tech: ["Carbon Footprint Analysis"],
      category: "Hackathon",
      gradient: "bg-gradient-accent"
    },
    {
      title: "My Health",
      description: "This is a mobile application that helps migrant workers in Kerala to manage their digital health records efficiently.",
      tech: ["Mobile App","Mongo DB", "Node JS", "Flutter"],
      category: "Preparation",
      gradient: "bg-gradient-primary"
    }
  ];

  const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">🌟 Featured Highlights</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Notable projects and achievements from my innovation journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {displayedProjects.map((project, index) => (
            <div key={index} className="glass-strong p-5 sm:p-6 rounded-2xl hover-float hover-glow group">
              <div className={`w-full h-2 rounded-full mb-4 sm:mb-6 ${project.gradient}`}></div>
              
              <div className="text-xs sm:text-sm font-medium text-accent mb-2">
                {project.category}
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 group-hover:gradient-text transition-all duration-300">
                {project.title}
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="glass border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground flex-1">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            className="glass border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4"
            onClick={() => setShowAllProjects(!showAllProjects)}
          >
            {showAllProjects ? 'View Less Projects' : 'View All Projects'}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;