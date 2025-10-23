import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import * as path from 'path';

/**
 * Portfolio content loader for working with markdown files
 * Adapted for browser environment (no filesystem access)
 */
export class PortfolioContentLoader {
  private contentBasePath: string;
  private textSplitter: RecursiveCharacterTextSplitter;
  
  constructor(contentBasePath: string = 'content') {
    // In a browser environment, we can't use process.cwd()
    // Just store the relative path for reference
    this.contentBasePath = contentBasePath;
    
    // Initialize text splitter for chunking documents
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
      separators: ["\n## ", "\n### ", "\n#### ", "\n", " ", ""]
    });
  }
  
  /**
   * Load all content across categories
   */
  async loadAllContent(): Promise<Document[]> {
    const categories = ['projects', 'skills', 'education', 'experience'];
    let allDocuments: Document[] = [];
    
    for (const category of categories) {
      const categoryDocuments = await this.getMockCategoryContent(category);
      allDocuments = [...allDocuments, ...categoryDocuments];
    }
    
    return allDocuments;
  }
  
  /**
   * Extract title from markdown content (first h1 heading)
   */
  private extractTitle(content: string): string {
    const titleMatch = content.match(/^#\s+(.*)/);
    return titleMatch ? titleMatch[1] : 'Untitled Document';
  }

  /**
   * Get mock content for a category in browser environment
   */
  private async getMockCategoryContent(category: string): Promise<Document[]> {
    const mockData: Record<string, string[]> = {
      'projects': [
        '# AI-Powered Code Assistant\n\nAn intelligent code assistant using OpenAI API to help developers with code completion and explanations.\n\n## Technologies\n- OpenAI API\n- React\n- Node.js\n',
        '# E-commerce Platform\n\nA scalable e-commerce platform with modern UI and robust backend.\n\n## Technologies\n- React\n- Node.js\n- PostgreSQL\n',
        '# Data Visualization Dashboard\n\nAn interactive dashboard for visualizing complex datasets.\n\n## Technologies\n- D3.js\n- React\n- TypeScript\n'
      ],
      'skills': [
        '# Frontend Development\n\nExperience with modern frontend frameworks and libraries.\n\n## Technologies\n- React\n- Next.js\n- TypeScript\n',
        '# Backend Development\n\nBuilding robust and scalable backend systems.\n\n## Technologies\n- Node.js\n- Express\n- PostgreSQL\n',
        '# AI & Machine Learning\n\nImplementing AI solutions for real-world problems.\n\n## Technologies\n- TensorFlow\n- PyTorch\n- LangChain\n'
      ],
      'education': [
        '# Master\'s in Computer Science\n\nSpecialization in AI and Machine Learning.\n\n## University\n- Top Tech University\n## Duration\n- 2023-2025\n',
        '# Bachelor\'s in Computer Engineering\n\nFocus on software development and algorithms.\n\n## University\n- Tech Institute\n## Duration\n- 2019-2023\n'
      ],
      'experience': [
        '# Full Stack Developer\n\nBuilding AI-powered applications and solutions.\n\n## Company\n- TechCorp\n## Duration\n- 2023-Present\n',
        '# Innovation Ambassador\n\nLeading innovation initiatives and workshops.\n\n## Organization\n- Innovation Hub\n## Duration\n- 2022-2023\n',
        '# Software Engineer Intern\n\nDeveloped features for enterprise applications.\n\n## Company\n- IBM Edunet\n## Duration\n- 2021-2022\n'
      ]
    };
    
    const documents: Document[] = [];
    
    // Get mock documents for the category
    const categoryDocs = mockData[category] || [];
    
    for (const [index, content] of categoryDocs.entries()) {
      const title = this.extractTitle(content);
      
      // Split content into chunks
      const textChunks = await this.textSplitter.splitText(content);
      
      // Create documents from chunks
      for (const [chunkIndex, chunk] of textChunks.entries()) {
        documents.push(
          new Document({
            pageContent: chunk,
            metadata: {
              title,
              category,
              source: `${category}/${title.toLowerCase().replace(/\s+/g, '-')}-${index}`,
              chunk: chunkIndex + 1,
              totalChunks: textChunks.length
            }
          })
        );
      }
    }
    
    return documents;
  }
}

// Export a singleton instance for direct use
export const portfolioContentLoader = new PortfolioContentLoader();