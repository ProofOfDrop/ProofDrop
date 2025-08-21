# ProofDrop - Client-Side Deployment Guide

ProofDrop is now configured as a fully client-side React application that can be deployed on static hosting platforms without any server requirements.

## Quick Deploy Options

### Option 1: Deploy to Vercel (Recommended)

1. **Fork/Clone this repository** to your GitHub account
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the project settings from `vercel.json`
3. **Configure Build Settings** (should be auto-detected):
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `cd client && npm install`
4. **Add Environment Variables**:
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `VITE_COVALENT_API_KEY` (your Covalent API key)
   - Add: `VITE_MORALIS_API_KEY` (your Moralis API key)
   - Add: `VITE_WALLETCONNECT_PROJECT_ID` (optional, for WalletConnect)
5. **Deploy**: Click Deploy and your app will be live!

### Option 2: Deploy to Netlify

1. **Build the project**:
   ```bash
   cd client
   npm install
   npm run build
   ```
2. **Deploy**:
   - Drag the `client/dist` folder to [netlify.com/drop](https://netlify.com/drop)
   - Or connect your GitHub repo at [netlify.com](https://netlify.com)
3. **Add Environment Variables** in Netlify dashboard

### Option 3: GitHub Pages

1. **Enable GitHub Pages** in your repository settings
2. **Add Build Action** - Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
         - run: cd client && npm install && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./client/dist
   ```
3. **Add Secrets** in GitHub repository settings for API keys

## Environment Variables

The app requires these environment variables for full functionality:

- `VITE_COVALENT_API_KEY` - Get from [covalenthq.com](https://covalenthq.com)
- `VITE_MORALIS_API_KEY` - Get from [moralis.io](https://moralis.io)
- `VITE_WALLETCONNECT_PROJECT_ID` - Get from [walletconnect.org](https://walletconnect.org)

## Local Development

```bash
cd client
npm install
npm run dev
```

## Building for Production

```bash
cd client
npm run build
```

The built files will be in the `client/dist` directory.

## Features

- ✅ Multi-chain wallet connection (Ethereum, BSC, Polygon, Testnets)
- ✅ Real blockchain data analysis via Covalent & Moralis APIs
- ✅ Progressive reputation badges (BOT → Android → Cyborg → Human)
- ✅ Responsive design with dark space theme
- ✅ No server required - purely client-side
- ✅ SEO optimized with meta tags
- ✅ Mobile-friendly wallet connection

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Radix UI components
- **Web3**: RainbowKit + Wagmi + Viem
- **APIs**: Covalent (transaction data) + Moralis (DeFi/NFT data)
- **Deployment**: Static hosting (Vercel, Netlify, GitHub Pages)

## Support

For support or questions about deployment, please open an issue in the repository.