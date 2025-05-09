import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';
import './HowToUse.css';

const HowToUse: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="how-to-use-container">
      <div className="how-to-use-header">
        <h1>{t(language, 'howToUseTitle')}</h1>
        <p className="how-to-use-subtitle">{t(language, 'howToUseSubtitle')}</p>
      </div>

      <section className="how-to-use-section">
        <h2>{t(language, 'gettingStartedTitle')}</h2>
        <div className="how-to-use-card">
          <div className="how-to-use-card-content">
            <h3>{t(language, 'accessingTheToolTitle')}</h3>
            <p>{t(language, 'accessingTheToolDescription')}</p>
            <div className="how-to-use-steps">
              <div className="how-to-use-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <p>{t(language, 'accessStep1')}</p>
                </div>
              </div>
              <div className="how-to-use-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <p>{t(language, 'accessStep2')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="how-to-use-image">
            <div className="placeholder-image">
              <span>🏠</span>
              <p>{t(language, 'homePageImage')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-to-use-section">
        <h2>{t(language, 'fillingTheFormTitle')}</h2>
        <div className="how-to-use-card">
          <div className="how-to-use-image">
            <div className="placeholder-image">
              <span>📝</span>
              <p>{t(language, 'formPageImage')}</p>
            </div>
          </div>
          <div className="how-to-use-card-content">
            <h3>{t(language, 'formSectionsTitle')}</h3>
            <p>{t(language, 'formSectionsDescription')}</p>
            <div className="how-to-use-steps">
              <div className="how-to-use-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <p>{t(language, 'formSection1')}</p>
                </div>
              </div>
              <div className="how-to-use-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <p>{t(language, 'formSection2')}</p>
                </div>
              </div>
              <div className="how-to-use-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <p>{t(language, 'formSection3')}</p>
                </div>
              </div>
              <div className="how-to-use-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <p>{t(language, 'formSection4')}</p>
                </div>
              </div>
              <div className="how-to-use-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <p>{t(language, 'formTip')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-to-use-section">
        <h2>{t(language, 'previewingTitle')}</h2>
        <div className="how-to-use-card">
          <div className="how-to-use-card-content">
            <h3>{t(language, 'previewFeaturesTitle')}</h3>
            <p>{t(language, 'previewFeaturesDescription')}</p>
            <div className="how-to-use-steps">
              <div className="how-to-use-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <p>{t(language, 'previewStep1')}</p>
                </div>
              </div>
              <div className="how-to-use-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <p>{t(language, 'previewStep2')}</p>
                </div>
              </div>
              <div className="how-to-use-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <p>{t(language, 'previewStep3')}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="how-to-use-image">
            <div className="placeholder-image">
              <span>👁️</span>
              <p>{t(language, 'previewImage')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-to-use-section">
        <h2>{t(language, 'generatingPdfTitle')}</h2>
        <div className="how-to-use-card">
          <div className="how-to-use-image">
            <div className="placeholder-image">
              <span>📄</span>
              <p>{t(language, 'pdfGenerationImage')}</p>
            </div>
          </div>
          <div className="how-to-use-card-content">
            <h3>{t(language, 'pdfGenerationProcessTitle')}</h3>
            <p>{t(language, 'pdfGenerationProcessDescription')}</p>
            <div className="how-to-use-steps">
              <div className="how-to-use-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <p>{t(language, 'pdfGenStep1')}</p>
                </div>
              </div>
              <div className="how-to-use-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <p>{t(language, 'pdfGenStep2')}</p>
                </div>
              </div>
              <div className="how-to-use-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <p>{t(language, 'pdfGenStep3')}</p>
                </div>
              </div>
              <div className="how-to-use-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <p>{t(language, 'pdfGenStep4')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-to-use-section">
        <h2>{t(language, 'tipsAndTricksTitle')}</h2>
        <div className="tips-container">
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <h3>{t(language, 'tip1Title')}</h3>
            <p>{t(language, 'tip1Description')}</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <h3>{t(language, 'tip2Title')}</h3>
            <p>{t(language, 'tip2Description')}</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <h3>{t(language, 'tip3Title')}</h3>
            <p>{t(language, 'tip3Description')}</p>
          </div>
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <h3>{t(language, 'tip4Title')}</h3>
            <p>{t(language, 'tip4Description')}</p>
          </div>
        </div>
      </section>

      <section className="how-to-use-section faq-section">
        <h2>{t(language, 'faqTitle')}</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>{t(language, 'faq1Question')}</h3>
            <p>{t(language, 'faq1Answer')}</p>
          </div>
          <div className="faq-item">
            <h3>{t(language, 'faq2Question')}</h3>
            <p>{t(language, 'faq2Answer')}</p>
          </div>
          <div className="faq-item">
            <h3>{t(language, 'faq3Question')}</h3>
            <p>{t(language, 'faq3Answer')}</p>
          </div>
          <div className="faq-item">
            <h3>{t(language, 'faq4Question')}</h3>
            <p>{t(language, 'faq4Answer')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToUse;
