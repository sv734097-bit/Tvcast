import React, { useState, useRef } from 'react';
import { Play, Info, Volume2, VolumeX, Sparkles, Star } from 'lucide-react';
import { ContentItem, LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface HeroBillboardProps {
  content: ContentItem;
  onPlay: (content: ContentItem) => void;
  language: LanguageMode;
}

export const HeroBillboard: React.FC<HeroBillboardProps> = ({
  content,
  onPlay,
  language
}) => {
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggleSound = () => {
    tvAudio.playNav();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full h-[380px] md:h-[460px] lg:h-[520px] rounded-2xl md:rounded-3xl overflow-hidden bg-slate-950 border border-slate-800/80 shadow-2xl mb-8 group">
      
      {/* Background Video / Graphic Scrim */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={content.videoUrl}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Cinematic Scrims (Vertical & Horizontal for legibility) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent w-full md:w-3/4" />
      </div>

      {/* Top Banner Tag */}
      <div className="absolute top-6 left-6 md:left-10 z-10 flex items-center gap-2">
        <span className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600/90 to-indigo-600/90 text-white text-xs font-semibold rounded-md shadow-md backdrop-blur-sm border border-blue-400/30">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          {language === 'hi' ? 'स्पॉटलाइट 4K ब्लॉकबस्टर' : 'Spotlight 4K UHD'}
        </span>
        <span className="text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/60 font-mono">
          Dolby Atmos 5.1
        </span>
      </div>

      {/* Sound Mute Toggle on Bottom Right */}
      <button
        onClick={toggleSound}
        className="absolute bottom-6 right-6 z-20 p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-white hover:bg-slate-800 transition-all shadow-lg hover:scale-110"
        title={isMuted ? 'Unmute Trailer Audio' : 'Mute Trailer Audio'}
      >
        {isMuted ? <VolumeX className="w-5 h-5 text-slate-300" /> : <Volume2 className="w-5 h-5 text-cyan-400 animate-pulse" />}
      </button>

      {/* Hero Content Overlay */}
      <div className="absolute bottom-6 left-6 md:left-10 z-10 max-w-2xl">
        {/* Rating and Metadata */}
        <div className="flex items-center gap-3 text-xs md:text-sm text-slate-300 mb-2.5 font-medium">
          <span className="flex items-center gap-1 text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {content.rating}
          </span>
          <span className="font-mono text-slate-300">{content.year}</span>
          <span className="text-slate-500">·</span>
          <span>{content.duration}</span>
          <span className="text-slate-500">·</span>
          <span className="text-cyan-300 font-medium">{content.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3 font-['Outfit'] drop-shadow-md">
          {content.title}
        </h1>

        {/* Description */}
        <p className="text-xs md:text-sm text-slate-300/90 leading-relaxed mb-6 line-clamp-2 md:line-clamp-3 max-w-xl">
          {content.description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              tvAudio.playSelect();
              onPlay(content);
            }}
            className="flex items-center gap-2.5 px-6 py-3 bg-white text-slate-950 font-bold text-sm rounded-xl hover:bg-slate-200 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-white/10 tv-card-focus"
          >
            <Play className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>{language === 'hi' ? 'अभी चलाएं (Play)' : 'Play Movie'}</span>
          </button>

          <button
            onClick={() => {
              tvAudio.playSelect();
              onPlay(content);
            }}
            className="flex items-center gap-2 px-5 py-3 bg-slate-900/80 hover:bg-slate-800 text-white font-medium text-sm rounded-xl border border-slate-700/80 transition-all backdrop-blur-md hover:scale-105"
          >
            <Info className="w-4 h-4 text-cyan-400" />
            <span>{language === 'hi' ? 'ट्रेलर व जानकारी' : 'Details & Trailer'}</span>
          </button>
        </div>
      </div>

    </section>
  );
};
