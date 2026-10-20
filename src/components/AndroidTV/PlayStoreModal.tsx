import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Download, 
  Check, 
  Star, 
  X, 
  Tv, 
  Sparkles,
  Play
} from 'lucide-react';
import { TVApp } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface StoreApp {
  id: string;
  name: string;
  category: 'streaming' | 'utility' | 'game' | 'live';
  developer: string;
  rating: string;
  downloads: string;
  description: string;
  size: string;
  bgGradient: string;
  iconName: string;
  installed: boolean;
}

interface PlayStoreModalProps {
  onClose: () => void;
  onInstallApp: (app: TVApp) => void;
  installedAppIds: string[];
  language: 'hi' | 'en';
}

export const PlayStoreModal: React.FC<PlayStoreModalProps> = ({
  onClose,
  onInstallApp,
  installedAppIds,
  language
}) => {
  const [search, setSearch] = useState<string>('');
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [installProgress, setInstallProgress] = useState<number>(0);

  const [storeApps, setStoreApps] = useState<StoreApp[]>([
    {
      id: 'vlc_tv',
      name: 'VLC Media Player TV',
      category: 'utility',
      developer: 'VideoLAN',
      rating: '4.7',
      downloads: '100M+',
      description: 'The open-source multi-codec media player for Android TV. Plays any local video from USB.',
      size: '32 MB',
      bgGradient: 'from-orange-600 to-amber-950',
      iconName: 'Film',
      installed: installedAppIds.includes('vlc_tv')
    },
    {
      id: 'kodi_tv',
      name: 'Kodi Home Theater',
      category: 'streaming',
      developer: 'XBMC Foundation',
      rating: '4.6',
      downloads: '50M+',
      description: 'Turn your TV into an all-in-one entertainment hub with IPTV and streaming add-ons.',
      size: '64 MB',
      bgGradient: 'from-sky-600 to-blue-950',
      iconName: 'Tv',
      installed: installedAppIds.includes('kodi_tv')
    },
    {
      id: 'jiocinema_tv',
      name: 'JioCinema TV',
      category: 'streaming',
      developer: 'Viacom18',
      rating: '4.5',
      downloads: '150M+',
      description: 'Free live streaming of IPL Cricket, Hollywood movies in 4K, and regional series.',
      size: '28 MB',
      bgGradient: 'from-pink-600 to-rose-950',
      iconName: 'Sparkles',
      installed: installedAppIds.includes('jiocinema_tv')
    },
    {
      id: 'mx_player',
      name: 'MX Player Pro TV',
      category: 'utility',
      developer: 'MX Media',
      rating: '4.8',
      downloads: '500M+',
      description: 'HW+ hardware decoding for ultra smooth 4K 60fps local and network streaming.',
      size: '38 MB',
      bgGradient: 'from-blue-600 to-indigo-950',
      iconName: 'Film',
      installed: installedAppIds.includes('mx_player')
    },
    {
      id: 'asphalt_tv',
      name: 'Asphalt 9: Legends TV',
      category: 'game',
      developer: 'Gameloft SE',
      rating: '4.7',
      downloads: '50M+',
      description: 'High-octane arcade racing with hypercars on stunning world circuits with TV remote controller support.',
      size: '2.4 GB',
      bgGradient: 'from-red-600 to-slate-950',
      iconName: 'Gamepad2',
      installed: installedAppIds.includes('asphalt_tv')
    }
  ]);

  const handleInstall = (app: StoreApp) => {
    if (app.installed || installingId) return;

    tvAudio.playSelect();
    setInstallingId(app.id);
    setInstallProgress(10);

    const interval = setInterval(() => {
      setInstallProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setInstallingId(null);
          // Mark installed
          setStoreApps(apps => apps.map(a => a.id === app.id ? { ...a, installed: true } : a));
          // Notify parent to add to TV dock
          onInstallApp({
            id: app.id,
            name: app.name,
            category: app.category,
            icon: app.iconName,
            bgGradient: app.bgGradient,
            accentColor: '#38bdf8',
            description: app.description,
            badge: 'New App'
          });
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const filteredApps = storeApps.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#080b11] flex flex-col p-6 md:p-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-cyan-500/20">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-['Outfit']">
              Google Play Store <span className="text-cyan-400">TV</span>
            </h2>
            <p className="text-xs text-slate-400">Install 10,000+ Android TV applications directly</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64 hidden sm:block">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search apps & games..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <button
            onClick={() => {
              tvAudio.playBack();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto no-scrollbar flex-1 pb-6">
        {filteredApps.map((app) => {
          const isInstalling = installingId === app.id;
          return (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.bgGradient} flex items-center justify-center text-white shadow-lg shrink-0 font-bold text-lg font-mono`}>
                    {app.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate font-['Outfit']">
                      {app.name}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">{app.developer}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 font-mono">
                      <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {app.rating}
                      </span>
                      <span>·</span>
                      <span>{app.downloads}</span>
                      <span>·</span>
                      <span>{app.size}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {app.description}
                </p>
              </div>

              {/* Install button & Progress */}
              <div>
                {isInstalling ? (
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] text-cyan-400 font-mono">
                      <span>Installing on TV...</span>
                      <span>{installProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                        style={{ width: `${installProgress}%` }}
                      />
                    </div>
                  </div>
                ) : app.installed ? (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      Installed on TV Dock
                    </span>
                    <button
                      onClick={() => {
                        tvAudio.playSelect();
                        onClose();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
                    >
                      Open
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleInstall(app)}
                    className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Install on TV</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
