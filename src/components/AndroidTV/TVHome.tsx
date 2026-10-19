import React, { useState, useEffect } from 'react';
import { 
  TVTab, 
  TVApp, 
  ContentItem, 
  LiveChannel, 
  USBFile, 
  LanguageMode, 
  TVSettings 
} from '../../types/tv';
import { HeroBillboard } from './HeroBillboard';
import { AppGrid } from './AppGrid';
import { ContentRow } from './ContentRow';
import { LiveTVPlayer } from './LiveTVPlayer';
import { USBMediaHub } from './USBMediaHub';
import { RetroTVGame } from './RetroTVGame';
import { TVSettingsMenu } from './TVSettingsMenu';
import { 
  TV_APPS, 
  FEATURED_HERO, 
  TRENDING_MOVIES, 
  TOP_SHOWS, 
  LIVE_CHANNELS 
} from '../../data/tvContent';
import { tvAudio } from '../../utils/audio';

interface TVHomeProps {
  currentTab: TVTab;
  onTabChange: (tab: TVTab) => void;
  language: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  onPlayContent: (content: ContentItem) => void;
  usbConnected: boolean;
  onToggleUsb: () => void;
  onOpenVoiceAssistant: () => void;
  remoteCommand?: string | null;
  onOpenUSBGuide: () => void;
}

export const TVHome: React.FC<TVHomeProps> = ({
  currentTab,
  onTabChange,
  language,
  onLanguageChange,
  onPlayContent,
  usbConnected,
  onToggleUsb,
  onOpenVoiceAssistant,
  remoteCommand,
  onOpenUSBGuide
}) => {
  const [isPlayingGame, setIsPlayingGame] = useState<boolean>(false);
  const [tvSettings, setTvSettings] = useState<TVSettings>({
    network: {
      wifiEnabled: true,
      connectedSsid: 'Home_Fiber_5G',
      signalStrength: 'Excellent',
      ipAddress: '192.168.1.108',
      macAddress: 'B4:8C:9D:44:E1:2A',
      gateway: '192.168.1.1',
      dns: '8.8.8.8',
      tetheringActive: true
    },
    display: {
      resolution: '4K UHD (3840x2160)',
      framerate: '60 fps',
      hdrMode: 'Dolby Vision',
      aspectRatio: '16:9 (Standard)',
      colorSpace: 'RGB Full (4:4:4)',
      overscanPercent: 0
    },
    dateTime: {
      autoDateTime: true,
      timeZone: 'Asia/Kolkata (IST +5:30)',
      use24HourFormat: false,
      manualDate: '2026-10-19',
      manualTime: '12:45'
    },
    devicePreferences: {
      deviceName: 'Living Room TV (via Phone)',
      osVersion: 'Android 14 (UpsideDownCake)',
      kernelVersion: 'Linux 6.1.45-android14-perf',
      buildNumber: 'ATV-2026.10-R1',
      totalStorageGB: 128,
      usedStorageGB: 52.4,
      audioOutput: 'Dolby Digital Plus',
      soundEffects: true,
      usbMode: 'MHL HDMI',
      screensaver: 'Fluid Cosmos'
    },
    language: language
  });

  // Handle Remote commands
  useEffect(() => {
    if (!remoteCommand) return;
    if (remoteCommand === 'home') {
      setIsPlayingGame(false);
      onTabChange('home');
    } else if (remoteCommand === 'live') {
      setIsPlayingGame(false);
      onTabChange('live');
    } else if (remoteCommand === 'mic') {
      onOpenVoiceAssistant();
    } else if (remoteCommand === 'app_youtube') {
      handleAppLaunch(TV_APPS[0]);
    } else if (remoteCommand === 'app_netflix') {
      handleAppLaunch(TV_APPS[2]);
    } else if (remoteCommand === 'app_hotstar') {
      handleAppLaunch(TV_APPS[4]);
    } else if (remoteCommand === 'app_prime') {
      handleAppLaunch(TV_APPS[3]);
    }
  }, [remoteCommand]);

  // Keyboard navigation for TV remote simulation (Arrow keys, Enter, Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        tvAudio.playNav();
      }

      if (e.key === 'h' || e.key === 'H') {
        onTabChange('home');
      }

      if (e.key === 'Escape' && isPlayingGame) {
        setIsPlayingGame(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlayingGame]);

  const handleAppLaunch = (app: TVApp) => {
    tvAudio.playSelect();
    if (app.id === 'live_tv') {
      setIsPlayingGame(false);
      onTabChange('live');
    } else if (app.id === 'usb_hub') {
      setIsPlayingGame(false);
      onTabChange('usb');
    } else if (app.id === 'retro_game') {
      setIsPlayingGame(true);
    } else if (app.id === 'settings') {
      setIsPlayingGame(false);
      onTabChange('settings');
    } else {
      // Launch streaming player with top movie
      onPlayContent({
        ...FEATURED_HERO,
        title: `${app.name} · Featured Stream`,
        category: `${app.name} Exclusive 4K`
      });
    }
  };

  const handlePlayUSBMedia = (file: USBFile) => {
    onPlayContent({
      id: file.name,
      title: file.name,
      category: `Phone USB Storage · ${file.type.toUpperCase()}`,
      rating: '10.0',
      duration: file.duration || '04:00',
      year: 2026,
      genre: ['Phone Media', 'Direct USB Playback'],
      description: `Streaming directly from smartphone internal storage over USB DisplayPort connection. File size: ${file.size}.`,
      videoUrl: file.url,
      thumbnailGradient: 'from-amber-900 to-slate-950'
    });
  };

  // If playing retro TV game
  if (isPlayingGame) {
    return (
      <div className="container mx-auto px-4 py-6">
        <RetroTVGame 
          onClose={() => setIsPlayingGame(false)} 
          remoteCommand={remoteCommand}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-6">
      
      {/* Tab: HOME */}
      {currentTab === 'home' && (
        <>
          {/* Hero Spotlight Billboard */}
          <HeroBillboard
            content={FEATURED_HERO}
            onPlay={onPlayContent}
            language={language}
          />

          {/* Quick Notice Banner on how USB converted the TV */}
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-cyan-300 font-bold text-xs shrink-0">
                TV+
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'hi' ? 'आपका नॉर्मल TV अब Android TV बन चुका है' : 'Your Regular TV is now an Android Smart TV'}
                </h4>
                <p className="text-xs text-slate-400">
                  {language === 'hi' 
                    ? 'मोबाइल USB/HDMI से कनेक्टेड है। किसी फायर स्टिक या सेटअप बॉक्स की जरूरत नहीं!' 
                    : 'Powered by your smartphone over USB. Use your phone as the remote controller.'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                tvAudio.playNav();
                onOpenUSBGuide();
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-semibold whitespace-nowrap transition-colors"
            >
              {language === 'hi' ? 'कनेक्शन गाइड देखें' : 'View Cable Guide'}
            </button>
          </div>

          {/* Apps Shelf */}
          <AppGrid
            apps={TV_APPS}
            onLaunchApp={handleAppLaunch}
            language={language}
          />

          {/* Trending Blockbuster Movies Row */}
          <ContentRow
            title={language === 'hi' ? 'ट्रेंडिंग ब्लॉकबस्टर फिल्में' : 'Trending Blockbuster Movies'}
            subtitle={language === 'hi' ? '4K Ultra HD में उपलब्ध' : 'Available in 4K Ultra HD & Dolby Atmos'}
            items={TRENDING_MOVIES}
            onSelect={onPlayContent}
          />

          {/* Popular TV Shows Row */}
          <ContentRow
            title={language === 'hi' ? 'टॉप वेब सीरीज व शो' : 'Top TV Shows & Series'}
            subtitle={language === 'hi' ? 'पूरी सीरीज बिंज-वॉच करें' : 'Binge-watch all seasons in HDR'}
            items={TOP_SHOWS}
            onSelect={onPlayContent}
          />
        </>
      )}

      {/* Tab: LIVE TV */}
      {currentTab === 'live' && (
        <LiveTVPlayer
          channels={LIVE_CHANNELS}
          language={language}
        />
      )}

      {/* Tab: MOVIES */}
      {currentTab === 'movies' && (
        <div className="space-y-6">
          <ContentRow
            title={language === 'hi' ? 'सभी ब्लॉकबस्टर फिल्में' : 'All Movies'}
            items={[...TRENDING_MOVIES, ...TOP_SHOWS]}
            onSelect={onPlayContent}
          />
        </div>
      )}

      {/* Tab: SHOWS */}
      {currentTab === 'shows' && (
        <div className="space-y-6">
          <ContentRow
            title={language === 'hi' ? 'पॉपुलर वेब सीरीज' : 'Popular Web Series'}
            items={TOP_SHOWS}
            onSelect={onPlayContent}
          />
        </div>
      )}

      {/* Tab: APPS & GAMES */}
      {currentTab === 'apps' && (
        <div className="space-y-6">
          <AppGrid
            apps={TV_APPS}
            onLaunchApp={handleAppLaunch}
            language={language}
          />
        </div>
      )}

      {/* Tab: USB MEDIA */}
      {currentTab === 'usb' && (
        <USBMediaHub
          language={language}
          usbConnected={usbConnected}
          onToggleUsb={onToggleUsb}
          onPlayMedia={handlePlayUSBMedia}
        />
      )}

      {/* Tab: SETTINGS */}
      {currentTab === 'settings' && (
        <TVSettingsMenu
          settings={tvSettings}
          onUpdateSettings={(newVals) => setTvSettings(prev => ({ ...prev, ...newVals }))}
          language={language}
          onLanguageChange={onLanguageChange}
          onBackToHome={() => onTabChange('home')}
        />
      )}

    </div>
  );
};
