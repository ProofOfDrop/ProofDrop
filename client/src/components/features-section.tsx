import { Shield, Zap, Lock, Award, BarChart3, Bot } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Sybil Resistance",
    description: "Advanced algorithms detect and filter out bot accounts, ensuring only genuine users participate in airdrops.",
    color: "from-electric-purple to-bright-purple",
  },
  {
    icon: Zap,
    title: "Multi-Chain Support",
    description: "Analyze activity across Ethereum, BSC, Polygon, and testnets for comprehensive reputation scoring.",
    color: "from-neon-green to-green-400",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "All analysis happens on-chain. We never store private keys or sensitive wallet information.",
    color: "from-cyborg-gold to-yellow-400",
  },
  {
    icon: Award,
    title: "NFT Badges",
    description: "Mint your reputation as collectible NFT badges that evolve based on your on-chain activity.",
    color: "from-human-diamond to-cyan-400",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Live scoring updates as your on-chain activity increases, with detailed breakdown of each metric.",
    color: "from-android-silver to-gray-400",
  },
  {
    icon: Bot,
    title: "Bot Detection",
    description: "Sophisticated algorithms identify automated behavior patterns and low-quality wallet activity.",
    color: "from-bot-red to-red-600",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why ProofDrop?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built for the next generation of airdrop campaigns and reputation-based rewards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-electric-purple transition-colors"
              data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
