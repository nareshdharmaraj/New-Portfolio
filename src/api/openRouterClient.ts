import axios from 'axios';

/**
 * OpenRouter API client for accessing various AI models
 */
export class OpenRouterClient {
  private apiKey: string | null = null;
  private baseUrl: string = 'https://openrouter.ai/api/v1';
  private defaultModel: string = 'deepseek-coder/deepseek-coder-1.3b-base'; // Free tier model
  
  /**
   * Initialize with API key
   */
  constructor(apiKey?: string, defaultModel?: string) {
    this.apiKey = apiKey || null;
    if (defaultModel) {
      this.defaultModel = defaultModel;
    }
  }
  
  /**
   * Set or update API key
   */
  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }
  
  /**
   * Set or update default model
   */
  public setDefaultModel(model: string): void {
    this.defaultModel = model;
  }
  
  /**
   * Generate a response using the OpenRouter API
   */
  public async generateResponse(
    prompt: string,
    context?: string,
    model?: string,
    temperature: number = 0.7,
    maxTokens: number = 500
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key is not set');
    }
    
    try {
      // Prepare the system message with context if available
      const systemMessage = context 
        ? `You are Mini Naresh, a helpful AI assistant for Naresh D's portfolio website. Use the following information to answer questions accurately and professionally. If asked something outside of this context or not related to Naresh's portfolio, politely redirect to relevant portfolio information.\n\nContext: ${context}`
        : 'You are Mini Naresh, a helpful AI assistant for Naresh D\'s portfolio website. Answer questions about Naresh\'s skills, projects, experience, and education. If asked about topics outside of Naresh\'s portfolio, politely redirect to relevant portfolio information.';
      
      const response = await axios.post(
        `${this.baseUrl}/chat/completions`,
        {
          model: model || this.defaultModel,
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: prompt }
          ],
          temperature: temperature,
          max_tokens: maxTokens,
          top_p: 1,
          stream: false
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://nareshd-portfolio.com', // Replace with your actual domain
            'X-Title': 'Mini Naresh Portfolio Assistant'
          }
        }
      );
      
      // Extract the response content
      if (response.data && 
          response.data.choices && 
          response.data.choices[0] && 
          response.data.choices[0].message) {
        return response.data.choices[0].message.content;
      }
      
      throw new Error('Invalid response format from OpenRouter API');
    } catch (error) {
      console.error('OpenRouter API error:', error);
      
      // Return a friendly error message
      return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }
  }
  
  /**
   * Check if API key is set
   */
  public hasApiKey(): boolean {
    return !!this.apiKey;
  }
  
  /**
   * Get available models (simplified version for free tier)
   */
  public getAvailableModels(): string[] {
    return [
      'deepseek-coder/deepseek-coder-1.3b-base',
      'mistralai/mistral-7b-instruct',
      'google/gemma-7b-it',
      'meta-llama/llama-3-8b-instruct'
    ];
  }
}

// Import environment variables
import { ENV } from '@/lib/env';

// Create a singleton instance
export const openRouterClient = new OpenRouterClient(
  ENV.OPENROUTER_API_KEY,
  ENV.OPENROUTER_MODEL
);
