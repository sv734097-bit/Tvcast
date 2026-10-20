import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Search, 
  Mic, 
  Wifi, 
  Usb, 
  SlidersHorizontal, 
  Maximize, 
  Minimize, 
  Smartphone, 
  HelpCircle,
  Volume2,
  VolumeX,
  Download
} from 'lucide-react';
import { TVTab, ViewMode, LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface TVHeaderProps {
  currentTab: TVTab;
  onTabChange: (tab: TVTab) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  language: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  onOpenVoiceAssistant: () => void;
  onOpenSearch: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  usbConnected: boolean;
  onToggleUsb: () => void;
  onOpenDownloadModal: () => void;
}

export const TVHeader: React.FC<TVHeaderProps> = ({
  currentTab,
  onTabChange,
  viewMode,
  onViewModeChange,
  language,
  onLanguageChange,
  onOpenVoiceAssistant,
  onOpenSearch,
  soundEnabled,
  onToggleSound,
  usbConnected,
  onToggleUsb,
  onOpenDownloadModal
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const tabs: { id: TVTab; labelEn: string; labelHi: string }[] = [
    { id: 'home', labelEn: 'Home', labelHi: 'होम' },
    { id: 'live', labelEn: 'Live TV', labelHi: 'लाइव टीवी' },
    { id: 'movies', labelEn: 'Movies', labelHi: 'फिल्में' },
    { id: 'shows', labelEn: 'Shows', labelHi: 'सीरीज' },
    { id: 'apps', labelEn: 'Apps & Store', labelHi: 'ऐप्स व गेम्स' },
    { id: 'usb', labelEn: 'USB Media', labelHi: 'USB मीडिया' },
    { id: 'settings', labelEn: 'Settings', labelHi: 'सेटिंग्स' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Brand & Voice Assistant */}
        <div className="flex items-center gap-4 shrink-0">
          <button 
            onClick={() => {
              tvAudio.playSelect();
              onTabChange('home');
              onViewModeChange('tv');
            }}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Tv className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-white font-['Outfit']">
                  Android<span className="text-cyan-400">TV</span>
                </span>
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded">
                  OS 14
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {language === 'hi' ? 'फोन से बना स्मार्ट टीवी' : 'Phone to Smart TV Hub'}
              </p>
            </div>
          </button>

          {/* Voice Search Mic Button */}
          <button
            onClick={() => {
              tvAudio.playSelect();
              onOpenVoiceAssistant();
            }}
            title={language === 'hi' ? 'Google Assistant वॉइस सर्च' : 'Google Assistant Voice Search'}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-full text-slate-200 text-xs font-medium transition-all hover:scale-105 active:scale-95 shadow-sm group"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 via-red-500 to-amber-400 p-[2px] flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                <Mic className="w-2.5 h-2.5 text-white group-hover:text-cyan-300" />
              </div>
            </div>
            <span className="hidden md:inline">
              {language === 'hi' ? 'बोलकर खोजें' : 'Voice Assistant'}
            </span>
          </button>
        </div>

        {/* Center: Navigation Tabs (Shown in TV Mode) */}
        {viewMode === 'tv' && (
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
            {tabs.map((tab) => {
              const active = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    tvAudio.playNav();
                    onTabChange(tab.id);
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  {language === 'hi' ? tab.labelHi : tab.labelEn}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right: Mode Switchers, USB Status, Time & Settings */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Mode Switcher: TV View vs Mobile Remote vs USB Guide */}
          <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => {
                tvAudio.playNav();
                onViewModeChange('tv');
              }}
              title="TV Display Screen Mode (10-Foot UI)"
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all flex items-center gap-1.5 ${
                viewMode === 'tv'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tv className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">TV Screen</span>
            </button>

            <button
              onClick={() => {
                tvAudio.playNav();
                onViewModeChange('remote');
              }}
              title="Mobile TV Remote Controller"
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all flex items-center gap-1.5 ${
                viewMode === 'remote'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Phone Remote</span>
            </button>

            <button
              onClick={() => {
                tvAudio.playNav();
                onViewModeChange('guide');
              }}
              title={language === 'hi' ? 'USB से TV कनेक्ट करने का गाइड' : 'USB to TV Connection Guide'}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all flex items-center gap-1.5 ${
                viewMode === 'guide'
                  ? 'bg-cyan-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden md:inline">{language === 'hi' ? 'USB गाइड' : 'USB Guide'}</span>
            </button>
          </div>

          {/* USB Cable Status Indicator */}
          <button
            onClick={() => {
              tvAudio.playSelect();
              onToggleUsb();
            }}
            title={usbConnected ? 'USB Cable: Connected (Tap to disconnect)' : 'USB Cable: Disconnected (Tap to connect)'}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-all ${
              usbConnected
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
            }`}
          >
            <Usb className={`w-3.5 h-3.5 ${usbConnected ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="hidden xl:inline font-mono">
              {usbConnected ? 'USB: 4K 60Hz' : 'USB: Disconnected'}
            </span>
          </button>

          {/* Direct APK Download & Install Button */}
          <button
            onClick={() => {
              tvAudio.playSelect();
              onOpenDownloadModal();
            }}
            title={language === 'hi' ? 'Android APK सीधे डाउनलोड करें' : 'Download Android APK directly'}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-950/40 border border-emerald-400/40 active:scale-95 transition-all group"
          >
            <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            <span className="font-['Outfit'] tracking-wide">
              {language === 'hi' ? 'APK डाउनलोड करें' : 'Download APK'}
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-mono bg-black/40 rounded border border-white/20 text-emerald-200">
              .apk
            </span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => {
              tvAudio.playNav();
              onLanguageChange(language === 'hi' ? 'en' : 'hi');
            }}
            title="Switch Language / भाषा बदलें"
            className="px-2 py-1 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300"
          >
            {language === 'hi' ? 'EN' : 'हिं'}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              tvAudio.playNav();
            }}
            title={soundEnabled ? 'Mute TV UI Sounds' : 'Unmute TV UI Sounds'}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Fullscreen for TV */}
          <button
            onClick={() => {
              tvAudio.playSelect();
              toggleFullscreen();
            }}
            title="TV Fullscreen Mode"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Clock & WiFi */}
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs text-slate-400 font-mono">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <span className="tabular-nums text-slate-200">{currentTime || '12:00 PM'}</span>
          </div>
        </div>

      </div>

      {/* Mobile Submenu Tabs */}
      {viewMode === 'tv' && (
        <div className="flex lg:hidden overflow-x-auto gap-2 pt-2.5 pb-1 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                tvAudio.playNav();
                onTabChange(tab.id);
              }}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                currentTab === tab.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400'
              }`}
            >
              {language === 'hi' ? tab.labelHi : tab.labelEn}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
