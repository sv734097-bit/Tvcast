import React, { useState } from 'react';
import { 
  Youtube, 
  Search, 
  Play, 
  X, 
  Flame, 
  Music, 
  Compass, 
  Tv, 
  ExternalLink 
} from 'lucide-react';
import { tvAudio } from '../../utils/audio';

interface YouTubeVideo {
  id: string; // YouTube embed ID
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnailGradient: string;
}

interface YouTubeTVModalProps {
  onClose: () => void;
  language: 'hi' | 'en';
}

export const YouTubeTVModal: React.FC<YouTubeTVModalProps> = ({
  onClose,
  language
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('Trending');
  
  const curatedVideos: Record<string, YouTubeVideo[]> = {
    Trending: [
      {
        id: 'LXb3EKWsInQ',
        title: 'Costa Rica 4K 60fps HDR (Ultra HD Wildlife Exploration)',
        channel: 'Nature Relaxation 4K',
        views: '128M views',
        duration: '10:15',
        thumbnailGradient: 'from-emerald-900 to-slate-950'
      },
      {
        id: 'EngW7tLk6R8',
        title: 'Space Station 4K: Earth from Above in Real-Time',
        channel: 'NASA Ultra HD',
        views: '45M views',
        duration: '15:20',
        thumbnailGradient: 'from-blue-950 to-black'
      },
      {
        id: 'fJ9rUzIMcZQ',
        title: 'Queen – Bohemian Rhapsody (Official Video Remastered)',
        channel: 'Queen Official',
        views: '1.6B views',
        duration: '06:00',
        thumbnailGradient: 'from-purple-950 to-slate-950'
      },
      {
        id: 'kJQP7kiw5Fk',
        title: 'Top Latin Pop Global Hits 2026',
        channel: 'Vevo Global',
        views: '8.2B views',
        duration: '04:42',
        thumbnailGradient: 'from-amber-950 to-slate-950'
      }
    ],
    Music: [
      {
        id: 'kJQP7kiw5Fk',
        title: 'Latin Fiesta Hits & Dance Beats',
        channel: 'Vevo Music',
        views: '850M views',
        duration: '04:42',
        thumbnailGradient: 'from-rose-950 to-slate-950'
      },
      {
        id: 'fJ9rUzIMcZQ',
        title: 'Bohemian Rhapsody Live Concert in 4K',
        channel: 'Classic Rock',
        views: '1.2B views',
        duration: '06:00',
        thumbnailGradient: 'from-indigo-950 to-slate-950'
      }
    ],
    Nature: [
      {
        id: 'LXb3EKWsInQ',
        title: 'Rainforest Wildlife in 4K HDR 60fps',
        channel: 'Wild Discovery',
        views: '94M views',
        duration: '10:15',
        thumbnailGradient: 'from-teal-950 to-slate-950'
      },
      {
        id: 'EngW7tLk6R8',
        title: 'Our Beautiful Blue Planet from Orbit',
        channel: 'Cosmos 4K',
        views: '32M views',
        duration: '15:20',
        thumbnailGradient: 'from-cyan-950 to-slate-950'
      }
    ]
  };

  const [activeVideo, setActiveVideo] = useState<YouTubeVideo>(curatedVideos.Trending[0]);

  const displayedVideos = curatedVideos[activeCategory] || curatedVideos.Trending;

  const handleSelectVideo = (vid: YouTubeVideo) => {
    tvAudio.playSelect();
    setActiveVideo(vid);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080b11] flex flex-col animate-in fade-in duration-200">
      
      {/* YouTube TV Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-950/90 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
              <Youtube className="w-5 h-5 fill-white" />
            </div>
            <span className="text-lg font-bold text-white font-['Outfit'] tracking-tight">
              YouTube<span className="text-red-500 ml-1">TV</span>
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? 'YouTube पर खोजें...' : 'Search YouTube on TV...'}
              className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <button
          onClick={() => {
            tvAudio.playBack();
            onClose();
          }}
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main YouTube TV Split: Big Player on Left/Top, Video List on Right/Bottom */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden p-6 gap-6">
        
        {/* Main Video Viewport */}
        <div className="flex-1 flex flex-col bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl min-h-[350px]">
          <div className="relative flex-1 w-full bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?autoplay=1&rel=0&modestbranding=1`}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full min-h-[320px] lg:min-h-[460px] border-0"
            />
          </div>

          <div className="p-4 bg-slate-950 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white line-clamp-1 font-['Outfit']">
                {activeVideo.title}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeVideo.channel} · <span className="font-mono text-cyan-400">{activeVideo.views}</span>
              </p>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${activeVideo.id}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-semibold hover:bg-red-600 hover:text-white transition-all shrink-0"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Video Guide Sidebar */}
        <div className="w-full lg:w-96 flex flex-col bg-slate-950/80 rounded-3xl p-4 border border-slate-800 overflow-hidden shadow-xl">
          
          {/* Categories */}
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800 overflow-x-auto no-scrollbar">
            {['Trending', 'Music', 'Nature'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  tvAudio.playNav();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video List */}
          <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar pr-1">
            {displayedVideos.map((vid) => {
              const active = vid.id === activeVideo.id;
              return (
                <div
                  key={vid.id}
                  onClick={() => handleSelectVideo(vid)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                    active
                      ? 'bg-red-950/40 border-red-500/80 shadow-md ring-1 ring-red-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className={`w-24 h-16 rounded-xl bg-gradient-to-br ${vid.thumbnailGradient} flex items-center justify-center text-white shrink-0 shadow relative overflow-hidden`}>
                    <Play className="w-6 h-6 fill-white opacity-80" />
                    <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 px-1 rounded text-slate-300">
                      {vid.duration}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                      {vid.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate mt-1">
                      {vid.channel}
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {vid.views}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
