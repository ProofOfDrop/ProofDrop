import { formatEther } from 'viem';

export interface WalletMetrics {
  accountAge: number; // in months
  gasSpent: bigint; // in wei
  uniqueContracts: number;
  governanceVotes: number;
  defiEngagement: number;
  airdropsClaimed: number;
}

export interface ScoreBreakdown {
  accountAge: number; // 0-10 points
  gasSpent: number; // 0-10 points
  uniqueContracts: number; // 0-20 points
  governanceVotes: number; // 0-20 points
  defiEngagement: number; // 0-20 points
  airdropsClaimed: number; // 0-20 points
  total: number; // 0-100 points
}

export type BadgeTier = 'BOT' | 'Android' | 'Cyborg' | 'Human';

export interface Badge {
  tier: BadgeTier;
  name: string;
  description: string;
  color: string;
  icon: string;
  minScore: number;
  maxScore: number;
}

export const badges: Badge[] = [
  {
    tier: 'BOT',
    name: 'BOT',
    description: 'Warning: Low Activity',
    color: 'from-bot-red to-red-600',
    icon: '🤖',
    minScore: 0,
    maxScore: 39,
  },
  {
    tier: 'Android',
    name: 'Android',
    description: 'Basic on-chain activity detected',
    color: 'from-android-silver to-gray-400',
    icon: '🤖',
    minScore: 40,
    maxScore: 59,
  },
  {
    tier: 'Cyborg',
    name: 'Cyborg',
    description: 'Advanced DeFi engagement',
    color: 'from-cyborg-gold to-yellow-500',
    icon: '🦾',
    minScore: 60,
    maxScore: 79,
  },
  {
    tier: 'Human',
    name: 'Human',
    description: '✨ Verified Human Status',
    color: 'from-human-diamond to-cyan-400',
    icon: '💎',
    minScore: 80,
    maxScore: 100,
  },
];

export function calculateScore(metrics: WalletMetrics): ScoreBreakdown {
  // Account Age scoring (0-10 points)
  const accountAgeScore = Math.min(Math.floor(metrics.accountAge / 3), 10);
  
  // Gas Spent scoring (0-10 points) - based on ETH equivalent
  const gasInEth = parseFloat(formatEther(metrics.gasSpent));
  const gasScore = Math.min(Math.floor(gasInEth * 2), 10);
  
  // Unique Contracts scoring (0-20 points)
  const contractsScore = Math.min(Math.floor(metrics.uniqueContracts / 5), 20);
  
  // Governance scoring (0-20 points)
  const governanceScore = Math.min(metrics.governanceVotes * 2, 20);
  
  // DeFi Engagement scoring (0-20 points)
  const defiScore = Math.min(metrics.defiEngagement, 20);
  
  // Airdrops scoring (0-20 points)
  const airdropScore = Math.min(metrics.airdropsClaimed, 20);
  
  const total = accountAgeScore + gasScore + contractsScore + governanceScore + defiScore + airdropScore;
  
  return {
    accountAge: accountAgeScore,
    gasSpent: gasScore,
    uniqueContracts: contractsScore,
    governanceVotes: governanceScore,
    defiEngagement: defiScore,
    airdropsClaimed: airdropScore,
    total,
  };
}

export function getBadgeForScore(score: number): Badge {
  return badges.find(badge => score >= badge.minScore && score <= badge.maxScore) || badges[0];
}

export function getRandomScore(): ScoreBreakdown {
  // Generate realistic random scores for demo purposes
  const accountAge = Math.floor(Math.random() * 11);
  const gasSpent = Math.floor(Math.random() * 11);
  const uniqueContracts = Math.floor(Math.random() * 21);
  const governanceVotes = Math.floor(Math.random() * 21);
  const defiEngagement = Math.floor(Math.random() * 21);
  const airdropsClaimed = Math.floor(Math.random() * 21);
  
  return {
    accountAge,
    gasSpent,
    uniqueContracts,
    governanceVotes,
    defiEngagement,
    airdropsClaimed,
    total: accountAge + gasSpent + uniqueContracts + governanceVotes + defiEngagement + airdropsClaimed,
  };
}
