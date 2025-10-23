// Simplified chat API without LangChain dependencies
// Types for chat messages and responses
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatApiResponse {
  response: string;
  sources?: string[];
}

// Portfolio information for generating mock responses
const PORTFOLIO_INFO = {
  name: "Naresh D",
  title: "Full Stack Developer & AI Specialist",
  skills: [
    "React", "Next.js", "TypeScript", "Node.js", 
    "Python", "Machine Learning", "AI/ML", 
    "AWS", "Docker", "PostgreSQL"
  ],
  projects: [
    {
      name: "Smart Helmet Patent",
      description: "Emergency alert system that automatically detects accidents and sends alerts to emergency contacts. Currently under review for publishing.",
      tech: ["Hardware", "IoT", "Mobile App", "GPS"]
    },
    {
      name: "SIH 2024 Participation",
      description: "Participated in Smart India Hackathon 2024, working on ISRO's challenge on satellite image super-resolution using advanced deep learning techniques.",
      tech: ["Computer Vision", "Deep Learning", "Super-Resolution"]
    },
    {
      name: "MSME Hackathon 5.0",
      description: "Successfully cleared Stage 1 with an innovative AI prototype designed to solve real-world industry challenges.",
      tech: ["AI", "Prototype", "Innovation"]
    }
  ],
  experience: [
    {
      role: "Innovation Ambassador",
      organization: "IIC, MKCE",
      period: "2024-25",
      description: "Promoting a culture of research, innovation, and entrepreneurship."
    },
    {
      role: "IBM Edunet Internship",
      organization: "IBM Edunet Foundation",
      period: "2023",
      description: "Gained industry-grade exposure to machine learning and data science practices."
    }
  ]
};

// Generate mock responses based on user input
function getMockedAIResponse(userMessage: string): ChatApiResponse {
  const message = userMessage.toLowerCase();
  
  // Skills-related responses
  if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
    return {
      response: `I have expertise in ${PORTFOLIO_INFO.skills.slice(0, 6).join(', ')} and more. I'm particularly passionate about AI/ML technologies and full-stack development. I've worked with modern frameworks like React and Next.js, backend technologies like Node.js and Python, and cloud platforms like AWS.`
    };
  }
  
  // Projects-related responses
  if (message.includes('project') || message.includes('work') || message.includes('build')) {
    const projectList = PORTFOLIO_INFO.projects.map(p => 
      `• ${p.name}: ${p.description}`
    ).join('\n');
    
    return {
      response: `Here are some of my key projects:\n\n${projectList}\n\nEach project showcases different aspects of my technical abilities, from hardware innovation to AI/ML applications.`
    };
  }
  
  // Experience-related responses
  if (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('internship')) {
    const expList = PORTFOLIO_INFO.experience.map(exp => 
      `• ${exp.role} at ${exp.organization} (${exp.period}): ${exp.description}`
    ).join('\n');
    
    return {
      response: `Here's my professional experience:\n\n${expList}\n\nI'm always eager to take on new challenges and contribute to innovative projects.`
    };
  }
  
  // IBM-specific responses
  if (message.includes('ibm')) {
    return {
      response: "I completed an internship with IBM Edunet Foundation in 2023, where I gained valuable industry exposure to machine learning and data science practices. This experience helped me understand real-world applications of AI technologies and best practices in the industry."
    };
  }
  
  // Innovation Ambassador responses
  if (message.includes('innovation') || message.includes('ambassador')) {
    return {
      response: "I'm currently serving as an Innovation Ambassador at IIC, MKCE for 2024-25. In this role, I promote a culture of research, innovation, and entrepreneurship among students and faculty. I help organize workshops, mentor startup ideas, and foster collaboration between academia and industry."
    };
  }
  
  // Smart Helmet responses
  if (message.includes('helmet') || message.includes('patent')) {
    return {
      response: "I've filed a patent for a Smart Helmet - an emergency alert system that automatically detects accidents and sends alerts to emergency contacts. This innovative safety device uses IoT technology, GPS tracking, and mobile app integration. The patent is currently under review for publishing."
    };
  }
  
  // Hackathon responses
  if (message.includes('hackathon') || message.includes('sih') || message.includes('msme')) {
    return {
      response: "I've participated in multiple prestigious hackathons:\n\n• Smart India Hackathon 2024: Worked on ISRO's satellite image super-resolution challenge using deep learning\n• MSME Hackathon 5.0 (2025): Successfully cleared Stage 1 with an innovative AI prototype\n• Currently preparing for SIH 2025 with advanced AI solutions\n\nThese experiences have sharpened my problem-solving skills and ability to work under pressure."
    };
  }
  
  // About/intro responses
  if (message.includes('about') || message.includes('who') || message.includes('introduce')) {
    return {
      response: `Hi! I'm ${PORTFOLIO_INFO.name}, a ${PORTFOLIO_INFO.title}. I'm passionate about using AI and technology to solve real-world problems. I have experience in full-stack development, machine learning, and hardware innovation. Currently serving as an Innovation Ambassador, I love mentoring others and contributing to the tech community.`
    };
  }
  
  // Default response
  return {
    response: "Hello! I'm Mini Naresh, your AI assistant. I can tell you about my projects like the Smart Helmet patent, skills in AI and data science, or my experiences as an Innovation Ambassador. What would you like to know?"
  };
}

/**
 * Main function to send message to AI
 * This is a client-side wrapper for the API call
 */
export async function sendMessageToAI(
  messages: ChatMessage[], 
  apiKey?: string
): Promise<ChatApiResponse> {
  // For now, always use mock responses to avoid LangChain dependency issues
  const lastMessage = messages[messages.length - 1];
  return getMockedAIResponse(lastMessage.content);
}
