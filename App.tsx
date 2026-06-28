/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LearningData } from './types';
import { PRESETS } from './presets';
import EditorSidebar from './components/EditorSidebar';
import PortfolioPreview from './components/PortfolioPreview';
import { Settings, Eye, GraduationCap } from 'lucide-react';

export default function App() {
  // Initialize with Web Development preset
  const [learningData, setLearningData] = useState<LearningData>(
    JSON.parse(JSON.stringify(PRESETS.webdev))
  );

  // Responsive Workspace Tabs for smaller screens
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('preview');

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-stone-950 font-sans" id="app-workspace">
      
      {/* Top Main Workspace Status Header */}
      <div className="h-12 bg-stone-900 border-b border-stone-800 flex items-center justify-between px-6 z-20 flex-shrink-0">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold text-stone-200">NANA Learning Companion Studio</span>
        </div>
        <div className="text-[10px] font-mono text-stone-400 uppercase tracking-widest hidden sm:block">
          Offline Interactive Generator
        </div>
      </div>

      {/* Interactive content area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* SIDEBAR PANEL */}
        <div className={`h-full ${activeTab === 'editor' ? 'flex w-full' : 'hidden'} lg:flex lg:w-[420px] xl:w-[460px] flex-shrink-0`}>
          <EditorSidebar 
            data={learningData} 
            onChange={setLearningData} 
          />
        </div>

        {/* PREVIEW CANVAS */}
        <div className={`h-full flex-1 ${activeTab === 'preview' ? 'flex' : 'hidden'} lg:flex`}>
          <PortfolioPreview data={learningData} />
        </div>

      </div>

      {/* Adaptive Workspace Tab Selector (Mobile / Small Screen only) */}
      <div className="lg:hidden h-14 bg-stone-900 border-t border-stone-800 flex flex-row items-center justify-around px-4 flex-shrink-0 z-50">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'editor' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-400 hover:text-stone-200'}`}
          id="btn-tab-configure"
        >
          <Settings className="w-4 h-4" />
          Configure Guide
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === 'preview' ? 'bg-emerald-600 text-white shadow-md' : 'text-stone-400 hover:text-stone-200'}`}
          id="btn-tab-preview"
        >
          <Eye className="w-4 h-4" />
          View Live Guide
        </button>
      </div>

    </div>
  );
}
