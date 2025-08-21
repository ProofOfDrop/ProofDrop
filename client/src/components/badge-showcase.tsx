import { badges } from "@/lib/scoring";
import { AlertTriangle } from "lucide-react";

export default function BadgeShowcase() {
  return (
    <section id="badges" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Evolution of Trust</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your reputation score determines your badge tier. Evolve from BOT to Human through genuine on-chain activity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {badges.map((badge, index) => (
            <div 
              key={badge.tier}
              className={`gradient-border group hover:scale-105 transition-all duration-500 ${
                badge.tier === 'Human' ? 'animate-glow' : ''
              }`}
              data-testid={`badge-${badge.tier.toLowerCase()}`}
            >
              <div className="gradient-border-content text-center">
                <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-r ${badge.color} rounded-full flex items-center justify-center`}>
                  <span className="text-3xl">{badge.icon}</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  badge.tier === 'BOT' ? 'text-bot-red' :
                  badge.tier === 'Android' ? 'text-android-silver' :
                  badge.tier === 'Cyborg' ? 'text-cyborg-gold' :
                  'text-human-diamond'
                }`}>
                  {badge.name}
                </h3>
                <div className="text-sm text-gray-400 mb-3">
                  Score: {badge.minScore}-{badge.maxScore}
                </div>
                {badge.tier === 'BOT' ? (
                  <div className="bg-bot-red/20 border border-bot-red/50 rounded-lg p-3 text-xs">
                    <div className="flex items-center justify-center space-x-2 text-bot-red">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{badge.description}</span>
                    </div>
                  </div>
                ) : badge.tier === 'Human' ? (
                  <div className="text-xs text-human-diamond font-medium">
                    {badge.description}
                  </div>
                ) : (
                  <div className="text-xs text-gray-400">
                    {badge.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
