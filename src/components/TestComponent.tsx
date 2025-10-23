import React from 'react';

const TestComponent = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#121212', 
      color: 'white',
      border: '2px solid #333',
      borderRadius: '8px',
      margin: '20px',
      textAlign: 'center'
    }}>
      <h2>Test Component</h2>
      <p>If you can see this, basic React rendering is working correctly.</p>
    </div>
  );
};

export default TestComponent;
