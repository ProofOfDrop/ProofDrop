import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@/components/ui/button";
import { Menu, X, Layers } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-electric-purple to-bright-purple rounded-full flex items-center justify-center">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">ProofDrop</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('features')}
            className="text-gray-300 hover:text-white transition-colors"
            data-testid="nav-features"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('scoring')}
            className="text-gray-300 hover:text-white transition-colors"
            data-testid="nav-scoring"
          >
            Scoring
          </button>
          <button 
            onClick={() => scrollToSection('badges')}
            className="text-gray-300 hover:text-white transition-colors"
            data-testid="nav-badges"
          >
            Badges
          </button>
          <ConnectButton />
        </div>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-dark-blue/95 backdrop-blur-sm border-t border-gray-800">
          <div className="container mx-auto px-6 py-4 space-y-4">
            <button 
              onClick={() => scrollToSection('features')}
              className="block text-gray-300 hover:text-white transition-colors"
              data-testid="mobile-nav-features"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('scoring')}
              className="block text-gray-300 hover:text-white transition-colors"
              data-testid="mobile-nav-scoring"
            >
              Scoring
            </button>
            <button 
              onClick={() => scrollToSection('badges')}
              className="block text-gray-300 hover:text-white transition-colors"
              data-testid="mobile-nav-badges"
            >
              Badges
            </button>
            <div className="pt-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
