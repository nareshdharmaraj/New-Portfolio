import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Set base to '/New-Portfolio/' for GitHub Pages deployment
    base: '/New-Portfolio/',
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Build configuration to handle LangChain dependencies
    build: {
      rollupOptions: {
        external: [
          '@langchain/core/documents',
          '@langchain/core/vectorstores',
          '@langchain/core/runnables',
          '@langchain/core/messages',
          '@langchain/core/utils/function_calling',
          '@langchain/core/utils/env',
          '@langchain/core/language_models/base',
          '@langchain/core/outputs',
          '@langchain/core/utils/tiktoken',
          '@langchain/core/singletons',
          '@langchain/core/utils/types',
          '@langchain/core/tools',
          '@langchain/core/embeddings',
          '@langchain/core/utils/json_schema',
          '@langchain/core/utils/chunk_array',
          '@langchain/core/language_models/chat_models',
          '@langchain/core/language_models/llms',
          '@langchain/core/output_parsers',
          '@langchain/core/output_parsers/openai_tools'
        ]
      }
    },
    // Optimize dependencies to avoid build issues
    optimizeDeps: {
      exclude: [
        '@langchain/community',
        '@langchain/openai',
        'langchain',
        'chromadb'
      ]
    },
    // Define the environment variables that should be available in the app
    define: {
      'process.env.OPENROUTER_API_KEY': JSON.stringify(env.OPENROUTER_API_KEY),
      'process.env.OPENROUTER_MODEL': JSON.stringify(env.OPENROUTER_MODEL),
      'process.env.VECTOR_STORE_COLLECTION': JSON.stringify(env.VECTOR_STORE_COLLECTION),
      'process.env.PORTFOLIO_OWNER_NAME': JSON.stringify(env.PORTFOLIO_OWNER_NAME),
      'process.env.PORTFOLIO_OWNER_EMAIL': JSON.stringify(env.PORTFOLIO_OWNER_EMAIL),
    }
  };
});
