import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle, 
  FileText, 
  ExternalLink, 
  Eye, 
  Download, 
  Clock, 
  Calendar, 
  User, 
  AlertTriangle, 
  Check, 
  Scan
} from 'lucide-react';
import { Language, ControlItem } from '../types';

interface ControlsDetailViewProps {
  lang: Language;
  control?: ControlItem | null;
  onBack: () => void;
  onNavigateTab: (tab: string) => void;
}

export const ControlsDetailView: React.FC<ControlsDetailViewProps> = ({
  lang,
  control,
  onBack,
  onNavigateTab
}) => {
  const isAr = lang === 'ar';
  const [activeSubTab, setActiveSubTab] = useState<'details' | 'evidence' | 'assessments' | 'related_risks'>('details');
  const [selectedEvidencePreview, setSelectedEvidencePreview] = useState<string | null>(null);

  const evidenceFiles = [
    {
      id: 'ev-1',
      title: 'Access Control Policy v2.1',
      fileType: 'PDF • Apr 15, 2025',
      size: '2.4 MB',
      verified: true
    },
    {
      id: 'ev-2',
      title: 'User Access Review Q1',
      fileType: 'XLSX • Apr 10, 2025',
      size: '1.1 MB',
      verified: true
    },
    {
      id: 'ev-3',
      title: 'System Configuration Report',
      fileType: 'PDF • Apr 3, 2025',
      size: '4.8 MB',
      verified: true
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-black text-blue-600 dark:text-cyan-400 hover:underline"
        >
          <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          <span>{isAr ? 'العودة إلى قائمة الضوابط' : 'Back to Controls List'}</span>
        </button>

        <span className="text-xs font-mono font-bold text-slate-500">
          CONTROL ID: A.5.1.1
        </span>
      </div>

      {/* Main Header Card from Collage */}
      <div className="rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-blue-600 dark:text-cyan-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/30">
                ISO 27001
              </span>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/30 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>Implemented</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-2">
              A.5.1.1 Access Control
            </h1>

            <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
              Ensure that access to information and assets is restricted to authorized users only.
            </p>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-slate-400 uppercase">
              Control Effectiveness
            </span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 tabular-nums">
              92%
            </div>
            <div className="w-28 bg-slate-100 dark:bg-slate-800 h-2 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '92%' }} />
            </div>
          </div>
        </div>

        {/* Metadata info grid */}
        <div className="pt-4 border-t border-slate-100 dark:border-[#18264C] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-semibold block text-[11px]">Owner</span>
            <span className="font-bold text-slate-900 dark:text-white">IT Security Team</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[11px]">Last Reviewed</span>
            <span className="font-bold text-slate-900 dark:text-white">Apr 15, 2025</span>
          </div>
          <div>
            <span className="text-slate-400 font-semibold block text-[11px]">Next Review</span>
            <span className="font-bold text-slate-900 dark:text-white">Oct 15, 2025</span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="pt-2 flex items-center gap-2 border-t border-slate-100 dark:border-[#18264C]">
          {[
            { id: 'details', label: 'Details' },
            { id: 'evidence', label: 'Evidence (4)' },
            { id: 'assessments', label: 'Assessments (2)' },
            { id: 'related_risks', label: 'Related Risks (1)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeSubTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0D1836]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Supporting Evidence Card matching collage */}
      <div className="rounded-2xl p-6 bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] shadow-xs space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white">
          Supporting Evidence
        </h3>

        <div className="space-y-3">
          {evidenceFiles.map((ev) => (
            <div
              key={ev.id}
              className="p-3.5 rounded-xl border border-slate-200/80 dark:border-[#1A264D] bg-slate-50/50 dark:bg-[#0D1836] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {ev.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {ev.fileType} • {ev.size}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedEvidencePreview(ev.title)}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Preview Modal */}
      {selectedEvidencePreview && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-[#18264C] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Evidence Audit: {selectedEvidencePreview}
              </h3>
              <button 
                onClick={() => setSelectedEvidencePreview(null)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#070D1F] border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
              [SHA-256 ENCRYPTED AUDIT ARTIFACT]
              <br /><br />
              Status: Verified by Agent X Computer Vision Kernel
              <br />
              Integrity Score: 99.8% Tamper Proof
              <br />
              Enclave Timestamp: 2026-10-13T00:42:00Z
            </div>
            <button
              onClick={() => setSelectedEvidencePreview(null)}
              className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Close Viewer
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
