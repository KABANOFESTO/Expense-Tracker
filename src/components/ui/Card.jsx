import React from 'react';

export const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return (
    <div className="bg-blue-600 text-white p-4 rounded-t-lg">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div className="p-4">
      {children}
    </div>
  );
};

export const CardFooter = ({ children }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-b-lg">
      {children}
    </div>
  );
};
