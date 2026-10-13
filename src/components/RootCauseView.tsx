import React, { useState } from 'react';
import { 
  GitBranch, 
  AlertCircle, 
  Bell, 
  CheckCircle2, 
} from 'lucide-react';
import { Language, RootCauseToolState, EscalationRule } from '../types';
import { INITIAL_ROOT_CAUSE_STATE, INITIAL_ESCALATION_RULES } from '../data/mockDefaults';

interface RootCauseViewProps {
  lang: Language;
}

export const RootCauseView: React.FC<RootCauseViewProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [activeSubTab, setActiveSubTab] = useState<'pestle' | 'fishbone' | 'five_whys' | 'escalations'>('pestle');
  const [rootState] = useState<RootCauseToolState>(INITIAL_ROOT_CAUSE_STATE);
  const [escalationRules] = useState<EscalationRule[]>(INITIAL_ESCALATION_RULES);
  const [testNotificationStatus, setTestNotificationStatus] = useState<string | null>(null);

  // Trigger simulated notification
  const handleTriggerSimulatedAlert = (rule: EscalationRule) => {
    const channels = rule.channels.join(', ').toUpperCase();
    setTestNotificationStatus(
      isAr 
        ? `تم إرسال إشعار تصعيدي فوري لقنوات: ${channels} بنجاح!` 
        : `Simulated broadcast dispatched to [${channels}] via Active Directory & WhatsApp Business API!`
    );
    setTimeout(() => setTestNotificationStatus(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
              <span className="text-xs font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                {isAr ? 'أدوات التحليل الاستراتيجي والسبب الجذري' : 'Strategic Root-Cause & Diagnostics Suite'}
              </span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-neutral-950 dark:text-white mt-2">
              {isAr ? 'تحليل PESTLE، عظم السمكة (Ishikawa)، وخمسة أسباب (5-Whys)' : 'PESTLE, Ishikawa Fishbone & 5-Whys Analysis'}
            </h1>
            <p className="text-xs font-semibold text-neutral-700 dark:text-slate-300 mt-0.5">
              {isAr 
                ? 'تشخيص معمق للدوافع الاستراتيجية ومعالجة جذور الانحرافات وإدارة قنوات التصعيد (Active Directory، البريد، وواتساب).'
                : 'Advanced diagnostic root-cause modeling, strategic environmental evaluation, and SLA escalation management.'}
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex items-center gap-1.5 bg-teal-50/50 dark:bg-slate-900 p-1 rounded-lg border-2 border-teal-300 dark:border-teal-500/50">
            <button
              onClick={() => setActiveSubTab('pestle')}
              className={`px-3 py-1.5 text-xs font-black rounded-md transition-colors ${
                activeSubTab === 'pestle'
                  ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black shadow-xs border border-teal-400'
                  : 'text-neutral-800 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800'
              }`}
            >
              PESTLE
            </button>
            <button
              onClick={() => setActiveSubTab('fishbone')}
              className={`px-3 py-1.5 text-xs font-black rounded-md transition-colors ${
                activeSubTab === 'fishbone'
                  ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black shadow-xs border border-teal-400'
                  : 'text-neutral-800 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800'
              }`}
            >
              {isAr ? 'عظم السمكة (Ishikawa)' : 'Fishbone'}
            </button>
            <button
              onClick={() => setActiveSubTab('five_whys')}
              className={`px-3 py-1.5 text-xs font-black rounded-md transition-colors ${
                activeSubTab === 'five_whys'
                  ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black shadow-xs border border-teal-400'
                  : 'text-neutral-800 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800'
              }`}
            >
              5-Whys
            </button>
            <button
              onClick={() => setActiveSubTab('escalations')}
              className={`px-3 py-1.5 text-xs font-black rounded-md transition-colors ${
                activeSubTab === 'escalations'
                  ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black shadow-xs border border-teal-400'
                  : 'text-neutral-800 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800'
              }`}
            >
              {isAr ? 'إدارة التصعيد (SLA)' : 'Escalations'}
            </button>
          </div>
        </div>
      </div>

      {/* 1. PESTLE ANALYSIS */}
      {activeSubTab === 'pestle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { key: 'political', titleEn: 'Political (P)', titleAr: 'السياسي (P)', desc: isAr ? 'التوجيهات الوطنية والسيادة الرقمية' : 'Sovereignty & National Directives', items: rootState.pestle.political },
            { key: 'economic', titleEn: 'Economic (E)', titleAr: 'الاقتصادي (E)', desc: isAr ? 'خفض تكاليف الاستشارات والعقوبات' : 'Consultancy Elimination & ROI', items: rootState.pestle.economic },
            { key: 'social', titleEn: 'Social (S)', titleAr: 'الاجتماعي (S)', desc: isAr ? 'الوعي بالخصوصية وتأهيل الكوادر' : 'Privacy Culture & Workforce Trust', items: rootState.pestle.social },
            { key: 'technological', titleEn: 'Technological (T)', titleAr: 'التقني (T)', desc: isAr ? 'العزل الشبكي والذكاء الاصطناعي' : 'Air-Gap Isolation & Local LLM', items: rootState.pestle.technological },
            { key: 'legal', titleEn: 'Legal (L)', titleAr: 'القانوني (L)', desc: isAr ? 'أنظمة ساما وهيئة السوق وحماية البيانات' : 'Statutory Mandates (SAMA, CMA, PDPL)', items: rootState.pestle.legal },
            { key: 'environmental', titleEn: 'Environmental (E)', titleAr: 'البيئي (E)', desc: isAr ? 'الحوكمة الخضراء والعمليات اللاورقية' : 'Paperless ESG Governance', items: rootState.pestle.environmental },
          ].map((cat) => (
            <div 
              key={cat.key}
              className="bg-white dark:bg-[#0c1527] border-2 border-teal-400 dark:border-cyan-400 rounded-xl p-4 shadow-xs space-y-3 hover:border-teal-500 transition-colors"
            >
              <div className="flex items-center justify-between pb-2 border-b-2 border-teal-100 dark:border-slate-800">
                <span className="text-xs font-black text-neutral-950 dark:text-white">
                  {isAr ? cat.titleAr : cat.titleEn}
                </span>
                <span className="text-[11px] font-bold text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                  {cat.items.length} {isAr ? 'عوامل' : 'Factors'}
                </span>
              </div>
              <p className="text-xs font-bold text-teal-800 dark:text-teal-400">{cat.desc}</p>
              <ul className="space-y-1.5">
                {cat.items.map((it, idx) => (
                  <li key={idx} className="text-xs font-semibold text-neutral-800 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 dark:text-cyan-400 mt-1.5 shrink-0" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* 2. ISHIKAWA FISHBONE DIAGRAM */}
      {activeSubTab === 'fishbone' && (
        <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-6 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b-2 border-teal-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-neutral-950 dark:text-white">
                {isAr ? 'مخطط عظم السمكة (Ishikawa) للتحليل الجذري' : 'Ishikawa Fishbone Root-Cause Diagram'}
              </h3>
              <p className="text-xs font-semibold text-teal-800 dark:text-teal-400">
                {isAr ? 'تفكيك مسببات تأخر شهادات الامتثال إلى ٦ محاور رئيسية' : 'Categorical decomposition of compliance cycle root causes'}
              </p>
            </div>
          </div>

          {/* Fishbone Spine Graphic Box */}
          <div className="p-6 rounded-xl bg-teal-50/30 dark:bg-[#080e1b] border-2 border-teal-200 dark:border-teal-500/30 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Upper Bones */}
              <div className="p-3 bg-white dark:bg-[#0c1527] rounded-lg border-2 border-teal-200 dark:border-teal-500/40 shadow-xs space-y-1">
                <span className="text-xs font-black text-neutral-950 dark:text-cyan-300">{isAr ? 'الأفراد (People)' : 'People / RACI'}</span>
                {rootState.fishbone.people.map((p, i) => (
                  <p key={i} className="text-[11px] font-semibold text-neutral-800 dark:text-slate-300">• {p}</p>
                ))}
              </div>

              <div className="p-3 bg-white dark:bg-[#0c1527] rounded-lg border-2 border-teal-200 dark:border-teal-500/40 shadow-xs space-y-1">
                <span className="text-xs font-black text-neutral-950 dark:text-cyan-300">{isAr ? 'العمليات (Process)' : 'Process & SOPs'}</span>
                {rootState.fishbone.process.map((p, i) => (
                  <p key={i} className="text-[11px] font-semibold text-neutral-800 dark:text-slate-300">• {p}</p>
                ))}
              </div>

              <div className="p-3 bg-white dark:bg-[#0c1527] rounded-lg border-2 border-teal-200 dark:border-teal-500/40 shadow-xs space-y-1">
                <span className="text-xs font-black text-neutral-950 dark:text-cyan-300">{isAr ? 'التقنية (Technology)' : 'Technology'}</span>
                {rootState.fishbone.technology.map((p, i) => (
                  <p key={i} className="text-[11px] font-semibold text-neutral-800 dark:text-slate-300">• {p}</p>
                ))}
              </div>

              {/* Lower Bones */}
              <div className="p-3 bg-white dark:bg-[#0c1527] rounded-lg border-2 border-teal-200 dark:border-teal-500/40 shadow-xs space-y-1">
                <span className="text-xs font-black text-neutral-950 dark:text-cyan-300">{isAr ? 'الحوكمة (Governance)' : 'Governance'}</span>
                {rootState.fishbone.governance.map((p, i) => (
                  <p key={i} className="text-[11px] font-semibold text-neutral-800 dark:text-slate-300">• {p}</p>
                ))}
              </div>

              <div className="p-3 bg-white dark:bg-[#0c1527] rounded-lg border-2 border-teal-200 dark:border-teal-500/40 shadow-xs space-y-1">
                <span className="text-xs font-black text-neutral-950 dark:text-cyan-300">{isAr ? 'القياس (Measurement)' : 'Measurement & KPIs'}</span>
                {rootState.fishbone.measurement.map((p, i) => (
                  <p key={i} className="text-[11px] font-semibold text-neutral-800 dark:text-slate-300">• {p}</p>
                ))}
              </div>

              <div className="p-3 bg-white dark:bg-[#0c1527] rounded-lg border-2 border-teal-200 dark:border-teal-500/40 shadow-xs space-y-1">
                <span className="text-xs font-black text-neutral-950 dark:text-cyan-300">{isAr ? 'البيئة (Environment)' : 'Environment & Airgap'}</span>
                {rootState.fishbone.environment.map((p, i) => (
                  <p key={i} className="text-[11px] font-semibold text-neutral-800 dark:text-slate-300">• {p}</p>
                ))}
              </div>

            </div>

            {/* Fish Head: The Problem Statement */}
            <div className="mt-6 p-4 rounded-xl bg-white dark:bg-[#0c1527] border-2 border-teal-400 dark:border-cyan-400 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-xs font-black text-teal-950 dark:text-teal-300 uppercase">
                  {isAr ? 'رأس المشكلة (Problem Statement)' : 'Fish Head: Target Problem'}
                </span>
                <p className="text-xs font-bold text-neutral-950 dark:text-white mt-1">
                  {rootState.fishbone.problemStatement}
                </p>
              </div>
              <AlertCircle className="w-6 h-6 text-teal-700 dark:text-cyan-400 shrink-0" />
            </div>
          </div>
        </div>
      )}

      {/* 3. 5-WHYS ANALYSIS */}
      {activeSubTab === 'five_whys' && (
        <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-4 transition-colors">
          <div className="pb-3 border-b-2 border-teal-100 dark:border-slate-800">
            <h3 className="text-base font-black text-neutral-950 dark:text-white">
              {isAr ? 'تحليل الأسباب الخمسة (5-Whys Root-Cause)' : '5-Whys Diagnostic Hierarchy'}
            </h3>
            <p className="text-xs font-semibold text-teal-800 dark:text-teal-400">
              {rootState.fiveWhys.incidentTitle}
            </p>
          </div>

          <div className="space-y-3">
            {rootState.fiveWhys.whys.map((w) => (
              <div 
                key={w.level}
                className="p-3.5 rounded-xl border-2 border-teal-200 dark:border-teal-500/30 bg-white dark:bg-[#080e1b] space-y-1.5 hover:border-teal-400 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-neutral-950 dark:text-cyan-300">
                    {isAr ? `السبب ${w.level}: ${w.question}` : `Why #${w.level}: ${w.question}`}
                  </span>
                  {w.rootCauseFound && (
                    <span className="text-[10px] font-black text-teal-950 dark:text-emerald-300 bg-teal-100 dark:bg-emerald-950/80 border border-teal-400 dark:border-emerald-500/50 px-2 py-0.5 rounded">
                      ROOT CAUSE IDENTIFIED
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-neutral-800 dark:text-slate-300">
                  {w.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/40 border-2 border-teal-400 dark:border-teal-500/50 flex items-center justify-between">
            <div>
              <span className="text-xs font-black text-neutral-950 dark:text-teal-300">
                {isAr ? 'الإجراء التصحيحي الجذري المعتمد' : 'Definitive Root-Cause Remedial Action'}
              </span>
              <p className="text-xs font-bold text-teal-950 dark:text-emerald-300 mt-1">
                {rootState.fiveWhys.remedialAction}
              </p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-emerald-400 shrink-0" />
          </div>
        </div>
      )}

      {/* 4. ESCALATION MANAGEMENT */}
      {activeSubTab === 'escalations' && (
        <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-5 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-slate-800">
            <div>
              <h3 className="text-base font-extrabold text-neutral-950 dark:text-white">
                {isAr ? 'إدارة مصفوفة التصعيد الزمني (SLA Escalations)' : 'SLA Escalation Matrix & Notification Dispatcher'}
              </h3>
              <p className="text-xs font-medium text-neutral-600 dark:text-slate-400">
                {isAr ? 'تكامل القنوات: Active Directory وخدمات البريد وواتساب للأعمال' : 'Multi-channel integration: Active Directory, Corporate Email & WhatsApp'}
              </p>
            </div>
          </div>

          {testNotificationStatus && (
            <div className="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/80 border border-teal-300 dark:border-teal-500 text-teal-900 dark:text-teal-200 text-xs flex items-center gap-2 font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <span>{testNotificationStatus}</span>
            </div>
          )}

          <div className="space-y-3">
            {escalationRules.map((rule) => (
              <div 
                key={rule.id}
                className="p-4 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#080e1b] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-neutral-950 dark:text-cyan-300">
                      {rule.tier.replace('_', ' ')}
                    </span>
                    <span className="text-neutral-400">·</span>
                    <span className="text-xs font-mono font-bold text-neutral-700 dark:text-slate-300 bg-neutral-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-neutral-200 dark:border-slate-700">
                      SLA: {rule.slaHours} Hours
                    </span>
                  </div>
                  <p className="text-xs font-bold text-neutral-900 dark:text-white">
                    {isAr ? rule.descriptionAr : rule.descriptionEn}
                  </p>
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-600 dark:text-slate-400 font-medium">
                    <span>Target: {rule.targetRole}</span>
                    <span>·</span>
                    <span>Channels: {rule.channels.join(' + ').toUpperCase()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleTriggerSimulatedAlert(rule)}
                    className="px-3 py-1.5 text-xs font-bold rounded-lg bg-neutral-900 dark:bg-teal-500 text-white dark:text-black hover:bg-black dark:hover:bg-teal-400 flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{isAr ? 'اختبار الإرسال' : 'Test Broadcast'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
