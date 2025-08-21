import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  bsc,
  sepolia,
  polygonMumbai,
  bscTestnet,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'ProofDrop - Airdrop Reputation Protocol',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'demo-project-id',
  chains: [
    mainnet,
    polygon,
    bsc,
    sepolia,
    polygonMumbai,
    bscTestnet,
  ],
  ssr: false,
});

export const networkConfig = {
  mainnet: {
    id: 1,
    name: 'Ethereum',
    color: 'bg-blue-500',
    rpcUrl: import.meta.env.VITE_ETHEREUM_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    color: 'bg-purple-500',
    rpcUrl: import.meta.env.VITE_POLYGON_RPC_URL || 'https://polygon-mainnet.g.alchemy.com/v2/demo',
  },
  bsc: {
    id: 56,
    name: 'BSC',
    color: 'bg-yellow-500',
    rpcUrl: import.meta.env.VITE_BSC_RPC_URL || 'https://bsc-dataseed.binance.org',
  },
  sepolia: {
    id: 11155111,
    name: 'Sepolia',
    color: 'bg-gray-400',
    rpcUrl: import.meta.env.VITE_SEPOLIA_RPC_URL || 'https://eth-sepolia.g.alchemy.com/v2/demo',
  },
  polygonMumbai: {
    id: 80001,
    name: 'Mumbai',
    color: 'bg-gray-400',
    rpcUrl: import.meta.env.VITE_MUMBAI_RPC_URL || 'https://polygon-mumbai.g.alchemy.com/v2/demo',
  },
  bscTestnet: {
    id: 97,
    name: 'BSC Testnet',
    color: 'bg-gray-400',
    rpcUrl: import.meta.env.VITE_BSC_TESTNET_RPC_URL || 'https://data-seed-prebsc-1-s1.binance.org:8545',
  },
};
