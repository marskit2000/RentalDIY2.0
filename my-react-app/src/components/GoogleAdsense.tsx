import React, { useEffect } from 'react';
import AdSense from 'react-adsense';

interface GoogleAdsenseProps {
  client: string;
  slot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const GoogleAdsense: React.FC<GoogleAdsenseProps> = ({
  client,
  slot,
  format = 'auto',
  responsive = true,
  style = {},
  className = '',
}) => {
  useEffect(() => {
    // Load AdSense script if it hasn't been loaded yet
    const hasAdScript = document.querySelector('script[src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
    
    if (!hasAdScript) {
      const adScript = document.createElement('script');
      adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
      adScript.async = true;
      adScript.crossOrigin = 'anonymous';
      document.head.appendChild(adScript);
    }

    // Push ads to be initialized if adsense is loaded
    if ((window as any).adsbygoogle) {
      (window as any).adsbygoogle.push({});
    }
  }, [client]);

  return (
    <div className={`google-adsense ${className}`}>
      <AdSense.Google
        client={client}
        slot={slot}
        style={{ display: 'block', ...style }}
        format={format}
        responsive={responsive}
      />
    </div>
  );
};

export default GoogleAdsense;
