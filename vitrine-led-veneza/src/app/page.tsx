import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Opportunity from "@/components/Opportunity";
import Location from "@/components/Location";
import BannerPreview from "@/components/BannerPreview";
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
import ImmersiveScroll from "@/components/ImmersiveScroll";
import { textureGrainImage } from "@/lib/siteAssets";

export default function Home() {
  return (
    <LenisProvider>
      <Navbar />
      <ImmersiveScroll />
      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.06] mix-blend-soft-light bg-cover bg-center"
        style={{ backgroundImage: `url(${textureGrainImage.src})` }}
      />
      <main className="overflow-x-clip">
        <Hero />
        <About />
        <Opportunity />
        <Location />
        <BannerPreview />
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
