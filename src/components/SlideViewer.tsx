import React, { useState, useEffect, useCallback } from 'react';
import { slideService } from '../services/slideService';
import { resources } from '../data/resourcesData';
import { ChevronLeft, ChevronRight, Maximize, Minimize, BookOpen, Info, UserCheck, X, FileText, Copy, Check, Zap, List, LayoutGrid } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CodeBlock = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, '');
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative group/code my-6">
      <button
        onClick={copyToClipboard}
        className="absolute right-3 top-3 p-2 rounded-lg bg-gray-800/50 text-gray-300 opacity-0 group-hover/code:opacity-100 transition-all hover:bg-gray-700 hover:text-white z-10"
        title="Copy code"
      >
        {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
      <pre className={cn("rounded-xl !bg-gray-900 !p-6 overflow-x-auto border border-gray-800 shadow-xl", className)}>
        <code className="text-gray-100 font-mono text-sm leading-relaxed">
          {children}
        </code>
      </pre>
    </div>
  );
};

const markdownComponents: Components = {
  code({ node, inline, className, children, ...props }: any) {
    if (inline) {
      return (
        <code className="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-mono text-sm border border-indigo-100" {...props}>
          {children}
        </code>
      );
    }
    return <CodeBlock className={className}>{children}</CodeBlock>;
  },
  h1: ({ children }) => <h1 className="text-4xl font-black text-gray-900 mb-8 mt-12 border-b-4 border-indigo-500 pb-4 inline-block">{children}</h1>,
  h2: ({ children }) => <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-10 flex items-center"><span className="w-2 h-8 bg-indigo-500 rounded-full mr-4"></span>{children}</h2>,
  h3: ({ children }) => <h3 className="text-xl font-bold text-gray-800 mb-4 mt-8">{children}</h3>,
  p: ({ children }) => <p className="text-gray-600 text-lg leading-relaxed mb-6">{children}</p>,
  ul: ({ children }) => <ul className="space-y-3 mb-8 list-none pl-0">{children}</ul>,
  li: ({ children }) => (
    <li className="flex items-start">
      <span className="text-indigo-500 mr-3 mt-1.5 font-bold">•</span>
      <span className="text-gray-700 text-lg">{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-8 border-indigo-200 bg-indigo-50/50 p-6 rounded-r-2xl italic text-indigo-900 my-8 text-xl">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8 rounded-2xl border border-gray-200 shadow-sm">
      <table className="w-full border-collapse bg-white">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-gray-50 border-b border-gray-200">{children}</thead>,
  th: ({ children }) => <th className="p-4 text-left font-bold text-gray-700 text-sm uppercase tracking-wider">{children}</th>,
  td: ({ children }) => <td className="p-4 border-b border-gray-100 text-gray-600">{children}</td>,
};

export default function SlideViewer({ workshopId, onBack }: { workshopId: string, onBack: () => void }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFacilitatorMode, setIsFacilitatorMode] = useState(false);
  const [activeResourceId, setActiveResourceId] = useState<string | null>(null);
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);
  const [isIndexOpen, setIsIndexOpen] = useState(false);

  const slides = slideService.getSlides(workshopId);
  const totalSlides = slideService.getTotalSlides(workshopId);

  const currentSlide = slides[currentSlideIndex];

  const workshopResources = resources.filter(r => r.workshopId === workshopId);
  const activeResource = activeResourceId ? workshopResources.find(r => r.id === activeResourceId) : null;

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

  if (!currentSlide) return null;

  const progress = ((currentSlideIndex + 1) / totalSlides) * 100;

  return (
    <div className={cn(
      "flex flex-col bg-gray-50 text-gray-900 font-sans transition-all duration-300",
      isFullscreen ? "h-screen w-screen" : "h-[calc(100vh-2rem)] w-full max-w-[1600px] mx-auto my-4 rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
    )}>
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white border-b border-gray-100 z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-1"
            title="Back to Workshop Selection"
          >
            <ChevronLeft size={20} />
            <span className="hidden md:inline text-sm font-medium">Exit</span>
          </button>
          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
            {currentSlide.section}
          </div>
          <h1 className="text-xl font-bold text-gray-800 hidden sm:block truncate max-w-md">
            {currentSlide.title}
          </h1>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setIsIndexOpen(true)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-1"
            title="Slide Index"
          >
            <List size={20} />
            <span className="hidden md:inline text-sm font-medium">Index</span>
          </button>
          <button
            onClick={() => setIsResourcesMenuOpen(true)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex items-center space-x-1"
            title="All Resources"
          >
            <BookOpen size={20} />
            <span className="hidden md:inline text-sm font-medium">Resources</span>
          </button>
          <button
            onClick={() => setIsFacilitatorMode(!isFacilitatorMode)}
            className={cn(
              "p-2 rounded-full transition-colors flex items-center space-x-1",
              isFacilitatorMode ? "bg-amber-100 text-amber-700" : "text-gray-500 hover:bg-gray-100"
            )}
            title="Facilitator Mode"
          >
            <UserCheck size={20} />
            <span className="hidden md:inline text-sm font-medium">Facilitator</span>
          </button>
          <span className="text-sm font-medium text-gray-500">
            {currentSlideIndex + 1} / {totalSlides}
          </span>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide Content Area */}
      <main className="flex-grow relative overflow-hidden bg-white flex flex-col md:flex-row">
        <div className={cn(
          "flex-grow relative overflow-y-auto p-4 sm:p-6 md:p-8 transition-all duration-500",
          isFacilitatorMode && currentSlide.facilitatorNotes ? "md:w-2/3" : "w-full"
        )}>
          {currentSlide.resourceId && (
            <button
              onClick={() => setActiveResourceId(currentSlide.resourceId!)}
              className="absolute top-4 right-4 z-20 flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-indigo-100 transition-all shadow-sm border border-indigo-100"
            >
              <FileText size={16} />
              <span>View Handout</span>
            </button>
          )}
          {currentSlide.content}
        </div>

        {/* Facilitator Notes Sidebar */}
        {isFacilitatorMode && currentSlide.facilitatorNotes && (
          <aside className="w-full md:w-1/3 bg-amber-50 border-l border-amber-100 overflow-y-auto p-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center space-x-2 text-amber-800 font-bold mb-4 border-b border-amber-200 pb-2">
              <UserCheck size={20} />
              <h3 className="uppercase tracking-wider text-sm">Facilitator Notes</h3>
            </div>
            <div className="prose prose-amber prose-sm max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {currentSlide.facilitatorNotes}
              </ReactMarkdown>
            </div>
          </aside>
        )}
      </main>

      {/* Resource Modal */}
      {activeResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-white/20">
            <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-30">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-200">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                    {activeResource.title}
                  </h2>
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Workshop Resource</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveResourceId(null)}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all hover:rotate-90 duration-300 text-gray-400 hover:text-gray-900"
              >
                <X size={28} />
              </button>
            </header>
            <div className="flex-grow overflow-y-auto p-8 sm:p-12 bg-gradient-to-b from-white to-gray-50/30">
              <div className="max-w-4xl mx-auto">
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {activeResource.content}
                </ReactMarkdown>
              </div>
            </div>
            <footer className="px-8 py-6 border-t border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
              <p className="text-sm text-gray-400 font-medium italic">
                Tip: Click on code blocks to copy them to your clipboard.
              </p>
              <button 
                onClick={() => setActiveResourceId(null)}
                className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-gray-200 hover:shadow-indigo-200 active:scale-95"
              >
                Close Document
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Resources Menu Modal */}
      {isResourcesMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl max-h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-gray-100">
            <header className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-600 p-3 rounded-2xl text-white shadow-lg shadow-indigo-100">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight">Workshop Resources</h2>
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Handouts & Exercises</p>
                </div>
              </div>
              <button 
                onClick={() => setIsResourcesMenuOpen(false)}
                className="p-3 hover:bg-gray-200 rounded-2xl transition-all hover:rotate-90 duration-300 text-gray-400 hover:text-gray-900"
              >
                <X size={28} />
              </button>
            </header>
            <div className="flex-grow overflow-y-auto p-8 bg-white">
              <div className="space-y-12">
                {['Handout', 'Exercise', 'Guide', 'Bonus', 'Reference'].map((category) => {
                  const categoryResources = workshopResources.filter(r => r.category === category);
                  if (categoryResources.length === 0) return null;
                  
                  return (
                    <div key={category} className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-px flex-grow bg-gray-100"></div>
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{category}s</h3>
                        <div className="h-px flex-grow bg-gray-100"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryResources.map((resource) => (
                          <button
                            key={resource.id}
                            onClick={() => {
                              setActiveResourceId(resource.id);
                              setIsResourcesMenuOpen(false);
                            }}
                            className="flex items-start space-x-4 p-5 rounded-2xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-left group h-full shadow-sm hover:shadow-md"
                          >
                            <div className={cn(
                              "p-3 rounded-xl transition-colors shrink-0",
                              category === 'Exercise' ? "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white" :
                              category === 'Handout' ? "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white" :
                              category === 'Guide' ? "bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white" :
                              "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white"
                            )}>
                              <FileText size={20} />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                              <h3 className="font-bold text-gray-800 leading-tight group-hover:text-indigo-900 transition-colors">{resource.title}</h3>
                              <p className="text-xs text-gray-400 mt-2 font-medium uppercase tracking-wider">View Document →</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <footer className="px-8 py-4 border-t border-gray-100 flex justify-end bg-gray-50/50">
              <button 
                onClick={() => setIsResourcesMenuOpen(false)}
                className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-gray-200 active:scale-95"
              >
                Close
              </button>
            </footer>
          </div>
        </div>
      )}

      {/* Slide Index Modal */}
      {isIndexOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg max-h-[70vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-100">
            <header className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-600 p-2 rounded-xl text-white shadow-sm">
                  <LayoutGrid size={18} />
                </div>
                <h2 className="text-lg font-bold text-gray-900 tracking-tight">Slide Index</h2>
              </div>
              <button 
                onClick={() => setIsIndexOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-xl transition-all text-gray-400 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </header>
            <div className="flex-grow overflow-y-auto p-4 bg-white">
              <div className="space-y-6">
                {Array.from(new Set(slides.map(s => s.section))).map((section) => {
                  const sectionSlides = slides.map((s, i) => ({ ...s, originalIndex: i })).filter(s => s.section === section);
                  
                  return (
                    <div key={section} className="space-y-2">
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-2">{section}</h3>
                      <div className="space-y-1">
                        {sectionSlides.map((slide) => (
                          <button
                            key={slide.id}
                            onClick={() => {
                              setCurrentSlideIndex(slide.originalIndex);
                              setIsIndexOpen(false);
                            }}
                            className={cn(
                              "w-full flex items-center space-x-3 p-2 rounded-xl transition-all text-left group",
                              slide.originalIndex === currentSlideIndex 
                                ? "bg-indigo-50 text-indigo-900 font-bold" 
                                : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                            )}
                          >
                            <span className={cn(
                              "text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-md shrink-0",
                              slide.originalIndex === currentSlideIndex ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                            )}>
                              {slide.originalIndex + 1}
                            </span>
                            <span className="text-sm truncate">{slide.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <footer className="bg-white border-t border-gray-100 p-4 flex justify-between items-center z-10">
        <button
          onClick={goToPrevSlide}
          disabled={currentSlideIndex === 0}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 text-gray-700"
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="flex space-x-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                idx === currentSlideIndex ? "bg-indigo-600 w-4" : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNextSlide}
          disabled={currentSlideIndex === totalSlides - 1}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={20} />
        </button>
      </footer>
    </div>
  );
}
