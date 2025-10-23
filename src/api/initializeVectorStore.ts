import { Document } from "langchain/document";
import { vectorStoreService } from "./vectorStore";

// Portfolio content to be stored as documents in the vector store
const portfolioContent = {
  bio: [
    "Naresh D is a Full Stack Developer & AI Specialist with 5+ years of experience.",
    "Naresh D has a Master's in Computer Science, specializing in AI and Machine Learning.",
    "Naresh is passionate about using AI to solve real-world problems.",
    "Naresh is currently working as a Full Stack Developer focused on AI-powered applications."
  ],
  
  skills: [
    "Naresh is proficient in React, Next.js, TypeScript, Node.js, and Python.",
    "Naresh has experience with Machine Learning, LangChain, RAG architecture, and vector databases.",
    "Naresh is skilled in AWS, Docker, PostgreSQL, and serverless architecture.",
    "Naresh has worked extensively with OpenAI API, Vercel AI SDK, and LangChain.",
    "Naresh is familiar with TensorFlow, PyTorch, and Hugging Face transformers.",
    "Naresh has experience in data analysis, statistics, and data visualization.",
    "Naresh excels in deep learning, neural networks, computer vision, NLP, and reinforcement learning."
  ],
  
  projects: [
    "Naresh developed an AI-Powered Code Assistant using OpenAI's API to help developers with code completion and explanations.",
    "Naresh built a scalable e-commerce platform with React, Node.js, and PostgreSQL.",
    "Naresh created an interactive data visualization dashboard using D3.js and React.",
    "Naresh filed a patent for a Smart Helmet (2024) – an emergency alert system that detects accidents.",
    "Naresh participated in Smart India Hackathon 2024, working on satellite image super-resolution.",
    "Naresh cleared Stage 1 of MSME Hackathon 5.0 (2025) with an innovative AI prototype.",
    "Naresh is preparing for Smart India Hackathon 2025 with advanced AI solutions."
  ],
  
  experience: [
    "Naresh is proudly serving as Innovation Ambassador of IIC (2024–25), fostering innovation and entrepreneurship.",
    "Naresh completed the IBM Edunet Foundation Internship (2023), focusing on machine learning and data science.",
    "Naresh has 5+ years of experience in web development and AI applications.",
    "Naresh has worked with multiple startups to implement AI solutions for business problems.",
    "Naresh has contributed to open-source projects related to AI and web development."
  ],
  
  education: [
    "Naresh has a Master's in Computer Science with specialization in AI and Machine Learning.",
    "Naresh has completed several certifications in AI, data science, and web development.",
    "Naresh has participated in multiple hackathons and coding competitions.",
    "Naresh continues learning through online courses and community engagement."
  ]
};

/**
 * Convert portfolio content into LangChain Document objects suitable for embedding
 */
function createPortfolioDocuments(): Document[] {
  const documents: Document[] = [];
  
  // Add bio documents
  portfolioContent.bio.forEach((content, index) => {
    documents.push(
      new Document({
        pageContent: content,
        metadata: { 
          source: "bio", 
          id: `bio-${index}` 
        }
      })
    );
  });
  
  // Add skills documents
  portfolioContent.skills.forEach((content, index) => {
    documents.push(
      new Document({
        pageContent: content,
        metadata: { 
          source: "skills", 
          id: `skill-${index}` 
        }
      })
    );
  });
  
  // Add projects documents
  portfolioContent.projects.forEach((content, index) => {
    documents.push(
      new Document({
        pageContent: content,
        metadata: { 
          source: "projects", 
          id: `project-${index}` 
        }
      })
    );
  });
  
  // Add experience documents
  portfolioContent.experience.forEach((content, index) => {
    documents.push(
      new Document({
        pageContent: content,
        metadata: { 
          source: "experience", 
          id: `experience-${index}` 
        }
      })
    );
  });
  
  // Add education documents
  portfolioContent.education.forEach((content, index) => {
    documents.push(
      new Document({
        pageContent: content,
        metadata: { 
          source: "education", 
          id: `education-${index}` 
        }
      })
    );
  });
  
  return documents;
}

/**
 * Initialize the vector store with portfolio documents
 * This should be called when the application loads with an API key
 */
export async function initializeVectorStore(apiKey: string): Promise<void> {
  try {
    // Create documents from portfolio content
    const documents = createPortfolioDocuments();
    
    console.log(`Created ${documents.length} documents for vector store`);
    
    // Initialize the vector store
    await vectorStoreService.initialize(apiKey);
    
    // Ensure the collection exists and populate it
    await vectorStoreService.ensureCollection(apiKey, documents);
    
    console.log("Vector store initialized successfully");
    
    return Promise.resolve();
  } catch (error) {
    console.error("Failed to initialize vector store:", error);
    return Promise.reject(error);
  }
}

// Export for direct access
export const portfolioDocuments = createPortfolioDocuments();
