import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import robotImage from '@/assets/robot-companion.png';
import { sendMessageToAI, ChatMessage } from '@/api/chatApi';
import { initializeVectorStore } from '@/api/initializeVectorStore';

const MiniNaresh = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hi! I\'m Mini Naresh, your AI assistant. Ask me about my projects, skills, or achievements!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [vectorStoreStatus, setVectorStoreStatus] = useState<'idle' | 'initializing' | 'success' | 'error'>('idle');
  
  // Fetch API key from local storage if available
  useEffect(() => {
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      initializeRag(storedKey);
    }
  }, []);

  // Function to initialize RAG with vector store
  const initializeRag = async (key: string) => {
    if (!key) return;
    
    try {
      setVectorStoreStatus('initializing');
      setIsInitializing(true);
      
      // Initialize vector store with documents
      await initializeVectorStore(key);
      
      setVectorStoreStatus('success');
      
      // Add a system message to indicate RAG is active
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Vector store initialized! I can now answer questions about Naresh\'s portfolio with enhanced knowledge.' 
        }
      ]);
    } catch (error) {
      console.error('Error initializing vector store:', error);
      setVectorStoreStatus('error');
    } finally {
      setIsInitializing(false);
    }
  };

  // Function to handle API key setting
  const handleSetApiKey = (key: string) => {
    if (!key) return;
    
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    
    // Initialize RAG with the new API key
    initializeRag(key);
  };

  // Enhanced message handling with AI
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message immediately
    const userMessage: ChatMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and show loading state
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Get AI response
      const aiResponse = await sendMessageToAI(
        [...messages, userMessage],
        apiKey
      );
      
      // Add AI response to messages
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', content: aiResponse.response }
      ]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      setMessages(prev => [
        ...prev, 
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later.' 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Mini Naresh Bot */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Disclaimer Bubble */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs shadow-lg"
        >
          💬 Ask me to know more!
        </motion.div>

        {/* Robot */}
        <motion.div
          className="cursor-pointer"
          onClick={() => setIsChatOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -5, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 3,
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
      </div>

      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="fixed bottom-6 right-6 w-80 max-w-[calc(100vw-2rem)] glass-strong border border-primary/30 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-primary/20">
              <div className="flex items-center gap-2">
                <img src={robotImage} alt="Mini Naresh" className="w-8 h-8" />
                <h3 className="font-semibold gradient-text">Chat with Mini Naresh 🤖</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsChatOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="h-60 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/80 text-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* API Key Input */}
            {!apiKey && (
              <div className="p-3 border-t border-primary/20">
                <div className="flex gap-2 items-center">
                  <Input
                    type="password"
                    placeholder="Enter OpenAI API Key to enhance responses"
                    className="flex-1 glass border-primary/30 bg-background/50 text-xs"
                    onChange={(e) => e.target.value ? handleSetApiKey(e.target.value) : null}
                    disabled={isInitializing}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => {
                      const input = document.querySelector('input[type="password"]') as HTMLInputElement;
                      handleSetApiKey(input?.value || '');
                    }}
                    disabled={isInitializing}
                  >
                    {isInitializing ? 'Loading...' : 'Set'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">*Optional: Add your API key for enhanced responses with RAG</p>
              </div>
            )}
            
            {/* Vector Store Status */}
            {apiKey && (
              <div className="px-4 py-2 border-t border-primary/20">
                <div className="flex items-center gap-2">
                  {vectorStoreStatus === 'initializing' && (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin text-amber-500" />
                      <span className="text-xs text-amber-500">Initializing vector store...</span>
                    </>
                  )}
                  {vectorStoreStatus === 'success' && (
                    <>
                      <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      <span className="text-xs text-emerald-500">RAG enabled: Enhanced responses active</span>
                    </>
                  )}
                  {vectorStoreStatus === 'error' && (
                    <>
                      <AlertCircle className="h-3 w-3 text-destructive" />
                      <span className="text-xs text-destructive">Error initializing vector store</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-primary/20">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 glass border-primary/30 bg-background/50 text-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-primary hover:bg-gradient-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MiniNaresh;