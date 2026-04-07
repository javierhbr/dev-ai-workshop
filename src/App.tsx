/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SlideViewer from './components/SlideViewer';
import { workshopService } from './services/workshopService';
import { LayoutGrid, Zap, ArrowRight } from 'lucide-react';

export default function App() {
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);
  const workshops = workshopService.getWorkshops();

  if (!selectedWorkshopId) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-4xl w-full space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 bg-indigo-600 rounded-3xl text-white shadow-xl shadow-indigo-100 mb-4">
              <Zap size={40} fill="currentColor" />
            </div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">Workshop Portal</h1>
            <p className="text-xl text-gray-500 font-medium">Select your learning path</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((workshop) => (
              <button
                key={workshop.id}
                onClick={() => setSelectedWorkshopId(workshop.id)}
                className="group relative bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-gray-100 text-left flex flex-col justify-between h-full hover:-translate-y-2 duration-300"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <LayoutGrid size={32} />
                    </div>
                    <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                      Level {workshop.level}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                      {workshop.title}
                    </h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                      {workshop.description}
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex items-center text-indigo-600 font-black uppercase tracking-widest text-sm group-hover:translate-x-2 transition-transform">
                  Start Workshop <ArrowRight size={18} className="ml-2" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SlideViewer 
        workshopId={selectedWorkshopId} 
        onBack={() => setSelectedWorkshopId(null)} 
      />
    </div>
  );
}
