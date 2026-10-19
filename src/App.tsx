import React, { useState, useEffect } from 'react';
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
  const [remoteCommand, setRemoteCommand] = useState<string | null>(null);

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

  const handleRemoteCommand = (cmd: string) => {
    setRemoteCommand(cmd);

    // Broadcast to other tabs/windows if available
    try {
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel('smart_tv_broadcast');
        channel.postMessage({ type: 'remote_command', command: cmd });
        channel.close();
      }
    } catch {}

    // Handle high-level commands
    if (cmd === 'back') {
      if (activePlayingContent) {
        setActivePlayingContent(null);
      } else if (isVoiceAssistantOpen) {
        setIsVoiceAssistantOpen(false);
      } else {
        setCurrentTab('home');
      }
    } else if (cmd === 'home') {
      setActivePlayingContent(null);
      setIsVoiceAssistantOpen(false);
      setCurrentTab('home');
    } else if (cmd === 'mic') {
      setIsVoiceAssistantOpen(true);
    } else if (cmd === 'power') {
      setUsbConnected(prev => !prev);
    } else if (cmd === 'mute') {
      toggleSound();
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
      setCurrentTab('apps');
    } else if (command === 'live') {
      setCurrentTab('live');
    } else if (command === 'usb') {
      setCurrentTab('usb');
    } else if (command === 'game') {
      setCurrentTab('home');
    } else if (command === 'guide') {
      setViewMode('guide');
    } else if (command === 'movies') {
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
            onOpenUSBGuide={() => setViewMode('guide')}
          />
        )}

        {viewMode === 'remote' && (
          <MobileRemote
            onCommand={handleRemoteCommand}
            language={language}
            onSwitchToTV={() => setViewMode('tv')}
            usbConnected={usbConnected}
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
          <span>Display: 4K 60Hz</span>
          <span>Audio: Dolby Atmos</span>
          <span>D-Pad Ready (↑ ↓ ← →)</span>
        </div>
      </footer>

    </div>
  );
}
