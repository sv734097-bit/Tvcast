import React from 'react';
import { Power } from 'lucide-react';
import { tvAudio } from '../../utils/audio';

interface TVStandbyScreenProps {
  onWake: () => void;
  language: 'hi' | 'en';
}

export const TVStandbyScreen: React.FC<TVStandbyScreenProps> = ({
  onWake,
  language
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-300">
      
      {/* Subtle Ambient pulse */}
      <div className="w-20 h-20 rounded-full bg-red-950/40 border border-red-500/30 flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
        <Power className="w-8 h-8 text-red-500 animate-pulse" />
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-slate-300 mb-2 font-['Outfit']">
        {language === 'hi' ? 'टीवी स्टैंडबाय मोड में है' : 'Android TV in Standby Mode'}
      </h2>

      <p className="text-xs md:text-sm text-slate-500 max-w-sm mb-8 leading-relaxed">
        {language === 'hi'
          ? 'स्क्रीन को वापस चालू करने के लिए फोन रिमोट का लाल पावर बटन या नीचे दिए गए बटन को दबाएं।'
          : 'Press the red Power button on your phone remote or click below to wake your TV.'}
      </p>

      <button
        onClick={() => {
          tvAudio.playSelect();
          onWake();
        }}
        className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-xl"
      >
        <Power className="w-4 h-4 text-emerald-400" />
        <span>{language === 'hi' ? 'टीवी ऑन करें (Turn On TV)' : 'Turn On TV Screen'}</span>
      </button>

      {/* Red Standby LED light at bottom bezel */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] text-slate-600 font-mono">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.9)] animate-pulse" />
        <span>STANDBY LED</span>
      </div>

    </div>
  );
};
