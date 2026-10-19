import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  X, 
  Settings2,
  Tv
} from 'lucide-react';
import { ContentItem } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface VideoPlayerModalProps {
  content: ContentItem | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  content,
  onClose
}) => {
  if (!content) return null;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [quality, setQuality] = useState<'4K Ultra HD' | '1080p HDR' | '720p'>('4K Ultra HD');

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  const togglePlay = () => {
    tvAudio.playNav();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const seek = (seconds: number) => {
    tvAudio.playNav();
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (!duration) setDuration(videoRef.current.duration);
    }
  };

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) {
      videoRef.current.currentTime = val;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      {/* Video element */}
      <video
        ref={videoRef}
        src={content.videoUrl}
        autoPlay
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (videoRef.current) setDuration(videoRef.current.duration);
        }}
        onClick={togglePlay}
        className="w-full h-full object-contain cursor-pointer"
      />

      {/* Top Header Bar */}
      <div 
        className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 z-10 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              tvAudio.playBack();
              onClose();
            }}
            className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-white transition-transform hover:scale-110"
            title="Exit Fullscreen Player (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white font-['Outfit']">
              {content.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
              <span>{content.year}</span>
              <span>·</span>
              <span>{content.duration}</span>
              <span>·</span>
              <span className="text-cyan-400 font-mono">{quality}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-blue-600/30 border border-blue-500/40 text-cyan-300 text-xs font-mono rounded-lg">
            Dolby Digital Plus 5.1
          </div>
        </div>
      </div>

      {/* Bottom Controls Overlay */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 z-10 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber */}
        <div className="flex items-center gap-4 mb-4">
          <span className="text-xs font-mono text-slate-300 tabular-nums min-w-[45px]">
            {formatTime(currentTime)}
          </span>
          <div className="relative flex-1 group">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleScrubberChange}
              className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:h-2.5 transition-all"
            />
          </div>
          <span className="text-xs font-mono text-slate-400 tabular-nums min-w-[45px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={() => seek(-10)}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 transition-colors"
              title="Rewind 10s"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/30 transition-transform hover:scale-105 active:scale-95"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>

            <button
              onClick={() => seek(10)}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 transition-colors"
              title="Forward 10s"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                tvAudio.playNav();
                if (videoRef.current) {
                  videoRef.current.muted = !videoRef.current.muted;
                  setIsMuted(videoRef.current.muted);
                }
              }}
              className="p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700/80 transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Resolution Selector */}
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value as unknown as typeof quality)}
              className="bg-slate-900 text-white text-xs px-3 py-1.5 rounded-lg border border-slate-700 font-mono focus:outline-none"
            >
              <option value="4K Ultra HD">4K UHD</option>
              <option value="1080p HDR">1080p HDR</option>
              <option value="720p">720p</option>
            </select>

            <button
              onClick={() => {
                tvAudio.playBack();
                onClose();
              }}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
            >
              Exit Player (Esc)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
