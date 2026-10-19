import React, { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Monitor, 
  Clock, 
  Cpu, 
  Settings, 
  Check, 
  ChevronRight, 
  HardDrive, 
  Volume2, 
  VolumeX, 
  Usb, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  Tv, 
  CheckCircle2, 
  SlidersHorizontal 
} from 'lucide-react';
import { TVSettings, LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface TVSettingsMenuProps {
  settings: TVSettings;
  onUpdateSettings: (newSettings: Partial<TVSettings>) => void;
  language: LanguageMode;
  onLanguageChange: (lang: LanguageMode) => void;
  onBackToHome: () => void;
}

type SettingsSection = 'network' | 'display' | 'datetime' | 'preferences';

export const TVSettingsMenu: React.FC<TVSettingsMenuProps> = ({
  settings,
  onUpdateSettings,
  language,
  onLanguageChange,
  onBackToHome
}) => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('network');
  const [resetConfirmOpen, setResetConfirmOpen] = useState<boolean>(false);
  const [selectedWifi, setSelectedWifi] = useState<string>(settings.network.connectedSsid);
  const [connectingWifi, setConnectingWifi] = useState<string | null>(null);

  const availableNetworks = [
    { ssid: 'Home_Fiber_5G', signal: 'Excellent', secured: true },
    { ssid: 'Airtel_Extreme_4K', signal: 'Good', secured: true },
    { ssid: 'Jio_SmartTV_WiFi', signal: 'Excellent', secured: true },
    { ssid: 'AndroidPhone_Hotspot_USB', signal: 'Excellent', secured: false }
  ];

  const handleWifiConnect = (ssid: string) => {
    tvAudio.playSelect();
    setConnectingWifi(ssid);
    setTimeout(() => {
      setSelectedWifi(ssid);
      setConnectingWifi(null);
      onUpdateSettings({
        network: {
          ...settings.network,
          connectedSsid: ssid,
          wifiEnabled: true
        }
      });
    }, 1000);
  };

  const handleReset = () => {
    tvAudio.playSelect();
    onUpdateSettings({
      network: {
        wifiEnabled: true,
        connectedSsid: 'Home_Fiber_5G',
        signalStrength: 'Excellent',
        ipAddress: '192.168.1.108',
        macAddress: 'B4:8C:9D:44:E1:2A',
        gateway: '192.168.1.1',
        dns: '8.8.8.8',
        tetheringActive: true
      },
      display: {
        resolution: '4K UHD (3840x2160)',
        framerate: '60 fps',
        hdrMode: 'Dolby Vision',
        aspectRatio: '16:9 (Standard)',
        colorSpace: 'RGB Full (4:4:4)',
        overscanPercent: 0
      },
      dateTime: {
        autoDateTime: true,
        timeZone: 'Asia/Kolkata (IST +5:30)',
        use24HourFormat: false,
        manualDate: '2026-10-19',
        manualTime: '12:45'
      },
      devicePreferences: {
        deviceName: 'Living Room TV (via Phone)',
        osVersion: 'Android 14 (UpsideDownCake)',
        kernelVersion: 'Linux 6.1.45-android14-perf',
        buildNumber: 'ATV-2026.10-R1',
        totalStorageGB: 128,
        usedStorageGB: 52.4,
        audioOutput: 'Dolby Digital Plus',
        soundEffects: true,
        usbMode: 'MHL HDMI',
        screensaver: 'Fluid Cosmos'
      }
    });
    setResetConfirmOpen(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4 mb-14 animate-in fade-in duration-200">
      
      {/* Top Banner & Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white font-['Outfit']">
              {language === 'hi' ? 'Android TV सिस्टम सेटिंग्स' : 'Android TV Settings'}
            </h1>
            <p className="text-xs text-slate-400">
              {language === 'hi' ? 'नेटवर्क, डिस्प्ले, दिनांक और डिवाइस प्राथमिकताएं' : 'Network, Display, Date & Time, and Device Preferences'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            tvAudio.playBack();
            onBackToHome();
          }}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          {language === 'hi' ? 'होम पर वापस जाएं (Back)' : 'Back to Home (Esc)'}
        </button>
      </div>

      {/* Main Settings 2-Column Split: Sidebar Navigation + Detailed Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sub-Sections Menu (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          
          {/* 1. Network & Internet */}
          <button
            onClick={() => {
              tvAudio.playNav();
              setActiveSection('network');
            }}
            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
              activeSection === 'network'
                ? 'bg-blue-600/20 border-blue-500 shadow-md ring-1 ring-blue-500/50 text-white'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-2 rounded-xl ${activeSection === 'network' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">{language === 'hi' ? 'नेटवर्क और इंटरनेट' : 'Network'}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono truncate max-w-[150px]">
                  {settings.network.wifiEnabled ? settings.network.connectedSsid : 'Disabled'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          {/* 2. Display & Sound */}
          <button
            onClick={() => {
              tvAudio.playNav();
              setActiveSection('display');
            }}
            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
              activeSection === 'display'
                ? 'bg-blue-600/20 border-blue-500 shadow-md ring-1 ring-blue-500/50 text-white'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-2 rounded-xl ${activeSection === 'display' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Monitor className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">{language === 'hi' ? 'डिस्प्ले व रेजोल्यूशन' : 'Display'}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {settings.display.resolution.split(' ')[0]} · {settings.display.framerate}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          {/* 3. Date & Time */}
          <button
            onClick={() => {
              tvAudio.playNav();
              setActiveSection('datetime');
            }}
            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
              activeSection === 'datetime'
                ? 'bg-blue-600/20 border-blue-500 shadow-md ring-1 ring-blue-500/50 text-white'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-2 rounded-xl ${activeSection === 'datetime' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">{language === 'hi' ? 'दिनांक और समय' : 'Date & Time'}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {settings.dateTime.autoDateTime ? 'Auto Network' : 'Manual'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          {/* 4. Device Preferences */}
          <button
            onClick={() => {
              tvAudio.playNav();
              setActiveSection('preferences');
            }}
            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
              activeSection === 'preferences'
                ? 'bg-blue-600/20 border-blue-500 shadow-md ring-1 ring-blue-500/50 text-white'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className={`p-2 rounded-xl ${activeSection === 'preferences' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">{language === 'hi' ? 'डिवाइस प्राथमिकताएं' : 'Device Preferences'}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  Android 14 · {settings.devicePreferences.totalStorageGB} GB
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>

          {/* Quick Hardware Indicator Card */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span>Hardware Link:</span>
              <span className="text-emerald-400 font-mono font-semibold">USB-C DP 4K</span>
            </div>
            <div className="flex items-center justify-between">
              <span>UI Audio Blips:</span>
              <span className="text-cyan-400 font-mono">{settings.devicePreferences.soundEffects ? 'Enabled' : 'Muted'}</span>
            </div>
          </div>
        </div>

        {/* Right Active Sub-Section View (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl min-h-[500px]">
          
          {/* ================= SECTION 1: NETWORK ================= */}
          {activeSection === 'network' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Wifi className="w-6 h-6 text-blue-400" />
                  <div>
                    <h2 className="text-lg font-bold text-white font-['Outfit']">
                      {language === 'hi' ? 'नेटवर्क सेटिंग्स' : 'Network & Internet'}
                    </h2>
                    <p className="text-xs text-slate-400">Wi-Fi networks, IP configurations, and USB tethering</p>
                  </div>
                </div>

                {/* Wi-Fi Enable/Disable Toggle */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-300 font-medium">Wi-Fi</span>
                  <button
                    onClick={() => {
                      tvAudio.playNav();
                      onUpdateSettings({
                        network: {
                          ...settings.network,
                          wifiEnabled: !settings.network.wifiEnabled
                        }
                      });
                    }}
                    className={`w-12 h-6 rounded-full transition-colors p-1 ${
                      settings.network.wifiEnabled ? 'bg-blue-600' : 'bg-slate-800'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.network.wifiEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>

              {settings.network.wifiEnabled ? (
                <>
                  {/* Connected Network Status Box */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-blue-500/40">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs text-slate-400 block font-medium">Connected Network</span>
                          <span className="text-sm font-bold text-white font-mono">{settings.network.connectedSsid}</span>
                        </div>
                      </div>

                      <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-md font-mono">
                        Signal: {settings.network.signalStrength}
                      </span>
                    </div>

                    {/* Network Telemetry Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
                      <div>
                        <span className="text-slate-500 block">IP Address</span>
                        <span className="text-slate-300">{settings.network.ipAddress}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Gateway</span>
                        <span className="text-slate-300">{settings.network.gateway}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">DNS</span>
                        <span className="text-slate-300">{settings.network.dns}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">MAC Address</span>
                        <span className="text-slate-300">{settings.network.macAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Available Networks List */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                      {language === 'hi' ? 'उपलब्ध वाई-फाई नेटवर्क' : 'Available Networks'}
                    </h3>
                    <div className="space-y-2">
                      {availableNetworks.map((net, i) => {
                        const isCurrent = net.ssid === settings.network.connectedSsid;
                        return (
                          <button
                            key={i}
                            onClick={() => handleWifiConnect(net.ssid)}
                            className="w-full text-left p-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-850 border border-slate-800 flex items-center justify-between text-xs transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Wifi className="w-4 h-4 text-cyan-400" />
                              <span className="font-semibold text-white font-mono">{net.ssid}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {connectingWifi === net.ssid ? (
                                <span className="text-blue-400 text-[11px] animate-pulse">Connecting...</span>
                              ) : isCurrent ? (
                                <span className="text-emerald-400 text-[11px] font-bold">Connected</span>
                              ) : (
                                <span className="text-slate-500 text-[11px]">Connect</span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* USB Tethering notice */}
                  <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-slate-300 flex items-center gap-3">
                    <Usb className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>
                      {language === 'hi'
                        ? 'USB टीथरिंग सक्रिय है: आपका TV सीधे आपके फोन के मोबाइल इंटरनेट से जुड़ा हुआ है।'
                        : 'USB Tethering Active: Your TV is sharing your smartphone high-speed internet data.'}
                    </span>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center text-slate-400">
                  <WifiOff className="w-12 h-12 mx-auto text-slate-600 mb-3" />
                  <p className="text-sm">Wi-Fi is currently turned off.</p>
                  <p className="text-xs text-slate-500 mt-1">Enable Wi-Fi above to search for wireless connections.</p>
                </div>
              )}
            </div>
          )}

          {/* ================= SECTION 2: DISPLAY ================= */}
          {activeSection === 'display' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Monitor className="w-6 h-6 text-cyan-400" />
                  <div>
                    <h2 className="text-lg font-bold text-white font-['Outfit']">
                      {language === 'hi' ? 'डिस्प्ले व रेजोल्यूशन सेटिंग्स' : 'Display & Video Output'}
                    </h2>
                    <p className="text-xs text-slate-400">Resolution, HDR dynamic range, frame rate, and screen overscan</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Resolution selector */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Screen Resolution</label>
                  <select
                    value={settings.display.resolution}
                    onChange={(e) => onUpdateSettings({
                      display: {
                        ...settings.display,
                        resolution: e.target.value as TVSettings['display']['resolution']
                      }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="4K UHD (3840x2160)">4K Ultra HD (3840x2160) - Recommended</option>
                    <option value="1080p FHD">1080p Full HD (1920x1080)</option>
                    <option value="720p HD">720p HD (1280x720)</option>
                  </select>
                </div>

                {/* Refresh Rate */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">Refresh Rate</label>
                  <select
                    value={settings.display.framerate}
                    onChange={(e) => onUpdateSettings({
                      display: {
                        ...settings.display,
                        framerate: e.target.value as TVSettings['display']['framerate']
                      }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="60 fps">60 Hz (Standard Smooth 60fps)</option>
                    <option value="120 fps">120 Hz (Ultra High Speed / Gaming)</option>
                    <option value="50 fps">50 Hz (Broadcast PAL)</option>
                  </select>
                </div>

                {/* HDR Dynamic Range */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">High Dynamic Range (HDR)</label>
                  <select
                    value={settings.display.hdrMode}
                    onChange={(e) => onUpdateSettings({
                      display: {
                        ...settings.display,
                        hdrMode: e.target.value as TVSettings['display']['hdrMode']
                      }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="Dolby Vision">Dolby Vision (Auto Dynamic)</option>
                    <option value="HDR10+">HDR10+ (Enhanced Contrast)</option>
                    <option value="SDR Standard">SDR Standard Dynamic Range</option>
                  </select>
                </div>

                {/* Color Space */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <label className="text-xs font-semibold text-slate-300 block mb-2">HDMI Color Space</label>
                  <select
                    value={settings.display.colorSpace}
                    onChange={(e) => onUpdateSettings({
                      display: {
                        ...settings.display,
                        colorSpace: e.target.value as TVSettings['display']['colorSpace']
                      }
                    })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                  >
                    <option value="RGB Full (4:4:4)">RGB Full (4:4:4 10-bit)</option>
                    <option value="YCbCr 4:2:2">YCbCr 4:2:2</option>
                    <option value="YCbCr 4:2:0">YCbCr 4:2:0 (Compatible)</option>
                  </select>
                </div>

              </div>

              {/* Screen Calibration & Overscan Slider */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-300">Screen Calibration (Overscan Correction)</span>
                  <span className="text-xs font-mono text-cyan-400">{settings.display.overscanPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={settings.display.overscanPercent}
                  onChange={(e) => onUpdateSettings({
                    display: {
                      ...settings.display,
                      overscanPercent: parseInt(e.target.value, 10)
                    }
                  })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Adjust if edges of your TV screen are cropping icons or navigation bars.
                </p>
              </div>

            </div>
          )}

          {/* ================= SECTION 3: DATE & TIME ================= */}
          {activeSection === 'datetime' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-purple-400" />
                  <div>
                    <h2 className="text-lg font-bold text-white font-['Outfit']">
                      {language === 'hi' ? 'दिनांक और समय सेटिंग्स' : 'Date & Time'}
                    </h2>
                    <p className="text-xs text-slate-400">Automatic synchronization, timezone, and clock format</p>
                  </div>
                </div>
              </div>

              {/* Automatic Network Sync Toggle */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Automatic Date & Time</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Use network-provided time from mobile/NTP server</p>
                </div>
                <button
                  onClick={() => {
                    tvAudio.playNav();
                    onUpdateSettings({
                      dateTime: {
                        ...settings.dateTime,
                        autoDateTime: !settings.dateTime.autoDateTime
                      }
                    });
                  }}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    settings.dateTime.autoDateTime ? 'bg-blue-600' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.dateTime.autoDateTime ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Timezone Selector */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <label className="text-xs font-semibold text-slate-300 block mb-2">Time Zone</label>
                <select
                  value={settings.dateTime.timeZone}
                  onChange={(e) => onUpdateSettings({
                    dateTime: {
                      ...settings.dateTime,
                      timeZone: e.target.value
                    }
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                >
                  <option value="Asia/Kolkata (IST +5:30)">India Standard Time (IST, GMT+5:30)</option>
                  <option value="UTC">Coordinated Universal Time (UTC)</option>
                  <option value="America/New_York (EST)">Eastern Standard Time (New York, GMT-5)</option>
                  <option value="Europe/London (GMT)">Greenwich Mean Time (London, GMT+0)</option>
                  <option value="Asia/Dubai (GST)">Gulf Standard Time (Dubai, GMT+4)</option>
                </select>
              </div>

              {/* 24-Hour Format Toggle */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">Use 24-Hour Format</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Example: 13:00 instead of 1:00 PM</p>
                </div>
                <button
                  onClick={() => {
                    tvAudio.playNav();
                    onUpdateSettings({
                      dateTime: {
                        ...settings.dateTime,
                        use24HourFormat: !settings.dateTime.use24HourFormat
                      }
                    });
                  }}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    settings.dateTime.use24HourFormat ? 'bg-blue-600' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.dateTime.use24HourFormat ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Manual Date and Time inputs (if auto disabled) */}
              {!settings.dateTime.autoDateTime && (
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Set Date</label>
                    <input
                      type="date"
                      value={settings.dateTime.manualDate}
                      onChange={(e) => onUpdateSettings({
                        dateTime: { ...settings.dateTime, manualDate: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Set Time</label>
                    <input
                      type="time"
                      value={settings.dateTime.manualTime}
                      onChange={(e) => onUpdateSettings({
                        dateTime: { ...settings.dateTime, manualTime: e.target.value }
                      })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                    />
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ================= SECTION 4: DEVICE PREFERENCES ================= */}
          {activeSection === 'preferences' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-amber-400" />
                  <div>
                    <h2 className="text-lg font-bold text-white font-['Outfit']">
                      {language === 'hi' ? 'डिवाइस प्राथमिकताएं' : 'Device Preferences'}
                    </h2>
                    <p className="text-xs text-slate-400">System specs, storage breakdown, audio output and hardware</p>
                  </div>
                </div>
              </div>

              {/* Storage Overview Bar */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex items-center justify-between mb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-cyan-400" />
                    <span className="font-semibold text-white">Internal Shared Storage</span>
                  </div>
                  <span className="font-mono text-slate-300">
                    {settings.devicePreferences.usedStorageGB} GB / {settings.devicePreferences.totalStorageGB} GB
                  </span>
                </div>

                {/* Multi-segment progress bar */}
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-blue-500 w-[24%]" title="Apps: 30 GB" />
                  <div className="h-full bg-purple-500 w-[12%]" title="Media Cache: 15 GB" />
                  <div className="h-full bg-amber-500 w-[6%]" title="System OS: 7.4 GB" />
                </div>

                <div className="flex items-center gap-4 mt-2.5 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" /> Apps (30 GB)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-purple-500" /> Media (15 GB)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> System (7.4 GB)
                  </span>
                </div>
              </div>

              {/* Audio Output Selector */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <label className="text-xs font-semibold text-slate-300 block mb-2">Digital Audio Output</label>
                <select
                  value={settings.devicePreferences.audioOutput}
                  onChange={(e) => onUpdateSettings({
                    devicePreferences: {
                      ...settings.devicePreferences,
                      audioOutput: e.target.value as TVSettings['devicePreferences']['audioOutput']
                    }
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none"
                >
                  <option value="Dolby Digital Plus">Dolby Digital Plus 5.1 / Atmos</option>
                  <option value="Stereo PCM">Stereo PCM (High Fidelity 2.0)</option>
                  <option value="Passthrough (HDMI ARC)">Passthrough (HDMI eARC to Soundbar)</option>
                </select>
              </div>

              {/* System Navigation Sound Clicks */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white">System Navigation Sound Effects</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Play classic Android TV click sound on remote D-pad presses</p>
                </div>
                <button
                  onClick={() => {
                    const nextVal = !settings.devicePreferences.soundEffects;
                    tvAudio.setEnabled(nextVal);
                    onUpdateSettings({
                      devicePreferences: {
                        ...settings.devicePreferences,
                        soundEffects: nextVal
                      }
                    });
                  }}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    settings.devicePreferences.soundEffects ? 'bg-blue-600' : 'bg-slate-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.devicePreferences.soundEffects ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* About TV Device Info Box */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs font-mono">
                <h4 className="text-xs font-bold text-white font-sans uppercase tracking-wider mb-2">
                  System Information
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Model Name:</span>
                  <span className="text-slate-200">{settings.devicePreferences.deviceName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Android TV Version:</span>
                  <span className="text-cyan-400">{settings.devicePreferences.osVersion}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-850">
                  <span className="text-slate-400">Build Number:</span>
                  <span className="text-slate-200">{settings.devicePreferences.buildNumber}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Kernel:</span>
                  <span className="text-slate-200">{settings.devicePreferences.kernelVersion}</span>
                </div>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="pt-2">
                {resetConfirmOpen ? (
                  <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-xs">
                    <p className="font-bold text-red-300 mb-2">
                      Are you sure you want to restore Android TV settings to factory default?
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleReset}
                        className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors"
                      >
                        Yes, Restore Defaults
                      </button>
                      <button
                        onClick={() => setResetConfirmOpen(false)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setResetConfirmOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-red-950/30 border border-slate-700 hover:border-red-500/40 text-xs font-semibold text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset Settings to Default</span>
                  </button>
                )}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
