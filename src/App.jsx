import { useEffect, useState } from 'react';
import { ScrollTrigger } from './lib/gsap';
import SmoothScroll from './components/SmoothScroll';
import { AppReadyProvider } from './hooks/useAppReady';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Experience from './sections/Experience';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

export default function App() {
  // ready: curtain has started opening → intro animations may play.
  // loading: preloader still mounted on top of everything.
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);

  // Layout settles once fonts are in and the curtain opens — re-measure
  // every ScrollTrigger so pinned sections get correct distances.
  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [ready]);

  return (
    <SmoothScroll>
      <AppReadyProvider value={ready}>
        {loading && (
          <Preloader onReveal={() => setReady(true)} onDone={() => setLoading(false)} />
        )}
        <CustomCursor />
        <GrainOverlay />
        <Navbar />
        <main id="main">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </AppReadyProvider>
    </SmoothScroll>
  );
}
