import { Hero } from "@/components/home/Hero";
import { PillarStrip } from "@/components/home/PillarStrip";
import { OpenService } from "@/components/home/OpenService";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { Reels } from "@/components/reels/Reels";
import { ProblemGrid } from "@/components/home/ProblemGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Brands } from "@/components/home/Brands";
import { Founders } from "@/components/Founders";
import { Faq } from "@/components/Faq";
import { LocationSection } from "@/components/Location";
import { FinalCta } from "@/components/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PillarStrip />
      <OpenService />
      <ServicesShowcase />
      <ProblemGrid />
      <HowItWorks />
      <Reels />
      <Brands />
      <Founders />
      <Faq withSchema />
      <LocationSection />
      <FinalCta />
    </>
  );
}
