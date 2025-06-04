import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';
import './Disclaimer.css';

const Disclaimer: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="disclaimer-container">
      <h1>{t(language, 'disclaimerPageTitle')}</h1>
      <p><strong>{t(language, 'disclaimerLastUpdated')}:</strong> {new Date().toLocaleDateString()}</p>

      <h2>{t(language, 'generalDisclaimerTitle')}</h2>
      <p>{t(language, 'generalDisclaimerContent')}</p>

      <h2>{t(language, 'notLegalAdviceDisclaimerTitle')}</h2>
      <p>{t(language, 'notLegalAdviceDisclaimerContent')}</p>

      <h2>{t(language, 'hkLegalJurisdictionTitle')}</h2>
      <p>{t(language, 'hkLegalJurisdictionContent')}</p>

      <h2>{t(language, 'userResponsibilityDisclaimerTitle')}</h2>
      <p>{t(language, 'userResponsibilityDisclaimerIntro')}</p>
      <ol>
        <li>{t(language, 'userResponsibilityItem1')}</li>
        <li>{t(language, 'userResponsibilityItem2')}</li>
        <li>{t(language, 'userResponsibilityItem3')}</li>
        <li>{t(language, 'userResponsibilityItem4')}</li>
        <li>{t(language, 'userResponsibilityItem5')}</li>
      </ol>

      <h2>{t(language, 'noWarrantyTitle')}</h2>
      <p>{t(language, 'noWarrantyContent')}</p>

      <h2>{t(language, 'stampDutyTitle')}</h2>
      <p>{t(language, 'stampDutyContent')}</p>

      <h2>{t(language, 'limitationOfLiabilityDisclaimerTitle')}</h2>
      <p>{t(language, 'limitationOfLiabilityDisclaimerContent')}</p>

      <h2>{t(language, 'languageConsiderationsTitle')}</h2>
      <p>{t(language, 'languageConsiderationsContent')}</p>

      <h2>{t(language, 'governingLawDisclaimerTitle')}</h2>
      <p>{t(language, 'governingLawDisclaimerContent')}</p>

      <p>{t(language, 'acknowledgementContent')}</p>
    </div>
  );
};

export default Disclaimer;
