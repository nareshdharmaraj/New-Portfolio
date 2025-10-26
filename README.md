# 🚀 Naresh D - Interactive Portfolio

A modern, interactive portfolio website built with React, TypeScript, and cutting-edge animation technologies.

**Live Demo**: [nareshdharmaraj.github.io/New-Portfolio](https://nareshdharmaraj.github.io/New-Portfolio/)

---

## ✨ Features

- 🎨 **Interactive WebGL Fluid Background** - Real-time fluid dynamics simulation
- 🤖 **AI-Powered Chatbot** - Mini Naresh chatbot to explore portfolio content
- ✨ **Advanced Animations** - Powered by Framer Motion and GSAP
- 📊 **Scroll Progress Indicator** - Animated horizontal progress bar with particles
- 🎭 **Glassmorphism UI** - Modern glass-effect components
- 📱 **Responsive Design** - Mobile-first approach with breakpoint optimizations
- ⚡ **Performance Optimized** - Hardware-accelerated animations
- 🎯 **3D Certificate Carousel** - Circular gallery with edge navigation
- 📧 **Contact Integration** - EmailJS integration for contact form

---

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion, GSAP
- **UI Components**: Radix UI + shadcn/ui
- **Graphics**: WebGL2 for fluid dynamics, OGL for 3D effects
- **AI Integration**: LangChain + OpenRouter API (optional)
- **Deployment**: GitHub Pages

---

## 📁 Project Structure

```
robo-narrator-desk-main/
├── public/                    # Static assets
│   ├── certificates/          # Certificate PDFs/images
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── api/                   # API integrations (optional)
│   │   ├── chatApi.ts        # AI chatbot responses
│   │   ├── documentLoader.ts
│   │   └── vectorStore.ts
│   ├── components/           # React components
│   │   ├── ui/              # Reusable UI components (shadcn)
│   │   ├── AboutSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── EnhancedMiniNaresh.tsx  # AI Chatbot
│   │   ├── HeroSection.tsx
│   │   ├── Navigation.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── CertificateCarousel.tsx
│   │   ├── MagicBentoGrid.tsx
│   │   └── SplashCursor.tsx       # WebGL Fluid
│   ├── pages/
│   │   ├── Index.tsx         # Main landing page
│   │   └── NotFound.tsx      # 404 page
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── content/                  # Portfolio content (markdown)
│   ├── personal/
│   ├── projects/
│   ├── skills/
│   ├── experience/
│   └── education/
├── index.html               # HTML entry point
├── package.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nareshdharmaraj/New-Portfolio.git
   cd New-Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   # or
   bun run dev
   ```

   The site will be available at `http://localhost:8080`

4. **Build for production**:
   ```bash
   npm run build
   ```

   The build output will be in the `dist/` folder.

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 📝 Customization Guide

### 1. Update Your Information

#### Portfolio Content
Edit files in `src/components/`:
- **Projects**: `ProjectsSection.tsx` - Update project details, tech stack, GitHub links
- **Skills**: `SkillsSection.tsx` - Modify skill categories and proficiency levels
- **About**: `AboutSection.tsx` - Change bio and introduction
- **Contact**: `ContactSection.tsx` - Update contact information
- **Experience**: `AboutSection.tsx` or create separate section

#### Chatbot Responses
Edit `src/api/chatApi.ts`:
- Update `PORTFOLIO_INFO` object with your actual data
- Modify response handlers for different questions
- Add project-specific responses

### 2. Add Certificates

1. Upload certificate files (PDF, JPG, PNG) to `public/certificates/`
2. Update certificate list in `src/components/SkillsSection.tsx`:
   ```typescript
   const certificates: Certificate[] = [
     {
       title: "Your Certificate Name",
       issuedBy: "Issuing Organization",
       year: "2025",
       description: "Brief description",
       icon: "🏆",
       certificateImage: `${import.meta.env.BASE_URL}certificates/your-cert.pdf`
     },
   ];
   ```

### 3. Update Meta Tags

Edit `index.html`:
- Change title, description, keywords
- Update social media preview images
- Modify author information

### 4. Customize Colors & Theme

Edit `tailwind.config.ts`:
- Modify color palette
- Add custom animations
- Adjust responsive breakpoints

### 5. Configure Deployment

Edit `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/New-Portfolio/',  // Change to your repo name
  // ... other config
});
```

---

## 🌐 Deployment

### GitHub Pages (Recommended)

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Select "GitHub Actions"
   - Save

2. **Automatic Deployment**:
   - Every push to `main` branch triggers deployment
   - Wait 2-3 minutes for deployment to complete
   - Check Actions tab for status

3. **Manual Deployment** (if needed):
   ```bash
   npm run build
   git add dist -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix dist origin gh-pages
   ```

### Other Platforms

- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag and drop `dist/` folder
- **Cloudflare Pages**: Connect via Git integration

---

## 🎨 Key Features Explained

### 1. WebGL Fluid Animation
Interactive fluid background (`SplashCursor.tsx`):
- Real-time particle physics
- Mouse/touch interaction
- Customizable colors

### 2. AI Chatbot
Intelligent assistant (`EnhancedMiniNaresh.tsx`):
- Typing animation effect
- First-person conversational responses
- Context-aware answers about portfolio

### 3. 3D Certificate Carousel
Circular gallery (`CertificateCarousel.tsx`):
- 3D perspective transforms
- Edge navigation with animated arrows
- Drag, scroll, and keyboard support
- Responsive sizing

### 4. Magic Bento Grid
Achievement cards (`MagicBentoGrid.tsx`):
- 3D hover effects
- Gradient animations
- Radial glow effects

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

---

## 🎯 Performance Optimizations

- ✅ Code splitting with dynamic imports
- ✅ Hardware-accelerated animations
- ✅ Lazy loading components
- ✅ Optimized WebGL rendering
- ✅ Image optimization
- ✅ Minimal bundle size

---

## 🔧 Environment Variables (Optional)

Create a `.env` file for AI chatbot features:

```env
VITE_OPENROUTER_API_KEY=your_api_key_here
VITE_OPENROUTER_MODEL=deepseek-coder/deepseek-coder-1.3b-base
```

**Note**: The chatbot works without API keys using mock responses from `chatApi.ts`.

---

## 📄 Content Management

### Markdown Content Files (Optional)
The `content/` directory contains markdown files for chatbot knowledge:
- `content/personal/` - Personal information
- `content/projects/` - Project descriptions
- `content/skills/` - Technical skills
- `content/experience/` - Work experience
- `content/education/` - Academic background

These are currently templates and not actively used in the main site.

---

## 🚫 Removed Dependencies

This project previously used `lovable-tagger` which has been removed for cleaner builds.

---

## 📄 License

MIT License - Feel free to use this project for your own portfolio!

---

## 👤 Author

**Naresh D**
- GitHub: [@nareshdharmaraj](https://github.com/nareshdharmaraj)
- LinkedIn: [linkedin.com/in/nareshdharmaraj](https://www.linkedin.com/in/nareshdharmaraj)
- Email: 2006nareshd@gmail.com
- Portfolio: [nareshdharmaraj.github.io/New-Portfolio](https://nareshdharmaraj.github.io/New-Portfolio/)

---

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for animations
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for blazing fast builds

---

**⭐ Star this repository if you find it helpful!**

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)




## ✨ Features- React/TypeScript/Vite portfolio website

- Mini Naresh AI chatbot assistant with RAG capabilities

- **Interactive WebGL Fluid Background** - Real-time fluid dynamics simulation- OpenRouter API integration with DeepSeek, Mistral, and other models

- **Animated Navigation** - Smooth transitions with magnetic hover effects- Document-based knowledge retrieval from markdown files

- **AI-Powered Chatbot** - Mini Naresh chatbot to explore portfolio content- Environment variable support for API keys

- **Scroll Progress Indicator** - Animated horizontal progress bar with particles

- **Responsive Design** - Mobile-first approach with breakpoint optimizations## Setup Instructions

- **Advanced Animations** - Powered by Framer Motion and GSAP

- **Glassmorphism UI** - Modern glass-effect components1. Clone the repository:

- **Performance Optimized** - Hardware-accelerated animations   ```

   git clone <repository-url>

## 🛠️ Tech Stack   cd robo-narrator-desk-main

   ```

- **Frontend**: React 18 + TypeScript

- **Build Tool**: Vite2. Install dependencies:

- **Styling**: Tailwind CSS   ```

- **Animations**: Framer Motion, GSAP   npm install

- **UI Components**: Radix UI + shadcn/ui   ```

- **Graphics**: WebGL2 for fluid dynamics

- **AI Integration**: LangChain + OpenRouter API3. Configure environment variables:

- **Deployment**: GitHub Pages   - Rename `.env.example` to `.env`

   - Add your OpenRouter API key to the `.env` file

## 📁 Project Structure   - Optionally customize other variables



```4. Add your portfolio content:

robo-narrator-desk-main/   - Navigate to the `content/` directory

├── public/                    # Static assets   - Edit the markdown files in each subfolder (projects, skills, experience, etc.)

│   ├── favicon.ico   - Follow the templates provided in each file

│   ├── robots.txt

│   └── .nojekyll             # GitHub Pages configuration5. Start the development server:

├── src/   ```

│   ├── api/                  # API integrations   npm run dev

│   │   ├── chatApi.ts       # AI chatbot API   ```

│   │   ├── documentLoader.ts

│   │   ├── openRouterClient.ts6. Build for production:

│   │   └── vectorStore.ts   ```

│   ├── components/          # React components   npm run build

│   │   ├── ui/             # Reusable UI components   ```

│   │   ├── AboutSection.tsx

│   │   ├── AchievementsSection.tsx## Mini Naresh Chatbot

│   │   ├── ContactSection.tsx

│   │   ├── EnhancedMiniNaresh.tsx  # AI ChatbotThe Mini Naresh AI assistant helps visitors explore your portfolio through natural conversation. Key features:

│   │   ├── HeroSection.tsx

│   │   ├── Navigation.tsx- **RAG Implementation**: Retrieves relevant information from your portfolio content

│   │   ├── ParticleBackground.tsx- **OpenRouter Integration**: Uses free-tier AI models like DeepSeek and Mistral

│   │   ├── ProjectsSection.tsx- **Document-Based Knowledge**: Answers based on your markdown content files

│   │   ├── ScrollProgressBar.tsx- **Enhanced UI**: Sleek chat interface with typing indicators and suggestions

│   │   ├── SkillsSection.tsx- **Settings Panel**: Configure API key and model selection

│   │   ├── SplashCursor.tsx        # WebGL Fluid Animation

│   │   └── VisionMissionCards.tsx### Content Structure

│   ├── hooks/              # Custom React hooks

│   ├── lib/                # Utility functionsThe chatbot's knowledge comes from markdown files in the `content/` directory:

│   ├── pages/              # Page components

│   │   ├── Index.tsx      # Main landing page ⭐- `content/personal/`: Personal information and bio

│   │   └── NotFound.tsx   # 404 page- `content/projects/`: Detailed project descriptions

│   ├── App.tsx            # Root component with routing- `content/skills/`: Technical and soft skills

│   ├── main.tsx           # Application entry point- `content/experience/`: Work and professional experience

│   └── index.css          # Global styles- `content/education/`: Academic background

├── .github/

│   └── workflows/### Adding New Content

│       └── deploy.yml     # GitHub Actions deployment

├── index.html             # HTML entry point ⭐1. Create a new markdown file in the appropriate subfolder

├── package.json2. Follow the template structure of existing files

├── vite.config.ts3. The system will automatically include new content in responses

└── tailwind.config.ts

```## Environment Variables



## 🚀 Getting StartedThe following environment variables can be configured in the `.env` file:



### Prerequisites- `OPENROUTER_API_KEY`: Your OpenRouter API key (required for enhanced responses)

- `OPENROUTER_MODEL`: Default AI model to use

- Node.js 18+ - `VECTOR_STORE_COLLECTION`: Name for your vector database collection

- npm or yarn- `PORTFOLIO_OWNER_NAME`: Your name

- `PORTFOLIO_OWNER_EMAIL`: Contact email (for future email functionality)

### Installation

## Future Enhancements

1. Clone the repository:

```bash- Email functionality through the chatbot

git clone https://github.com/nareshdharmaraj/New-Portfolio.git- Additional AI models and customization options

cd New-Portfolio- More interactive UI elements

```- Integration with additional data sources



2. Install dependencies:## Technologies Used

```bash

npm install- React 18 with TypeScript

```- Vite for build and development

- Tailwind CSS for styling

3. Start development server:- Framer Motion for animations

```bash- LangChain for RAG implementation

npm run dev- ChromaDB for vector storage

```- OpenRouter API for AI responses



The site will be available at `http://localhost:8080`## License



### Building for ProductionThis project is licensed under the MIT License.


```bash
npm run build
```

The build output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deployment

### GitHub Pages

The project is configured for automatic deployment to GitHub Pages via GitHub Actions.

**Live URL**: `https://nareshdharmaraj.github.io/New-Portfolio/`

#### Manual Deployment Steps:

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Select "GitHub Actions"
   - Save

2. **Automatic Deployment**:
   - Every push to `main` branch triggers automatic deployment
   - Wait 2-3 minutes for deployment to complete
   - Check Actions tab for deployment status

3. **Entry Point**:
   - **Starting File**: `index.html` (root)
   - **Built Output**: Files in `dist/` folder
   - **Main Component**: `src/pages/Index.tsx`

## 📝 Environment Variables

Create a `.env` file for local development:

```env
VITE_OPENROUTER_API_KEY=your_api_key_here
VITE_OPENROUTER_MODEL=deepseek-coder/deepseek-coder-1.3b-base
VITE_VECTOR_STORE_COLLECTION=naresh-portfolio-knowledge
VITE_PORTFOLIO_OWNER_NAME=Naresh D
VITE_PORTFOLIO_OWNER_EMAIL=contact@nareshd.com
```

## 🎨 Key Components

### 1. **Index.tsx** (Main Landing Page)
The primary entry point that composes all sections:
- Hero Section with parallax effects
- Vision & Mission cards
- About, Projects, Achievements, Skills sections
- Contact form with EmailJS integration
- AI Chatbot (EnhancedMiniNaresh)

### 2. **SplashCursor.tsx** (WebGL Fluid Animation)
Interactive fluid dynamics background using WebGL2:
- Real-time particle physics
- Mouse/touch interaction
- Customizable colors and effects

### 3. **EnhancedMiniNaresh.tsx** (AI Chatbot)
Intelligent chatbot using LangChain and OpenRouter:
- Vector store for portfolio knowledge
- Context-aware responses
- Chat history management

### 4. **Navigation.tsx**
Sticky navigation with:
- Active section tracking
- Smooth scroll to sections
- Magnetic hover effects

### 5. **ScrollProgressBar.tsx**
Animated progress indicator:
- Horizontal scroll tracking
- Particle effects
- Shimmer animations

## 🔧 Configuration

### Vite Configuration (`vite.config.ts`)

```typescript
export default defineConfig({
  base: '/',  // Change to '/New-Portfolio/' if deploying to subdirectory
  // ... other config
});
```

### Tailwind Configuration

Custom theme with:
- Dark mode support
- Custom color palette
- Animation keyframes
- Responsive breakpoints

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Performance Optimizations

- Code splitting with dynamic imports
- Hardware-accelerated animations
- Lazy loading components
- Optimized WebGL rendering
- Compressed assets

## 📄 License

MIT License - Feel free to use this project for your own portfolio!

## 👤 Author

**Naresh Dharmaraj**
- GitHub: [@nareshdharmaraj](https://github.com/nareshdharmaraj)
- Portfolio: [nareshdharmaraj.github.io/New-Portfolio](https://nareshdharmaraj.github.io/New-Portfolio/)

## 🙏 Acknowledgments

- [Framer Motion](https://www.framer.com/motion/) for animations
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [LangChain](https://js.langchain.com/) for AI integration

---

**Star ⭐ this repository if you find it helpful!**
