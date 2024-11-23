import { initFhevm, createInstance } from 'fhevmjs';

let fhevmInstance;

export const initFhevmInstance = async () => {
  try {
    // Load the TFHE WASM modules 
    await initFhevm();

    // Create an fhevmjs instance
    fhevmInstance = await createInstance({
      network: window.ethereum, // Use Ethereum provider
      gatewayUrl: 'https://gateway.cypherscan.ai', // Set your gateway URL
    });

    console.log('fhevmjs instance created:', fhevmInstance);
    return fhevmInstance;
  } catch (error) {
    console.error('Failed to initialize fhevmjs:', error.message);
    throw error;
  }
};

export const getFhevmInstance = () => {
  if (!fhevmInstance) {
    throw new Error('fhevmjs instance is not initialized. Call initFhevmInstance first.');
  }
  return fhevmInstance;
};
