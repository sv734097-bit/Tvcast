import { TVApp, ContentItem, LiveChannel } from '../types/tv';

export const TV_APPS: TVApp[] = [
  {
    id: 'youtube',
    name: 'YouTube TV',
    category: 'streaming',
    icon: 'Youtube',
    bgGradient: 'from-red-600 to-rose-950',
    accentColor: '#EF4444',
    description: 'Watch millions of 4K videos, trailers, tutorials, and music on TV.',
    badge: 'Popular'
  },
  {
    id: 'live_tv',
    name: 'Live Channels',
    category: 'live',
    icon: 'Tv',
    bgGradient: 'from-blue-600 to-indigo-950',
    accentColor: '#3B82F6',
    description: 'Free live broadcast news, sports, entertainment, and documentary channels.',
    badge: 'Live'
  },
  {
    id: 'netflix',
    name: 'Netflix Hub',
    category: 'streaming',
    icon: 'Film',
    bgGradient: 'from-neutral-900 to-red-950',
    accentColor: '#E50914',
    description: 'Stream global movies, blockbuster series, and documentaries in Dolby Vision.',
    badge: '4K HDR'
  },
  {
    id: 'prime',
    name: 'Prime Video',
    category: 'streaming',
    icon: 'Video',
    bgGradient: 'from-sky-700 to-slate-900',
    accentColor: '#00A8E1',
    description: 'Amazon Originals, regional Indian blockbusters, and live sports.',
  },
  {
    id: 'hotstar',
    name: 'JioHotstar',
    category: 'streaming',
    icon: 'Sparkles',
    bgGradient: 'from-emerald-700 to-teal-950',
    accentColor: '#10B981',
    description: 'Live Cricket matches, Bollywood hits, and exclusive shows.',
    badge: 'Cricket'
  },
  {
    id: 'usb_hub',
    name: 'USB Media Player',
    category: 'utility',
    icon: 'HardDrive',
    bgGradient: 'from-amber-600 to-orange-950',
    accentColor: '#F59E0B',
    description: 'Play photos, videos, and music directly from your connected smartphone storage.',
    badge: 'USB Cable'
  },
  {
    id: 'retro_game',
    name: 'TV Space Runner',
    category: 'game',
    icon: 'Gamepad2',
    bgGradient: 'from-purple-700 to-fuchsia-950',
    accentColor: '#A855F7',
    description: 'Arcade TV game playable with remote control D-pad or keyboard.',
    badge: 'Play Now'
  },
  {
    id: 'spotify',
    name: 'Spotify Music',
    category: 'streaming',
    icon: 'Music',
    bgGradient: 'from-green-600 to-emerald-950',
    accentColor: '#22C55E',
    description: 'Listen to your favorite playlists and podcasts on your TV sound system.',
  },
  {
    id: 'play_store',
    name: 'Play Store TV',
    category: 'utility',
    icon: 'ShoppingBag',
    bgGradient: 'from-cyan-600 to-blue-950',
    accentColor: '#06B6D4',
    description: 'Browse and install 10,000+ Android TV applications and games.',
  },
  {
    id: 'browser',
    name: 'Chrome TV Browser',
    category: 'utility',
    icon: 'Globe',
    bgGradient: 'from-blue-600 via-cyan-600 to-indigo-950',
    accentColor: '#38BDF8',
    description: 'Browse the open web, news sites, Wikipedia, and search on TV screen.',
    badge: 'Web'
  },
  {
    id: 'settings',
    name: 'TV Settings',
    category: 'utility',
    icon: 'Settings',
    bgGradient: 'from-slate-700 to-slate-900',
    accentColor: '#94A3B8',
    description: 'Configure screen resolution, display calibration, audio output, and USB link.',
  }
];

export const FEATURED_HERO: ContentItem = {
  id: 'hero_1',
  title: 'Cosmic Voyager: Beyond The Nebulae',
  category: 'Sci-Fi · Adventure · 4K UHD',
  rating: '9.4',
  duration: '2h 14m',
  year: 2026,
  genre: ['Sci-Fi', 'Astronomy', 'Dolby Atmos'],
  description: 'When humanity detects an ancient beacon from the Orion Arm, an elite interstellar crew ventures past known jump-gates to uncover the origin of cosmic intelligence. Rendered in breathtaking 4K HDR.',
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  thumbnailGradient: 'from-indigo-900 via-purple-900 to-slate-950',
  featured: true
};

export const TRENDING_MOVIES: ContentItem[] = [
  {
    id: 'mov_1',
    title: 'Neon Odyssey: Mumbai 2077',
    category: 'Action · Cyberpunk',
    rating: '8.8',
    duration: '2h 08m',
    year: 2026,
    genre: ['Cyberpunk', 'Thriller'],
    description: 'In a sprawling rain-drenched megacity, a rogue cyber-detective uncovers an encrypted neural network controlling the city power grid.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailGradient: 'from-cyan-900 via-blue-900 to-slate-950'
  },
  {
    id: 'mov_2',
    title: 'Himalayan Ridge: The Unconquered',
    category: 'Documentary · Nature',
    rating: '9.2',
    duration: '1h 45m',
    year: 2025,
    genre: ['Documentary', 'Expedition'],
    description: 'Follow mountaineers traversing perilous zero-oxygen peaks across the Karakoram range in freezing blizzard conditions.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailGradient: 'from-emerald-950 via-teal-900 to-slate-950'
  },
  {
    id: 'mov_3',
    title: 'Big Forest Quest',
    category: 'Animation · Family',
    rating: '8.5',
    duration: '1h 32m',
    year: 2025,
    genre: ['Animation', 'Comedy'],
    description: 'A gentle woodland creature and his companions defend their lush sanctuary from mischievous forest intruders.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailGradient: 'from-amber-900 via-orange-900 to-slate-950'
  },
  {
    id: 'mov_4',
    title: 'Hyperdrive GP: Apex Circuit',
    category: 'Racing · Action',
    rating: '8.9',
    duration: '1h 58m',
    year: 2026,
    genre: ['Sports', 'Speed'],
    description: 'Rival drivers clash at 350 km/h in state-of-the-art aerodynamic prototypes on legendary night tracks under floodlights.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailGradient: 'from-red-950 via-rose-900 to-slate-950'
  },
  {
    id: 'mov_5',
    title: 'Secret Agent: Protocol Zero',
    category: 'Spy Thriller',
    rating: '8.6',
    duration: '2h 11m',
    year: 2025,
    genre: ['Action', 'Spy'],
    description: 'An undercover intelligence operative races across European capitals to stop a synchronized global satellite blackout.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnailGradient: 'from-violet-950 via-purple-900 to-slate-950'
  }
];

export const TOP_SHOWS: ContentItem[] = [
  {
    id: 'show_1',
    title: 'Silicon Dynasty: Season 3',
    category: 'Drama · 10 Episodes',
    rating: '9.1',
    duration: '48m/ep',
    year: 2026,
    genre: ['Tech', 'Drama'],
    description: 'Inside the high-stakes boardroom battles, venture capital rivalries, and AI breakthroughs shaping modern tech titan corporations.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnailGradient: 'from-blue-950 via-slate-900 to-black'
  },
  {
    id: 'show_2',
    title: 'Culinary Masters of India',
    category: 'Food · Travel · 8 Episodes',
    rating: '8.7',
    duration: '35m/ep',
    year: 2025,
    genre: ['Food', 'Culture'],
    description: 'A sensory journey through royal kitchens, street food lanes of Old Delhi, and coastal spices of Kerala.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailGradient: 'from-orange-950 via-amber-900 to-slate-950'
  },
  {
    id: 'show_3',
    title: 'Deep Ocean Frontiers',
    category: 'Science · 6 Episodes',
    rating: '9.3',
    duration: '52m/ep',
    year: 2026,
    genre: ['Ocean', 'Documentary'],
    description: 'Unprecedented submersible exploration 10,000 meters into Mariana Trench revealing bioluminescent creatures never seen before.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailGradient: 'from-cyan-950 via-teal-950 to-black'
  }
];

export const LIVE_CHANNELS: LiveChannel[] = [
  {
    id: 'ch_1',
    name: 'India 24/7 Global News',
    number: '101',
    genre: 'News & Headlines',
    currentShow: 'Prime Time Debate & Global Updates',
    nextShow: 'Economy & Tech Spotlight',
    progressPercent: 65,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    logoText: 'NEWS 24',
    accentColor: '#EF4444'
  },
  {
    id: 'ch_2',
    name: 'Sports HD Cricket & Football',
    number: '102',
    genre: 'Live Sports',
    currentShow: 'Live Match Coverage: 2nd Innings',
    nextShow: 'Post-Match Analysis & Highlights',
    progressPercent: 42,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    logoText: 'SPORTS 1',
    accentColor: '#10B981'
  },
  {
    id: 'ch_3',
    name: 'Bollywood Beats & Pop TV',
    number: '103',
    genre: 'Music & Dance',
    currentShow: 'Top 20 Trending Chartbusters Non-Stop',
    nextShow: 'Golden Era Nostalgia',
    progressPercent: 80,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    logoText: 'BEATS TV',
    accentColor: '#EC4899'
  },
  {
    id: 'ch_4',
    name: 'Planet Wildlife & Discovery',
    number: '104',
    genre: 'Documentary',
    currentShow: 'Kingdom of Bengal Tigers',
    nextShow: 'Great Barrier Reef Exploration',
    progressPercent: 30,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    logoText: 'PLANET',
    accentColor: '#F59E0B'
  },
  {
    id: 'ch_5',
    name: 'Tech & Gaming Live 4K',
    number: '105',
    genre: 'Gaming & Tech',
    currentShow: 'Pro Esports Championship Finals',
    nextShow: 'Gadget Teardown & AI Review',
    progressPercent: 55,
    streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    logoText: 'TECH 4K',
    accentColor: '#8B5CF6'
  }
];

export interface SetupMethod {
  id: string;
  titleHi: string;
  titleEn: string;
  tag: string;
  cableNeeded: string;
  summaryHi: string;
  summaryEn: string;
  speed: string;
  resolution: string;
  stepsHi: string[];
  stepsEn: string[];
}

export const SETUP_METHODS: SetupMethod[] = [
  {
    id: 'type_c_hdmi',
    titleHi: 'विधि 1: Type-C to HDMI केबल (सबसे तेज और 4K क्वालिटी)',
    titleEn: 'Method 1: USB-C to HDMI Cable (Instant 4K 60Hz Plug & Play)',
    tag: 'सर्वोत्तम तरीका / Best Way',
    cableNeeded: 'Type-C to HDMI Cable या MHL Converter Adapter (₹300 - ₹600)',
    summaryHi: 'यह बिल्कुल Amazon Fire TV Stick की तरह काम करता है। कोई इंटरनेट या WiFi की जरूरत नहीं! मोबाइल का Type-C केबल TV के HDMI पोर्ट में लगाते ही TV पर फुल स्क्रीन Android TV चालू हो जाता है।',
    summaryEn: 'Works just like an Amazon Fire TV Stick. No WiFi needed! Simply plug the USB-C end into your phone and the HDMI end into your TV. The TV screen transforms into a 4K Android TV immediately.',
    speed: 'Zero Lag (शून्य लैग)',
    resolution: '4K Ultra HD @ 60fps',
    stepsHi: [
      'एक USB Type-C to HDMI केबल लें (जो DisplayPort Alt Mode सपोर्ट करता हो)।',
      'केबल का HDMI सिरा अपने नॉर्मल TV के HDMI 1 या HDMI 2 पोर्ट में लगाएं।',
      'केबल का दूसरा सिरा (Type-C) अपने स्मार्टफोन में प्लग करें।',
      'अपने TV रिमोट से "Source" या "Input" बटन दबाकर "HDMI" सेलेक्ट करें।',
      'अब अपने मोबाइल पर यह SmartTV Cast ऐप खोलें और "TV Screen Mode" फुलस्क्रीन करें। आपका नॉर्मल TV अब Android TV बन चुका है!'
    ],
    stepsEn: [
      'Get a standard USB Type-C to HDMI cable (supporting DisplayPort Alt Mode / MHL).',
      'Insert the HDMI end into your TV HDMI 1 or HDMI 2 input port.',
      'Connect the Type-C end to your Android smartphone.',
      'On your normal TV remote, press "Source" or "Input" and select "HDMI".',
      'Launch this SmartTV Cast app on your phone and tap "Fullscreen TV Mode". Your normal TV is now an Android TV!'
    ]
  },
  {
    id: 'screen_cast',
    titleHi: 'विधि 2: USB स्क्रीन मिररिंग / वायरलेस टीवी रिसीवर',
    titleEn: 'Method 2: USB Screen Mirroring / TV Web Cast',
    tag: 'वायरलेस और स्मार्ट / Wireless',
    cableNeeded: 'साधारण USB डेटा केबल या TV ब्राउज़र',
    summaryHi: 'अगर आपके टीवी में बेसिक ब्राउज़र या USB इनपुट है, तो आप 4-अंकों के टीवी कोड से मोबाइल को TV से कनेक्ट करके अपने मोबाइल को रिमोट और TV को स्क्रीन बना सकते हैं।',
    summaryEn: 'Pair your TV and smartphone using a 4-digit pairing code or USB data cable. The TV displays the Android Leanback UI while your mobile acts as the TV Remote Control.',
    speed: '< 20ms Ultra-Low Latency',
    resolution: '1080p Full HD @ 60fps',
    stepsHi: [
      'अगर TV में ब्राउज़र या मीडिया प्लेयर है, तो TV स्क्रीन पर यह ऐप खोलें।',
      'TV स्क्रीन पर दिखाई दे रहे 4-अंकों के पेयरिंग कोड को मोबाइल में डालें।',
      'अब आपका मोबाइल Android TV का रिमोट बन जाएगा (D-pad, OK, Voice Search, Netflix, YouTube बटन के साथ)।',
      'TV पर जो भी चलाना है, मोबाइल रिमोट से 10 फीट की दूरी से कंट्रोल करें।'
    ],
    stepsEn: [
      'Open this application on your TV screen (or connected media player).',
      'Note the 4-digit TV Pairing Code displayed on the TV screen.',
      'Switch your phone to "Mobile Remote Mode" and enter the code.',
      'Control your new Android TV from the sofa using your smartphone remote!'
    ]
  },
  {
    id: 'usb_storage',
    titleHi: 'विधि 3: USB फ्लैश / फोन डायरेक्ट स्टोरेज (MTP Mode)',
    titleEn: 'Method 3: USB Phone Storage & Media Hub (Direct USB Cable)',
    tag: 'सिंपल केबल / Simple USB',
    cableNeeded: 'मोबाइल के साथ आया ओरिजिनल USB चार्जिंग/डेटा केबल',
    summaryHi: 'अपने मोबाइल के साधारण USB चार्जिंग केबल को TV के पीछे लगे USB पोर्ट में लगाएं। मोबाइल में "File Transfer / MTP" चुनें। आपका TV फोन के सारे वीडियो, गाने और फोटो चलाएगा।',
    summaryEn: 'Plug standard phone USB charging cable directly into the normal TV USB slot. Select "File Transfer" on phone. Stream movies and media stored on your phone onto TV.',
    speed: 'High Speed Direct',
    resolution: 'Up to 4K Native Media',
    stepsHi: [
      'मोबाइल का चार्जिंग केबल लें (USB-A से Type-C)।',
      'USB सिरा TV के USB पोर्ट में और दूसरा सिरा मोबाइल में लगाएं।',
      'मोबाइल स्क्रीन पर नोटिफिकेशन आएगा - उसमें "File Transfer / Android Auto / MTP" चुनें।',
      'इस ऐप में "USB Media Hub" खोलें और अपने फोन की फिल्में, गाने और फोटो TV पर बड़ी स्क्रीन में देखें।'
    ],
    stepsEn: [
      'Use your standard USB data cable.',
      'Plug USB into the TV USB port, and the other end into your phone.',
      'On phone notification drawer, tap "USB Preferences" and choose "File Transfer / MTP".',
      'Open the "USB Media Hub" tab in this app to play local movies and music directly on TV.'
    ]
  }
];
