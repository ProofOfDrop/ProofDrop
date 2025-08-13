// Configuration for test networks
const testnetConfigs = {
    ethereum: {
        chainId: '0xaa36a7', // Sepolia
        chainName: 'Ethereum Sepolia',
        rpcUrls: ['https://rpc.sepolia.org'],
        blockExplorerUrls: ['https://sepolia.etherscan.io'],
        nativeCurrency: {
            name: 'Sepolia ETH',
            symbol: 'ETH',
            decimals: 18
        }
    },
    polygon: {
        chainId: '0x13881', // Mumbai
        chainName: 'Polygon Mumbai',
        rpcUrls: ['https://rpc-mumbai.maticvigil.com'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com'],
        nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18
        }
    },
    bsc: {
        chainId: '0x61', // BSC Testnet
        chainName: 'Binance Smart Chain Testnet',
        rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
        blockExplorerUrls: ['https://testnet.bscscan.com'],
        nativeCurrency: {
            name: 'Binance Chain Native Token',
            symbol: 'tBNB',
            decimals: 18
        }
    },
    arbitrum: {
        chainId: '0x66eed', // Arbitrum Goerli
        chainName: 'Arbitrum Goerli',
        rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
        blockExplorerUrls: ['https://goerli.arbiscan.io'],
        nativeCurrency: {
            name: 'Arbitrum Goerli ETH',
            symbol: 'AGOR',
            decimals: 18
        }
    }
};

// Web3Modal configuration
const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: {
                11155111: 'https://rpc.sepolia.org', // Sepolia
                80001: 'https://rpc-mumbai.maticvigil.com',
                97: 'https://data-seed-prebsc-1-s1.binance.org:8545',
                421613: 'https://goerli-rollup.arbitrum.io/rpc'
            }
        }
    }
};

const web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
    theme: 'dark'
});

// App state
let web3;
let provider;
let selectedAccount;
let currentChainId;
let reputationScore = 0;
let scoreBreakdown = {};

// Initialize app
async function init() {
    // Initialize services
    await MoralisService.init('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjQwMDhkMTc4LWQxNmItNDU4Yy05MTRkLWNlZjU1YzZmMjdiMyIsIm9yZ0lkIjoiNDY0MzAyIiwidXNlcklkIjoiNDc3NjY3IiwidHlwZUlkIjoiYTNhODc2MmUtYWRiNS00MDk1LWFmNmEtNDhmNGQ5ZTA4NDVkIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NTQ4MTI3MjQsImV4cCI6NDkxMDU3MjcyNH0.ssV3d1p5s7iDcYT2rZtosJ8J_z1cuuNvF9bU5X8O2HY');
    await CovalentService.init('cqt_rQYkGgFvK3CcfjKw9K4gGBQmxyRK');
    
    // Check if wallet is already connected
    if (web3Modal.cachedProvider) {
        await connectWallet();
    }

    // Set up event listeners
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    document.getElementById('switchNetworkBtn').addEventListener('click', showNetworkSwitchModal);
    document.getElementById('mintBadgeBtn').addEventListener('click', mintProofBadge);
}

// Connect wallet
async function connectWallet() {
    try {
        provider = await web3Modal.connect();
        web3 = new Web3(provider);
        
        // Subscribe to accounts change
        provider.on('accountsChanged', (accounts) => {
            selectedAccount = accounts[0];
            updateUI();
        });

        // Subscribe to chain change
        provider.on('chainChanged', (chainId) => {
            currentChainId = parseInt(chainId, 16);
            updateUI();
        });

        // Get initial account and chain
        const accounts = await web3.eth.getAccounts();
        selectedAccount = accounts[0];
        currentChainId = await web3.eth.getChainId();

        updateUI();
    } catch (error) {
        console.error('Could not connect to wallet:', error);
        alert('Error connecting wallet: ' + error.message);
    }
}

// Update UI based on wallet state
async function updateUI() {
    if (selectedAccount) {
        // Update wallet info
        document.getElementById('connectWalletBtn').classList.add('d-none');
        document.getElementById('walletInfo').classList.remove('d-none');
        document.getElementById('walletAddress').textContent = 
            `${selectedAccount.substring(0, 6)}...${selectedAccount.substring(38)}`;
        
        // Update network info
        const networkName = getNetworkName(currentChainId);
        const networkBadge = document.getElementById('networkBadge');
        networkBadge.textContent = networkName;
        networkBadge.className = `badge network-badge bg-${getNetworkBadgeColor(currentChainId)}`;
        
        // Show reputation section
        document.getElementById('reputationSection').classList.remove('d-none');
        
        // Fetch and calculate reputation data
        await calculateReputationScore();
    } else {
        document.getElementById('connectWalletBtn').classList.remove('d-none');
        document.getElementById('walletInfo').classList.add('d-none');
        document.getElementById('reputationSection').classList.add('d-none');
    }
}

// Calculate reputation score using multiple data sources
async function calculateReputationScore() {
    try {
        // Get data from all sources
        const moralisData = await MoralisService.getWalletActivity(selectedAccount);
        const graphData = await TheGraphService.getAirdropParticipation(selectedAccount);
        const covalentData = await CovalentService.getWalletData(selectedAccount, currentChainId);
        
        // Calculate each component of the score
        scoreBreakdown = {
            governance: calculateGovernanceScore(graphData.governanceParticipation),
            defi: calculateDefiScore(covalentData.defiTransactions),
            contracts: calculateContractScore(covalentData.uniqueContracts),
            airdrops: calculateAirdropScore(graphData.airdropCount),
            dex: calculateDexScore(covalentData.dexSwaps),
            balance: await calculateBalanceScore(selectedAccount, currentChainId)
        };
        
        // Sum all scores (max 100 points)
        reputationScore = Math.min(
            Object.values(scoreBreakdown).reduce((sum, score) => sum + score, 0),
            100
        );
        
        updateReputationUI();
        updateAirdropHistory(graphData.airdrops);
    } catch (error) {
        console.error('Error calculating reputation:', error);
        alert('Error calculating reputation: ' + error.message);
    }
}

// Scoring functions
function calculateGovernanceScore(proposalsVoted) {
    if (proposalsVoted >= 5) return 20;
    if (proposalsVoted >= 3) return 15;
    if (proposalsVoted >= 1) return 5;
    return 0;
}

function calculateDefiScore(defiTransactions) {
    if (defiTransactions >= 10) return 20;
    if (defiTransactions >= 5) return 10;
    if (defiTransactions >= 1) return 5;
    return 0;
}

function calculateContractScore(uniqueContracts) {
    if (uniqueContracts >= 20) return 15;
    if (uniqueContracts >= 10) return 10;
    if (uniqueContracts >= 5) return 5;
    return 0;
}

function calculateAirdropScore(airdropCount) {
    if (airdropCount >= 5) return 15;
    if (airdropCount >= 3) return 10;
    if (airdropCount >= 1) return 5;
    return 0;
}

function calculateDexScore(dexSwaps) {
    if (dexSwaps >= 25) return 15;
    if (dexSwaps >= 15) return 10;
    if (dexSwaps >= 5) return 5;
    if (dexSwaps >= 2) return 1;
    return 0;
}

async function calculateBalanceScore(address, chainId) {
    try {
        const balanceData = await CovalentService.getTokenBalances(address, chainId);
        const totalBalanceUSD = balanceData.total_balance_usd;
        
        if (totalBalanceUSD > 250) return 15;
        if (totalBalanceUSD > 50) return 10;
        if (totalBalanceUSD > 10) return 5;
        return 0;
    } catch (error) {
        console.error('Error calculating balance score:', error);
        return 0;
    }
}

// Update reputation UI elements
function updateReputationUI() {
    const reputationScoreEl = document.getElementById('reputationScore');
    const reputationBar = document.getElementById('reputationBar');
    const scoreBreakdownEl = document.getElementById('scoreBreakdown');
    
    reputationScoreEl.textContent = reputationScore;
    reputationBar.style.width = `${reputationScore}%`;
    reputationBar.textContent = `${reputationScore}%`;
    
    // Set progress bar color based on score
    if (reputationScore < 30) {
        reputationBar.className = 'progress-bar progress-bar-striped bg-danger';
    } else if (reputationScore < 70) {
        reputationBar.className = 'progress-bar progress-bar-striped bg-warning';
    } else {
        reputationBar.className = 'progress-bar progress-bar-striped bg-success';
    }
    
    // Update score breakdown table
    scoreBreakdownEl.innerHTML = `
        <tr>
            <td>Governance Participation</td>
            <td>${scoreBreakdown.governance}</td>
            <td>20</td>
        </tr>
        <tr>
            <td>DeFi Engagement</td>
            <td>${scoreBreakdown.defi}</td>
            <td>20</td>
        </tr>
        <tr>
            <td>Unique Contract Interactions</td>
            <td>${scoreBreakdown.contracts}</td>
            <td>15</td>
        </tr>
        <tr>
            <td>Airdrops Claimed</td>
            <td>${scoreBreakdown.airdrops}</td>
            <td>15</td>
        </tr>
        <tr>
            <td>DEX Swaps</td>
            <td>${scoreBreakdown.dex}</td>
            <td>15</td>
        </tr>
        <tr>
            <td>On-Chain Balance</td>
            <td>${scoreBreakdown.balance}</td>
            <td>15</td>
        </tr>
    `;
    
    // Update mint button state
    document.getElementById('mintBadgeBtn').disabled = reputationScore < 50;
}

// Update airdrop history list
function updateAirdropHistory(airdrops) {
    const airdropList = document.getElementById('airdropList');
    airdropList.innerHTML = '';
    
    airdrops.forEach(airdrop => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <div class="d-flex justify-content-between">
                <span>${airdrop.project} (${airdrop.network})</span>
                <span>${airdrop.amount} ${airdrop.token}</span>
            </div>
            <small class="text-muted">${new Date(airdrop.date).toLocaleDateString()}</small>
        `;
        airdropList.appendChild(li);
    });
}

// Show network switch modal
async function showNetworkSwitchModal() {
    const network = prompt(
        'Select a test network:\n\n' +
        '1. Ethereum Sepolia (11155111)\n' +
        '2. Polygon Mumbai (80001)\n' +
        '3. BSC Testnet (97)\n' +
        '4. Arbitrum Goerli (421613)\n\n' +
        'Enter the number (1-4):'
    );
    
    let chainId;
    switch (network) {
        case '1': chainId = '0xaa36a7'; break; // Sepolia
        case '2': chainId = '0x13881'; break;  // Mumbai
        case '3': chainId = '0x61'; break;     // BSC Testnet
        case '4': chainId = '0x66eed'; break;  // Arbitrum Goerli
        default: return;
    }
    
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId }],
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                let chainConfig;
                switch (chainId) {
                    case '0xaa36a7': chainConfig = testnetConfigs.ethereum; break;
                    case '0x13881': chainConfig = testnetConfigs.polygon; break;
                    case '0x61': chainConfig = testnetConfigs.bsc; break;
                    case '0x66eed': chainConfig = testnetConfigs.arbitrum; break;
                }
                
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [chainConfig],
                });
            } catch (addError) {
                console.error('Error adding network:', addError);
                alert('Error adding network: ' + addError.message);
            }
        }
    }
}

// Mint ProofBadge NFT
async function mintProofBadge() {
    const badgeStatus = document.getElementById('badgeStatus');
    
    if (reputationScore < 50) {
        badgeStatus.innerHTML = '<div class="alert alert-danger">You need a reputation score of at least 50 to mint a ProofBadge</div>';
        return;
    }
    
    badgeStatus.innerHTML = '<div class="alert alert-info">Minting your ProofBadge...</div>';
    
    try {
        // In a real implementation, you would:
        // 1. Deploy an NFT contract on Polygon Mumbai using Thirdweb
        // 2. Call the mint function with the user's address and reputation score
        // For now, we'll simulate this
        
        // Simulate transaction delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        badgeStatus.innerHTML = `
            <div class="alert alert-success">
                Success! ProofBadge minted on Polygon Mumbai.
                <a href="https://mumbai.polygonscan.com/" target="_blank" class="alert-link">View on explorer</a>
            </div>
        `;
    } catch (error) {
        badgeStatus.innerHTML = `
            <div class="alert alert-danger">
                Error minting ProofBadge: ${error.message}
            </div>
        `;
    }
}

// Helper functions
function getNetworkName(chainId) {
    switch (chainId) {
        case 11155111: return 'Ethereum Sepolia';
        case 80001: return 'Polygon Mumbai';
        case 97: return 'BSC Testnet';
        case 421613: return 'Arbitrum Goerli';
        default: return `Chain ID: ${chainId}`;
    }
}

function getNetworkBadgeColor(chainId) {
    switch (chainId) {
        case 11155111: return 'primary'; // Sepolia - blue
        case 80001: return 'success';    // Mumbai - green
        case 97: return 'warning';       // BSC - yellow
        case 421613: return 'info';      // Arbitrum - teal
        default: return 'secondary';
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
