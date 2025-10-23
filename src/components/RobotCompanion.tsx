import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import robotImage from '@/assets/robot-companion.png';

const RobotCompanion = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your AI assistant. Ask me anything about this portfolio!' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const knowledgeBase = {
    projects: {
      "neural network": "I've worked on advanced neural network classifiers achieving 95% accuracy using CNN architectures and transfer learning techniques with TensorFlow and Python.",
      "data analytics": "I built a real-time data analytics platform handling millions of events per second using Apache Kafka, Spark, and React with D3.js visualizations.",
      "chatbot": "I developed an NLP chatbot framework with context awareness, sentiment analysis, and multi-language support using BERT and FastAPI.",
      "computer vision": "I created an end-to-end computer vision pipeline for object detection and tracking using OpenCV, YOLO, and PyTorch with CUDA acceleration."
    },
    skills: {
      "machine learning": "I'm proficient in deep learning (95%), neural networks (90%), computer vision (88%), NLP (85%), and reinforcement learning (80%).",
      "programming": "My programming skills include Python (95%), SQL (90%), R (85%), JavaScript (80%), and C++ (75%).",
      "frameworks": "I work with TensorFlow (90%), PyTorch (88%), Scikit-learn (92%), Apache Spark (80%), and Docker (85%).",
      "data science": "I excel in data analysis (95%), statistics (90%), data visualization (88%), A/B testing (85%), and ETL pipelines (82%)."
    },
    experience: {
      "research": "I've published research papers in IEEE conferences and received recognition for breakthrough research in neural network optimization.",
      "awards": "I've won the AI Innovation Award 2024, first place in National AI Hackathon, and received research grants for AI ethics studies.",
      "education": "I'm currently pursuing advanced studies in AI & Data Science with certifications from Stanford, AWS, Google Cloud, and Microsoft Azure."
    }
  };

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Check for project-related questions
    for (const [key, value] of Object.entries(knowledgeBase.projects)) {
      if (lowerQuestion.includes(key)) {
        return value;
      }
    }
    
    // Check for skills-related questions
    for (const [key, value] of Object.entries(knowledgeBase.skills)) {
      if (lowerQuestion.includes(key)) {
        return value;
      }
    }
    
    // Check for experience-related questions
    for (const [key, value] of Object.entries(knowledgeBase.experience)) {
      if (lowerQuestion.includes(key)) {
        return value;
      }
    }
    
    // General responses
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
      return "Hello! I'm excited to tell you about this amazing AI portfolio. What would you like to know?";
    }
    
    if (lowerQuestion.includes('contact') || lowerQuestion.includes('reach')) {
      return "You can reach out via email at ai.portfolio@example.com, connect on LinkedIn, or check out the GitHub profile. Response time is typically within 24-48 hours!";
    }
    
    if (lowerQuestion.includes('about') || lowerQuestion.includes('background')) {
      return "This portfolio belongs to an AI & Data Science student passionate about innovation, research, and creative problem-solving. They focus on machine learning, deep learning, and real-world AI applications.";
    }
    
    return "That's a great question! You can explore the different sections above to learn more about the projects, skills, and achievements. Is there something specific you'd like to know about?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const userMessage = { role: 'user', content: inputValue };
    const assistantResponse = { role: 'assistant', content: generateResponse(inputValue) };
    
    setMessages(prev => [...prev, userMessage, assistantResponse]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Walking Robot */}
      <div className="fixed bottom-4 left-0 z-40 pointer-events-none">
        <img
          src={robotImage}
          alt="AI Companion"
          className="w-16 h-16 robot-walk cursor-pointer pointer-events-auto"
          onClick={() => setIsChatOpen(true)}
          title="Click to chat with me!"
        />
      </div>

      {/* Chat Interface */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-80 glass-strong border border-primary/30 rounded-2xl p-4 z-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <img src={robotImage} alt="Robot" className="w-8 h-8" />
              <h3 className="font-semibold gradient-text">AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsChatOpen(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </Button>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto mb-4 pr-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary/20 text-primary-foreground ml-4'
                    : 'bg-muted/50 text-foreground mr-4'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about the portfolio..."
              className="flex-1 glass border-primary/30 bg-background/50 text-sm"
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground"
            >
              Send
            </Button>
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            Try asking: "Tell me about the projects" or "What are your skills?"
          </div>
        </div>
      )}
    </>
  );
};

export default RobotCompanion;