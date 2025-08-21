import { useState } from 'react';
import { useAccount, usePublicClient } from 'wagmi';
import { formatEther } from 'viem';
import { WalletMetrics, ScoreBreakdown, calculateScore } from '../lib/scoring';

export function useWalletAnalysis() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStatus, setAnalysisStatus] = useState<string>('');
  const [analysis, setAnalysis] = useState<{
    metrics: WalletMetrics;
    score: ScoreBreakdown;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeWallet = async () => {
    if (!address || !publicClient || !isConnected) {
      setError('Wallet not connected');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysisStatus('Connecting to wallet...');

    try {
      // Get basic account information
      setAnalysisStatus('Reading wallet data...');
      const balance = await publicClient.getBalance({ address });
      const transactionCount = await publicClient.getTransactionCount({ address });

      // Get API keys from environment
      const covalentApiKey = import.meta.env.VITE_COVALENT_API_KEY;
      const moralisApiKey = import.meta.env.VITE_MORALIS_API_KEY;

      setAnalysisStatus('Analyzing blockchain activity...');

      let metrics: WalletMetrics = {
        accountAge: 1,
        gasSpent: BigInt(0),
        uniqueContracts: 0,
        governanceVotes: 0,
        defiEngagement: 0,
        airdropsClaimed: 0,
      };

      // Fetch real blockchain data using APIs
      try {
        // Use Covalent API for transaction history and gas data
        if (covalentApiKey) {
          setAnalysisStatus('Fetching transaction history...');
          const chainId = publicClient.chain.id;
          const covalentResponse = await fetch(
            `https://api.covalenthq.com/v1/${chainId}/address/${address}/transactions_v3/?key=${covalentApiKey}&block-signed-at-asc=false&no-logs=true&with-safe=false&quoteCurrency=USD`
          );
          
          if (covalentResponse.ok) {
            const covalentData = await covalentResponse.json();
            const transactions = covalentData.data?.items || [];
            
            // Calculate account age (months since first transaction)
            if (transactions.length > 0) {
              const firstTx = transactions[transactions.length - 1];
              const firstTxDate = new Date(firstTx.block_signed_at);
              const monthsOld = Math.floor((Date.now() - firstTxDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
              metrics.accountAge = Math.max(1, monthsOld);
            }
            
            // Calculate total gas spent
            let totalGasSpent = BigInt(0);
            const uniqueContracts = new Set<string>();
            
            transactions.forEach((tx: any) => {
              if (tx.gas_spent && tx.gas_price) {
                totalGasSpent += BigInt(tx.gas_spent) * BigInt(tx.gas_price);
              }
              if (tx.to_address && tx.to_address !== address) {
                uniqueContracts.add(tx.to_address.toLowerCase());
              }
            });
            
            metrics.gasSpent = totalGasSpent;
            metrics.uniqueContracts = uniqueContracts.size;
          }
        }

        // Use Moralis API for DeFi and governance data
        if (moralisApiKey) {
          setAnalysisStatus('Analyzing DeFi and NFT activity...');
          const moralisHeaders = {
            'X-API-Key': moralisApiKey,
            'Content-Type': 'application/json',
          };

          // Get ERC20 token transfers to detect DeFi activity
          try {
            const erc20Response = await fetch(
              `https://deep-index.moralis.io/api/v2.2/${address}/erc20/transfers?chain=eth&limit=100`,
              { headers: moralisHeaders }
            );
            
            if (erc20Response.ok) {
              const erc20Data = await erc20Response.json();
              const defiTokens = new Set<string>();
              
              erc20Data.result?.forEach((transfer: any) => {
                // Common DeFi token addresses (simplified check)
                const defiContracts = [
                  '0xa0b86a33e6776d8a4e6a8e4a5c0a4d6e1a', // Example: Uniswap
                  '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
                  '0xa0b86a33e6776d8a4e6a8e4a5c0a4d6e1b', // Example: Compound
                ];
                
                if (defiContracts.some(contract => 
                  transfer.token_address?.toLowerCase().includes(contract.toLowerCase().substring(0, 8))
                )) {
                  defiTokens.add(transfer.token_address);
                }
              });
              
              metrics.defiEngagement = Math.min(defiTokens.size, 20);
            }
          } catch (error) {
            console.warn('Moralis ERC20 API error:', error);
          }

          // Detect governance participation through transaction analysis
          try {
            const governanceContracts = [
              '0x5e4be8bc9637f0eaf1c755019678cf1be00e5c9c', // Compound Governor
              '0xc0da02939e1441f497fd74f78ce7decb17b66529', // Uniswap Governor
              '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9', // Aave Governor
            ];
            
            // Check recent transactions for governance interactions
            const recentTxResponse = await fetch(
              `https://deep-index.moralis.io/api/v2.2/${address}?chain=eth&limit=50`,
              { headers: moralisHeaders }
            );
            
            if (recentTxResponse.ok) {
              const txData = await recentTxResponse.json();
              let governanceVotes = 0;
              
              txData.result?.forEach((tx: any) => {
                if (governanceContracts.some(contract => 
                  tx.to_address?.toLowerCase() === contract.toLowerCase()
                )) {
                  governanceVotes++;
                }
              });
              
              metrics.governanceVotes = Math.min(governanceVotes, 20);
            }
          } catch (error) {
            console.warn('Moralis governance API error:', error);
          }

          // Get NFT transfers to detect airdrop activity
          try {
            const nftResponse = await fetch(
              `https://deep-index.moralis.io/api/v2.2/${address}/nft/transfers?chain=eth&limit=100&direction=to`,
              { headers: moralisHeaders }
            );
            
            if (nftResponse.ok) {
              const nftData = await nftResponse.json();
              const airdropContracts = new Set<string>();
              
              nftData.result?.forEach((transfer: any) => {
                // Count unique NFT contracts received as potential airdrops
                if (transfer.value === '0') { // Free mints/airdrops
                  airdropContracts.add(transfer.token_address);
                }
              });
              
              metrics.airdropsClaimed = Math.min(airdropContracts.size, 20);
            }
          } catch (error) {
            console.warn('Moralis NFT API error:', error);
          }
        }

        // If no API keys provided, use mock data with warning
        if (!covalentApiKey && !moralisApiKey) {
          setError('API keys not configured. Using demo data. Add VITE_COVALENT_API_KEY and VITE_MORALIS_API_KEY for real analysis.');
          metrics = {
            accountAge: Math.max(1, Math.floor(Math.random() * 36)),
            gasSpent: BigInt(Math.floor(Math.random() * 5 * 1e18)),
            uniqueContracts: Math.floor(Math.random() * 100),
            governanceVotes: Math.floor(Math.random() * 15),
            defiEngagement: Math.floor(Math.random() * 20),
            airdropsClaimed: Math.floor(Math.random() * 25),
          };
        }

      } catch (apiError) {
        console.error('API Error:', apiError);
        setError('Failed to fetch blockchain data. Please check your API keys and try again.');
        return;
      }

      setAnalysisStatus('Calculating reputation score...');
      const score = calculateScore(metrics);
      
      setAnalysisStatus('Analysis complete!');
      setAnalysis({ metrics, score });
    } catch (err) {
      console.error('Analysis error:', err);
      setError('Failed to analyze wallet. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStatus('');
    }
  };

  return {
    address,
    isConnected,
    isAnalyzing,
    analysisStatus,
    analysis,
    error,
    analyzeWallet,
  };
}
