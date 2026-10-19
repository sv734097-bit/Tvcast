import React from 'react';
import { 
  Youtube, 
  Tv, 
  Film, 
  Video, 
  Sparkles, 
  HardDrive, 
  Gamepad2, 
  Music, 
  ShoppingBag, 
  Settings,
  ArrowRight
} from 'lucide-react';
import { TVApp, LanguageMode } from '../../types/tv';
import { tvAudio } from '../../utils/audio';

interface AppGridProps {
  apps: TVApp[];
  onLaunchApp: (app: TVApp) => void;
  language: LanguageMode;
}

export const AppGrid: React.FC<AppGridProps> = ({
  apps,
  onLaunchApp,
  language
}) => {
  const getAppIcon = (iconName: string) => {
    const props = { className: 'w-7 h-7 text-white' };
    switch (iconName) {
      case 'Youtube':
        return <Youtube {...props} className="w-8 h-8 text-red-500 fill-white" />;
      case 'Tv':
        return <Tv {...props} className="w-8 h-8 text-blue-400" />;
      case 'Film':
        return <Film {...props} className="w-8 h-8 text-rose-500" />;
      case 'Video':
        return <Video {...props} className="w-8 h-8 text-sky-400" />;
      case 'Sparkles':
        return <Sparkles {...props} className="w-8 h-8 text-emerald-400" />;
      case 'HardDrive':
        return <HardDrive {...props} className="w-8 h-8 text-amber-400" />;
      case 'Gamepad2':
        return <Gamepad2 {...props} className="w-8 h-8 text-purple-400" />;
      case 'Music':
        return <Music {...props} className="w-8 h-8 text-green-400" />;
      case 'ShoppingBag':
        return <ShoppingBag {...props} className="w-8 h-8 text-cyan-400" />;
      case 'Settings':
        return <Settings {...props} className="w-8 h-8 text-slate-300" />;
      default:
        return <Tv {...props} />;
    }
  };

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg md:text-xl font-bold text-white tracking-tight font-['Outfit']">
            {language === 'hi' ? 'पसंदीदा ऐप्स और टूल्स' : 'Favorite Apps & Tools'}
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline">
            · {language === 'hi' ? 'रिमोट या कीबोर्ड से खोलें' : 'Select with D-pad or click'}
          </span>
        </div>
      </div>

      {/* Horizontal App Scrollable Dock */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              tvAudio.playSelect();
              onLaunchApp(app);
            }}
            onMouseEnter={() => tvAudio.playNav()}
            className="group relative flex flex-col items-start p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-600 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 tv-card-focus focus:outline-none"
          >
            {/* Top row: Icon + optional badge */}
            <div className="w-full flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.bgGradient} flex items-center justify-center shadow-md p-2 group-hover:scale-110 transition-transform`}>
                {getAppIcon(app.icon)}
              </div>
              {app.badge && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  {app.badge}
                </span>
              )}
            </div>

            {/* App Name */}
            <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors font-['Outfit'] truncate w-full">
              {app.name}
            </h3>

            {/* Sub description */}
            <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal">
              {app.description}
            </p>

            <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500 group-hover:text-cyan-400 transition-colors font-medium">
              <span>{language === 'hi' ? 'खोलें' : 'Launch'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
