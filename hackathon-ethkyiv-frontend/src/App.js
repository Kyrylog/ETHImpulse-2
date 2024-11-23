import React, { useEffect }  from 'react';
import './styles/style.css';
import './styles/starsBackground.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import CryptoAccountPage from './pages/CryptoAccountPage.js';
import BorrowHistoryPage from './pages/BorrowHistoryPage.js';
import VaultDetailsPage from './pages/VaultDetailsPage.js';

const App = () => {

  useEffect(() => {
    // Dynamically generate stars
    const starsContainer = document.querySelector('#stars');
    const starCount = 10;

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      // Generate random properties
      const topOffset = `${Math.random() * 100}vh`; // Random top position across the full height
      const leftOffset = `${Math.random() * 100}vw`; // Random left position across the full width
      const fallDuration = `${Math.random() * 6 + 6}s`; // Random fall duration
      const fallDelay = `${Math.random() * 10}s`; // Random fall delay

      // Apply the properties to the star
      star.style.setProperty('--top-offset', topOffset);
      star.style.setProperty('--left-offset', leftOffset);
      star.style.setProperty('--fall-duration', fallDuration);
      star.style.setProperty('--fall-delay', fallDelay);

      // Append the star to the container
      starsContainer.appendChild(star);
    }
  }, []);

  return (
    <Router>
      <div id='main-div'>
        <div id="background">
          <div id="stars" className="stars"></div>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/" exact activeClassName="active">
                Crypto Account
              </NavLink>
            </li>
            <li>
              <NavLink to="/borrow-history" activeClassName="active">
                Borrow History
              </NavLink>
            </li>
            <li>
              <NavLink to="/vault-details" activeClassName="active">
                Vault Details
              </NavLink>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<CryptoAccountPage />} />
          <Route path="/borrow-history" element={<BorrowHistoryPage />} />
          <Route path="/vault-details" element={<VaultDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
