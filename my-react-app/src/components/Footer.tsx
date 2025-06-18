import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalizedImage, t } from '../translations';
import './Footer.css';

const Footer: React.FC = () => {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const appFooterLogo = getLocalizedImage({
      'en': '/logo/easylease_logo_white_a_eng.png',
      'zh-TW': '/logo/easylease_logo_white_a_chi_HK.png',
      'zh-CN': '/logo/easylease_logo_white_a_chi_CN.png'
    }, language, '/logo/easylease_logo_white_a_eng.png');

  return (
    <footer className="footer">
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
