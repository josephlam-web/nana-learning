import React, { useState } from 'react';
import { LearningData } from '../types';
import { motion } from 'motion/react';
import { THEMES, FONTS } from '../presets';

// Import newly generated brand and course images
import girlStudying from '../assets/images/girl_studying_1782473128569.jpg';
import nanaLogo from '../assets/images/nana_logo_1782473146386.jpg';
import welcomeBanner from '../assets/images/welcome_banner_1782473161259.jpg';
import learningGroup from '../assets/images/learning_group_1782473174313.jpg';
import writingFlowers from '../assets/images/writing_flowers_1782473186832.jpg';

import { 
  Search, 
  MapPin, 
  Languages, 
  Palette, 
  Music, 
  TrendingUp, 
  Code, 
  Heart, 
  Star, 
  ArrowRight, 
  Check, 
  Calendar, 
  Clock, 
  Mail, 
  User, 
  Sparkles, 
  Laptop, 
  Smartphone,
  CheckCircle2,
  Send
} from 'lucide-react';

interface PortfolioPreviewProps {
  data: LearningData;
}

// Vetted hardcoded teacher/profile data to keep layout extremely rich and realistic (no booking, no contact details)
const TEACHERS = [
  {
    id: 't-camille',
    name: 'Camille Rousseau',
    location: 'Paris, FR',
    initials: 'CR',
    bgClass: 'bg-[#dcf6ef] text-[#1b4332]',
    badge: 'FRENCH • PRONUNCIATION',
    bio: '10 years coaching French phonetics, ex-Sciences Po lecturer. Specializes in helping students master melodic accent flow, spoken liaison techniques, and rhythmic Parisian cadence.',
    rating: '4.9',
    sessions: '1,240',
  },
  {
    id: 't-luca',
    name: 'Luca Bianchi',
    location: 'Milan, IT',
    initials: 'LB',
    bgClass: 'bg-[#fee2e2] text-[#7f1d1d]',
    badge: 'ITALIAN • CONVERSATION',
    bio: 'Wine writer turned tutor. Focused on regional dialects, Slow Food terminology, and immersive contemporary slang to help students navigate real Italian streets with confidence.',
    rating: '4.8',
    sessions: '980',
  },
  {
    id: 't-anna',
    name: 'Anna Hoffmann',
    location: 'Berlin, DE',
    initials: 'AH',
    bgClass: 'bg-[#f3e8ff] text-[#581c87]',
    badge: 'DESIGN • UI/UX',
    bio: 'Senior design generalist in Berlin. Mentors creative minds breaking into top-tier European product squads, focusing on typographic layout hierarchies and functional systems.',
    rating: '5.0',
    sessions: '412',
  },
  {
    id: 't-sofia',
    name: 'Sofía Delgado',
    location: 'Seville, ES',
    initials: 'SD',
    bgClass: 'bg-[#fef3c7] text-[#78350f]',
    badge: 'SPANISH • MUSIC',
    bio: 'Classical Flamenco guitarist and linguist. Explores the organic rhythm of the Spanish language through Andalusian poetry structures, song lyrics translation, and metric pronunciation.',
    rating: '4.9',
    sessions: '760',
  }
];

const EVENTS = [
  {
    id: 'ev-1',
    title: 'Italian Aperitivo Hour',
    host: 'Luca Bianchi',
    date: '18 Jul',
    time: '18:00 CET',
    badge: 'LANGUAGE CAFÉ',
    desc: 'Practice conversational Italian in a simulated Milanese café. Perfect for testing your regional food ordering vocabulary and hands-on expressions.'
  },
  {
    id: 'ev-2',
    title: 'Berlin Design Sprint Workshop',
    host: 'Anna Hoffmann',
    date: '22 Jul',
    time: '10:00 CET',
    badge: 'MASTERCLASS',
    desc: 'Learn rapid visual layout planning, uniform alignment frameworks, and clean negative space composition guidelines under standard industry timelines.'
  },
  {
    id: 'ev-3',
    title: 'Flamenco Rhythm Fundamentals',
    host: 'Sofía Delgado',
    date: '25 Jul',
    time: '19:30 CET',
    badge: 'MUSIC SYNC',
    desc: 'Clap, listen, and articulate. An acoustic exploration of Andalusian phrasing patterns, syllables emphasis, and emotional vocal delivery.'
  }
];

const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Elena Rostova',
    role: 'Bilingual Consultant',
    quote: 'The CEFR curriculum and direct native-speaker sessions at NANA transformed my spoken French in less than 3 months. Truly an outstanding approach to phonetic flow.',
    rating: 5,
    location: 'Munich, DE'
  },
  {
    id: 'test-2',
    name: 'Marc Dupond',
    role: 'Interaction Designer',
    quote: 'Anna’s design sprint masterclasses helped me rebuild my portfolio typography from scratch. The focus on Swiss minimal spacing is incredible!',
    rating: 5,
    location: 'Lyon, FR'
  },
  {
    id: 'test-3',
    name: 'Sarah Jenkins',
    role: 'Product Manager',
    quote: 'Authentic regional conversations without any clunky software. Having WhatsApp coordinates handy makes coordination feel so human and personal.',
    rating: 5,
    location: 'London, UK'
  }
];

const CEFR_LEVELS = [
  { code: 'A1-A2', name: 'Foundations & Confidence', duration: '8-10 WEEKS', desc: 'Acoustic phonetic patterns, basic everyday vocabulary, and simple community journals.' },
  { code: 'B1-B2', name: 'Independence & Fluency', duration: '12-14 WEEKS', desc: 'Hold complex conversations, express deep opinions, read newspapers, and write clear updates.' },
  { code: 'C1-C2', name: 'Mastery & Flow', duration: '16+ WEEKS', desc: 'Understand subtle idioms, professional-grade reports, regional dialects, and native-level speed.' }
];

const COURSE_STEPS = [
  { num: '01', title: 'Sound & Phonics', desc: 'Vocal exercises, acoustic listening patterns, and natural tone sequence drills.' },
  { num: '02', title: 'Contextual Dialogue', desc: 'Roleplaying real-world European scenarios, from train ticketing to slow food cafés.' },
  { num: '03', title: 'Systematic Flow', desc: 'Connecting clauses, using past/conditional tenses organically, and storytelling.' }
];

// High-fidelity custom SVG for WhatsApp brand
const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.004 0C5.372 0 0 5.373 0 12.003c0 2.113.551 4.17 1.6 5.981L.055 24l6.168-1.618a11.947 11.947 0 0 0 5.781 1.488c6.632 0 12.004-5.372 12.004-12.003C24.008 5.373 18.636 0 12.004 0zm6.59 17.026c-.27.759-1.562 1.396-2.158 1.48-.596.085-1.192.17-3.83-.885-3.379-1.348-5.545-4.789-5.715-5.016-.17-.226-1.362-1.812-1.362-3.454 0-1.642.85-2.45 1.155-2.775.305-.325.663-.408.883-.408.22 0 .44 0 .633.01.206.01.483-.08.756.577.276.666.945 2.308 1.026 2.473.082.164.137.356.027.576-.11.22-.164.356-.33.548-.164.192-.345.427-.493.576-.164.164-.337.343-.144.673.193.33.856 1.411 1.832 2.28 1.258 1.121 2.316 1.468 2.646 1.633.33.165.523.137.716-.083.192-.22.827-.96 1.047-1.293.22-.33.44-.275.742-.164.303.11 1.914.903 2.189 1.04.275.137.458.206.523.316.066.11.066.633-.205 1.392z"/>
  </svg>
);

export default function PortfolioPreview({ data }: PortfolioPreviewProps) {
  // Mobile frame is the main device to design, as requested!
  const [viewportMode, setViewportMode] = useState<'desktop' | 'mobile'>('mobile');
  
  // Clean states for visual interactions
  const [searchQuery, setSearchQuery] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  // Retrieve active presets
  const activeTheme = THEMES.find(t => t.id === data.themeId) || THEMES[0];
  const activeFont = FONTS.find(f => f.id === data.fontId) || FONTS[0];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', message: '' });
      setContactSubmitted(false);
    }, 4000);
  };

  return (
    <div className="flex flex-col h-full bg-stone-950 flex-1 overflow-hidden font-sans" id="preview-wrapper">
      
      {/* Top Studio Controls Bar (Clean and descriptive) */}
      <div className="h-14 bg-stone-900 border-b border-stone-800 flex items-center justify-between px-6 z-10 flex-shrink-0" id="preview-control-bar">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold text-stone-300 font-mono tracking-wide">LIVE PORTAL PREVIEW</span>
        </div>

        {/* Viewport toggle frames */}
        <div className="flex bg-stone-950 p-1 rounded-lg border border-stone-800">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${viewportMode === 'desktop' ? 'bg-[#5cd4b4] text-stone-900 shadow-sm font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            id="control-view-desktop"
          >
            <Laptop className="w-3.5 h-3.5" />
            Desktop
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${viewportMode === 'mobile' ? 'bg-[#5cd4b4] text-stone-900 shadow-sm font-bold' : 'text-stone-400 hover:text-stone-200'}`}
            id="control-view-mobile"
          >
            <Smartphone className="w-3.5 h-3.5" />
            Mobile Frame
          </button>
        </div>

        <div className="text-[11px] text-stone-500 font-mono hidden sm:block">
          {viewportMode === 'desktop' ? 'Wide responsive layout' : 'Mobile First Safe Area'}
        </div>
      </div>

      {/* Frame Rendering Container */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 md:p-8 flex justify-center bg-stone-950/60 custom-scrollbar relative" id="canvas-frame-container">
        
        {/* Responsive viewport outer simulation */}
        <div 
          className={`transition-all duration-300 rounded-[2.2rem] text-stone-900 flex flex-col overflow-hidden relative ${
            viewportMode === 'mobile' 
              ? 'w-[390px] max-w-[390px] border-[10px] border-stone-900 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)] h-[740px] bg-white' 
              : 'w-full max-w-5xl h-full shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] border border-stone-800/10 bg-white'
          }`}
          id="mockup-viewport"
        >
          
          {/* COMPACT STICKY HEADER (Saves valuable vertical space on mobile!) */}
          <header className={`sticky top-0 z-40 border-b py-3 px-4 flex justify-between items-center shrink-0 transition-colors ${
            activeTheme.isDark 
              ? 'bg-[#0f1b1a]/95 border-[#1f3735] text-stone-100' 
              : 'bg-white/95 border-stone-100 text-stone-900'
          }`} id="brand-header">
            {/* Logo and Brand Title using the attached image */}
            <div className="flex items-center gap-2" id="header-logo-btn">
              <img 
                src={nanaLogo} 
                alt="NANA Logo" 
                className="w-7 h-7 rounded-full object-cover border border-[#56d5b0]/20 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className={`font-extrabold text-xs tracking-widest leading-none ${activeTheme.isDark ? 'text-white' : 'text-stone-950'}`}>
                  NANA
                </span>
                <span className="font-semibold text-[7px] tracking-wider text-emerald-600 uppercase mt-0.5">LEARNING</span>
              </div>
            </div>

            {/* In the right hand corner, deleted "start" button and replaced it with a premium WhatsApp contact button */}
            <a 
              href="#whatsapp-chat" 
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba56] text-white font-black px-3 py-1.5 rounded-full text-[9px] uppercase tracking-wider transition-all shadow-xs cursor-pointer"
              id="header-whatsapp-btn"
              onClick={(e) => {
                e.preventDefault();
                alert('WhatsApp integration API will be connected here based on your instructions!');
              }}
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </header>

          {/* SINGLE VIEW INFINITE SCROLLABLE WINDOW */}
          <div 
            className={`flex-1 overflow-y-auto custom-scrollbar transition-colors ${activeTheme.bg} scroll-smooth`} 
            id="main-scrollable-content"
          >
            <div className={`${activeFont.bodyClass} flex flex-col gap-14 pb-20`}>
              
              {/* SECTION 1: THE LANDING PAGE (Hero Area) */}
              <div id="section-landing" className="scroll-mt-14">
                <section className="bg-emerald-50/60 p-6 md:p-10 rounded-b-[2rem] text-left relative overflow-hidden">
                  
                  {/* Subtle decorative grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/95 border border-emerald-200/50 rounded-full text-[8px] font-bold tracking-widest text-emerald-800 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      WELCOME TO NANA LEARNING
                    </div>
                    
                    {/* Official Image icon rendered as a prominent decorative badge */}
                    <div className="flex items-center gap-3 bg-white/90 p-2.5 rounded-2xl border border-emerald-100 max-w-xs shadow-xs">
                      <img 
                        src={nanaLogo} 
                        alt="NANA Brand Icon" 
                        className="w-10 h-10 rounded-xl object-cover shadow-xs border border-emerald-200/40"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-left">
                        <p className="text-[10px] font-black text-stone-900 uppercase tracking-wider leading-none">Keep Learning!</p>
                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-wider leading-none mt-1">Keep Growing!</p>
                        <p className="text-[7px] text-stone-400 font-semibold mt-0.5">Official Educational Companion</p>
                      </div>
                    </div>

                    <h1 className={`text-3xl sm:text-4.5xl font-extrabold tracking-tight text-stone-950 leading-tight ${activeFont.headingClass}`}>
                      {data.tagline || 'Keep Learning! Keep Growing!'}
                    </h1>
                    
                    <p className="text-stone-600 text-xs leading-relaxed max-w-lg">
                      {data.heroText || 'Master foreign languages, explore premium layout systems, and find native mentors to guide your journey. All of our course modules are structured directly around authentic European regional contexts.'}
                    </p>

                    {/* Static visual search block */}
                    <div className="bg-white rounded-full p-1 border border-stone-200/60 shadow-xs flex items-center w-full max-w-md">
                      <Search className="w-3.5 h-3.5 text-stone-400 ml-2.5 shrink-0" />
                      <input 
                        type="text" 
                        disabled
                        placeholder="Search our masterclasses and native tutors..." 
                        className="flex-1 bg-transparent border-none text-[11px] pl-1.5 pr-1.5 py-1 text-stone-500 outline-none placeholder-stone-400 cursor-not-allowed"
                      />
                      <button 
                        disabled
                        className="bg-emerald-500 text-stone-950 font-bold px-3 py-1 rounded-full text-[10px] transition-colors cursor-not-allowed"
                      >
                        Explore
                      </button>
                    </div>
                  </div>

                  {/* Primary welcomeBanner graphic asset */}
                  <div className="mt-8 relative rounded-2xl overflow-hidden border border-emerald-200/30 shadow-sm max-w-md mx-auto">
                    <img 
                      src={welcomeBanner} 
                      alt="Nana study path banner" 
                      className="w-full h-44 object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span className="text-[8px] font-bold text-stone-800 uppercase tracking-widest">Active Enrollment Open</span>
                    </div>
                  </div>
                </section>
              </div>

              {/* SECTION 2: THE TESTIMONIALS */}
              <div id="section-testimonials" className="px-4 scroll-mt-14">
                <section className="space-y-4 text-left">
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <span className="text-[9px] font-bold tracking-widest text-emerald-700 uppercase">STUDENT SUCCESS</span>
                    <h2 className={`text-xl font-extrabold text-stone-900 ${activeFont.headingClass}`}>The Testimonials</h2>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed">
                    Read how learners worldwide are achieving structural confidence and accents fluidity under our program.
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    {TESTIMONIALS.map((test) => (
                      <div key={test.id} className={`p-4 rounded-2xl ${activeTheme.cardBg} space-y-3`}>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-0.5">
                            {[...Array(test.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                          <span className="text-[8px] font-mono font-bold text-stone-400 uppercase tracking-wider">{test.location}</span>
                        </div>
                        
                        <p className="text-stone-600 text-xs italic leading-relaxed">
                          "{test.quote}"
                        </p>

                        <div className="flex items-center gap-2 pt-1">
                          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-[9px] text-emerald-800">
                            {test.name[0]}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-stone-900 leading-none">{test.name}</p>
                            <p className="text-[8px] text-stone-400 mt-0.5">{test.role}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Accompanying aesthetic illustration block */}
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/50 flex flex-col sm:flex-row items-center gap-4 mt-4">
                    <img 
                      src={learningGroup} 
                      alt="Students collaborating" 
                      className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-left space-y-1">
                      <h4 className="font-bold text-xs text-stone-950">Collaborative Study Circles</h4>
                      <p className="text-stone-500 text-[10px] leading-relaxed">
                        Every course includes community forums and curated peer workshops to test your conversational flow in real-time.
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              {/* SECTION 3: THE TOP COURSE CATEGORIES */}
              <div id="section-categories" className="px-4 scroll-mt-14">
                <section className="space-y-4 text-left">
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <span className="text-[9px] font-bold tracking-widest text-emerald-700 uppercase">EXPLORE SPECIALTIES</span>
                    <h2 className={`text-xl font-extrabold text-stone-900 ${activeFont.headingClass}`}>Top Course Categories</h2>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed">
                    We organize our study tracks strictly around real-world practical applications to optimize your daily professional or relocations growth.
                  </p>

                  {/* High-fidelity visual grid */}
                  <div className="grid grid-cols-2 gap-3" id="categories-grid">
                    
                    <div className={`p-4 rounded-2xl ${activeTheme.cardBg} flex flex-col justify-between min-h-[120px]`}>
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 mb-3 shrink-0">
                        <Languages className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-extrabold text-xs text-stone-950">Languages</h3>
                        <p className="text-[8px] text-stone-400 mt-0.5">120 premium tracks</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-2xl ${activeTheme.cardBg} flex flex-col justify-between min-h-[120px]`}>
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-800 mb-3 shrink-0">
                        <Palette className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-extrabold text-xs text-stone-950">Design & Art</h3>
                        <p className="text-[8px] text-stone-400 mt-0.5">84 high-end tracks</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-2xl ${activeTheme.cardBg} flex flex-col justify-between min-h-[120px]`}>
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 mb-3 shrink-0">
                        <Code className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-extrabold text-xs text-stone-950">Coding & Tech</h3>
                        <p className="text-[8px] text-stone-400 mt-0.5">62 systemic courses</p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-2xl ${activeTheme.cardBg} flex flex-col justify-between min-h-[120px]`}>
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 mb-3 shrink-0">
                        <Music className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-extrabold text-xs text-stone-950">Music Theory</h3>
                        <p className="text-[8px] text-stone-400 mt-0.5">46 acoustic courses</p>
                      </div>
                    </div>

                  </div>
                </section>
              </div>

              {/* SECTION 4: THE COURSE CONTENT / CURRICULUM */}
              <div id="section-curriculum" className="px-4 scroll-mt-14">
                <section className="space-y-4 text-left">
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <span className="text-[9px] font-bold tracking-widest text-emerald-700 uppercase">PROFICIENCY PATHWAY</span>
                    <h2 className={`text-xl font-extrabold text-stone-900 ${activeFont.headingClass}`}>Course Content</h2>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed">
                    Designed to take you from initial sounds to complete cultural integration. Our curriculum is mapped directly to the official Common European Framework of Reference (CEFR).
                  </p>

                  {/* Interactive-looking but purely static high-fidelity syllabus nodes */}
                  <div className="space-y-3">
                    {CEFR_LEVELS.map((level, idx) => (
                      <div key={idx} className={`p-4 rounded-2xl ${activeTheme.cardBg} space-y-2`}>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-emerald-700 font-mono tracking-wider">{level.code}</span>
                          <span className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-[7px] font-mono font-bold">{level.duration}</span>
                        </div>
                        <h3 className="font-bold text-xs text-stone-900">{level.name}</h3>
                        <p className="text-stone-500 text-[10px] leading-relaxed">{level.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Interactive-looking but static Steps mapping */}
                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 mt-4 space-y-4">
                    <h4 className="font-extrabold text-xs text-stone-900 tracking-tight uppercase">Step-by-Step Milestones</h4>
                    
                    <div className="space-y-3">
                      {COURSE_STEPS.map((step, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-mono text-[9px] font-bold flex items-center justify-center shrink-0">
                            {step.num}
                          </span>
                          <div className="text-left space-y-0.5">
                            <h5 className="font-bold text-[11px] text-stone-900">{step.title}</h5>
                            <p className="text-stone-600 text-[10px] leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic user sidebar curriculum if any has been configured */}
                  {data.syllabus && data.syllabus.length > 0 && (
                    <div className="mt-6 space-y-3">
                      <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest">Custom Syllabus Checkpoints</p>
                      {data.syllabus.map((customMod) => (
                        <div key={customMod.id} className="p-3.5 rounded-xl border border-dashed border-stone-200 bg-white">
                          <div className="flex justify-between items-baseline">
                            <h5 className="font-bold text-[11px] text-stone-900">{customMod.title}</h5>
                            <span className="text-[7px] font-mono bg-emerald-50 text-emerald-700 px-1 py-0.5 rounded font-bold">{customMod.duration}</span>
                          </div>
                          <p className="text-stone-500 text-[10px] mt-1.5 leading-relaxed">{customMod.summary}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Accompanying graphic image */}
                  <div className="rounded-2xl overflow-hidden border border-stone-100 max-w-md mx-auto">
                    <img 
                      src={girlStudying} 
                      alt="Student focusing on curriculum" 
                      className="w-full h-32 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                </section>
              </div>

              {/* SECTION 5: MEET THE PEOPLE (Teachers' profiles) */}
              {/* STIPPED ALL CONTACT INFO AND BOOKING FUNCTIONS AS REQUESTED */}
              <div id="section-teachers" className="px-4 scroll-mt-14">
                <section className="space-y-4 text-left">
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <span className="text-[9px] font-bold tracking-widest text-emerald-700 uppercase">ACCREDITED FACULTY</span>
                    <h2 className={`text-xl font-extrabold text-stone-900 ${activeFont.headingClass}`}>Meet the People</h2>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed">
                    Our team brings decades of combined native linguistic coaching and product design mastery, giving you unparalleled practical mentorship.
                  </p>

                  <div className="grid grid-cols-1 gap-4">
                    {TEACHERS.map((teacher) => (
                      <div key={teacher.id} className={`p-4 rounded-2xl ${activeTheme.cardBg} space-y-3`}>
                        <div className="flex items-center gap-3">
                          {/* Initials Circle with customized background */}
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-xs ${teacher.bgClass}`}>
                            {teacher.initials}
                          </div>
                          <div className="text-left">
                            <h4 className="font-extrabold text-xs text-stone-950 leading-tight">{teacher.name}</h4>
                            <p className="text-[8px] text-stone-400 flex items-center gap-0.5 mt-0.5">
                              <MapPin className="w-2.5 h-2.5 text-emerald-600" /> {teacher.location}
                            </p>
                          </div>
                        </div>

                        {/* Experience Badge */}
                        <div>
                          <span className="inline-block text-[7px] font-black tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase font-mono">
                            {teacher.badge}
                          </span>
                        </div>

                        {/* Teacher Bio */}
                        <p className="text-stone-600 text-[10px] leading-relaxed">
                          {teacher.bio}
                        </p>

                        {/* Profile metrics (Static, no contact, no buttons) */}
                        <div className="pt-2 border-t border-stone-50 flex items-center justify-between text-[8px] text-stone-400 font-mono">
                          <span className="flex items-center gap-0.5 font-bold">
                            <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                            <span className="text-stone-900">{teacher.rating} Stars Rating</span>
                          </span>
                          <span>{teacher.sessions} sessions coached</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* SECTION 6: LIVE EVENTS */}
              {/* COMPLETELY STATIC SCHEDULE */}
              <div id="section-events" className="px-4 scroll-mt-14">
                <section className="space-y-4 text-left">
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <span className="text-[9px] font-bold tracking-widest text-emerald-700 uppercase">ACTIVE CALENDAR</span>
                    <h2 className={`text-xl font-extrabold text-stone-900 ${activeFont.headingClass}`}>Live Events</h2>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed">
                    Interactive group masterclasses and language cafes hosted in real-time. Review upcoming live schedules:
                  </p>

                  <div className="space-y-3">
                    {EVENTS.map((evt) => (
                      <div key={evt.id} className={`p-4 rounded-2xl ${activeTheme.cardBg} flex gap-3 items-start`}>
                        {/* Static visual date square */}
                        <div className="bg-emerald-50 p-2 rounded-xl text-center shrink-0 min-w-[50px] border border-emerald-100">
                          <p className="font-extrabold text-xs text-stone-950 font-heading leading-none">{evt.date.split(' ')[0]}</p>
                          <p className="text-[7px] font-mono font-bold text-emerald-700 mt-1 uppercase leading-none">{evt.date.split(' ')[1]}</p>
                        </div>

                        <div className="space-y-1 text-left flex-1">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <span className="text-[7px] font-mono bg-stone-100 text-stone-600 px-1 py-0.5 rounded font-bold uppercase">{evt.badge}</span>
                            <span className="text-[8px] text-stone-400 font-mono flex items-center gap-0.5"><Clock className="w-2.5 h-2.5" /> {evt.time}</span>
                          </div>
                          <h4 className="font-extrabold text-xs text-stone-900 leading-snug">{evt.title}</h4>
                          <p className="text-stone-500 text-[10px] leading-relaxed">{evt.desc}</p>
                          <p className="text-emerald-700 text-[8px] font-bold uppercase tracking-wider">Host: {evt.host}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-stone-100 max-w-md mx-auto">
                    <img 
                      src={writingFlowers} 
                      alt="Cosy studying scenery" 
                      className="w-full h-32 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </section>
              </div>

              {/* SECTION 7: SAY HELLO */}
              <div id="section-hello" className="px-4 scroll-mt-14">
                <section className="space-y-4 text-left">
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <span className="text-[9px] font-bold tracking-widest text-emerald-700 uppercase">GET IN TOUCH</span>
                    <h2 className={`text-xl font-extrabold text-stone-900 ${activeFont.headingClass}`}>Say Hello</h2>
                  </div>

                  <p className="text-stone-500 text-xs leading-relaxed">
                    Have questions about the tracks, CEFR levels, or scheduling? Send us a quick note below and our coordinators will reach back out.
                  </p>

                  <div className={`p-5 rounded-2xl ${activeTheme.cardBg}`}>
                    {contactSubmitted ? (
                      <div className="py-6 text-center space-y-2 animate-fadeIn">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-800">
                          <Check className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-xs text-stone-900">Message Received!</h4>
                        <p className="text-stone-500 text-[9px] leading-relaxed max-w-xs mx-auto">
                          Thank you for saying hello. Our coordinator team will reply within 24 business hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-stone-400 uppercase tracking-wider">Full Name</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Elena Rostova"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 outline-none focus:border-emerald-500 transition-colors bg-white/50"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-stone-400 uppercase tracking-wider">Email Address</label>
                          <input 
                            type="email" 
                            required
                            placeholder="elena.r@consultant.de"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 outline-none focus:border-emerald-500 transition-colors bg-white/50"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[8px] font-bold text-stone-400 uppercase tracking-wider">Your Message</label>
                          <textarea 
                            required
                            rows={3}
                            placeholder="Tell us about your learning goals..."
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 outline-none focus:border-emerald-500 transition-colors bg-white/50 resize-none"
                          ></textarea>
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-stone-950 hover:bg-stone-850 text-white font-extrabold py-2.5 rounded-full text-xs text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Send Message</span>
                        </button>
                      </form>
                    )}
                  </div>
                </section>
              </div>

              {/* NATURAL SCROLLABLE FOOTER (Does not block the view!) */}
              <footer className="mt-6 border-t border-stone-100 py-6 px-4 text-center space-y-3 shrink-0" id="main-footer">
                <div className="flex justify-center items-center gap-1.5">
                  <img 
                    src={nanaLogo} 
                    alt="NANA" 
                    className="w-5 h-5 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-extrabold text-[10px] tracking-widest text-stone-950 uppercase">NANA LEARNING</span>
                </div>
                <p className="text-stone-400 text-[9px] max-w-xs mx-auto leading-normal">
                  Accredited European linguistic workshops & masterclass tracks.
                </p>
                <p className="text-[8px] font-mono text-stone-400">
                  © 2026 {data.appName || 'NANA Learning'}. All rights reserved.
                </p>
              </footer>

            </div>
          </div>

          {/* PERSISTENT FLOATING WHATSAPP BUTTON (With soft pulse/glow action) */}
          <div className="absolute bottom-4 right-4 z-50 pointer-events-auto" id="floating-whatsapp-container">
            <button
              onClick={() => alert('WhatsApp integration API will be connected here based on your instructions!')}
              className="flex items-center gap-2 bg-[#25D366] text-white p-3 rounded-full shadow-[0_4px_16px_rgba(37,211,102,0.45)] hover:bg-[#20ba56] hover:scale-105 active:scale-95 transition-all duration-300 relative group animate-bounce cursor-pointer"
              title="Chat via WhatsApp"
              id="whatsapp-floating-action"
            >
              {/* Double pulsing ring glow */}
              <span className="absolute -inset-0.5 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none"></span>
              <WhatsAppIcon className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase tracking-wider pr-1 hidden sm:inline-block">WhatsApp Chat</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
