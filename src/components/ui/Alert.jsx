// src/components/ui/Alert.jsx
import React from 'react';

export const Alert = ({ children }) => {
  return (
    <div className="bg-red-500 text-white p-4 rounded-md">
      {children}
    </div>
  );
};

export const AlertDescription = ({ children }) => {
  return (
    <span className="font-light">
      {children}
    </span>
  );
};
