// Hobbies — scroll-crossfade section.
// Drop new Lottie exports into src/assets/lottie/ and import them here.
// A hobby without a `lottie` file yet just falls back to its `icon` glyph,
// so entries can be added before the animation is ready.
import coding from '../assets/lottie/coding.json';
import driving from '../assets/lottie/driving.json';
import learning from '../assets/lottie/learning.json';
import movie from '../assets/lottie/movie.json';
import sleeping from '../assets/lottie/sleeping.json';

export const hobbies = [
  {
    id: 'coding',
    title: 'Coding',
    blurb: 'Side-project rabbit holes, new frameworks, and refactors nobody asked for.',
    icon: '</>',
    lottie: coding,
  },
  {
    id: 'travelling',
    title: 'Travelling',
    blurb: 'New cities, longer routes, and the odd unplanned detour.',
    icon: '✈',
    lottie: driving,
  },
  {
    id: 'learning',
    title: 'Learning',
    blurb: 'Courses, docs, and rabbit-hole reading on whatever I got curious about this week.',
    icon: '☰',
    lottie: learning,
  },
  {
    id: 'watching-movies',
    title: 'Watching Movies',
    blurb: 'Series marathons, big-screen releases, and everything in between.',
    icon: '▶',
    lottie: movie,
  },
  {
    id: 'sleeping',
    title: 'Sleeping',
    blurb: 'Non-negotiable. The best debugger I know.',
    icon: '☾',
    lottie: sleeping,
  },
];

export default hobbies;
