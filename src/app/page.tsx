import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FAQSection } from '@/components/landing/FAQSection';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-950 text-white selection:bg-brand-glow selection:text-white">
      <Navbar />
      
      <HeroSection />
      
      <FeaturesSection />

      <HowItWorksSection />
      
      <PricingSection />

      <FAQSection />
      
      <Footer />
    </main>
  );
}
