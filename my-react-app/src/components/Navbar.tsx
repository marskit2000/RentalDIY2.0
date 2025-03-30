import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              {t(language, 'home')}
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/rental-agreement" 
              className={`nav-link ${location.pathname === '/rental-agreement' ? 'active' : ''}`}
            >
              {t(language, 'rentalAgreement')}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
