import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Opportunity from "@/components/Opportunity";
import Location from "@/components/Location";
import Technology from "@/components/Technology";
import WhyLed from "@/components/WhyLed";
import ForWho from "@/components/ForWho";
import Plans from "@/components/Plans";
import PrimeLed from "@/components/PrimeLed";
import Transparency from "@/components/Transparency";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";

export default function Home() {
  return (
    <LenisProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Opportunity />
        <Location />
        <Technology />
        <WhyLed />
        <ForWho />
        <Plans />
        <PrimeLed />
        <Transparency />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </LenisProvider>
  );
}
