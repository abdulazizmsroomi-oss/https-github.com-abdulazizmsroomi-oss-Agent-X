import React, { useState } from 'react';
import { 
  Brain, 
  Volume2, 
  Send, 
  Users, 
  FileText, 
  CheckCircle, 
  CheckCircle2,
  ChevronRight,
  Shield,
  Square,
  Play
} from 'lucide-react';
import { Language, AgentPersona, AgentRole, BoardMeetingSession, DocumentItem } from '../types';
import { AGENT_PERSONAS } from '../data/agentData';
import { localLlm, AgentConsultResponse } from '../utils/localLlm';
import { naturalSpeech, VoiceLanguage } from '../utils/voice';

interface DualBrainViewProps {
  lang: Language;
  boardMeeting: BoardMeetingSession;
  onUpdateBoardMeeting: (session: BoardMeetingSession) => void;
  onAddDocument: (doc: DocumentItem) => void;
  onAddLedgerBlock: (action: string, entityId: string, details: string) => void;
}

export const DualBrainView: React.FC<DualBrainViewProps> = ({
  lang,
  boardMeeting,
  onUpdateBoardMeeting,
  onAddDocument,
  onAddLedgerBlock
}) => {
  const isAr = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'hemispheres' | 'consultation' | 'board_room'>('hemispheres');
  
  // 1-on-1 consultation state
  const [selectedAgentRole, setSelectedAgentRole] = useState<AgentRole>('CISO');
  const [userQuery, setUserQuery] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [consultHistory, setConsultHistory] = useState<{
    role: AgentRole;
    query: string;
    response: AgentConsultResponse;
  }[]>([]);

  // Board meeting live playback state
  const [isMeetingPlaying, setIsMeetingPlaying] = useState(false);
  const [activeSpeakingAgent, setActiveSpeakingAgent] = useState<AgentRole | null>(null);

  const selectedAgent = AGENT_PERSONAS.find(p => p.role === selectedAgentRole) || AGENT_PERSONAS[0];
  const rightHemisphereAgents = AGENT_PERSONAS.filter(p => p.hemisphere === 'right');
  const leftHemisphereAgents = AGENT_PERSONAS.filter(p => p.hemisphere === 'left');

  // Handle 1-on-1 Agent Consultation
  const handleConsult = async () => {
    if (!userQuery.trim() || isConsulting) return;
    setIsConsulting(true);

    try {
      const response = await localLlm.consultAgent(selectedAgentRole, userQuery, lang);
      setConsultHistory(prev => [
        { role: selectedAgentRole, query: userQuery, response },
        ...prev
      ]);

      // Speak response in natural male voice
      const speechText = isAr ? response.textAr : response.textEn;
      const voiceLang: VoiceLanguage = isAr ? 'ar' : 'en';
      naturalSpeech.speak(speechText, voiceLang, {
        pitch: selectedAgent.voiceProfile.voicePitch,
        rate: selectedAgent.voiceProfile.voiceRate
      });

      setUserQuery('');
    } catch (e) {
      console.error(e);
    } finally {
      setIsConsulting(false);
    }
  };

  // Play Board Meeting Session sequentially
  const handlePlayBoardMeeting = async () => {
    if (isMeetingPlaying) {
      naturalSpeech.stop();
      setIsMeetingPlaying(false);
      setActiveSpeakingAgent(null);
      return;
    }

    setIsMeetingPlaying(true);
    for (const item of boardMeeting.transcripts) {
      setActiveSpeakingAgent(item.agentRole);
      const persona = AGENT_PERSONAS.find(p => p.role === item.agentRole);
      const textToSpeak = isAr ? item.speechAr : item.speechEn;
      const voiceLang: VoiceLanguage = isAr ? 'ar' : 'en';

      await naturalSpeech.speak(textToSpeak, voiceLang, {
        pitch: persona?.voiceProfile.voicePitch ?? 0.86,
        rate: persona?.voiceProfile.voiceRate ?? 0.96
      });
    }
    setIsMeetingPlaying(false);
    setActiveSpeakingAgent(null);
  };

  // Generate & Sign MOM Document
  const handleGenerateMOM = () => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const momDoc: DocumentItem = {
      id: `doc-mom-${Date.now().toString(36)}`,
      type: 'MOM',
      titleEn: `Minutes of Meeting (MOM): ${boardMeeting.titleEn}`,
      titleAr: `محضر اجتماع رسمي (MOM): ${boardMeeting.titleAr}`,
      category: 'Governance & Audit Trail',
      version: '1.0',
      createdAt: timestamp,
      authorAgent: 'GOVERNANCE_MANAGER',
      contentEn: `MINUTES OF EXECUTIVE AGENTIC BOARD MEETING (MOM)
SESSION ID: ${boardMeeting.id}
DATE: ${boardMeeting.scheduledDate}
STATUS: UNANIMOUSLY APPROVED BY AGENTIC FORCE

AGENDA:
${boardMeeting.agendaEn.map((a, i) => `${i + 1}. ${a}`).join('\n')}

DELIBERATIONS & TRANSCRIPTS:
${boardMeeting.transcripts.map(t => `[${t.agentRole}] (${t.timestamp}): ${t.speechEn} (Vote: ${t.motionVote})`).join('\n\n')}

CONCLUSIONS & DIRECTIVES:
${boardMeeting.conclusionsEn}

ROUTING: Formally submitted to Executive Human-in-the-Loop approval queue for final digital signature.`,
      contentAr: `محضر اجتماع مجلس الإدارة الاستشاري للقوة الوكيلة (MOM)
رقم الجلسة: ${boardMeeting.id}
التاريخ: ${boardMeeting.scheduledDate}
الحالة: إقرار جماعي من القوة الوكيلة

جدول الأعمال:
${boardMeeting.agendaAr.map((a, i) => `${i + 1}. ${a}`).join('\n')}

المداولات ونصوص المداخلات:
${boardMeeting.transcripts.map(t => `[${t.agentRole}] (${t.timestamp}): ${t.speechAr} (التصويت: ${t.motionVote})`).join('\n\n')}

القرارات والتوجيهات:
${boardMeeting.conclusionsAr}

المسار: رفع المحضر رسمياً لطابور الاعتماد البشري للتوقيع الرقمي للرئيس التنفيذي.`,
      status: 'pending_c_level',
      approvalSignatures: [],
      documentHash: `mom_${Date.now().toString(16)}`
    };

    onAddDocument(momDoc);
    onAddLedgerBlock(
      'MOM_GENERATED_BY_AGENTIC_BOARD',
      momDoc.id,
      `Minutes of Meeting generated and queued for human cryptographic sign-off.`
    );
    setMomSuccessNotice(isAr ? 'تم إنشاء محضر الاجتماع (MOM) بنجاح وإرساله لطابور الاعتماد البشري!' : 'MOM generated successfully and routed to Human Approval Queue!');
    setTimeout(() => setMomSuccessNotice(null), 5000);
  };

  const [momSuccessNotice, setMomSuccessNotice] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      
      {/* MOM Success Notification Banner */}
      {momSuccessNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-400 text-emerald-900 dark:text-emerald-200 flex items-center justify-between text-xs font-bold shadow-md animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{momSuccessNotice}</span>
          </div>
          <button 
            onClick={() => setMomSuccessNotice(null)} 
            className="text-xs px-2 py-0.5 rounded bg-emerald-200/60 dark:bg-emerald-800 text-emerald-950 dark:text-white"
          >
            {isAr ? 'إغلاق' : 'Dismiss'}
          </button>
        </div>
      )}

      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-teal-600 dark:text-cyan-400" />
            <span className="text-xs font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
              {isAr ? 'الهندسة الإدراكية للقوة الوكيلة' : 'Dual-Hemisphere Agentic Architecture'}
            </span>
          </div>
          <h1 className="text-xl font-black tracking-tight text-neutral-950 dark:text-white mt-2">
            {isAr ? 'الدماغ الثنائي وهيئة المستشارين المستقلين' : 'Cognitive Dual-Brain & Advisory Board'}
          </h1>
          <p className="text-xs font-semibold text-neutral-700 dark:text-slate-300 mt-0.5">
            {isAr 
              ? 'توزيع استشاري متكامل بين الدماغ الأيمن (الاستراتيجي والتوجيهي) والدماغ الأيسر (التنفيذي والتدقيقي) مع تشغيل محلي بالكامل بدون إنترنت.'
              : 'Autonomous cognitive division: Right hemisphere (Strategy & Governance) and Left hemisphere (Execution & Audit) operating 100% offline.'}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 bg-emerald-50/50 dark:bg-slate-900 p-1 rounded-lg border-2 border-teal-300 dark:border-teal-500/50">
          <button
            onClick={() => setActiveTab('hemispheres')}
            className={`px-3 py-1.5 text-xs font-black rounded-md transition-colors ${
              activeTab === 'hemispheres'
                ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black shadow-xs border border-teal-400'
                : 'text-neutral-800 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800'
            }`}
          >
            {isAr ? 'خريطة نصفي الدماغ' : 'Hemisphere Map'}
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className={`px-3 py-1.5 text-xs font-black rounded-md transition-colors ${
              activeTab === 'consultation'
                ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black shadow-xs border border-teal-400'
                : 'text-neutral-800 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800'
            }`}
          >
            {isAr ? 'استشارة فردية ١:١' : '1-on-1 Consultation'}
          </button>
          <button
            onClick={() => setActiveTab('board_room')}
            className={`px-3 py-1.5 text-xs font-black rounded-md transition-colors ${
              activeTab === 'board_room'
                ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black shadow-xs border border-teal-400'
                : 'text-neutral-800 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-emerald-100 dark:hover:bg-slate-800'
            }`}
          >
            {isAr ? 'غرفة اجتماع المجلس' : 'Board Room & MOM'}
          </button>
        </div>
      </div>

      {/* 1. HEMISPHERE MAP TAB */}
      {activeTab === 'hemispheres' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Right Hemisphere (Strategic & Advisory) */}
          <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b-2 border-teal-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                  {isAr ? 'الدماغ الأيمن: الاستراتيجية والحوكمة' : 'Right Hemisphere: Strategy & Governance'}
                </span>
                <h3 className="text-base font-black text-neutral-950 dark:text-white mt-1.5">
                  {isAr ? 'القيادة الاستشارية والقرارات التوجيهية' : 'Executive Officers & Strategic Counsel'}
                </h3>
              </div>
              <Brain className="w-6 h-6 text-teal-600 dark:text-cyan-400" />
            </div>

            <p className="text-xs font-semibold text-neutral-700 dark:text-slate-300">
              {isAr 
                ? 'يختص بالرؤية الاستراتيجية الشاملة، مواثيق مجالس الإدارة، نمذجة المخاطر الكامنة، صياغة السياسات، واعتماد هيكلية الدفاع السيبراني.'
                : 'Formulates enterprise threat postures, Board charters, quantitative risk models, corporate policies, and cybersecurity roadmaps.'}
            </p>

            <div className="space-y-3">
              {rightHemisphereAgents.map((agent) => (
                <div 
                  key={agent.role}
                  className="p-3.5 rounded-lg border-2 border-teal-200 dark:border-teal-500/30 bg-white dark:bg-[#080e1b] hover:border-teal-400 dark:hover:border-cyan-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-neutral-950 dark:text-white">
                        {isAr ? agent.nameAr : agent.nameEn}
                      </span>
                      <span className="text-neutral-400 mx-1.5">·</span>
                      <span className="text-xs text-neutral-800 dark:text-teal-400 font-bold">
                        {agent.role}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedAgentRole(agent.role);
                        setActiveTab('consultation');
                      }}
                      className="text-[11px] font-bold text-teal-700 dark:text-cyan-400 hover:underline flex items-center gap-0.5"
                    >
                      <span>{isAr ? 'استشارة' : 'Consult'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs font-medium text-neutral-600 dark:text-slate-400 mt-1">
                    {isAr ? agent.specializationAr : agent.specializationEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Left Hemisphere (Operational, Technical & Audit) */}
          <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between pb-3 border-b-2 border-teal-100 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                  {isAr ? 'الدماغ الأيسر: التنفيذ والتدقيق' : 'Left Hemisphere: Execution & Audit'}
                </span>
                <h3 className="text-base font-black text-neutral-950 dark:text-white mt-1.5">
                  {isAr ? 'التدابير الفنية وفحص الأدلة بالرؤية الحاسوبية' : 'Technical Execution, Compliance & Audit'}
                </h3>
              </div>
              <Brain className="w-6 h-6 text-teal-600 dark:text-cyan-400" />
            </div>

            <p className="text-xs font-semibold text-neutral-700 dark:text-slate-300">
              {isAr 
                ? 'يختص بتطبيق الضوابط الميدانية، فحص الأدلة بالرؤية الحاسوبية، إدارة دورة المشاريع PDCA، ومطابقة الأنظمة التنظيمية الصارمة.'
                : 'Directly executes technical controls, scans evidence using Computer Vision, enforces regulatory mandates, and audits conformance.'}
            </p>

            <div className="space-y-3">
              {leftHemisphereAgents.map((agent) => (
                <div 
                  key={agent.role}
                  className="p-3.5 rounded-lg border-2 border-teal-200 dark:border-teal-500/30 bg-white dark:bg-[#080e1b] hover:border-teal-400 dark:hover:border-cyan-400 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-neutral-950 dark:text-white">
                        {isAr ? agent.nameAr : agent.nameEn}
                      </span>
                      <span className="text-neutral-400 mx-1.5">·</span>
                      <span className="text-xs text-neutral-800 dark:text-teal-400 font-bold">
                        {agent.role}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedAgentRole(agent.role);
                        setActiveTab('consultation');
                      }}
                      className="text-[11px] font-bold text-teal-700 dark:text-cyan-400 hover:underline flex items-center gap-0.5"
                    >
                      <span>{isAr ? 'استشارة' : 'Consult'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs font-medium text-neutral-600 dark:text-slate-400 mt-1">
                    {isAr ? agent.specializationAr : agent.specializationEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 2. 1-ON-1 CONSULTATION TAB */}
      {activeTab === 'consultation' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Agent Picker Sidebar */}
          <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-4 shadow-xs transition-colors">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-cyan-300 mb-3">
              {isAr ? 'اختر المستشار الوكيل' : 'Select Consulting Officer'}
            </h3>
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
              {AGENT_PERSONAS.map((agent) => (
                <button
                  key={agent.role}
                  onClick={() => setSelectedAgentRole(agent.role)}
                  className={`w-full text-left p-2.5 rounded-lg border-2 flex items-center justify-between transition-colors ${
                    selectedAgentRole === agent.role
                      ? 'bg-neutral-950 dark:bg-teal-500 text-white dark:text-black border-teal-400 font-bold'
                      : 'bg-white dark:bg-[#080e1b] border-teal-200 dark:border-teal-500/30 hover:bg-emerald-50 dark:hover:bg-slate-800 text-neutral-850 dark:text-slate-200'
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold">
                      {isAr ? agent.nameAr : agent.nameEn}
                    </p>
                    <p className={`text-[11px] ${selectedAgentRole === agent.role ? 'text-teal-200 dark:text-black/80' : 'text-neutral-500 dark:text-slate-400'}`}>
                      {isAr ? agent.titleAr : agent.titleEn}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold ${selectedAgentRole === agent.role ? 'text-white dark:text-black' : 'text-neutral-600 dark:text-slate-400'}`}>
                    {agent.role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Consultation Dialogue Area */}
          <div className="lg:col-span-2 bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs flex flex-col h-[600px] transition-colors">
            
            {/* Agent Bio Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neutral-900 dark:bg-cyan-500/20 dark:border dark:border-cyan-400 text-white dark:text-cyan-300 flex items-center justify-center font-bold text-sm">
                  {selectedAgent.role.substring(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-950 dark:text-white">
                    {isAr ? selectedAgent.nameAr : selectedAgent.nameEn}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-slate-400 font-medium">
                    {isAr ? selectedAgent.titleAr : selectedAgent.titleEn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-neutral-800 dark:text-cyan-300 bg-neutral-100 dark:bg-cyan-950/60 px-2 py-0.5 rounded border border-neutral-300 dark:border-cyan-500/40">
                  {isAr ? 'صوت طبيعي رجالي' : 'Natural Male Voice Ready'}
                </span>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {consultHistory.length === 0 ? (
                <div className="text-center py-16 space-y-2">
                  <Brain className="w-8 h-8 text-neutral-400 dark:text-slate-600 mx-auto" />
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">
                    {isAr 
                      ? `اطرح أي استفسار حول الأنظمة والضوابط على ${selectedAgent.nameAr}` 
                      : `Ask ${selectedAgent.nameEn} any question about GRC, frameworks, or risk.`}
                  </p>
                  <p className="text-xs text-neutral-600 dark:text-slate-400 font-medium">
                    {isAr 
                      ? 'يمكنك الكتابة أو استخدام الأوامر الصوتية باللغات العربية والإنجليزية والأوردو' 
                      : 'Supports English, Arabic, Urdu, German, and Chinese voice synthesis.'}
                  </p>
                </div>
              ) : (
                consultHistory.map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    {/* User Query */}
                    <div className="flex justify-end">
                      <div className="max-w-lg bg-neutral-100 dark:bg-slate-800 text-neutral-900 dark:text-slate-100 text-xs p-3.5 rounded-xl rounded-tr-none font-semibold border border-neutral-200 dark:border-slate-700">
                        {item.query}
                      </div>
                    </div>

                    {/* Agent Response */}
                    <div className="flex justify-start">
                      <div className="max-w-xl bg-white dark:bg-[#080e1b] border border-neutral-300 dark:border-teal-500/40 text-neutral-900 dark:text-slate-100 text-xs p-4 rounded-xl rounded-tl-none space-y-3 shadow-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-neutral-950 dark:text-cyan-300">
                            {isAr ? selectedAgent.nameAr : selectedAgent.nameEn}
                          </span>
                          <button
                            onClick={() => {
                              const t = isAr ? item.response.textAr : item.response.textEn;
                              naturalSpeech.speak(t, isAr ? 'ar' : 'en', {
                                pitch: selectedAgent.voiceProfile.voicePitch,
                                rate: selectedAgent.voiceProfile.voiceRate
                              });
                            }}
                            className="p-1 text-neutral-800 dark:text-slate-200 hover:text-black dark:hover:text-white rounded border border-neutral-300 dark:border-slate-700 hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors"
                            title={isAr ? 'الاستماع للصوت البشري' : 'Listen with natural male voice'}
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="leading-relaxed font-medium text-neutral-800 dark:text-slate-200">
                          {isAr ? item.response.textAr : item.response.textEn}
                        </p>

                        {item.response.frameworkReferences.length > 0 && (
                          <div className="pt-2 border-t border-neutral-200 dark:border-slate-800 flex flex-wrap gap-1.5">
                            {item.response.frameworkReferences.map((ref, rIdx) => (
                              <span key={rIdx} className="text-[10px] bg-neutral-100 dark:bg-slate-800 text-neutral-900 dark:text-teal-300 font-bold px-2 py-0.5 rounded border border-neutral-300 dark:border-teal-500/30">
                                {ref}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Bar */}
            <div className="pt-3 border-t border-neutral-200 dark:border-slate-800 flex items-center gap-2">
              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleConsult()}
                placeholder={isAr ? `اسأل ${selectedAgent.nameAr} عن الضوابط أو المخاطر أو مواءمة الأنظمة...` : `Ask ${selectedAgent.nameEn} about compliance, risk, or frameworks...`}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
              <button
                onClick={handleConsult}
                disabled={isConsulting || !userQuery.trim()}
                className="px-4 py-2.5 bg-neutral-900 dark:bg-teal-500 hover:bg-black dark:hover:bg-teal-400 disabled:opacity-50 text-white dark:text-black rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isAr ? 'إرسال' : 'Consult'}</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* 3. BOARD ROOM TAB */}
      {activeTab === 'board_room' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0c1527] border-2 border-teal-500 dark:border-cyan-400 rounded-xl p-5 shadow-xs transition-colors">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b-2 border-teal-100 dark:border-slate-800">
              <div>
                <span className="text-xs font-black text-teal-900 dark:text-cyan-300 bg-teal-50 dark:bg-cyan-950/70 px-2 py-0.5 rounded border border-teal-300 dark:border-cyan-500/50">
                  {isAr ? 'جلسة مجلس الإدارة الاستشاري للقوة الوكيلة' : 'Executive Agentic Board Session'}
                </span>
                <h2 className="text-lg font-black text-neutral-950 dark:text-white mt-1.5">
                  {isAr ? boardMeeting.titleAr : boardMeeting.titleEn}
                </h2>
                <p className="text-xs font-semibold text-neutral-700 dark:text-slate-300 mt-1">
                  {isAr ? `الموعد: ${boardMeeting.scheduledDate}` : `Session Date: ${boardMeeting.scheduledDate}`} · {isAr ? 'الحالة: تصويت بالإجماع' : 'Status: Unanimous Motion Passed'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayBoardMeeting}
                  className={`px-3.5 py-2 text-xs font-bold rounded-lg border flex items-center gap-2 transition-colors ${
                    isMeetingPlaying
                      ? 'bg-amber-100 text-amber-950 border-amber-300'
                      : 'bg-white dark:bg-[#080e1b] text-neutral-900 dark:text-slate-100 border-neutral-300 dark:border-slate-700 hover:bg-neutral-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {isMeetingPlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isMeetingPlaying ? (isAr ? 'إيقاف الاستماع' : 'Stop Audio') : (isAr ? 'الاستماع لمداولات المجلس' : 'Listen to Deliberations')}</span>
                </button>

                <button
                  onClick={handleGenerateMOM}
                  className="px-3.5 py-2 text-xs font-bold rounded-lg bg-neutral-900 dark:bg-teal-500 hover:bg-black dark:hover:bg-teal-400 text-white dark:text-black flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isAr ? 'توليد واعتماد محضر الاجتماع (MOM)' : 'Generate & Queue MOM'}</span>
                </button>
              </div>
            </div>

            {/* Agenda Topics */}
            <div className="py-4 border-b border-neutral-200 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-slate-300 mb-2">
                {isAr ? 'بنود جدول أعمال الجلسة' : 'Session Agenda Items'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(isAr ? boardMeeting.agendaAr : boardMeeting.agendaEn).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-neutral-800 dark:text-slate-200 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Board Members Deliberation Transcripts */}
            <div className="pt-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-slate-300">
                {isAr ? 'المداخلات والتصويت الرسمي للأعضاء' : 'Officer Deliberations & Official Voting'}
              </h4>

              <div className="space-y-3">
                {boardMeeting.transcripts.map((t) => {
                  const persona = AGENT_PERSONAS.find(p => p.role === t.agentRole);
                  const isSpeakingThis = activeSpeakingAgent === t.agentRole;

                  return (
                    <div 
                      key={t.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isSpeakingThis 
                          ? 'bg-neutral-100 dark:bg-slate-800 border-teal-500 ring-2 ring-teal-500'
                          : 'bg-white dark:bg-[#080e1b] border-neutral-200 dark:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-cyan-500/20 text-white dark:text-cyan-300 flex items-center justify-center font-bold text-xs border border-transparent dark:border-cyan-400/40">
                            {t.agentRole.substring(0, 2)}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-neutral-950 dark:text-white">
                              {isAr ? persona?.nameAr : persona?.nameEn}
                            </span>
                            <span className="text-[11px] text-neutral-500 dark:text-slate-400 mx-1.5 font-medium">
                              ({isAr ? persona?.titleAr : persona?.titleEn})
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-neutral-500 dark:text-slate-400 font-mono font-bold">
                            {t.timestamp}
                          </span>
                          <span className="text-[10px] font-bold text-neutral-900 dark:text-emerald-300 bg-neutral-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-neutral-300 dark:border-emerald-500/40">
                            {isAr ? `التصويت: مع القرار (${t.motionVote})` : `VOTE: ${t.motionVote}`}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-800 dark:text-slate-200 leading-relaxed font-medium">
                        {isAr ? t.speechAr : t.speechEn}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Conclusions Resolution */}
              <div className="mt-4 p-4 rounded-xl bg-neutral-50 dark:bg-[#080e1b] border border-neutral-300 dark:border-teal-500/40 space-y-1">
                <span className="text-xs font-bold text-neutral-950 dark:text-cyan-300">
                  {isAr ? 'القرار الختامي للمجلس' : 'Final Board Resolution & Direction'}
                </span>
                <p className="text-xs text-neutral-800 dark:text-slate-200 leading-relaxed font-medium">
                  {isAr ? boardMeeting.conclusionsAr : boardMeeting.conclusionsEn}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
