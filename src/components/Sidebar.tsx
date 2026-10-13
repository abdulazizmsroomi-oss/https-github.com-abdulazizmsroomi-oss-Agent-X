import React from 'react';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  Flame, 
  ClipboardCheck, 
  FileCheck, 
  FileText, 
  BarChart3, 
  Settings,
  X as CloseIcon,
  ChevronRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { AgentXLogo } from './AgentXLogo';
import { SidebarGraffitiX } from './SidebarGraffitiX';

export interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  theme: ThemeMode;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  theme,
  isOpenMobile,
  onCloseMobile
}) => {
  const isAr = lang === 'ar';
  const isDark = theme === 'dark';

  const menuItems = [
    {
      id: 'dashboard',
      labelEn: 'Dashboard',
      labelAr: 'لوحة القيادة',
      icon: LayoutDashboard,
      badge: isAr ? 'مباشر' : 'Live'
    },
    {
      id: 'risk_management',
      labelEn: 'Risk Management',
      labelAr: 'إدارة المخاطر',
      icon: AlertTriangle,
      count: 7
    },
    {
      id: 'compliance',
      labelEn: 'Compliance',
      labelAr: 'الامتثال والأطر',
      icon: ShieldCheck,
      count: 10
    },
    {
      id: 'controls',
      labelEn: 'Controls',
      labelAr: 'الضوابط والتدقيق',
      icon: Sliders
    },
    {
      id: 'incidents',
      labelEn: 'Incidents',
      labelAr: 'إدارة الحوادث',
      icon: Flame,
      count: 2
    },
    {
      id: 'assessments',
      labelEn: 'Assessments',
      labelAr: 'التقييمات والمجلس الاستشاري',
      icon: ClipboardCheck
    },
    {
      id: 'audit_findings',
      labelEn: 'Audit & Findings',
      labelAr: 'التدقيق واعتمادات البلوكتشين',
      icon: FileCheck
    },
    {
      id: 'policies',
      labelEn: 'Policies & Procedures',
      labelAr: 'السياسات والإجراءات',
      icon: FileText
    },
    {
      id: 'reports',
      labelEn: 'Reports',
      labelAr: 'التقارير والتحليل الجذري',
      icon: BarChart3
    },
    {
      id: 'configuration',
      labelEn: 'Configuration',
      labelAr: 'الإعدادات والبيئة المعزولة',
      icon: Settings
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 z-50 lg:static
        w-64 xl:w-72 shrink-0 flex flex-col justify-between
        transition-all duration-300 ease-in-out
        ${isOpenMobile ? (isAr ? 'right-0' : 'left-0') : (isAr ? '-right-72 lg:right-0' : '-left-72 lg:left-0')}
        bg-white dark:bg-[#080F23]
        border-r border-slate-200 dark:border-[#141E38]
        shadow-xl lg:shadow-none
        select-none overflow-y-auto
      `}>
        
        {/* Top Header & Logo */}
        <div>
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 dark:border-[#141E38]">
            <button 
              onClick={() => {
                setCurrentTab('dashboard');
                if (isOpenMobile) onCloseMobile();
              }}
              className="text-left focus:outline-hidden group"
              title="Agent X GRC Platform"
            >
              <AgentXLogo size="md" showSubtitle={true} showTagline={false} />
            </button>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white lg:hidden"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id);
                    if (isOpenMobile) onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all group
                    ${isActive
                      ? 'bg-blue-50 dark:bg-blue-600 text-blue-600 dark:text-white font-black shadow-xs dark:shadow-md dark:shadow-blue-600/30'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0D1836] hover:text-slate-900 dark:hover:text-white font-bold'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-blue-600 dark:text-white' : 'text-slate-400 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400'
                    }`} />
                    <span className="tracking-tight">{isAr ? item.labelAr : item.labelEn}</span>
                  </div>

                  {/* Badge / Count */}
                  {item.count !== undefined && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-blue-100 dark:bg-white/20 text-blue-700 dark:text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {item.count}
                    </span>
                  )}
                  {item.badge && (
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                      isActive
                        ? 'bg-cyan-400 text-black'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Tagline & Splashed Graffiti X Card (matching collage) */}
        <div className="p-4 mt-auto border-t border-slate-100 dark:border-[#141E38] space-y-3">
          <div className="text-center">
            <p className="text-[11px] font-black tracking-wide text-slate-900 dark:text-slate-200">
              {isAr ? 'حوكمة أذكى. أمن أقوى. ثقة أعظم.' : 'Smarter Governance.'}
            </p>
            <p className="text-[11px] font-black tracking-wide text-blue-600 dark:text-cyan-400">
              {isAr ? '' : 'Stronger Security. Greater Confidence.'}
            </p>
          </div>

          {/* Large Vibrant Splashed Graffiti X */}
          <div className="flex justify-center py-1">
            <SidebarGraffitiX size={130} />
          </div>

          {/* Powered by Banner */}
          <div className="rounded-xl p-2.5 bg-slate-100/80 dark:bg-[#0B142E] border border-slate-200/80 dark:border-[#1A264D] flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-extrabold text-slate-700 dark:text-slate-300">
                {isAr ? 'معزول شبكياً بنسبة ١٠٠٪' : 'Air-Gap Enclave'}
              </span>
            </div>
            <span className="font-mono text-slate-500 dark:text-slate-400 font-bold">
              v2.5
            </span>
          </div>
        </div>

      </aside>
    </>
  );
};
