import React, { useState } from 'react';
import { 
  HardDrive, 
  Usb, 
  Film, 
  Music, 
  Image as ImageIcon, 
  Upload, 
  Play, 
  CheckCircle2, 
  Smartphone, 
  AlertCircle,
  FileVideo,
  FileAudio
} from 'lucide-react';
import { USBFile, LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface USBMediaHubProps {
  language: LanguageMode;
  usbConnected: boolean;
  onToggleUsb: () => void;
  onPlayMedia: (file: USBFile) => void;
}

export const USBMediaHub: React.FC<USBMediaHubProps> = ({
  language,
  usbConnected,
  onToggleUsb,
  onPlayMedia
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'audio' | 'image'>('all');
  const [selectedFile, setSelectedFile] = useState<USBFile | null>(null);

  // Sample files found on phone storage
  const [files, setFiles] = useState<USBFile[]>([
    {
      name: 'Goa_Beach_Vacation_2026_4K.mp4',
      type: 'video',
      size: '1.4 GB',
      duration: '04:12',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      name: 'Family_Wedding_Celebration_Dance.mp4',
      type: 'video',
      size: '850 MB',
      duration: '03:45',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      name: 'Road_Trip_Himalayas_DJ_Remix.mp3',
      type: 'audio',
      size: '12.4 MB',
      duration: '05:30',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4'
    },
    {
      name: 'Nature_Wildlife_Kashmir.mp4',
      type: 'video',
      size: '620 MB',
      duration: '02:50',
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
    },
    {
      name: 'Family_Picnic_Sunset_4K.jpg',
      type: 'image',
      size: '8.4 MB',
      duration: 'Photo 4K',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80'
    },
    {
      name: 'Mountain_Trek_Himalayas.jpg',
      type: 'image',
      size: '12.1 MB',
      duration: 'Photo 4K',
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80'
    }
  ]);

  // Handle uploading/reading real files from phone/PC
  const handleLocalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploaded = Array.from(e.target.files).map(file => {
      const type: 'video' | 'audio' | 'image' = file.type.startsWith('audio')
        ? 'audio'
        : file.type.startsWith('image')
        ? 'image'
        : 'video';
      return {
        name: file.name,
        type,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        url: URL.createObjectURL(file),
        duration: 'Local File'
      };
    });

    setFiles(prev => [...uploaded, ...prev]);
    tvAudio.playSelect();
  };

  const filteredFiles = files.filter(f => activeFilter === 'all' || f.type === activeFilter);

  return (
    <div className="space-y-6 mb-12">
      
      {/* Top Banner: USB Phone Connection Bar */}
      <div className={`p-6 rounded-3xl border transition-all ${
        usbConnected 
          ? 'bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border-blue-500/40 shadow-xl shadow-blue-900/10' 
          : 'bg-slate-900/80 border-slate-800'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
              usbConnected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-800 text-slate-400'
            }`}>
              <HardDrive className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white font-['Outfit']">
                  {language === 'hi' ? 'फोन USB मीडिया प्लेयर' : 'Phone USB Media Hub'}
                </h2>
                <span className={`text-xs px-2 py-0.5 rounded font-mono font-medium ${
                  usbConnected ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                }`}>
                  {usbConnected ? 'MTP / OTG Active' : 'Disconnected'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'hi' 
                  ? 'मोबाइल से TV में USB केबल लगाते ही फोन की वीडियो, गाने और फोटो TV स्क्रीन पर प्ले करें।' 
                  : 'Play personal high-definition videos, photos and music from your phone directly on the TV.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* File Input button for real phone/device files */}
            <label className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl cursor-pointer transition-all shadow-md active:scale-95">
              <Upload className="w-4 h-4" />
              <span>{language === 'hi' ? 'फोन से फाइल चुनें' : 'Browse Phone Files'}</span>
              <input
                type="file"
                multiple
                accept="video/*,audio/*,image/*"
                onChange={handleLocalFileUpload}
                className="hidden"
              />
            </label>

            {/* Toggle simulated connection */}
            <button
              onClick={() => {
                tvAudio.playNav();
                onToggleUsb();
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                usbConnected
                  ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
              }`}
            >
              {usbConnected 
                ? (language === 'hi' ? 'USB केबल निकालें' : 'Disconnect USB') 
                : (language === 'hi' ? 'USB केबल कनेक्ट करें' : 'Simulate Connect USB')}
            </button>
          </div>
        </div>

        {/* USB Telemetry stats when connected */}
        {usbConnected && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-500 block">Connected Device</span>
              <span className="font-semibold text-white font-mono flex items-center gap-1.5 mt-0.5">
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                Android Smartphone (USB-C)
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Signal Protocol</span>
              <span className="font-semibold text-white font-mono mt-0.5 block text-emerald-400">
                DisplayPort Alt Mode 4K
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Transfer Rate</span>
              <span className="font-semibold text-white font-mono mt-0.5 block">
                10 Gbps (USB 3.2 Gen 2)
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Storage Available</span>
              <span className="font-semibold text-white font-mono mt-0.5 block text-cyan-300">
                184 GB Free / 256 GB
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            tvAudio.playNav();
            setActiveFilter('all');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeFilter === 'all'
              ? 'bg-white text-slate-950 font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          {language === 'hi' ? 'सभी फाइल्स' : 'All Files'} ({files.length})
        </button>

        <button
          onClick={() => {
            tvAudio.playNav();
            setActiveFilter('video');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
            activeFilter === 'video'
              ? 'bg-blue-600 text-white font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'वीडियो' : 'Videos'}</span>
        </button>

        <button
          onClick={() => {
            tvAudio.playNav();
            setActiveFilter('audio');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
            activeFilter === 'audio'
              ? 'bg-blue-600 text-white font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Music className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'गाने / ऑडियो' : 'Audio'}</span>
        </button>

        <button
          onClick={() => {
            tvAudio.playNav();
            setActiveFilter('image');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
            activeFilter === 'image'
              ? 'bg-blue-600 text-white font-bold shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'तस्वीरें / फोटो' : 'Photos'}</span>
        </button>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredFiles.map((file, idx) => (
          <div
            key={idx}
            onClick={() => {
              tvAudio.playSelect();
              onPlayMedia(file);
            }}
            className="group p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-slate-600 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 tv-card-focus"
          >
            <div className="w-full h-32 rounded-xl bg-slate-950 flex items-center justify-center mb-3 relative overflow-hidden group-hover:scale-102 transition-transform">
              {file.type === 'video' ? (
                <FileVideo className="w-12 h-12 text-blue-400 opacity-80" />
              ) : file.type === 'audio' ? (
                <FileAudio className="w-12 h-12 text-emerald-400 opacity-80" />
              ) : (
                <ImageIcon className="w-12 h-12 text-amber-400 opacity-80" />
              )}

              {/* Hover Play Button */}
              <div className="absolute inset-0 bg-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-lg">
                  <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                </div>
              </div>

              {file.duration && (
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-[10px] text-slate-300 font-mono rounded">
                  {file.duration}
                </span>
              )}
            </div>

            <h4 className="text-sm font-semibold text-white truncate group-hover:text-cyan-300 transition-colors">
              {file.name}
            </h4>

            <div className="flex items-center justify-between text-xs text-slate-400 mt-2 font-mono">
              <span className="uppercase">{file.type}</span>
              <span>{file.size}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
