import React from 'react';
import { 
  Mic, 
  Globe, 
  Download, 
  Volume2,
  Moon,
  Sun,
  Bell,
  Search
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { AgentXLogo } from './AgentXLogo';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isListening: boolean;
  toggleVoiceListening: () => void;
  isSpeaking: boolean;
  onOpenVoiceModal: () => void;
  onExportAirgap: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  theme,
  setTheme,
  isListening,
  toggleVoiceListening,
  isSpeaking,
  onOpenVoiceModal,
  onExportAirgap
}) => {
  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  const navItems = [
    { id: 'dashboard', labelEn: 'Dashboard', labelAr: 'لوحة القيادة' },
    { id: 'dual_brain', labelEn: 'Dual Brain & Board', labelAr: 'الدماغ الثنائي والمجلس' },
    { id: 'frameworks', labelEn: 'Frameworks & Controls', labelAr: 'الأطر والضوابط' },
    { id: 'risk_matrix', labelEn: 'Risk Matrix', labelAr: 'مصفوفة المخاطر' },
    { id: 'documents', labelEn: 'Document Studio', labelAr: 'استوديو الوثائق' },
    { id: 'approvals', labelEn: 'Human Approvals', labelAr: 'الاعتماد البشري' },
    { id: 'root_cause', labelEn: 'Root-Cause Tools', labelAr: 'أدوات التحليل الجذري' },
    { id: 'admin', labelEn: 'Admin Portal', labelAr: 'البوابة الإدارية' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-teal-500 dark:border-teal-500/80 bg-white dark:bg-[#070d19] shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3">
        
        {/* Zone 1: Authentic Graffiti Tag Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-2 text-left focus:outline-none rounded-md group"
            title="Agent X Sovereign GRC"
          >
            <AgentXLogo size="sm" showSubtitle={true} showTagline={false} />
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`px-3 py-1.5 text-xs rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-black shadow-md border-2 border-cyan-400'
                    : 'text-neutral-900 dark:text-slate-300 font-bold hover:text-black dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-slate-800/60 border-2 border-transparent'
                }`}
              >
                {isAr ? item.labelAr : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Action Controls & User Profile */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Theme Toggle (Dark / Light) */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            title={isDark ? 'Switch to Light Mode' : 'التحويل للوضع الداكن المضيء (Dark Neon)'}
            className="p-2 rounded-lg border-2 border-teal-400 dark:border-cyan-400 bg-white dark:bg-[#0e172a] text-neutral-900 dark:text-cyan-300 hover:bg-teal-50 dark:hover:bg-slate-800 transition-colors shadow-xs"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-purple-700" />}
          </button>

          {/* Voice Assistant / Speak Mode Button */}
          <button
            onClick={onOpenVoiceModal}
            title={isAr ? 'التحدث مع القوة الوكيلة بالصوت' : 'Voice Navigation & Agent Dialogue'}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border-2 transition-all ${
              isSpeaking
                ? 'bg-amber-100 text-amber-950 border-amber-400 animate-pulse'
                : isListening
                ? 'bg-red-50 text-red-950 border-red-400'
                : 'bg-white dark:bg-[#0e172a] text-neutral-950 dark:text-slate-100 border-teal-500 dark:border-teal-400 hover:bg-emerald-50 dark:hover:bg-slate-800 shadow-xs'
            }`}
          >
            {isSpeaking ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-900" />
            ) : isListening ? (
              <Mic className="w-3.5 h-3.5 text-red-600 animate-bounce" />
            ) : (
              <Mic className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
            )}
            <span className="hidden sm:inline font-bold">
              {isSpeaking 
                ? (isAr ? 'يتحدث...' : 'Speaking...') 
                : isListening 
                ? (isAr ? 'استماع...' : 'Listening...') 
                : (isAr ? 'صوت' : 'Voice')}
            </span>
          </button>

          {/* Air-Gap Export */}
          <button
            onClick={onExportAirgap}
            title={isAr ? 'تصدير حزمة البيئة المعزولة' : 'Download Air-Gap Sovereign Package'}
            className="p-1.5 text-neutral-900 dark:text-slate-200 hover:text-black dark:hover:text-white hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg border-2 border-teal-400 dark:border-cyan-400 transition-colors bg-white dark:bg-[#0e172a] shadow-xs"
          >
            <Download className="w-4 h-4 text-teal-700 dark:text-cyan-400" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            title={isAr ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-black text-neutral-950 dark:text-slate-100 bg-white dark:bg-[#0e172a] border-2 border-teal-500 dark:border-cyan-400 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
            <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* User Profile Pill matching uploaded dashboard screenshot */}
          <div className="hidden sm:flex items-center gap-2 pl-1 border-l-2 border-teal-200 dark:border-slate-700">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-sm">
              AR
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-black text-neutral-900 dark:text-slate-100 leading-tight">
                Abdulaziz Roomi
              </div>
              <div className="text-[10px] font-bold text-teal-700 dark:text-cyan-400 leading-tight">
                GRC Administrator
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile nav subrow */}
      <div className="xl:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2 border-t-2 border-teal-200 dark:border-slate-800 bg-emerald-50/50 dark:bg-[#0a1122]">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`px-2.5 py-1 text-xs font-bold rounded-md whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-2 border-cyan-400'
                  : 'text-neutral-900 dark:text-slate-300 hover:text-black dark:hover:text-white border border-teal-200 dark:border-slate-700 bg-white dark:bg-[#0e172a]'
              }`}
            >
              {isAr ? item.labelAr : item.labelEn}
            </button>
          );
        })}
      </div>
    </header>
  );
};
