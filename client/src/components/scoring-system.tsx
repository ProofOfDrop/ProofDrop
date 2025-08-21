import { Clock, CreditCard, Layers, Vote, TrendingUp, Gift } from "lucide-react";

const scoringMetrics = [
  {
    name: "Account Age",
    points: 10,
    description: "Months since first transaction - rewards long-term participation",
    icon: Clock,
    detail: "Time-based scoring",
  },
  {
    name: "Gas Spent",
    points: 10,
    description: "Total ETH/BNB/MATIC gas paid - demonstrates real usage",
    icon: CreditCard,
    detail: "Transaction costs",
  },
  {
    name: "Contract Interactions",
    points: 20,
    description: "Number of distinct smart contracts interacted with",
    icon: Layers,
    detail: "Smart contract usage",
  },
  {
    name: "Governance",
    points: 20,
    description: "Votes cast and proposals created across protocols",
    icon: Vote,
    detail: "Community involvement",
  },
  {
    name: "DeFi Engagement",
    points: 20,
    description: "Lending, staking, farming, and liquidity provision",
    icon: TrendingUp,
    detail: "Financial activity",
  },
  {
    name: "Airdrops Claimed",
    points: 20,
    description: "Number of distinct airdrops received and claimed",
    icon: Gift,
    detail: "Reward eligibility",
  },
];

export default function ScoringSystem() {
  return (
    <section id="scoring" className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Score Your Activity</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our algorithm analyzes six key metrics across multiple blockchain networks to create your comprehensive reputation score.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {scoringMetrics.map((metric, index) => (
            <div 
              key={metric.name}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-electric-purple transition-colors"
              data-testid={`metric-${metric.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{metric.name}</h3>
                <span className="bg-electric-purple/20 text-electric-purple px-3 py-1 rounded-full text-sm font-medium">
                  {metric.points} pts
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                {metric.description}
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <metric.icon className="w-4 h-4" />
                <span>{metric.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
