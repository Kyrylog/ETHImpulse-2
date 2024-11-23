import React, { useEffect, useState } from 'react';
import { setupProvider } from '../web3.js';
import "../styles/CryptoAccountPage.css"

const CryptoAccountPage = () => {
  const [account, setAccount] = useState({
    name: '',
    publicKey: '0xBA6c754F59336e8fA00a2a2d6697191DbdD11d4E',
    balance: '',
    assets: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (isLoading) return; // Prevent duplicate calls
      setIsLoading(true);

      try {
        // Check if provider is already set up
        await setupProvider();
  
        // Check for existing account connections
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
  
        if (!accounts || accounts.length === 0) {
          console.log('No accounts found. Please connect a wallet.');
          return;
        }
  
        const signer = accounts[0];
  
        // Fetch balance
        const balanceHex = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [signer, 'latest'],
        });
  
        const balanceEth = parseInt(balanceHex, 16) / 1e18;

        const ensName = await window.ethereum.request({
          method: 'eth_resolveName',
          params: [signer],
        }).catch(() => null); // If the ENS name doesn't exist, catch the error and return null

        const accountName = ensName || signer; 
  
        // Update state
        setAccount((prev) => ({
          // name: accountName,
          publicKey: signer,
          balance: `${balanceEth.toFixed(4)} tEVMOS`,
          // assets: ['tEVMOS'], // Placeholder for assets
        }));
      } catch (error) {
        console.error('Error fetching account details:', error.message);
      }
    };
  
    fetchAccountDetails();

    try {
      // Wallet connection logic here
    } finally {
      setIsLoading(false);
    }
  }, []);
  

  return (
    <div className="crypto-account">
      <h1 className='page-heading'>Crypto Account</h1>
      {/* <p><strong>Name:</strong> {account.name}</p> */}
      <p><strong>Public Key:</strong> {account.publicKey}</p>
      <p><strong>Balance:</strong> {account.balance}</p>
      {/* <p><strong>Assets:</strong> {account.assets.join(', ')}</p> */}
    </div>
  );
};

export default CryptoAccountPage;
