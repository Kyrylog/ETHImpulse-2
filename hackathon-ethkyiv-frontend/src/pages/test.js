// import React, { useState } from 'react';
// import { getVaultContract, getScoreContract } from './web3';

// const AccountPage = () => {
//   const [borrowAmount, setBorrowAmount] = useState('');
//   const [message, setMessage] = useState('');

//   const handleBorrow = async () => {
//     try {
//       const vault = getVaultContract();
//       const score = getScoreContract();

//       // Fetch borrow history from vault
//       const borrowHistory = await vault.getBorrowHistory();
      
//       // Calculate credit score
//       const creditScore = await score.calculateCreditScore(borrowHistory);
//       const maxBorrowable = await score.maxBorrowAmount(creditScore);

//       // Check if requested amount exceeds max borrowable
//       if (parseInt(borrowAmount) > maxBorrowable) {
//         setMessage('Error: Requested amount exceeds your maximum borrowable amount.');
//         return;
//       }

//       // Fetch vault balance
//       const vaultBalance = await vault.decryptedBalance();
//       if (parseInt(borrowAmount) > vaultBalance) {
//         setMessage('Error: Vault does not have enough funds.');
//         return;
//       }

//       // Borrow funds
//       await vault.addBorrowRecord(window.ethereum.selectedAddress, borrowAmount);
//       setMessage('Borrow successful!');
//     } catch (error) {
//       setMessage(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div>
//       <h1>Borrow Funds</h1>
//       <input
//         type="number"
//         value={borrowAmount}
//         onChange={(e) => setBorrowAmount(e.target.value)}
//         placeholder="Enter amount to borrow"
//       />
//       <button onClick={handleBorrow}>Borrow</button>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default AccountPage;


// import React, { useEffect, useState } from 'react';
// import { getVaultContract } from './web3';

// const BorrowHistoryPage = () => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       const vault = getVaultContract();
//       const userHistory = await vault.getBorrowHistory(window.ethereum.selectedAddress);
//       setHistory(userHistory.map((amount, index) => ({ id: index, amount })));
//     };

//     fetchHistory();
//   }, []);

//   return (
//     <div>
//       <h1>Borrow History</h1>
//       <ul>
//         {history.map((entry) => (
//           <li key={entry.id}>Borrowed: {entry.amount}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BorrowHistoryPage;

// import React, { useEffect, useState } from 'react';
// import { getVaultContract } from './web3';

// const VaultPage = () => {
//   const [balance, setBalance] = useState(0);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       const vault = getVaultContract();
//       const decryptedBalance = await vault.decryptedBalance();
//       setBalance(decryptedBalance);
//     };

//     fetchBalance();
//   }, []);

//   return (
//     <div>
//       <h1>Vault</h1>
//       <p>Available Balance: {balance}</p>
//     </div>
//   );
// };

// export default VaultPage;
