import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  X, 
  ExternalLink, 
  Bookmark, 
  ShieldCheck, 
  Maximize2 
} from 'lucide-react';
import { LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface WebBrowserModalProps {
  onClose: () => void;
  language: LanguageMode;
}

interface BookmarkSite {
  name: string;
  url: string;
  category: string;
  iconBg: string;
}

export const WebBrowserModal: React.FC<WebBrowserModalProps> = ({
  onClose,
  language
}) => {
  const [currentUrl, setCurrentUrl] = useState<string>('https://en.wikipedia.org/wiki/Smart_TV');
  const [inputUrl, setInputUrl] = useState<string>('https://en.wikipedia.org/wiki/Smart_TV');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const bookmarks: BookmarkSite[] = [
    { name: 'Wikipedia Smart TV', url: 'https://en.wikipedia.org/wiki/Smart_TV', category: 'Encyclopedia', iconBg: 'bg-neutral-800' },
    { name: 'Google Open Web', url: 'https://archive.org', category: 'Archive & Media', iconBg: 'bg-blue-600' },
    { name: 'NASA Space Astronomy', url: 'https://images.nasa.gov', category: 'Science & Space', iconBg: 'bg-indigo-700' },
    { name: 'Internet Speed Test', url: 'https://fast.com', category: 'Speed & Network', iconBg: 'bg-red-600' },
    { name: 'Weather Radar 24/7', url: 'https://www.windy.com', category: 'Live Radar', iconBg: 'bg-cyan-600' }
  ];

  const handleNavigate = (targetUrl: string) => {
    tvAudio.playNav();
    let normalized = targetUrl.trim();
    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      if (normalized.includes('.')) {
        normalized = 'https://' + normalized;
      } else {
        normalized = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(normalized)}`;
      }
    }
    setInputUrl(normalized);
    setCurrentUrl(normalized);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNavigate(inputUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0e17] text-white flex flex-col font-sans animate-in fade-in duration-200">
      
      {/* Browser Navigation Toolbar */}
      <div className="bg-slate-900/95 border-b border-slate-800 px-4 md:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Controls & Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Globe className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white hidden sm:inline font-['Outfit']">
            Chrome <span className="text-cyan-400">TV Browser</span>
          </span>

          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => tvAudio.playNav()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => tvAudio.playNav()}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleNavigate(currentUrl)}
              className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
                isLoading ? 'animate-spin text-cyan-400' : ''
              }`}
              title="Reload"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: URL / Search Input Bar */}
        <form onSubmit={handleFormSubmit} className="flex-1 max-w-2xl relative">
          <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-700/80 rounded-xl px-3 py-1.5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Search Google or enter web address..."
              className="w-full bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold font-mono transition-all shrink-0"
            >
              GO
            </button>
          </div>
        </form>

        {/* Right: Close button */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Open in new window"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              tvAudio.playBack();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all hover:scale-105 active:scale-95"
            title="Close Browser (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Bookmarks Bar */}
      <div className="bg-slate-950/90 border-b border-slate-800 px-4 md:px-8 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
        <span className="text-slate-500 text-[11px] font-mono mr-1 shrink-0">Bookmarks:</span>
        {bookmarks.map((bm) => (
          <button
            key={bm.name}
            onClick={() => handleNavigate(bm.url)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all shrink-0 active:scale-95 text-[11px]"
          >
            <span className={`w-2 h-2 rounded-full ${bm.iconBg}`} />
            <span>{bm.name}</span>
          </button>
        ))}
      </div>

      {/* Main Browser Viewport */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-500 animate-pulse z-20" />
        )}

        <iframe
          src={currentUrl}
          title="TV Web Browser"
          className="w-full h-full border-0 bg-white"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>

    </div>
  );
};
