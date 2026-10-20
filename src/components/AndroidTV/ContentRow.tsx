import React, { useRef } from 'react';
import { Play, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { ContentItem } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface ContentRowProps {
  title: string;
  subtitle?: string;
  items: ContentItem[];
  onSelect: (item: ContentItem) => void;
  focusedIndex?: number | null;
}

export const ContentRow: React.FC<ContentRowProps> = ({
  title,
  subtitle,
  items,
  onSelect,
  focusedIndex
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    tvAudio.playNav();
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="mb-10">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight font-['Outfit']">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Scroll Chevrons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth snap-x"
      >
        {items.map((item, idx) => {
          const isFocused = focusedIndex === idx;
          return (
            <div
              key={item.id}
              onClick={() => {
                tvAudio.playSelect();
                onSelect(item);
              }}
              onMouseEnter={() => tvAudio.playNav()}
              className={`group shrink-0 w-64 md:w-72 rounded-2xl bg-slate-900/90 border overflow-hidden cursor-pointer snap-start transition-all duration-200 tv-card-focus ${
                isFocused
                  ? 'ring-4 ring-cyan-400 border-cyan-400 scale-105 shadow-[0_0_35px_rgba(34,211,238,0.7)] z-20 bg-slate-850'
                  : 'border-slate-800 hover:border-slate-600 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/60'
              }`}
            >
            {/* Card Thumbnail / Poster Art */}
            <div className={`relative h-36 md:h-40 bg-gradient-to-br ${item.thumbnailGradient} flex items-center justify-center overflow-hidden`}>
              
              {/* Subtle visual texture */}
              <div className="absolute inset-0 bg-radial from-white/10 to-transparent opacity-30" />
              
              <div className="text-center p-4 relative z-10">
                <span className="text-xs uppercase font-mono tracking-widest text-cyan-300 font-semibold opacity-90">
                  {item.category.split('·')[0]}
                </span>
                <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">
                  {item.title}
                </h4>
              </div>

              {/* Hover Play Button */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-amber-300 border border-amber-500/30">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{item.rating}</span>
              </div>
            </div>

            {/* Card Content & Metadata (Zero-Pill formatting) */}
            <div className="p-3.5">
              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                {item.title}
              </h3>
              
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-1.5 font-medium">
                <span className="font-mono text-slate-300">{item.year}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{item.duration}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span className="text-slate-400 truncate">{item.genre[0]}</span>
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-2 mt-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
};
