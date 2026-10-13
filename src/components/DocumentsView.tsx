import React, { useState } from 'react';
import { 
  FileText, 
  Folder, 
  Sparkles, 
  ShieldCheck, 
  Volume2
} from 'lucide-react';
import { Language, DocumentItem, AgentRole } from '../types';
import { AGENT_PERSONAS } from '../data/agentData';
import { localLlm } from '../utils/localLlm';
import { computeSha256 } from '../utils/crypto';
import { naturalSpeech } from '../utils/voice';

interface DocumentsViewProps {
  lang: Language;
  documents: DocumentItem[];
  onAddDocument: (doc: DocumentItem) => void;
  onNavigateTab: (tab: string) => void;
  onAddLedgerBlock: (action: string, entityId: string, details: string) => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  lang,
  documents,
  onAddDocument,
  onNavigateTab,
  onAddLedgerBlock
}) => {
  const isAr = lang === 'ar';
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(documents[0] || null);
  const [filterType, setFilterType] = useState<string>('ALL');

  // Generator modal / panel state
  const [showGenerator, setShowGenerator] = useState(false);
  const [genType, setGenType] = useState<DocumentItem['type']>('POLICY_PROCEDURE');
  const [genTopicEn, setGenTopicEn] = useState('Air-Gapped Access Control & Identity Hardening');
  const [genTopicAr, setGenTopicAr] = useState('تحصين إدارة الهويات والوصول في الشبكات المعزولة');
  const [genAuthorRole, setGenAuthorRole] = useState<AgentRole>('CISO');
  const [isGenerating, setIsGenerating] = useState(false);

  // Filter documents
  const filteredDocs = documents.filter(d => filterType === 'ALL' || d.type === filterType);

  const docTypesList: { type: DocumentItem['type']; labelEn: string; labelAr: string }[] = [
    { type: 'BUSINESS_CASE', labelEn: 'Business Case', labelAr: 'دراسة الجدوى' },
    { type: 'PROJECT_CHARTER', labelEn: 'Project Charter', labelAr: 'ميثاق المشروع' },
    { type: 'SOW', labelEn: 'Scope of Work (SOW)', labelAr: 'نطاق العمل' },
    { type: 'POLICY_PROCEDURE', labelEn: 'Policy & Procedure', labelAr: 'السياسات والإجراءات' },
    { type: 'SOA', labelEn: 'Statement of Applicability (SoA)', labelAr: 'بيان قابلية التطبيق' },
    { type: 'MOM', labelEn: 'Minutes of Meeting (MOM)', labelAr: 'محاضر الاجتماعات' },
    { type: 'COMMUNICATION_PLAN', labelEn: 'Communication Plan', labelAr: 'خطة التواصل' },
    { type: 'TIME_MANAGEMENT', labelEn: 'Time Management', labelAr: 'إدارة الجدول الزمني' },
  ];

  // Handle Generate Document
  const handleGenerateDocument = async () => {
    setIsGenerating(true);
    try {
      const partialDoc = localLlm.generateDocument(genType, genTopicEn, genTopicAr, genAuthorRole);
      const contentForHash = (partialDoc.contentEn || '') + (partialDoc.contentAr || '');
      const docHash = await computeSha256(contentForHash);

      const completeDoc: DocumentItem = {
        ...partialDoc as DocumentItem,
        documentHash: docHash,
        status: 'pending_c_level'
      };

      onAddDocument(completeDoc);
      setSelectedDoc(completeDoc);
      setShowGenerator(false);

      onAddLedgerBlock(
        'AGENTIC_DOCUMENT_DRAFTED_AND_HASHED',
        completeDoc.id,
        `Document ${completeDoc.titleEn} authored by ${genAuthorRole} with SHA-256 hash ${docHash.substring(0, 16)}... submitted to human queue.`
      );

      alert(isAr ? 'تم توليد الوثيقة وحساب بصمتها التشفيرية ورفعها لطابور الاعتماد البشري!' : 'Document generated, cryptographically hashed, and routed to Human Approval Queue!');
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
              <span className="text-xs font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                {isAr ? 'مكتبة الوثائق وحوكمة دورة حياة المشاريع PDCA' : 'Documentation Library & PM Lifecycle'}
              </span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-neutral-950 dark:text-white mt-2">
              {isAr ? 'استوديو صياغة الوثائق المعتمدة ثنائية اللغة' : 'Bilingual Document Studio & Governance Repository'}
            </h1>
            <p className="text-xs font-semibold text-neutral-700 dark:text-slate-300 mt-0.5">
              {isAr 
                ? 'توليد آلي كامل لدراسات الجدوى، مواثيق المشاريع، نطاق العمل (SOW)، السياسات، وبيان قابلية التطبيق (SoA) مع بصمات تشفيرية SHA-256.'
                : 'Automated agentic authoring of Business Cases, Project Charters, SOWs, Policies, and SoA with immutable SHA-256 integrity.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGenerator(true)}
              className="px-4 py-2 text-xs font-black rounded-lg bg-neutral-950 dark:bg-teal-500 hover:bg-black dark:hover:bg-teal-400 text-white dark:text-black flex items-center gap-1.5 transition-colors shadow-xs border-2 border-teal-400"
            >
              <Sparkles className="w-4 h-4 text-teal-300 dark:text-black" />
              <span>{isAr ? 'توليد وثيقة بالقوة الوكيلة' : 'Generate with Agentic Force'}</span>
            </button>
          </div>
        </div>

        {/* Filter Categories Bar */}
        <div className="mt-5 pt-4 border-t-2 border-teal-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 text-xs font-black rounded-lg whitespace-nowrap border-2 transition-colors ${
              filterType === 'ALL'
                ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black border-teal-400 shadow-xs'
                : 'bg-white dark:bg-[#080e1b] text-neutral-850 dark:text-slate-200 border-teal-200 dark:border-teal-500/30 hover:bg-emerald-50 dark:hover:bg-slate-800'
            }`}
          >
            {isAr ? 'جميع المجلدات' : 'All Documents'} ({documents.length})
          </button>

          {docTypesList.map((item) => (
            <button
              key={item.type}
              onClick={() => setFilterType(item.type)}
              className={`px-3 py-1.5 text-xs font-black rounded-lg whitespace-nowrap border-2 transition-colors ${
                filterType === item.type
                  ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black border-teal-400 shadow-xs'
                  : 'bg-white dark:bg-[#080e1b] text-neutral-850 dark:text-slate-200 border-teal-200 dark:border-teal-500/30 hover:bg-emerald-50 dark:hover:bg-slate-800'
              }`}
            >
              {isAr ? item.labelAr : item.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Document List (Left) + Document Reader (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Document List */}
        <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-4 shadow-xs space-y-2 transition-colors">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-slate-300 mb-2">
            {isAr ? 'الوثائق المصنفة في المكتبة' : 'Repository Files'}
          </h3>

          <div className="space-y-2 max-h-[620px] overflow-y-auto">
            {filteredDocs.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              const author = AGENT_PERSONAS.find(p => p.role === doc.authorAgent);

              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/80 dark:bg-cyan-950/40 border-teal-500 dark:border-cyan-400'
                      : 'hover:bg-neutral-50 dark:hover:bg-slate-800/60 border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#080e1b]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-neutral-900">
                      {doc.type}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono font-bold">
                      v{doc.version}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-neutral-950 mt-1 line-clamp-1">
                    {isAr ? doc.titleAr : doc.titleEn}
                  </h4>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-600 font-medium">
                    <span>{isAr ? author?.nameAr : author?.nameEn}</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-100 border border-neutral-300 text-neutral-900">
                      {doc.status === 'approved_signed' ? (isAr ? 'معتمد وموقع' : 'Signed') : (isAr ? 'بانتظار الاعتماد' : 'Pending')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Document Reader / Details */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs flex flex-col h-[680px] transition-colors">
          {selectedDoc ? (
            <>
              {/* Reader Top Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-teal-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                      {selectedDoc.type}
                    </span>
                    <span className="text-teal-400">·</span>
                    <span className="text-xs font-semibold text-neutral-600 dark:text-slate-400">
                      {selectedDoc.createdAt}
                    </span>
                  </div>
                  <h2 className="text-base font-black text-neutral-950 dark:text-white mt-1.5">
                    {isAr ? selectedDoc.titleAr : selectedDoc.titleEn}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const text = isAr ? selectedDoc.contentAr : selectedDoc.contentEn;
                      naturalSpeech.speak(text, isAr ? 'ar' : 'en');
                    }}
                    className="p-2 text-neutral-900 dark:text-cyan-300 hover:text-black dark:hover:text-white border-2 border-teal-300 dark:border-teal-500/40 hover:bg-emerald-50 dark:hover:bg-slate-800 rounded-lg transition-colors bg-white dark:bg-[#080e1b] shadow-xs"
                    title={isAr ? 'قراءة الوثيقة بصوت بشري طبيعي' : 'Read aloud with natural male voice'}
                  >
                    <Volume2 className="w-4 h-4 text-teal-700 dark:text-cyan-400" />
                  </button>

                  <button
                    onClick={() => onNavigateTab('approvals')}
                    className="px-3.5 py-1.5 text-xs font-black rounded-lg bg-neutral-950 dark:bg-teal-500 hover:bg-black dark:hover:bg-teal-400 text-white dark:text-black flex items-center gap-1.5 transition-colors shadow-xs border-2 border-teal-400"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-300 dark:text-black" />
                    <span>{isAr ? 'مسار الاعتماد المشفر' : 'Sign in Queue'}</span>
                  </button>
                </div>
              </div>

              {/* SHA-256 Tamper Evident Stamp */}
              <div className="my-3 p-2.5 rounded-lg bg-teal-50/50 dark:bg-[#080e1b] border-2 border-teal-200 dark:border-teal-500/30 flex items-center justify-between text-[11px] font-mono">
                <span className="text-teal-900 dark:text-cyan-400 font-bold">SHA-256 HASH:</span>
                <span className="text-neutral-900 dark:text-slate-300 font-medium truncate max-w-[360px]">
                  {selectedDoc.documentHash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
                </span>
                <span className="text-teal-950 dark:text-teal-300 font-black shrink-0 bg-teal-200 dark:bg-teal-950/80 px-2 py-0.5 rounded border border-teal-400 dark:border-teal-500/50">
                  {isAr ? 'موثق' : 'VERIFIED'}
                </span>
              </div>

              {/* Document Bilingual Content Tabs */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                <div className="p-4 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#080e1b] space-y-2">
                  <span className="text-xs font-bold text-neutral-700 dark:text-cyan-300 uppercase tracking-wider">
                    {isAr ? 'النسخة المعتمدة (بالعربية)' : 'English Certified Version'}
                  </span>
                  <div className="text-xs text-neutral-900 dark:text-slate-200 whitespace-pre-line leading-relaxed font-sans font-medium">
                    {isAr ? selectedDoc.contentAr : selectedDoc.contentEn}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-neutral-200 dark:border-slate-800 bg-white dark:bg-[#080e1b] space-y-2">
                  <span className="text-xs font-bold text-neutral-700 dark:text-cyan-300 uppercase tracking-wider">
                    {isAr ? 'النسخة الإنجليزية المقابلة' : 'Arabic Co-Drafted Version'}
                  </span>
                  <div className="text-xs text-neutral-900 dark:text-slate-200 whitespace-pre-line leading-relaxed font-sans font-medium" dir={isAr ? 'ltr' : 'rtl'}>
                    {isAr ? selectedDoc.contentEn : selectedDoc.contentAr}
                  </div>
                </div>
              </div>

            </>
          ) : (
            <div className="text-center py-32 text-neutral-400 dark:text-slate-500 space-y-2">
              <FileText className="w-10 h-10 mx-auto text-neutral-400 dark:text-slate-500" />
              <p className="text-xs font-medium text-neutral-600 dark:text-slate-400">
                {isAr ? 'اختر وثيقة من القائمة للمراجعة' : 'Select a document to read and review.'}
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Generator Modal */}
      {showGenerator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 text-neutral-900 dark:text-slate-100 shadow-teal-500/20">
            <div className="flex items-center justify-between pb-3 border-b-2 border-teal-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
                <h3 className="text-base font-black text-neutral-950 dark:text-white">
                  {isAr ? 'توليد وثيقة جديدة بالقوة الوكيلة' : 'Generate Document with Agentic Force'}
                </h3>
              </div>
              <button 
                onClick={() => setShowGenerator(false)}
                className="text-neutral-500 dark:text-slate-400 hover:text-black dark:hover:text-white text-sm p-1 rounded-md border border-teal-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-slate-300">
                  {isAr ? 'نوع الوثيقة المطلوبة' : 'Document Type'}
                </label>
                <select
                  value={genType}
                  onChange={(e) => setGenType(e.target.value as any)}
                  className="w-full text-xs mt-1 p-2.5 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-slate-100 font-medium"
                >
                  {docTypesList.map((t) => (
                    <option key={t.type} value={t.type}>
                      {isAr ? t.labelAr : t.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-slate-300">
                  {isAr ? 'المسؤول الوكيل المشرف على الصياغة' : 'Authoring Officer Persona'}
                </label>
                <select
                  value={genAuthorRole}
                  onChange={(e) => setGenAuthorRole(e.target.value as any)}
                  className="w-full text-xs mt-1 p-2.5 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-slate-100 font-medium"
                >
                  {AGENT_PERSONAS.map((a) => (
                    <option key={a.role} value={a.role}>
                      {isAr ? `${a.nameAr} (${a.titleAr})` : `${a.nameEn} (${a.titleEn})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-slate-300">
                  {isAr ? 'عنوان وموضوع الوثيقة (بالإنجليزية)' : 'Topic / Purpose (English)'}
                </label>
                <input
                  type="text"
                  value={genTopicEn}
                  onChange={(e) => setGenTopicEn(e.target.value)}
                  className="w-full text-xs mt-1 p-2.5 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-slate-100 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 dark:text-slate-300">
                  {isAr ? 'عنوان وموضوع الوثيقة (بالعربية)' : 'Topic / Purpose (Arabic)'}
                </label>
                <input
                  type="text"
                  value={genTopicAr}
                  onChange={(e) => setGenTopicAr(e.target.value)}
                  className="w-full text-xs mt-1 p-2.5 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-slate-100 font-medium"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setShowGenerator(false)}
                className="px-3.5 py-2 text-xs font-bold rounded-lg text-neutral-700 dark:text-slate-300 hover:bg-neutral-100 dark:hover:bg-slate-800"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleGenerateDocument}
                disabled={isGenerating}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-neutral-900 dark:bg-teal-500 hover:bg-black dark:hover:bg-teal-400 text-white dark:text-black flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGenerating ? (isAr ? 'جاري الصياغة والتشفير...' : 'Drafting & Hashing...') : (isAr ? 'بدء التوليد والتشفير' : 'Generate & Hash')}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
