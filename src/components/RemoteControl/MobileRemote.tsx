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
  VolumeX, 
  Volume1, 
  Radio, 
  Tv, 
  Sparkles,
  Wifi
} from 'lucide-react';
import { TVTab, LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface MobileRemoteProps {
  onCommand: (command: string, extra?: unknown) => void;
  language: LanguageMode;
  onSwitchToTV: () => void;
  usbConnected: boolean;
  currentTab?: TVTab;
  tvVolume?: number;
  isMuted?: boolean;
  isStandby?: boolean;
}

export const MobileRemote: React.FC<MobileRemoteProps> = ({
  onCommand,
  language,
  onSwitchToTV,
  usbConnected,
  currentTab = 'home',
  tvVolume = 80,
  isMuted = false,
  isStandby = false
}) => {
  const [pairingCode] = useState<string>('7842');
  const [lastAction, setLastAction] = useState<string>('Ready');

  const send = (cmd: string, extra?: unknown) => {
    tvAudio.playNav();
    setLastAction(cmd.toUpperCase());
    onCommand(cmd, extra);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      
      {/* Top Banner Notice */}
      <div className="max-w-4xl mx-auto mb-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <Wifi className="w-3.5 h-3.5 animate-pulse" />
            <span>{language === 'hi' ? 'स्मार्टफोन रिमोट TV से कनेक्टेड है (Bluetooth & USB Link)' : 'Smartphone Remote Linked to TV (Dual Screen Active)'}</span>
          </div>
          <p className="text-xs text-slate-400">
            {language === 'hi' 
              ? 'बटन दबाते ही दाईं तरफ टीवी स्क्रीन पर लाइव बदलाव देखें।' 
              : 'Press any remote button below and watch the Live TV screen respond immediately.'}
          </p>
        </div>

        <button
          onClick={onSwitchToTV}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0"
        >
          <Tv className="w-4 h-4" />
          <span>{language === 'hi' ? 'फुल TV स्क्रीन पर जाएं' : 'Full TV Screen Mode'}</span>
        </button>
      </div>

      {/* Main Dual Area: TV Screen Monitor on Left + Remote Controller on Right */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* TV Screen Live Mirror Monitor (Cols 1-7 on desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full rounded-[28px] p-3 bg-gradient-to-b from-slate-800 via-slate-900 to-black border-4 border-slate-700 shadow-2xl relative">
            
            {/* TV Screen Bezel & Aspect Ratio */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex flex-col justify-between p-4 border border-slate-800">
              
              {/* If Standby / Power Off */}
              {isStandby ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
                  <Power className="w-10 h-10 text-red-500 mb-2 animate-pulse" />
                  <span className="text-sm font-bold text-slate-400">TV STANDBY MODE</span>
                  <span className="text-[11px] text-slate-600 mt-1">Press Power button on remote to turn on</span>
                </div>
              ) : (
                <>
                  {/* Top Bar of TV Mirror */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-black text-[10px] font-['Outfit']">
                        Android TV 14
                      </span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700">
                        TAB: {currentTab.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded">
                      <Volume2 className="w-3 h-3 text-cyan-400" />
                      <span>{isMuted ? 'MUTED' : `VOL ${tvVolume}%`}</span>
                    </div>
                  </div>

                  {/* Center of TV Mirror - Tab Preview */}
                  <div className="flex-1 flex flex-col items-center justify-center my-3 relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 p-4 border border-blue-900/30 text-center">
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-1">
                      {currentTab === 'home' && '★ ANDROID TV HOME SPOTLIGHT'}
                      {currentTab === 'live' && '🔴 LIVE 4K BROADCAST STREAMING'}
                      {currentTab === 'movies' && '🎬 4K BLOCKBUSTER CINEMA'}
                      {currentTab === 'shows' && '📺 BINGE WEB SERIES'}
                      {currentTab === 'apps' && '🛍️ APP STORE & GAMES'}
                      {currentTab === 'usb' && '💾 PHONE USB STORAGE HUB'}
                      {currentTab === 'settings' && '⚙️ 4K TV SYSTEM SETTINGS'}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white font-['Outfit']">
                      {currentTab === 'home' && 'Cosmic Voyager: Beyond The Nebulae'}
                      {currentTab === 'live' && 'CH 101 · India 24/7 Global News HD'}
                      {currentTab === 'movies' && 'Neon Odyssey: Mumbai 2077 (4K HDR)'}
                      {currentTab === 'shows' && 'Silicon Dynasty: Season 3'}
                      {currentTab === 'apps' && '10,000+ Android TV Apps & Games'}
                      {currentTab === 'usb' && 'Goa_Beach_Vacation_2026_4K.mp4'}
                      {currentTab === 'settings' && 'Display: 4K UHD 60Hz · Dolby Atmos'}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
                      {language === 'hi' 
                        ? 'रिमोट के D-Pad बटन (Up, Down, Left, Right) से नेविगेट करें और OK दबाएं।' 
                        : 'Use Remote D-Pad to navigate and press OK to open apps or play video.'}
                    </p>

                    {/* Interactive Quick App Badges row on TV mirror */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
                      <button
                        onClick={() => send('app_youtube')}
                        className="px-2.5 py-1 rounded-lg bg-red-600/40 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/50 text-[10px] font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                      >
                        ▶ YouTube
                      </button>
                      <button
                        onClick={() => send('app_netflix')}
                        className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-red-950/80 text-red-400 hover:text-red-300 border border-red-600/50 text-[10px] font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                      >
                        ▶ Netflix
                      </button>
                      <button
                        onClick={() => send('app_hotstar')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-950/60 hover:bg-emerald-800 text-emerald-300 hover:text-white border border-emerald-500/50 text-[10px] font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                      >
                        🏏 Hotstar
                      </button>
                      <button
                        onClick={() => send('app_prime')}
                        className="px-2.5 py-1 rounded-lg bg-sky-950/60 hover:bg-sky-800 text-sky-300 hover:text-white border border-sky-500/50 text-[10px] font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                      >
                        🎬 Prime
                      </button>
                      <button
                        onClick={() => send('app_browser')}
                        className="px-2.5 py-1 rounded-lg bg-blue-950/60 hover:bg-blue-800 text-cyan-300 hover:text-white border border-blue-500/50 text-[10px] font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                      >
                        🌐 Chrome
                      </button>
                    </div>
                  </div>

                  {/* Bottom of TV Mirror */}
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>USB 3.2 Gen 2 · DisplayPort 4K</span>
                    <span className="text-cyan-400">LAST ACTION: {lastAction}</span>
                  </div>
                </>
              )}

            </div>

            {/* TV Stand Base */}
            <div className="w-28 h-2 bg-slate-700 mx-auto rounded-b-lg mt-1" />
            <div className="w-36 h-1 bg-slate-800 mx-auto rounded-full mt-0.5" />
          </div>

          <p className="text-xs text-slate-400 mt-3 text-center">
            {language === 'hi' ? 'टीवी स्क्रीन पर लाइव व्यू' : 'Live Screen Mirror Feedback'}
          </p>
        </div>

        {/* Remote Controller on Right (Cols 8-12 on desktop) */}
        <div className="lg:col-span-5 flex flex-col items-center">

      {/* The Hardware TV Remote Body */}
      <div className="relative w-72 sm:w-80 rounded-[42px] bg-gradient-to-b from-slate-900 via-slate-950 to-black p-6 border-2 border-slate-700/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col items-center select-none">
        
        {/* Subtle LED Sensor at top */}
        <div className="w-3 h-3 rounded-full bg-red-600/60 border border-red-500/80 mb-4 shadow-[0_0_10px_rgba(239,68,68,0.7)]" />

        {/* Top Control Bar: Power, TV Status, Mute */}
        <div className="w-full flex items-center justify-between mb-6 px-2">
          <button
            onClick={() => send('power')}
            className="w-11 h-11 rounded-full bg-slate-900 hover:bg-red-950/40 border border-slate-700/80 text-red-500 flex items-center justify-center active:scale-90 transition-all shadow-md group"
            title="Power Toggle"
          >
            <Power className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>

          <div className="text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">TV CODE</span>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {pairingCode}
            </span>
          </div>

          <button
            onClick={() => send('mute')}
            className="w-11 h-11 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 flex items-center justify-center active:scale-90 transition-all shadow-md"
            title="Mute TV"
          >
            <VolumeX className="w-4 h-4" />
          </button>
        </div>

        {/* Google Assistant Voice Search Mic Button */}
        <button
          onClick={() => send('mic')}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 p-[2px] mb-6 shadow-xl hover:scale-105 active:scale-95 transition-all group"
          title="Google Voice Search Assistant"
        >
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center group-hover:bg-slate-900 transition-colors">
            <Mic className="w-7 h-7 text-cyan-300 group-hover:text-white" />
          </div>
        </button>

        {/* The Classic Android TV Circular D-Pad */}
        <div className="relative w-56 h-56 rounded-full bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 shadow-2xl flex items-center justify-center mb-6 p-2">
          
          {/* UP Button */}
          <button
            onClick={() => send('up')}
            className="absolute top-2 w-16 h-12 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
            title="Up"
          >
            <ChevronUp className="w-7 h-7" />
          </button>

          {/* DOWN Button */}
          <button
            onClick={() => send('down')}
            className="absolute bottom-2 w-16 h-12 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
            title="Down"
          >
            <ChevronDown className="w-7 h-7" />
          </button>

          {/* LEFT Button */}
          <button
            onClick={() => send('left')}
            className="absolute left-2 w-12 h-16 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
            title="Left"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          {/* RIGHT Button */}
          <button
            onClick={() => send('right')}
            className="absolute right-2 w-12 h-16 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
            title="Right"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* CENTER OK BUTTON */}
          <button
            onClick={() => send('ok')}
            className="w-24 h-24 rounded-full bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-700/90 text-white font-extrabold text-sm tracking-wider shadow-inner flex items-center justify-center active:scale-90 transition-all hover:border-cyan-400 group"
            title="Select (OK)"
          >
            <span className="group-hover:text-cyan-400 transition-colors">OK</span>
          </button>
        </div>

        {/* Middle Navigation: Back, Home, Menu */}
        <div className="w-full flex items-center justify-around mb-6 px-4">
          <button
            onClick={() => send('back')}
            className="w-12 h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center active:scale-90 transition-all shadow"
            title="Back / Return"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => send('home')}
            className="w-12 h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center active:scale-90 transition-all shadow"
            title="Android TV Home"
          >
            <Home className="w-5 h-5" />
          </button>

          <button
            onClick={() => send('live')}
            className="w-12 h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center active:scale-90 transition-all shadow"
            title="Live TV Broadcast"
          >
            <Radio className="w-5 h-5" />
          </button>
        </div>

        {/* Volume & Channel Rockers */}
        <div className="w-full grid grid-cols-2 gap-4 mb-6 px-4">
          {/* Volume Column */}
          <div className="bg-slate-900/90 rounded-2xl p-1.5 border border-slate-800 flex flex-col items-center">
            <button
              onClick={() => send('vol_up')}
              className="w-full py-2 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
              title="Volume +"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-mono text-slate-500 py-1 uppercase">VOL</span>
            <button
              onClick={() => send('vol_down')}
              className="w-full py-2 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
              title="Volume -"
            >
              <Volume1 className="w-4 h-4" />
            </button>
          </div>

          {/* Channel Column */}
          <div className="bg-slate-900/90 rounded-2xl p-1.5 border border-slate-800 flex flex-col items-center">
            <button
              onClick={() => send('ch_up')}
              className="w-full py-2 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
              title="Channel Up"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
            <span className="text-[10px] font-mono text-slate-500 py-1 uppercase">CH</span>
            <button
              onClick={() => send('ch_down')}
              className="w-full py-2 flex items-center justify-center text-slate-300 hover:text-white active:scale-90 transition-all"
              title="Channel Down"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dedicated Quick Launch Streaming App Buttons (Branded Like Fire TV & Android TV) */}
        <div className="w-full grid grid-cols-2 gap-2.5 px-3">
          {/* YouTube */}
          <button
            onClick={() => send('app_youtube')}
            className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all text-center flex items-center justify-center gap-1.5"
          >
            <span>YouTube</span>
          </button>

          {/* Netflix */}
          <button
            onClick={() => send('app_netflix')}
            className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 border border-red-600/40 text-red-500 font-extrabold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all text-center"
          >
            <span>Netflix</span>
          </button>

          {/* JioHotstar */}
          <button
            onClick={() => send('app_hotstar')}
            className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all text-center"
          >
            <span>Hotstar</span>
          </button>

          {/* Prime Video */}
          <button
            onClick={() => send('app_prime')}
            className="py-2.5 px-3 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all text-center"
          >
            <span>Prime</span>
          </button>
        </div>

        {/* Last Action Feedback */}
        <div className="mt-5 text-[10px] font-mono text-slate-500 flex items-center gap-1.5">
          <span>COMMAND:</span>
          <span className="text-cyan-400 font-bold">{lastAction}</span>
        </div>

      </div>
    </div>
  </div>
</div>
  );
};
