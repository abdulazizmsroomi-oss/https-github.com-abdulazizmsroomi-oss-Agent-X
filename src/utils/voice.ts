/**
 * Voice & Speech Engine for Agent X:
 * - Natural Human Male Voice Synthesis across multiple languages (AR, EN, UR, DE, ZH)
 * - Deep resonant pitch modulation ensuring authentic, non-robotic executive male timbre
 * - Continuous & On-Demand Speech Recognition for voice navigation & agent dialogue
 */

export type VoiceLanguage = 'en' | 'ar' | 'ur' | 'de' | 'zh';

const LANG_CODE_MAP: Record<VoiceLanguage, string[]> = {
  en: ['en-US', 'en-GB', 'en-AU', 'en-CA', 'en'],
  ar: ['ar-SA', 'ar-AE', 'ar-EG', 'ar-QA', 'ar'],
  ur: ['ur-PK', 'ur-IN', 'ur'],
  de: ['de-DE', 'de-AT', 'de-CH', 'de'],
  zh: ['zh-CN', 'zh-TW', 'zh-HK', 'zh'],
};

// Known preferred high-quality male voices across major platforms (Edge/Chrome/macOS/Windows/Android)
const PREFERRED_MALE_VOICE_KEYWORDS = [
  'tariq', 'naayif', 'hamed', 'salman', 'maged', 'omran', // Arabic male voices
  'guy', 'natural', 'david', 'mark', 'george', 'daniel', 'oliver', 'arthur', 'ryan', 'christopher', 'eric', // English male
  'asad', 'faheem', 'bilal', // Urdu male
  'stefan', 'conrad', 'martin', 'florian', // German male
  'yunxi', 'yunjian', 'yunyang', 'kangkang', // Chinese male
  'male'
];

class NaturalSpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isSpeaking = false;
  private isListening = false;
  private recognition: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  public getAvailableVoices(): SpeechSynthesisVoice[] {
    if (this.voices.length === 0 && this.synth) {
      this.voices = this.synth.getVoices();
    }
    return this.voices;
  }

  /**
   * Finds the best natural human male voice for the target language.
   */
  public getBestMaleVoice(lang: VoiceLanguage): SpeechSynthesisVoice | null {
    const voices = this.getAvailableVoices();
    if (voices.length === 0) return null;

    const targets = LANG_CODE_MAP[lang] || ['en-US'];

    // Filter matching language
    const langVoices = voices.filter(v => 
      targets.some(t => v.lang.toLowerCase().startsWith(t.toLowerCase()))
    );

    if (langVoices.length === 0) {
      // Fallback to any voice in target or default
      return voices[0] || null;
    }

    // Try finding explicit male voice
    const maleMatch = langVoices.find(v => {
      const name = v.name.toLowerCase();
      return PREFERRED_MALE_VOICE_KEYWORDS.some(k => name.includes(k));
    });

    if (maleMatch) return maleMatch;

    // Check for "Natural" or "Google" or "Microsoft" neural voice
    const naturalMatch = langVoices.find(v => 
      v.name.toLowerCase().includes('natural') || 
      v.name.toLowerCase().includes('online') ||
      v.name.toLowerCase().includes('neural')
    );

    return naturalMatch || langVoices[0];
  }

  /**
   * Speaks text using authentic natural human male parameters.
   */
  public speak(
    text: string, 
    lang: VoiceLanguage = 'en', 
    options?: { pitch?: number; rate?: number; onEnd?: () => void; onError?: (err: any) => void }
  ): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        options?.onEnd?.();
        resolve();
        return;
      }

      this.stop(); // Stop previous utterance

      const utterance = new SpeechSynthesisUtterance(text);
      const voice = this.getBestMaleVoice(lang);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = (LANG_CODE_MAP[lang] && LANG_CODE_MAP[lang][0]) || 'en-US';
      }

      // Male timbre acoustic calibration:
      // A resonant fundamental frequency: pitch between 0.82 and 0.92 gives an authoritative, warm human baritone
      utterance.pitch = options?.pitch ?? 0.88;
      // Rate around 0.96 for clear, executive clarity without rushing
      utterance.rate = options?.rate ?? 0.98;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        options?.onEnd?.();
        resolve();
      };

      utterance.onerror = (e) => {
        this.isSpeaking = false;
        options?.onError?.(e);
        resolve();
      };

      try {
        this.synth.speak(utterance);
      } catch (e) {
        this.isSpeaking = false;
        resolve();
      }
    });
  }

  public stop() {
    if (this.synth && this.synth.speaking) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
  }

  public getSpeakingState(): boolean {
    return this.synth ? this.synth.speaking : false;
  }

  /**
   * Initializes browser SpeechRecognition for voice navigation and interaction.
   */
  public initSpeechRecognition(
    onResult: (transcript: string, isFinal: boolean) => void,
    onStatusChange?: (listening: boolean) => void,
    lang: VoiceLanguage = 'en'
  ) {
    if (typeof window === 'undefined') return null;

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn('SpeechRecognition API is not supported in this browser environment.');
      return null;
    }

    try {
      this.recognition = new SpeechRec();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = LANG_CODE_MAP[lang][0] || 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        onStatusChange?.(true);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onStatusChange?.(false);
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript.trim()) {
          onResult(finalTranscript.trim(), true);
        } else if (interimTranscript.trim()) {
          onResult(interimTranscript.trim(), false);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Speech recognition event:', event.error);
        if (event.error !== 'no-speech') {
          this.isListening = false;
          onStatusChange?.(false);
        }
      };

      return this.recognition;
    } catch (e) {
      console.error('Failed to create SpeechRecognition instance', e);
      return null;
    }
  }

  public startListening() {
    if (this.recognition && !this.isListening) {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn('Could not start recognition:', e);
      }
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // already stopped
      }
    }
  }
}

export const naturalSpeech = new NaturalSpeechService();
