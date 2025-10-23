import React, { useEffect, useState } from 'react';

const DiagnosticComponent = () => {
  const [diagnosticState, setDiagnosticState] = useState('initial state');
  
  useEffect(() => {
    console.log("DiagnosticComponent mounted");
    
    // Log React version from import
    console.log('React import is working');
    
    // Check if browser APIs are available
    try {
      console.log('Window object:', typeof window);
      console.log('Document object:', typeof document);
      console.log('Document ready state:', document.readyState);
    } catch (err) {
      console.error('Error checking browser APIs:', err);
    }
    
    // Test state update
    setDiagnosticState('updated state');
    
    return () => {
      console.log("DiagnosticComponent unmounted");
    };
  }, []);

  return (
    <div id="diagnostic-component" style={{ padding: '20px', backgroundColor: '#333', color: 'white', margin: '10px', borderRadius: '5px' }}>
      <h2>Diagnostic Component</h2>
      <p>This component is running diagnostic checks. Check the console for results.</p>
      <button 
        onClick={() => console.log('Button click works!')}
        style={{ backgroundColor: '#555', border: 'none', color: 'white', padding: '5px 10px', borderRadius: '3px' }}
      >
        Test Event Handler
      </button>
    </div>
  );
};

export default DiagnosticComponent;
