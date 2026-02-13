import { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { FormModal } from './components/FormModal';
import { Hero } from './sections/Hero';
import { Opportunity } from './sections/Opportunity';
import { Location } from './sections/Location';
import { TechSpecs } from './sections/TechSpecs';
import { WhyLED } from './sections/WhyLED';
import { WhoItsFor } from './sections/WhoItsFor';
import { Plans } from './sections/Plans';
import { PrimeLED } from './sections/PrimeLED';
import { Rules } from './sections/Rules';
import { FAQ } from './sections/FAQ';
import { FinalCTA } from './sections/FinalCTA';
import { ContactForm } from './sections/ContactForm';
import { Footer } from './sections/Footer';

interface PinnedRange {
  start: number;
  end: number;
  center: number;
}

function App() {
  const [formOpen, setFormOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Setup global snap after GSAP is loaded
    const setupGlobalSnap = () => {
      if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) {
        setTimeout(setupGlobalSnap, 100);
        return;
      }

      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      // Wait for all ScrollTriggers to be created
      setTimeout(() => {
        const allTriggers = ScrollTrigger.getAll();
        const pinned = allTriggers
          .filter((st: { vars: { pin?: boolean } }) => st.vars.pin)
          .sort((a: { start: number }, b: { start: number }) => a.start - b.start);

        const maxScroll = ScrollTrigger.maxScroll(window);
        if (!maxScroll || pinned.length === 0) return;

        // Build ranges and snap targets from pinned sections
        const pinnedRanges: PinnedRange[] = pinned.map((st: { start: number; end?: number }) => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));

        // Create global snap
        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              // Check if within any pinned range (with buffer)
              const inPinned = pinnedRanges.some(
                (r: PinnedRange) => value >= r.start - 0.02 && value <= r.end + 0.02
              );
              if (!inPinned) return value; // Flowing section: free scroll

              // Find nearest pinned center
              const target = pinnedRanges.reduce(
                (closest: number, r: PinnedRange) =>
                  Math.abs(r.center - value) < Math.abs(closest - value)
                    ? r.center
                    : closest,
                pinnedRanges[0]?.center ?? 0
              );

              return target;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: 'power2.out',
          },
        });
      }, 500);
    };

    setupGlobalSnap();
  }, []);

  const scrollToPlans = () => {
    const plansSection = document.getElementById('planos');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation onOpenForm={() => setFormOpen(true)} />

      {/* Form Modal */}
      <FormModal isOpen={formOpen} onClose={() => setFormOpen(false)} />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        <Hero onOpenForm={() => setFormOpen(true)} onScrollToPlans={scrollToPlans} />
        <Opportunity />
        <Location />
        <TechSpecs />
        <WhyLED />
        <WhoItsFor onScrollToPlans={scrollToPlans} />
        <div id="planos">
          <Plans onOpenForm={() => setFormOpen(true)} />
        </div>
        <PrimeLED onOpenForm={() => setFormOpen(true)} />
        <Rules />
        <div id="faq">
          <FAQ />
        </div>
        <FinalCTA onOpenForm={() => setFormOpen(true)} />
        <div id="contato">
          <ContactForm />
        </div>
        <Footer />
      </main>
    </>
  );
}

export default App;
