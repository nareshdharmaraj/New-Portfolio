// Example Next.js API route for RAG implementation with OpenAI and LangChain
// For actual implementation, you'll need to install:
// npm install langchain @langchain/openai @langchain/chroma openai

import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIEmbeddings } from "@langchain/openai";
import { Chroma } from "@langchain/chroma";
import { ChatOpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";

// Type definitions
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type RequestData = {
  messages: Message[];
  apiKey?: string;
};

type ResponseData = {
  response: string;
  sources?: string[];
  error?: string;
};

// The vector store should be initialized outside of the request handler
// to ensure persistence between requests
let vectorStore: Chroma | null = null;

/**
 * Initialize the vector store with documents
 * In a production app, this would be a separate process
 */
async function initVectorStore(apiKey: string) {
  if (vectorStore) return vectorStore;
  
  try {
    // In production, you'd load documents from a database or files
    // const loader = new TextLoader("./data/portfolio.txt");
    // const docs = await loader.load();
    
    // For this example, we're using pre-defined text
    const portfolioText = `
      Naresh D is an AI & Data Science Engineer and Innovation Ambassador.
      
      Projects:
      - Smart Helmet Patent (2024) – Emergency alert system that automatically detects accidents and sends alerts to emergency contacts. Currently under review for publishing.
      - SIH 2024 Participant – Worked on ISRO's challenge on satellite image super-resolution using advanced deep learning techniques.
      - MSME Hackathon 5.0 (2025) – Cleared Stage 1 with an innovative AI prototype designed to solve real-world industry challenges.
      - SIH 2025 (Upcoming) – Preparing with stronger, scalable AI solutions focused on real-world impact.
      - IBM Edunet Internship – Completed virtual internship with IBM Edunet Foundation, gaining industry-grade exposure to machine learning and data science practices.
      
      Skills:
      - AI & Machine Learning: Deep learning (95%), neural networks (90%), computer vision (88%), NLP (85%), reinforcement learning (80%)
      - Programming: Python (95%), SQL (90%), R (85%), JavaScript (80%), C++ (75%)
      - Frameworks: TensorFlow (90%), PyTorch (88%), Scikit-learn (92%), Apache Spark (80%), Docker (85%)
      - Data Science: Data analysis (95%), statistics (90%), visualization (88%), A/B testing (85%), ETL pipelines (82%)
      
      Achievements:
      - Innovation Ambassador of IIC (2024–25) at MKCE
      - Patent Filed – Smart Helmet (2024, under review)
      - Cleared Stage 1 of MSME Hackathon 5.0 (2025)
      - IBM Edunet Foundation Internship (2023)
      
      Certifications:
      - AWS ML Specialist
      - Google Cloud ML Engineer
      - Microsoft Azure AI Engineer
      
      Contact:
      - Email: nareshd2006@gmail.com
      - LinkedIn: linkedin.com/in/nareshd
      - GitHub: github.com/nareshd
      - Response Time: Email (24 hrs), Projects (48 hrs), Research Collaborations (1 week)
    `;
    
    // In a real implementation, you would split this text into chunks
    // const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    // const splitDocs = await textSplitter.splitDocuments(docs);
    
    // Create vector store
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: apiKey
    });
    
    // For a real implementation with documents:
    // vectorStore = await Chroma.fromDocuments(splitDocs, embeddings, {
    //   collectionName: "portfolio-data"
    // });
    
    // For this example, we'll create a simple vector store with the text
    vectorStore = await Chroma.fromTexts(
      [portfolioText],
      [{ source: "Portfolio Data" }],
      embeddings,
      { collectionName: "portfolio-data" }
    );
    
    return vectorStore;
  } catch (error) {
    console.error("Error initializing vector store:", error);
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ response: '', error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { messages, apiKey } = req.body as RequestData;
    
    // Validate required data
    if (!messages || !messages.length) {
      return res.status(400).json({ response: '', error: 'Messages are required' });
    }
    
    // Use API key from request or environment
    const openaiApiKey = apiKey || process.env.OPENAI_API_KEY;
    
    if (!openaiApiKey) {
      return res.status(500).json({ 
        response: '', 
        error: 'OpenAI API key is required. Provide it in the request or set it as an environment variable.' 
      });
    }
    
    // Get the user's last question
    const lastUserMessage = messages.slice().reverse().find(m => m.role === 'user');
    
    if (!lastUserMessage) {
      return res.status(400).json({ response: '', error: 'No user message found' });
    }
    
    // Initialize vector store (only once)
    await initVectorStore(openaiApiKey);
    
    // Set up the language model
    const model = new ChatOpenAI({
      openAIApiKey,
      modelName: "gpt-4o", // or gpt-3.5-turbo
      temperature: 0.7
    });
    
    // Create a chain that uses the vector store and the language model
    const chain = RetrievalQAChain.fromLLM(
      model,
      vectorStore!.asRetriever(), // Use null assertion since we know it's initialized
      {
        returnSourceDocuments: true,
        // Provide context about how to respond
        prompt: `You are Mini Naresh, an AI assistant for Naresh D's portfolio website. 
        Answer questions about Naresh's projects, skills, education, and experience based on the provided context.
        Be conversational, informative, and engaging. 
        If you don't know the answer based on the context, say so politely.
        
        Context information is provided below:
        [CONTEXT]
        
        Question: {question}`,
      }
    );
    
    // Run the chain with the user's question
    const result = await chain.invoke({
      query: lastUserMessage.content,
    });
    
    // Process sources if available
    const sources = result.sourceDocuments 
      ? [...new Set(result.sourceDocuments.map((doc: any) => doc.metadata.source))]
      : ["Portfolio Knowledge Base"];
    
    // Send back the response
    return res.status(200).json({
      response: result.text || result.result || "I couldn't find an answer to that question in my knowledge base.",
      sources
    });
  } catch (error: any) {
    console.error('Error processing chat request:', error);
    return res.status(500).json({ 
      response: "I'm having trouble accessing my knowledge base right now. Please try again later.",
      error: error.message
    });
  }
}
