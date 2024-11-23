// import { JsonRpcProvider, Contract } from 'ethers';

// let provider;
// let signer;
// let vaultContract;

// // Replace these values with your contract addresses and ABIs
// const vaultContractAddress = '0x...'; // Replace with the actual Vault contract address
// const vaultAbi = [
//   {
//     inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
//     name: 'borrow',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
//     name: 'addLiquidity',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'getBalance',
//     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
// ];

// export const setupProvider = async () => {
//   try {
//     // Ensure the browser has MetaMask or another Ethereum provider installed
//     if (!window.ethereum) {
//       throw new Error('Ethereum provider not found. Install MetaMask or another wallet.');
//     }

//     // Set up provider and signer
//     provider = new JsonRpcProvider(window.ethereum);
//     await provider.send('eth_requestAccounts', []); // Prompt the user to connect their wallet
//     signer = provider.getSigner();

//     console.log('Provider and signer set up successfully');
//   } catch (error) {
//     console.error('Failed to set up provider:', error.message);
//     throw error;
//   }
// };

// export const getVaultContract = () => {
//   try {
//     if (!vaultContract) {
//       if (!signer) {
//         throw new Error('Provider not initialized. Call setupProvider() first.');
//       }

//       // Instantiate the Vault contract
//       vaultContract = new Contract(vaultContractAddress, vaultAbi, signer);
//     }
//     return vaultContract;
//   } catch (error) {
//     console.error('Failed to get Vault contract:', error.message);
//     throw error;
//   }
// };

// import { BrowserProvider, Contract } from 'ethers';

// let provider;
// let signer;
// let vaultContract;

// // Replace these values with your contract addresses and ABIs
// const vaultContractAddress = '0x...'; // Replace with the actual Vault contract address
// const vaultAbi = [
//   {
//     inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
//     name: 'borrow',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
//     name: 'addLiquidity',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'getBalance',
//     outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
//     stateMutability: 'view',
//     type: 'function',
//   },
// ];

// export const setupProvider = async () => {
//   try {
//     // Ensure the browser has MetaMask or another Ethereum provider installed
//     if (!window.ethereum) {
//       throw new Error('Ethereum provider not found. Install MetaMask or another wallet.');
//     }

//     // Set up provider and signer
//     provider = new BrowserProvider(window.ethereum); // Use BrowserProvider for MetaMask
//     signer = await provider.getSigner(); // Get the signer from the provider

//     console.log('Provider and signer set up successfully');
//   } catch (error) {
//     console.error('Failed to set up provider:', error.message);
//     throw error;
//   }
// };

// export const getVaultContract = () => {
//   try {
//     if (!vaultContract) {
//       if (!signer) {
//         throw new Error('Provider not initialized. Call setupProvider() first.');
//       }

//       // Instantiate the Vault contract
//       vaultContract = new Contract(vaultContractAddress, vaultAbi, signer);
//     }
//     return vaultContract;
//   } catch (error) {
//     console.error('Failed to get Vault contract:', error.message);
//     throw error;
//   }
// };

import { BrowserProvider, Contract } from 'ethers';

let provider;
let signer;
let vaultContract;

// Replace these values with your contract addresses and ABIs
const vaultContractAddress = '0x...'; // Replace with the actual Vault contract address
const vaultAbi = [
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_amount', type: 'uint256' }],
    name: 'addLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
];

export const setupProvider = async () => {
  try {
    // Ensure the browser has MetaMask or another Ethereum provider installed
    if (!window.ethereum) {
      throw new Error('Ethereum provider not found. Install MetaMask or another wallet.');
    }

    // Set up provider and signer
    provider = new BrowserProvider(window.ethereum); // Use BrowserProvider for MetaMask
    signer = await provider.getSigner(); // Get the signer from the provider

    console.log('Provider and signer set up successfully');
  } catch (error) {
    console.error('Failed to set up provider:', error.message);
    throw error;
  }
};

export const getVaultContract = () => {
  try {
    if (!vaultContract) {
      if (!signer) {
        throw new Error('Provider not initialized. Call setupProvider() first.');
      }

      // Instantiate the Vault contract
      vaultContract = new Contract(vaultContractAddress, vaultAbi, signer);
    }
    return vaultContract;
  } catch (error) {
    console.error('Failed to get Vault contract:', error.message);
    throw error;
  }
};

// Function to get the ENS name, if supported
export const getEnsName = async (address) => {
  try {
    // Get network information
    const network = await provider.getNetwork();

    // Only resolve ENS if the network supports it
    if (network.name === 'homestead' || network.chainId === 1) {
      // Mainnet supports ENS, try to resolve name
      const ensName = await provider.resolveName(address);
      return ensName || address; // Return ENS name if available, or fallback to address
    } else {
      console.log('ENS is not supported on this network.');
      return address; // Return the address if ENS is not supported
    }
  } catch (error) {
    console.error('Error resolving ENS name:', error.message);
    return address; // Return the address if there's an error
  }
};


