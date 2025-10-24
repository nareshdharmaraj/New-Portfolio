import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Base URL for GitHub Pages deployment
const basename = import.meta.env.BASE_URL || '/';

// Let's use a try-catch to identify any runtime errors
const App = () => {
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={basename}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error("Error in App component:", error);
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#121212',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'red' }}>Error Occurred</h1>
        <p>An error occurred while rendering the app. Check the console for details.</p>
        <pre style={{ 
          backgroundColor: '#1e1e1e', 
          padding: '10px', 
          borderRadius: '5px',
          maxWidth: '90%',
          overflow: 'auto',
          textAlign: 'left'
        }}>
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    );
  }
};

export default App;
