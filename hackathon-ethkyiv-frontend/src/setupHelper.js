// import { ethers } from 'ethers';

// let provider;
// let vaultContract;
// let scoreContract;

// const vaultContractAddress = '0x...'; // Replace with your contract address
// const scoreContractAddress = '0x...'; // Replace with your contract address

// // ABI array for the contracts
// const vaultAbi = [
//   // Add your Vault contract ABI here
// ];

// const scoreAbi = [
//   // Add your Score contract ABI here
// ];

// export const setupProvider = async () => {
//   provider = new ethers.providers.Web3Provider(window.ethereum);
//   await provider.send('eth_requestAccounts', []);
//   const signer = provider.getSigner();

//   vaultContract = new ethers.Contract(vaultContractAddress, vaultAbi, signer);
//   scoreContract = new ethers.Contract(scoreContractAddress, scoreAbi, signer);
// };

// export const getVaultContract = () => vaultContract;
// export const getScoreContract = () => scoreContract;