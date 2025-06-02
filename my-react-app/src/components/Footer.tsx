import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';
import './Footer.css';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">{t(language, 'appTitle')}</h3>
          <p className="footer-description">
            {t(language, 'footerDescription')}
          </p>
        </div>
        
        <div className="footer-section">
          <h3 className="footer-title">{t(language, 'sitemap')}</h3>
          <nav className="footer-nav">
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <Link to="/" className="footer-nav-link">
                  {t(language, 'home')}
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/rental-agreement" className="footer-nav-link">
                  {t(language, 'rentalAgreement')}
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link to="/how-to-use" className="footer-nav-link">
                  {t(language, 'howToUse')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div> */}
      
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {currentYear} RentalDIY. {t(language, 'allRightsReserved')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
