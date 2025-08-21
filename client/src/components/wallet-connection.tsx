import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useWalletAnalysis } from "@/hooks/use-wallet-analysis";
import { getBadgeForScore } from "@/lib/scoring";
import { Loader2, Share, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WalletConnection() {
  const { address, isConnected, isAnalyzing, analysisStatus, analysis, error, analyzeWallet } = useWalletAnalysis();
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const { toast } = useToast();

  const networks = [
    { id: "ethereum", name: "Ethereum Mainnet", color: "bg-blue-500" },
    { id: "bsc", name: "BSC Mainnet", color: "bg-yellow-500" },
    { id: "polygon", name: "Polygon Mainnet", color: "bg-purple-500" },
    { id: "testnet", name: "Testnets", color: "bg-gray-400" },
  ];

  const handleMintScore = async () => {
    if (!analysis) return;
    
    try {
      // TODO: Implement NFT minting functionality
      toast({
        title: "Feature Coming Soon",
        description: "NFT minting will be available in the next update!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to mint NFT. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShareScore = () => {
    if (!analysis) return;
    
    const badge = getBadgeForScore(analysis.score.total);
    const shareText = `I just scored ${analysis.score.total}/100 on ProofDrop and earned a ${badge.name} badge! 🎯 Check your crypto humanity at ProofDrop.io`;
    
    if (navigator.share) {
      navigator.share({
        title: 'ProofDrop Score',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Share your score on social media.",
      });
    }
  };

  const badge = analysis ? getBadgeForScore(analysis.score.total) : null;

  return (
    <section id="wallet-connection" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Check Your Score</h2>
            <p className="text-xl text-gray-300">
              Connect your wallet to analyze your on-chain activity and mint your reputation badge.
            </p>
          </div>
          
          <div className="gradient-border mb-8">
            <div className="gradient-border-content">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Network Selection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Select Network</h3>
                  <div className="space-y-3">
                    {networks.map((network) => (
                      <label 
                        key={network.id}
                        className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700/50 transition-colors"
                      >
                        <input 
                          type="radio" 
                          name="network" 
                          value={network.id}
                          checked={selectedNetwork === network.id}
                          onChange={(e) => setSelectedNetwork(e.target.value)}
                          className="text-electric-purple focus:ring-electric-purple"
                          data-testid={`network-${network.id}`}
                        />
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 ${network.color} rounded-full`}></div>
                          <span>{network.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Wallet Connection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Connect Wallet</h3>
                  <div className="flex flex-col items-center justify-center h-full">
                    <ConnectButton />
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-600">
                {isConnected ? (
                  <div data-testid="connected-state">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                        <span className="text-neon-green font-medium">Connected</span>
                        <span className="text-gray-400" data-testid="wallet-address">
                          {address?.slice(0, 6)}...{address?.slice(-4)}
                        </span>
                      </div>
                    </div>
                    
                    {error && (
                      <div className="mb-4 p-4 bg-bot-red/20 border border-bot-red/50 rounded-lg text-bot-red text-sm">
                        {error}
                      </div>
                    )}
                    
                    <Button
                      onClick={analyzeWallet}
                      disabled={isAnalyzing || !selectedNetwork}
                      className="w-full bg-gradient-to-r from-electric-purple to-bright-purple hover:from-bright-purple hover:to-electric-purple py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="analyze-wallet-button"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          {analysisStatus || "Analyzing Wallet..."}
                        </>
                      ) : (
                        "🎯 Mint Your Score/Humanity"
                      )}
                    </Button>
                    
                    {isAnalyzing && analysisStatus && (
                      <div className="mt-4 text-center text-sm text-gray-400">
                        {analysisStatus}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center" data-testid="disconnected-state">
                    <p className="text-gray-400 mb-4">
                      Select a network and connect your wallet to continue
                    </p>
                    <Button 
                      disabled 
                      className="w-full bg-gray-700 py-4 rounded-xl font-bold text-lg cursor-not-allowed opacity-50"
                    >
                      🎯 Mint Your Score/Humanity
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Score Display */}
          {analysis && (
            <div className="gradient-border" data-testid="score-display">
              <div className="gradient-border-content">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Your Reputation Score</h3>
                  <div className="text-6xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-electric-purple to-bright-purple bg-clip-text text-transparent">
                      {analysis.score.total}
                    </span>
                    <span className="text-2xl text-gray-400">/100</span>
                  </div>
                  <div className={`text-xl font-semibold ${
                    badge?.tier === 'BOT' ? 'text-bot-red' :
                    badge?.tier === 'Android' ? 'text-android-silver' :
                    badge?.tier === 'Cyborg' ? 'text-cyborg-gold' :
                    'text-human-diamond'
                  }`}>
                    {badge?.icon} {badge?.name} Status {badge?.tier === 'Human' ? 'Achieved!' : ''}
                  </div>
                </div>
                
                {/* Score Breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center" data-testid="score-account-age">
                    <div className="text-2xl font-bold text-electric-purple mb-1">{analysis.score.accountAge}</div>
                    <div className="text-xs text-gray-400">Account Age</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center" data-testid="score-gas-spent">
                    <div className="text-2xl font-bold text-electric-purple mb-1">{analysis.score.gasSpent}</div>
                    <div className="text-xs text-gray-400">Gas Spent</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center" data-testid="score-contracts">
                    <div className="text-2xl font-bold text-electric-purple mb-1">{analysis.score.uniqueContracts}</div>
                    <div className="text-xs text-gray-400">Contracts</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center" data-testid="score-governance">
                    <div className="text-2xl font-bold text-electric-purple mb-1">{analysis.score.governanceVotes}</div>
                    <div className="text-xs text-gray-400">Governance</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center" data-testid="score-defi">
                    <div className="text-2xl font-bold text-electric-purple mb-1">{analysis.score.defiEngagement}</div>
                    <div className="text-xs text-gray-400">DeFi</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center" data-testid="score-airdrops">
                    <div className="text-2xl font-bold text-electric-purple mb-1">{analysis.score.airdropsClaimed}</div>
                    <div className="text-xs text-gray-400">Airdrops</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleMintScore}
                    className={`flex-1 bg-gradient-to-r ${badge?.color} hover:opacity-80 py-3 rounded-lg font-semibold transition-all duration-300`}
                    data-testid="mint-nft-button"
                  >
                    {badge?.icon} Mint {badge?.name} Badge NFT
                  </Button>
                  <Button 
                    onClick={handleShareScore}
                    variant="outline"
                    className={`flex-1 border ${
                      badge?.tier === 'Human' ? 'border-human-diamond text-human-diamond hover:bg-human-diamond' : 'border-electric-purple text-electric-purple hover:bg-electric-purple'
                    } hover:text-dark-blue py-3 rounded-lg font-semibold transition-all duration-300`}
                    data-testid="share-score-button"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share Your Score
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
