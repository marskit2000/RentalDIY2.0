import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';
import './TermsAndConditions.css';

const TermsAndConditions: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="terms-container">
      <h1>{t(language, 'termsAndConditionsTitle')}</h1>
      <p><strong>{t(language, 'lastUpdated')}:</strong> {new Date().toLocaleDateString()}</p>

      <h2>{t(language, 'introductionTitle')}</h2>
      <p>{t(language, 'introductionContent')}</p>

      <h2>{t(language, 'serviceDescriptionTitle')}</h2>
      <p>{t(language, 'serviceDescriptionContent')}<br />
      <strong>{t(language, 'notLegalFirm')}</strong> {t(language, 'templatesBasedOnUserData')}</p>

      <h2>{t(language, 'userResponsibilitiesTitle')}</h2>
      <p>{t(language, 'accurateInfoTitle')} {t(language, 'accurateInfoContent')}</p>
      <p>{t(language, 'lawfulUseTitle')} {t(language, 'lawfulUseContent')}</p>
      <p>{t(language, 'reviewDocsTitle')} {t(language, 'reviewDocsContent')}</p>
      <p>{t(language, 'legalAdviceTitle')} {t(language, 'legalAdviceContent')}</p>
      <p>{t(language, 'accountSecurityTitle')} {t(language, 'accountSecurityContent')}</p>

      <h2>{t(language, 'noLegalAdviceTitle')}</h2>
      <p>{t(language, 'noLegalAdviceA')}</p>
      <p>{t(language, 'noLegalAdviceB')}</p>

      <h2>{t(language, 'intellectualPropertyTitle')}</h2>
      <p>{t(language, 'ourContentTitle')} {t(language, 'ourContentContent')}</p>
      <p>{t(language, 'userGeneratedTitle')} {t(language, 'userGeneratedContent')}</p>

      <h2>{t(language, 'feesAndPaymentTitle')}</h2>
      <p>{t(language, 'feesAndPaymentContent')}</p>

      <h2>{t(language, 'disclaimerTitle')}</h2>
      <p>{t(language, 'disclaimerA')}</p>
      <p>{t(language, 'disclaimerB')}</p>

      <h2>{t(language, 'limitationOfLiabilityTitle')}</h2>
      <p>{t(language, 'limitationOfLiabilityA')}</p>
      <ul style={{ listStyleType: 'none', paddingLeft: '20px' }}>
        <li>{t(language, 'liabilityItem1')}</li>
        <li>{t(language, 'liabilityItem2')}</li>
        <li>{t(language, 'liabilityItem3')}</li>
        <li>{t(language, 'liabilityItem4')}</li>
        <li>{t(language, 'liabilityItem5')}</li>
        <li>{t(language, 'liabilityItem6')}</li>
      </ul>
      <p>{t(language, 'limitationOfLiabilityB')}</p>

      <h2>{t(language, 'indemnificationTitle')}</h2>
      <p>{t(language, 'indemnificationContent')}</p>

      <h2>{t(language, 'privacyPolicyTitle')}</h2>
      <p>{t(language, 'privacyPolicyContent')}</p>

      <h2>{t(language, 'modificationOfTermsTitle')}</h2>
      <p>{t(language, 'modificationOfTermsContent')}</p>

      <h2>{t(language, 'terminationTitle')}</h2>
      <p>{t(language, 'terminationA')}</p>
      <p>{t(language, 'terminationB')}</p>
      <p>{t(language, 'terminationC')}</p>

      <h2>{t(language, 'governingLawTitle')}</h2>
      <p>{t(language, 'governingLawContent')}</p>

      <h2>{t(language, 'severabilityTitle')}</h2>
      <p>{t(language, 'severabilityContent')}</p>

      <h2>{t(language, 'entireAgreementTitle')}</h2>
      <p>{t(language, 'entireAgreementContent')}</p>

      <h2>{t(language, 'contactInfoTitle')}</h2>
      <p>{t(language, 'contactInfoContent')} {t(language, 'contactEmail')}</p>
    </div>
  );
};

export default TermsAndConditions;
