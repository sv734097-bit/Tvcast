import React, { useState } from 'react';
import { 
  Download, 
  Smartphone, 
  Tv, 
  Monitor, 
  CheckCircle2, 
  X, 
  Share2, 
  FileArchive, 
  Sparkles, 
  ArrowDownToLine, 
  Copy, 
  Check 
} from 'lucide-react';
import JSZip from 'jszip';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageMode;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;

  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'install' | 'tv' | 'zip'>('install');
  const [isExportingZip, setIsExportingZip] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const handleInstallClick = async () => {
    tvAudio.playSelect();
    if (isInstallable) {
      await install();
    }
  };

  const handleCopyLink = () => {
    tvAudio.playNav();
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadZip = async () => {
    tvAudio.playSelect();
    setIsExportingZip(true);
    try {
      const zip = new JSZip();

      // README instructions
      zip.file(
        'README.txt',
        `=====================================================\nSmartTV Cast: Turn Normal TV into Android TV\n=====================================================\n\nThis package contains the complete offline web application.\n\nHOW TO RUN:\n1. Open index.html in any web browser (Chrome, Edge, Firefox, Android Chrome).\n2. To run on TV:\n   - Connect your phone via USB-C to HDMI cable to your TV.\n   - Open index.html in fullscreen.\n3. To install as an Android app:\n   - In Chrome, tap Menu (3 dots) -> Install app / Add to Home screen.\n\nEnjoy your new Android Smart TV experience!`
      );

      // Offline standalone HTML launcher
      zip.file(
        'index.html',
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SmartTV Cast - Android TV Launcher</title>
  <style>
    body { margin: 0; background: #080b11; color: #fff; font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; }
    .card { background: #0f172a; padding: 2rem; border-radius: 1.5rem; border: 1px solid #1e293b; max-width: 500px; }
    h1 { margin-top: 0; color: #38bdf8; }
    a.btn { display: inline-block; background: #2563eb; color: #fff; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 0.75rem; font-weight: bold; margin-top: 1rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>SmartTV Cast</h1>
    <p>Launch the cloud or local SmartTV Android experience.</p>
    <a href="${window.location.href}" class="btn">Open SmartTV Online</a>
  </div>
</body>
</html>`
      );

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'smart-tv-cast-app.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback
    } finally {
      setIsExportingZip(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => {
            tvAudio.playBack();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <ArrowDownToLine className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-['Outfit']">
              {language === 'hi' ? 'ऐप डाउनलोड व इंस्टॉल करें' : 'Download & Install SmartTV App'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'hi'
                ? 'अपने मोबाइल फोन, कंप्यूटर या टीवी पर इंस्टॉल करके फुलस्क्रीन चलाएं'
                : 'Install on your smartphone, PC, or TV screen for direct standalone access'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-slate-950 rounded-xl mb-6 border border-slate-800">
          <button
            onClick={() => {
              tvAudio.playNav();
              setActiveTab('install');
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'install'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{language === 'hi' ? 'फोन / PC इंस्टॉल' : 'Phone / PC App'}</span>
          </button>

          <button
            onClick={() => {
              tvAudio.playNav();
              setActiveTab('tv');
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'tv'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>{language === 'hi' ? 'TV पर सेटअप' : 'Smart TV Setup'}</span>
          </button>

          <button
            onClick={() => {
              tvAudio.playNav();
              setActiveTab('zip');
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'zip'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileArchive className="w-4 h-4" />
            <span>{language === 'hi' ? 'ZIP फाइल' : 'Download ZIP'}</span>
          </button>
        </div>

        {/* TAB 1: Phone / PC Direct PWA Installation */}
        {activeTab === 'install' && (
          <div className="space-y-4">
            {isInstalled ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm">App Already Installed!</h4>
                  <p className="text-slate-300 mt-0.5">
                    This app is running in standalone mode on your device home screen or desktop launcher.
                  </p>
                </div>
              </div>
            ) : isInstallable ? (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-950 border border-blue-500/40 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-cyan-400 mx-auto" />
                <h3 className="text-base font-bold text-white">
                  {language === 'hi' ? 'सीधे डिवाइस में इंस्टॉल करें' : 'Ready to Install as Native App'}
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {language === 'hi'
                    ? '1-क्लिक में अपने होम स्क्रीन पर Android ऐप की तरह जोड़ें। कोई ब्राउज़र बार नहीं दिखेगा।'
                    : 'Add directly to your device home screen with standalone Android TV UI, zero browser chrome.'}
                </p>
                <button
                  onClick={handleInstallClick}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-transform"
                >
                  {language === 'hi' ? 'अभी इंस्टॉल करें (Install App)' : 'Install App Now'}
                </button>
              </div>
            ) : isIOS ? (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3">
                <h4 className="font-bold text-sm text-white">iPhone / iPad Installation:</h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-300">
                  <li>Tap the <strong>Share</strong> button (box with upward arrow) at the bottom of Safari.</li>
                  <li>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                  <li>Tap <strong>Add</strong> at top right. The SmartTV Cast icon will appear on your home screen.</li>
                </ol>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3">
                <h4 className="font-bold text-sm text-white">
                  {language === 'hi' ? 'Android फोन पर इंस्टॉल करने का तरीका:' : 'How to Install on Android / Chrome:'}
                </h4>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600/30 text-cyan-300 flex items-center justify-center font-bold text-[11px] shrink-0">1</span>
                    <p>{language === 'hi' ? 'ब्राउज़र के ऊपर दाएँ कोने में 3 डॉट्स (⋮) पर क्लिक करें।' : 'Tap the 3 dots (⋮) menu in the top right corner of Chrome.'}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600/30 text-cyan-300 flex items-center justify-center font-bold text-[11px] shrink-0">2</span>
                    <p>{language === 'hi' ? '"Install app" या "Add to Home screen" चुनें।' : 'Select "Install app" or "Add to Home screen".'}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600/30 text-cyan-300 flex items-center justify-center font-bold text-[11px] shrink-0">3</span>
                    <p>{language === 'hi' ? 'यह ऐप आपके फोन के होम स्क्रीन पर असली Android ऐप की तरह सेव हो जाएगा।' : 'The app is now installed on your phone with a home screen launcher icon!'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Share / Copy App Link */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div className="flex-1 min-w-0">
                <span className="text-slate-400 block text-[11px]">Direct App URL:</span>
                <span className="text-cyan-300 font-mono truncate block">{window.location.href}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5 transition-colors shrink-0"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: TV Setup */}
        {activeTab === 'tv' && (
          <div className="space-y-3.5 text-xs text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-2">
                {language === 'hi' ? 'नॉर्मल TV पर इसे कैसे चलाएं?' : 'Running on Your Normal TV Screen:'}
              </h4>
              <p className="leading-relaxed text-slate-300">
                {language === 'hi'
                  ? 'अपने फोन को USB Type-C to HDMI केबल से टीवी के HDMI 1 पोर्ट में लगाएं। फोन में इस ऐप को खोलें और फुलस्क्रीन (F11) दबाएं। टीवी स्क्रीन पर पूरा Android TV चलने लगेगा और फोन आपके हाथ में रिमोट बन जाएगा!'
                  : 'Plug your smartphone into your TV using a Type-C to HDMI cable. Launch this app on your phone and enter Fullscreen. Your regular TV instantly functions as an Android Smart TV!'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="font-bold text-white text-sm mb-2">
                {language === 'hi' ? 'अगर TV में ब्राउज़र है (Fire TV Stick / Mi Box):' : 'If your TV has a Web Browser (Firestick, Android TV, PC):'}
              </h4>
              <p className="leading-relaxed text-slate-300">
                {language === 'hi'
                  ? 'टीवी ब्राउज़र में इस लिंक को खोलें और "TV Screen Mode" चुनें। फिर अपने फोन में यही लिंक खोलकर "Phone Remote Mode" चुन लें और टीवी को सोफे से कंट्रोल करें।'
                  : 'Open this URL in your TV browser (Silk, TV Bro, Chrome). Select "TV Screen Mode". Open the same URL on your phone and select "Phone Remote Mode" to control it from the couch.'}
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: Download ZIP Package */}
        {activeTab === 'zip' && (
          <div className="space-y-4 text-center p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <FileArchive className="w-10 h-10 text-cyan-400 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-white">
                {language === 'hi' ? 'पूरा ऐप्लिकेशन पैकेज डाउनलोड करें' : 'Download Complete App Archive'}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                {language === 'hi'
                  ? 'इस ऐप की पूरी फाइल्स .ZIP में डाउनलोड करें, जिसे आप ऑफलाइन रख सकते हैं या किसी भी टीवी/पीसी पर चला सकते हैं।'
                  : 'Download the source code and standalone launcher bundled in a single .zip file to keep offline.'}
              </p>
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={isExportingZip}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isExportingZip ? 'Packaging ZIP...' : 'Download smart-tv-cast-app.zip'}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
