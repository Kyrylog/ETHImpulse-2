import React, { useState } from 'react';
import { getVaultContract } from '../web3.js';
import '../styles/BorrowHistory.css';
// import fhevmjs from 'fhevmjs';

const BorrowHistoryPage = () => {
  const [borrowHistory] = useState([
    { date: '2024-01-01', amount: '2 ETH', status: 'Repaid' },
    { date: '2024-02-01', amount: '1 ETH', status: 'Pending' },
  ]);
  const [borrowAmount, setBorrowAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleBorrow = async () => {
    try {
      const maxBorrowAmount = 3; // Replace with actual logic
      if (parseFloat(borrowAmount) > maxBorrowAmount) {
        setMessage('Borrow amount exceeds the maximum allowed.');
        return;
      }

      const vault = getVaultContract();
    //   const encryptedAmount = fhevmjs.encrypt(borrowAmount);
      const tx = await vault.borrow(borrowAmount);
      await tx.wait();
      setMessage('Borrowed successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to borrow funds.');
    }
  };

  return (
    <div className='history-body'>
      <h1 className='history-h1'>Borrow History</h1>
      <ul className='history-ul'>
        {borrowHistory.map((entry, index) => (
          <li className='history-li' key={index}>
            {entry.date} - {entry.amount} - {entry.status}
          </li>
        ))}
      </ul>
      <h2 className='history-h2'>Borrow Funds</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={borrowAmount}
        onChange={(e) => setBorrowAmount(e.target.value)}
        min="0"
        step="any"
      />
      <button className='history-button' onClick={handleBorrow}>Borrow</button>
      {message && <p className='history-p'>{message}</p>}
    </div>
  );
};

export default BorrowHistoryPage;
