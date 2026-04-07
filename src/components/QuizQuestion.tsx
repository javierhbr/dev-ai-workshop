import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface QuizQuestionProps {
  question: string;
  options: Option[];
  stars: number;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, options, stars }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const selectedOption = options.find(o => o.id === selectedOptionId);

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-3xl font-bold text-gray-800 leading-tight flex-grow pr-4">
          {question}
        </h2>
        <div className="flex space-x-1 shrink-0 mt-2">
          {Array.from({ length: stars }).map((_, i) => (
            <span key={i} className="text-yellow-400 text-2xl">⭐</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedOptionId(option.id)}
            className={cn(
              "p-4 rounded-2xl border-2 transition-all text-left flex items-start space-x-4 group",
              selectedOptionId === option.id
                ? option.isCorrect
                  ? "border-green-500 bg-green-50"
                  : "border-red-500 bg-red-50"
                : "border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm",
              selectedOptionId === option.id
                ? option.isCorrect
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-gray-100 text-gray-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
            )}>
              {option.id}
            </div>
            <span className={cn(
              "text-lg font-medium",
              selectedOptionId === option.id ? "text-gray-900" : "text-gray-700"
            )}>
              {option.text}
            </span>
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className={cn(
          "p-6 rounded-2xl border animate-in fade-in slide-in-from-bottom-4 duration-300",
          selectedOption.isCorrect
            ? "bg-green-50 border-green-100 text-green-900"
            : "bg-red-50 border-red-100 text-red-900"
        )}>
          <div className="flex items-start space-x-3">
            {selectedOption.isCorrect ? (
              <CheckCircle2 className="shrink-0 mt-1" size={24} />
            ) : (
              <XCircle className="shrink-0 mt-1" size={24} />
            )}
            <div className="space-y-2">
              <p className="font-bold text-xl">
                {selectedOption.isCorrect ? "Correct!" : "Why this is wrong:"}
              </p>
              <p className="text-lg leading-relaxed">
                {selectedOption.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
