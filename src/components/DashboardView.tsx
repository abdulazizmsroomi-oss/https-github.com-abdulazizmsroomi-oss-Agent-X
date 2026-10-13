import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  ChevronRight, 
  Activity, 
  Radio, 
  Sparkles, 
  Zap, 
  RefreshCw,
  FileCheck,
  Lock, 
  Scan, 
  Sliders, 
  CheckCircle, 
  AlertTriangle, 
  Play, 
  Pause, 
  Cpu, 
  Fingerprint, 
  TrendingDown, 
  AlertCircle, 
  FileText, 
  Clock, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldAlert, 
  Flame, 
  Award,
  Users,
  Search,
  Plus,
  Eye,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Language, ControlItem, DocumentItem, BlockchainLedgerBlock } from '../types';
import { AgentXLogo } from './AgentXLogo';

interface DashboardViewProps {
  lang: Language;
  controls: ControlItem[];
  documents: DocumentItem[];
  ledger: BlockchainLedgerBlock[];
  onNavigateTab: (tab: string) => void;
  onSelectControl: (control: ControlItem) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  lang,
  controls,
  documents,
  ledger,
  onNavigateTab,
  onSelectControl
}) => {
  const isAr = lang === 'ar';

  // Real-time live update state
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [tickCount, setTickCount] = useState(1);
  const [riskTimeframe, setRiskTimeframe] = useState<'6M' | '1Y' | '2Y'>('6M');
  const [riskFilter, setRiskFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM'>('ALL');
  const [riskSearchQuery, setRiskSearchQuery] = useState('');
  
  // Real-time pings ticker
  useEffect(() => {
    if (!isLiveActive) return;
    const interval = setInterval(() => {
      setTickCount(c => c + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isLiveActive]);

  // Top risks list matching collage
  const topRisks = [
    {
      id: 'R-001',
      titleEn: 'Phishing Campaign',
      titleAr: 'حملة تصيد احتيالي بالهندسة الاجتماعية',
      category: 'Cybersecurity',
      level: 'High',
      score: 8.5,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/30'
    },
    {
      id: 'R-002',
      titleEn: 'Unpatched Systems',
      titleAr: 'أنظمة تشغيل وخوادم غير محدثة',
      category: 'Technology',
      level: 'High',
      score: 7.8,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/30'
    },
    {
      id: 'R-003',
      titleEn: 'Third-Party Access',
      titleAr: 'وصول موردين خارجيين دون عزل',
      category: 'Third Party',
      level: 'Medium',
      score: 6.2,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'R-004',
      titleEn: 'Data Leakage',
      titleAr: 'تسريب محتمل للبيانات الشخصية',
      category: 'Data Privacy',
      level: 'Medium',
      score: 5.9,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'R-005',
      titleEn: 'Insider Threat',
      titleAr: 'تهديد داخلي وسوء استخدام الصلاحيات',
      category: 'People',
      level: 'Low',
      score: 3.4,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30'
    }
  ];

  // 5 Specialized AI Agents from image 2
  const agenticWorkforce = [
    {
      id: 'ag-1',
      nameEn: 'GRC Orchestrator',
      nameAr: 'منسق الحوكمة والمخاطر',
      roleEn: 'Policy • Risk • Compliance',
      roleAr: 'السياسات • المخاطر • الالتزام',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
      status: 'Active'
    },
    {
      id: 'ag-2',
      nameEn: 'Risk Intelligence Agent',
      nameAr: 'وكيل استخبارات المخاطر',
      roleEn: 'Threats • Risk Analysis',
      roleAr: 'التهديدات • تحليل التعرض',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80',
      status: 'Active'
    },
    {
      id: 'ag-3',
      nameEn: 'Compliance Mapping Agent',
      nameAr: 'وكيل مطابقة الأطر',
      roleEn: 'Frameworks • Controls',
      roleAr: 'الأطر • الضوابط الموحدة',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80',
      status: 'Active'
    },
    {
      id: 'ag-4',
      nameEn: 'Control Testing Agent',
      nameAr: 'وكيل فحص الضوابط',
      roleEn: 'Validation • Evidence',
      roleAr: 'التحقق • الأدلة الفنية',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80',
      status: 'Active'
    },
    {
      id: 'ag-5',
      nameEn: 'Incident Response Agent',
      nameAr: 'وكيل الاستجابة للحوادث',
      roleEn: 'Detection • Response',
      roleAr: 'الكشف • الاحتواء الفوري',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80',
      status: 'Active'
    }
  ];

  // Recent activity items matching collage
  const recentActivities = [
    {
      id: 'act-1',
      titleEn: 'New risk identified',
      titleAr: 'رصد خطر جديد: حملة تصيد في المالية',
      descEn: 'Phishing Campaign - Finance',
      time: '2h ago',
      icon: AlertCircle,
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
    },
    {
      id: 'act-2',
      titleEn: 'Compliance assessment completed',
      titleAr: 'اكتمل تقييم الامتثال لضوابط الوصول',
      descEn: 'ISO 27001 - Access Control',
      time: '4h ago',
      icon: CheckCircle2,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 'act-3',
      titleEn: 'Policy updated',
      titleAr: 'تم تحديث واعتماد سياسة حماية البيانات',
      descEn: 'Data Protection Policy v2.3',
      time: '6h ago',
      icon: FileText,
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 'act-4',
      titleEn: 'Incident reported',
      titleAr: 'إبلاغ عن محاولة تسجيل دخول مشبوهة',
      descEn: 'Suspicious Login Attempt',
      time: '8h ago',
      icon: Lock,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    }
  ];

  // Upcoming tasks matching collage
  const upcomingTasks = [
    {
      id: 'tsk-1',
      titleEn: 'Complete control assessment',
      titleAr: 'استكمال تقييم الضابط A.5.1.1',
      ref: 'ISO 27001 - A.5.1.1',
      dueEn: 'Due in 2 days',
      dueAr: 'مستحق خلال يومين',
      color: 'text-blue-500'
    },
    {
      id: 'tsk-2',
      titleEn: 'Review risk treatment plan',
      titleAr: 'مراجعة خطة معالجة الخطر #R-1023',
      ref: 'Risk #R-1023',
      dueEn: 'Due in 3 days',
      dueAr: 'مستحق خلال ٣ أيام',
      color: 'text-amber-500'
    },
    {
      id: 'tsk-3',
      titleEn: 'Prepare audit evidence',
      titleAr: 'إعداد أدلة التدقيق لـ SOC 2',
      ref: 'SOC 2 - CC7.2',
      dueEn: 'Due in 5 days',
      dueAr: 'مستحق خلال ٥ أيام',
      color: 'text-purple-500'
    },
    {
      id: 'tsk-4',
      titleEn: 'Update risk register',
      titleAr: 'تحديث سجل المخاطر الربع سنوي',
      ref: 'Quarterly Review',
      dueEn: 'Due in 7 days',
      dueAr: 'مستحق خلال ٧ أيام',
      color: 'text-cyan-500'
    }
  ];

  // Framework coverage items matching collage
  const frameworkCoverage = [
    { name: 'ISO 27001', score: 96, color: '#00D2FF', offset: 4 },
    { name: 'NIST CSF', score: 92, color: '#00F5D4', offset: 8 },
    { name: 'GDPR / ECC', score: 88, color: '#A855F7', offset: 12 },
    { name: 'SOC 2', score: 94, color: '#38BDF8', offset: 6 }
  ];

  // Risk register items for the bottom table
  const riskRegisterData = [
    { id: 'R-001', title: 'Phishing Campaign', category: 'Cybersecurity', likelihood: 'High', impact: 'High', score: 8.5, status: 'Open' },
    { id: 'R-002', title: 'Unpatched Systems', category: 'Technology', likelihood: 'Medium', impact: 'High', score: 7.8, status: 'Open' },
    { id: 'R-003', title: 'Third-Party Access', category: 'Third Party', likelihood: 'Medium', impact: 'Medium', score: 6.2, status: 'In Progress' },
    { id: 'R-004', title: 'Data Leakage', category: 'Data Privacy', likelihood: 'Low', impact: 'High', score: 5.9, status: 'In Progress' },
    { id: 'R-005', title: 'Insider Threat', category: 'People', likelihood: 'Low', impact: 'Medium', score: 3.4, status: 'Closed' },
  ];

  return (
    <div className="space-y-6">
      
      {/* ============================================================== */}
      {/* 1. HERO SECTION (MATCHING COLLAGE & COMMAND CENTER SCREENSHOT) */}
      {/* ============================================================== */}
      <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs dark:shadow-2xl relative overflow-hidden transition-colors">
        
        {/* Background Subtle Gradient & Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          
          {/* Left Greeting & Tagline */}
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black border border-emerald-500/30 flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {isAr ? 'القوة الوكيلة متصلة لحظياً' : 'AGENTIC WORKFORCE ACTIVE'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-cyan-400 text-xs font-extrabold border border-blue-500/30">
                {isAr ? 'عزل شبكي سيادي تام' : '100% AIR-GAP ISOLATION'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span>{isAr ? 'صباح الخير، عبدالعزيز الرومي' : 'Good Morning, Abdulaziz Roomi'}</span>
              <span className="animate-pulse">👋</span>
            </h1>

            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {isAr 
                ? 'مركز قيادة الحوكمة والأمن السيبراني والالتزام الموحد لمنشأتك.'
                : 'Your GRC & Cybersecurity command center.'}
            </p>

            <p className="text-xs italic font-medium text-slate-400 dark:text-slate-400">
              &ldquo;Security is not a product, but a process.&rdquo;
            </p>
          </div>

          {/* Right Banner: Cyber Shield + Agentic Workforce Preview */}
          <div className="flex items-center gap-4 flex-wrap">
            
            {/* Cyber Shield with Padlock from Screenshot */}
            <div className="relative w-28 h-28 shrink-0 hidden sm:flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-cyan-400/30 dark:from-blue-600/40 dark:to-cyan-400/40 rounded-2xl blur-lg animate-pulse" />
              <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-600 dark:to-cyan-500 p-0.5 shadow-xl">
                <div className="w-full h-full rounded-[14px] bg-gradient-to-br from-blue-600 to-indigo-700 dark:bg-[#070D1F] flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute -inset-2 bg-gradient-to-b from-white/20 dark:from-cyan-400/20 to-transparent blur-xs pointer-events-none" />
                  <Lock className="w-9 h-9 text-white dark:text-cyan-400 mb-1 drop-shadow-md" />
                  <span className="text-[9px] font-black tracking-widest text-blue-100 dark:text-white uppercase">
                    SECURED
                  </span>
                </div>
              </div>
            </div>

            {/* Agentic Workforce Mini Avatars Stack */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070D1F] border border-slate-200 dark:border-[#1E2E59] shadow-sm flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
                  <span>{isAr ? 'القوة الوكيلة (٥ وكلاء متخصصين)' : 'Agentic Workforce'}</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {isAr ? '٥ نشط' : '5 Active'}
                </span>
              </div>

              <div className="flex items-center -space-x-2">
                {agenticWorkforce.map((ag) => (
                  <div key={ag.id} className="relative group/avatar cursor-pointer" title={`${ag.nameEn} (${ag.roleEn})`}>
                    <img 
                      src={ag.avatar} 
                      alt={ag.nameEn}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-[#070D1F] shadow-sm"
                    />
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-black" />
                  </div>
                ))}
              </div>

              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                {isAr ? 'تدقيق مستمر ودفاع سيادي معزول' : 'Autonomous multi-agent oversight'}
              </span>
            </div>

          </div>

        </div>

        {/* Specialized AI Agents Full Cards Row (as seen in command center) */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-[#18264C] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {agenticWorkforce.map((agent) => (
            <div 
              key={agent.id}
              onClick={() => onNavigateTab('assessments')}
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#0D1836] border border-slate-200/80 dark:border-[#1E2E59] hover:border-blue-500 dark:hover:border-cyan-400 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <img 
                    src={agent.avatar} 
                    alt={agent.nameEn}
                    className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-300 dark:ring-slate-700 group-hover:ring-blue-500 dark:group-hover:ring-cyan-400 transition-all"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-black" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {isAr ? agent.nameAr : agent.nameEn}
                  </h4>
                  <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                    {isAr ? agent.roleAr : agent.roleEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. FOUR CIRCULAR RADIAL METER KPI CARDS (FROM SCREENSHOT)       */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Overall Compliance */}
        <div className="rounded-2xl p-5 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex items-center justify-between transition-all hover:scale-[1.01]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {isAr ? 'الامتثال الكلي' : 'Overall Compliance'}
              </h3>
            </div>
            
            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                92%
              </span>
              <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>↑</span>
                <span>+4%</span>
              </span>
            </div>

            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {isAr ? 'مقارنة بالربع السابق' : 'vs. last quarter'}
            </p>
          </div>

          {/* Radial Donut Ring */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="3.5" />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#00D2FF"
                strokeWidth="3.5"
                strokeDasharray="92, 100"
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-900 dark:text-cyan-300">
              92%
            </span>
          </div>
        </div>

        {/* Card 2: Open Risks */}
        <div className="rounded-2xl p-5 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex items-center justify-between transition-all hover:scale-[1.01]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {isAr ? 'المخاطر المفتوحة' : 'Open Risks'}
              </h3>
            </div>
            
            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                7
              </span>
              <span className="text-[11px] font-black text-orange-600 dark:text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>↓</span>
                <span>-2</span>
              </span>
            </div>

            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {isAr ? 'مقارنة بالشهر السابق' : 'vs. last month'}
            </p>
          </div>

          {/* Radial Donut Ring */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="3.5" />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#FF6B00"
                strokeWidth="3.5"
                strokeDasharray="70, 100"
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-900 dark:text-orange-400">
              7
            </span>
          </div>
        </div>

        {/* Card 3: Active Incidents */}
        <div className="rounded-2xl p-5 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex items-center justify-between transition-all hover:scale-[1.01]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-purple-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {isAr ? 'الحوادث النشطة' : 'Active Incidents'}
              </h3>
            </div>
            
            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                2
              </span>
              <span className="text-[11px] font-black text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>↓</span>
                <span>-1</span>
              </span>
            </div>

            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {isAr ? 'خلال ٧ أيام الماضية' : 'vs. last 7 days'}
            </p>
          </div>

          {/* Radial Donut Ring */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="3.5" />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#A855F7"
                strokeWidth="3.5"
                strokeDasharray="40, 100"
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-900 dark:text-purple-300">
              2
            </span>
          </div>
        </div>

        {/* Card 4: Policy Compliance */}
        <div className="rounded-2xl p-5 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex items-center justify-between transition-all hover:scale-[1.01]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-blue-500" />
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                {isAr ? 'امتثال السياسات' : 'Policy Compliance'}
              </h3>
            </div>
            
            <div className="pt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                89%
              </span>
              <span className="text-[11px] font-black text-blue-600 dark:text-cyan-400 bg-blue-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>↑</span>
                <span>+6%</span>
              </span>
            </div>

            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {isAr ? 'مقارنة بالربع السابق' : 'vs. last quarter'}
            </p>
          </div>

          {/* Radial Donut Ring */}
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
              <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="3.5" />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeDasharray="89, 100"
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <span className="absolute text-xs font-black text-slate-900 dark:text-blue-300">
              89%
            </span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 3. MIDDLE THREE COLUMNS: COMPLIANCE DONUT + RISK TREND + TOP RISKS */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1: Compliance by Framework (Donut + Legend) */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#18264C] mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isAr ? 'الامتثال حسب الإطار' : 'Compliance by Framework'}
              </h3>
              <button 
                onClick={() => onNavigateTab('compliance')}
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'عرض التفاصيل' : 'View Details'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Segmented Donut representation */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg viewBox="0 0 36 36" className="w-36 h-36 -rotate-90">
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="4" />
                  {/* Segment 1: ISO 27001 (Cyan) */}
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#00D2FF" strokeWidth="4" strokeDasharray="30, 100" strokeDashoffset="0" />
                  {/* Segment 2: NIST CSF (Blue) */}
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#2563EB" strokeWidth="4" strokeDasharray="25, 100" strokeDashoffset="-30" />
                  {/* Segment 3: GDPR/ECC (Purple) */}
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#A855F7" strokeWidth="4" strokeDasharray="20, 100" strokeDashoffset="-55" />
                  {/* Segment 4: SOC 2 (Orange) */}
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#F59E0B" strokeWidth="4" strokeDasharray="17, 100" strokeDashoffset="-75" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                    92%
                  </span>
                  <span className="block text-[10px] font-extrabold text-blue-600 dark:text-cyan-400 uppercase">
                    Overall
                  </span>
                </div>
              </div>

              {/* Legend matching screenshot */}
              <div className="w-full space-y-2 mt-4 text-xs font-bold">
                {[
                  { name: 'ISO 27001', score: '96%', color: 'bg-cyan-500' },
                  { name: 'NIST CSF', score: '92%', color: 'bg-blue-600' },
                  { name: 'GDPR / ECC', score: '88%', color: 'bg-purple-500' },
                  { name: 'SOC 2', score: '94%', color: 'bg-amber-500' },
                  { name: 'Other', score: '90%', color: 'bg-slate-400' },
                ].map(item => (
                  <div key={item.name} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-[#0D1836] transition-colors">
                    <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                      <span>{item.name}</span>
                    </span>
                    <span className="font-mono text-slate-900 dark:text-white font-black">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Col 2: Risk Trend (Spline Chart) */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#18264C] mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isAr ? 'اتجاه المخاطر' : 'Risk Trend'}
              </h3>
              
              {/* Timeframe filters matching screenshot */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#0D1836] p-1 rounded-lg">
                {(['6M', '1Y', '2Y'] as const).map(tf => (
                  <button
                    key={tf}
                    onClick={() => setRiskTimeframe(tf)}
                    className={`px-2 py-0.5 rounded text-[10px] font-black transition-colors ${
                      riskTimeframe === tf 
                        ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs' 
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend: High, Medium, Low */}
            <div className="flex items-center gap-4 text-xs font-bold mb-3">
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>High</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Medium</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Low</span>
              </span>
            </div>

            {/* SVG Multi-line chart matching screenshot */}
            <div className="py-2">
              <svg viewBox="0 0 300 120" className="w-full h-36 overflow-visible">
                {/* Horizontal grid lines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="300" y2="80" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" strokeDasharray="3 3" />

                {/* Line 1: High Risks (Rose/Red) */}
                <path
                  d="M 10 70 Q 60 75 110 60 T 210 40 T 290 28"
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="70" r="3.5" fill="#F43F5E" />
                <circle cx="110" cy="60" r="3.5" fill="#F43F5E" />
                <circle cx="210" cy="40" r="3.5" fill="#F43F5E" />
                <circle cx="290" cy="28" r="4.5" fill="#F43F5E" />

                {/* Line 2: Medium Risks (Amber/Orange) */}
                <path
                  d="M 10 90 Q 60 85 110 75 T 210 65 T 290 55"
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="90" r="3" fill="#F59E0B" />
                <circle cx="110" cy="75" r="3" fill="#F59E0B" />
                <circle cx="210" cy="65" r="3" fill="#F59E0B" />
                <circle cx="290" cy="55" r="3.5" fill="#F59E0B" />

                {/* Line 3: Low Risks (Cyan/Emerald) */}
                <path
                  d="M 10 105 Q 60 100 110 95 T 210 88 T 290 80"
                  fill="none"
                  stroke="#00D2FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="10" cy="105" r="3" fill="#00D2FF" />
                <circle cx="110" cy="95" r="3" fill="#00D2FF" />
                <circle cx="210" cy="88" r="3" fill="#00D2FF" />
                <circle cx="290" cy="80" r="3.5" fill="#00D2FF" />
              </svg>

              {/* Month Labels */}
              <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 mt-2 px-1">
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Top Risks List matching screenshot */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#18264C] mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isAr ? 'أبرز المخاطر' : 'Top Risks'}
              </h3>
              <button
                onClick={() => onNavigateTab('risk_management')}
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'عرض الكل' : 'View All'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {topRisks.map((risk) => (
                <div 
                  key={risk.id}
                  onClick={() => onNavigateTab('risk_management')}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-[#14234C] hover:border-blue-500 dark:hover:border-cyan-400 bg-slate-50/50 dark:bg-[#0D1836] cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                      <ShieldAlert className="w-3.5 h-3.5" />
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {isAr ? risk.titleAr : risk.titleEn}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {risk.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${risk.color}`}>
                      {risk.level}
                    </span>
                    <span className="font-mono text-xs font-black text-slate-900 dark:text-white">
                      {risk.score}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 4. THIRD ROW: RECENT ACTIVITY + UPCOMING TASKS + FRAMEWORK RINGS */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#18264C] mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isAr ? 'النشاط الأخير' : 'Recent Activity'}
              </h3>
              <button 
                onClick={() => onNavigateTab('audit_findings')}
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'عرض الكل' : 'View All'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recentActivities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-[#0D1836] transition-colors">
                    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${act.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {isAr ? act.titleAr : act.titleEn}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">
                          {act.time}
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                        {act.descEn}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#18264C] mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isAr ? 'المهام القادمة' : 'Upcoming Tasks'}
              </h3>
              <button 
                onClick={() => onNavigateTab('controls')}
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'عرض الكل' : 'View All'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => onNavigateTab('controls')}
                  className="p-3 rounded-xl border border-slate-100 dark:border-[#14234C] hover:border-blue-500 dark:hover:border-cyan-400 bg-slate-50/50 dark:bg-[#0D1836] cursor-pointer transition-all space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {isAr ? task.titleAr : task.titleEn}
                    </h4>
                    <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-400 font-bold shrink-0">
                      {isAr ? task.dueAr : task.dueEn}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {task.ref}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Framework Coverage (4 Radial Rings) */}
        <div className="rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#18264C] mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isAr ? 'تغطية الأطر التنظيمية' : 'Framework Coverage'}
              </h3>
              <button 
                onClick={() => onNavigateTab('compliance')}
                className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'عرض الكل' : 'View Details'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2">
              {frameworkCoverage.map((fw) => (
                <div 
                  key={fw.name}
                  onClick={() => onNavigateTab('compliance')}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50/50 dark:bg-[#0D1836] border border-slate-100 dark:border-[#14234C] hover:border-blue-500 dark:hover:border-cyan-400 cursor-pointer transition-all"
                >
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="3.5" />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke={fw.color}
                        strokeWidth="3.5"
                        strokeDasharray={`${fw.score}, 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-[11px] font-black text-slate-900 dark:text-white tabular-nums">
                      {fw.score}%
                    </span>
                  </div>
                  <span className="text-xs font-black text-slate-800 dark:text-slate-200 mt-2">
                    {fw.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {fw.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 5. FOURTH ROW: RISK REGISTER TABLE & GRC CAPABILITY SHOWCASE   */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk Register Table (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-[#18264C] mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {isAr ? 'سجل المخاطر المؤسسي' : 'Risk Register'}
                </h3>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {isAr ? 'إدارة وتتبع ومعالجة المخاطر على مستوى المنشأة.' : 'Manage, track and mitigate risks across your organization.'}
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('risk_management')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{isAr ? 'إضافة خطر' : 'Add Risk'}</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-[#18264C] text-[10px] font-black uppercase text-slate-400">
                    <th className="pb-2.5">ID</th>
                    <th className="pb-2.5">Risk Title</th>
                    <th className="pb-2.5">Category</th>
                    <th className="pb-2.5">Likelihood</th>
                    <th className="pb-2.5">Impact</th>
                    <th className="pb-2.5">Score</th>
                    <th className="pb-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#18264C] font-semibold text-slate-700 dark:text-slate-300">
                  {riskRegisterData.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-[#0D1836] transition-colors">
                      <td className="py-2.5 font-mono text-slate-400">{row.id}</td>
                      <td className="py-2.5 font-bold text-slate-900 dark:text-white">{row.title}</td>
                      <td className="py-2.5 text-slate-500 dark:text-slate-400">{row.category}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.likelihood === 'High' ? 'bg-rose-500/10 text-rose-500' :
                          row.likelihood === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-emerald-500/10 text-emerald-500'
                        }`}>
                          {row.likelihood}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.impact === 'High' ? 'bg-rose-500/10 text-rose-500' :
                          row.impact === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-emerald-500/10 text-emerald-500'
                        }`}>
                          {row.impact}
                        </span>
                      </td>
                      <td className="py-2.5 font-mono font-bold text-slate-900 dark:text-white">{row.score}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          row.status === 'Open' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                          row.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* GRC & Cybersecurity Feature Showcase Card matching screenshot */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-blue-900/40 via-[#0B132B] to-[#060B18] border border-blue-500/30 shadow-xl flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-full border border-cyan-400/30">
              Autonomous Sovereign Enclave
            </span>

            <h3 className="text-xl font-black text-white leading-tight">
              GRC & Cybersecurity
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Unified. Intelligent. Compliant. Agent X brings together AI-powered agents, real-time insights and automation to simplify your GRC and cybersecurity operations.
            </p>

            <div className="space-y-2 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero dependency on third-party public clouds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dual English & Arabic interface with human voices</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Immutable 256-bit cryptographic signature chain</span>
              </div>
            </div>
          </div>

          <div className="pt-6 relative z-10">
            <button
              onClick={() => onNavigateTab('assessments')}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
            >
              <span>{isAr ? 'استكشاف إمكانيات المنظومة' : 'Explore Capabilities'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 6. REAL-TIME SOVEREIGN TELEMETRY STREAM TICKER                  */}
      {/* ============================================================== */}
      <div className="rounded-2xl p-4 sm:p-5 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-black text-slate-900 dark:text-white">
              {isAr ? 'شريط الرصد اللحظي المباشر' : 'Live Autonomous Agent Telemetry'}
            </h4>
            <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {isAr ? `تمت معالجة ${tickCount} إشارة أمنية داخل البيئة المعزولة دون أي تسريب خارجي.` : `${tickCount} heartbeats verified across air-gapped security enclaves.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsLiveActive(!isLiveActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-black flex items-center gap-1.5 transition-colors ${
              isLiveActive
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
            }`}
          >
            {isLiveActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isLiveActive ? 'LIVE' : 'PAUSED'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
