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
  const [smoothProgress, setSmoothProgress] = useState<number>(0);
  
  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCountdown(10);
      setSmoothProgress(0);
    }
  }, [isOpen]);

  // Handle countdown timer with smooth progress
  useEffect(() => {
    if (!isOpen) return;
    
    // Update 10 times per second for smooth animation
    const updateInterval = 100; // milliseconds
    const decrementPerInterval = 0.1; // 0.1 second per update
    
    const timer = setInterval(() => {
      setSmoothProgress(prev => {
        const newProgress = prev + decrementPerInterval;
        if (newProgress >= 10) {
          clearInterval(timer);
          return 10;
        }
        return newProgress;
      });
      
      // Update the countdown display (integer part) every second
      if (Math.floor(smoothProgress) !== Math.floor(smoothProgress + decrementPerInterval)) {
        setCountdown(10 - Math.floor(smoothProgress + decrementPerInterval));
      }
    }, updateInterval);

    return () => clearInterval(timer);
  }, [isOpen, smoothProgress]);

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
          <div className="ad-interstitial-modal-header-title">
            <img src="/favicon_green_32x32.png" alt="logo"/>
            <h2>{countdown > 0 ? t(language, 'adModalTitle') :   t(language, 'adModalTitleFinish')}</h2>
          </div>
          <p>{countdown > 0 ? t(language, 'adModalDescription') : t(language, 'adModalDescriptionFinish')}</p>
          {countdown > 0 && (
            <div className="ad-interstitial-progress-wrapper">
              {/* Original linear progress bar - commented out for later use
              <div className="ad-interstitial-progress-container">
                <div 
                  className="ad-interstitial-progress-bar" 
                  style={{ width: `${(smoothProgress / 10) * 100}%` }}
                ></div>
                <span className="ad-interstitial-progress-label">
                  {countdown} {countdown === 1 ? t(language, 'second') : t(language, 'seconds')}
                </span>
              </div>
              */}
              
              {/* New circular progress bar */}
              <div className="ad-interstitial-circular-progress-container">
                <div className="ad-interstitial-circular-progress">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle
                      className="ad-interstitial-circular-progress-bg"
                      cx="40"
                      cy="40"
                      r="35"
                      strokeWidth="5"
                      fill="none"
                    />
                    <circle
                      className="ad-interstitial-circular-progress-bar"
                      cx="40"
                      cy="40"
                      r="35"
                      strokeWidth="5"
                      fill="none"
                      strokeDasharray="219.9"
                      strokeDashoffset={219.9 - (smoothProgress / 10) * 219.9}
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <div className="ad-interstitial-circular-progress-text">
                    {countdown}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* <div className="ad-interstitial-modal-content">
          <GoogleAdsense 
            client={client}
            slot={slot}
            format="auto"
            responsive={true}
            style={{ display: 'block', width: '100%' }}
            className="ad-interstitial-adsense"
          />
        </div> */}
        
        <div className="ad-interstitial-modal-footer">
          {countdown > 0 ? (
            <div className="ad-interstitial-countdown">
              <p>{t(language, 'adModalCountdown')} {countdown} {countdown === 1 ? t(language, 'second') : t(language, 'seconds')}</p>
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
