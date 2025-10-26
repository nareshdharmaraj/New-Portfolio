# Content Directory

## Purpose
This folder contains markdown templates for portfolio content. These files serve as knowledge base templates for the AI chatbot (if configured with API keys).

## Structure
- `/personal` - Personal information and bio templates
- `/projects` - Project description templates
- `/skills` - Technical skills templates
- `/experience` - Work experience templates
- `/education` - Academic background templates
- `/certificates` - Certificate information templates

## Usage

### Current Implementation
The portfolio currently uses **hardcoded data** in the React components:
- Projects: `src/components/ProjectsSection.tsx`
- Skills: `src/components/SkillsSection.tsx`
- Chatbot: `src/api/chatApi.ts`

### Template Purpose
These markdown files are:
1. **Templates** for structuring your portfolio information
2. **Optional** knowledge base for AI chatbot (requires OpenRouter API key)
3. **Reference** for organizing portfolio content

### To Update Your Portfolio
✅ **Edit the React component files directly**, not these markdown templates:
- `src/components/ProjectsSection.tsx` - Update project details
- `src/components/SkillsSection.tsx` - Update skills and certificates
- `src/components/AboutSection.tsx` - Update about information
- `src/api/chatApi.ts` - Update chatbot responses

❌ **Don't edit** these markdown files unless you're setting up the AI chatbot with API integration.

## Note
The chatbot works perfectly **without** these files using mock responses from `chatApi.ts`. These markdown files are only needed if you want to use the advanced RAG (Retrieval-Augmented Generation) feature with OpenRouter API.
