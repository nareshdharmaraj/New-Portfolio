import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Bot, Loader2 } from 'lucide-react';
import robotImage from '@/assets/robot-companion.png';
import { sendMessageToAI, ChatMessage } from '@/api/chatApi';

const MiniNareshBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! I\'m Mini Naresh, your AI assistant. Ask me about my projects, skills, or achievements!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;
    
    const userMessage: ChatMessage = { role: 'user', content: inputValue };
    
    // Update UI immediately with user message
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Send to AI API (or mock API for development)
      // In production, you would pass an API key: await sendMessageToAI([...messages, userMessage], process.env.OPENAI_API_KEY)
      const response = await sendMessageToAI([...messages, userMessage]);
      
      // Add AI response with typing effect
      const assistantMessage: ChatMessage = { 
        role: 'assistant', 
        content: response.response 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: "Sorry, I'm having trouble connecting right now. Please try again later." 
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Mini Naresh Bot */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Tooltip Bubble */}
        <AnimatePresence>
          {!isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mb-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs shadow-lg"
            >
              💬 Ask me to know more!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot Avatar Button */}
        <AnimatePresence>
          {!isChatOpen && (
            <motion.div
              className="cursor-pointer"
              onClick={() => setIsChatOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              // Subtle continuous "vibe dance" animation
              animate={{
                y: [0, -3, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src={robotImage}
                alt="Mini Naresh"
                className="w-16 h-16 drop-shadow-lg"
                title="Chat with Mini Naresh!"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] max-w-[calc(100vw-2rem)] max-h-[600px] flex flex-col glass-strong border border-primary/30 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={robotImage} alt="Mini Naresh" className="w-8 h-8" />
                  <motion.div 
                    className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold gradient-text">Chat with Mini Naresh 🤖</h3>
                  <p className="text-xs text-muted-foreground">AI Assistant</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className="text-muted-foreground hover:text-foreground rounded-full h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div 
              ref={messageContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] max-h-[400px] scrollbar-thin"
            >
              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      damping: 25, 
                      stiffness: 300,
                      delay: 0.1 
                    }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} ${index > 0 ? 'mt-3' : ''}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 mr-2 flex-shrink-0">
                        <img 
                          src={robotImage} 
                          alt="Mini Naresh" 
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[75%] p-3 rounded-xl shadow-sm ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-tr-none'
                          : 'bg-muted text-foreground rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    
                    {message.role === 'user' && (
                      <div className="w-8 h-8 ml-2 flex-shrink-0 flex items-end justify-end">
                        <div className="w-8 h-8 rounded-full bg-secondary/30 flex items-center justify-center text-xs font-semibold text-secondary">
                          You
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Loading indicator when AI is "typing" */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start mt-3"
                  >
                    <div className="w-8 h-8 mr-2 flex-shrink-0">
                      <img 
                        src={robotImage} 
                        alt="Mini Naresh" 
                        className="w-8 h-8 rounded-full"
                      />
                    </div>
                    <div className="bg-muted p-3 rounded-xl rounded-tl-none text-accent">
                      <motion.div 
                        className="flex gap-1"
                        animate={{
                          opacity: [1, 0.4, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {/* Hidden div for auto-scrolling */}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-primary/20 bg-background/50">
              <div className="flex gap-2 items-center">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 glass border-primary/30 bg-background/50 text-sm rounded-full py-5 pl-4 pr-10"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={`rounded-full w-10 h-10 p-0 ${
                    !inputValue.trim() || isTyping 
                      ? 'bg-muted text-muted-foreground' 
                      : 'bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground'
                  }`}
                >
                  {isTyping ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="text-center mt-2">
                <p className="text-xs text-muted-foreground">
                  Powered by AI & my portfolio data
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MiniNareshBot;
