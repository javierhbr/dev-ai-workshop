import React, { useState } from 'react';

export const InteractiveQuestion = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 cursor-pointer transition-all hover:shadow-md hover:border-indigo-300 group"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">{question}</p>
        <span className={`text-indigo-500 font-bold transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? '−' : '+'}
        </span>
      </div>
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-gray-100 text-indigo-900 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-xl italic font-medium">💡 {answer}</p>
        </div>
      )}
    </div>
  );
};
