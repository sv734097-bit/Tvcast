import React, { useState } from 'react';
import { 
  Play, 
  X, 
  Tv, 
  Radio, 
  Trophy, 
  Flame, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ContentItem, LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface HotstarTVModalProps {
  onClose: () => void;
  language: LanguageMode;
  onPlayContent: (item: ContentItem) => void;
}

export const HotstarTVModal: React.FC<HotstarTVModalProps> = ({
  onClose,
  language,
  onPlayContent
}) => {
  const [activeTab, setActiveTab] = useState<'cricket' | 'movies' | 'specials'>('cricket');
  const [audioCommentary, setAudioCommentary] = useState<'Hindi' | 'English' | 'Bhojpuri'>('Hindi');

  const liveCricketMatch = {
    title: 'ICC Men\'s World Cup Final 2026: IND vs AUS',
    badge: 'LIVE · 4K ULTRA HD',
    score: 'IND 248/4 (38.2 ov) · RR 6.47',
    batsmen: 'V. Kohli 84* (72) · K.L. Rahul 42* (39)',
    bowler: 'P. Cummins 1/45 (7.2 ov)',
    status: 'India needs 46 runs in 70 balls to lift the trophy',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  };

  const hotstarShows = [
    {
      id: 'hot_1',
      title: 'Brahmastra: Part Two - Dev',
      badge: 'Exclusive Premiere',
      genre: 'Mythology · Action 4K',
      year: 2026,
      rating: '8.9',
      duration: '2h 45m',
      gradient: 'from-amber-950 via-red-950 to-slate-950',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    },
    {
      id: 'hot_2',
      title: 'Special OPS 3: Operation Thunder',
      badge: 'Hotstar Special',
      genre: 'Espionage · Thriller',
      year: 2026,
      rating: '9.2',
      duration: '8 Episodes',
      gradient: 'from-emerald-950 via-teal-950 to-black',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    },
    {
      id: 'hot_3',
      title: 'Aarya: Antim Vaar',
      badge: 'Season Finale',
      genre: 'Crime Drama',
      year: 2025,
      rating: '9.0',
      duration: '6 Episodes',
      gradient: 'from-rose-950 via-slate-950 to-black',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    }
  ];

  const handleWatchLiveCricket = () => {
    tvAudio.playSelect();
    onPlayContent({
      id: 'live_ind_aus',
      title: liveCricketMatch.title,
      category: `Live Cricket · ${liveCricketMatch.badge}`,
      rating: '10.0',
      duration: 'LIVE',
      year: 2026,
      genre: ['Cricket', 'Live Broadcast', '4K HDR'],
      description: `${liveCricketMatch.score} · ${liveCricketMatch.batsmen}. Commentary in ${audioCommentary}.`,
      videoUrl: liveCricketMatch.videoUrl,
      thumbnailGradient: 'from-blue-900 via-emerald-900 to-slate-950'
    });
  };

  const handlePlayShow = (show: typeof hotstarShows[0]) => {
    tvAudio.playSelect();
    onPlayContent({
      id: show.id,
      title: show.title,
      category: `JioHotstar VIP · ${show.badge}`,
      rating: show.rating,
      duration: show.duration,
      year: show.year,
      genre: [show.genre],
      description: 'Exclusive blockbuster streaming in 4K Dolby Atmos on your Android TV.',
      videoUrl: show.videoUrl,
      thumbnailGradient: show.gradient
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0c111b] text-white flex flex-col overflow-y-auto font-sans animate-in fade-in duration-200">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0c111b]/95 backdrop-blur-md px-6 md:px-12 py-3.5 border-b border-blue-950/60 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent uppercase tracking-wider font-['Outfit']">
              JioHotstar
            </span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded font-mono font-bold">
              4K TV
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {(['cricket', 'movies', 'specials'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  tvAudio.playNav();
                  setActiveTab(tab);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab === 'cricket' ? '🏏 Live Cricket' : tab === 'movies' ? '🎬 Movies' : '⭐ Hotstar Specials'}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Commentary Selector */}
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs">
            <span className="text-slate-400">Audio:</span>
            {(['Hindi', 'English'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => setAudioCommentary(lang)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  audioCommentary === lang ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              tvAudio.playBack();
              onClose();
            }}
            className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white transition-all hover:scale-105 active:scale-95"
            title="Close Hotstar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Live Cricket Banner Billboard */}
      <div className="relative px-6 md:px-12 py-8 bg-gradient-to-r from-blue-950/80 via-[#0c111b] to-emerald-950/70 border-b border-slate-800/80">
        
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold uppercase animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white" />
              LIVE STREAM
            </span>
            <span className="text-xs font-mono font-bold text-amber-400">
              ICC Cricket World Cup
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
            {liveCricketMatch.title}
          </h1>

          {/* Real Live Scorecard Widget */}
          <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/40 backdrop-blur-md max-w-xl shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg md:text-2xl font-black font-mono text-cyan-300">
                {liveCricketMatch.score}
              </span>
              <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-semibold">
                4K HDR 60fps
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300 pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-500">Batting: </span>
                <span className="text-white font-bold">{liveCricketMatch.batsmen}</span>
              </div>
              <div>
                <span className="text-slate-500">Bowling: </span>
                <span className="text-white">{liveCricketMatch.bowler}</span>
              </div>
            </div>

            <p className="text-[11px] text-amber-300 mt-2 font-medium">
              ⚡ {liveCricketMatch.status}
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleWatchLiveCricket}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/20"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>{language === 'hi' ? 'लाइव मैच 4K में देखें' : 'Watch Live Match in 4K'}</span>
            </button>

            <span className="text-xs text-slate-400 font-mono">
              Commentary: {audioCommentary} · Ultra HD
            </span>
          </div>
        </div>
      </div>

      {/* Row: Hotstar Specials & Bollywood */}
      <div className="px-6 md:px-12 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold text-white font-['Outfit']">
            {language === 'hi' ? 'हॉटस्टार स्पेशल व फिल्में' : 'Hotstar Specials & Blockbusters'}
          </h3>
          <span className="text-xs text-slate-400 hover:text-white cursor-pointer flex items-center gap-1">
            See All <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {hotstarShows.map((show) => (
            <div
              key={show.id}
              onClick={() => handlePlayShow(show)}
              className="group relative rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-950/40"
            >
              <div className={`h-44 bg-gradient-to-br ${show.gradient} p-4 flex flex-col justify-between relative`}>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold bg-black/50 px-2 py-0.5 rounded self-start border border-emerald-500/30">
                  {show.badge}
                </span>

                <div>
                  <h4 className="text-base font-bold text-white leading-tight">
                    {show.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-1">
                    <span className="text-amber-400 font-bold">★ {show.rating}</span>
                    <span>·</span>
                    <span>{show.duration}</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950/90 border-t border-slate-800">
                <span className="text-xs text-slate-400">{show.genre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
