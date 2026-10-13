import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Settings, 
  Menu, 
  Mic, 
  Globe, 
  Download, 
  ShieldCheck, 
  Lock, 
  Check, 
  AlertCircle
} from 'lucide-react';
import { Language, ThemeMode } from '../types';

export interface TopHeaderProps {
  onToggleSidebarMobile: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  onOpenVoiceModal: () => void;
  isListening: boolean;
  onExportAirgap: () => void;
  onNavigateTab: (tab: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onToggleSidebarMobile,
  lang,
  setLang,
  theme,
  setTheme,
  onOpenVoiceModal,
  isListening,
  onExportAirgap,
  onNavigateTab
}) => {
  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState('');

  // Live formatted Date & Time matching "Tue, Apr 29, 2025 | 09:42 AM"
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      };
      const datePart = now.toLocaleDateString(isAr ? 'ar-SA' : 'en-US', options);
      const timePart = now.toLocaleTimeString(isAr ? 'ar-SA' : 'en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true 
      });
      setCurrentDateTime(`${datePart} | ${timePart}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [isAr]);

  const notifications = [
    {
      id: 'n1',
      title: isAr ? 'تم رصد ثغرة تصيد احتيالي' : 'New risk identified: Phishing Campaign',
      time: '2h ago',
      type: 'risk',
      unread: true
    },
    {
      id: 'n2',
      title: isAr ? 'اكتمل تدقيق آيزو 27001' : 'Compliance assessment completed: ISO 27001',
      time: '4h ago',
      type: 'compliance',
      unread: true
    },
    {
      id: 'n3',
      title: isAr ? 'تم تحديث سياسة حماية البيانات' : 'Policy updated: Data Protection Policy v2.3',
      time: '6h ago',
      type: 'policy',
      unread: false
    }
  ];

  return (
    <header className="sticky top-0 z-30 w-full h-18 bg-white dark:bg-[#080F23] border-b border-slate-200 dark:border-[#141E38] transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Toggle & Global Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onToggleSidebarMobile}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0D1836] lg:hidden"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search Input matching screenshot */}
          <div className="relative w-full">
            <Search className={`w-4 h-4 text-slate-400 absolute top-1/2 -translate-y-1/2 ${isAr ? 'right-3.5' : 'left-3.5'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'البحث في المخاطر، الضوابط، الأصول، أو الأطر التنظيمية...' : 'Search risks, controls, assets, or frameworks...'}
              className={`
                w-full text-xs font-semibold rounded-xl
                bg-slate-50 dark:bg-[#0D1836]
                text-slate-900 dark:text-slate-100
                placeholder-slate-400 dark:placeholder-slate-500
                border border-slate-200 dark:border-[#1B2749]
                focus:border-blue-500 dark:focus:border-cyan-400
                focus:bg-white dark:focus:bg-[#0B142E]
                py-2.5 transition-all outline-hidden
                ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'}
              `}
            />
          </div>
        </div>

        {/* Right: Date Time, Actions & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Live Date & Time from screenshot */}
          <div className="hidden xl:flex flex-col text-right font-mono text-[11px] font-bold text-slate-500 dark:text-slate-400 pr-2">
            <span>{currentDateTime}</span>
          </div>

          {/* Prominent Theme Switcher Segmented Pill (Light / Dark) */}
          <div className="flex items-center p-1 rounded-xl border border-slate-200 dark:border-[#1B2749] bg-slate-100 dark:bg-[#0D1836]">
            <button
              onClick={() => setTheme('light')}
              title="Activate Light Mode"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                !isDark 
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/80' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>{isAr ? 'فاتح' : 'Light'}</span>
            </button>
            <button
              onClick={() => setTheme('dark')}
              title="Activate Dark Mode"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                isDark 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-cyan-300" />
              <span>{isAr ? 'داكن' : 'Dark'}</span>
            </button>
          </div>

          {/* Voice Assistant Navigation */}
          <button
            onClick={onOpenVoiceModal}
            title={isAr ? 'الملاحة الصوتية الذكية' : 'Voice-Enabled AI Navigation'}
            className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 ${
              isListening
                ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                : 'border-slate-200 dark:border-[#1B2749] bg-slate-50 dark:bg-[#0D1836] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14234C]'
            }`}
          >
            <Mic className={`w-4 h-4 ${isListening ? 'text-white' : 'text-blue-500 dark:text-cyan-400'}`} />
          </button>

          {/* Language Toggle (EN / AR) */}
          <button
            onClick={() => setLang(isAr ? 'en' : 'ar')}
            title="Switch Language"
            className="px-2.5 py-2 rounded-xl border border-slate-200 dark:border-[#1B2749] bg-slate-50 dark:bg-[#0D1836] text-xs font-black text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14234C] transition-colors"
          >
            {isAr ? 'English' : 'العربية'}
          </button>

          {/* Notification Bell with Badge '3' */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1B2749] bg-slate-50 dark:bg-[#0D1836] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14234C] transition-colors relative"
            >
              <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center font-mono shadow-xs">
                3
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className={`absolute top-12 ${isAr ? 'left-0' : 'right-0'} w-80 rounded-2xl bg-white dark:bg-[#0D1836] border border-slate-200 dark:border-[#1B2749] shadow-2xl p-3 space-y-2 z-50`}>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#1A264D]">
                  <span className="text-xs font-black text-slate-900 dark:text-white">
                    {isAr ? 'الإشعارات الحية' : 'Live Notifications'}
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-cyan-400 font-bold">
                    3 {isAr ? 'جديدة' : 'New'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {notifications.map(n => (
                    <div 
                      key={n.id}
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigateTab('approvals');
                      }}
                      className="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#121F45] cursor-pointer transition-colors space-y-1"
                    >
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                        {n.title}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings Button */}
          <button
            onClick={() => onNavigateTab('configuration')}
            title={isAr ? 'الإعدادات' : 'Configuration'}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-[#1B2749] bg-slate-50 dark:bg-[#0D1836] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14234C] transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </button>

          {/* User Profile Badge (Abdulaziz Roomi | GRC Administrator) matching screenshot */}
          <div 
            onClick={() => onNavigateTab('configuration')}
            className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-slate-200 dark:border-[#141E38] cursor-pointer group"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Abdulaziz Roomi"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/40 dark:ring-cyan-400/40 shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#080F23]" />
            </div>

            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                {isAr ? 'عبدالعزيز الرومي' : 'Abdulaziz Roomi'}
              </span>
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 leading-tight">
                {isAr ? 'مسؤول الحوكمة (GRC)' : 'GRC Administrator'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
