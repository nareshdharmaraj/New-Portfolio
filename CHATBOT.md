# AI Chatbot Feature: Mini Naresh

This portfolio includes an AI-powered chatbot assistant called "Mini Naresh" that can answer questions about my projects, skills, and achievements.

## Features

- Floating robot avatar in bottom-right corner
- Modern chat interface with animations
- AI responses based on my portfolio content
- Fully responsive design

## Implementation

The chatbot is built with:
- React & TypeScript
- Framer Motion for animations
- API integration with OpenAI (optional)
- RAG (Retrieval Augmented Generation) pipeline using LangChain

## Development Mode vs. Production Mode

The current implementation uses a client-side mock API that simulates AI responses. For a production deployment, you can enable the OpenAI integration by:

1. Creating a `.env.local` file with your OpenAI API key (see `.env.local.example`)
2. Uncommenting the API key line in `MiniNareshBot.tsx`
3. Setting up a vector database with Chroma or Pinecone

## Extending the Chatbot

To expand the bot's knowledge base:
1. Add more entries to the `knowledgeBase` object in `chatApi.ts`
2. For production, add more documents to your vector store

## Files

- `components/MiniNareshBot.tsx` - The main chatbot UI component
- `components/MiniNareshBot.css` - Styles for the chatbot
- `api/chatApi.ts` - Mock API client with knowledge base
- `api/nextjs-example/chat.ts` - Example server-side implementation (for Next.js)
