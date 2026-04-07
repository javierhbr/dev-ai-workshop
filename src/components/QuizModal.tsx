import React, { useState } from 'react';
import { X, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { QuizQuestion } from './QuizQuestion';

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface QuestionData {
  id: string;
  title: string;
  question: string;
  stars: number;
  options: Option[];
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuestionData[];
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!isOpen) return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-white/20">
        {/* Header */}
        <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-200">
              <HelpCircle size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Knowledge Review
              </h2>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-all hover:rotate-90 duration-300 text-gray-400 hover:text-gray-900"
          >
            <X size={28} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-8 sm:p-12 bg-gradient-to-b from-white to-gray-50/30">
          <div className="max-w-4xl mx-auto">
            <div key={currentQuestion.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <p className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-xs mb-4">
                {currentQuestion.title}
              </p>
              <QuizQuestion 
                question={currentQuestion.question}
                stars={currentQuestion.stars}
                options={currentQuestion.options}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 border-t border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center space-x-2 px-8 py-3 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {questions.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentQuestionIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentQuestionIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-200 hover:bg-gray-300'}`}
                aria-label={`Go to question ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={currentQuestionIndex === questions.length - 1}
            className="flex items-center space-x-2 px-8 py-3 rounded-2xl font-bold text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <span>Next</span>
            <ChevronRight size={20} />
          </button>
        </footer>
      </div>
    </div>
  );
};
