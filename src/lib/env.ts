// Browser-compatible environment variables
// In a production app, you would use Vite's import.meta.env or similar
export const ENV = {
  OPENROUTER_API_KEY: '', // Set via UI in development
  OPENROUTER_MODEL: 'deepseek-coder/deepseek-coder-1.3b-base',
  VECTOR_STORE_COLLECTION: 'naresh-portfolio-knowledge',
  PORTFOLIO_OWNER_NAME: 'Naresh D',
  PORTFOLIO_OWNER_EMAIL: 'contact@nareshd.com',
};

// Add a check if API key is missing
if (!ENV.OPENROUTER_API_KEY) {
  console.warn('Warning: OPENROUTER_API_KEY environment variable is not set.');
}
