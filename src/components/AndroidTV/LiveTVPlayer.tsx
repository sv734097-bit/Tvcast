import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Tv, 
  Radio, 
  ChevronUp, 
  ChevronDown, 
  Maximize, 
  Clock, 
  Sparkles
} from 'lucide-react';
import { LiveChannel, LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface LiveTVPlayerProps {
  channels: LiveChannel[];
  language: LanguageMode;
  onClose?: () => void;
}

export const LiveTVPlayer: React.FC<LiveTVPlayerProps> = ({
  channels,
  language,
  onClose
}) => {
  const [selectedChannel, setSelectedChannel] = useState<LiveChannel>(channels[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.8);
  const [showChannelBanner, setShowChannelBanner] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Auto-hide channel banner after 4s
  useEffect(() => {
    setShowChannelBanner(true);
    const timer = setTimeout(() => setShowChannelBanner(false), 4500);
    return () => clearTimeout(timer);
  }, [selectedChannel]);

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

  const toggleMute = () => {
    tvAudio.playNav();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const switchChannel = (ch: LiveChannel) => {
    tvAudio.playSelect();
    setSelectedChannel(ch);
    setIsPlaying(true);
  };

  const nextChannel = () => {
    const currentIndex = channels.findIndex(c => c.id === selectedChannel.id);
    const nextIdx = (currentIndex + 1) % channels.length;
    switchChannel(channels[nextIdx]);
  };

  const prevChannel = () => {
    const currentIndex = channels.findIndex(c => c.id === selectedChannel.id);
    const prevIdx = (currentIndex - 1 + channels.length) % channels.length;
    switchChannel(channels[prevIdx]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full min-h-[600px] mb-8">
      
      {/* Video Screen Container */}
      <div className="relative flex-1 bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center min-h-[380px] lg:min-h-[500px] group">
        
        {/* Main Video Stream */}
        <video
          ref={videoRef}
          src={selectedChannel.streamUrl}
          autoPlay
          loop
          playsInline
          muted={isMuted}
          className="w-full h-full object-cover"
        />

        {/* Live Broadcast Watermark Top Left */}
        <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-red-600/90 text-white text-xs font-bold rounded-md shadow-lg uppercase tracking-wider backdrop-blur-sm">
            <Radio className="w-3.5 h-3.5 animate-pulse text-white" />
            <span>LIVE</span>
          </div>
          <div className="px-3 py-1 bg-slate-900/80 text-white text-xs font-mono font-semibold rounded-md border border-slate-700/60 backdrop-blur-sm">
            CH {selectedChannel.number} · 1080p 60fps
          </div>
        </div>

        {/* Floating Channel Information Banner */}
        <div 
          className={`absolute bottom-16 left-6 right-6 z-20 transition-all duration-300 ${
            showChannelBanner ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="p-4 md:p-5 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-slate-700/80 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg text-sm font-mono shrink-0"
                style={{ backgroundColor: selectedChannel.accentColor }}
              >
                {selectedChannel.logoText}
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono text-cyan-400 font-semibold">CH {selectedChannel.number}</span>
                  <span>·</span>
                  <span>{selectedChannel.genre}</span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-white mt-0.5">
                  {selectedChannel.currentShow}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Next: {selectedChannel.nextShow}</span>
                </p>
              </div>
            </div>

            {/* Program timeline progress bar */}
            <div className="w-full md:w-64 shrink-0">
              <div className="flex justify-between text-[11px] text-slate-400 mb-1 font-mono">
                <span>Progress</span>
                <span>{selectedChannel.progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                  style={{ width: `${selectedChannel.progressPercent}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick Controls Bar */}
        <div className="absolute bottom-3 left-6 right-6 z-20 flex items-center justify-between text-slate-300 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white transition-colors border border-slate-700/80"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white transition-colors border border-slate-700/80"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={prevChannel}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white transition-colors border border-slate-700/80 flex items-center gap-1"
              title="Previous Channel"
            >
              <ChevronUp className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">CH -</span>
            </button>
            <button
              onClick={nextChannel}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-white transition-colors border border-slate-700/80 flex items-center gap-1"
              title="Next Channel"
            >
              <ChevronDown className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">CH +</span>
            </button>
          </div>

          <button
            onClick={() => setShowChannelBanner(!showChannelBanner)}
            className="px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-[11px]"
          >
            {showChannelBanner ? 'Hide Info (I)' : 'Show Info (I)'}
          </button>
        </div>

      </div>

      {/* Right Channel Guide (EPG Sidebar) */}
      <div className="w-full lg:w-96 bg-slate-900/90 rounded-3xl p-5 border border-slate-800 flex flex-col shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white font-['Outfit']">
              {language === 'hi' ? 'लाइव टीवी चैनल सूची' : 'Live Channel Guide'}
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {channels.length} Channels
          </span>
        </div>

        {/* Channel Cards */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 no-scrollbar">
          {channels.map((channel) => {
            const active = channel.id === selectedChannel.id;
            return (
              <button
                key={channel.id}
                onClick={() => switchChannel(channel)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  active
                    ? 'bg-blue-600/20 border-blue-500/80 shadow-md ring-1 ring-blue-500/50'
                    : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-xs text-white shrink-0 shadow font-mono"
                  style={{ backgroundColor: channel.accentColor }}
                >
                  {channel.logoText}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      CH {channel.number}
                    </span>
                    {active && (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Playing
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white truncate mt-0.5">
                    {channel.name}
                  </h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {channel.currentShow}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Tip for normal TV users */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
          <p className="flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              {language === 'hi' 
                ? 'यह लाइव चैनल्स बिना किसी डिश या केबल टीवी के सिर्फ आपके मोबाइल इंटरनेट से सीधे टीवी पर चलते हैं।' 
                : 'All channels stream directly over your phone connection without needing satellite dish or set-top box.'}
            </span>
          </p>
        </div>

      </div>

    </div>
  );
};
