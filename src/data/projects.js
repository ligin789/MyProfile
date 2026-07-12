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
 * }
 */
const projects = [
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
    title: 'DK Estate',
    category: 'Property Management',
    year: '2021',
    thumbnail: '/projects/dk-estate.svg',
    images: ['/projects/dk-estate.svg'],
    shortDesc: 'A property management system with a clean, responsive frontend.',
    fullDesc:
      'A property management platform covering listings, tenant records and enquiry handling. The frontend was designed mobile-first with a strong visual hierarchy so agents could scan availability at a glance, while the admin side streamlined adding and updating properties with image galleries and status tracking.',
    role: 'Frontend Developer — UI architecture & responsive build',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    features: [
      'Property listings with image galleries and status badges',
      'Enquiry capture wired to an admin dashboard',
      'Mobile-first responsive layout',
      'Role-based views for agents and admins',
    ],
    liveUrl: '',
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
