import React, { useState } from 'react';
import { 
  Power, 
  Mic, 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Home, 
  Volume2, 
  Volume1, 
  VolumeX, 
  Radio, 
  X, 
  Smartphone, 
  Minimize2, 
  Maximize2 
} from 'lucide-react';
import { tvAudio } from '../../utils/audio';

interface VirtualTVRemoteProps {
  onCommand: (command: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  language: 'hi' | 'en';
}

export const VirtualTVRemote: React.FC<VirtualTVRemoteProps> = ({
  onCommand,
  isOpen,
  onToggle,
  language
}) => {
  const [lastCommand, setLastCommand] = useState<string>('READY');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const send = (cmd: string) => {
    tvAudio.playNav();
    setLastCommand(cmd.toUpperCase());
    onCommand(cmd);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          tvAudio.playSelect();
          onToggle();
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all border border-blue-400/40 group cursor-pointer"
        title="Open On-Screen TV Remote Controller"
      >
        <Smartphone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
        <span>{language === 'hi' ? 'फोन रिमोट खोलें' : 'TV Remote Control'}</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none animate-in fade-in slide-in-from-bottom-6 duration-200">
      
      {/* Remote Frame */}
      <div className="w-64 sm:w-72 rounded-[36px] bg-slate-950/95 backdrop-blur-xl border-2 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-4 flex flex-col items-center">
        
        {/* Top Header: Title, Minimize, Close */}
        <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>TV REMOTE</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                tvAudio.playBack();
                onToggle();
              }}
              className="p-1 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-800"
              title="Close Remote"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Top Row: Power & Mute */}
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <button
                onClick={() => send('power')}
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-red-950/60 border border-slate-800 text-red-500 flex items-center justify-center active:scale-90 transition-all shadow"
                title="TV Power On/Off"
              >
                <Power className="w-4 h-4" />
              </button>

              <button
                onClick={() => send('mic')}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 p-[2px] shadow-lg active:scale-95 transition-all"
                title="Google Voice Search"
              >
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                  <Mic className="w-4 h-4 text-cyan-300" />
                </div>
              </button>

              <button
                onClick={() => send('mute')}
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center active:scale-90 transition-all shadow"
                title="Mute TV"
              >
                <VolumeX className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Android TV Circular D-Pad */}
            <div className="relative w-44 h-44 rounded-full bg-gradient-to-b from-slate-850 to-slate-900 border border-slate-750 shadow-inner flex items-center justify-center mb-3">
              {/* Up */}
              <button
                onClick={() => send('up')}
                className="absolute top-1 w-14 h-9 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
                title="Up"
              >
                <ChevronUp className="w-6 h-6" />
              </button>

              {/* Down */}
              <button
                onClick={() => send('down')}
                className="absolute bottom-1 w-14 h-9 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
                title="Down"
              >
                <ChevronDown className="w-6 h-6" />
              </button>

              {/* Left */}
              <button
                onClick={() => send('left')}
                className="absolute left-1 w-9 h-14 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
                title="Left"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Right */}
              <button
                onClick={() => send('right')}
                className="absolute right-1 w-9 h-14 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
                title="Right"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Center OK */}
              <button
                onClick={() => send('ok')}
                className="w-16 h-16 rounded-full bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-700 text-white font-black text-xs shadow-lg flex items-center justify-center active:scale-90 transition-all hover:border-cyan-400 group"
                title="Select (OK / Enter)"
              >
                <span className="group-hover:text-cyan-300 transition-colors">OK</span>
              </button>
            </div>

            {/* Back, Home, Live TV */}
            <div className="w-full flex items-center justify-around mb-3 px-2">
              <button
                onClick={() => send('back')}
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center active:scale-90 transition-all"
                title="Back"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => send('home')}
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center active:scale-90 transition-all"
                title="Home"
              >
                <Home className="w-4 h-4" />
              </button>
              <button
                onClick={() => send('live')}
                className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center active:scale-90 transition-all"
                title="Live TV"
              >
                <Radio className="w-4 h-4" />
              </button>
            </div>

            {/* Volume & Channel Rockers */}
            <div className="w-full grid grid-cols-2 gap-2 mb-3">
              <div className="bg-slate-900/90 rounded-xl p-1 border border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => send('vol_down')}
                  className="p-1.5 text-slate-400 hover:text-white active:scale-90 transition-transform"
                  title="Vol -"
                >
                  <Volume1 className="w-3.5 h-3.5" />
                </button>
                <span className="text-[9px] font-mono font-bold text-slate-400">VOL</span>
                <button
                  onClick={() => send('vol_up')}
                  className="p-1.5 text-slate-400 hover:text-white active:scale-90 transition-transform"
                  title="Vol +"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-1 border border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => send('ch_down')}
                  className="p-1.5 text-slate-400 hover:text-white active:scale-90 transition-transform"
                  title="CH -"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <span className="text-[9px] font-mono font-bold text-slate-400">CH</span>
                <button
                  onClick={() => send('ch_up')}
                  className="p-1.5 text-slate-400 hover:text-white active:scale-90 transition-transform"
                  title="CH +"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* App Shortcut Buttons */}
            <div className="w-full grid grid-cols-2 gap-1.5 text-[10px] font-bold uppercase tracking-wider">
              <button
                onClick={() => send('app_youtube')}
                className="py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white transition-all active:scale-95 text-center shadow"
              >
                YouTube
              </button>
              <button
                onClick={() => send('app_netflix')}
                className="py-1.5 rounded-lg bg-neutral-900 border border-red-600/40 text-red-500 transition-all active:scale-95 text-center shadow"
              >
                Netflix
              </button>
              <button
                onClick={() => send('app_hotstar')}
                className="py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white transition-all active:scale-95 text-center shadow"
              >
                Hotstar
              </button>
              <button
                onClick={() => send('app_prime')}
                className="py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white transition-all active:scale-95 text-center shadow"
              >
                Prime
              </button>
            </div>

            {/* Live Command Feedback */}
            <div className="w-full mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span>STATUS:</span>
              <span className="text-cyan-400 font-bold">{lastCommand}</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
