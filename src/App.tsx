import React, { useState, useEffect, useRef } from 'react';
import { 
  TVTab, 
  ViewMode, 
  LanguageMode, 
  ContentItem 
} from './types/tv';
import { TVHeader } from './components/Layout/TVHeader';
import { TVHome } from './components/AndroidTV/TVHome';
import { MobileRemote } from './components/RemoteControl/MobileRemote';
import { USBConnectionGuide } from './components/SetupGuide/USBConnectionGuide';
import { VideoPlayerModal } from './components/AndroidTV/VideoPlayerModal';
import { VoiceAssistantModal } from './components/AndroidTV/VoiceAssistantModal';
import { DownloadAppModal } from './components/Install/DownloadAppModal';
import { VolumeHUD } from './components/AndroidTV/VolumeHUD';
import { TVStandbyScreen } from './components/AndroidTV/TVStandbyScreen';
import { tvAudio } from './utils/audio';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('tv');
  const [currentTab, setCurrentTab] = useState<TVTab>('home');
  const [language, setLanguage] = useState<LanguageMode>('hi');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [usbConnected, setUsbConnected] = useState<boolean>(true);
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState<boolean>(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState<boolean>(false);
  const [activePlayingContent, setActivePlayingContent] = useState<ContentItem | null>(null);
  const [activeAppModal, setActiveAppModal] = useState<'youtube' | 'spotify' | 'play_store' | 'game' | 'netflix' | 'hotstar' | 'prime' | 'browser' | null>(null);
  const [remoteCommand, setRemoteCommand] = useState<string | null>(null);

  // Real TV Hardware States
  const [isStandby, setIsStandby] = useState<boolean>(false);
  const [tvVolume, setTvVolume] = useState<number>(80);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showVolumeHUD, setShowVolumeHUD] = useState<boolean>(false);
  const [channelToast, setChannelToast] = useState<string | null>(null);
  
  const volumeTimer = useRef<NodeJS.Timeout | null>(null);
  const channelTimer = useRef<NodeJS.Timeout | null>(null);

  // BroadcastChannel for multi-device sync (e.g. Phone Remote controlling TV on a laptop/screen)
  useEffect(() => {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return;
    const channel = new BroadcastChannel('smart_tv_broadcast');

    channel.onmessage = (event) => {
      if (event.data && event.data.type === 'remote_command') {
        handleRemoteCommand(event.data.command);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const triggerVolumeHUD = () => {
    setShowVolumeHUD(true);
    if (volumeTimer.current) clearTimeout(volumeTimer.current);
    volumeTimer.current = setTimeout(() => {
      setShowVolumeHUD(false);
    }, 2200);
  };

  const triggerChannelToast = (text: string) => {
    setChannelToast(text);
    if (channelTimer.current) clearTimeout(channelTimer.current);
    channelTimer.current = setTimeout(() => {
      setChannelToast(null);
    }, 2500);
  };

  const tabCycle: TVTab[] = ['home', 'live', 'movies', 'shows', 'apps', 'usb', 'settings'];

  const handleRemoteCommand = (cmd: string) => {
    // Set command and schedule quick reset so repeat clicks trigger cleanly
    setRemoteCommand(cmd);
    setTimeout(() => setRemoteCommand(null), 80);

    // Broadcast to other tabs/windows if available
    try {
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('smart_tv_broadcast');
        channel.postMessage({ type: 'remote_command', command: cmd });
        channel.close();
      }
    } catch {}

    // Power Toggle
    if (cmd === 'power') {
      setIsStandby(prev => !prev);
      return;
    }

    // If TV is off and any button except power is clicked, wake it
    if (isStandby) {
      setIsStandby(false);
    }

    // Volume Up
    if (cmd === 'vol_up') {
      tvAudio.playNav();
      setTvVolume(prev => Math.min(100, prev + 5));
      setIsMuted(false);
      triggerVolumeHUD();
    } 
    // Volume Down
    else if (cmd === 'vol_down') {
      tvAudio.playNav();
      setTvVolume(prev => Math.max(0, prev - 5));
      setIsMuted(false);
      triggerVolumeHUD();
    } 
    // Mute
    else if (cmd === 'mute') {
      tvAudio.playNav();
      setIsMuted(prev => !prev);
      triggerVolumeHUD();
    }
    // Channel Up
    else if (cmd === 'ch_up') {
      tvAudio.playSelect();
      setCurrentTab('live');
      triggerChannelToast('CH 102 · Sports HD Cricket');
    }
    // Channel Down
    else if (cmd === 'ch_down') {
      tvAudio.playSelect();
      setCurrentTab('live');
      triggerChannelToast('CH 101 · India 24/7 Global News');
    }
    // Streaming Apps Direct Launch from Remote
    else if (cmd === 'app_youtube') {
      tvAudio.playSelect();
      setActiveAppModal('youtube');
      setViewMode('tv');
    } else if (cmd === 'app_netflix') {
      tvAudio.playSelect();
      setActiveAppModal('netflix');
      setViewMode('tv');
    } else if (cmd === 'app_hotstar') {
      tvAudio.playSelect();
      setActiveAppModal('hotstar');
      setViewMode('tv');
    } else if (cmd === 'app_prime') {
      tvAudio.playSelect();
      setActiveAppModal('prime');
      setViewMode('tv');
    } else if (cmd === 'app_browser') {
      tvAudio.playSelect();
      setActiveAppModal('browser');
      setViewMode('tv');
    } else if (cmd === 'app_spotify') {
      tvAudio.playSelect();
      setActiveAppModal('spotify');
      setViewMode('tv');
    } else if (cmd === 'app_game') {
      tvAudio.playSelect();
      setActiveAppModal('game');
      setViewMode('tv');
    } else if (cmd === 'app_play_store') {
      tvAudio.playSelect();
      setActiveAppModal('play_store');
      setViewMode('tv');
    } else if (cmd === 'live') {
      tvAudio.playSelect();
      setActiveAppModal(null);
      setCurrentTab('live');
      setViewMode('tv');
    }
    // D-Pad Left/Right navigation
    else if (cmd === 'left') {
      tvAudio.playNav();
      const currentIndex = tabCycle.indexOf(currentTab);
      const nextIndex = (currentIndex - 1 + tabCycle.length) % tabCycle.length;
      setCurrentTab(tabCycle[nextIndex]);
    } else if (cmd === 'right') {
      tvAudio.playNav();
      const currentIndex = tabCycle.indexOf(currentTab);
      const nextIndex = (currentIndex + 1) % tabCycle.length;
      setCurrentTab(tabCycle[nextIndex]);
    } else if (cmd === 'ok' || cmd === 'select') {
      tvAudio.playSelect();
      if (viewMode === 'remote') {
        setViewMode('tv');
      }
    }
    // Back
    else if (cmd === 'back') {
      if (activeAppModal) {
        setActiveAppModal(null);
      } else if (activePlayingContent) {
        setActivePlayingContent(null);
      } else if (isVoiceAssistantOpen) {
        setIsVoiceAssistantOpen(false);
      } else {
        setCurrentTab('home');
      }
    } 
    // Home
    else if (cmd === 'home') {
      setActiveAppModal(null);
      setActivePlayingContent(null);
      setIsVoiceAssistantOpen(false);
      setCurrentTab('home');
    } 
    // Voice Mic
    else if (cmd === 'mic') {
      setIsVoiceAssistantOpen(true);
    }
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    tvAudio.setEnabled(nextState);
  };

  const handleVoiceCommandExecution = (command: string) => {
    setIsVoiceAssistantOpen(false);
    if (command === 'youtube') {
      setViewMode('tv');
      setCurrentTab('home');
      handleRemoteCommand('app_youtube');
    } else if (command === 'netflix') {
      setViewMode('tv');
      setCurrentTab('home');
      handleRemoteCommand('app_netflix');
    } else if (command === 'hotstar') {
      setViewMode('tv');
      setCurrentTab('home');
      handleRemoteCommand('app_hotstar');
    } else if (command === 'prime') {
      setViewMode('tv');
      setCurrentTab('home');
      handleRemoteCommand('app_prime');
    } else if (command === 'browser') {
      setViewMode('tv');
      setCurrentTab('home');
      handleRemoteCommand('app_browser');
    } else if (command === 'live') {
      setViewMode('tv');
      setCurrentTab('live');
    } else if (command === 'usb') {
      setViewMode('tv');
      setCurrentTab('usb');
    } else if (command === 'game') {
      setViewMode('tv');
      setCurrentTab('home');
      handleRemoteCommand('app_game');
    } else if (command === 'guide') {
      setViewMode('guide');
    } else if (command === 'movies') {
      setViewMode('tv');
      setCurrentTab('movies');
    } else if (command === 'settings') {
      setViewMode('tv');
      setCurrentTab('settings');
    } else if (command === 'download') {
      setIsDownloadModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col font-sans tv-glow-mesh selection:bg-blue-600 selection:text-white">
      
      {/* Top Header Bar */}
      <TVHeader
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        language={language}
        onLanguageChange={setLanguage}
        onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
        onOpenSearch={() => setIsVoiceAssistantOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        usbConnected={usbConnected}
        onToggleUsb={() => setUsbConnected(!usbConnected)}
        onOpenDownloadModal={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Content Area based on View Mode */}
      <main className="flex-1 w-full">
        {viewMode === 'tv' && (
          <TVHome
            currentTab={currentTab}
            onTabChange={setCurrentTab}
            language={language}
            onLanguageChange={setLanguage}
            onPlayContent={(content) => setActivePlayingContent(content)}
            usbConnected={usbConnected}
            onToggleUsb={() => setUsbConnected(!usbConnected)}
            onOpenVoiceAssistant={() => setIsVoiceAssistantOpen(true)}
            remoteCommand={remoteCommand}
            onRemoteCommand={handleRemoteCommand}
            onOpenUSBGuide={() => setViewMode('guide')}
            activeAppModal={activeAppModal}
            onActiveAppModalChange={setActiveAppModal}
          />
        )}

        {viewMode === 'remote' && (
          <MobileRemote
            onCommand={handleRemoteCommand}
            language={language}
            onSwitchToTV={() => setViewMode('tv')}
            usbConnected={usbConnected}
            currentTab={currentTab}
            tvVolume={tvVolume}
            isMuted={isMuted}
            isStandby={isStandby}
          />
        )}

        {viewMode === 'guide' && (
          <div className="container mx-auto px-4 md:px-8">
            <USBConnectionGuide
              language={language}
              onLaunchTVMode={() => setViewMode('tv')}
              usbConnected={usbConnected}
              onToggleUsb={() => setUsbConnected(!usbConnected)}
            />
          </div>
        )}
      </main>

      {/* Real TV Standby Mode Screen when Power is turned off */}
      {isStandby && (
        <TVStandbyScreen
          onWake={() => setIsStandby(false)}
          language={language}
        />
      )}

      {/* Real Android TV Volume HUD Overlay */}
      <VolumeHUD
        volume={tvVolume}
        isMuted={isMuted}
        visible={showVolumeHUD}
      />

      {/* Real Live Channel Toast on Channel +/- */}
      {channelToast && (
        <div className="fixed top-8 left-8 z-50 bg-slate-900/95 border border-cyan-500/60 shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-left-4">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="text-sm font-bold text-white font-mono">{channelToast}</span>
        </div>
      )}

      {/* Fullscreen Video Player Modal */}
      {activePlayingContent && (
        <VideoPlayerModal
          content={activePlayingContent}
          onClose={() => setActivePlayingContent(null)}
        />
      )}

      {/* Google Assistant Voice Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceAssistantOpen}
        onClose={() => setIsVoiceAssistantOpen(false)}
        language={language}
        onExecuteCommand={handleVoiceCommandExecution}
      />

      {/* Download / Install App Modal */}
      <DownloadAppModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        language={language}
      />

      {/* Footer info banner */}
      <footer className="border-t border-slate-900 bg-slate-950/80 px-4 md:px-8 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">SmartTV Cast Hub</span>
          <span>·</span>
          <span>{language === 'hi' ? 'फोन को USB से जोड़कर नॉर्मल TV को बनाएं Android TV' : 'Turn any TV into Android TV via Smartphone USB'}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <span>Vol: {isMuted ? 'MUTE' : `${tvVolume}%`}</span>
          <span>Display: 4K 60Hz</span>
          <span>D-Pad Remote: Active</span>
        </div>
      </footer>

    </div>
  );
}
