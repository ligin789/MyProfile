/**
 * Project gallery data.
 *
 * To add a project, append an object with this shape — cards, the horizontal
 * gallery and the modal all render from it automatically:
 * {
 *   id:        unique slug (string)
 *   title:     display name
 *   category:  short label shown on the card ("eCommerce · Payments")
 *   year:      display year
 *   thumbnail: card image path (put files in /public/projects/)
 *   images:    array of image paths for the modal gallery
 *   shortDesc: one-liner for the card
 *   fullDesc:  paragraph(s) for the modal
 *   role:      your role on the project
 *   tech:      array of technologies
 *   features:  array of key feature bullet points
 *   liveUrl:   live site URL ('' hides the button)
 *   githubUrl: repo URL ('' hides the button)
 *   platform:  'mobile' renders a phone mockup instead of a browser window;
 *              omit (or 'web') for websites.
 * }
 */
const projects = [
  {
    id: 'pushmeup',
    title: 'PushMeUp',
    category: 'Mobile App · Fitness',
    year: '2026',
    platform: 'mobile',
    thumbnail: '/projects/pushmeup-splash.svg',
    images: ['/projects/pushmeup-splash.svg', '/projects/pushmeup-home.svg'],
    shortDesc: 'A polished React Native workout tracker built for mid-set speed.',
    fullDesc:
      'PushMeUp is a full-featured fitness companion for logging workouts, routines, nutrition and progress — designed around one idea: never let the app slow down your training. The active-workout screen is tuned for two taps per set, with keyboard-free steppers, automatic PR detection, haptic set completion and a floating, draggable rest timer. Around it sits a complete training system: a routine builder, a searchable exercise library with form tips, interactive strength and volume charts, body-measurement tracking, a training calendar, nutrition and macro logging, and achievements earned from real data. Built entirely in React Native with spring-based Reanimated 4 motion, a custom SVG icon set, an OLED-friendly dark theme, and full accessibility support.',
    role: 'Creator — product design, development & motion',
    tech: ['React Native', 'Expo', 'TypeScript', 'Reanimated 4', 'React Navigation'],
    features: [
      'Active-workout screen tuned for two taps per set, with haptic feedback',
      'Automatic PR detection with trophy markers on record sets',
      'Floating, draggable circular rest timer with +30s and skip',
      'Routine builder with reorder, duplicate, and undo',
      'Searchable exercise library with form tips and per-exercise history',
      'Interactive touch-to-inspect strength, volume, and weight charts',
      'Body-measurement tracking with trend sparklines',
      'Training calendar, weekly goal ring, and streak tracking',
      'Nutrition: calorie ring, macros, and water logging',
      'Dark / light / system themes, metric & imperial units, on-device data',
    ],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'lalix',
    title: 'LaliX',
    category: 'Mobile App · Music',
    year: '2026',
    platform: 'mobile',
    thumbnail: '/projects/lalix-search.svg',
    images: ['/projects/lalix-search.svg', '/projects/lalix-settings.svg'],
    shortDesc: 'A React Native music app with taste-based, daily-rotating discovery.',
    fullDesc:
      'LaliX is a full streaming music app with a personalization engine at its core. "Wave Brain" builds the home feed from your own taste — languages, favourite musicians, genres and time of day — and re-rolls it daily so it is never the same list twice, with Spotify-style Daily Mixes seeded from your likes and history. It streams full songs up to 320kbps with background and lock-screen playback, a full Now Playing screen with a wave seek bar and lyrics, and a Shazam-style Music Finder. Standout systems include Companion Mode (synced group listening over local Wi-Fi with no server), a Smart Sound Profile that remembers and restores volume per connected device, and an 8-colour accent catalogue. It runs entirely on-device — no backend, nothing leaves the phone.',
    role: 'Creator — product design, development & motion',
    tech: ['React Native', 'Expo', 'TypeScript', 'Track Player', 'Reanimated'],
    features: [
      'Streams full songs up to 320kbps with background & lock-screen playback',
      'Wave Brain home feed built from your taste, re-rolled daily',
      'Spotify-style Daily Mixes plus language, time-of-day, and artist mixes',
      'Full Now Playing: wave seek bar, queue, shuffle, repeat, and lyrics',
      'Search with live results, browse tiles, and Shazam-style Music Finder',
      'Import playlists from Spotify, YouTube Music & JioSaavn links',
      'Companion Mode: synced group listening over local Wi-Fi, no server',
      'Smart Sound Profile: per-device volume, restored automatically',
      '8-colour accent catalogue with a customisable Now Playing screen',
      'Fully offline and backend-free — nothing leaves your phone',
    ],
    liveUrl: '',
    githubUrl: '',
  },
  {
    id: 'jose-joseph-associates',
    title: 'Jose Joseph & Associates',
    category: 'Client Work · Law Firm',
    year: '2024',
    thumbnail: '/projects/jose-joseph.png',
    images: ['/projects/jose-joseph.png', '/projects/jose-joseph-mobile.png'],
    shortDesc: 'Live website for an advocate & state notary practice in Palakkad, Kerala.',
    fullDesc:
      'A production website for Jose Joseph & Associates, an advocates and state notary firm serving Mannarkkad, Attapadi and Palakkad. The site presents the practice, its services and case gallery with a clean, trust-first design — fully responsive from phone to desktop, with a light/dark theme toggle, carousel-driven sections and a lightbox photo gallery. Page titles and copy are tuned for local search around the firm’s service areas.',
    role: 'Freelance Designer & Developer — end-to-end build and deployment',
    tech: ['HTML', 'CSS', 'Bootstrap 5', 'jQuery', 'Owl Carousel', 'PHP'],
    features: [
      'Fully responsive layout across mobile, tablet and desktop',
      'Light/dark theme toggle',
      'Lightbox photo gallery and carousel sections',
      'Local-SEO-tuned titles and content for Palakkad service areas',
      'Contact section with practice details and location',
    ],
    liveUrl: 'https://www.josejosephassociates.in/',
    githubUrl: '',
  },
  {
    id: 'kanjirappally-info',
    title: 'Kanjirappally Info Center',
    category: 'Web Portal',
    year: '2020',
    thumbnail: '/projects/kanjirappally.svg',
    images: ['/projects/kanjirappally.svg'],
    shortDesc: 'A local information portal connecting a town to its services.',
    fullDesc:
      'A community-focused information portal for the town of Kanjirappally, aggregating local businesses, public services, emergency contacts and events into one searchable hub. Built with a classic LAMP-style stack, it focused on fast page loads and a structure simple enough for non-technical administrators to keep up to date.',
    role: 'Designer & Developer — end-to-end build',
    tech: ['HTML', 'jQuery', 'Bootstrap', 'PHP', 'MySQL'],
    features: [
      'Categorised directory of local businesses and services',
      'Admin panel for non-technical content updates',
      'Search across listings with category filters',
      'Fully responsive Bootstrap layout',
    ],
    liveUrl: '',
    githubUrl: 'https://github.com/ligin789',
  },
  {
    id: 'dk-estate',
    title: 'DK Estates',
    category: 'Estate Management · CRM',
    year: '2021',
    thumbnail: '/projects/dk-estate-dashboard.jpg',
    images: [
      '/projects/dk-estate-dashboard.jpg',
      '/projects/dk-estate-estate.jpg',
      '/projects/dk-estate-managers.jpg',
    ],
    shortDesc: 'An estate management system with a full CRM for multi-estate operations.',
    fullDesc:
      'DK Estates is an end-to-end estate management system built around a proper CRM: an owner oversees multiple estates, each run by managers in a hierarchical structure with their own scoped dashboards. Every estate gets a complete operations view — worker management with daily attendance, salary processing, income and expense tracking with yearly analysis charts, job cards for work assignments, and capital infusion records. Financial data rolls up into per-estate and portfolio-wide income/expense dashboards, and any report can be exported to PDF or Excel.',
    role: 'Developer — full-stack build, dashboards & reporting',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'Multiple estates under one account with hierarchical manager roles',
      'Employee management with daily attendance tracking',
      'Salary management and payout records per estate',
      'Income and expense tracking with yearly analysis charts',
      'Job cards for assigning and tracking estate work',
      'Capital infusion records for estate funding',
      'PDF and Excel exports for reports and financial data',
      'Per-estate and portfolio-wide analytics dashboards',
    ],
    liveUrl: 'https://dkestate.freedev.app/',
    githubUrl: 'https://github.com/ligin789',
  },
  {
    id: 'printx',
    title: 'PrintX',
    category: 'eCommerce · Payments',
    year: '2021',
    thumbnail: '/projects/printx.svg',
    images: ['/projects/printx.svg'],
    shortDesc: 'A custom eCommerce flow with seamless Razorpay payments.',
    fullDesc:
      'A custom print-on-demand eCommerce experience: product configuration, cart, and a fully integrated Razorpay checkout. The payment flow handles order creation, signature verification and failure recovery, giving customers a smooth path from customising a product to a confirmed, paid order.',
    role: 'Developer — storefront & payment integration',
    tech: ['JavaScript', 'PHP', 'MySQL', 'Razorpay API'],
    features: [
      'Custom product configuration flow',
      'Razorpay checkout with server-side signature verification',
      'Order tracking and payment-failure recovery',
      'Email confirmations on successful orders',
    ],
    liveUrl: '',
    githubUrl: 'https://github.com/ligin789',
  },
];

export default projects;
