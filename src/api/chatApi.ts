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
  education: {
    college: "MKCE (M. Kumarasamy College of Engineering)",
    degree: "Bachelor's degree in Computer Science / AI focus",
    achievements: [
      "Innovation Ambassador at IIC, MKCE (2024-25)",
      "Active participant in research and innovation activities",
      "Specialized training in Machine Learning and Data Science"
    ]
  },
  skills: {
    ml_ai: [
      "Deep Learning (95% proficiency)",
      "Neural Networks (90% proficiency)",
      "Computer Vision (88% proficiency)",
      "Natural Language Processing (85% proficiency)",
      "Reinforcement Learning (80% proficiency)"
    ],
    programming: [
      "Python (95% proficiency)",
      "JavaScript/TypeScript (80% proficiency)",
      "SQL (90% proficiency)",
      "R (85% proficiency)",
      "C++ (75% proficiency)"
    ],
    frameworks: [
      "TensorFlow (90% proficiency)",
      "PyTorch (88% proficiency)",
      "React (Advanced)",
      "Next.js (Advanced)",
      "Scikit-learn (92% proficiency)",
      "Node.js (Intermediate)",
      "Docker (85% proficiency)",
      "Apache Spark (80% proficiency)"
    ],
    datascience: [
      "Data Analysis (95% proficiency)",
      "Statistics (90% proficiency)",
      "Data Visualization (88% proficiency)",
      "A/B Testing (85% proficiency)",
      "ETL Pipelines (82% proficiency)"
    ],
    cloud: ["AWS", "Docker"],
    databases: ["PostgreSQL", "SQL"]
  },
  projects: [
    {
      name: "Smart Helmet Patent",
      description: "Emergency alert system that automatically detects accidents and sends alerts to emergency contacts. Currently under review for publishing.",
      tech: ["Hardware", "IoT", "Mobile App", "GPS"],
      details: "This innovative safety device uses IoT technology, GPS tracking, and mobile app integration to provide real-time emergency response. Combines hardware innovation with software solutions."
    },
    {
      name: "SIH 2024 Participation",
      description: "Participated in Smart India Hackathon 2024, working on ISRO's challenge on satellite image super-resolution using advanced deep learning techniques.",
      tech: ["Computer Vision", "Deep Learning", "Super-Resolution"],
      details: "Worked on ISRO's satellite image super-resolution challenge using advanced deep learning techniques. Applied computer vision and neural networks to enhance satellite imagery quality."
    },
    {
      name: "MSME Hackathon 5.0",
      description: "Successfully cleared Stage 1 with an innovative AI prototype designed to solve real-world industry challenges.",
      tech: ["AI", "Prototype", "Innovation"],
      details: "Developed an innovative AI prototype in 2025 to address real-world industry challenges. Successfully cleared Stage 1, demonstrating problem-solving skills and innovative thinking."
    }
  ],
  experience: [
    {
      role: "Innovation Ambassador",
      organization: "IIC (Institution's Innovation Council), MKCE",
      period: "2024-25",
      description: "Promoting a culture of research, innovation, and entrepreneurship.",
      details: "Helps organize workshops, mentor startup ideas, and foster collaboration between academia and industry. Reflects leadership skills and commitment to nurturing innovation in the student community."
    },
    {
      role: "IBM Edunet Internship",
      organization: "IBM Edunet Foundation",
      period: "2023",
      description: "Gained industry-grade exposure to machine learning and data science practices.",
      details: "Worked on practical ML projects and learned industry-standard tools and methodologies. Gained valuable exposure to real-world applications of AI technologies and best practices."
    }
  ],
  interests: [
    "AI and Machine Learning research",
    "Full-stack development",
    "Hardware innovation",
    "Academic collaboration",
    "Mentoring and knowledge sharing",
    "Solving real-world problems with technology"
  ]
};

// Generate mock responses based on user input
function getMockedAIResponse(userMessage: string): ChatApiResponse {
  const message = userMessage.toLowerCase();
  
  // Personal/private questions filter
  const personalKeywords = [
    'girlfriend', 'boyfriend', 'dating', 'relationship', 'married', 'wife', 'husband',
    'family', 'parents', 'mother', 'father', 'sister', 'brother',
    'salary', 'income', 'money', 'pay', 'financial', 'bank',
    'religion', 'political', 'vote', 'belief',
    'address', 'phone', 'password', 'private', 'personal life',
    'age', 'birthday', 'birth date'
  ];
  
  if (personalKeywords.some(keyword => message.includes(keyword))) {
    return {
      response: "I can't answer personal questions like this. For such inquiries, please connect with me directly through the contact form or reach out via email at 2006nareshd@gmail.com or WhatsApp at +91 7200754566. I'd be happy to discuss this in a more personal conversation!"
    };
  }
  
  // Off-topic/unrelated questions filter
  const portfolioKeywords = [
    'skill', 'project', 'experience', 'work', 'education', 'study',
    'certificate', 'achievement', 'hackathon', 'internship', 'ibm',
    'innovation', 'ambassador', 'helmet', 'patent', 'sih', 'msme',
    'react', 'python', 'ai', 'ml', 'machine learning', 'data science',
    'develop', 'code', 'program', 'technology', 'tech', 'college',
    'university', 'qualification', 'about', 'who', 'introduce',
    'contact', 'email', 'phone', 'linkedin', 'github', 'portfolio',
    'hire', 'recruit', 'job', 'opportunity', 'collaborate', 'collaboration'
  ];
  
  const hasPortfolioKeyword = portfolioKeywords.some(keyword => message.includes(keyword));
  
  // Check if message is too short or likely off-topic
  if (message.length > 10 && !hasPortfolioKeyword && !message.includes('naresh')) {
    return {
      response: "I can only answer questions related to my professional background, skills, projects, education, and career. Please ask me about my technical expertise, work experience, achievements, or how to get in touch. What would you like to know about my professional profile?"
    };
  }
  
  // Contact information responses
  if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('phone') || message.includes('whatsapp')) {
    return {
      response: "You can reach me through multiple channels:\n\n📧 Email: 2006nareshd@gmail.com\n📱 Phone: +91 7200754566\n💬 WhatsApp: +91 7200754566\n💼 LinkedIn: www.linkedin.com/in/nareshdharmaraj\n🐙 GitHub: github.com/nareshdharmaraj\n\nFeel free to connect for any professional inquiries, collaboration opportunities, or project discussions!"
    };
  }
  
  // Education responses
  if (message.includes('education') || message.includes('college') || message.includes('university') || message.includes('degree') || message.includes('study')) {
    return {
      response: "I'm currently pursuing my education with a strong focus on Computer Science and Artificial Intelligence. I'm actively involved in research, innovation, and entrepreneurship activities. As an Innovation Ambassador at IIC, MKCE, I promote academic excellence and practical application of technology. I've also completed specialized training through IBM Edunet Foundation in Machine Learning and Data Science."
    };
  }
  
  // Skills-related responses
  if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
    return {
      response: `I have comprehensive expertise across multiple domains:\n\n🤖 **AI/ML**: ${PORTFOLIO_INFO.skills.ml_ai.slice(0, 3).join(', ')}\n\n💻 **Programming**: ${PORTFOLIO_INFO.skills.programming.slice(0, 3).join(', ')}\n\n⚙️ **Frameworks**: ${PORTFOLIO_INFO.skills.frameworks.slice(0, 4).join(', ')}\n\n📊 **Data Science**: ${PORTFOLIO_INFO.skills.datascience.slice(0, 3).join(', ')}\n\n☁️ **Cloud & DevOps**: ${PORTFOLIO_INFO.skills.cloud.join(', ')}, ${PORTFOLIO_INFO.skills.databases.join(', ')}\n\nI continuously update my skills to stay current with emerging technologies and industry best practices.`
    };
  }
  
  // Machine Learning specific
  if (message.includes('machine learning') || message.includes('ml') || message.includes('ai') || message.includes('deep learning')) {
    return {
      response: `I have strong expertise in AI and Machine Learning:\n\n🧠 **Core AI/ML Skills**:\n${PORTFOLIO_INFO.skills.ml_ai.map(skill => `• ${skill}`).join('\n')}\n\n🛠️ **Frameworks**:\n• ${PORTFOLIO_INFO.skills.frameworks.filter(f => f.includes('TensorFlow') || f.includes('PyTorch') || f.includes('Scikit')).join('\n• ')}\n\n📚 **Experience**:\n• IBM Edunet Internship (2023) - ML & Data Science\n• SIH 2024 - Satellite image super-resolution using deep learning\n• Continuous research and practical applications\n\nI'm passionate about applying AI to solve real-world problems and staying updated with cutting-edge ML research.`
    };
  }
  
  // Data Science specific
  if (message.includes('data science') || message.includes('data analysis') || message.includes('analytics')) {
    return {
      response: `I have strong data science capabilities:\n\n📊 **Data Science Skills**:\n${PORTFOLIO_INFO.skills.datascience.map(skill => `• ${skill}`).join('\n')}\n\n🔧 **Tools & Technologies**:\n• Python, R, SQL for data manipulation\n• TensorFlow, PyTorch for ML models\n• Apache Spark for big data processing\n• Data visualization and statistical analysis\n\nI combine statistical knowledge with programming expertise to extract insights from complex datasets and build predictive models.`
    };
  }
  
  // Web Development specific
  if (message.includes('web') || message.includes('frontend') || message.includes('backend') || message.includes('full stack') || message.includes('react') || message.includes('next')) {
    return {
      response: `I'm proficient in full-stack web development:\n\n🎨 **Frontend**:\n• React (Advanced proficiency)\n• Next.js (Advanced proficiency)\n• TypeScript (80% proficiency)\n• Modern UI/UX design principles\n\n⚙️ **Backend**:\n• Node.js (Intermediate proficiency)\n• Python (95% proficiency)\n• RESTful API design\n• Database management (PostgreSQL, SQL)\n\n🚀 **DevOps & Tools**:\n• Docker (85% proficiency)\n• AWS cloud services\n• Git version control\n\nI build responsive, scalable applications from concept to deployment, combining modern frameworks with best practices in software engineering.`
    };
  }
  
  // Projects-related responses
  if (message.includes('project') || message.includes('build') || message.includes('develop')) {
    const projectList = PORTFOLIO_INFO.projects.map(p => 
      `**${p.name}**\n${p.details}\n*Technologies*: ${p.tech.join(', ')}`
    ).join('\n\n');
    
    return {
      response: `Here are my key innovative projects:\n\n${projectList}\n\nEach project demonstrates my ability to combine technical expertise with creative problem-solving, from hardware innovation to cutting-edge AI applications.`
    };
  }
  
  // Experience-related responses
  if (message.includes('experience') || message.includes('work') || message.includes('job') || message.includes('internship')) {
    const expList = PORTFOLIO_INFO.experience.map(exp => 
      `**${exp.role}** at ${exp.organization} (${exp.period})\n${exp.details}`
    ).join('\n\n');
    
    return {
      response: `Here's my professional experience:\n\n${expList}\n\nMy experience spans from academic innovation to industry-grade technical implementations, demonstrating versatility and a commitment to continuous learning and growth.`
    };
  }
  
  // IBM-specific responses
  if (message.includes('ibm')) {
    return {
      response: "I completed an internship with IBM Edunet Foundation in 2023, where I gained valuable industry exposure to machine learning and data science practices. This experience helped me understand real-world applications of AI technologies and best practices in the industry. I worked on practical ML projects and learned industry-standard tools and methodologies."
    };
  }
  
  // Innovation Ambassador responses
  if (message.includes('innovation') || message.includes('ambassador') || message.includes('iic')) {
    return {
      response: `I'm currently serving as an **Innovation Ambassador** at IIC (Institution's Innovation Council), MKCE for 2024-25.\n\n🎯 **Role & Responsibilities**:\n• Promoting a culture of research, innovation, and entrepreneurship\n• Organizing workshops and technical events\n• Mentoring startup ideas and student projects\n• Fostering collaboration between academia and industry\n• Leading innovation initiatives on campus\n\nThis position reflects my leadership skills, passion for innovation, and commitment to nurturing the next generation of innovators and entrepreneurs.`
    };
  }
  
  // ISRO / Satellite specific
  if (message.includes('isro') || message.includes('satellite') || message.includes('super-resolution') || message.includes('space')) {
    return {
      response: `I participated in Smart India Hackathon 2024, tackling **ISRO's satellite image super-resolution challenge**.\n\n🛰️ **Project Details**:\n• Challenge: Enhance the resolution of satellite imagery using AI\n• Technologies: Deep Learning, Computer Vision, Neural Networks\n• Approach: Applied advanced super-resolution techniques\n• Impact: Improved satellite image quality for better analysis\n\nThis project demonstrates my ability to work on complex, real-world problems in the space technology domain and apply cutting-edge AI techniques to scientific challenges.`
    };
  }
  
  // College/Education specific
  if (message.includes('college') || message.includes('mkce') || message.includes('university') || message.includes('degree') || message.includes('study')) {
    return {
      response: `I'm pursuing my education at **${PORTFOLIO_INFO.education.college}** with a focus on Computer Science and Artificial Intelligence.\n\n🎓 **Academic Highlights**:\n${PORTFOLIO_INFO.education.achievements.map(a => `• ${a}`).join('\n')}\n\nI actively participate in research, innovation, and entrepreneurship activities, combining academic excellence with practical application of technology. My education is complemented by industry certifications and hands-on project experience.`
    };
  }
  
  // Python specific
  if (message.includes('python') && !message.includes('programming')) {
    return {
      response: `I have **95% proficiency** in Python, making it my strongest programming language.\n\n🐍 **Python Expertise**:\n• Data Science: NumPy, Pandas, Matplotlib, Seaborn\n• Machine Learning: TensorFlow, PyTorch, Scikit-learn\n• Web Development: Backend APIs and automation\n• Scripting & Automation: Task automation, data processing\n• Statistical Analysis: Advanced data analytics\n\nI use Python extensively for AI/ML projects, data analysis, web development, and automation tasks. It's my go-to language for solving complex computational problems.`
    };
  }
  
  // Interests/Passion
  if (message.includes('interest') || message.includes('passion') || message.includes('hobby') || message.includes('like')) {
    return {
      response: `I'm passionate about:\n\n${PORTFOLIO_INFO.interests.map(i => `🌟 ${i}`).join('\n')}\n\nI believe in using technology as a force for good, creating solutions that make a meaningful impact on people's lives. My interests span from technical innovation to community building and knowledge sharing.`
    };
  }
  
  // Smart Helmet responses
  if (message.includes('helmet') || message.includes('patent')) {
    return {
      response: "I've filed a patent for a Smart Helmet - an innovative emergency alert system that automatically detects accidents and sends alerts to emergency contacts. This safety device uses IoT technology, GPS tracking, and mobile app integration to provide real-time emergency response. The patent is currently under review for publishing. This project demonstrates my ability to combine hardware innovation with software solutions."
    };
  }
  
  // Hackathon responses
  if (message.includes('hackathon') || message.includes('sih') || message.includes('msme') || message.includes('competition')) {
    return {
      response: "I've participated in multiple prestigious hackathons:\n\n• Smart India Hackathon 2024: Worked on ISRO's satellite image super-resolution challenge using advanced deep learning techniques\n• MSME Hackathon 5.0 (2025): Successfully cleared Stage 1 with an innovative AI prototype designed to solve real-world industry challenges\n• Currently preparing for SIH 2025 with advanced AI solutions\n\nThese experiences have sharpened my problem-solving skills, teamwork abilities, and capacity to work under pressure while delivering innovative solutions."
    };
  }
  
  // Certificates/Achievements responses
  if (message.includes('certificate') || message.includes('achievement') || message.includes('award') || message.includes('certification')) {
    return {
      response: "I've earned multiple certifications and achievements in various technical domains:\n\n• IBM Machine Learning & Data Science Certifications\n• AI/ML specialized training programs\n• Hackathon achievements (SIH 2024, MSME Hackathon 5.0)\n• Innovation Ambassador recognition at IIC, MKCE\n• Patent filing for Smart Helmet innovation\n\nThese certifications and achievements demonstrate my continuous learning mindset and expertise in cutting-edge technologies. You can view detailed certificates in the Skills section of the portfolio."
    };
  }
  
  // Hiring/Recruitment responses
  if (message.includes('hire') || message.includes('recruit') || message.includes('position') || message.includes('opportunity') || message.includes('available')) {
    return {
      response: "I'm open to exciting opportunities in:\n\n✨ Full Stack Development\n🤖 AI/ML Engineering\n💡 Innovation & Research\n🚀 Startup Collaborations\n📊 Data Science Projects\n\nFor hiring inquiries, collaboration proposals, or project discussions, please reach out directly:\n📧 Email: 2006nareshd@gmail.com\n📱 WhatsApp: +91 7200754566\n💼 LinkedIn: www.linkedin.com/in/nareshdharmaraj\n\nI'm enthusiastic about contributing to innovative projects and solving real-world problems with technology!"
    };
  }
  
  // About/intro responses
  if (message.includes('about') || message.includes('who') || message.includes('introduce') || message.includes('naresh')) {
    return {
      response: `Hi! I'm ${PORTFOLIO_INFO.name}, a ${PORTFOLIO_INFO.title}. I'm passionate about using AI and technology to solve real-world problems. I have hands-on experience in full-stack development, machine learning, and hardware innovation.\n\nCurrently serving as an Innovation Ambassador at IIC, MKCE, I love mentoring others and contributing to the tech community. My journey includes working on cutting-edge projects like the Smart Helmet patent, participating in national-level hackathons like SIH 2024, and gaining industry exposure through IBM Edunet Foundation.\n\nI believe in continuous learning and applying technology to create meaningful impact. Let's connect and build something amazing together!`
    };
  }
  
  // Greeting responses
  if (message.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)$/)) {
    return {
      response: "Hello! 👋 I'm here to help you learn about my:\n\n💼 Professional experience and skills\n🚀 Projects and innovations\n🎓 Education and certifications\n🏆 Achievements and hackathons\n📞 Contact information\n\nWhat would you like to know?"
    };
  }
  
  // Default response
  return {
    response: "I'm here to answer questions about my professional background, skills, projects, education, and achievements. I can provide information about:\n\n• Technical skills (AI/ML, Full Stack Development)\n• Projects (Smart Helmet, SIH 2024, etc.)\n• Professional experience (IBM Internship, Innovation Ambassador)\n• Education and certifications\n• Contact information and collaboration opportunities\n\nWhat specific aspect would you like to know more about?"
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
