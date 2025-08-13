class TheGraphService {
    static async getAirdropParticipation(address) {
        try {
            // This would query your subgraph that tracks airdrop participation
            // For demo purposes, we'll use a mock response
            
            // Mock governance participation
            const governanceParticipation = Math.floor(Math.random() * 6); // 0-5
            
            // Mock airdrops
            const mockAirdrops = [
                {
                    project: "Uniswap",
                    network: "Ethereum Sepolia",
                    amount: "100",
                    token: "UNI",
                    date: "2023-05-15"
                },
                {
                    project: "Aave",
                    network: "Polygon Mumbai",
                    amount: "50",
                    token: "AAVE",
                    date: "2023-06-20"
                },
                {
                    project: "Compound",
                    network: "Ethereum Sepolia",
                    amount: "75",
                    token: "COMP",
                    date: "2023-07-10"
                }
            ];
            
            return {
                airdropCount: mockAirdrops.length,
                airdrops: mockAirdrops,
                governanceParticipation
            };
        } catch (error) {
            console.error('Error fetching The Graph data:', error);
            return {
                airdropCount: 0,
                airdrops: [],
                governanceParticipation: 0
            };
        }
    }
}