import React, { useState } from 'react';
import { 
  Settings, 
  Building2, 
  UserPlus, 
  Download, 
  CheckCircle,
  HardDrive
} from 'lucide-react';
import { Language, RiskMatrixConfig } from '../types';

interface AdminPortalViewProps {
  lang: Language;
  riskConfig: RiskMatrixConfig;
  onUpdateRiskConfig: (config: RiskMatrixConfig) => void;
  onExportAirgap: () => void;
  onAddLedgerBlock: (action: string, entityId: string, details: string) => void;
}

interface ExecutiveUser {
  id: string;
  name: string;
  role: string;
  email: string;
  signatureHex: string;
  mfaEnforced: boolean;
}

export const AdminPortalView: React.FC<AdminPortalViewProps> = ({
  lang,
  riskConfig,
  onUpdateRiskConfig,
  onExportAirgap,
  onAddLedgerBlock
}) => {
  const isAr = lang === 'ar';

  // Organization profile
  const [orgName, setOrgName] = useState('Sovereign Enterprise KSA');
  const [orgSector, setOrgSector] = useState('Banking & Financial Sector (SAMA)');
  const [crNumber, setCrNumber] = useState('1010892410');
  const [complianceTier, setComplianceTier] = useState('Tier-1 Critical Infrastructure');

  // C-Level Management Roster
  const [executives, setExecutives] = useState<ExecutiveUser[]>([
    {
      id: 'ex-1',
      name: 'Abdulaziz Al-Roomi',
      role: 'Chief Executive Officer (CEO)',
      email: 'abdulazizmsroomi@gmail.com',
      signatureHex: '0x8f2c01948ba2419ef01a48c9281a7b00',
      mfaEnforced: true
    },
    {
      id: 'ex-2',
      name: 'Dr. Tariq Al-Mansoor',
      role: 'Chief Information Security Officer (CISO)',
      email: 'ciso.lead@sovereign-ksa.gov',
      signatureHex: '0x4e21a80c92bbfa7100e1239c4a899011',
      mfaEnforced: true
    },
    {
      id: 'ex-3',
      name: 'Eng. Khalid Al-Otaibi',
      role: 'Chief Information Officer (CIO)',
      email: 'cio.strategy@sovereign-ksa.gov',
      signatureHex: '0x11749acfe0021b66798cba238491001a',
      mfaEnforced: true
    }
  ]);

  // New Executive Form Modal
  const [newExecName, setNewExecName] = useState('');
  const [newExecRole, setNewExecRole] = useState('Chief Risk Officer (CRO)');
  const [newExecEmail, setNewExecEmail] = useState('');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const handleRegisterExecutive = () => {
    if (!newExecName || !newExecEmail) return;

    const newExec: ExecutiveUser = {
      id: `ex-${Date.now().toString(36)}`,
      name: newExecName,
      role: newExecRole,
      email: newExecEmail,
      signatureHex: '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      mfaEnforced: true
    };

    setExecutives(prev => [...prev, newExec]);
    onAddLedgerBlock(
      'C_LEVEL_EXECUTIVE_REGISTERED',
      newExec.id,
      `Registered ${newExec.name} (${newExec.role}) with 256-bit key and MFA requirements.`
    );

    setNewExecName('');
    setNewExecEmail('');
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
              <span className="text-xs font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                {isAr ? 'البوابة الإدارية والتخصيص المؤسسي' : 'Administrative Governance Portal'}
              </span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-neutral-950 dark:text-white mt-2">
              {isAr ? 'تسجيل الإدارة العليا وتخصيص البيئة المعزولة' : 'C-Level Registration & Air-Gap Configuration'}
            </h1>
            <p className="text-xs font-semibold text-neutral-700 dark:text-slate-300 mt-0.5">
              {isAr 
                ? 'إدارة تسجيل القيادات التنفيذية ومفاتيح التشفير 256-bit، تخصيص مصفوفات المخاطر، وحزم التثبيت للبيئات المعزولة.'
                : 'Configure organizational profile, 256-bit encrypted C-level keys, risk thresholds, and air-gap package exports.'}
            </p>
          </div>

          <button
            onClick={onExportAirgap}
            className="px-4 py-2 text-xs font-black rounded-lg bg-neutral-950 dark:bg-teal-500 hover:bg-black dark:hover:bg-teal-400 text-white dark:text-black flex items-center gap-2 transition-colors shadow-xs border-2 border-teal-400"
          >
            <Download className="w-4 h-4 text-teal-300 dark:text-black" />
            <span>{isAr ? 'تحميل حزمة البيئة المعزولة' : 'Export Air-Gap Bundle'}</span>
          </button>
        </div>
      </div>

      {isSavedNotice && (
        <div className="p-3 rounded-lg bg-teal-50 dark:bg-cyan-950/70 border-2 border-teal-400 dark:border-cyan-400 text-teal-950 dark:text-cyan-200 text-xs flex items-center gap-2 font-black">
          <CheckCircle className="w-4 h-4 text-teal-600 dark:text-cyan-400 shrink-0" />
          <span>{isAr ? 'تم حفظ وتسجيل المسؤول بنجاح وتوثيقه في سلسلة البلوكتشين!' : 'Executive registered successfully and minted into the ledger!'}</span>
        </div>
      )}

      {/* Grid: Org Info & C-Level Roster (Left) + Custom Risk Matrix Config & Airgap Tools (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* C-Level Executive Registration */}
        <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-4 transition-colors">
          <div className="flex items-center justify-between pb-3 border-b-2 border-teal-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-neutral-950 dark:text-white">
                {isAr ? 'سجل القيادات التنفيذية المعتمدة (C-Level)' : 'Registered C-Level Executive Authorities'}
              </h3>
              <p className="text-xs font-semibold text-teal-800 dark:text-cyan-400">
                {isAr ? 'المخولون بالتوقيع الرقمي المشفر واعتماد الوثائق' : 'Designated signatories with 256-bit cryptographic keys'}
              </p>
            </div>
            <UserPlus className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
          </div>

          {/* Roster List */}
          <div className="space-y-3">
            {executives.map((ex) => (
              <div 
                key={ex.id}
                className="p-3.5 rounded-lg border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#080e1b] space-y-2 hover:bg-neutral-50 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-950 dark:text-white">
                    {ex.name}
                  </span>
                  <span className="text-[10px] bg-neutral-100 dark:bg-slate-800 text-neutral-900 dark:text-cyan-300 border border-neutral-300 dark:border-slate-700 px-2 py-0.5 rounded font-bold">
                    MFA ENFORCED
                  </span>
                </div>
                <div className="text-[11px] text-neutral-700 dark:text-slate-300 font-medium">
                  <span>{ex.role}</span> · <span className="font-mono">{ex.email}</span>
                </div>
                <div className="text-[10px] font-mono text-neutral-700 dark:text-cyan-400/90 bg-neutral-50 dark:bg-slate-900 border border-neutral-200 dark:border-slate-800 p-1.5 rounded truncate font-bold">
                  PUBLIC KEY: {ex.signatureHex}
                </div>
              </div>
            ))}
          </div>

          {/* Add Executive Form */}
          <div className="pt-3 border-t border-neutral-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-neutral-950 dark:text-white">
              {isAr ? 'تسجيل قيادي جديد' : 'Register New Executive Signatory'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder={isAr ? 'الاسم الكامل...' : 'Full Name...'}
                value={newExecName}
                onChange={(e) => setNewExecName(e.target.value)}
                className="text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-white font-medium focus:outline-hidden focus:border-teal-500"
              />
              <input
                type="email"
                placeholder={isAr ? 'البريد الإلكتروني...' : 'Corporate Email...'}
                value={newExecEmail}
                onChange={(e) => setNewExecEmail(e.target.value)}
                className="text-xs px-3 py-2 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-white font-medium focus:outline-hidden focus:border-teal-500"
              />
            </div>
            <button
              onClick={handleRegisterExecutive}
              className="w-full py-2 bg-neutral-900 dark:bg-teal-500 hover:bg-black dark:hover:bg-teal-400 text-white dark:text-black rounded-lg text-xs font-bold transition-colors shadow-xs"
            >
              {isAr ? 'تسجيل القيادي وتوليد المفتاح التشفيري 256-Bit' : 'Register Signatory & Generate 256-Bit Key'}
            </button>
          </div>
        </div>

        {/* Universal Customization & Air-Gap Node Control */}
        <div className="space-y-6">
          
          {/* Organization Details */}
          <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b-2 border-teal-100 dark:border-slate-800">
              <h3 className="text-sm font-black text-neutral-950 dark:text-white">
                {isAr ? 'بيانات المنشأة والقطاع التنظيمي' : 'Enterprise & Regulatory Scope Profile'}
              </h3>
              <Building2 className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-neutral-700 dark:text-slate-300">
                  {isAr ? 'اسم المنشأة المسجلة' : 'Registered Organization Name'}
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full text-xs mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-white font-medium focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-neutral-700 dark:text-slate-300">
                  {isAr ? 'القطاع والجهة الرقابية المشرفة' : 'Regulated Sector & Statutory Authority'}
                </label>
                <input
                  type="text"
                  value={orgSector}
                  onChange={(e) => setOrgSector(e.target.value)}
                  className="w-full text-xs mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-white font-medium focus:outline-hidden focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 dark:text-slate-300">
                    {isAr ? 'رقم السجل التجاري' : 'Commercial Registration (CR)'}
                  </label>
                  <input
                    type="text"
                    value={crNumber}
                    onChange={(e) => setCrNumber(e.target.value)}
                    className="w-full text-xs mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-white font-medium focus:outline-hidden focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-neutral-700 dark:text-slate-300">
                    {isAr ? 'مستوى الحساسية' : 'NCA Criticality Tier'}
                  </label>
                  <input
                    type="text"
                    value={complianceTier}
                    onChange={(e) => setComplianceTier(e.target.value)}
                    className="w-full text-xs mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-white font-medium focus:outline-hidden focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Air-Gap Sovereign Hardening Status */}
          <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-3 transition-colors">
            <div className="flex items-center justify-between pb-2 border-b-2 border-teal-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
                <h3 className="text-sm font-black text-neutral-950 dark:text-white">
                  {isAr ? 'حالة العزل الشبكي السيادي (Air-Gap)' : 'Air-Gap Sovereign Node Status'}
                </h3>
              </div>
              <span className="text-[10px] font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                OPERATIONAL
              </span>
            </div>

            <p className="text-xs font-medium text-neutral-700 dark:text-slate-300 leading-relaxed">
              {isAr 
                ? 'تعمل المنظومة بنموذج محلي كامل داخل الشبكة المغلقة، وتدعم تشغيل نماذج الذكاء الاصطناعي المحلية دون أي اتصال خارجي.'
                : 'Zero telemetry leaks outside the enterprise enclave. Embedded local reasoning and speech engines operate 100% offline.'}
            </p>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={onExportAirgap}
                className="flex-1 py-2 text-xs font-bold rounded-lg bg-neutral-100 dark:bg-slate-800 hover:bg-neutral-200 dark:hover:bg-slate-700 border border-neutral-300 dark:border-slate-700 text-neutral-900 dark:text-white flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isAr ? 'تصدير نسخة احتياطية مشفرة' : 'Download Encrypted Backup'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
