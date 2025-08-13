class MoralisService {
    static async init(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://deep-index.moralis.io/api/v2';
    }

    static async getWalletActivity(address) {
        try {
            const response = await fetch(`${this.baseUrl}/${address}?chain=sepolia`, {
                headers: {
                    'X-API-Key': this.apiKey
                }
            });
            
            if (!response.ok) throw new Error('Moralis API error');
            
            const data = await response.json();
            
            // Calculate wallet age in days
            const firstTxTimestamp = new Date(data.first_transaction?.block_timestamp || Date.now());
            const walletAgeDays = (Date.now() - firstTxTimestamp.getTime()) / (1000 * 60 * 60 * 24);
            
            // Check recent activity
            const lastTxTimestamp = new Date(data.last_transaction?.block_timestamp || 0);
            const activeLast30Days = (Date.now() - lastTxTimestamp.getTime()) < (30 * 24 * 60 * 60 * 1000);
            
            return {
                walletAgeDays,
                activeLast30Days,
                totalTransactions: data.total_transactions,
                firstTransaction: data.first_transaction,
                lastTransaction: data.last_transaction
            };
        } catch (error) {
            console.error('Error fetching Moralis data:', error);
            return {
                walletAgeDays: 0,
                activeLast30Days: false,
                totalTransactions: 0
            };
        }
    }
}