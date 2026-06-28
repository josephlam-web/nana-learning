import React, { useState } from 'react';
import { 
  LearningData, 
  SocialLink, 
  SyllabusTopic, 
  CheatSheetNode, 
  InteractiveChallenge, 
  QuizQuestion 
} from '../types';
import nanaLogo from '../assets/images/nana_logo_1782473146386.jpg';
import { THEMES, FONTS, PRESETS } from '../presets';
import { generateStaticHtml } from '../utils/exporter';
import { 
  Palette, 
  Type, 
  User, 
  BookOpen, 
  Code, 
  FileCode, 
  HelpCircle, 
  Mail, 
  Plus, 
  Trash2, 
  Download, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Check, 
  Layers,
  ChevronDown,
  ChevronUp,
  Settings,
  Flame,
  Lightbulb
} from 'lucide-react';

interface EditorSidebarProps {
  data: LearningData;
  onChange: (newData: LearningData) => void;
  onPreviewRefresh?: () => void;
}

export default function EditorSidebar({ data, onChange, onPreviewRefresh }: EditorSidebarProps) {
  const [activePreset, setActivePreset] = useState<string>('webdev');
  const [expandedSection, setExpandedSection] = useState<string>('presets');

  // Input states for dynamically adding study topics
  const [newSyllabus, setNewSyllabus] = useState<Omit<SyllabusTopic, 'id'>>({
    title: '',
    difficulty: 'Intermediate',
    duration: '2 Hours',
    summary: '',
    keyTakeaways: []
  });
  const [takeawaysString, setTakeawaysString] = useState('');

  // Input states for cheat sheets
  const [newSheet, setNewSheet] = useState<Omit<CheatSheetNode, 'id'>>({
    title: '',
    category: 'Tailwind v4',
    explanation: '',
    codeBlock: ''
  });

  // Input states for challenges
  const [newChallenge, setNewChallenge] = useState<Omit<InteractiveChallenge, 'id'>>({
    title: '',
    description: '',
    initialCode: '',
    solution: '',
    expectedOutput: '',
    hint: ''
  });

  // Input states for quizzes
  const [newQuiz, setNewQuiz] = useState<Omit<QuizQuestion, 'id'>>({
    question: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    explanation: ''
  });

  const [newSocial, setNewSocial] = useState<Omit<SocialLink, 'id'>>({
    platform: 'github',
    url: '',
  });

  const toggleAccordion = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  const handleLoadPreset = (presetKey: string) => {
    setActivePreset(presetKey);
    onChange(JSON.parse(JSON.stringify(PRESETS[presetKey])));
    if (onPreviewRefresh) onPreviewRefresh();
  };

  const updateField = (path: string, value: any) => {
    const updated = { ...data };
    if (path.startsWith('visibleSections.')) {
      const sectionKey = path.split('.')[1] as keyof LearningData['visibleSections'];
      updated.visibleSections = {
        ...updated.visibleSections,
        [sectionKey]: value,
      };
    } else {
      (updated as any)[path] = value;
    }
    onChange(updated);
  };

  // Add social link
  const addSocial = () => {
    if (!newSocial.url) return;
    const item: SocialLink = {
      id: Date.now().toString(),
      ...newSocial,
    };
    onChange({
      ...data,
      socialLinks: [...data.socialLinks, item],
    });
    setNewSocial({ platform: 'github', url: '' });
  };

  const removeSocial = (id: string) => {
    onChange({
      ...data,
      socialLinks: data.socialLinks.filter(s => s.id !== id),
    });
  };

  // Syllabus actions
  const addSyllabusItem = () => {
    if (!newSyllabus.title) return;
    const keyTakeaways = takeawaysString
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const item: SyllabusTopic = {
      id: Date.now().toString(),
      ...newSyllabus,
      keyTakeaways
    };

    onChange({
      ...data,
      syllabus: [...data.syllabus, item]
    });

    setNewSyllabus({
      title: '',
      difficulty: 'Intermediate',
      duration: '2 Hours',
      summary: '',
      keyTakeaways: []
    });
    setTakeawaysString('');
  };

  const removeSyllabusItem = (id: string) => {
    onChange({
      ...data,
      syllabus: data.syllabus.filter(s => s.id !== id)
    });
  };

  // Cheat Sheet actions
  const addCheatSheet = () => {
    if (!newSheet.title) return;
    const item: CheatSheetNode = {
      id: Date.now().toString(),
      ...newSheet
    };
    onChange({
      ...data,
      cheatsheets: [...data.cheatsheets, item]
    });
    setNewSheet({
      title: '',
      category: 'Tailwind v4',
      explanation: '',
      codeBlock: ''
    });
  };

  const removeCheatSheet = (id: string) => {
    onChange({
      ...data,
      cheatsheets: data.cheatsheets.filter(ch => ch.id !== id)
    });
  };

  // Coding Challenges actions
  const addChallenge = () => {
    if (!newChallenge.title) return;
    const item: InteractiveChallenge = {
      id: Date.now().toString(),
      ...newChallenge
    };
    onChange({
      ...data,
      challenges: [...data.challenges, item]
    });
    setNewChallenge({
      title: '',
      description: '',
      initialCode: '',
      solution: '',
      expectedOutput: '',
      hint: ''
    });
  };

  const removeChallenge = (id: string) => {
    onChange({
      ...data,
      challenges: data.challenges.filter(c => c.id !== id)
    });
  };

  // Quiz actions
  const addQuizQuestion = () => {
    if (!newQuiz.question) return;
    const item: QuizQuestion = {
      id: Date.now().toString(),
      ...newQuiz
    };
    onChange({
      ...data,
      quizzes: [...data.quizzes, item]
    });
    setNewQuiz({
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: ''
    });
  };

  const updateQuizOption = (idx: number, text: string) => {
    const updatedOptions = [...newQuiz.options];
    updatedOptions[idx] = text;
    setNewQuiz({ ...newQuiz, options: updatedOptions });
  };

  const removeQuizQuestion = (id: string) => {
    onChange({
      ...data,
      quizzes: data.quizzes.filter(q => q.id !== id)
    });
  };

  // Handle Export Download
  const handleDownloadCode = () => {
    const htmlString = generateStaticHtml(data);
    const blob = new Blob([htmlString], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nana_learning_${activePreset}_study_guide.html`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-stone-900 text-stone-100 border-r border-stone-800 w-full" id="sidebar-container">
      
      {/* Educational branding & download handler */}
      <div className="p-5 border-b border-stone-800 bg-stone-950 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src={nanaLogo} 
              alt="NANA Logo" 
              className="w-8 h-8 rounded-lg object-cover border border-emerald-500/20 shadow-md shadow-emerald-500/5"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-sm font-bold tracking-tight">NANA Learning</h1>
              <p className="text-[10px] text-stone-500 font-mono font-medium">STUDY GUIDE BUILDER v1.2</p>
            </div>
          </div>
          
          <button
            onClick={handleDownloadCode}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-emerald-500/10 active:scale-95 transition-all cursor-pointer"
            title="Export static study guide companion"
            id="btn-export-html"
          >
            <Download className="w-3.5 h-3.5" />
            Export HTML
          </button>
        </div>
      </div>

      {/* Accordion list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        
        {/* Accordion 1: Learning Path Presets */}
        <div className="border border-stone-800 rounded-xl bg-stone-950/40 overflow-hidden">
          <button
            onClick={() => toggleAccordion('presets')}
            className="w-full flex items-center justify-between p-3.5 bg-stone-950/60 hover:bg-stone-950 transition-colors text-xs font-semibold text-stone-300"
          >
            <span className="flex items-center gap-2 text-emerald-400">
              <Sparkles className="w-4 h-4" />
              NANA Curriculum Tracks
            </span>
            {expandedSection === 'presets' ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
          </button>
          
          {expandedSection === 'presets' && (
            <div className="p-3.5 bg-stone-900/30 border-t border-stone-800/60 space-y-2">
              <p className="text-[11px] text-stone-400 leading-normal mb-3">
                Select a premium curriculum template to populate the live workspace companion instantly:
              </p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => handleLoadPreset('webdev')}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-medium border transition-all text-left cursor-pointer ${activePreset === 'webdev' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-stone-900/40 border-stone-800 text-stone-300 hover:bg-stone-900'}`}
                >
                  <div>
                    <p className="font-semibold text-stone-100">Modern Web Masterclass</p>
                    <p className="text-[10px] text-stone-400">Tailwind v4, React 19 concurrent hooks</p>
                  </div>
                  {activePreset === 'webdev' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>

                <button
                  onClick={() => handleLoadPreset('aieng')}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-medium border transition-all text-left cursor-pointer ${activePreset === 'aieng' ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300' : 'bg-stone-900/40 border-stone-800 text-stone-300 hover:bg-stone-900'}`}
                >
                  <div>
                    <p className="font-semibold text-stone-100">AI Systems Engineering</p>
                    <p className="text-[10px] text-stone-400">Gemini client proxy servers, schemas</p>
                  </div>
                  {activePreset === 'aieng' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Theme Settings */}
        <div className="border border-stone-800 rounded-xl bg-stone-950/40 overflow-hidden">
          <button
            onClick={() => toggleAccordion('layout')}
            className="w-full flex items-center justify-between p-3.5 bg-stone-950/60 hover:bg-stone-950 transition-colors text-xs font-semibold text-stone-300"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-stone-400" />
              Theme & Track Layout
            </span>
            {expandedSection === 'layout' ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
          </button>
          
          {expandedSection === 'layout' && (
            <div className="p-3.5 bg-stone-900/30 border-t border-stone-800/60 space-y-4">
              
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">Palette Colors</label>
                <div className="grid grid-cols-2 gap-2">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => updateField('themeId', t.id)}
                      className={`flex flex-col items-start p-2 rounded-lg border text-left transition-all cursor-pointer ${data.themeId === t.id ? 'border-emerald-500 bg-emerald-950/20' : 'border-stone-800 bg-stone-900/60 hover:bg-stone-900'}`}
                    >
                      <span className="text-[11px] font-medium text-stone-200">{t.name.split(' (')[0]}</span>
                      <div className="flex gap-1 mt-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.id === 'nana-mint' ? '#10b981' : t.id === 'emerald-dark' ? '#bef264' : t.id === 'cosmic-dark' ? '#6366f1' : t.id === 'warm-minimalist' ? '#78350f' : '#22c55e' }}></span>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.isDark ? '#0f1b1a' : '#faf8f5' }}></span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">Workspace Typography</label>
                <div className="grid grid-cols-1 gap-2">
                  {FONTS.map(f => (
                    <button
                      key={f.id}
                      onClick={() => updateField('fontId', f.id)}
                      className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all cursor-pointer ${data.fontId === f.id ? 'border-emerald-500 bg-emerald-950/20' : 'border-stone-800 bg-stone-900/60 hover:bg-stone-900'}`}
                    >
                      <span className="text-[11px] font-medium text-stone-200">{f.name}</span>
                      {data.fontId === f.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">Visible Modules</label>
                <div className="space-y-2 bg-stone-900/60 p-2.5 rounded-lg border border-stone-800/80">
                  {Object.keys(data.visibleSections).map((secKey) => {
                    const key = secKey as keyof LearningData['visibleSections'];
                    const isVisible = data.visibleSections[key];
                    return (
                      <div key={key} className="flex items-center justify-between text-xs">
                        <span className="capitalize text-stone-300 font-medium">{key} module</span>
                        <button
                          onClick={() => updateField(`visibleSections.${key}`, !isVisible)}
                          className={`p-1 rounded-md transition-all cursor-pointer ${isVisible ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-stone-950/40 text-stone-600 border border-stone-800'}`}
                        >
                          {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Accordion 3: General Information */}
        <div className="border border-stone-800 rounded-xl bg-stone-950/40 overflow-hidden">
          <button
            onClick={() => toggleAccordion('personal')}
            className="w-full flex items-center justify-between p-3.5 bg-stone-950/60 hover:bg-stone-950 transition-colors text-xs font-semibold text-stone-300"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4 text-stone-400" />
              General Track Info
            </span>
            {expandedSection === 'personal' ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
          </button>
          
          {expandedSection === 'personal' && (
            <div className="p-3.5 bg-stone-900/30 border-t border-stone-800/60 space-y-3.5">
              
              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Portal Title</label>
                <input
                  type="text"
                  value={data.appName}
                  onChange={(e) => updateField('appName', e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. NANA Learning"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Curriculum Subject Tagline</label>
                <input
                  type="text"
                  value={data.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Tailwind v4 Masterclass"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Hero Brief Pitch</label>
                <textarea
                  value={data.heroText}
                  onChange={(e) => updateField('heroText', e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500 h-16 resize-none"
                  placeholder="Summarize course goals..."
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Mentor Name</label>
                  <input
                    type="text"
                    value={data.mentorName}
                    onChange={(e) => updateField('mentorName', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Mentor Title</label>
                  <input
                    type="text"
                    value={data.mentorTitle}
                    onChange={(e) => updateField('mentorTitle', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Discord invite</label>
                  <input
                    type="text"
                    value={data.discordUrl || ''}
                    onChange={(e) => updateField('discordUrl', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                    placeholder="https://discord.gg/..."
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800/80">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-2">Mentor Web Channels</label>
                <div className="space-y-1.5 mb-3">
                  {data.socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center justify-between p-2 rounded bg-stone-950 border border-stone-800 text-xs">
                      <span className="font-semibold text-emerald-400 capitalize">{link.platform}</span>
                      <span className="text-stone-400 truncate max-w-[120px] font-mono text-[10px]">{link.url}</span>
                      <button
                        onClick={() => removeSocial(link.id)}
                        className="text-stone-500 hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-1.5">
                  <select
                    value={newSocial.platform}
                    onChange={(e: any) => setNewSocial({ ...newSocial, platform: e.target.value })}
                    className="bg-stone-950 border border-stone-800 rounded-lg px-2 text-[11px] text-stone-200 focus:outline-none"
                  >
                    <option value="github">GitHub</option>
                    <option value="twitter">Twitter</option>
                    <option value="globe">Website</option>
                    <option value="mail">Email</option>
                  </select>
                  <input
                    type="text"
                    value={newSocial.url}
                    onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                    placeholder="https://..."
                    className="flex-1 bg-stone-950 border border-stone-800 rounded-lg px-2.5 py-1.5 text-xs text-stone-100 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                  <button
                    onClick={addSocial}
                    className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Accordion 4: About Track Details */}
        <div className="border border-stone-800 rounded-xl bg-stone-950/40 overflow-hidden">
          <button
            onClick={() => toggleAccordion('about')}
            className="w-full flex items-center justify-between p-3.5 bg-stone-950/60 hover:bg-stone-950 transition-colors text-xs font-semibold text-stone-300"
          >
            <span className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-stone-400" />
              Syllabus Summary (About)
            </span>
            {expandedSection === 'about' ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
          </button>
          
          {expandedSection === 'about' && (
            <div className="p-3.5 bg-stone-900/30 border-t border-stone-800/60">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Extended Syllabus Narrative</label>
              <textarea
                value={data.aboutText}
                onChange={(e) => updateField('aboutText', e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500 h-36 resize-y custom-scrollbar"
                placeholder="Explain what makes this track unique..."
              />
            </div>
          )}
        </div>

        {/* Accordion 5: Curriculum Syllabus manager */}
        <div className="border border-stone-800 rounded-xl bg-stone-950/40 overflow-hidden">
          <button
            onClick={() => toggleAccordion('syllabus')}
            className="w-full flex items-center justify-between p-3.5 bg-stone-950/60 hover:bg-stone-950 transition-colors text-xs font-semibold text-stone-300"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-stone-400" />
              Curriculum Syllabus ({data.syllabus.length})
            </span>
            {expandedSection === 'syllabus' ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
          </button>
          
          {expandedSection === 'syllabus' && (
            <div className="p-3.5 bg-stone-900/30 border-t border-stone-800/60 space-y-4">
              
              <div className="space-y-2">
                {data.syllabus.map((topic, index) => (
                  <div key={topic.id} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex justify-between items-start text-xs">
                    <div className="space-y-0.5 truncate pr-2">
                      <p className="font-semibold text-stone-100 truncate">{index + 1}. {topic.title}</p>
                      <p className="text-[10px] text-emerald-400 truncate">{topic.difficulty} • {topic.duration}</p>
                    </div>
                    <button
                      onClick={() => removeSyllabusItem(topic.id)}
                      className="text-stone-500 hover:text-rose-400 p-1 rounded hover:bg-stone-900/50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-800/60 space-y-2">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Add Syllabus Lesson</p>
                
                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Lesson Title</label>
                  <input
                    type="text"
                    value={newSyllabus.title}
                    onChange={(e) => setNewSyllabus({ ...newSyllabus, title: e.target.value })}
                    placeholder="e.g. Master Flexbox Layouts"
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-stone-400 block mb-0.5">Difficulty</label>
                    <select
                      value={newSyllabus.difficulty}
                      onChange={(e: any) => setNewSyllabus({ ...newSyllabus, difficulty: e.target.value })}
                      className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] text-stone-400 block mb-0.5">Est. Duration</label>
                    <input
                      type="text"
                      value={newSyllabus.duration}
                      onChange={(e) => setNewSyllabus({ ...newSyllabus, duration: e.target.value })}
                      placeholder="e.g. 1.5 Hours"
                      className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Summary</label>
                  <textarea
                    value={newSyllabus.summary}
                    onChange={(e) => setNewSyllabus({ ...newSyllabus, summary: e.target.value })}
                    placeholder="Describe target goals..."
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none h-14 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Key Goals (comma separated)</label>
                  <input
                    type="text"
                    value={takeawaysString}
                    onChange={(e) => setTakeawaysString(e.target.value)}
                    placeholder="Understand Flex, Set gap spacing, Handle responsiveness"
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <button
                  onClick={addSyllabusItem}
                  disabled={!newSyllabus.title}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors mt-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Lesson Node
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Accordion 6: Cheat Sheets manager */}
        <div className="border border-stone-800 rounded-xl bg-stone-950/40 overflow-hidden">
          <button
            onClick={() => toggleAccordion('cheatsheets')}
            className="w-full flex items-center justify-between p-3.5 bg-stone-950/60 hover:bg-stone-950 transition-colors text-xs font-semibold text-stone-300"
          >
            <span className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-stone-400" />
              Cheat Sheets ({data.cheatsheets.length})
            </span>
            {expandedSection === 'cheatsheets' ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
          </button>
          
          {expandedSection === 'cheatsheets' && (
            <div className="p-3.5 bg-stone-900/30 border-t border-stone-800/60 space-y-4">
              
              <div className="space-y-2">
                {data.cheatsheets.map((sheet) => (
                  <div key={sheet.id} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex justify-between items-start text-xs">
                    <div className="space-y-0.5 truncate pr-2">
                      <p className="font-semibold text-stone-100 truncate">{sheet.title}</p>
                      <p className="text-[10px] text-emerald-400 truncate">{sheet.category}</p>
                    </div>
                    <button
                      onClick={() => removeCheatSheet(sheet.id)}
                      className="text-stone-500 hover:text-rose-400 p-1 rounded hover:bg-stone-900/50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-800/60 space-y-2">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Add Cheat Sheet Block</p>
                
                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Topic Title</label>
                  <input
                    type="text"
                    value={newSheet.title}
                    onChange={(e) => setNewSheet({ ...newSheet, title: e.target.value })}
                    placeholder="e.g. Flexbox Tricks"
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-stone-400 block mb-0.5">Category</label>
                    <input
                      type="text"
                      value={newSheet.category}
                      onChange={(e) => setNewSheet({ ...newSheet, category: e.target.value })}
                      placeholder="e.g. Tailwind v4"
                      className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Explanation</label>
                  <textarea
                    value={newSheet.explanation}
                    onChange={(e) => setNewSheet({ ...newSheet, explanation: e.target.value })}
                    placeholder="Short description..."
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none h-14"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Code Snippet Console</label>
                  <textarea
                    value={newSheet.codeBlock}
                    onChange={(e) => setNewSheet({ ...newSheet, codeBlock: e.target.value })}
                    placeholder="Code payload here..."
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none h-24 font-mono text-[11px]"
                  />
                </div>

                <button
                  onClick={addCheatSheet}
                  disabled={!newSheet.title}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors mt-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Cheat Sheet
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Accordion 7: Coding Challenges */}
        <div className="border border-stone-800 rounded-xl bg-stone-950/40 overflow-hidden">
          <button
            onClick={() => toggleAccordion('challenges')}
            className="w-full flex items-center justify-between p-3.5 bg-stone-950/60 hover:bg-stone-950 transition-colors text-xs font-semibold text-stone-300"
          >
            <span className="flex items-center gap-2">
              <Code className="w-4 h-4 text-stone-400" />
              Code Challenges ({data.challenges.length})
            </span>
            {expandedSection === 'challenges' ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
          </button>
          
          {expandedSection === 'challenges' && (
            <div className="p-3.5 bg-stone-900/30 border-t border-stone-800/60 space-y-4">
              
              <div className="space-y-2">
                {data.challenges.map((c) => (
                  <div key={c.id} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex justify-between items-start text-xs">
                    <div className="space-y-0.5 truncate pr-2">
                      <p className="font-semibold text-stone-100 truncate">{c.title}</p>
                      <p className="text-[10px] text-emerald-400 truncate">{c.hint}</p>
                    </div>
                    <button
                      onClick={() => removeChallenge(c.id)}
                      className="text-stone-500 hover:text-rose-400 p-1 rounded hover:bg-stone-900/50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-800/60 space-y-2">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Add Code Challenge</p>
                
                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Challenge Title</label>
                  <input
                    type="text"
                    value={newChallenge.title}
                    onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                    placeholder="e.g. Master the gap spacing"
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Instruction Summary</label>
                  <input
                    type="text"
                    value={newChallenge.description}
                    onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                    placeholder="What should the user do?"
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Initial Code</label>
                  <textarea
                    value={newChallenge.initialCode}
                    onChange={(e) => setNewChallenge({ ...newChallenge, initialCode: e.target.value })}
                    placeholder="Provide boilerplate code..."
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none h-14 font-mono text-[11px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-stone-400 block mb-0.5">Solution Code</label>
                    <input
                      type="text"
                      value={newChallenge.solution}
                      onChange={(e) => setNewChallenge({ ...newChallenge, solution: e.target.value })}
                      placeholder="Expected string matches..."
                      className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-stone-400 block mb-0.5">Challenge Hint</label>
                    <input
                      type="text"
                      value={newChallenge.hint}
                      onChange={(e) => setNewChallenge({ ...newChallenge, hint: e.target.value })}
                      placeholder="e.g. Use gap-4 utility."
                      className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={addChallenge}
                  disabled={!newChallenge.title}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors mt-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Challenge Node
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Accordion 8: Quiz Deck */}
        <div className="border border-stone-800 rounded-xl bg-stone-950/40 overflow-hidden">
          <button
            onClick={() => toggleAccordion('quizzes')}
            className="w-full flex items-center justify-between p-3.5 bg-stone-950/60 hover:bg-stone-950 transition-colors text-xs font-semibold text-stone-300"
          >
            <span className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-stone-400" />
              Comprehension Quizzes ({data.quizzes.length})
            </span>
            {expandedSection === 'quizzes' ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
          </button>
          
          {expandedSection === 'quizzes' && (
            <div className="p-3.5 bg-stone-900/30 border-t border-stone-800/60 space-y-4">
              
              <div className="space-y-2">
                {data.quizzes.map((q) => (
                  <div key={q.id} className="p-2.5 rounded-lg bg-stone-950 border border-stone-800 flex justify-between items-start text-xs">
                    <div className="space-y-0.5 truncate pr-2">
                      <p className="font-semibold text-stone-100 truncate">{q.question}</p>
                      <p className="text-[10px] text-emerald-400 truncate">Correct option: #{q.correctIndex + 1}</p>
                    </div>
                    <button
                      onClick={() => removeQuizQuestion(q.id)}
                      className="text-stone-500 hover:text-rose-400 p-1 rounded hover:bg-stone-900/50 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-800/60 space-y-2">
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Add Quiz Question</p>
                
                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Question Text</label>
                  <input
                    type="text"
                    value={newQuiz.question}
                    onChange={(e) => setNewQuiz({ ...newQuiz, question: e.target.value })}
                    placeholder="e.g. What is oklch color luminance?"
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2.5 py-1.5 text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-stone-400 block mb-0.5">Answer Options</label>
                  {newQuiz.options.map((opt, oIdx) => (
                    <input
                      key={oIdx}
                      type="text"
                      value={opt}
                      onChange={(e) => updateQuizOption(oIdx, e.target.value)}
                      placeholder={`Option #${oIdx + 1}`}
                      className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none"
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-stone-400 block mb-0.5">Correct Option #</label>
                    <select
                      value={newQuiz.correctIndex}
                      onChange={(e: any) => setNewQuiz({ ...newQuiz, correctIndex: parseInt(e.target.value) })}
                      className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none"
                    >
                      <option value="0">Option #1</option>
                      <option value="1">Option #2</option>
                      <option value="2">Option #3</option>
                      <option value="3">Option #4</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-stone-400 block mb-0.5">Comprehension Explanation</label>
                  <textarea
                    value={newQuiz.explanation}
                    onChange={(e) => setNewQuiz({ ...newQuiz, explanation: e.target.value })}
                    placeholder="Why is this option correct?"
                    className="w-full bg-stone-950 border border-stone-800 rounded px-2 py-1 text-xs text-stone-200 focus:outline-none h-14"
                  />
                </div>

                <button
                  onClick={addQuizQuestion}
                  disabled={!newQuiz.question}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-semibold rounded-lg transition-colors mt-2 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Quiz Question
                </button>
              </div>

            </div>
          )}
        </div>

        {/* Accordion 9: Footer branding */}
        <div className="border border-stone-800 rounded-xl bg-stone-950/40 overflow-hidden">
          <button
            onClick={() => toggleAccordion('footer')}
            className="w-full flex items-center justify-between p-3.5 bg-stone-950/60 hover:bg-stone-950 transition-colors text-xs font-semibold text-stone-300"
          >
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-stone-400" />
              Copyright & Signature
            </span>
            {expandedSection === 'footer' ? <ChevronUp className="w-3.5 h-3.5 text-stone-500" /> : <ChevronDown className="w-3.5 h-3.5 text-stone-500" />}
          </button>
          
          {expandedSection === 'footer' && (
            <div className="p-3.5 bg-stone-900/30 border-t border-stone-800/60">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Footer Copyright Signature</label>
              <input
                type="text"
                value={data.footerText}
                onChange={(e) => updateField('footerText', e.target.value)}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-xs text-stone-100 focus:outline-none focus:border-emerald-500"
                placeholder="e.g. © NANA Learning"
              />
            </div>
          )}
        </div>

      </div>

      {/* Footer hint */}
      <div className="p-4 bg-stone-950 border-t border-stone-800/80 text-[10px] text-stone-500 leading-normal flex gap-2 items-start">
        <Lightbulb className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <p>
          Need to deploy this study companion? Click <strong>Export HTML</strong> above to get a single self-contained responsive website instantly!
        </p>
      </div>

    </div>
  );
}
