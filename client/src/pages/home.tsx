import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import BadgeShowcase from "@/components/badge-showcase";
import ScoringSystem from "@/components/scoring-system";
import WalletConnection from "@/components/wallet-connection";
import FeaturesSection from "@/components/features-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <BadgeShowcase />
      <ScoringSystem />
      <WalletConnection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
