import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

/**
 * Portfolio content loader for browser environment
 * Loads markdown content from the content directory for the chatbot
 */
export class PortfolioDocumentLoader {
  private textSplitter: RecursiveCharacterTextSplitter;
  
  constructor() {
    this.textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
      separators: ["\n## ", "\n### ", "\n#### ", "\n", " ", ""]
    });
  }

  /**
   * Load all portfolio content as documents
   */
  async loadAllDocuments(): Promise<Document[]> {
    const documents: Document[] = [];
    
    // Define content categories and their file mappings
    const contentFiles = [
      { path: '/content/personal/about.md', category: 'personal' },
      { path: '/content/projects/smart_helmet.md', category: 'projects' },
      { path: '/content/projects/sih_participation.md', category: 'projects' },
      { path: '/content/skills/technical_skills.md', category: 'skills' },
      { path: '/content/experience/ibm_internship.md', category: 'experience' },
      { path: '/content/experience/innovation_ambassador.md', category: 'experience' },
      { path: '/content/education/academic_background.md', category: 'education' }
    ];

    for (const file of contentFiles) {
      try {
        const content = await this.loadMarkdownFile(file.path);
        if (content.trim()) {
          const chunks = await this.textSplitter.splitText(content);
          
          for (let i = 0; i < chunks.length; i++) {
            documents.push(new Document({
              pageContent: chunks[i],
              metadata: {
                source: file.path,
                category: file.category,
                chunkIndex: i,
                totalChunks: chunks.length
              }
            }));
          }
        }
      } catch (error) {
        console.warn(`Failed to load ${file.path}:`, error);
      }
    }

    return documents;
  }

  /**
   * Load a single markdown file from the public directory
   */
  private async loadMarkdownFile(path: string): Promise<string> {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      console.warn(`Error loading markdown file ${path}:`, error);
      return "";
    }
  }

  /**
   * Load documents by category
   */
  async loadDocumentsByCategory(category: string): Promise<Document[]> {
    const allDocuments = await this.loadAllDocuments();
    return allDocuments.filter(doc => doc.metadata.category === category);
  }

  /**
   * Search documents by content
   */
  async searchDocuments(query: string): Promise<Document[]> {
    const allDocuments = await this.loadAllDocuments();
    const lowercaseQuery = query.toLowerCase();
    
    return allDocuments.filter(doc => 
      doc.pageContent.toLowerCase().includes(lowercaseQuery) ||
      doc.metadata.source.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// Export a singleton instance
export const portfolioContentLoader = new PortfolioDocumentLoader();
