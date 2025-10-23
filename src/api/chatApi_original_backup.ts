import axios from 'axios';
import { vectorStoreService } from './vectorStore';
import { OpenAI } from '@langchain/openai';
import { openRouterClient } from './openRouterClient';
import { portfolioContentLoader } from './documentLoader';

// Types for chat messages and responses
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatApiResponse {
  response: string;
  sources?: string[];
}

// In-memory cache for development (replace with proper caching in production)
const responseCache: Record<string, string> = {};

// Portfolio information for generating mock responses
const PORTFOLIO_INFO = {
  name: "Naresh D",
  title: "Full Stack Developer & AI Specialist",
  skills: [
    "React", "Next.js", "TypeScript", "Node.js", 
    "Python", "Machine Learning", "LangChain", 
    "AWS", "Docker", "PostgreSQL"
  ],
  projects: [
    { 
      name: "AI-Powered Code Assistant", 
      description: "Developed an AI code assistant using OpenAI's API to help developers with code completion and explanations." 
    },
    { 
      name: "E-commerce Platform", 
      description: "Built a scalable e-commerce platform with React, Node.js, and PostgreSQL." 
    },
    { 
      name: "Data Visualization Dashboard", 
      description: "Created an interactive dashboard using D3.js and React for visualizing large datasets." 
    }
  ],
  education: "Master's in Computer Science, specializing in AI and Machine Learning",
  experience: "5+ years of experience in web development and AI applications"
};

/**
 * Send a message to the OpenAI API and get a response
 * This is a client-side wrapper for the API call
 */
export async function sendMessageToAI(
  messages: ChatMessage[], 
  apiKey?: string
): Promise<ChatApiResponse> {
  // For development/demo without actual API key
  if (!apiKey) {
    return getMockedAIResponse(messages[messages.length - 1].content);
  }
  
  try {
    // Check if we can use RAG with LangChain and OpenRouter
    if (vectorStoreService) {
      return await getRAGResponseWithOpenRouter(messages[messages.length - 1].content, apiKey);
    }
    
    // Fallback to regular API call
    const response = await axios.post('/api/chat', {
      messages,
      apiKey,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error sending message to AI:', error);
    return {
      response: "Sorry, I'm having trouble connecting to my knowledge base right now. Please try again later."
    };
  }
}

/**
 * Get a mocked AI response for development/demo purposes
 * In production, this would be replaced with the actual API call to OpenAI
 */
function getMockedAIResponse(question: string): Promise<ChatApiResponse> {
  // Cache the response for the same question to simulate consistent AI behavior
  if (responseCache[question.toLowerCase()]) {
    return Promise.resolve({
      response: responseCache[question.toLowerCase()]
    });
  }
  
  const knowledgeBase = {
    projects: {
      "smart helmet": "I've filed a patent for a Smart Helmet (2024) – an emergency alert system that's currently under review for publishing. It detects accidents automatically and alerts emergency contacts with location data.",
      "sih 2024": "I participated in Smart India Hackathon 2024, working on ISRO's challenge focused on satellite image super-resolution using advanced deep learning techniques. Our team developed a model that could enhance low-resolution satellite imagery by up to 4x with minimal information loss.",
      "msme hackathon": "I successfully cleared Stage 1 of MSME Hackathon 5.0 (2025) with an innovative AI prototype designed to solve real-world industry challenges. The solution focused on optimizing manufacturing processes using computer vision and predictive analytics.",
      "sih 2025": "I'm currently preparing for Smart India Hackathon 2025 with stronger, more scalable AI solutions focused on making real-world impact. We're exploring new approaches to environmental monitoring using satellite data and deep learning.",
      "project": "Some of my key projects include: a Smart Helmet with emergency alert system (patent filed), satellite image super-resolution for ISRO in SIH 2024, and an AI prototype for the MSME Hackathon 5.0 where I cleared Stage 1."
    },
    skills: {
      "machine learning": "I'm proficient in deep learning (95%), neural networks (90%), computer vision (88%), NLP (85%), and reinforcement learning (80%).",
      "programming": "My programming skills include Python (95%), SQL (90%), R (85%), JavaScript (80%), and C++ (75%).",
      "frameworks": "I work with TensorFlow (90%), PyTorch (88%), Scikit-learn (92%), Apache Spark (80%), and Docker (85%).",
      "data science": "I excel in data analysis (95%), statistics (90%), data visualization (88%), A/B testing (85%), and ETL pipelines (82%).",
      "skill": "My core skills include AI & Machine Learning (deep learning, neural networks, computer vision, NLP), programming in Python/SQL/R/JavaScript, and frameworks like TensorFlow, PyTorch, and Scikit-learn."
    },
    experience: {
      "innovation ambassador": "I'm proudly serving as Innovation Ambassador of IIC (2024–25) at my college, sparking a culture of research, innovation, and entrepreneurship.",
      "internship": "I completed the IBM Edunet Foundation Internship (2023), gaining industry-grade exposure to machine learning and data science practices.",
      "patent": "I've filed a patent for a Smart Helmet (2024) – an emergency alert system that automatically detects accidents and sends alerts to emergency contacts.",
      "experience": "My experience includes serving as Innovation Ambassador at IIC (2024-25), completing the IBM Edunet Foundation Internship, and filing a patent for a Smart Helmet emergency alert system."
    },
    about: {
      "about": "I'm Naresh D, an AI & Data Science Engineer and Innovation Ambassador. I'm passionate about using AI to solve real-world problems, from creating emergency alert systems to working with satellite imagery. Currently pursuing AI & Data Science at MKCE, I focus on research and innovation.",
      "education": "I'm pursuing AI & Data Science at MKCE with expertise in ML, DL, and NLP. I thrive on connecting research with real-world problem-solving.",
      "contact": "You can reach me at nareshd2006@gmail.com or connect with me on LinkedIn (linkedin.com/in/nareshd) or GitHub (github.com/nareshd). I typically respond to emails within 24 hours."
    }
  };

  const lowerQuestion = question.toLowerCase();
  let response = "";
  
  // Check for project-related questions
  for (const [key, value] of Object.entries(knowledgeBase.projects)) {
    if (lowerQuestion.includes(key)) {
      response = value;
      break;
    }
  }
  
  // Check for skills-related questions
  if (!response) {
    for (const [key, value] of Object.entries(knowledgeBase.skills)) {
      if (lowerQuestion.includes(key)) {
        response = value;
        break;
      }
    }
  }
  
  // Check for experience-related questions
  if (!response) {
    for (const [key, value] of Object.entries(knowledgeBase.experience)) {
      if (lowerQuestion.includes(key)) {
        response = value;
        break;
      }
    }
  }
  
  // Check for about-related questions
  if (!response) {
    for (const [key, value] of Object.entries(knowledgeBase.about)) {
      if (lowerQuestion.includes(key)) {
        response = value;
        break;
      }
    }
  }
  
  // General responses
  if (!response) {
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
      response = "Hello! I'm Mini Naresh, your AI assistant. I can tell you about my projects like the Smart Helmet patent, skills in AI and data science, or my experiences as an Innovation Ambassador. What would you like to know?";
    } else if (lowerQuestion.includes('thank')) {
      response = "You're welcome! I'm happy to help. Feel free to ask if you have any other questions about my portfolio, projects, or background.";
    } else {
      response = "That's an interesting question! I can talk about my projects (like Smart Helmet or SIH participation), skills in AI and machine learning, or my experience as an Innovation Ambassador. What specific aspect would you like to know more about?";
    }
  }
  
  // Cache the response
  responseCache[question.toLowerCase()] = response;
  
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        response,
        sources: ['Portfolio Knowledge Base']
      });
    }, 500);
  });
}

/**
 * In a real implementation, we'd use this function on the server side
 * to set up and manage the vector database for RAG
 */
/* 
async function setupVectorStore() {
  // This would be implemented server-side with:
  // - Document loading from various sources
  // - Text splitting and chunking
  // - Embedding generation
  // - Vector store creation with Chroma or Pinecone
  
  // Implemented in this version using LangChain, ChromaDB, and OpenAI
}
*/

/**
 * Get response using Retrieval-Augmented Generation (RAG)
 * This uses LangChain, ChromaDB, and OpenAI to provide context-aware responses
 */
async function getRAGResponse(question: string, apiKey: string): Promise<ChatApiResponse> {
  try {
    // Initialize vector store if not already initialized
    await vectorStoreService.initialize(apiKey);
    
    // Get relevant documents from vector store
    const documents = await vectorStoreService.similaritySearch(question, 3);
    
    if (!documents || documents.length === 0) {
      // If no relevant documents found, fall back to regular response
      const model = new OpenAI({
        openAIApiKey: apiKey,
        modelName: "gpt-3.5-turbo",
        temperature: 0.7,
      });
      
      const response = await model.invoke(
        `You are Mini Naresh, a helpful AI assistant for Naresh D's portfolio website.
         Answer the following question in a friendly and professional tone: ${question}`
      );
      
      return {
        response,
        sources: ['OpenAI']
      };
    }
    
    // Extract context from documents
    const context = documents.map(doc => doc.pageContent).join("\n");
    
    // Create sources list from document metadata
    const sources = documents.map(doc => 
      doc.metadata.source ? String(doc.metadata.source) : 'Portfolio Knowledge Base'
    );
    
    // Create OpenAI instance
    const model = new OpenAI({
      openAIApiKey: apiKey,
      modelName: "gpt-3.5-turbo",
      temperature: 0.7,
    });
    
    // Construct prompt with context
    const prompt = `
      You are Mini Naresh, a helpful AI assistant for Naresh D's portfolio website.
      Use the following information to answer the question:
      
      ${context}
      
      Question: ${question}
      
      Answer in a friendly and professional tone. If the information isn't in the context and you're unsure, 
      just say you don't have that specific information but provide relevant details that you do know.
    `;
    
    // Get response
    const response = await model.invoke(prompt);
    
    return {
      response,
      sources: [...new Set(sources)] // Remove duplicates
    };
  } catch (error) {
    console.error("Error in RAG response:", error);
    
    // Fall back to mocked response
    return getMockedAIResponse(question);
  }
}

/**
 * Get response using Retrieval-Augmented Generation (RAG) with OpenRouter
 * This uses LangChain for document retrieval and OpenRouter for generation
 */
async function getRAGResponseWithOpenRouter(question: string, apiKey: string): Promise<ChatApiResponse> {
  try {
    // Set the OpenRouter API key
    openRouterClient.setApiKey(apiKey);
    
    // Initialize vector store if not already initialized
    await vectorStoreService.initialize(apiKey);
    
    // Get relevant documents from vector store
    const documents = await vectorStoreService.similaritySearch(question, 5);
    
    if (!documents || documents.length === 0) {
      // If no relevant documents found, try to load directly from content folder
      try {
        const contentDocs = await portfolioContentLoader.loadAllContent();
        if (contentDocs.length > 0) {
          // Use direct content without vector search
          const context = contentDocs
            .slice(0, 3) // Just take first few documents
            .map(doc => doc.pageContent)
            .join("\n\n");
          
          // Generate response with OpenRouter
          const response = await openRouterClient.generateResponse(question, context);
          
          return {
            response,
            sources: ['Portfolio Content']
          };
        }
      } catch (error) {
        console.error("Error loading content directly:", error);
      }
      
      // Fall back to OpenRouter without context
      const response = await openRouterClient.generateResponse(question);
      
      return {
        response,
        sources: ['OpenRouter']
      };
    }
    
    // Extract context from documents
    const context = documents.map(doc => doc.pageContent).join("\n\n");
    
    // Create sources list from document metadata
    const sources = documents.map(doc => {
      if (doc.metadata.category && doc.metadata.filename) {
        return `${doc.metadata.category}/${doc.metadata.filename}`;
      }
      return doc.metadata.source ? String(doc.metadata.source) : 'Portfolio Knowledge Base';
    });
    
    // Generate response with OpenRouter
    const response = await openRouterClient.generateResponse(question, context);
    
    return {
      response,
      sources: [...new Set(sources)] // Remove duplicates
    };
  } catch (error) {
    console.error("Error in RAG response with OpenRouter:", error);
    
    // Fall back to mocked response
    return getMockedAIResponse(question);
  }
}
