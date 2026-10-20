import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Volume1 } from 'lucide-react';

interface VolumeHUDProps {
  volume: number; // 0 to 100
  isMuted: boolean;
  visible: boolean;
}

export const VolumeHUD: React.FC<VolumeHUDProps> = ({
  volume,
  isMuted,
  visible
}) => {
  if (!visible) return null;

  return (
    <div className="fixed top-8 right-8 z-50 animate-in fade-in slide-in-from-right-4 duration-150">
      <div className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-md">
        
        {/* Icon */}
        <div className="text-cyan-400 shrink-0">
          {isMuted ? (
            <VolumeX className="w-6 h-6 text-red-400" />
          ) : volume > 50 ? (
            <Volume2 className="w-6 h-6 text-cyan-400" />
          ) : (
            <Volume1 className="w-6 h-6 text-cyan-400" />
          )}
        </div>

        {/* Volume Level Bar */}
        <div className="w-40 sm:w-48">
          <div className="flex justify-between text-xs font-mono mb-1.5 font-bold">
            <span className="text-slate-400">TV VOLUME</span>
            <span className={isMuted ? 'text-red-400' : 'text-white'}>
              {isMuted ? 'MUTED' : `${volume}%`}
            </span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-150 ${
                isMuted
                  ? 'bg-red-500 w-full opacity-40'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}
              style={{ width: isMuted ? '100%' : `${volume}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
