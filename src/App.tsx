import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { DualBrainView } from './components/DualBrainView';
import { FrameworksView } from './components/FrameworksView';
import { RiskMatrixView } from './components/RiskMatrixView';
import { DocumentsView } from './components/DocumentsView';
import { ApprovalLedgerView } from './components/ApprovalLedgerView';
import { RootCauseView } from './components/RootCauseView';
import { AdminPortalView } from './components/AdminPortalView';
import { ControlsDetailView } from './components/ControlsDetailView';
import { IncidentsView } from './components/IncidentsView';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { AgentXLogo } from './components/AgentXLogo';

import { 
  Language, 
  ThemeMode, 
  ControlItem, 
  DocumentItem, 
  BlockchainLedgerBlock, 
  RiskMatrixConfig, 
  BoardMeetingSession 
} from './types';
import { INITIAL_CONTROLS } from './data/frameworksData';
import { 
  INITIAL_DOCUMENTS, 
  INITIAL_LEDGER_BLOCKS, 
  INITIAL_RISK_MATRIX_CONFIG, 
  INITIAL_BOARD_MEETING 
} from './data/mockDefaults';
import { naturalSpeech } from './utils/voice';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('agentx_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark'; // Dark mode default as in the collage
  });
  
  // Navigation tabs matching the collage:
  // dashboard | risk_management | compliance | controls | incidents | assessments | audit_findings | policies | reports | configuration
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Core state
  const [controls, setControls] = useState<ControlItem[]>(INITIAL_CONTROLS);
  const [selectedControl, setSelectedControl] = useState<ControlItem | null>(INITIAL_CONTROLS[0]);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [ledger, setLedger] = useState<BlockchainLedgerBlock[]>(INITIAL_LEDGER_BLOCKS);
  const [riskConfig, setRiskConfig] = useState<RiskMatrixConfig>(INITIAL_RISK_MATRIX_CONFIG);
  const [boardMeeting, setBoardMeeting] = useState<BoardMeetingSession>(INITIAL_BOARD_MEETING);

  // Voice state
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Synchronize Dark / Light mode class on html and body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
    localStorage.setItem('agentx_theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  // Helper to append block to ledger
  const handleAddLedgerBlock = (action: string, entityId: string, details: string) => {
    const prevBlock = ledger[ledger.length - 1];
    const newIndex = ledger.length;
    const newBlock: BlockchainLedgerBlock = {
      index: newIndex,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      action,
      entityId,
      actor: 'Agent X Security Kernel',
      role: 'Automated Governance Engine',
      details,
      previousHash: prevBlock ? prevBlock.hash : '0000000000000000000000000000000000000000000000000000000000000000',
      hash: '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      mfaVerified: true
    };
    setLedger(prev => [...prev, newBlock]);
  };

  const handleAddDocument = (newDoc: DocumentItem) => {
    setDocuments(prev => [newDoc, ...prev]);
  };

  const handleUpdateDocument = (updatedDoc: DocumentItem) => {
    setDocuments(prev => prev.map(d => d.id === updatedDoc.id ? updatedDoc : d));
  };

  const handleUpdateControl = (updatedCtrl: ControlItem) => {
    setControls(prev => prev.map(c => c.id === updatedCtrl.id ? updatedCtrl : c));
  };

  // Download complete Air-Gap bundle
  const handleExportAirgap = () => {
    const airgapBundle = {
      platform: 'Agent X Autonomous Sovereign GRC & Cyber Platform',
      exportTimestamp: new Date().toISOString(),
      integrityKernel: 'SHA-256 Chained Blockchain Ledger',
      frameworksEmbedded: [
        'NCA ECC-1:2018',
        'NCA CSCC-1:2019',
        'SAMA CSF v3.0',
        'CMA Cybersecurity Guidelines',
        'Saudi Personal Data Protection Law (PDPL)',
        'TGA Transport Cybersecurity',
        'ISO/IEC 27001:2022',
        'ISO 31000:2018',
        'NIST CSF 2.0',
        'CIS Controls v8'
      ],
      activeControls: controls,
      documentsRepository: documents,
      tamperEvidentLedger: ledger,
      riskMatrixConfiguration: riskConfig
    };

    const blob = new Blob([JSON.stringify(airgapBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agent_x_airgap_sovereign_package_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex bg-[#F4F7FC] dark:bg-[#060B18] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* 1. Left Sidebar Navigation (Matching collage exact layout) */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        theme={theme}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        
        {/* Top Header Bar */}
        <TopHeader
          onToggleSidebarMobile={() => setIsMobileSidebarOpen(true)}
          lang={lang}
          setLang={setLang}
          theme={theme}
          setTheme={setTheme}
          onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
          isListening={isListening}
          onExportAirgap={handleExportAirgap}
          onNavigateTab={setCurrentTab}
        />

        {/* Main Canvas View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 overflow-y-auto">
          
          {/* Dashboard Tab */}
          {currentTab === 'dashboard' && (
            <DashboardView
              lang={lang}
              controls={controls}
              documents={documents}
              ledger={ledger}
              onNavigateTab={setCurrentTab}
              onSelectControl={(ctrl) => {
                setSelectedControl(ctrl);
                setCurrentTab('controls');
              }}
            />
          )}

          {/* Risk Management Tab */}
          {currentTab === 'risk_management' && (
            <RiskMatrixView
              lang={lang}
              controls={controls}
              riskConfig={riskConfig}
              onUpdateRiskConfig={setRiskConfig}
              onSelectControl={(ctrl) => {
                setSelectedControl(ctrl);
                setCurrentTab('controls');
              }}
              onNavigateTab={setCurrentTab}
            />
          )}

          {/* Compliance & Frameworks Tab */}
          {currentTab === 'compliance' && (
            <FrameworksView
              lang={lang}
              controls={controls}
              selectedControl={selectedControl}
              onSelectControl={(ctrl) => {
                setSelectedControl(ctrl);
                setCurrentTab('controls');
              }}
              onUpdateControl={handleUpdateControl}
              onAddLedgerBlock={handleAddLedgerBlock}
            />
          )}

          {/* Controls Detail Tab */}
          {currentTab === 'controls' && (
            <ControlsDetailView
              lang={lang}
              control={selectedControl}
              onBack={() => setCurrentTab('compliance')}
              onNavigateTab={setCurrentTab}
            />
          )}

          {/* Incidents Management Tab */}
          {currentTab === 'incidents' && (
            <IncidentsView lang={lang} />
          )}

          {/* Assessments & Dual Brain Board Room Tab */}
          {currentTab === 'assessments' && (
            <DualBrainView
              lang={lang}
              boardMeeting={boardMeeting}
              onUpdateBoardMeeting={setBoardMeeting}
              onAddDocument={handleAddDocument}
              onAddLedgerBlock={handleAddLedgerBlock}
            />
          )}

          {/* Audit & Findings / Blockchain Approvals Tab */}
          {currentTab === 'audit_findings' && (
            <ApprovalLedgerView
              lang={lang}
              documents={documents}
              ledger={ledger}
              onUpdateDocument={handleUpdateDocument}
              onAddLedgerBlock={(block) => setLedger(prev => [...prev, block])}
            />
          )}

          {/* Policies & Procedures Document Studio Tab */}
          {currentTab === 'policies' && (
            <DocumentsView
              lang={lang}
              documents={documents}
              onAddDocument={handleAddDocument}
              onNavigateTab={setCurrentTab}
              onAddLedgerBlock={handleAddLedgerBlock}
            />
          )}

          {/* Reports & Root-Cause Tools Tab */}
          {currentTab === 'reports' && (
            <RootCauseView lang={lang} />
          )}

          {/* Configuration & Admin Portal Tab */}
          {currentTab === 'configuration' && (
            <AdminPortalView
              lang={lang}
              riskConfig={riskConfig}
              onUpdateRiskConfig={setRiskConfig}
              onExportAirgap={handleExportAirgap}
              onAddLedgerBlock={handleAddLedgerBlock}
            />
          )}

        </main>
      </div>

      {/* Voice Assistant Navigation Modal */}
      {isVoiceModalOpen && (
        <VoiceAssistantModal
          isOpen={isVoiceModalOpen}
          onClose={() => setIsVoiceModalOpen(false)}
          lang={lang}
          setLang={setLang}
          onNavigateTab={(targetTab: string) => {
            // Map spoken targets to tabs
            if (targetTab === 'dashboard') setCurrentTab('dashboard');
            else if (targetTab === 'risk' || targetTab === 'risk_matrix') setCurrentTab('risk_management');
            else if (targetTab === 'compliance' || targetTab === 'frameworks') setCurrentTab('compliance');
            else if (targetTab === 'controls') setCurrentTab('controls');
            else if (targetTab === 'incidents') setCurrentTab('incidents');
            else if (targetTab === 'assessments' || targetTab === 'dual_brain') setCurrentTab('assessments');
            else if (targetTab === 'approvals' || targetTab === 'audit') setCurrentTab('audit_findings');
            else if (targetTab === 'documents' || targetTab === 'policies') setCurrentTab('policies');
            else if (targetTab === 'reports' || targetTab === 'root_cause') setCurrentTab('reports');
            else if (targetTab === 'admin' || targetTab === 'configuration') setCurrentTab('configuration');
            else setCurrentTab(targetTab);
          }}
        />
      )}

    </div>
  );
}
