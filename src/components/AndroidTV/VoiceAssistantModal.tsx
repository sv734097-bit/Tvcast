import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Search, Sparkles, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMode;
  onExecuteCommand: (command: string) => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  language,
  onExecuteCommand
}) => {
  if (!isOpen) return null;

  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [assistantResponse, setAssistantResponse] = useState<string>('');

  const quickPromptsHindi = [
    'YouTube खोलो',
    'लाइव क्रिकेट और न्यूज़ चलाओ',
    'USB फोन की वीडियो दिखाओ',
    'स्पेस गेम खेलें',
    'नॉर्मल TV को स्मार्ट TV कैसे बनाएं?'
  ];

  const quickPromptsEnglish = [
    'Open YouTube TV',
    'Watch Live Sports & News',
    'Open USB Phone Media Player',
    'Play Retro Space Game',
    'How to turn normal TV into Android TV?'
  ];

  const prompts = language === 'hi' ? quickPromptsHindi : quickPromptsEnglish;

  // Web Speech Recognition
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = language === 'hi' ? 'hi-IN' : 'en-US';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onend = () => {
      setIsListening(false);
    };

    if (isListening) {
      try {
        recognition.start();
      } catch {}
    } else {
      try {
        recognition.stop();
      } catch {}
    }

    return () => {
      try {
        recognition.stop();
      } catch {}
    };
  }, [isListening, language]);

  const speakResponse = (msg: string) => {
    try {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(msg);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch {}
  };

  const handleCommandSubmit = (text: string) => {
    if (!text.trim()) return;
    tvAudio.playSelect();
    const query = text.toLowerCase();

    if (query.includes('youtube') || query.includes('यूट्यूब')) {
      const resp = language === 'hi' ? 'YouTube TV खोला जा रहा है...' : 'Launching YouTube TV...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('youtube'), 900);
    } else if (query.includes('netflix') || query.includes('नेटफ्लिक्स')) {
      const resp = language === 'hi' ? 'Netflix 4K TV खोला जा रहा है...' : 'Opening Netflix 4K TV...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('netflix'), 900);
    } else if (query.includes('hotstar') || query.includes('हॉटस्टार') || query.includes('cricket') || query.includes('क्रिकेट')) {
      const resp = language === 'hi' ? 'JioHotstar लाइव क्रिकेट खोला जा रहा है...' : 'Opening JioHotstar Live Sports...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('hotstar'), 900);
    } else if (query.includes('prime') || query.includes('प्राइम') || query.includes('amazon')) {
      const resp = language === 'hi' ? 'Amazon Prime Video खोला जा रहा है...' : 'Opening Amazon Prime Video...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('prime'), 900);
    } else if (query.includes('browser') || query.includes('chrome') || query.includes('इंटरनेट')) {
      const resp = language === 'hi' ? 'Chrome TV ब्राउज़र खोला जा रहा है...' : 'Opening Chrome TV Browser...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('browser'), 900);
    } else if (query.includes('live') || query.includes('लाइव') || query.includes('news')) {
      const resp = language === 'hi' ? 'लाइव टीवी चैनल्स शुरू किए जा रहे हैं...' : 'Switching to Live TV Channels...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('live'), 900);
    } else if (query.includes('usb') || query.includes('phone') || query.includes('स्टोरेज') || query.includes('मीडिया')) {
      const resp = language === 'hi' ? 'फोन USB मीडिया हब खोला जा रहा है...' : 'Opening Phone USB Media Hub...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('usb'), 900);
    } else if (query.includes('game') || query.includes('गेम') || query.includes('space') || query.includes('खेल')) {
      const resp = language === 'hi' ? 'Android TV स्पेस गेम शुरू हो रहा है...' : 'Launching Space Defender TV Game...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('game'), 900);
    } else if (query.includes('smart tv') || query.includes('guide') || query.includes('गाइड') || query.includes('नॉर्मल')) {
      const resp = language === 'hi' ? 'USB से TV कनेक्ट करने का पूरा गाइड खोला जा रहा है...' : 'Opening USB to Smart TV Setup Guide...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('guide'), 900);
    } else if (query.includes('setting') || query.includes('सेटिंग') || query.includes('network') || query.includes('display')) {
      const resp = language === 'hi' ? 'Android TV सेटिंग्स मेनू खोला जा रहा है...' : 'Opening Android TV Settings Menu...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('settings'), 900);
    } else if (query.includes('download') || query.includes('डाउनलोड') || query.includes('install') || query.includes('इंस्टॉल')) {
      const resp = language === 'hi' ? 'ऐप डाउनलोड व इंस्टॉलेशन मेनू खोला जा रहा है...' : 'Opening Download & Installation Menu...';
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('download'), 900);
    } else {
      const resp = language === 'hi' 
        ? `"${text}" के लिए Android TV पर खोज की जा रही है...` 
        : `Searching Android TV catalog for "${text}"...`;
      setAssistantResponse(resp);
      speakResponse(resp);
      setTimeout(() => onExecuteCommand('movies'), 900);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl relative animate-in fade-in slide-in-from-bottom-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            tvAudio.playBack();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Google 4 Dots Voice Animation */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3.5 h-3.5 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '450ms' }} />
          <span className="text-xs font-semibold text-slate-300 ml-2 tracking-wide font-['Outfit']">
            Google Assistant · Android TV
          </span>
        </div>

        {/* Assistant Title */}
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-['Outfit']">
          {language === 'hi' ? 'आप क्या देखना या चलाना चाहते हैं?' : 'Hi, how can I help you today?'}
        </h3>
        <p className="text-xs md:text-sm text-slate-400 mb-6">
          {language === 'hi' 
            ? 'बोलें या नीचे दिए गए सुझावों में से चुनें। टीवी को फोन से आसानी से कंट्रोल करें।' 
            : 'Speak into your microphone or pick a command below to control your TV.'}
        </p>

        {/* Input & Mic Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCommandSubmit(transcript);
            }}
            placeholder={language === 'hi' ? 'उदा: YouTube खोलो, लाइव टीवी चलाओ...' : 'e.g. Open YouTube, Play live TV, USB storage...'}
            className="w-full bg-slate-950 border border-slate-700 text-white rounded-2xl pl-12 pr-28 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />

          {/* Right Action buttons */}
          <div className="absolute right-2.5 top-2.5 flex items-center gap-1.5">
            <button
              onClick={() => setIsListening(!isListening)}
              className={`p-2 rounded-xl transition-all ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              title={isListening ? 'Listening...' : 'Start Voice Listening'}
            >
              {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleCommandSubmit(transcript)}
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              title="Submit Command"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status or Assistant Response */}
        {assistantResponse && (
          <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-500/40 text-cyan-300 text-xs font-medium mb-5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{assistantResponse}</span>
          </div>
        )}

        {/* Quick Voice Chips */}
        <div>
          <span className="text-xs text-slate-400 font-medium block mb-2.5">
            {language === 'hi' ? 'लोकप्रिय वॉइस कमांड्स:' : 'Popular Voice Shortcuts:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTranscript(p);
                  handleCommandSubmit(p);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>{p}</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
