import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Bot, 
  X,
  Languages
} from 'lucide-react';
import { Language } from '../types';
import { naturalSpeech, VoiceLanguage } from '../utils/voice';
import { localLlm } from '../utils/localLlm';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigateTab: (tab: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  lang,
  setLang,
  onNavigateTab,
}) => {
  const isAr = lang === 'ar';
  const [voiceLang, setVoiceLang] = useState<VoiceLanguage>(lang === 'ar' ? 'ar' : 'en');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [agentResponse, setAgentResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize Speech Recognition when modal opens
  useEffect(() => {
    if (!isOpen) {
      naturalSpeech.stopListening();
      naturalSpeech.stop();
      setIsListening(false);
      setIsSpeaking(false);
      return;
    }

    const rec = naturalSpeech.initSpeechRecognition(
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          handleVoiceCommand(text);
        }
      },
      (listening) => {
        setIsListening(listening);
      },
      voiceLang
    );

    if (rec) {
      naturalSpeech.startListening();
    }

    return () => {
      naturalSpeech.stopListening();
      naturalSpeech.stop();
    };
  }, [isOpen, voiceLang]);

  // Voice Navigation & Dialogue Parser
  const handleVoiceCommand = async (commandText: string) => {
    const cmd = commandText.toLowerCase().trim();
    setIsProcessing(true);

    // 1. Voice Navigation
    if (cmd.includes('dashboard') || cmd.includes('لوحة') || cmd.includes('الرئيسية')) {
      onNavigateTab('dashboard');
      const reply = isAr ? 'تم الانتقال إلى لوحة القيادة والمراقبة الزمنية.' : 'Navigating to Dashboard overview.';
      await speakReply(reply);
      return;
    }

    if (cmd.includes('brain') || cmd.includes('board') || cmd.includes('دماغ') || cmd.includes('المجلس')) {
      onNavigateTab('dual_brain');
      const reply = isAr ? 'تم فتح غرفة الدماغ الثنائي ومجلس الإدارة الاستشاري.' : 'Opening Dual-Brain & Agentic Board.';
      await speakReply(reply);
      return;
    }

    if (cmd.includes('framework') || cmd.includes('control') || cmd.includes('ضوابط') || cmd.includes('أطر')) {
      onNavigateTab('frameworks');
      const reply = isAr ? 'تم الانتقال إلى مصفوفة الضوابط والأطر التنظيمية.' : 'Opening Regulatory Frameworks & Controls.';
      await speakReply(reply);
      return;
    }

    if (cmd.includes('risk') || cmd.includes('matrix') || cmd.includes('مخاطر') || cmd.includes('مصفوفة')) {
      onNavigateTab('risk_matrix');
      const reply = isAr ? 'تم فتح مصفوفة المخاطر الكامنة والمتبقية.' : 'Opening Customizable Risk Matrix.';
      await speakReply(reply);
      return;
    }

    if (cmd.includes('doc') || cmd.includes('studio') || cmd.includes('وثائق') || cmd.includes('استوديو')) {
      onNavigateTab('documents');
      const reply = isAr ? 'تم فتح استوديو صياغة الوثائق المعتمدة.' : 'Opening Document Studio.';
      await speakReply(reply);
      return;
    }

    if (cmd.includes('approval') || cmd.includes('ledger') || cmd.includes('اعتماد') || cmd.includes('سجل')) {
      onNavigateTab('approvals');
      const reply = isAr ? 'تم الانتقال إلى طابور الاعتماد البشري وسجل البلوكتشين.' : 'Opening Human-in-the-Loop Approval Queue.';
      await speakReply(reply);
      return;
    }

    if (cmd.includes('root') || cmd.includes('fishbone') || cmd.includes('pestle') || cmd.includes('جذري')) {
      onNavigateTab('root_cause');
      const reply = isAr ? 'تم فتح أدوات التحليل الجذري وعظم السمكة.' : 'Opening Strategic Root-Cause Diagnostics.';
      await speakReply(reply);
      return;
    }

    if (cmd.includes('admin') || cmd.includes('إدارية') || cmd.includes('بوابة')) {
      onNavigateTab('admin');
      const reply = isAr ? 'تم فتح البوابة الإدارية وإعدادات البيئة المعزولة.' : 'Opening Administrative Portal.';
      await speakReply(reply);
      return;
    }

    if (cmd.includes('arabic') || cmd.includes('عربي') || cmd.includes('عربية')) {
      setLang('ar');
      setVoiceLang('ar');
      const reply = 'تم التحويل إلى الواجهة باللغة العربية وتفعيل الصوت العربي.';
      await speakReply(reply, 'ar');
      return;
    }

    if (cmd.includes('english') || cmd.includes('إنجليزي') || cmd.includes('انجليزي')) {
      setLang('en');
      setVoiceLang('en');
      const reply = 'Switched interface and speech engine to English.';
      await speakReply(reply, 'en');
      return;
    }

    // 2. Conversational GRC Dialogue via Local LLM
    try {
      const consultResult = await localLlm.consultAgent('CISO', commandText, voiceLang === 'ar' ? 'ar' : 'en');
      const replyText = voiceLang === 'ar' ? consultResult.textAr : consultResult.textEn;
      await speakReply(replyText);
    } catch (e) {
      const fallback = isAr ? 'أنا القوة الوكيلة، كيف يمكنني مساعدتكم في الحوكمة والأمن السيبراني؟' : 'Agent X listening. How may I advise your cybersecurity and compliance program?';
      await speakReply(fallback);
    } finally {
      setIsProcessing(false);
    }
  };

  const speakReply = async (text: string, targetLang?: VoiceLanguage) => {
    setAgentResponse(text);
    setIsSpeaking(true);
    setIsProcessing(false);

    const l = targetLang || voiceLang;
    await naturalSpeech.speak(text, l, {
      pitch: 0.86,
      rate: 0.98,
      onEnd: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="bg-white border-2 border-teal-500 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-5 text-neutral-900 shadow-teal-500/20">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-teal-100">
          <div className="flex items-center gap-3">
            <span className="font-graffiti-special text-2xl tracking-wider graffiti-agent-x-rainbow select-none">
              Agent X
            </span>
            <div>
              <h3 className="text-sm font-black text-neutral-950">
                {isAr ? 'الملاح الصوتي الذكي' : 'Sovereign Voice Commander'}
              </h3>
              <p className="text-[11px] text-teal-800 font-bold">
                {isAr ? 'تحكم كامل ومحادثة بصوت بشري طبيعي رجالي' : 'Hands-free voice navigation with natural human male voice'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-black p-1 rounded-lg border border-teal-200 hover:bg-teal-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Language Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-neutral-700 flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-neutral-600" />
            <span>{isAr ? 'لغة الصوت والتعرف الصوتي:' : 'Voice & Speech Synthesis Language:'}</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {[
              { code: 'ar', label: 'العربية (AR)' },
              { code: 'en', label: 'English (EN)' },
              { code: 'ur', label: 'اردو (UR)' },
              { code: 'de', label: 'Deutsch (DE)' },
              { code: 'zh', label: '中文 (ZH)' },
            ].map((item) => (
              <button
                key={item.code}
                onClick={() => setVoiceLang(item.code as VoiceLanguage)}
                className={`py-1.5 text-xs font-bold rounded-lg border-2 transition-colors ${
                  voiceLang === item.code
                    ? 'bg-neutral-950 text-white border-teal-400 shadow-xs'
                    : 'bg-white text-neutral-850 border-teal-200 hover:bg-emerald-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Animated Soundwave & Mic Centerpiece */}
        <div className="p-6 rounded-xl bg-white border-2 border-teal-400 flex flex-col items-center justify-center space-y-4 shadow-xs">
          
          {/* Circular Pulse Button */}
          <button
            onClick={() => {
              if (isListening) {
                naturalSpeech.stopListening();
                setIsListening(false);
              } else {
                naturalSpeech.startListening();
                setIsListening(true);
              }
            }}
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-md transition-all transform hover:scale-105 ${
              isSpeaking
                ? 'bg-amber-600 text-white ring-8 ring-amber-300/40 animate-pulse'
                : isListening
                ? 'bg-red-600 text-white ring-8 ring-red-400/30'
                : 'bg-neutral-900 text-white hover:bg-black'
            }`}
          >
            {isSpeaking ? (
              <Volume2 className="w-8 h-8" />
            ) : isListening ? (
              <Mic className="w-8 h-8 animate-bounce" />
            ) : (
              <MicOff className="w-8 h-8" />
            )}
          </button>

          {/* Sound waves indicator */}
          <div className="flex items-center gap-1 h-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div 
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isSpeaking
                    ? 'bg-amber-600'
                    : isListening
                    ? 'bg-red-600'
                    : 'bg-neutral-300'
                }`}
                style={{
                  height: isSpeaking || isListening ? `${Math.sin(i + Date.now() / 200) * 12 + 16}px` : '4px'
                }}
              />
            ))}
          </div>

          <p className="text-xs font-bold text-neutral-900">
            {isSpeaking
              ? (isAr ? 'يتحدث الآن بصوت رجالي طبيعي...' : 'Agent X speaking in natural male voice...')
              : isListening
              ? (isAr ? 'الميكروفون نشط.. تحدث الآن...' : 'Listening... Speak your command or query...')
              : (isAr ? 'انقر على الميكروفون لبدء الاستماع' : 'Click microphone to start voice navigation')}
          </p>
        </div>

        {/* Live Transcripts Box */}
        {(transcript || agentResponse) && (
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-white space-y-2 text-xs">
            {transcript && (
              <div>
                <span className="font-bold text-neutral-500 uppercase text-[10px]">
                  {isAr ? 'ما قلته:' : 'You said:'}
                </span>
                <p className="text-neutral-900 font-bold mt-0.5">"{transcript}"</p>
              </div>
            )}
            {agentResponse && (
              <div className="pt-2 border-t border-neutral-200">
                <span className="font-bold text-neutral-900 uppercase text-[10px]">
                  {isAr ? 'استجابة القوة الوكيلة:' : 'Agent X Advisory:'}
                </span>
                <p className="text-neutral-800 leading-relaxed font-medium mt-0.5">{agentResponse}</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Voice Command Triggers */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-bold text-neutral-700">
            {isAr ? 'أمثلة للأوامر الصوتية السريعة (انقر لتجربتها بالصوت):' : 'Sample Voice Navigation Commands (Click to test):'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { en: 'Go to dashboard', ar: 'الانتقال إلى لوحة القيادة' },
              { en: 'Open dual brain', ar: 'فتح غرفة الدماغ الثنائي' },
              { en: 'Open risk matrix', ar: 'عرض مصفوفة المخاطر' },
              { en: 'Check NCA ECC compliance', ar: 'فحص ضوابط الهيئة الوطنية' },
              { en: 'Explain air gap network', ar: 'شرح عزل الشبكات المعزولة' }
            ].map((cmd, i) => (
              <button
                key={i}
                onClick={() => {
                  const txt = isAr ? cmd.ar : cmd.en;
                  setTranscript(txt);
                  handleVoiceCommand(txt);
                }}
                className="text-[11px] font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-200 px-2.5 py-1 rounded-md transition-colors"
              >
                {isAr ? cmd.ar : cmd.en}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
