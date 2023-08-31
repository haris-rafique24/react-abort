import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    
    fetch('https://api.example.com/data', { signal })
      .then(response => response.json())
      .then(resultData => {
        if (!signal.aborted) {
          setData(resultData);
        }
      })
      .catch(error => {
        if (!signal.aborted) {
          console.error('Request failed:', error);
        }
      });
    
    return () => {
      
      abortController.abort();
      console.error('Request has been aborted successfully');
    };
  }, []);
  
  return (
    <div>
      {data ? (
        <div>Data: {JSON.stringify(data)}</div>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
  );
};

export default MyComponent;
