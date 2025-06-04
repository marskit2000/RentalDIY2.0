import React, { useState, useEffect, useRef } from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { t } from '../translations';
import './LanguageSelector.css';

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Desktop view with select dropdown
  if (!isMobile) {
    return (
      <div className="language-selector">
        <select value={language} onChange={handleLanguageChange}>
          <option value="en">{t(language, 'english')}</option>
          <option value="zh-TW">{t(language, 'traditionalChinese')}</option>
          <option value="zh-CN">{t(language, 'simplifiedChinese')}</option>
        </select>
      </div>
    );
  }

  // Mobile view with globe icon and custom dropdown
  return (
    <div className="language-selector mobile" ref={dropdownRef}>
      <button className="globe-icon" onClick={toggleDropdown} aria-label="Select language">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </button>
      <div className={`language-dropdown ${isDropdownOpen ? 'active' : ''}`}>
        <button 
          className={`language-option ${language === 'en' ? 'active' : ''}`} 
          onClick={() => handleLanguageSelect('en')}
        >
          {t(language, 'english')}
        </button>
        <button 
          className={`language-option ${language === 'zh-TW' ? 'active' : ''}`} 
          onClick={() => handleLanguageSelect('zh-TW')}
        >
          {t(language, 'traditionalChinese')}
        </button>
        <button 
          className={`language-option ${language === 'zh-CN' ? 'active' : ''}`} 
          onClick={() => handleLanguageSelect('zh-CN')}
        >
          {t(language, 'simplifiedChinese')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
