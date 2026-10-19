import React, { useState } from 'react';
import { 
  Tv, 
  Smartphone, 
  Usb, 
  Cable, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  Play
} from 'lucide-react';
import { SETUP_METHODS, SetupMethod } from '../../data/tvContent';
import { LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface USBConnectionGuideProps {
  language: LanguageMode;
  onLaunchTVMode: () => void;
  usbConnected: boolean;
  onToggleUsb: () => void;
}

export const USBConnectionGuide: React.FC<USBConnectionGuideProps> = ({
  language,
  onLaunchTVMode,
  usbConnected,
  onToggleUsb
}) => {
  const [selectedMethod, setSelectedMethod] = useState<SetupMethod>(SETUP_METHODS[0]);
  
  // Compatibility Interactive Tool
  const [phoneType, setPhoneType] = useState<'type_c' | 'micro_usb' | 'lightning'>('type_c');
  const [tvPort, setTvPort] = useState<'hdmi' | 'usb' | 'av_rca'>('hdmi');
  const [isTestingCable, setIsTestingCable] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const runHardwareDiagnostic = () => {
    tvAudio.playSelect();
    setIsTestingCable(true);
    setTestResult(null);

    setTimeout(() => {
      setIsTestingCable(false);
      if (tvPort === 'hdmi') {
        setTestResult(
          language === 'hi' 
            ? 'शानदार! आपका टीवी HDMI पोर्ट सपोर्ट करता है। Type-C to HDMI केबल लगाते ही यह तुरंत 4K 60fps Android TV में बदल जाएगा।'
            : 'Excellent! Your TV supports HDMI. Connecting via Type-C to HDMI cable turns it into 4K 60fps Android TV with 0 latency.'
        );
      } else if (tvPort === 'usb') {
        setTestResult(
          language === 'hi'
            ? 'USB पोर्ट डिटेक्ट हुआ! आप अपने फोन के साधारण चार्जिंग केबल से फोन की फिल्में, गाने और फोटो सीधे टीवी पर देख सकते हैं।'
            : 'USB Port detected! Standard charging cable allows direct playback of phone movies and music.'
        );
      } else {
        setTestResult(
          language === 'hi'
            ? 'RCA AV इनपुट डिटेक्ट हुआ! HDMI-to-AV कनवर्टर (₹250) लगाकर पुराने बॉक्स टीवी (CRT TV) को भी स्मार्ट टीवी बना सकते हैं।'
            : 'AV RCA detected! An HDMI-to-AV converter lets you convert even old box CRT TVs into Smart TV.'
        );
      }
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 py-4 mb-16">
      
      {/* Hero Masterclass Banner */}
      <div className="relative p-6 md:p-10 rounded-3xl bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 border border-blue-500/40 shadow-2xl overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-cyan-300 border border-blue-500/30 rounded-md text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'Amazon Fire Stick जैसा जादू' : 'Fire TV Stick Alternative'}</span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-['Outfit'] mb-4">
            {language === 'hi' 
              ? 'मोबाइल USB से किसी भी नॉर्मल टीवी को Android TV बनाएं' 
              : 'Turn Any Normal TV into Android TV via Mobile USB'}
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
            {language === 'hi'
              ? 'जैसे Amazon Fire TV Stick लगाने पर टीवी स्मार्ट बनता है, ठीक वैसे ही जब आप अपना मोबाइल USB/HDMI केबल से टीवी से जोड़ते हैं, तो आपका पुराना टीवी बिना किसी अतिरिक्त खर्चे के फुल स्क्रीन Android TV में बदल जाता है!'
              : 'Just like plugging an Amazon Fire TV Stick, connecting your smartphone via USB or HDMI cable transforms any regular non-smart TV into a complete 4K Android TV experience.'}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                tvAudio.playSelect();
                onLaunchTVMode();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <Tv className="w-4 h-4" />
              <span>{language === 'hi' ? 'Android TV स्क्रीन चालू करें' : 'Launch Android TV Now'}</span>
            </button>

            <button
              onClick={() => {
                tvAudio.playNav();
                onToggleUsb();
              }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold border transition-all ${
                usbConnected 
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' 
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Usb className="w-4 h-4 text-cyan-400" />
              <span>{usbConnected ? 'USB Status: 4K Active' : 'Test USB Link Simulation'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Cable & Compatibility Finder Tool */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cable className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white font-['Outfit']">
              {language === 'hi' ? 'केबल व टीवी कम्पेटिबिलिटी चेकर' : 'Cable & TV Compatibility Checker'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'hi' ? 'अपने फोन और टीवी के अनुसार सही केबल पता करें' : 'Find the exact cable for your phone and TV'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          
          {/* Step 1: Select Phone */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <label className="text-xs font-semibold text-slate-300 block mb-2.5">
              1. {language === 'hi' ? 'आपके मोबाइल का चार्जिंग पोर्ट कौन सा है?' : 'Select Your Phone Port:'}
            </label>
            <div className="space-y-2">
              <button
                onClick={() => {
                  tvAudio.playNav();
                  setPhoneType('type_c');
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                  phoneType === 'type_c' 
                    ? 'bg-blue-600/20 border-blue-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>USB Type-C (आधुनिक Android फोन - Samsung, OnePlus, Xiaomi)</span>
                {phoneType === 'type_c' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </button>

              <button
                onClick={() => {
                  tvAudio.playNav();
                  setPhoneType('micro_usb');
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                  phoneType === 'micro_usb' 
                    ? 'bg-blue-600/20 border-blue-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>Micro-USB (पुराने Android फोन)</span>
                {phoneType === 'micro_usb' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </button>

              <button
                onClick={() => {
                  tvAudio.playNav();
                  setPhoneType('lightning');
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                  phoneType === 'lightning' 
                    ? 'bg-blue-600/20 border-blue-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>Apple Lightning / iPhone</span>
                {phoneType === 'lightning' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>
          </div>

          {/* Step 2: Select TV Port */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
            <label className="text-xs font-semibold text-slate-300 block mb-2.5">
              2. {language === 'hi' ? 'आपके नॉर्मल टीवी के पीछे कौन सा पोर्ट है?' : 'Select TV Back Input Port:'}
            </label>
            <div className="space-y-2">
              <button
                onClick={() => {
                  tvAudio.playNav();
                  setTvPort('hdmi');
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                  tvPort === 'hdmi' 
                    ? 'bg-blue-600/20 border-blue-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>HDMI Port (HDMI 1, HDMI 2 - बेस्ट 4K रिज़ॉल्यूशन)</span>
                {tvPort === 'hdmi' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </button>

              <button
                onClick={() => {
                  tvAudio.playNav();
                  setTvPort('usb');
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                  tvPort === 'usb' 
                    ? 'bg-blue-600/20 border-blue-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>USB Port (साधारण USB स्लॉट)</span>
                {tvPort === 'usb' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </button>

              <button
                onClick={() => {
                  tvAudio.playNav();
                  setTvPort('av_rca');
                }}
                className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${
                  tvPort === 'av_rca' 
                    ? 'bg-blue-600/20 border-blue-500 text-white' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>AV / RCA (लाल, पीला, सफेद पिन - पुराना डब्बा टीवी)</span>
                {tvPort === 'av_rca' && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>
          </div>

        </div>

        {/* Check Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <button
            onClick={runHardwareDiagnostic}
            disabled={isTestingCable}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            {isTestingCable ? 'जांच जारी है...' : (language === 'hi' ? 'केबल व कनेक्शन रिजल्ट देखें' : 'Check Cable Recommendation')}
          </button>

          {testResult && (
            <div className="flex-1 p-3 bg-blue-950/40 border border-blue-500/40 rounded-xl text-xs text-cyan-200">
              {testResult}
            </div>
          )}
        </div>
      </section>

      {/* 3 Detailed Setup Methods Tabs */}
      <section className="space-y-6">
        <h2 className="text-xl md:text-2xl font-bold text-white font-['Outfit']">
          {language === 'hi' ? 'TV को Android में बदलने के 3 तरीके' : '3 Easy Ways to Convert Normal TV to Android'}
        </h2>

        {/* Method selector tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SETUP_METHODS.map((method) => {
            const active = selectedMethod.id === method.id;
            return (
              <button
                key={method.id}
                onClick={() => {
                  tvAudio.playNav();
                  setSelectedMethod(method);
                }}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  active
                    ? 'bg-blue-600/20 border-blue-500 shadow-lg ring-1 ring-blue-500/50'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                  {method.tag}
                </span>
                <h3 className="text-sm font-bold text-white line-clamp-1">
                  {language === 'hi' ? method.titleHi : method.titleEn}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                  {language === 'hi' ? method.summaryHi : method.summaryEn}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Selected Method Walkthrough */}
        <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold block mb-1">
                {selectedMethod.tag}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white font-['Outfit']">
                {language === 'hi' ? selectedMethod.titleHi : selectedMethod.titleEn}
              </h3>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1.5 bg-slate-950 text-slate-300 rounded-lg border border-slate-800">
                {selectedMethod.speed}
              </span>
              <span className="px-3 py-1.5 bg-blue-950/60 text-cyan-300 rounded-lg border border-blue-500/30">
                {selectedMethod.resolution}
              </span>
            </div>
          </div>

          {/* Cable needed box */}
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-300 block">
                {language === 'hi' ? 'ज़रूरी केबल (Cable Needed):' : 'Required Cable / Equipment:'}
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                {selectedMethod.cableNeeded}
              </p>
            </div>
          </div>

          {/* Step by step checklist */}
          <div className="space-y-4 mb-8">
            <h4 className="text-sm font-bold text-white font-['Outfit']">
              {language === 'hi' ? 'स्टेप बाय स्टेप लगाने का तरीका:' : 'Step-by-Step Instructions:'}
            </h4>
            <div className="space-y-3">
              {(language === 'hi' ? selectedMethod.stepsHi : selectedMethod.stepsEn).map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Start CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-950 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h5 className="text-sm font-bold text-white">
                {language === 'hi' ? 'केबल लगा ली है? अभी टेस्ट करें' : 'Connected your cable? Test the TV now'}
              </h5>
              <p className="text-xs text-slate-400">
                {language === 'hi' ? 'फुल स्क्रीन Android TV 10-Foot मोड में जाएं' : 'Open fullscreen 10-foot Android TV interface'}
              </p>
            </div>

            <button
              onClick={() => {
                tvAudio.playSelect();
                onLaunchTVMode();
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              {language === 'hi' ? 'टीवी मोड शुरू करें' : 'Start Android TV'}
            </button>
          </div>

        </div>
      </section>

      {/* Comprehensive "How to Use Properly" Walkthrough */}
      <section className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white font-['Outfit']">
              {language === 'hi' ? 'ऐप का सही उपयोग कैसे करें (Complete User Guide)' : 'How to Use This App Properly'}
            </h2>
            <p className="text-xs text-slate-400">
              {language === 'hi' ? 'साधारण टीवी को फायरस्टिक की तरह चलाने की पूरी प्रक्रिया' : 'Step-by-step master instructions for day-to-day use'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Step 1: Physical Setup */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs">1</span>
              <span>{language === 'hi' ? 'केबल कनेक्शन (HDMI/USB)' : 'Cable Connection'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'Type-C to HDMI केबल का HDMI सिरा अपने नॉर्मल टीवी में और Type-C सिरा अपने मोबाइल में लगाएं। टीवी रिमोट से "Source" दबाकर "HDMI 1" चुनें।'
                : 'Plug the HDMI end of your Type-C to HDMI cable into your TV and the Type-C into your phone. Switch your TV source to HDMI 1.'}
            </p>
          </div>

          {/* Step 2: Fullscreen TV Mode */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center text-xs">2</span>
              <span>{language === 'hi' ? 'टीवी मोड फुलस्क्रीन करें' : 'Launch Fullscreen TV Mode'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'हेडर में "TV Screen" चुनें और फुलस्क्रीन बटन (Maximize आइकॉन) दबाएं। टीवी स्क्रीन पर पूरा Android TV Leanback इंटरफ़ेस दिखने लगेगा।'
                : 'Select "TV Screen" mode and click the Fullscreen (Maximize) button. The TV screen transforms into the full Android TV Leanback OS.'}
            </p>
          </div>

          {/* Step 3: Phone Remote Control */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs">3</span>
              <span>{language === 'hi' ? 'फोन को रिमोट बनाएं' : 'Use Phone as TV Remote'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'हेडर से "Phone Remote" मोड चुनें। आपको सर्कुलर D-pad, OK, होम, बैक, वॉल्यूम और YouTube/Netflix के डायरेक्ट शॉर्टकट बटन मिलेंगे।'
                : 'Switch to "Phone Remote" mode to control your TV with circular D-Pad, OK, Home, Back, Volume rockers, and quick Netflix/YouTube launch keys.'}
            </p>
          </div>

          {/* Step 4: Voice & USB Media */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs">4</span>
              <span>{language === 'hi' ? 'वॉइस असिस्टेंट व फोन मीडिया' : 'Voice Assistant & USB Media'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'hi'
                ? 'माइक दबाकर बोलें: "YouTube खोलो" या "लाइव टीवी चलाओ"। फोन के वीडियो देखने के लिए "USB Media" टैब में "Browse Phone Files" चुनें।'
                : 'Click the Mic icon to speak voice commands. Use the "USB Media" tab to browse and stream your personal phone videos and music directly on the TV.'}
            </p>
          </div>

        </div>

        {/* Keyboard Shortcuts Reference for TV */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
          <h4 className="font-bold text-white mb-2">
            {language === 'hi' ? 'कीबोर्ड / रिमोट शॉर्टकट्स:' : 'TV Remote & Keyboard Shortcuts:'}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300 font-mono text-[11px]">
            <div><span className="text-cyan-400 font-bold">↑ ↓ ← → :</span> D-Pad Navigate</div>
            <div><span className="text-cyan-400 font-bold">Enter / Space :</span> Select / Play</div>
            <div><span className="text-cyan-400 font-bold">Esc / Back :</span> Return to Home</div>
            <div><span className="text-cyan-400 font-bold">F / F11 :</span> Fullscreen Toggle</div>
          </div>
        </div>
      </section>

    </div>
  );
};
