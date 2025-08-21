# ProofDrop - Airdrop Reputation Protocol

## Overview

ProofDrop is a decentralized protocol for verifiable airdrop reputation that analyzes on-chain wallet activity to create reputation scores. The system helps projects identify genuine users and eliminate bots from token distributions through sophisticated blockchain activity analysis. Users connect their wallets to receive scores from 0-100 points across six key metrics, earning tiered badges (BOT, Android, Cyborg, Human) based on their activity patterns. The application is now a fully client-side React application optimized for static hosting platforms like Vercel, Netlify, and GitHub Pages.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client uses **React 18** with **TypeScript** in a single-page application structure. The UI is built with **shadcn/ui components** styled using **Tailwind CSS** with a dark space-themed design system. State management relies on **TanStack React Query** for server state and **React hooks** for local state. The routing system uses **Wouter** for lightweight client-side navigation.

### Web3 Integration
Wallet connectivity is handled through **RainbowKit** and **Wagmi**, supporting multiple networks including Ethereum mainnet, Polygon, BSC, and testnets. The architecture separates Web3 concerns into dedicated configuration files and custom hooks, making it easy to add new networks or modify connection logic.

### Client-Side Architecture
The application is now fully client-side with no server dependencies. All data persistence is handled through browser storage and external APIs. The Web3 integration connects directly to blockchain networks and third-party APIs (Covalent, Moralis) for wallet analysis. This approach enables deployment on static hosting platforms while maintaining full functionality.

### Development Workflow
The project uses **Vite** for development with hot module replacement and React plugin support. The build process creates an optimized static bundle ready for deployment on platforms like Vercel, Netlify, or GitHub Pages. TypeScript compilation uses strict mode with path mapping for clean imports.

### Scoring Engine
The wallet analysis system implements a points-based scoring algorithm across six metrics: account age (10 points), gas spent (10 points), unique contract interactions (20 points), governance participation (20 points), DeFi engagement (20 points), and airdrops claimed (20 points). The current implementation uses mock data but is structured to integrate with blockchain analysis APIs like Moralis or Covalent.

### UI Component System
The frontend leverages a comprehensive design system built on Radix UI primitives, providing accessible components for dialogs, forms, navigation, and data display. The styling approach uses CSS custom properties for theming with Tailwind utility classes for layout and responsive design.

## External Dependencies

### Blockchain Infrastructure
- **RainbowKit** - Wallet connection interface supporting multiple providers
- **Wagmi** - React hooks for Ethereum interactions and wallet management
- **Viem** - TypeScript interface for Ethereum

### API Services
- **Covalent API** - Blockchain data provider for transaction history and analytics
- **Moralis API** - Web3 data provider for DeFi, NFT, and token information

### Development Tools
- **Vite** - Frontend build tool with hot module replacement
- **TypeScript** - Type safety across the entire application

### UI Framework
- **React 18** - Frontend framework with concurrent features
- **Radix UI** - Unstyled accessible component primitives
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library for consistent iconography

### Data Management
- **TanStack React Query** - Server state management and caching
- **React Hook Form** - Form state management with validation
- **Zod** - Runtime type validation for form schemas

## Deployment Options

### Static Hosting Platforms
The application is optimized for deployment on static hosting platforms:

- **Vercel** (Recommended) - Automatic deployments from GitHub with environment variable support
- **Netlify** - Simple drag-and-drop deployment with build automation
- **GitHub Pages** - Free hosting with GitHub Actions for CI/CD
- **Cloudflare Pages** - Fast global CDN with edge computing capabilities

### Environment Configuration
Required environment variables for full functionality:
- `VITE_COVALENT_API_KEY` - Blockchain transaction data
- `VITE_MORALIS_API_KEY` - DeFi and NFT analytics
- `VITE_WALLETCONNECT_PROJECT_ID` - Enhanced wallet connection (optional)

### Build Process
```bash
cd client
npm install
npm run build
```
Generates optimized static files in `client/dist/` ready for deployment.