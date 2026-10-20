import React, { useState } from 'react';
import { 
  Play, 
  X, 
  Info, 
  Search, 
  Plus, 
  Check, 
  ChevronRight, 
  ShieldCheck,
  Video
} from 'lucide-react';
import { ContentItem, LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface PrimeVideoModalProps {
  onClose: () => void;
  language: LanguageMode;
  onPlayContent: (item: ContentItem) => void;
}

export const PrimeVideoModal: React.FC<PrimeVideoModalProps> = ({
  onClose,
  language,
  onPlayContent
}) => {
  const [watchlist, setWatchlist] = useState<string[]>(['prime_1']);

  const primeHero = {
    id: 'prime_mirzapur',
    title: 'Mirzapur: Season 3',
    badge: 'AMAZON ORIGINAL · #1 IN INDIA',
    year: 2025,
    rating: '9.3',
    seasons: '3 Seasons',
    synopsis: 'The throne of Mirzapur remains contested as Guddu Pandit and Golu clash with the Tyagis and Sharad Shukla for total dominance across Purvanchal.',
    cast: 'Pankaj Tripathi, Ali Fazal, Shweta Tripathi',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    gradient: 'from-amber-950 via-neutral-950 to-black'
  };

  const primeShows = [
    {
      id: 'prime_1',
      title: 'Panchayat: Season 3',
      badge: 'Amazon Original',
      year: 2025,
      rating: '9.0',
      duration: '8 Episodes',
      synopsis: 'Abhishek Tripathi navigates local Phulera politics, village rivalries, and his MBA aspirations.',
      gradient: 'from-emerald-950 via-teal-950 to-slate-950',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 'prime_2',
      title: 'The Boys: Season 4',
      badge: 'Amazon Exclusive',
      year: 2025,
      rating: '8.8',
      duration: '8 Episodes',
      synopsis: 'Victoria Neuman is closer than ever to the Oval Office while Butcher has only months left to live.',
      gradient: 'from-sky-950 via-blue-950 to-black',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: 'prime_3',
      title: 'Citadel: Honey Bunny',
      badge: 'Action Blockbuster',
      year: 2025,
      rating: '8.6',
      duration: '6 Episodes',
      synopsis: 'Stuntman Bunny and struggling actress Honey are recruited for a high-stakes espionage mission.',
      gradient: 'from-red-950 via-stone-950 to-black',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    }
  ];

  const handlePlay = (item: typeof primeHero) => {
    tvAudio.playSelect();
    onPlayContent({
      id: item.id,
      title: item.title,
      category: `Prime Video · 4K HDR`,
      rating: item.rating,
      duration: '45m/ep',
      year: item.year,
      genre: ['Action', 'Amazon Original', 'Hindi'],
      description: item.synopsis,
      videoUrl: item.videoUrl,
      thumbnailGradient: item.gradient
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] text-white flex flex-col overflow-y-auto font-sans animate-in fade-in duration-200">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur-md px-6 md:px-12 py-3.5 border-b border-sky-950 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black text-[#00A8E1] tracking-tight font-['Outfit']">
              prime<span className="text-white">video</span>
            </span>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
              X-RAY TV
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-slate-300 font-medium">
            <button className="text-white font-bold hover:text-white">Home</button>
            <button className="hover:text-white">Store</button>
            <button className="hover:text-white">Live TV</button>
            <button className="hover:text-white">Categories</button>
            <button className="hover:text-white">My Stuff ({watchlist.length})</button>
          </nav>
        </div>

        <button
          onClick={() => {
            tvAudio.playBack();
            onClose();
          }}
          className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white transition-all hover:scale-105 active:scale-95"
          title="Exit Prime Video (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Hero Spotlight */}
      <div className="relative px-6 md:px-12 py-10 bg-gradient-to-r from-sky-950/80 via-[#0f172a] to-black border-b border-slate-800">
        <div className="max-w-2xl space-y-4">
          <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded border border-sky-500/40">
            {primeHero.badge}
          </span>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-['Outfit']">
            {primeHero.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
            <span className="text-amber-400 font-bold">IMDb {primeHero.rating}</span>
            <span>·</span>
            <span>{primeHero.year}</span>
            <span>·</span>
            <span>{primeHero.seasons}</span>
            <span>·</span>
            <span className="text-sky-300 font-bold">UHD 4K HDR</span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {primeHero.synopsis}
          </p>

          <p className="text-xs text-slate-400">
            <span className="text-slate-500">Starring: </span>{primeHero.cast}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => handlePlay(primeHero)}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-[#00A8E1] hover:bg-[#0092c4] text-slate-950 font-black text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-sky-500/20"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>Watch Season 3 Ep 1</span>
            </button>

            <button
              onClick={() => {
                tvAudio.playNav();
                setWatchlist(prev => 
                  prev.includes(primeHero.id) ? prev.filter(i => i !== primeHero.id) : [...prev, primeHero.id]
                );
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white text-xs font-semibold"
            >
              {watchlist.includes(primeHero.id) ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>In Watchlist</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add to Watchlist</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Row: Prime Originals */}
      <div className="px-6 md:px-12 py-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg md:text-xl font-bold text-white font-['Outfit']">
            {language === 'hi' ? 'अमेज़न ओरिजिनल टीवी सीरीज' : 'Amazon Original TV Series'}
          </h3>
          <span className="text-xs text-sky-400 hover:underline cursor-pointer">
            Explore 100+ Titles
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {primeShows.map((show) => (
            <div
              key={show.id}
              onClick={() => {
                tvAudio.playSelect();
                onPlayContent({
                  id: show.id,
                  title: show.title,
                  category: `Prime Video · ${show.badge}`,
                  rating: show.rating,
                  duration: show.duration,
                  year: show.year,
                  genre: ['Amazon Prime', 'Original'],
                  description: show.synopsis,
                  videoUrl: show.videoUrl,
                  thumbnailGradient: show.gradient
                });
              }}
              className="group relative rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-sky-950/40"
            >
              <div className={`h-40 bg-gradient-to-br ${show.gradient} p-4 flex flex-col justify-between relative`}>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-300 font-bold bg-black/60 px-2 py-0.5 rounded self-start border border-sky-500/30">
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
                  <div className="w-12 h-12 rounded-full bg-sky-400 text-slate-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950">
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
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
