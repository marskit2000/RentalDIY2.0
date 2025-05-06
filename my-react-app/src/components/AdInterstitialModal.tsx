import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';
import GoogleAdsense from './GoogleAdsense';
import './AdInterstitialModal.css';

interface AdInterstitialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  client?: string;
  slot?: string;
}

const AdInterstitialModal: React.FC<AdInterstitialModalProps> = ({
  isOpen,
  onClose,
  onContinue,
  client = 'ca-pub-3940256099942544', // Default test client
  slot = '3535157352' // Default test slot
}) => {
  const { language } = useLanguage();
  const [countdown, setCountdown] = useState<number>(10);
  const [adInteracted, setAdInteracted] = useState<boolean>(false);
  
  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCountdown(10);
      setAdInteracted(false);
    }
  }, [isOpen]);

  // Handle countdown timer
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  // We're using a manual approach with a button instead of automatic tracking
  // This is more reliable and gives the user more control

  if (!isOpen) return null;

  const handleContinue = () => {
    onContinue();
    onClose();
  };

  return (
    <div className="ad-interstitial-modal-overlay">
      <div className="ad-interstitial-modal-container">
        <button 
          className="ad-interstitial-modal-close-btn" 
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="ad-interstitial-modal-header">
          <h2>{t(language, 'adModalTitle')}</h2>
          <p>{t(language, 'adModalDescription')}</p>
        </div>
        
        <div className="ad-interstitial-modal-content">
          <GoogleAdsense 
            client={client}
            slot={slot}
            format="auto"
            responsive={true}
            style={{ display: 'block', width: '100%' }}
            className="ad-interstitial-adsense"
          />
        </div>
        
        <div className="ad-interstitial-modal-footer">
          {countdown > 0 && !adInteracted ? (
            <div className="ad-interstitial-countdown">
              <p>{t(language, 'adModalCountdown')} {countdown} {countdown === 1 ? t(language, 'second') : t(language, 'seconds')}</p>
              <button 
                className="ad-interstitial-skip-button" 
                onClick={() => setAdInteracted(true)}
              >
                {t(language, 'adModalSkip') || 'I\'ve seen the ad'}
              </button>
            </div>
          ) : (
            <button 
              className="ad-interstitial-continue-button" 
              onClick={handleContinue}
            >
              {t(language, 'adModalContinue')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdInterstitialModal;
