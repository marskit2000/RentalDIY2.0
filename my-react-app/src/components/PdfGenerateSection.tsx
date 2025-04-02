import React, { useState, useEffect } from 'react';
import './PdfGenerateSection.css';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';
import { generatePDF, PdfGenerationParams } from '../utils/pdfGenerator';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PdfGenerateSectionProps {
  // Add props here as needed
}

const PdfGenerateSection: React.FC<PdfGenerateSectionProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [inputText1, setInputText1] = useState('');
  const [inputText2, setInputText2] = useState('');
  const [inputText3, setInputText3] = useState('');
  const [inputText4, setInputText4] = useState('');
  const [inputText5, setInputText5] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  const [propertyUse, setPropertyUse] = useState('residential');
  const [managementFee, setManagementFee] = useState('landlord');
  const [governmentRates, setGovernmentRates] = useState('landlord');
  const [governmentRent, setGovernmentRent] = useState('landlord');
  const [rentFreeFrom, setRentFreeFrom] = useState('');
  const [rentFreeTo, setRentFreeTo] = useState('');
  const [breakClause1, setBreakClause1] = useState('landlord');
  const [breakClause2, setBreakClause2] = useState('');
  const [breakClause3, setBreakClause3] = useState('12');
  const [breakClause3Other, setBreakClause3Other] = useState('');
  const [airConditioner, setAirConditioner] = useState('');
  const [ventilator, setVentilator] = useState('');
  const [oilVentilator, setOilVentilator] = useState('');
  const [waterHeater, setWaterHeater] = useState('');
  const [gasStove, setGasStove] = useState('');
  const [lightings, setLightings] = useState('');
  const [refrigerator, setRefrigerator] = useState('');
  const [washingMachine, setWashingMachine] = useState('');
  const [bed, setBed] = useState('');
  const [wardrobe, setWardrobe] = useState('');
  const [settee, setSettee] = useState('');
  const [otherFurniture, setOtherFurniture] = useState('');
  const [landLordId, setLandLordId] = useState('');
  const [landlordTel, setLandlordTel] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [tenantTel, setTenantTel] = useState('');
  const [landlordBankAccount, setLandlordBankAccount] = useState('');
  const [bank, setBank] = useState('');
  const [inputDate2, setInputDate2] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [remarksFields, setRemarksFields] = useState<string[]>(['']);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { language } = useLanguage();

  //ConvertToImage State
  const [images, setImages] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageError, setImageError] = useState<string | null>(null);

  // Debug language changes
  useEffect(() => {
    console.log('Language changed to:', language);
    console.log('Translation for "landlord":', t(language, 'landlord'));
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleGeneratePDF = async () => {
    try {
      setIsLoading(true);
      
      const params: PdfGenerationParams = {
        inputDate2,
        inputText1,
        inputText2,
        inputText3,
        inputText4,
        inputText5,
        rentAmount,
        securityDeposit,
        propertyUse,
        managementFee,
        governmentRates,
        governmentRent,
        rentFreeFrom,
        rentFreeTo,
        breakClause1,
        breakClause2,
        breakClause3,
        breakClause3Other,
        airConditioner,
        ventilator,
        oilVentilator,
        waterHeater,
        gasStove,
        lightings,
        refrigerator,
        washingMachine,
        bed,
        wardrobe,
        settee,
        otherFurniture,
        landLordId,
        landlordTel,
        tenantId,
        tenantTel,
        landlordBankAccount,
        bank,
        dateFrom,
        dateTo,
        remarksFields,
        language,
        t
      };
      
      const url = await generatePDF(params);
      
      if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = "filled_tenancy_agreement.pdf";
        link.click();
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async () => {
    try {
      setIsLoading(true);
      
      const params: PdfGenerationParams = {
        isPreview: true,
        inputDate2,
        inputText1,
        inputText2,
        inputText3,
        inputText4,
        inputText5,
        rentAmount,
        securityDeposit,
        propertyUse,
        managementFee,
        governmentRates,
        governmentRent,
        rentFreeFrom,
        rentFreeTo,
        breakClause1,
        breakClause2,
        breakClause3,
        breakClause3Other,
        airConditioner,
        ventilator,
        oilVentilator,
        waterHeater,
        gasStove,
        lightings,
        refrigerator,
        washingMachine,
        bed,
        wardrobe,
        settee,
        otherFurniture,
        landLordId,
        landlordTel,
        tenantId,
        tenantTel,
        landlordBankAccount,
        bank,
        dateFrom,
        dateTo,
        remarksFields,
        language,
        t,
        setImageLoading,
        setImageError,
        setImages
      };
      
      const url = await generatePDF(params);
      
      if (url) {
        setShowPreview(true);
      }
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      alert('Error generating PDF preview. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRemark = () => {
    setRemarksFields([...remarksFields, '']);
  };

  const handleRemoveRemark = (index: number) => {
    const newRemarksFields = [...remarksFields];
    newRemarksFields.splice(index, 1);
    setRemarksFields(newRemarksFields);
  };

  const handleRemarkChange = (index: number, value: string) => {
    const newRemarksFields = [...remarksFields];
    newRemarksFields[index] = value;
    setRemarksFields(newRemarksFields);
  };

  return (
    <div className="pdf-generate-section">
      <div className="left-section">  
        <p className="input-group-heading">{t(language, 'Please fill in the following information:')}</p>
        <div className="input-group">
          <label htmlFor="pdf-date-2">{t(language, 'agreementDate')}</label>
          <input
            type="date"
            id="pdf-date-2"
            value={inputDate2}
            onChange={(e) => setInputDate2(e.target.value)}
            placeholder={t(language, 'enterDate')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="pdf-text-1">{t(language, 'propertyAddress')}</label>
          <input
            type="text"
            id="pdf-text-1"
            value={inputText1}
            onChange={(e) => setInputText1(e.target.value)}
            placeholder={t(language, 'enterPropertyAddress')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="pdf-text-2">{t(language, 'landlord')}</label>
          <input
            type="text"
            id="pdf-text-2"
            value={inputText2}
            onChange={(e) => setInputText2(e.target.value)}
            placeholder={t(language, 'enterLandlordName')}
          />
        </div>
        <div className="input-group-row-container">
          <div className="input-group input-group-50">
            <label htmlFor="landlordTel">{t(language, 'landlordTel')}</label>
            <input
              type="text"
              id="landlordTel"
              value={landlordTel}
              onChange={(e) => setLandlordTel(e.target.value)}
              placeholder={t(language, 'enterTel')}
            />
          </div>
          <div className="input-group input-group-50">
            <label htmlFor="landLordId">{t(language, 'landlordId')}</label>
            <input
              type="text"
              id="landLordId"
              value={landLordId}
              onChange={(e) => setLandLordId(e.target.value)}
              placeholder={t(language, 'enterID')}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="pdf-text-3">{t(language, 'landlordAddress')}</label>
          <input
            type="text"
            id="pdf-text-3"
            value={inputText3}
            onChange={(e) => setInputText3(e.target.value)}
            placeholder={t(language, 'enterAddress')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="pdf-text-4">{t(language, 'tenant')}</label>
          <input
            type="text"
            id="pdf-text-4"
            value={inputText4}
            onChange={(e) => setInputText4(e.target.value)}
            placeholder={t(language, 'enterTenantName')}
          />
        </div>
        <div className="input-group-row-container">
          <div className="input-group input-group-50">
            <label htmlFor="tenantTel">{t(language, 'tenantTel')}</label>
            <input
              type="text"
              id="tenantTel"
              value={tenantTel}
              onChange={(e) => setTenantTel(e.target.value)}
              placeholder={t(language, 'enterTel')}
            />
          </div>
          <div className="input-group input-group-50">
            <label htmlFor="tenantId">{t(language, 'tenantId')}</label>
            <input
              type="text"
              id="tenantId"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
              placeholder={t(language, 'enterID')}
            />
          </div>
        </div>
        
        <div className="input-group">
          <label htmlFor="pdf-text-5">{t(language, 'tenantAddress')}</label>
          <input
            type="text"
            id="pdf-text-5"
            value={inputText5}
            onChange={(e) => setInputText5(e.target.value)}
            placeholder={t(language, 'enterAddress')}
          />
        </div>
        <div className="date-range-group">
          <div className="input-group">
            <label htmlFor="date-from">{t(language, 'from')}</label>
            <input
              type="date"
              id="date-from"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              placeholder={t(language, 'enterDate')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="date-to">{t(language, 'to')}</label>
            <input
              type="date"
              id="date-to"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              placeholder={t(language, 'enterDate')}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="rent-amount">{t(language, 'rentalAmount')}</label>
          <input
            type="number"
            id="rent-amount"
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
            placeholder={t(language, 'enterAmount')}
            min="0"
            step="0.01"
          />
        </div>
        <div className="input-group">
          <label htmlFor="security-deposit">{t(language, 'depositAmount')}</label>
          <input
            type="number"
            id="security-deposit"
            value={securityDeposit}
            onChange={(e) => setSecurityDeposit(e.target.value)}
            placeholder={t(language, 'enterAmount')}
            min="0"
            step="0.01"
          />
        </div>
        <div className="input-group">
          <label htmlFor="property-use">{t(language, 'propertyUse')}</label>
          <select
            id="property-use"
            value={propertyUse}
            onChange={(e) => setPropertyUse(e.target.value)}
          >
            <option value="residential">{t(language, 'residential')}</option>
            <option value="commercial">{t(language, 'commercial')}</option>
            <option value="office">{t(language, 'office')}</option>
            <option value="shop">{t(language, 'shop')}</option>
            <option value="industrial">{t(language, 'industrial')}</option>
          </select>
        </div>
        <div className="fee-row">
          <div className="input-group">
            <label htmlFor="management-fee">{t(language, 'managementFee')}</label>
            <select
              id="management-fee"
              value={managementFee}
              onChange={(e) => setManagementFee(e.target.value)}
            >
              <option value="landlord">{t(language, 'landlord')}</option>
              <option value="tenant">{t(language, 'tenant')}</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="government-rates">{t(language, 'governmentRates')}</label>
            <select
              id="government-rates"
              value={governmentRates}
              onChange={(e) => setGovernmentRates(e.target.value)}
            >
              <option value="landlord">{t(language, 'landlord')}</option>
              <option value="tenant">{t(language, 'tenant')}</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="government-rent">{t(language, 'governmentRent')}</label>
            <select
              id="government-rent"
              value={governmentRent}
              onChange={(e) => setGovernmentRent(e.target.value)}
            >
              <option value="landlord">{t(language, 'landlord')}</option>
              <option value="tenant">{t(language, 'tenant')}</option>
            </select>
          </div>
        </div>
        <div className="date-range-group">
          <div className="input-group">
            <label htmlFor="rent-free-from">{t(language, 'rentFreeFrom')}</label>
            <input
              type="date"
              id="rent-free-from"
              value={rentFreeFrom}
              onChange={(e) => setRentFreeFrom(e.target.value)}
              placeholder={t(language, 'enterDate')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="rent-free-to">{t(language, 'rentFreeTo')}</label>
            <input
              type="date"
              id="rent-free-to"
              value={rentFreeTo}
              onChange={(e) => setRentFreeTo(e.target.value)}
              placeholder={t(language, 'enterDate')}
            />
          </div>
        </div>
        <div className="break-clause-row">
          <div className="input-group">
            <label htmlFor="break-clause-1">{t(language, 'breakClause1')}</label>
            <select
              id="break-clause-1"
              value={breakClause1}
              onChange={(e) => setBreakClause1(e.target.value)}
            >
              <option value="landlord">{t(language, 'landlord')}</option>
              <option value="tenant">{t(language, 'tenant')}</option>
              <option value="either">{t(language, 'either')}</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="break-clause-2">{t(language, 'breakClause2')}</label>
            <input
              type="number"
              id="break-clause-2"
              value={breakClause2}
              onChange={(e) => setBreakClause2(e.target.value)}
              placeholder={t(language, 'enterNumber')}
              min="0"
              step="1"
            />
          </div>
          <div className="input-group break-clause-3-group">
            <label htmlFor="break-clause-3">{t(language, 'breakClause3')}</label>
            <div className="break-clause-3-inputs">
              <select
                id="break-clause-3"
                value={breakClause3}
                onChange={(e) => setBreakClause3(e.target.value)}
              >
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="other">{t(language, 'other')}</option>
              </select>
              {breakClause3 === 'other' && (
                <input
                  type="number"
                  id="break-clause-3-other"
                  value={breakClause3Other}
                  onChange={(e) => setBreakClause3Other(e.target.value)}
                  placeholder={t(language, 'enterNumber')}
                  min="0"
                  step="1"
                />
              )}
            </div>
          </div>
        </div>
        <div className="furniture-row">
          <div className="input-group">
            <label htmlFor="air-conditioner">{t(language, 'airConditioner')}</label>
            <input
              type="text"
              id="air-conditioner"
              value={airConditioner}
              onChange={(e) => setAirConditioner(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="ventilator">{t(language, 'ventilator')}</label>
            <input
              type="text"
              id="ventilator"
              value={ventilator}
              onChange={(e) => setVentilator(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="oil-ventilator">{t(language, 'oilVentilator')}</label>
            <input
              type="text"
              id="oil-ventilator"
              value={oilVentilator}
              onChange={(e) => setOilVentilator(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="water-heater">{t(language, 'waterHeater')}</label>
            <input
              type="text"
              id="water-heater"
              value={waterHeater}
              onChange={(e) => setWaterHeater(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
        </div>
        <div className="furniture-row">
          <div className="input-group">
            <label htmlFor="gas-stove">{t(language, 'gasStove')}</label>
            <input
              type="text"
              id="gas-stove"
              value={gasStove}
              onChange={(e) => setGasStove(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="lightings">{t(language, 'lightings')}</label>
            <input
              type="text"
              id="lightings"
              value={lightings}
              onChange={(e) => setLightings(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="refrigerator">{t(language, 'refrigerator')}</label>
            <input
              type="text"
              id="refrigerator"
              value={refrigerator}
              onChange={(e) => setRefrigerator(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="washing-machine">{t(language, 'washingMachine')}</label>
            <input
              type="text"
              id="washing-machine"
              value={washingMachine}
              onChange={(e) => setWashingMachine(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
        </div>
        <div className="furniture-row">
          <div className="input-group">
            <label htmlFor="bed">{t(language, 'bed')}</label>
            <input
              type="text"
              id="bed"
              value={bed}
              onChange={(e) => setBed(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="wardrobe">{t(language, 'wardrobe')}</label>
            <input
              type="text"
              id="wardrobe"
              value={wardrobe}
              onChange={(e) => setWardrobe(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="settee">{t(language, 'settee')}</label>
            <input
              type="text"
              id="settee"
              value={settee}
              onChange={(e) => setSettee(e.target.value)}
              placeholder={t(language, 'enterQuantity')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="other-furniture">{t(language, 'otherFurniture')}</label>
            <input
              type="text"
              id="other-furniture"
              value={otherFurniture}
              onChange={(e) => setOtherFurniture(e.target.value)}
              placeholder={t(language, 'enterOtherFixtures')}
            />
          </div>
        </div>
        <div className="bank-row">
          <div className="input-group">
            <label htmlFor="landlord-bank-account">{t(language, 'landlordBankAccount')}</label>
            <input
              type="text"
              id="landlord-bank-account"
              value={landlordBankAccount}
              onChange={(e) => setLandlordBankAccount(e.target.value)}
              placeholder={t(language, 'enterAccountNumber')}
            />
          </div>
          <div className="input-group">
            <label htmlFor="bank">{t(language, 'bank')}</label>
            <input
              type="text"
              id="bank"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              placeholder={t(language, 'enterBank')}
            />
          </div>
        </div>
        <div className="remarks-group">
          <label>{t(language, 'remarks')}</label>
          {remarksFields.map((remark, index) => (
            <div key={index} className="remark-input-group">
              <textarea
                value={remark}
                onChange={(e) => handleRemarkChange(index, e.target.value)}
                placeholder={t(language, 'enterRemarks')}
                rows={3}
              />
              {index > 0 && (
                <button
                  className="remove-remark-btn"
                  onClick={() => handleRemoveRemark(index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            className="add-remark-btn"
            onClick={handleAddRemark}
          >
            +
          </button>
        </div>
        <div className="controls">
          <button 
            className="generate-btn" 
            onClick={handleGeneratePDF}
            disabled={isLoading}
          >
            {isLoading ? t(language, 'generating') : t(language, 'generate')}
          </button>
          <button 
            className="preview-btn" 
            onClick={handlePreview}
            disabled={isLoading}
          >
            {t(language, 'preview')}
          </button>
        </div>
      </div>
      <div className="right-section">
        {showPreview ? (
          <div className="pdf-preview">
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <h3>Page {index + 1}</h3>
                <img src={image} alt={`Page ${index + 1}`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="preview-placeholder">
            <div className="placeholder-content">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
              <p>{t(language, 'previewPlaceholder')}</p>
            </div>
          </div>
        )}
      </div>
      {showScrollTop && (
        <button 
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          aria-label={t(language, 'Scroll to top')}
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default PdfGenerateSection;
