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
  title: "Full Stack Developer & Data Science Enthusiast",
  education: {
    college: "MKCE (M. Kumarasamy College of Engineering)",
    degree: "Bachelor's degree in Artificial Intelligence and Data Science",
    achievements: [
      "Innovation Ambassador at IIC, MKCE (2024-25)",
      "Active participant in research and innovation activities",
      "Specialized training in Data Science and Analytics"
    ]
  },
  skills: {
    programming: [
      "HTML (80% proficiency)",
      "CSS (80% proficiency)",
      "JavaScript (40% proficiency)",
      "Java (30% proficiency)",
      "Python (30% proficiency)",
      "SQL (70% proficiency)"
    ],
    tools: [
      "IBM Cloud (40% proficiency)",
      "IBM SPSS (90% proficiency)",
      "n8n (30% proficiency)",
      "Excel (70% proficiency)",
      "Word (70% proficiency)",
      "PowerPoint (70% proficiency)"
    ],
    datascience: [
      "Data Analysis (35% proficiency)",
      "Statistics (30% proficiency)",
      "Data Visualization (40% proficiency)"
    ],
    frameworks: [
      "MERN Stack (MongoDB, Express, React, Node.js)",
      "Flutter (Mobile Development)",
      "PySpark (Big Data Processing)"
    ]
  },
  projects: [
    {
      name: "Smart Helmet",
      description: "Emergency alert system that automatically detects accidents and sends alerts to emergency contacts. Currently under review for publishing.",
      tech: ["Hardware", "IoT", "GPS"],
      category: "Patent",
      details: "IoT-enabled smart helmet with built-in GPS tracking and accelerometer sensors that automatically detect accidents and send real-time alerts with location data to emergency contacts and nearby hospitals. Traditional helmets don't provide automatic accident detection or emergency alerts, leading to delayed medical response in critical situations."
    },
    {
      name: "PMSS",
      description: "This project focuses on reducing the duration and the paper work for military families to avail the PMS Scheme.",
      tech: ["MERN Stack"],
      category: "SIH 2024",
      details: "Built a digital platform using MERN stack that automates application processing, document verification, and status tracking for Prime Minister's Scholarship Scheme, reducing processing time by 70% and eliminating physical paperwork. Military families face extensive paperwork and long processing times when applying for the scheme."
    },
    {
      name: "TOX-to-BOX",
      description: "Successfully cleared Stage 1 with an innovative AI prototype designed to solve real-world industry challenges.",
      tech: ["Carbon Footprint Analysis"],
      category: "MSME 5.0",
      details: "Created an AI-powered platform that analyzes manufacturing processes and provides actionable insights to reduce carbon emissions, with automated reporting and compliance tracking. MSMEs lack affordable and accessible tools to measure and reduce their carbon footprint."
    },
    {
      name: "My Health",
      description: "A mobile-first (Android & iOS) + smartwatch-enabled healthcare application designed for migrant workers in Kerala.",
      tech: ["Mobile App", "MongoDB", "Node.js", "Flutter"],
      category: "SIH 2025",
      details: "Cross-platform mobile app using Flutter that provides secure, portable digital health records with multilingual support, enabling seamless healthcare access across different states and hospitals. Ensures portable, secure, AI-driven health records and real-time outbreak prevention for migrant workers."
    },
    {
      name: "Farm2Market",
      description: "Bridging Fields and Markets - A Platform Connecting Farmers Directly with Buyers to Optimize Supply Chains and Maximize Profits.",
      tech: ["MERN Stack"],
      category: "Hackathon",
      details: "Web-based marketplace that connects farmers directly with buyers, eliminating middlemen and ensuring fair pricing. Features multilingual support and simple UI empowering rural communities to participate in digital trade. Solves the problem of farmer exploitation by middlemen in rural India."
    },
    {
      name: "Fraud Shield",
      description: "AI-Powered Fraud Detection System for Financial Fraud Detection using PySpark.",
      tech: ["HTML", "CSS", "JavaScript", "PySpark", "Isolation Forest"],
      category: "Minor Project",
      details: "AI-powered fraud detection system using PySpark that analyzes transaction patterns in real-time. Employs Isolation Forest algorithms to identify anomalies and flag potentially fraudulent transactions, reducing false positives and enhancing security."
    },
    {
      name: "Heaven Connect",
      description: "A community-focused mobile application that connects people for service sharing and community building.",
      tech: ["Flutter", "MongoDB", "Node.js"],
      category: "Minor Project",
      details: "Mobile application that facilitates service sharing among community members. Users can offer and request services such as tutoring, handyman work, and transportation. Includes user profiles, ratings, and secure messaging system to foster trust and collaboration."
    }
  ],
  experience: [
    {
      role: "Innovation Ambassador",
      organization: "IIC (Institution's Innovation Council), MKCE",
      period: "2024-25",
      description: "Promoting a culture of research, innovation, and entrepreneurship.",
      details: "Organizing workshops, mentoring startup ideas, and fostering collaboration between academia and industry. Completed both Foundation Level and Advanced Level training from MOE, IIC. Reflects leadership skills and commitment to nurturing innovation in the student community."
    },
    {
      role: "IBM Edunet Foundation Internship",
      organization: "IBM Edunet Foundation",
      period: "2025",
      description: "Virtual internship gaining industry-grade exposure to data science practices.",
      details: "Completed virtual internship focusing on Applied Data Science with Python. Worked on practical data science projects and learned industry-standard tools and methodologies including IBM Cloud and IBM SPSS."
    }
  ],
  interests: [
    "Data Science and Analytics",
    "Full-stack web development (MERN Stack)",
    "Mobile app development (Flutter)",
    "Social impact projects",
    "Community building through technology",
    "Solving real-world problems for rural communities",
    "Healthcare innovation",
    "Sustainability and carbon footprint reduction"
  ]
};

// Generate mock responses based on user input
function getMockedAIResponse(userMessage: string): ChatApiResponse {
  const message = userMessage.toLowerCase();
  
  // Language Detection - Check for non-English characters/patterns
  // eslint-disable-next-line no-control-regex
  const hasNonEnglish = /[^\x00-\x7F]/.test(userMessage);
  const commonNonEnglishPatterns = [
    /[\u0900-\u097F]/, // Hindi
    /[\u0B80-\u0BFF]/, // Tamil
    /[\u0C00-\u0C7F]/, // Telugu
    /[\u4E00-\u9FFF]/, // Chinese
    /[\u0600-\u06FF]/, // Arabic
    /[\u3040-\u309F]/, // Japanese Hiragana
    /[\u30A0-\u30FF]/, // Japanese Katakana
  ];
  
  const isNonEnglish = commonNonEnglishPatterns.some(pattern => pattern.test(userMessage));
  
  if (hasNonEnglish || isNonEnglish) {
    return {
      response: "🌐 **Language Notice**\n\nI noticed you may be writing in a language other than English. Currently, I'm optimized to provide the best responses in **English** only.\n\n**Options**:\n1. 📝 Please rephrase your question in English, and I'll be happy to help!\n2. 📧 For queries in other languages, please contact me directly:\n   - Email: 2006nareshd@gmail.com\n   - WhatsApp: +91 7200754566\n\nI appreciate your understanding! 🙏"
    };
  }
  
  // Detect if message is too vague or unclear
  const tooShort = message.length < 3;
  const singleWord = !message.includes(' ') && message.length < 15;
  
  if (tooShort || (singleWord && !['hi', 'hello', 'hey', 'naresh'].includes(message))) {
    return {
      response: "I'd love to help you! However, your message seems a bit brief. Could you please provide more details? Here are some things you can ask me about:\n\n💼 **Professional**:\n- My projects and technical work\n- Skills and certifications\n- Experience and achievements\n\n🎓 **Academic**:\n- Education background\n- Research interests\n- Hackathon participation\n\n📞 **Contact**:\n- How to reach me\n- Collaboration opportunities\n- Hiring inquiries\n\nFeel free to ask anything specific!"
    };
  }
  
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
    'hire', 'recruit', 'job', 'opportunity', 'collaborate', 'collaboration',
    // Project names
    'pmss', 'tox', 'box', 'health', 'farm', 'market', 'fraud', 'shield',
    'heaven', 'connect', 'smart helmet',
    // Tech stack keywords
    'mern', 'flutter', 'mongodb', 'node', 'html', 'css', 'javascript',
    'pyspark', 'sql', 'iot', 'gps', 'spss', 'excel', 'n8n'
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
      response: "I'm currently pursuing my education with a strong focus on Artificial Intelligence and Data Science. I'm actively involved in research, innovation, and entrepreneurship activities. As an Innovation Ambassador at IIC, MKCE, I promote academic excellence and practical application of technology. I've also completed specialized training through IBM Edunet Foundation in Machine Learning and Data Science."
    };
  }
  
  // Skills-related responses
  if (message.includes('skill') || message.includes('technology') || message.includes('tech')) {
    return {
      response: `I have comprehensive expertise across multiple domains:\n\n💻 **Programming Languages**: ${PORTFOLIO_INFO.skills.programming.slice(0, 4).join(', ')}\n\n🔧 **Tools & Platforms**: ${PORTFOLIO_INFO.skills.tools.slice(0, 4).join(', ')}\n\n📊 **Data Science**: ${PORTFOLIO_INFO.skills.datascience.join(', ')}\n\n⚙️ **Frameworks & Technologies**: ${PORTFOLIO_INFO.skills.frameworks.join(', ')}\n\nI'm continuously learning and expanding my skill set. If you ask about a skill I haven't mastered yet, I'm always eager to learn and grow!`
    };
  }
  
  // Machine Learning specific
  if (message.includes('machine learning') || message.includes('ml') || message.includes('ai') || message.includes('deep learning') || message.includes('neural network')) {
    // Check if asking about advanced ML/AI
    const hasAdvancedML = message.includes('tensorflow') || message.includes('pytorch') || 
                          message.includes('deep learning') || message.includes('neural');
    
    if (hasAdvancedML) {
      return {
        response: `While I don't currently have extensive experience with advanced deep learning frameworks like TensorFlow or PyTorch, I'm actively interested in learning them!\n\n📚 **My Current Focus**:\n• Data Science fundamentals with Python\n• Statistical analysis with IBM SPSS\n• Data visualization techniques\n• Building practical applications with MERN stack and Flutter\n\n🎯 **Future Learning Goals**:\n• Deep Learning frameworks (TensorFlow, PyTorch)\n• Advanced Neural Networks\n• Computer Vision applications\n• Natural Language Processing\n\nI'm currently working on projects like Fraud Shield (using PySpark and ML algorithms) and TOX-to-BOX (AI for carbon footprint analysis), which are helping me build my AI/ML foundation. I'm excited about expanding into more advanced ML domains!`
      };
    }
    
    return {
      response: `I'm building my expertise in AI and Machine Learning through practical projects and certifications:\n\n🤖 **Current AI/ML Work**:\n• Fraud Shield: AI-powered fraud detection using PySpark and Isolation Forest\n• TOX-to-BOX: AI platform for carbon footprint analysis (MSME Hackathon 5.0)\n• Applied Data Science with Python (IBM Certification)\n\n📊 **Data Science Skills**:\n${PORTFOLIO_INFO.skills.datascience.map(skill => `• ${skill}`).join('\n')}\n\n🛠️ **Tools**:\n• IBM SPSS for statistical analysis\n• Python for data processing\n• PySpark for big data analytics\n\nI'm passionate about applying AI to solve real-world problems and continuously expanding my knowledge in this exciting field!`
    };
  }
  
  // Data Science specific
  if (message.includes('data science') || message.includes('data analysis') || message.includes('analytics')) {
    return {
      response: `I have strong data science capabilities:\n\n📊 **Data Science Skills**:\n${PORTFOLIO_INFO.skills.datascience.map(skill => `• ${skill}`).join('\n')}\n\n🔧 **Tools & Technologies**:\n• Python, R, SQL for data manipulation\n• TensorFlow, PyTorch for ML models\n• Apache Spark for big data processing\n• Data visualization and statistical analysis\n\nI combine statistical knowledge with programming expertise to extract insights from complex datasets and build predictive models.`
    };
  }
  
  // Web Development specific
  if (message.includes('web') || message.includes('frontend') || message.includes('backend') || message.includes('full stack') || message.includes('react') || message.includes('next') || message.includes('mern')) {
    return {
      response: `I'm proficient in full-stack web development, especially with the MERN stack:\n\n🎨 **Frontend**:\n• HTML (80% proficiency)\n• CSS (80% proficiency)\n• JavaScript (40% proficiency)\n• React (part of MERN stack)\n\n⚙️ **Backend**:\n• Node.js (MERN stack)\n• Express.js (MERN stack)\n• MongoDB database\n• RESTful API design\n\n🚀 **Projects Built with MERN**:\n• **PMSS** (SIH 2024): Digital platform for scholarship applications\n• **Farm2Market**: Connects farmers directly with buyers\n\n📱 **Mobile Development**:\n• Flutter for cross-platform apps (My Health, Heaven Connect)\n\nI enjoy building end-to-end applications that solve real-world problems, from concept to deployment!`
    };
  }
  
  // Projects-related responses
  if (message.includes('project') || message.includes('build') || message.includes('develop')) {
    // Check for specific project mentions
    if (message.includes('helmet')) {
      return {
        response: `**Smart Helmet** is one of my most innovative projects - a patent-pending emergency alert system!\n\n🛡️ **Overview**:\nAn IoT-enabled safety device that automatically detects accidents and sends real-time alerts to emergency contacts.\n\n💡 **Problem Solved**:\nTraditional helmets don't provide automatic accident detection, leading to delayed medical response in critical situations.\n\n🔧 **Technology**:\n• IoT sensors and accelerometers\n• GPS tracking for location data\n• Real-time alert system\n• Emergency contact integration\n\n📋 **Status**: Patent Filed - Currently Under Review (2024)\n\nThis project showcases my ability to combine hardware innovation with IoT technology to create life-saving solutions!`
      };
    }
    
    if (message.includes('pmss') || message.includes('scholarship')) {
      return {
        response: `**PMSS** was my Smart India Hackathon 2024 project - a game-changer for military families!\n\n🎯 **Project Goal**:\nReduce paperwork and processing time for Prime Minister's Scholarship Scheme applications.\n\n� **Problem Solved**:\nMilitary families faced extensive paperwork and long processing times (months) when applying for scholarships.\n\n🛠️ **Solution Built**:\n• Digital platform using MERN Stack (MongoDB, Express, React, Node.js)\n• Automated application processing\n• Document verification system\n• Real-time status tracking\n• Reduced processing time by 70%!\n\n🏆 **Achievement**: Successfully demonstrated at SIH 2024\n\nThis project shows my ability to use technology to streamline government processes and help those who serve our nation!`
      };
    }
    
    if (message.includes('tox') || message.includes('carbon') || message.includes('msme')) {
      return {
        response: `**TOX-to-BOX** is my MSME Hackathon 5.0 project focused on environmental sustainability!\n\n🌱 **Project Goal**:\nHelp MSMEs (Micro, Small & Medium Enterprises) reduce their carbon footprint.\n\n💡 **Problem Solved**:\nMSMEs lack affordable tools to measure and reduce carbon emissions, hindering sustainability goals.\n\n🤖 **AI Solution**:\n• Platform that analyzes manufacturing processes\n• Provides actionable insights to reduce emissions\n• Automated compliance reporting\n• Carbon footprint tracking\n\n🏆 **Achievement**: Successfully cleared Stage 1, advancing to finals!\n\nThis project demonstrates my commitment to using AI for environmental sustainability and helping industries go green!`
      };
    }
    
    if (message.includes('health') || message.includes('migrant')) {
      return {
        response: `**My Health** is my SIH 2025 project - a healthcare solution for migrant workers!\n\n🏥 **Project Goal**:\nProvide portable, secure digital health records for migrant workers in Kerala.\n\n💡 **Problem Solved**:\nMigrant workers struggle to maintain health records when moving across regions, leading to fragmented healthcare and repeated medical tests.\n\n📱 **Mobile Solution**:\n• Cross-platform app built with Flutter\n• Secure, portable digital health records\n• Multilingual support for accessibility\n• Smartwatch integration\n• AI-driven health insights\n• Real-time outbreak prevention alerts\n\n🛠️ **Tech Stack**: Flutter, MongoDB, Node.js\n\n📋 **Status**: Currently in Beta Testing Phase\n\nThis project showcases my passion for using technology to improve healthcare access for underserved communities!`
      };
    }
    
    if (message.includes('farm') || message.includes('farmer')) {
      return {
        response: `**Farm2Market** is my hackathon project empowering farmers across India!\n\n🌾 **Project Goal**:\nConnect farmers directly with buyers, eliminating exploitative middlemen.\n\n💡 **Problem Solved**:\nIn rural India, farmers sell produce at unfairly low prices to middlemen while consumers pay high market rates. Farmers lack digital access and direct buyer connections.\n\n🛠️ **Web Platform Features**:\n• Built with MERN Stack\n• Direct farmer-to-buyer marketplace\n• Transparent pricing system\n• Multilingual support for rural users\n• Simple UI designed for low digital literacy\n• Verification system for trust\n\n📋 **Status**: Prototype Ready for Testing\n\nThis project reflects my commitment to using technology for social impact and empowering rural communities!`
      };
    }
    
    if (message.includes('fraud') || message.includes('financial')) {
      return {
        response: `**Fraud Shield** is my AI-powered financial fraud detection system!\n\n💳 **Project Goal**:\nDetect fraudulent financial transactions in real-time using machine learning.\n\n💡 **Problem Solved**:\nBanks face millions of daily transactions with fraud hidden among legitimate ones, making manual detection impossible.\n\n🤖 **AI Solution**:\n• Built with PySpark for big data processing\n• Isolation Forest algorithm for anomaly detection\n• Real-time transaction analysis\n• Reduced false positives\n• Enhanced security measures\n\n🛠️ **Tech Stack**: HTML, CSS, JavaScript, PySpark, ML algorithms\n\n📋 **Status**: ML Model Fine-tuning in Progress\n\nThis minor project demonstrates my understanding of applying AI to cybersecurity and financial technology!`
      };
    }
    
    if (message.includes('heaven') || message.includes('community')) {
      return {
        response: `**Heaven Connect** is my community service-sharing mobile application!\n\n🤝 **Project Goal**:\nConnect community members for service sharing and collaboration.\n\n💡 **Problem Solved**:\nPeople have underutilized skills/resources while others struggle to access essential services within their neighborhoods.\n\n📱 **App Features**:\n• Built with Flutter for cross-platform compatibility\n• Offer and request services (tutoring, handyman, transportation)\n• User profiles and ratings system\n• Secure messaging for trust\n• MongoDB backend\n\n🛠️ **Tech Stack**: Flutter, MongoDB, Node.js\n\n📋 **Status**: Deep Research Phase\n\nThis project shows my interest in building technology that strengthens community bonds and mutual support!`
      };
    }
    
    // General projects response
    const projectList = PORTFOLIO_INFO.projects.map(p => 
      `**${p.name}** (${p.category})\n${p.description}\n*Technologies*: ${p.tech.join(', ')}`
    ).join('\n\n');
    
    return {
      response: `Here are my innovative projects spanning multiple domains:\n\n${projectList}\n\nEach project demonstrates my ability to identify real-world problems and create meaningful technical solutions. Want to know more about any specific project?`
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
      response: "I completed a virtual internship with IBM Edunet Foundation in 2025, gaining valuable industry exposure to data science practices!\n\n📚 **Key Learnings**:\n• Applied Data Science with Python (Level 2 Certification)\n• Data Analysis and Visualization techniques\n• IBM Cloud platform experience\n• IBM SPSS for statistical analysis (90% proficiency)\n• Industry-standard data science methodologies\n\n🛠️ **Practical Experience**:\n• Worked on real-world data science projects\n• Learned data processing and analytics workflows\n• Gained exposure to cloud-based data solutions\n\nThis internship strengthened my foundation in data science and introduced me to enterprise-level tools and best practices!"
    };
  }
  
  // Innovation Ambassador responses
  if (message.includes('innovation') || message.includes('ambassador') || message.includes('iic')) {
    return {
      response: `I'm currently serving as an **Innovation Ambassador** at IIC (Institution's Innovation Council), MKCE for 2024-25!\n\n🎯 **Role & Responsibilities**:\n• Promoting research, innovation, and entrepreneurship culture\n• Organizing workshops and technical events\n• Mentoring students on startup ideas and projects\n• Fostering academia-industry collaboration\n• Leading innovation initiatives on campus\n\n📜 **Certifications Completed**:\n• Foundation Level Training (MOE, IIC)\n• Advanced Level Training (MOE, IIC)\n\n💡 **Impact**:\nThis position reflects my leadership skills, passion for innovation, and commitment to nurturing the next generation of innovators and entrepreneurs in our institution!`
    };
  }
  
  // SIH specific - CORRECTED (not about ISRO)
  if (message.includes('sih') || message.includes('smart india')) {
    return {
      response: `I've participated in Smart India Hackathon for both 2024 and 2025!\n\n🏆 **SIH 2024 - PMSS Project**:\n• Problem: Reduce paperwork and processing time for Prime Minister's Scholarship Scheme\n• Solution: Built a digital platform using MERN Stack\n• Impact: Reduced processing time by 70%, eliminated physical paperwork\n• For: Military families applying for scholarships\n\n🏆 **SIH 2025 - My Health**:\n• Problem: Migrant workers struggle with fragmented healthcare records\n• Solution: Cross-platform mobile app with Flutter\n• Features: Portable digital health records, multilingual support, smartwatch integration\n• Status: Currently in Beta Testing Phase\n\n💪 **Skills Demonstrated**:\n• Full-stack development (MERN, Flutter)\n• Problem-solving under pressure\n• Team collaboration\n• Social impact through technology\n\nBoth projects focus on using technology to solve real-world problems for underserved communities!`
    };
  }
  
  // College/Education specific
  if (message.includes('college') || message.includes('mkce') || message.includes('university') || message.includes('degree') || message.includes('study')) {
    return {
      response: `I'm pursuing my education at **${PORTFOLIO_INFO.education.college}** with a focus on Artificial Intelligence and Data Science.\n\n🎓 **Academic Highlights**:\n${PORTFOLIO_INFO.education.achievements.map(a => `• ${a}`).join('\n')}\n\nI actively participate in research, innovation, and entrepreneurship activities, combining academic excellence with practical application of technology. My education is complemented by industry certifications and hands-on project experience.`
    };
  }
  
  // Python specific
  if (message.includes('python') && !message.includes('programming')) {
    return {
      response: `I have **30% proficiency** in Python and I'm actively working to improve!\n\n🐍 **Current Python Usage**:\n• Data Analysis projects\n• Applied Data Science (IBM Certification)\n• PySpark for Fraud Shield project\n• Data processing and automation\n\n📚 **Learning Path**:\n• Building practical projects to strengthen skills\n• Working with data science libraries\n• Applying Python in real-world applications\n\n🎯 **Future Goals**:\n• Advanced Python frameworks (Django, FastAPI)\n• More sophisticated data science techniques\n• Machine learning implementations\n\nI'm enthusiastic about deepening my Python expertise through continuous practice and project work!`
    };
  }
  
  // Interests/Passion
  if (message.includes('interest') || message.includes('passion') || message.includes('hobby') || message.includes('like')) {
    return {
      response: `I'm passionate about:\n\n${PORTFOLIO_INFO.interests.map(i => `🌟 ${i}`).join('\n')}\n\n💡 **What Drives Me**:\nI believe in using technology as a force for positive social impact. Whether it's helping farmers get fair prices (Farm2Market), improving healthcare for migrant workers (My Health), or creating life-saving devices (Smart Helmet), I'm motivated by creating solutions that make a real difference in people's lives.\n\n🎯 **Core Values**:\n• Innovation with purpose\n• Technology for social good\n• Continuous learning and growth\n• Community empowerment through tech\n\nI love tackling real-world challenges and building solutions that bridge the gap between technology and human needs!`
    };
  }
  
  // Smart Helmet responses
  if (message.includes('helmet') || message.includes('patent')) {
    return {
      response: "I've filed a patent for **Smart Helmet** - an innovative emergency alert system that saves lives!\n\n🛡️ **Innovation**:\nAn IoT-enabled safety device that automatically detects accidents and alerts emergency contacts in real-time.\n\n🔧 **Technology**:\n• IoT sensors and accelerometers for accident detection\n• GPS tracking for precise location data\n• Real-time alert system\n• Emergency contact integration\n• Mobile app connectivity\n\n💡 **Impact**:\nTraditional helmets can't call for help during accidents, leading to delayed medical response. My Smart Helmet solves this critical problem by automating emergency alerts, potentially saving lives in critical situations.\n\n📋 **Status**: Patent Filed - Currently Under Review (2024)\n\nThis project showcases my ability to innovate in hardware IoT solutions and create technology with real-world life-saving applications!"
    };
  }
  
  // Hackathon responses
  if (message.includes('hackathon') || message.includes('competition')) {
    return {
      response: `I've actively participated in multiple prestigious hackathons:\n\n🏆 **Smart India Hackathon 2024**:\n• Project: PMSS (Prime Minister's Scholarship Scheme digitalization)\n• Tech: MERN Stack\n• Achievement: Successfully demonstrated working platform\n\n🏆 **MSME Hackathon 5.0 (2025)**:\n• Project: TOX-to-BOX (Carbon footprint analysis for MSMEs)\n• Tech: AI-powered analytics\n• Achievement: Cleared Stage 1, advancing to finals\n\n🏆 **Smart India Hackathon 2025**:\n• Project: My Health (Healthcare app for migrant workers)\n• Tech: Flutter, MongoDB, Node.js\n• Status: Currently in Beta Testing\n\n🏆 **Farm2Market Hackathon**:\n• Project: Direct farmer-to-buyer marketplace\n• Tech: MERN Stack\n• Status: Prototype ready\n\n💪 **What I've Learned**:\n• Problem-solving under pressure\n• Team collaboration and leadership\n• Rapid prototyping and development\n• Presenting technical solutions effectively\n• Building impactful, user-centric applications\n\nThese experiences have been instrumental in shaping my technical skills and entrepreneurial mindset!`
    };
  }
  
  // Certificates/Achievements responses
  if (message.includes('certificate') || message.includes('achievement') || message.includes('award') || message.includes('certification')) {
    return {
      response: `I've earned multiple certifications demonstrating my commitment to continuous learning:\n\n🏆 **Leadership & Innovation**:\n• Innovation Ambassador - Foundation Level (MOE, IIC, 2024-25)\n• Innovation Ambassador - Advanced Level (MOE, IIC, 2024-25)\n\n💻 **Technical Certifications**:\n• IBM Edunet Foundation Virtual Internship (2025)\n• Applied Data Science with Python Level 2 (IBM, 2025)\n• Data Analysis with Python (Cognitive Class AI, 2024)\n• Data Visualization (Cognitive Class AI, 2025)\n\n☁️ **Cloud & Infrastructure**:\n• Describe Cloud Computing (Microsoft, 2025)\n• Describe Cloud Service Types (Microsoft, 2025)\n• Describe Azure Compute and Networking Services (Microsoft, 2025)\n• Describe Azure Storage Services (Microsoft, 2025)\n\n📊 **Other Certifications**:\n• AI-Powered IoT Boot Camp (NoviTech, 2024)\n• Business Email (HP Life, 2025)\n\n🏅 **Hackathon Achievements**:\n• SIH 2024 Participant\n• MSME Hackathon 5.0 - Stage 1 Cleared\n• Smart Helmet Patent Filing\n\nYou can view detailed certificates in the Skills section of my portfolio. These certifications reflect my dedication to expanding my knowledge across data science, cloud computing, and innovation!`
    };
  }
  
  // Hiring/Recruitment responses
  if (message.includes('hire') || message.includes('recruit') || message.includes('position') || message.includes('opportunity') || message.includes('available')) {
    return {
      response: `I'm open to exciting opportunities in:\n\n✨ **Full Stack Development** (MERN Stack, Flutter)\n📊 **Data Science & Analytics**\n💡 **Innovation & Social Impact Projects**\n🚀 **Startup Collaborations**\n🤝 **Community-Focused Technology Solutions**\n\n🎯 **What I Bring**:\n• Strong problem-solving skills with real-world project experience\n• Experience building impactful applications (7+ projects)\n• Hackathon experience (SIH 2024, MSME 5.0, etc.)\n• Leadership as Innovation Ambassador\n• Passion for technology that creates social impact\n\n📧 **Let's Connect**:\nEmail: 2006nareshd@gmail.com\n📱 WhatsApp: +91 7200754566\n💼 LinkedIn: www.linkedin.com/in/nareshdharmaraj\n🐙 GitHub: github.com/nareshdharmaraj\n\nI'm enthusiastic about contributing to innovative projects and solving real-world problems with technology. Let's build something amazing together!`
    };
  }
  
  // About/intro responses
  if (message.includes('about') || message.includes('who') || message.includes('introduce') || message.includes('naresh')) {
    return {
      response: `Hi! I'm ${PORTFOLIO_INFO.name}, a ${PORTFOLIO_INFO.title}.\n\n💡 **What I Do**:\nI'm passionate about building technology that creates real-world impact, especially for underserved communities. My projects range from healthcare apps for migrant workers to platforms empowering farmers!\n\n🎓 **Current Role**:\n• Innovation Ambassador at IIC, MKCE (2024-25)\n• Student of AI and Data Science at MKCE\n• Active hackathon participant (SIH 2024, MSME 5.0, SIH 2025)\n\n🚀 **Key Projects**:\n• Smart Helmet (Patent Pending) - IoT safety device\n• PMSS (SIH 2024) - Scholarship digitalization platform\n• My Health (SIH 2025) - Healthcare app for migrants\n• Farm2Market - Direct farmer-buyer marketplace\n• TOX-to-BOX (MSME 5.0) - Carbon footprint analysis\n\n💼 **Experience**:\n• IBM Edunet Foundation Virtual Internship (2025)\n• Multiple certifications in Data Science and Cloud Computing\n\n🌟 **My Belief**:\nTechnology should empower people and solve real problems. Whether it's helping farmers, migrant workers, or military families, I believe in creating solutions that make a meaningful difference!\n\nLet's connect and build something impactful together! 🚀`
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
    response: "I'm here to answer questions about my professional background, skills, projects, education, and achievements. I can provide information about:\n\n💻 **Technical Skills**: Programming (HTML, CSS, JavaScript, Python, SQL), Tools (IBM SPSS, IBM Cloud, Excel), Data Science, MERN Stack, Flutter\n🚀 **Projects**: Smart Helmet, PMSS (SIH 2024), TOX-to-BOX (MSME 5.0), My Health (SIH 2025), Farm2Market, Fraud Shield, Heaven Connect\n💼 **Experience**: Innovation Ambassador (IIC, MKCE), IBM Edunet Foundation Internship\n🎓 **Education & Certifications**: AI & Data Science student, IBM certifications, Microsoft Azure certifications\n📞 **Contact**: How to reach me for opportunities\n\n**Note**: If you're asking about a skill or technology I haven't mentioned, I'm always eager to learn new things! While I may not have experience with it yet, I'm open to expanding my expertise.\n\nWhat specific aspect would you like to know more about?"
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
