import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure there's a root element in the HTML
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("No root element found! Check your HTML file.");
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
}

createRoot(document.getElementById("root")!).render(<App />);
