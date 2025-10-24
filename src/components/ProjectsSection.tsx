import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';

// Project details interface
interface ProjectDetails {
  title: string;
  description: string;
  tech: string[];
  category: string;
  gradient: string;
  // New fields for modal - REPLACE THESE WITH YOUR ACTUAL CONTENT
  problem: string;
  solution: string;
  status: string;
  githubLink: string;
}

const ProjectsSection = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);

  // ========================================
  // REPLACE THE CONTENT BELOW FOR EACH PROJECT
  // ========================================
  const projects: ProjectDetails[] = [
    {
      title: "Smart Helmet",
      description: "Emergency alert system that automatically detects accidents and sends alerts to emergency contacts. Currently under review for publishing.",
      tech: ["Hardware", "IoT", "GPS"],
      category: "Patent",
      gradient: "bg-gradient-primary",
      // REPLACE THESE WITH YOUR ACTUAL CONTENT:
      problem: "Traditional helmets don't provide automatic accident detection or emergency alerts, leading to delayed medical response in critical situations.",
      solution: "Developed an IoT-enabled smart helmet with built-in GPS tracking and accelerometer sensors that automatically detect accidents and send real-time alerts with location data to emergency contacts and nearby hospitals.",
      status: "Patent Filed - Under Review (2024)",
      githubLink: "https://github.com/nareshdharmaraj/Smart-Helmet" // REPLACE WITH YOUR REPO LINK
    },
    {
      title: "PMSS",
      description: "This project focuses on reducing the duration and the paper work for military families to avail the PMS Scheme.",
      tech: ["MERN Stack"],
      category: "SIH 2024",
      gradient: "bg-gradient-secondary",
      // REPLACE THESE WITH YOUR ACTUAL CONTENT:
      problem: "Military families face extensive paperwork and long processing times when applying for the Prime Minister's Scholarship Scheme, causing delays and frustration.",
      solution: "Built a digital platform using MERN stack that automates application processing, document verification, and status tracking, reducing processing time by 70% and eliminating physical paperwork.",
      status: "Hackathon Winner - Deployed for Testing",
      githubLink: "https://github.com/nareshdharmaraj/pmss" // REPLACE WITH YOUR REPO LINK
    },
    {
      title: "TOX-to-BOX",
      description: "Successfully cleared Stage 1 with an innovative AI prototype designed to solve real-world industry challenges.",
      tech: ["Carbon Footprint Analysis"],
      category: "MSME 5.0",
      gradient: "bg-gradient-accent",
      // REPLACE THESE WITH YOUR ACTUAL CONTENT:
      problem: "MSMEs lack affordable and accessible tools to measure and reduce their carbon footprint, hindering their sustainability goals.",
      solution: "Created an AI-powered platform that analyzes manufacturing processes and provides actionable insights to reduce carbon emissions, with automated reporting and compliance tracking.",
      status: "Stage 1 Cleared - Advancing to Finals",
      githubLink: "https://github.com/nareshdharmaraj/tox-to-box" // REPLACE WITH YOUR REPO LINK
    },
    {
      title: "My Health",
      description: "A mobile-first (Android & iOS) + smartwatch-enabled healthcare application designed for migrant workers in Kerala. The system ensures portable, secure, AI-driven health records and real-time outbreak prevention.",
      tech: ["Mobile App","Mongo DB", "Node JS", "Flutter"],
      category: "SIH 2025",
      gradient: "bg-gradient-primary",
      // REPLACE THESE WITH YOUR ACTUAL CONTENT:
      problem: "Migrant workers struggle to maintain and access their health records when moving across regions, leading to fragmented healthcare and repeated medical tests.",
      solution: "Developed a cross-platform mobile app using Flutter that provides secure, portable digital health records with multilingual support, enabling seamless healthcare access across different states and hospitals.",
      status: "In Development - Beta Testing Phase",
      githubLink: "https://github.com/nareshdharmaraj/my-health" // REPLACE WITH YOUR REPO LINK
    },
    {
      title: "Farm2Market",
      description: "Bridging Fields and Markets - A Platform Connecting Farmers Directly with Buyers to Optimize Supply Chains and Maximize Profits.",
      tech: ["MERN Stack"],
      category: "Hackathon",
      gradient: "bg-gradient-primary",
      // REPLACE THESE WITH YOUR ACTUAL CONTENT:
      problem: "In rural India, farmers often face exploitation by middlemen, selling their produce at unfairly low prices. Due to lack of digital access, awareness, and direct buyer connections, farmers’ profits are slashed, while consumers pay higher market rates. This disconnect between producers (farmers) and consumers (buyers/shops) leads to income instability, food wastage, and reduced motivation to farm.",
      solution: "Farm2Market is a web-based marketplace that connects farmers directly with buyers, eliminating the need for middlemen and ensuring fair pricing, transparency, and trust. Farmers can list their crops with price, quantity, and location details. Buyers can browse, negotiate, and purchase directly from farmers. Admins verify users, monitor platform activities, and maintain system integrity. With multilingual support and simple UI, the app empowers rural communities to participate confidently in digital trade.",
      status: "Development stage - Prototype ready for testing",
      githubLink: "https://github.com/nareshdharmaraj/Farm2Market"
    },
    {
      title: "Fraud Shield",
      description: "AI-Powered Fraud Detection System Financial Fraud Detection using PySpark",
      tech: ["HTML", "CSS", "JavaScript", "PySpark", "Isolation Forest"],
      category: "Minor Project",
      gradient: "bg-gradient-primary",
      // REPLACE THESE WITH YOUR ACTUAL CONTENT:
      problem: "Financial fraud is a growing challenge in today’s digital economy. Banks and fintech companies face millions of daily transactions, and fraudulent activities are often hidden among legitimate ones.",
      solution: "Developed an AI-powered fraud detection system using PySpark that analyzes transaction patterns in real-time. The system employs Isolation Forest algorithms to identify anomalies and flag potentially fraudulent transactions, reducing false positives and enhancing security.",
      status: "ML Model Fine-tuning in Progress",
      githubLink: "https://github.com/nareshdharmaraj/FrausShield"
    },
    {
      title: "Heaven Connect",
      description: "A community-focused mobile application that connects people for service sharing and community building.",
      tech: ["Flutter", "MongoDB", "Node.js"],
      category: "Minor Project",
      gradient: "bg-gradient-primary",
      // REPLACE THESE WITH YOUR ACTUAL CONTENT:
      problem: "In many communities, individuals possess skills and resources that go underutilized, while others struggle to access essential services. This disconnect leads to missed opportunities for collaboration and support within neighborhoods.",
      solution: "Developed 'Heaven Connect,' a mobile application that facilitates service sharing among community members. Users can offer and request services such as tutoring, handyman work, and transportation. The app includes user profiles, ratings, and a secure messaging system to foster trust and collaboration.",
      status: "Deep Research Phase",
      githubLink: "https://github.com/nareshdharmaraj/Heaven_Connect"
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="glass border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground flex-1"
                  onClick={() => setSelectedProject(project)}
                >
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

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto scrollbar-hide"
            onClick={() => setSelectedProject(null)}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-2xl my-8 bg-background/95 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scrollable Content Container - Hidden Scrollbar */}
              <div 
                className="max-h-[85vh] overflow-y-auto scrollbar-hide"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <style>{`
                  .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="sticky top-4 right-4 ml-auto mr-4 mt-4 z-10 p-2 rounded-full bg-background/80 hover:bg-destructive/20 border border-primary/20 hover:border-destructive transition-all group float-right"
                >
                  <X className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                </button>

                {/* Modal Content */}
                <div className="p-6 sm:p-8 clear-both">
                  {/* Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <div className={`w-full h-1.5 rounded-full mb-3 ${selectedProject.gradient}`} />
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="text-xs font-medium text-accent mb-1.5">
                          {selectedProject.category}
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">
                          {selectedProject.title}
                        </h2>
                      </div>
                      {/* GitHub Icon */}
                      <motion.a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-primary/30 hover:border-primary hover:scale-110 transition-all group flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Github className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-white transition-colors" />
                      </motion.a>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + idx * 0.05 }}
                          className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Problem Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-5 p-4 rounded-xl bg-destructive/5 border border-destructive/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-destructive/20 flex items-center justify-center">
                        <span className="text-base">🔴</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-destructive">Problem</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.problem}
                    </p>
                  </motion.div>

                  {/* Solution Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-5 p-4 rounded-xl bg-primary/5 border border-primary/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                        <span className="text-base">💡</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-primary">My Solution</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedProject.solution}
                    </p>
                  </motion.div>

                  {/* Status Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-5 p-4 rounded-xl bg-green-500/5 border border-green-500/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <span className="text-base">✅</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-green-400">Status</h3>
                    </div>
                    <p className="text-sm font-semibold text-green-300">
                      {selectedProject.status}
                    </p>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <Button
                      asChild
                      className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground py-5"
                    >
                      <a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        <span>View on GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 border-primary/30 hover:bg-primary/10 py-5"
                    >
                      Close
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;