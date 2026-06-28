import { LearningData, PortfolioTheme, FontConfig } from '../types';
import { THEMES, FONTS } from '../presets';

// Help helper for SVG icon paths in standalone exported HTML to avoid external font loading
function getSvgPath(platform: string): string {
  switch (platform.toLowerCase()) {
    case 'github':
      return `<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" />`;
    case 'twitter':
      return `<path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />`;
    case 'mail':
      return `<rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />`;
    case 'globe':
      return `<circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />`;
    case 'linkedin':
      return `<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />`;
    case 'discord':
      return `<path d="M18 6a6 6 0 0 0-4-1.5h-4A6 6 0 0 0 6 6c-2 2-2 6-2 8a6 6 0 0 0 4 5.5l1-1.5a8 8 0 0 1-3-4 12 12 0 0 0 12 0 8 8 0 0 1-3 4l1 1.5a6 6 0 0 0 4-5.5c0-2 0-6-2-8Z" /><circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />`;
    default:
      return `<circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />`;
  }
}

export function generateStaticHtml(data: LearningData): string {
  const selectedTheme = THEMES.find(t => t.id === data.themeId) || THEMES[0];
  const selectedFont = FONTS.find(f => f.id === data.fontId) || FONTS[0];

  // Resolve accent variables
  const themeAccentHex = selectedTheme.id === 'nana-mint' ? '#059669' :
                         selectedTheme.id === 'emerald-dark' ? '#bef264' :
                         selectedTheme.id === 'cosmic-dark' ? '#6366f1' :
                         selectedTheme.id === 'warm-minimalist' ? '#78350f' : '#22c55e';

  const themeAccentHoverHex = selectedTheme.id === 'nana-mint' ? '#047857' :
                              selectedTheme.id === 'emerald-dark' ? '#a3e635' :
                              selectedTheme.id === 'cosmic-dark' ? '#4f46e5' :
                              selectedTheme.id === 'warm-minimalist' ? '#451a03' : '#16a34a';

  // Build social icons links
  const socialLinksHtml = data.socialLinks.map(link => `
    <a href="${link.url}" target="_blank" rel="noopener noreferrer" 
       class="p-2 rounded-full border ${selectedTheme.border} ${selectedTheme.cardBg} transition-all duration-300 hover:scale-105 flex items-center justify-center text-current opacity-85 hover:opacity-100"
       title="${link.platform}">
       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
         ${getSvgPath(link.platform)}
       </svg>
    </a>
  `).join('\n');

  // Syllabus section
  const syllabusHtml = data.visibleSections.syllabus && data.syllabus.length > 0 ? `
    <section id="syllabus" class="py-12 border-t ${selectedTheme.border}">
      <h2 class="text-2xl font-bold mb-8 ${selectedTheme.textPrimary} ${selectedFont.headingClass}">Curriculum Syllabus</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${data.syllabus.map((topic, index) => `
          <div class="p-6 rounded-2xl border ${selectedTheme.border} ${selectedTheme.cardBg} space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-600 font-bold">${topic.difficulty}</span>
              <span class="text-xs font-mono opacity-70">${topic.duration}</span>
            </div>
            <h3 class="text-lg font-bold ${selectedTheme.textPrimary} ${selectedFont.headingClass}">${index + 1}. ${topic.title}</h3>
            <p class="text-sm ${selectedTheme.textSecondary} leading-relaxed">${topic.summary}</p>
            <div class="space-y-2 pt-2">
              <p class="text-xs font-mono font-bold opacity-80 uppercase tracking-wide">Key Learning Goals:</p>
              <ul class="space-y-1 text-xs ${selectedTheme.textSecondary}">
                ${topic.keyTakeaways.map(takeaway => `
                  <li class="flex items-start gap-2">
                    <span class="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>${takeaway}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        `).join('\n')}
      </div>
    </section>
  ` : '';

  // Cheatsheets section
  const cheatsheetsHtml = data.visibleSections.cheatsheets && data.cheatsheets.length > 0 ? `
    <section id="cheatsheets" class="py-12 border-t ${selectedTheme.border}">
      <h2 class="text-2xl font-bold mb-8 ${selectedTheme.textPrimary} ${selectedFont.headingClass}">Interactive Cheat Sheets</h2>
      <div class="space-y-8">
        ${data.cheatsheets.map(sheet => `
          <div class="p-6 rounded-2xl border ${selectedTheme.border} ${selectedTheme.cardBg} space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-bold ${selectedTheme.textPrimary} ${selectedFont.headingClass}">${sheet.title}</h3>
              <span class="text-xs font-mono px-2 py-0.5 rounded border border-current opacity-60">${sheet.category}</span>
            </div>
            
            <p class="text-sm ${selectedTheme.textSecondary} leading-relaxed">${sheet.explanation}</p>
            
            <!-- Styled dark code console blocks -->
            <div class="bg-slate-950 text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner relative">
              <div class="absolute right-3 top-3 text-[9px] uppercase tracking-wider text-slate-600 select-none">READONLY CONSOLE</div>
              <pre class="leading-relaxed"><code>${sheet.codeBlock.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
            </div>
          </div>
        `).join('\n')}
      </div>
    </section>
  ` : '';

  // Challenges section
  const challengesHtml = data.visibleSections.challenges && data.challenges.length > 0 ? `
    <section id="challenges" class="py-12 border-t ${selectedTheme.border}">
      <h2 class="text-2xl font-bold mb-8 ${selectedTheme.textPrimary} ${selectedFont.headingClass}">Coding Challenges & Terminals</h2>
      <div class="space-y-6">
        ${data.challenges.map(chall => `
          <div class="p-6 rounded-2xl border ${selectedTheme.border} ${selectedTheme.cardBg} space-y-4">
            <h3 class="text-base font-bold ${selectedTheme.textPrimary}">${chall.title}</h3>
            <p class="text-sm ${selectedTheme.textSecondary}">${chall.description}</p>
            
            <!-- Interactive Challenge Mock Box -->
            <div class="space-y-3">
              <div class="bg-slate-950 text-slate-200 rounded-xl p-4 font-mono text-xs border border-slate-800">
                <pre class="leading-relaxed"><code>${chall.initialCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
              </div>
              <div class="flex items-center justify-between text-xs pt-1">
                <span class="text-yellow-600 font-mono font-medium">💡 Hint: ${chall.hint}</span>
                <button 
                  onclick="alert('💡 NANA SOLUTION:\\n${chall.solution.replace(/'/g, "\\'")}')" 
                  class="px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
                >
                  Verify Solution
                </button>
              </div>
            </div>
          </div>
        `).join('\n')}
      </div>
    </section>
  ` : '';

  // Quizzes with active Javascript built-in state for exported static layout!
  const quizJson = JSON.stringify(data.quizzes);
  const quizzesHtml = data.visibleSections.quizzes && data.quizzes.length > 0 ? `
    <section id="quizzes" class="py-12 border-t ${selectedTheme.border}">
      <h2 class="text-2xl font-bold mb-2 ${selectedTheme.textPrimary} ${selectedFont.headingClass}">Module Quiz Deck</h2>
      <p class="text-sm ${selectedTheme.textSecondary} mb-8">Test your knowledge with real-time feedback scores inside this guide.</p>
      
      <div id="quiz-standalone-app" class="p-6 rounded-2xl border ${selectedTheme.border} ${selectedTheme.cardBg} space-y-6 max-w-2xl mx-auto">
        <div id="quiz-intro" class="text-center py-6 space-y-4">
          <p class="text-sm ${selectedTheme.textSecondary}">Ready to test your comprehension of this material? (Contains ${data.quizzes.length} questions)</p>
          <button 
            onclick="startStandaloneQuiz()" 
            class="px-5 py-2.5 rounded-full text-xs font-bold transition-all transform active:scale-95 text-white"
            style="background-color: ${themeAccentHex};"
          >
            Start Quiz Run
          </button>
        </div>
        
        <div id="quiz-question-container" class="hidden space-y-5">
          <div class="flex justify-between items-center text-xs opacity-75 font-mono">
            <span id="quiz-progress-text">Question 1 of 3</span>
            <span id="quiz-score-text">Current Score: 0</span>
          </div>
          <div class="w-full bg-stone-200/50 rounded-full h-1.5 overflow-hidden">
            <div id="quiz-progress-bar" class="h-full bg-emerald-500" style="width: 0%"></div>
          </div>
          
          <h3 id="quiz-question-title" class="text-base font-bold ${selectedTheme.textPrimary}">Question text goes here?</h3>
          
          <div id="quiz-options-list" class="grid grid-cols-1 gap-2.5">
            <!-- Dynamic options -->
          </div>
          
          <div id="quiz-explanation-box" class="hidden p-4 rounded-xl border border-yellow-200 bg-yellow-50/50 text-xs text-yellow-800 leading-normal">
            <strong>NANA explanation:</strong> <span id="quiz-explanation-text"></span>
          </div>
          
          <div class="flex justify-end pt-2">
            <button 
              id="quiz-next-btn" 
              onclick="nextStandaloneQuestion()" 
              disabled 
              class="px-4 py-2 rounded-lg text-xs font-bold bg-stone-200 text-stone-400 cursor-not-allowed transition-all"
            >
              Continue →
            </button>
          </div>
        </div>
        
        <div id="quiz-results" class="hidden text-center py-8 space-y-4">
          <h3 class="text-xl font-bold text-emerald-600">Module Quiz Completed!</h3>
          <p class="text-sm ${selectedTheme.textSecondary}">You successfully answered <span id="quiz-correct-count" class="font-bold text-lg">0</span> out of <span class="font-bold">${data.quizzes.length}</span> correct.</p>
          <button 
            onclick="startStandaloneQuiz()" 
            class="px-4 py-2 rounded-lg text-xs font-bold border ${selectedTheme.border} ${selectedTheme.textPrimary}"
          >
            Retry Quiz Run
          </button>
        </div>
      </div>
    </section>
  ` : '';

  // About Track section
  const aboutHtml = data.visibleSections.about ? `
    <section id="about" class="py-12 border-t ${selectedTheme.border}">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-1 space-y-3">
          <h2 class="text-xl font-bold ${selectedTheme.textPrimary} ${selectedFont.headingClass}">About Track & Mentor</h2>
          ${data.profileImageUrl ? `
            <div class="w-32 h-32 rounded-2xl overflow-hidden border-2 ${selectedTheme.border} shadow-sm">
              <img src="${data.profileImageUrl}" alt="${data.mentorName}" class="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
            </div>
          ` : ''}
          <div>
            <p class="text-sm font-bold ${selectedTheme.textPrimary}">${data.mentorName}</p>
            <p class="text-xs ${selectedTheme.textSecondary}">${data.mentorTitle}</p>
          </div>
        </div>
        <div class="md:col-span-2 space-y-4 leading-relaxed text-sm ${selectedTheme.textSecondary} whitespace-pre-wrap">${data.aboutText}</div>
      </div>
    </section>
  ` : '';

  // Return full interactive index page
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.appName} | ${data.tagline}</title>
    
    <!-- Premium Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;500;600&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <!-- Tailwind CDN for responsive standalone styles -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              heading: ["Poppins", "sans-serif"],
              sans: ["Open Sans", "sans-serif"],
              mono: ["Geist Mono", "monospace"],
            }
          }
        }
      }
    </script>
    
    <style>
      :root {
        --accent-color: ${themeAccentHex};
        --accent-hover: ${themeAccentHoverHex};
      }
      html {
        scroll-behavior: smooth;
      }
      body {
        transition: background-color 0.3s ease;
      }
    </style>
  </head>
  <body class="${selectedTheme.bg} ${selectedTheme.textPrimary} min-h-screen ${selectedFont.bodyClass}">
    
    <!-- Responsive Header Bar -->
    <header class="sticky top-0 z-50 border-b ${selectedTheme.border} backdrop-blur-md bg-opacity-80" style="background-color: rgba(255, 255, 255, 0.85);">
      <div class="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
        <a href="#" class="text-base font-bold font-heading flex items-center gap-2">
          <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white font-mono flex items-center justify-center font-bold">N</span>
          <span>${data.appName}</span>
        </a>
        <nav class="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-wider opacity-85">
          ${data.visibleSections.syllabus ? `<a href="#syllabus" class="hover:text-emerald-600 transition-colors">Syllabus</a>` : ''}
          ${data.visibleSections.cheatsheets ? `<a href="#cheatsheets" class="hover:text-emerald-600 transition-colors">Cheat Sheets</a>` : ''}
          ${data.visibleSections.challenges ? `<a href="#challenges" class="hover:text-emerald-600 transition-colors">Terminals</a>` : ''}
          ${data.visibleSections.quizzes ? `<a href="#quizzes" class="hover:text-emerald-600 transition-colors">Quizzes</a>` : ''}
          ${data.visibleSections.about ? `<a href="#about" class="hover:text-emerald-600 transition-colors">About</a>` : ''}
        </nav>
        <a href="mailto:${data.email}" class="text-xs px-4 py-2 rounded-full font-bold transition-all duration-300 transform active:scale-95" style="background-color: var(--accent-color); color: ${selectedTheme.isDark ? '#0f1b1a' : '#ffffff'};">
          Join Track
        </a>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-6 py-12 md:py-20 space-y-16">
      
      <!-- Premium Hero Section -->
      <section class="py-8 space-y-6 text-center md:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${selectedTheme.border} ${selectedTheme.cardBg} text-xs font-mono font-medium text-emerald-600">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Standalone Study Companion Active
        </div>
        
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] ${selectedTheme.textPrimary} ${selectedFont.headingClass}">
          ${data.tagline}
        </h1>
        
        <p class="text-lg leading-relaxed ${selectedTheme.textSecondary} max-w-3xl">
          ${data.heroText}
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono opacity-60">Curriculum Lead:</span>
            <span class="text-xs font-bold">${data.mentorName}</span>
          </div>
          <span class="hidden sm:inline text-stone-300">•</span>
          <div class="flex items-center gap-3">
            ${socialLinksHtml}
          </div>
        </div>
      </section>

      <!-- Educational Content Section Elements -->
      ${syllabusHtml}
      ${cheatsheetsHtml}
      ${challengesHtml}
      ${quizzesHtml}
      ${aboutHtml}

    </main>

    <!-- Footer -->
    <footer class="border-t ${selectedTheme.border} py-12 bg-opacity-20" style="background-color: rgba(0,0,0,0.03);">
      <div class="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
        <p class="text-xs ${selectedTheme.textSecondary}">
          ${data.footerText}
        </p>
        <p class="text-xs font-mono opacity-60">
          Generated via NANA Learning Portal
        </p>
      </div>
    </footer>

    <!-- Interactive Standalone Javascript Quiz Script -->
    <script>
      const QUIZ_DECK = ${quizJson};
      let currentQuestionIndex = 0;
      let score = 0;
      let hasAnswered = false;

      function startStandaloneQuiz() {
        document.getElementById('quiz-intro').classList.add('hidden');
        document.getElementById('quiz-results').classList.add('hidden');
        document.getElementById('quiz-question-container').classList.remove('hidden');
        
        currentQuestionIndex = 0;
        score = 0;
        hasAnswered = false;
        
        loadQuestion();
      }

      function loadQuestion() {
        hasAnswered = false;
        const question = QUIZ_DECK[currentQuestionIndex];
        
        document.getElementById('quiz-progress-text').innerText = 'Question ' + (currentQuestionIndex + 1) + ' of ' + QUIZ_DECK.length;
        document.getElementById('quiz-score-text').innerText = 'Current Score: ' + score;
        document.getElementById('quiz-progress-bar').style.width = ((currentQuestionIndex / QUIZ_DECK.length) * 100) + '%';
        
        document.getElementById('quiz-question-title').innerText = question.question;
        document.getElementById('quiz-explanation-box').classList.add('hidden');
        
        const nextBtn = document.getElementById('quiz-next-btn');
        nextBtn.disabled = true;
        nextBtn.className = "px-4 py-2 rounded-lg text-xs font-bold bg-stone-200 text-stone-400 cursor-not-allowed transition-all";
        
        const optionsList = document.getElementById('quiz-options-list');
        optionsList.innerHTML = '';
        
        question.options.forEach((opt, idx) => {
          const btn = document.createElement('button');
          btn.innerText = opt;
          btn.className = "w-full text-left p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 text-xs font-medium hover:bg-stone-50 hover:border-stone-300 transition-all active:scale-[0.99]";
          btn.onclick = () => selectOption(idx, btn);
          optionsList.appendChild(btn);
        });
      }

      function selectOption(selectedIndex, btnElement) {
        if (hasAnswered) return;
        hasAnswered = true;
        
        const question = QUIZ_DECK[currentQuestionIndex];
        const optionsList = document.getElementById('quiz-options-list');
        const buttons = optionsList.getElementsByTagName('button');
        
        // Disable click on all options
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
          buttons[i].classList.remove('hover:bg-stone-50', 'active:scale-[0.99]');
          
          if (i === question.correctIndex) {
            buttons[i].className = "w-full text-left p-3.5 rounded-xl border border-emerald-500 bg-emerald-50 text-emerald-800 text-xs font-semibold transition-all";
          } else if (i === selectedIndex) {
            buttons[i].className = "w-full text-left p-3.5 rounded-xl border border-red-500 bg-red-50 text-red-800 text-xs font-semibold transition-all";
          } else {
            buttons[i].className = "w-full text-left p-3.5 rounded-xl border border-stone-200 bg-stone-100 opacity-60 text-xs text-stone-400 transition-all";
          }
        }
        
        if (selectedIndex === question.correctIndex) {
          score++;
          document.getElementById('quiz-score-text').innerText = 'Current Score: ' + score;
        }
        
        // Show explanation
        document.getElementById('quiz-explanation-text').innerText = question.explanation;
        document.getElementById('quiz-explanation-box').classList.remove('hidden');
        
        // Enable Next btn
        const nextBtn = document.getElementById('quiz-next-btn');
        nextBtn.disabled = false;
        nextBtn.className = "px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 cursor-pointer transition-all";
      }

      function nextStandaloneQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < QUIZ_DECK.length) {
          loadQuestion();
        } else {
          showQuizResults();
        }
      }

      function showQuizResults() {
        document.getElementById('quiz-question-container').classList.add('hidden');
        document.getElementById('quiz-results').classList.remove('hidden');
        document.getElementById('quiz-correct-count').innerText = score;
      }
    </script>
  </body>
</html>`;
}
