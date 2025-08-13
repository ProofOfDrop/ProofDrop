class CovalentService {
    static async init(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.covalenthq.com/v1';
    }

    static async getWalletData(address, chainId) {
        try {
            // Get token balances with USD values
            const balancesResponse = await fetch(
                `${this.baseUrl}/${chainId}/address/${address}/balances_v2/?quote-currency=USD&key=${this.apiKey}`
            );
            
            if (!balancesResponse.ok) throw new Error('Covalent balances API error');
            const balancesData = await balancesResponse.json();
            
            // Get transactions with log events for deeper analysis
            const txsResponse = await fetch(
                `${this.baseUrl}/${chainId}/address/${address}/transactions_v2/?key=${this.apiKey}&no-logs=false`
            );
            
            if (!txsResponse.ok) throw new Error('Covalent transactions API error');
            const txsData = await txsResponse.json();
            
            // Analyze transactions for specific activities
            const analysis = this.analyzeTransactions(txsData.data.items);
            
            return {
                uniqueContracts: analysis.uniqueContracts,
                defiTransactions: analysis.defiTransactions,
                dexSwaps: analysis.dexSwaps,
                totalBalanceUSD: balancesData.data.items.reduce(
                    (sum, token) => sum + (token.quote || 0), 0
                ),
                transactions: txsData.data.items
            };
        } catch (error) {
            console.error('Error fetching Covalent data:', error);
            return {
                uniqueContracts: 0,
                defiTransactions: 0,
                dexSwaps: 0,
                totalBalanceUSD: 0,
                transactions: []
            };
        }
    }

    static analyzeTransactions(transactions) {
        let uniqueContracts = new Set();
        let defiTransactions = 0;
        let dexSwaps = 0;
        
        // Known DeFi and DEX contract addresses
        const defiContracts = new Set([
            '0x7a250d5630b4cf539739df2c5dacb4c659f2488d', // Uniswap Router
            '0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45', // Uniswap V3 Router
            '0x1111111254eeb25477b68fb85ed929f73a960582', // 1inch
            '0x881d40237659c251811cec9c364ef91dc08d300c', // MetaMask Swap
            '0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f'  // SushiSwap Router
        ]);
        
        transactions.forEach(tx => {
            // Count unique contracts interacted with
            if (tx.to_address) uniqueContracts.add(tx.to_address.toLowerCase());
            
            // Check for DeFi transactions
            if (tx.to_address && defiContracts.has(tx.to_address.toLowerCase())) {
                defiTransactions++;
            }
            
            // Check for DEX swaps (Transfer events between tokens)
            if (tx.log_events) {
                tx.log_events.forEach(event => {
                    if (event.decoded?.name === 'Swap' || 
                        event.decoded?.name === 'TokenExchange') {
                        dexSwaps++;
                    }
                });
            }
        });
        
        return {
            uniqueContracts: uniqueContracts.size,
            defiTransactions,
            dexSwaps
        };
    }

    static async getTokenBalances(address, chainId) {
        const response = await fetch(
            `${this.baseUrl}/${chainId}/address/${address}/balances_v2/?quote-currency=USD&key=${this.apiKey}`
        );
        const data = await response.json();
        
        return {
            total_balance_usd: data.data.items.reduce(
                (sum, token) => sum + (token.quote || 0), 0
            ),
            tokens: data.data.items
        };
    }
}
