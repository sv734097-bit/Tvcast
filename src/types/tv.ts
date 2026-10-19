export type TVTab = 'home' | 'live' | 'movies' | 'shows' | 'apps' | 'usb' | 'settings';

export type ViewMode = 'tv' | 'remote' | 'guide';

export type LanguageMode = 'hi' | 'en';

export interface TVApp {
  id: string;
  name: string;
  category: 'streaming' | 'utility' | 'game' | 'live';
  icon: string; // Lucide icon or brand visual
  bgGradient: string;
  accentColor: string;
  description: string;
  badge?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  rating: string;
  duration: string;
  year: number;
  genre: string[];
  description: string;
  backdropUrl?: string;
  videoUrl: string; // Direct sample MP4 or stream
  thumbnailGradient: string;
  trailerTitle?: string;
  featured?: boolean;
}

export interface LiveChannel {
  id: string;
  name: string;
  number: string;
  genre: string;
  currentShow: string;
  nextShow: string;
  progressPercent: number;
  streamUrl: string;
  logoText: string;
  accentColor: string;
}

export interface USBFile {
  name: string;
  type: 'video' | 'audio' | 'image';
  size: string;
  url: string;
  duration?: string;
}

export interface NetworkSettings {
  wifiEnabled: boolean;
  connectedSsid: string;
  signalStrength: 'Excellent' | 'Good' | 'Fair';
  ipAddress: string;
  macAddress: string;
  gateway: string;
  dns: string;
  tetheringActive: boolean;
}

export interface DisplaySettings {
  resolution: '4K UHD (3840x2160)' | '1080p FHD' | '720p HD';
  framerate: '60 fps' | '50 fps' | '120 fps';
  hdrMode: 'Dolby Vision' | 'HDR10+' | 'SDR Standard';
  aspectRatio: '16:9 (Standard)' | 'Auto-Fit' | '4:3 (Classic)';
  colorSpace: 'RGB Full (4:4:4)' | 'YCbCr 4:2:2' | 'YCbCr 4:2:0';
  overscanPercent: number; // 0 to 10
}

export interface DateTimeSettings {
  autoDateTime: boolean;
  timeZone: string;
  use24HourFormat: boolean;
  manualDate: string;
  manualTime: string;
}

export interface DevicePreferenceSettings {
  deviceName: string;
  osVersion: string;
  kernelVersion: string;
  buildNumber: string;
  totalStorageGB: number;
  usedStorageGB: number;
  audioOutput: 'Dolby Digital Plus' | 'Stereo PCM' | 'Passthrough (HDMI ARC)';
  soundEffects: boolean;
  usbMode: 'MHL HDMI' | 'USB DisplayPort' | 'MTP File Storage' | 'Web Screen Mirror';
  screensaver: 'Fluid Cosmos' | 'Nature 4K' | 'Turn Off';
}

export interface TVSettings {
  network: NetworkSettings;
  display: DisplaySettings;
  dateTime: DateTimeSettings;
  devicePreferences: DevicePreferenceSettings;
  language: LanguageMode;
}

