import React, { useState, useRef, useEffect } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  X, 
  Disc, 
  Sparkles,
  Heart
} from 'lucide-react';
import { tvAudio } from '../../utils/audio';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverGradient: string;
  audioUrl: string;
}

interface SpotifyTVModalProps {
  onClose: () => void;
  language: 'hi' | 'en';
}

export const SpotifyTVModal: React.FC<SpotifyTVModalProps> = ({
  onClose,
  language
}) => {
  const tracks: Track[] = [
    {
      id: '1',
      title: 'Midnight Highway Synthwave',
      artist: 'Retro Wave Collective',
      album: 'Neon Horizon',
      duration: '03:45',
      coverGradient: 'from-purple-600 via-pink-600 to-slate-950',
      audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
    },
    {
      id: '2',
      title: 'Bollywood Sunset Beats',
      artist: 'Acoustic Mumbai',
      album: 'Monsoon Chai',
      duration: '04:12',
      coverGradient: 'from-amber-600 via-orange-600 to-slate-950',
      audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: '3',
      title: 'Deep Focus Lo-Fi Study',
      artist: 'Chillout Space',
      album: 'Peaceful Rain',
      duration: '02:50',
      coverGradient: 'from-emerald-600 via-teal-700 to-slate-950',
      audioUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    }
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(20);
  const audioRef = useRef<HTMLVideoElement | null>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress(p => (p >= 100 ? 0 : p + 1));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    tvAudio.playNav();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    tvAudio.playNav();
    setCurrentTrackIndex((currentTrackIndex + 1) % tracks.length);
    setProgress(0);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    tvAudio.playNav();
    setCurrentTrackIndex((currentTrackIndex - 1 + tracks.length) % tracks.length);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#080b11] flex flex-col justify-between p-6 md:p-10 select-none animate-in fade-in duration-200">
      
      {/* Background audio element */}
      <video
        ref={audioRef}
        src={currentTrack.audioUrl}
        autoPlay
        loop
        playsInline
        className="hidden"
      />

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-green-500/30">
            <Music className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white font-['Outfit']">
              Spotify <span className="text-green-400">TV</span>
            </h2>
            <p className="text-xs text-slate-400">Hi-Fi Audio Experience for Big Screen</p>
          </div>
        </div>

        <button
          onClick={() => {
            tvAudio.playBack();
            onClose();
          }}
          className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Spotlight & Equalizer */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 my-auto py-6">
        
        {/* Album Cover Art */}
        <div className={`relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br ${currentTrack.coverGradient} p-6 flex flex-col justify-between shadow-2xl shadow-green-950/30 border border-white/10 group`}>
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/80 font-bold bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-sm">
              DOLBY AUDIO
            </span>
            <Disc className={`w-8 h-8 text-white/80 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </div>

          <div>
            <span className="text-xs text-white/70 font-medium">{currentTrack.album}</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 leading-tight font-['Outfit']">
              {currentTrack.title}
            </h3>
            <p className="text-sm text-green-300 font-semibold mt-0.5">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Player Controls & Animated Equalizer */}
        <div className="w-full max-w-lg space-y-6">
          
          {/* Animated Audio Equalizer Bars */}
          <div className="flex items-end justify-center gap-1.5 h-16 bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
            {[40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 35, 75].map((height, idx) => (
              <div
                key={idx}
                className="w-2 bg-gradient-to-t from-green-600 to-cyan-400 rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${Math.max(15, (height * (progress % 10)) / 10 + 10)}%` : '15%'
                }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>01:{progress < 10 ? `0${progress}` : progress}</span>
              <span>{currentTrack.duration}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="p-3 rounded-full hover:bg-slate-900 text-slate-400 transition-colors"
              title="Like Song"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-green-500 text-green-500' : ''}`} />
            </button>

            <button
              onClick={prevTrack}
              className="p-3 rounded-full hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
              title="Previous Track"
            >
              <SkipBack className="w-6 h-6" />
            </button>

            <button
              onClick={togglePlay}
              className="p-5 rounded-full bg-green-500 hover:bg-green-400 text-slate-950 shadow-xl shadow-green-500/40 transform hover:scale-105 active:scale-95 transition-all"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-7 h-7 fill-slate-950" /> : <Play className="w-7 h-7 fill-slate-950 ml-0.5" />}
            </button>

            <button
              onClick={nextTrack}
              className="p-3 rounded-full hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
              title="Next Track"
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>

          {/* Playlist preview */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Up Next</span>
            {tracks.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  tvAudio.playSelect();
                  setCurrentTrackIndex(idx);
                  setProgress(0);
                  setIsPlaying(true);
                }}
                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                  idx === currentTrackIndex
                    ? 'bg-green-950/30 border-green-500/50 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="truncate">
                  <span className="font-semibold block truncate">{t.title}</span>
                  <span className="text-[11px] text-slate-500">{t.artist}</span>
                </div>
                <span className="font-mono text-slate-500 ml-2">{t.duration}</span>
              </button>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
