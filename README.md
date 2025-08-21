# ProofDrop - Airdrop Reputation Protocol

> A decentralized protocol for verifiable airdrop reputation that analyzes on-chain wallet activity to create reputation scores and progressive badges.

![ProofDrop Banner](https://via.placeholder.com/800x200/1a1a2e/ffffff?text=ProofDrop+-+Airdrop+Reputation+Protocol)

## 🚀 Quick Start

### Local Development
```bash
cd client
npm install
npm run dev
```

### Build for Production
```bash
cd client
npm run build
# Static files ready in client/dist/
```

## 🌟 Features

- **Multi-Chain Support**: Ethereum, BSC, Polygon, and testnets
- **Real Blockchain Analysis**: Powered by Covalent & Moralis APIs
- **Progressive Badges**: BOT → Android → Cyborg → Human evolution
- **Responsive Design**: Dark space theme with mobile optimization
- **Client-Side Only**: No server required - deploy anywhere
- **Web3 Native**: Direct blockchain connections with multiple wallet support

## 🎯 Reputation Scoring

ProofDrop analyzes wallets across 6 key metrics (100 points total):

| Metric | Points | Description |
|--------|--------|-------------|
| Account Age | 10 | How long the wallet has been active |
| Gas Spent | 10 | Total transaction fees paid |
| Contract Interactions | 20 | Unique smart contracts used |
| Governance Participation | 20 | DAO voting and proposal activity |
| DeFi Engagement | 20 | DEX, lending, staking activity |
| Airdrops Claimed | 20 | Historical airdrop participation |

### Badge Progression
- 🤖 **BOT** (0-25 points) - Red warning badge
- 🔧 **Android** (26-50 points) - Silver progression badge  
- ⚙️ **Cyborg** (51-75 points) - Gold advancement badge
- 👤 **Human** (76-100 points) - Diamond elite badge

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/proofdrop&project-name=proofdrop&repository-name=proofdrop)

### Manual Vercel Setup
1. Fork this repository
2. Connect to Vercel
3. Configure build settings:
   - **Build Command**: `cd client && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `cd client && npm install`
4. Add environment variables:
   - `VITE_COVALENT_API_KEY`
   - `VITE_MORALIS_API_KEY`
   - `VITE_WALLETCONNECT_PROJECT_ID` (optional)

## 🔧 Environment Setup

### Required API Keys
1. **Covalent API**: Get from [covalenthq.com](https://www.covalenthq.com/)
2. **Moralis API**: Get from [moralis.io](https://moralis.io/)
3. **WalletConnect** (optional): Get from [cloud.walletconnect.com](https://cloud.walletconnect.com/)

### Environment Variables
Create a `.env.local` file in the `client` directory:
```bash
VITE_COVALENT_API_KEY=your_covalent_api_key
VITE_MORALIS_API_KEY=your_moralis_api_key
VITE_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI
- **Web3**: RainbowKit + Wagmi + Viem
- **APIs**: Covalent + Moralis
- **Build**: Vite with optimized static output
- **Deploy**: Static hosting (Vercel, Netlify, GitHub Pages)

## 📁 Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   ├── pages/         # Page components
│   │   └── App.tsx        # Main application component
│   ├── dist/              # Build output (generated)
│   └── package.json       # Frontend dependencies
├── .github/workflows/     # GitHub Actions for deployment
├── vercel.json           # Vercel deployment configuration
└── DEPLOYMENT.md         # Detailed deployment guide
```

## 🌐 Alternative Deployment Options

### Netlify
```bash
cd client && npm run build
# Drag client/dist folder to netlify.com/drop
```

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Use provided GitHub Actions workflow
3. Add API keys to repository secrets

### Cloudflare Pages
1. Connect repository to Cloudflare Pages
2. Set build directory to `client`
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Having issues with deployment? Check the [DEPLOYMENT.md](DEPLOYMENT.md) guide or open an issue.

---

**Built with ❤️ for the Web3 community**