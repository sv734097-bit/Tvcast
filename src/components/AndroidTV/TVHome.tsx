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
import { YouTubeTVModal } from './YouTubeTVModal';
import { SpotifyTVModal } from './SpotifyTVModal';
import { PlayStoreModal } from './PlayStoreModal';
import { NetflixTVModal } from './NetflixTVModal';
import { HotstarTVModal } from './HotstarTVModal';
import { PrimeVideoModal } from './PrimeVideoModal';
import { WebBrowserModal } from './WebBrowserModal';
import { VirtualTVRemote } from './VirtualTVRemote';
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
  onRemoteCommand?: (command: string) => void;
  onOpenUSBGuide: () => void;
  activeAppModal?: 'youtube' | 'spotify' | 'play_store' | 'game' | 'netflix' | 'hotstar' | 'prime' | 'browser' | null;
  onActiveAppModalChange?: (modal: 'youtube' | 'spotify' | 'play_store' | 'game' | 'netflix' | 'hotstar' | 'prime' | 'browser' | null) => void;
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
  onRemoteCommand,
  onOpenUSBGuide,
  activeAppModal: propActiveAppModal,
  onActiveAppModalChange
}) => {
  // Modal states for functional apps (supports controlled from App.tsx or internal)
  const [internalActiveAppModal, setInternalActiveAppModal] = useState<'youtube' | 'spotify' | 'play_store' | 'game' | 'netflix' | 'hotstar' | 'prime' | 'browser' | null>(null);
  const activeAppModal = propActiveAppModal !== undefined ? propActiveAppModal : internalActiveAppModal;
  const setActiveAppModal = (val: 'youtube' | 'spotify' | 'play_store' | 'game' | 'netflix' | 'hotstar' | 'prime' | 'browser' | null) => {
    if (onActiveAppModalChange) {
      onActiveAppModalChange(val);
    } else {
      setInternalActiveAppModal(val);
    }
  };

  const [isVirtualRemoteOpen, setIsVirtualRemoteOpen] = useState<boolean>(false);
  
  // Dynamic apps list (starts with TV_APPS, user can install more from Play Store!)
  const [appsList, setAppsList] = useState<TVApp[]>(TV_APPS);

  // 2D Focus system for TV Remote D-Pad Navigation
  // Row 0: Hero (Col 0 = Play, Col 1 = Details)
  // Row 1: App Dock (Col 0..appsList.length - 1)
  // Row 2: Trending Movies (Col 0..TRENDING_MOVIES.length - 1)
  // Row 3: Top Shows (Col 0..TOP_SHOWS.length - 1)
  const [focusedRow, setFocusedRow] = useState<number>(1);
  const [focusedCol, setFocusedCol] = useState<number>(0);

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

  // Execute currently focused item
  const activateFocusedItem = () => {
    tvAudio.playSelect();
    if (focusedRow === 0) {
      onPlayContent(FEATURED_HERO);
    } else if (focusedRow === 1) {
      if (appsList[focusedCol]) {
        handleAppLaunch(appsList[focusedCol]);
      }
    } else if (focusedRow === 2) {
      if (TRENDING_MOVIES[focusedCol]) {
        onPlayContent(TRENDING_MOVIES[focusedCol]);
      }
    } else if (focusedRow === 3) {
      if (TOP_SHOWS[focusedCol]) {
        onPlayContent(TOP_SHOWS[focusedCol]);
      }
    }
  };

  // D-Pad Navigation Engine (Used by both Remote Controller and Keyboard Arrow Keys)
  const handleNavDirection = (direction: 'up' | 'down' | 'left' | 'right') => {
    tvAudio.playNav();

    if (direction === 'up') {
      setFocusedRow(prev => Math.max(0, prev - 1));
      setFocusedCol(0);
    } else if (direction === 'down') {
      setFocusedRow(prev => Math.min(3, prev + 1));
      setFocusedCol(0);
    } else if (direction === 'left') {
      setFocusedCol(prev => Math.max(0, prev - 1));
    } else if (direction === 'right') {
      setFocusedCol(prev => {
        let maxCols = 2;
        if (focusedRow === 1) maxCols = appsList.length;
        if (focusedRow === 2) maxCols = TRENDING_MOVIES.length;
        if (focusedRow === 3) maxCols = TOP_SHOWS.length;
        return Math.min(maxCols - 1, prev + 1);
      });
    }
  };

  // Handle Remote commands
  useEffect(() => {
    if (!remoteCommand) return;

    if (remoteCommand === 'up') {
      handleNavDirection('up');
    } else if (remoteCommand === 'down') {
      handleNavDirection('down');
    } else if (remoteCommand === 'left') {
      handleNavDirection('left');
    } else if (remoteCommand === 'right') {
      handleNavDirection('right');
    } else if (remoteCommand === 'ok' || remoteCommand === 'select') {
      activateFocusedItem();
    } else if (remoteCommand === 'home') {
      setActiveAppModal(null);
      onTabChange('home');
    } else if (remoteCommand === 'live') {
      setActiveAppModal(null);
      onTabChange('live');
    } else if (remoteCommand === 'mic') {
      onOpenVoiceAssistant();
    } else if (remoteCommand === 'app_youtube') {
      setActiveAppModal('youtube');
    } else if (remoteCommand === 'app_netflix') {
      setActiveAppModal('netflix');
    } else if (remoteCommand === 'app_hotstar') {
      setActiveAppModal('hotstar');
    } else if (remoteCommand === 'app_prime') {
      setActiveAppModal('prime');
    } else if (remoteCommand === 'app_browser') {
      setActiveAppModal('browser');
    }
  }, [remoteCommand]);

  // Keyboard navigation for TV remote simulation (Arrow keys, Enter, Esc, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleNavDirection('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNavDirection('down');
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleNavDirection('left');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNavDirection('right');
      } else if (e.key === 'Enter') {
        e.preventDefault();
        activateFocusedItem();
      } else if (e.key === 'h' || e.key === 'H') {
        setActiveAppModal(null);
        onTabChange('home');
      } else if (e.key === 'Escape') {
        if (activeAppModal) {
          setActiveAppModal(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedRow, focusedCol, appsList, activeAppModal]);

  // Handle launch of every single app with real working feature
  const handleAppLaunch = (app: TVApp) => {
    tvAudio.playSelect();
    
    if (app.id === 'youtube') {
      // Open REAL YouTube TV Player
      setActiveAppModal('youtube');
    } else if (app.id === 'spotify') {
      // Open REAL Spotify Music Player with Equalizer
      setActiveAppModal('spotify');
    } else if (app.id === 'play_store') {
      // Open REAL Google Play Store for Android TV
      setActiveAppModal('play_store');
    } else if (app.id === 'retro_game') {
      // Launch TV Arcade Game
      setActiveAppModal('game');
    } else if (app.id === 'live_tv') {
      // Switch to Live TV channels
      setActiveAppModal(null);
      onTabChange('live');
    } else if (app.id === 'usb_hub') {
      // Switch to USB Media Player
      setActiveAppModal(null);
      onTabChange('usb');
    } else if (app.id === 'settings') {
      // Switch to TV Settings
      setActiveAppModal(null);
      onTabChange('settings');
    } else if (app.id === 'netflix') {
      setActiveAppModal('netflix');
    } else if (app.id === 'hotstar') {
      setActiveAppModal('hotstar');
    } else if (app.id === 'prime') {
      setActiveAppModal('prime');
    } else if (app.id === 'browser') {
      setActiveAppModal('browser');
    } else {
      // Dynamic newly installed app from Play Store
      onPlayContent({
        ...FEATURED_HERO,
        title: app.name + ' · Launched',
        category: app.description
      });
    }
  };

  const handleInstallNewApp = (newApp: TVApp) => {
    setAppsList(prev => {
      if (prev.find(a => a.id === newApp.id)) return prev;
      return [...prev, newApp];
    });
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
      description: `Streaming directly from smartphone internal storage over USB connection. File size: ${file.size}.`,
      videoUrl: file.url,
      thumbnailGradient: 'from-amber-900 to-slate-950'
    });
  };

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
            focusedButton={focusedRow === 0 ? (focusedCol === 0 ? 'play' : 'details') : null}
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
                    ? 'D-Pad कीबोर्ड (↑ ↓ ← →) या फोन रिमोट से किसी भी ऐप या फिल्म पर जाएं और Enter दबाएं।' 
                    : 'Use Remote D-Pad (Up, Down, Left, Right) or Arrow keys to navigate and press OK to launch.'}
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

          {/* Apps Shelf (With real D-Pad focus ring) */}
          <AppGrid
            apps={appsList}
            onLaunchApp={handleAppLaunch}
            language={language}
            focusedIndex={focusedRow === 1 ? focusedCol : null}
          />

          {/* Trending Blockbuster Movies Row (With real D-Pad focus ring) */}
          <ContentRow
            title={language === 'hi' ? 'ट्रेंडिंग ब्लॉकबस्टर फिल्में' : 'Trending Blockbuster Movies'}
            subtitle={language === 'hi' ? '4K Ultra HD में उपलब्ध' : 'Available in 4K Ultra HD & Dolby Atmos'}
            items={TRENDING_MOVIES}
            onSelect={onPlayContent}
            focusedIndex={focusedRow === 2 ? focusedCol : null}
          />

          {/* Popular TV Shows Row (With real D-Pad focus ring) */}
          <ContentRow
            title={language === 'hi' ? 'टॉप वेब सीरीज व शो' : 'Top TV Shows & Series'}
            subtitle={language === 'hi' ? 'पूरी सीरीज बिंज-वॉच करें' : 'Binge-watch all seasons in HDR'}
            items={TOP_SHOWS}
            onSelect={onPlayContent}
            focusedIndex={focusedRow === 3 ? focusedCol : null}
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
            apps={appsList}
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

      {/* REAL WORKING YOUTUBE TV MODAL */}
      {activeAppModal === 'youtube' && (
        <YouTubeTVModal
          onClose={() => setActiveAppModal(null)}
          language={language}
        />
      )}

      {/* REAL WORKING SPOTIFY TV MODAL */}
      {activeAppModal === 'spotify' && (
        <SpotifyTVModal
          onClose={() => setActiveAppModal(null)}
          language={language}
        />
      )}

      {/* REAL WORKING GOOGLE PLAY STORE FOR ANDROID TV */}
      {activeAppModal === 'play_store' && (
        <PlayStoreModal
          onClose={() => setActiveAppModal(null)}
          onInstallApp={handleInstallNewApp}
          installedAppIds={appsList.map(a => a.id)}
          language={language}
        />
      )}

      {/* REAL WORKING ARCADE TV GAME */}
      {activeAppModal === 'game' && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <RetroTVGame
            onClose={() => setActiveAppModal(null)}
            remoteCommand={remoteCommand}
          />
        </div>
      )}

      {/* REAL WORKING NETFLIX TV MODAL */}
      {activeAppModal === 'netflix' && (
        <NetflixTVModal
          onClose={() => setActiveAppModal(null)}
          language={language}
          onPlayContent={onPlayContent}
        />
      )}

      {/* REAL WORKING JIOHOTSTAR TV MODAL */}
      {activeAppModal === 'hotstar' && (
        <HotstarTVModal
          onClose={() => setActiveAppModal(null)}
          language={language}
          onPlayContent={onPlayContent}
        />
      )}

      {/* REAL WORKING PRIME VIDEO MODAL */}
      {activeAppModal === 'prime' && (
        <PrimeVideoModal
          onClose={() => setActiveAppModal(null)}
          language={language}
          onPlayContent={onPlayContent}
        />
      )}

      {/* REAL WORKING CHROME TV WEB BROWSER */}
      {activeAppModal === 'browser' && (
        <WebBrowserModal
          onClose={() => setActiveAppModal(null)}
          language={language}
        />
      )}

      {/* ON-SCREEN VIRTUAL ANDROID TV REMOTE */}
      <VirtualTVRemote
        isOpen={isVirtualRemoteOpen}
        onToggle={() => setIsVirtualRemoteOpen(!isVirtualRemoteOpen)}
        onCommand={(cmd) => {
          if (onRemoteCommand) {
            onRemoteCommand(cmd);
          }
        }}
        language={language}
      />

    </div>
  );
};
