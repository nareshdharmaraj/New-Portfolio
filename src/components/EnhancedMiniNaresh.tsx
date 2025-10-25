import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  X, 
  Send, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  ChevronDown, 
  MailPlus, 
  Bot, 
  Sparkles,
  MessageSquare,
  Info,
  Copy,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import robotImage from '@/assets/robot-companion.png';
import { sendMessageToAI, ChatMessage } from '@/api/chatApi';

// Custom hook for typing effect
const useTypingEffect = (text: string, speed: number = 20) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsTypingComplete(false);
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return { displayedText, isTypingComplete };
};

// Component to render a message with typing effect
const TypingMessage = ({ content, onComplete }: { content: string; onComplete?: () => void }) => {
  const { displayedText, isTypingComplete } = useTypingEffect(content, 15);

  useEffect(() => {
    if (isTypingComplete && onComplete) {
      onComplete();
    }
  }, [isTypingComplete, onComplete]);

  return (
    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
      {displayedText}
      {!isTypingComplete && <span className="animate-pulse">▊</span>}
    </p>
  );
};

// Mini Naresh chat interface with enhanced UI
const EnhancedMiniNaresh = () => {
  // Core state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! 👋 I\'m Naresh\'s AI assistant. I can help you learn about his professional experience, skills, projects, education, and achievements. Feel free to ask me anything about his portfolio!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageIndex, setTypingMessageIndex] = useState<number | null>(null);
  
  // API state
  const [apiKey, setApiKey] = useState<string>('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [vectorStoreStatus, setVectorStoreStatus] = useState<'idle' | 'initializing' | 'success' | 'error'>('idle');
  const [modelName, setModelName] = useState('deepseek-coder/deepseek-coder-1.3b-base');
  
  // UI state
  const [isTyping, setIsTyping] = useState(false);
  const [lastMessageTimestamp, setLastMessageTimestamp] = useState(Date.now());
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Tell me about your projects",
    "What are your technical skills?",
    "What is your experience?",
    "How can I contact you?"
  ];
  
  // Fetch API key from local storage if available
  useEffect(() => {
    const storedKey = localStorage.getItem('openrouter_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      initializeRag(storedKey);
    }
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to initialize RAG with vector store
  const initializeRag = async (key: string) => {
    if (!key) return;
    
    try {
      setVectorStoreStatus('initializing');
      setIsInitializing(true);
      
      // Simplified initialization - no external dependencies needed
      console.log('✅ Using simplified AI responses');
      setVectorStoreStatus('success');
    } catch (error) {
      console.error('❌ Failed to initialize:', error);
      setVectorStoreStatus('error');
    } finally {
      setIsInitializing(false);
    }
  };

  // Handle API key setting
  const handleSetApiKey = async (key: string) => {
    setApiKey(key);
    localStorage.setItem('openrouter_api_key', key);
    await initializeRag(key);
  };

  // Handle model change
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value;
    setModelName(newModel);
    localStorage.setItem('openrouter_model', newModel);
  };

  // Send message
  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    if (!textToSend || isLoading) return;

    setIsLoading(true);
    setInputValue('');
    setShowSuggestions(false);
    setIsTyping(true);

    const userMessage: ChatMessage = {
      role: 'user',
      content: textToSend
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const currentMessages = [...messages, userMessage];
      const response = await sendMessageToAI(currentMessages, apiKey);
      
      // Add a small delay before showing typing effect
      setTimeout(() => {
        setIsTyping(false);
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: response.response || 'Sorry, I could not generate a response.'
        };
        
        setMessages(prev => {
          const newMessages = [...prev, aiMessage];
          // Set the index of the message that should have typing effect
          setTypingMessageIndex(newMessages.length - 1);
          return newMessages;
        });
        setLastMessageTimestamp(Date.now());
      }, 800);

    } catch (error) {
      setIsTyping(false);
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or check your API key.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear chat
  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: 'Hi! I\'m Mini Naresh, interact with me to explore my portfolio, projects, skills, and achievements!' }
    ]);
    setShowSuggestions(true);
  };

  // Copy chat to clipboard
  const copyChat = () => {
    const chatText = messages
      .map(msg => `${msg.role === 'user' ? 'You' : 'Mini Naresh'}: ${msg.content}`)
      .join('\n\n');
    
    navigator.clipboard.writeText(chatText).then(() => {
      console.log('Chat copied to clipboard');
    });
  };

  return (
    <>
      {/* Mini Naresh Bot */}
      <motion.div
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
      >
        <AnimatePresence>
          {!isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-0 right-0"
            >
              <motion.div
                onClick={() => setIsChatOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 shadow-2xl hover:shadow-primary/30 transition-all duration-300"
              >
                <img
                  src="/New-Portfolio/CH4G1APCHW.gif"
                  alt="Chat with Mini Naresh"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Interface */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="w-72 sm:w-80 lg:w-96 h-[400px] sm:h-[500px] bg-background/95 backdrop-blur-lg border border-primary/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <img 
                      src={robotImage} 
                      alt="Mini Naresh" 
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary/50" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base flex items-center gap-2">
                      Mini Naresh
                      <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">AI Assistant</span>
                    </h3>
                    <p className="text-xs text-muted-foreground">Interact with me to explore my portfolio</p>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-8 w-8 rounded-full" 
                    onClick={() => setIsChatOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 scrollbar-thin">
                <AnimatePresence>
                  {messages.map((message, index) => {
                    const timestamp = new Date().toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: true 
                    });
                    
                    const shouldShowTypingEffect = 
                      message.role === 'assistant' && 
                      index === typingMessageIndex;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}
                      >
                        <div className={`flex items-center gap-2 mb-1 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <span className="text-xs font-semibold text-foreground">
                            {message.role === 'user' ? 'Me' : 'Naresh'}
                          </span>
                        </div>
                        <div className={`max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 rounded-2xl ${
                          message.role === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-tr-none' 
                            : 'bg-muted/50 text-foreground border border-primary/10 rounded-tl-none'
                        }`}>
                          {shouldShowTypingEffect ? (
                            <TypingMessage 
                              content={message.content} 
                              onComplete={() => setTypingMessageIndex(null)}
                            />
                          ) : (
                            <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                              {message.content}
                            </p>
                          )}
                        </div>
                        <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 px-1">
                          {timestamp}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted/50 border border-primary/10 p-2.5 sm:p-3 rounded-2xl rounded-tl-none">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-[10px] sm:text-xs text-muted-foreground">Naresh is typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Suggestions */}
                <AnimatePresence>
                  {showSuggestions && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-2"
                    >
                      <p className="text-xs text-muted-foreground text-center">Quick questions to get started:</p>
                      <div className="grid grid-cols-1 gap-2">
                        {suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-auto p-2 justify-start text-left hover:bg-primary/5"
                            onClick={() => sendMessage(suggestion)}
                            disabled={isLoading}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-primary/20 bg-muted/20">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about my projects, skills, experience..."
                    className="flex-1 text-sm"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => sendMessage()}
                    disabled={isLoading || !inputValue.trim()}
                    size="icon"
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2 mt-2">
                  <Button 
                    size="sm"
                    variant="ghost" 
                    className="h-7 text-xs"
                    onClick={clearChat}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 text-xs"
                    onClick={copyChat}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                </div>

                {/* Status Indicator */}
                <div className="mt-2">
                  {apiKey && vectorStoreStatus === 'success' && (
                    <div className="text-xs text-green-500 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Enhanced AI responses enabled</span>
                    </div>
                  )}
                </div>

                {/* Disclaimer */}
                <div className="mt-3 pt-3 border-t border-primary/10">
                  <p className="text-[10px] sm:text-xs text-muted-foreground text-center leading-relaxed">
                    <span className="inline-flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 flex-shrink-0" />
                      <span>
                        Responses from Naresh may not be completely accurate and might differ from actual content. Please verify important information.
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default EnhancedMiniNaresh;
