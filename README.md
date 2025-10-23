# Robo-Narrator Desk - Enhanced Portfolio with AI Chatbot

## Features

- React/TypeScript/Vite portfolio website
- Mini Naresh AI chatbot assistant with RAG capabilities
- OpenRouter API integration with DeepSeek, Mistral, and other models
- Document-based knowledge retrieval from markdown files
- Environment variable support for API keys

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd robo-narrator-desk-main
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   - Rename `.env.example` to `.env`
   - Add your OpenRouter API key to the `.env` file
   - Optionally customize other variables

4. Add your portfolio content:
   - Navigate to the `content/` directory
   - Edit the markdown files in each subfolder (projects, skills, experience, etc.)
   - Follow the templates provided in each file

5. Start the development server:
   ```
   npm run dev
   ```

6. Build for production:
   ```
   npm run build
   ```

## Mini Naresh Chatbot

The Mini Naresh AI assistant helps visitors explore your portfolio through natural conversation. Key features:

- **RAG Implementation**: Retrieves relevant information from your portfolio content
- **OpenRouter Integration**: Uses free-tier AI models like DeepSeek and Mistral
- **Document-Based Knowledge**: Answers based on your markdown content files
- **Enhanced UI**: Sleek chat interface with typing indicators and suggestions
- **Settings Panel**: Configure API key and model selection

### Content Structure

The chatbot's knowledge comes from markdown files in the `content/` directory:

- `content/personal/`: Personal information and bio
- `content/projects/`: Detailed project descriptions
- `content/skills/`: Technical and soft skills
- `content/experience/`: Work and professional experience
- `content/education/`: Academic background

### Adding New Content

1. Create a new markdown file in the appropriate subfolder
2. Follow the template structure of existing files
3. The system will automatically include new content in responses

## Environment Variables

The following environment variables can be configured in the `.env` file:

- `OPENROUTER_API_KEY`: Your OpenRouter API key (required for enhanced responses)
- `OPENROUTER_MODEL`: Default AI model to use
- `VECTOR_STORE_COLLECTION`: Name for your vector database collection
- `PORTFOLIO_OWNER_NAME`: Your name
- `PORTFOLIO_OWNER_EMAIL`: Contact email (for future email functionality)

## Future Enhancements

- Email functionality through the chatbot
- Additional AI models and customization options
- More interactive UI elements
- Integration with additional data sources

## Technologies Used

- React 18 with TypeScript
- Vite for build and development
- Tailwind CSS for styling
- Framer Motion for animations
- LangChain for RAG implementation
- ChromaDB for vector storage
- OpenRouter API for AI responses

## License

This project is licensed under the MIT License.
