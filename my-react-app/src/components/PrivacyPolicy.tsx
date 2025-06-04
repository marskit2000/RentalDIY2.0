import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="privacy-container">
      <h1 className='main-title'>{t(language, 'privacyPolicyPageTitle')}</h1>
      <p><strong>{t(language, 'privacyLastUpdated')}</strong></p>

      <h2>{t(language, 'privacyIntroTitle')}</h2>
      <p>{t(language, 'privacyIntroContent')}</p>
      <p>{t(language, 'privacyIntroConsent')}</p>

      <h2>{t(language, 'privacyInfoCollectTitle')}</h2>
      <h3>{t(language, 'privacyPersonalInfoTitle')}</h3>
      <p>{t(language, 'privacyPersonalInfoContent')}</p>
      <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
        <li>{t(language, 'privacyPersonalInfoItem1')}</li>
        <li>{t(language, 'privacyPersonalInfoItem2')}</li>
        <li>{t(language, 'privacyPersonalInfoItem3')}</li>
        <li>{t(language, 'privacyPersonalInfoItem4')}</li>
        <li>{t(language, 'privacyPersonalInfoItem5')}</li>
      </ul>

      <h3>{t(language, 'privacyUsageDataTitle')}</h3>
      <p>{t(language, 'privacyUsageDataContent')}</p>
      <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
        <li>{t(language, 'privacyUsageDataItem1')}</li>
        <li>{t(language, 'privacyUsageDataItem2')}</li>
        <li>{t(language, 'privacyUsageDataItem3')}</li>
      </ul>

      <h2>{t(language, 'privacyUseInfoTitle')}</h2>
      <p>{t(language, 'privacyUseInfoContent')}</p>
      <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
        <li>{t(language, 'privacyUseInfoItem1')}</li>
        <li>{t(language, 'privacyUseInfoItem2')}</li>
        <li>{t(language, 'privacyUseInfoItem3')}</li>
        <li>{t(language, 'privacyUseInfoItem4')}</li>
        <li>{t(language, 'privacyUseInfoItem5')}</li>
        <li>{t(language, 'privacyUseInfoItem6')}</li>
      </ul>

      <h2>{t(language, 'privacyDataStorageTitle')}</h2>
      <p>{t(language, 'privacyDataStorageContent')}</p>
      <p>{t(language, 'privacyDataRetentionContent')}</p>

      <h2>{t(language, 'privacySharingInfoTitle')}</h2>
      <p>{t(language, 'privacySharingInfoContent')}</p>
      <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
        <li>{t(language, 'privacySharingInfoItem1')}</li>
        <li>{t(language, 'privacySharingInfoItem2')}</li>
        <li>{t(language, 'privacySharingInfoItem3')}</li>
        <li>{t(language, 'privacySharingInfoItem4')}</li>
      </ul>
      <p>{t(language, 'privacyNoSellContent')}</p>

      <h2>{t(language, 'privacyRightsTitle')}</h2>
      <p>{t(language, 'privacyRightsContent')}</p>
      <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
        <li>{t(language, 'privacyRightsItem1')}</li>
        <li>{t(language, 'privacyRightsItem2')}</li>
        <li>{t(language, 'privacyRightsItem3')}</li>
        <li>{t(language, 'privacyRightsItem4')}</li>
        <li>{t(language, 'privacyRightsItem5')}</li>
      </ul>
      <p>{t(language, 'privacyRightsContact')}</p>

      <h2>{t(language, 'privacyChildrenTitle')}</h2>
      <p>{t(language, 'privacyChildrenContent')}</p>

      <h2>{t(language, 'privacyChangesTitle')}</h2>
      <p>{t(language, 'privacyChangesContent')}</p>

      <h2>{t(language, 'privacyInternationalTitle')}</h2>
      <p>{t(language, 'privacyInternationalContent')}</p>

      <h2>{t(language, 'privacyContactTitle')}</h2>
      <p>{t(language, 'privacyContactContent')}</p>
      <p>{t(language, 'privacyContactEmail')}</p>
      <p>{t(language, 'privacyContactAddress')}</p>
      <p>{t(language, 'privacyContactPhone')}</p>

      <hr />
      <p>{t(language, 'privacyComplianceNote')}</p>
    </div>
  );
};

export default PrivacyPolicy;
