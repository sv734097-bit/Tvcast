import React, { useState } from 'react';
import { 
  Play, 
  Info, 
  X, 
  Search, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Star, 
  Plus, 
  Check,
  Film
} from 'lucide-react';
import { ContentItem, LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface NetflixTVModalProps {
  onClose: () => void;
  language: LanguageMode;
  onPlayContent: (item: ContentItem) => void;
}

interface NetflixShow {
  id: string;
  title: string;
  badge: string;
  year: number;
  match: string;
  seasons: string;
  rating: string;
  synopsis: string;
  genre: string[];
  gradient: string;
  videoUrl: string;
}

export const NetflixTVModal: React.FC<NetflixTVModalProps> = ({
  onClose,
  language,
  onPlayContent
}) => {
  const [activeProfile] = useState<'User' | 'Family 4K' | 'Kids'>('User');
  const [myList, setMyList] = useState<string[]>(['net_1', 'net_3']);

  const heroItem: NetflixShow = {
    id: 'net_hero',
    title: 'Stranger Things: Season 5',
    badge: 'TOP 10 TODAY · #1 IN INDIA',
    year: 2026,
    match: '99% Match',
    seasons: '5 Seasons',
    rating: 'U/A 16+',
    synopsis: 'The rift in Hawkins deepens as our heroes prepare for the final battle against Vecna and the Upside Down. Streamed in 4K Ultra HD and Dolby Atmos.',
    genre: ['Sci-Fi', 'Horror', 'Supernatural'],
    gradient: 'from-red-950 via-slate-950 to-black',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  };

  const trendingShows: NetflixShow[] = [
    {
      id: 'net_1',
      title: 'Squid Game: The Challenge',
      badge: 'Trending Now',
      year: 2025,
      match: '98% Match',
      seasons: '2 Seasons',
      rating: '18+',
      synopsis: 'Hundreds of cash-strapped players accept a strange invitation to compete in children games with high stakes.',
      genre: ['Thriller', 'Drama'],
      gradient: 'from-pink-950 via-rose-950 to-slate-950',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    },
    {
      id: 'net_2',
      title: 'Delhi Crime: Syndicate',
      badge: 'Award Winner',
      year: 2026,
      match: '96% Match',
      seasons: '3 Seasons',
      rating: '18+',
      synopsis: 'DCP Vartika Chaturvedi and her elite team investigate high-profile criminal rings in the capital.',
      genre: ['Crime', 'Police'],
      gradient: 'from-neutral-900 via-stone-950 to-black',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      id: 'net_3',
      title: 'Money Heist: Berlin Redux',
      badge: 'Blockbuster',
      year: 2025,
      match: '97% Match',
      seasons: '1 Season',
      rating: '16+',
      synopsis: 'During his golden age, Berlin gathers a master crew in Paris for one of his greatest jewel heists.',
      genre: ['Heist', 'Action'],
      gradient: 'from-red-900 via-rose-950 to-black',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: 'net_4',
      title: 'Cyberpunk: Neon Horizon',
      badge: '4K HDR',
      year: 2026,
      match: '95% Match',
      seasons: '1 Season',
      rating: '18+',
      synopsis: 'A street kid trying to survive in a technology and body modification-obsessed city of the future.',
      genre: ['Anime', 'Sci-Fi'],
      gradient: 'from-cyan-950 via-blue-950 to-black',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    }
  ];

  const handlePlayShow = (show: NetflixShow) => {
    tvAudio.playSelect();
    onPlayContent({
      id: show.id,
      title: show.title,
      category: `Netflix 4K Original · ${show.seasons}`,
      rating: '9.5',
      duration: '45m/ep',
      year: show.year,
      genre: show.genre,
      description: show.synopsis,
      videoUrl: show.videoUrl,
      thumbnailGradient: show.gradient
    });
  };

  const toggleMyList = (id: string) => {
    tvAudio.playNav();
    setMyList(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#141414] text-white flex flex-col overflow-y-auto font-sans animate-in fade-in duration-200">
      
      {/* Netflix Top Bar */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-sm px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-black text-[#E50914] tracking-wider uppercase font-['Outfit']">
              NETFLIX
            </span>
            <span className="text-[10px] bg-red-600/20 text-red-400 border border-red-600/30 px-1.5 py-0.5 rounded font-mono font-bold">
              TV OS
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <button className="text-white font-bold hover:text-white transition-colors">Home</button>
            <button className="hover:text-white transition-colors">Series</button>
            <button className="hover:text-white transition-colors">Films</button>
            <button className="hover:text-white transition-colors">New & Popular</button>
            <button className="hover:text-white transition-colors">My List ({myList.length})</button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-black/60 border border-neutral-800 rounded-full px-3 py-1 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-300">{activeProfile}</span>
          </div>

          <button
            onClick={() => {
              tvAudio.playBack();
              onClose();
            }}
            className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white transition-all hover:scale-105 active:scale-95"
            title="Exit Netflix (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Hero Showcase Billboard */}
      <div className="relative min-h-[420px] md:min-h-[500px] flex flex-col justify-end px-6 md:px-12 pb-12 pt-16 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent">
        
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 via-neutral-950/80 to-[#141414] -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent -z-10" />

        <div className="max-w-2xl space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded bg-red-600 text-white font-black text-[11px] tracking-wider uppercase">
              NETFLIX ORIGINAL
            </span>
            <span className="text-xs font-bold text-red-400 font-mono">
              {heroItem.badge}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight font-['Outfit']">
            {heroItem.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
            <span className="text-emerald-400 font-bold">{heroItem.match}</span>
            <span>{heroItem.year}</span>
            <span className="border border-slate-700 px-1 py-0.2 rounded text-[10px] text-slate-400">
              {heroItem.rating}
            </span>
            <span>{heroItem.seasons}</span>
            <span className="text-cyan-400 font-mono font-bold">Ultra HD 4K</span>
          </div>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed line-clamp-3">
            {heroItem.synopsis}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => handlePlayShow(heroItem)}
              className="flex items-center gap-2.5 px-7 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-extrabold text-sm transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            >
              <Play className="w-5 h-5 fill-black" />
              <span>{language === 'hi' ? 'चलाएं (Play)' : 'Play'}</span>
            </button>

            <button
              onClick={() => toggleMyList(heroItem.id)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-800/90 hover:bg-neutral-700 border border-neutral-600 text-white font-semibold text-sm transition-all"
            >
              {myList.includes(heroItem.id) ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>My List</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to List</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Row: Trending Shows */}
      <div className="px-6 md:px-12 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold text-white font-['Outfit']">
            {language === 'hi' ? 'आज भारत में ट्रेंडिंग' : 'Trending Now on Netflix'}
          </h3>
          <span className="text-xs text-neutral-400 font-medium hover:text-white cursor-pointer flex items-center gap-1">
            Explore All <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {trendingShows.map((show) => (
            <div
              key={show.id}
              onClick={() => handlePlayShow(show)}
              className="group relative rounded-xl bg-neutral-900 border border-neutral-800 hover:border-red-600/80 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-950/30"
            >
              <div className={`h-40 bg-gradient-to-br ${show.gradient} p-4 flex flex-col justify-between relative`}>
                <span className="text-[10px] font-mono uppercase tracking-wider text-red-300 font-bold bg-black/40 px-2 py-0.5 rounded self-start">
                  {show.badge}
                </span>

                <div>
                  <h4 className="text-base font-bold text-white leading-tight">
                    {show.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300 mt-1">
                    <span className="text-emerald-400 font-semibold">{show.match}</span>
                    <span>{show.seasons}</span>
                  </div>
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-neutral-950">
                <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                  {show.synopsis}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
