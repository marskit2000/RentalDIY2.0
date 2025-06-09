import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedImage, t } from '../translations';
import './Footer.css';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const appFooterLogo = getLocalizedImage({
      'en': '/src/assets/images/logo/easylease_logo_white_a_eng.png',
      'zh-TW': '/src/assets/images/logo/easylease_logo_white_a_chi_HK.png',
      'zh-CN': '/src/assets/images/logo/easylease_logo_white_a_chi_CN.png'
    }, language, '/src/assets/images/logo/easylease_logo_white_a_eng.png');

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

      <div className="footer-logo-container">
        <Link to="/" className="App-Title-Link">
          <img src={appFooterLogo} alt="App Footer Logo" className="app-footer-logo" />
        </Link>  
      </div>


      <div className="footer-bottom">
        <p>{t(language, 'contactUsFooter')} - <a href="mailto:rentaldiysupport@gmail.com">rentaldiysupport@gmail.com</a></p>
        <p className="copyright">
          &copy; {currentYear} EasyLease {t(language, 'allRightsReserved')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
