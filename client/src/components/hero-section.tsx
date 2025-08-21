import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function HeroSection() {
  const scrollToWalletConnection = () => {
    const element = document.getElementById('wallet-connection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-electric-purple rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-bright-purple rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-neon-green rounded-full mix-blend-multiply filter blur-xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-electric-purple to-bright-purple bg-clip-text text-transparent">
            Prove Your<br />Crypto Humanity
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
          ProofDrop analyzes your on-chain activity to create a verifiable reputation score, helping projects identify real users and eliminate bots from airdrops.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
          <div className="animate-glow">
            <ConnectButton.Custom>
              {({ account, chain, openConnectModal, mounted }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                return (
                  <Button
                    onClick={connected ? scrollToWalletConnection : openConnectModal}
                    className="bg-gradient-to-r from-electric-purple to-bright-purple hover:from-bright-purple hover:to-electric-purple px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                    data-testid="hero-connect-wallet"
                  >
                    {connected ? 'Analyze Wallet' : 'Connect Your Wallet'}
                  </Button>
                );
              }}
            </ConnectButton.Custom>
          </div>
          <Button 
            variant="outline" 
            className="border border-gray-600 hover:border-electric-purple px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 bg-transparent text-white hover:bg-electric-purple/10"
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            data-testid="hero-learn-more"
          >
            Learn More
          </Button>
        </div>
        
        {/* Network Support Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span>Ethereum</span>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span>BSC</span>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
            <span>Polygon</span>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            <span>Testnets</span>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center" data-testid="stat-wallets">
            <div className="text-3xl md:text-4xl font-bold text-electric-purple mb-2">Growing</div>
            <div className="text-gray-400">Wallets Analyzed</div>
          </div>
          <div className="text-center" data-testid="stat-gas">
            <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">Multi-Chain</div>
            <div className="text-gray-400">Gas Tracking</div>
          </div>
          <div className="text-center" data-testid="stat-protocols">
            <div className="text-3xl md:text-4xl font-bold text-bright-purple mb-2">100+</div>
            <div className="text-gray-400">DeFi Protocols</div>
          </div>
        </div>
      </div>
    </section>
  );
}
