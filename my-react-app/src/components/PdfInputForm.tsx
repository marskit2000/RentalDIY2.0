import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';
import { PdfInputValues } from '../utils/pdfGenerator';

interface PdfInputFormProps {
  formValues: PdfInputValues;
  handleInputChange: <T extends string | number | boolean | string[]>(
    fieldName: keyof PdfInputValues, 
    value: T, 
    setter: React.Dispatch<React.SetStateAction<T>>
  ) => void;
  handleRemarkChange: (index: number, value: string) => void;
  handleAddRemark: () => void;
  handleRemoveRemark: (index: number) => void;
  handleReset: () => void;
  handlePreview: () => void;
  handleRedirectToCheckout: () => void;
  handleRedirectToReturn: () => void;
  isLoading: boolean;
  isFreeMode: boolean;
  setters: {
    setInputText1: React.Dispatch<React.SetStateAction<string>>;
    setInputText2: React.Dispatch<React.SetStateAction<string>>;
    setInputText3: React.Dispatch<React.SetStateAction<string>>;
    setInputText4: React.Dispatch<React.SetStateAction<string>>;
    setInputText5: React.Dispatch<React.SetStateAction<string>>;
    setRentAmount: React.Dispatch<React.SetStateAction<string>>;
    setSecurityDeposit: React.Dispatch<React.SetStateAction<string>>;
    setPropertyUse: React.Dispatch<React.SetStateAction<string>>;
    setManagementFee: React.Dispatch<React.SetStateAction<string>>;
    setGovernmentRates: React.Dispatch<React.SetStateAction<string>>;
    setGovernmentRent: React.Dispatch<React.SetStateAction<string>>;
    setRentFreeFrom: React.Dispatch<React.SetStateAction<string>>;
    setRentFreeTo: React.Dispatch<React.SetStateAction<string>>;
    setBreakClause1: React.Dispatch<React.SetStateAction<string>>;
    setBreakClause2: React.Dispatch<React.SetStateAction<string>>;
    setBreakClause3: React.Dispatch<React.SetStateAction<string>>;
    setBreakClause3Other: React.Dispatch<React.SetStateAction<string>>;
    setAirConditioner: React.Dispatch<React.SetStateAction<string>>;
    setVentilator: React.Dispatch<React.SetStateAction<string>>;
    setOilVentilator: React.Dispatch<React.SetStateAction<string>>;
    setWaterHeater: React.Dispatch<React.SetStateAction<string>>;
    setGasStove: React.Dispatch<React.SetStateAction<string>>;
    setLightings: React.Dispatch<React.SetStateAction<string>>;
    setRefrigerator: React.Dispatch<React.SetStateAction<string>>;
    setWashingMachine: React.Dispatch<React.SetStateAction<string>>;
    setBed: React.Dispatch<React.SetStateAction<string>>;
    setWardrobe: React.Dispatch<React.SetStateAction<string>>;
    setSettee: React.Dispatch<React.SetStateAction<string>>;
    setOtherFurniture: React.Dispatch<React.SetStateAction<string>>;
    setLandLordId: React.Dispatch<React.SetStateAction<string>>;
    setLandlordTel: React.Dispatch<React.SetStateAction<string>>;
    setTenantId: React.Dispatch<React.SetStateAction<string>>;
    setTenantTel: React.Dispatch<React.SetStateAction<string>>;
    setLandlordBankAccount: React.Dispatch<React.SetStateAction<string>>;
    setBank: React.Dispatch<React.SetStateAction<string>>;
    setInputDate2: React.Dispatch<React.SetStateAction<string>>;
    setDateFrom: React.Dispatch<React.SetStateAction<string>>;
    setDateTo: React.Dispatch<React.SetStateAction<string>>;
    setTenantIDorBR: React.Dispatch<React.SetStateAction<string>>;
    setLandlordIDorBR: React.Dispatch<React.SetStateAction<string>>;
    setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  }
}

const PdfInputForm: React.FC<PdfInputFormProps> = ({
  formValues,
  handleInputChange,
  handleRemarkChange,
  handleAddRemark,
  handleRemoveRemark,
  handleReset,
  handlePreview,
  handleRedirectToCheckout,
  handleRedirectToReturn,
  isLoading,
  isFreeMode,
  setters
}) => {
  const { language } = useLanguage();
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [showTermsWarning, setShowTermsWarning] = useState<boolean>(false);
  
  // State to track which sections are expanded/collapsed
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    section1: true,
    section2: true,
    section3: true,
    section4: true,
    section5: true,
    section6: true,
    section7: true,
    section8: true,
    section9: true,
    section10: true
  });

  // Function to toggle section visibility
  const toggleSection = (sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };
  
  const {
    inputText1, inputText2, inputText3, inputText4, inputText5,
    rentAmount, securityDeposit, propertyUse, managementFee,
    governmentRates, governmentRent, rentFreeFrom, rentFreeTo,
    breakClause1, breakClause2, breakClause3, breakClause3Other,
    airConditioner, ventilator, oilVentilator, waterHeater,
    gasStove, lightings, refrigerator, washingMachine,
    bed, wardrobe, settee, otherFurniture,
    landLordId, landlordTel, tenantId, tenantTel,
    landlordBankAccount, bank, inputDate2, dateFrom, dateTo,
    remarksFields,
    tenantIDorBR,
    landlordIDorBR,
    backgroundColor
  } = formValues;

  const {
    setInputText1, setInputText2, setInputText3, setInputText4, setInputText5,
    setRentAmount, setSecurityDeposit, setPropertyUse, setManagementFee,
    setGovernmentRates, setGovernmentRent, setRentFreeFrom, setRentFreeTo,
    setBreakClause1, setBreakClause2, setBreakClause3, setBreakClause3Other,
    setAirConditioner, setVentilator, setOilVentilator, setWaterHeater,
    setGasStove, setLightings, setRefrigerator, setWashingMachine,
    setBed, setWardrobe, setSettee, setOtherFurniture,
    setLandLordId, setLandlordTel, setTenantId, setTenantTel,
    setLandlordBankAccount, setBank, setInputDate2, setDateFrom, setDateTo,
    setTenantIDorBR,
    setLandlordIDorBR,
    setBackgroundColor
  } = setters;

  return (
    <>
      <p className="input-group-heading">{t(language, 'Please fill in the following information:')}</p>
      <div className="section-header">
        <div className="section-subheader">
          <h2 className='form-sub-heading'>{t(language, 'section1')}&nbsp;</h2>
          <h2 className='form-sub-heading'>{t(language, 'section1Topic')}</h2>
        </div>
        <button 
          className={`toggle-section-btn ${expandedSections.section1 ? 'expanded' : 'collapsed'}`}
          onClick={() => toggleSection('section1')}
          aria-label={expandedSections.section1 ? 'Collapse section' : 'Expand section'}
        >
          {expandedSections.section1 ? '▲' : '▼'}
        </button>
      </div>
      <div className={`section-content ${expandedSections.section1 ? 'expanded' : 'collapsed'}`}>
        <div className="input-group">
        <label htmlFor="pdf-date-2">{t(language, 'agreementDate')}</label>
        <input
          type="date"
          id="pdf-date-2"
          value={inputDate2}
          onChange={(e) => handleInputChange('inputDate2', e.target.value, setInputDate2)}
          placeholder={t(language, 'enterDate')}
        />
      </div>
      </div>
      <hr className="form-section-divider" />
      <div className="section-header">
        <div className="section-subheader">
          <h2 className='form-sub-heading'>{t(language, 'section2')}&nbsp;</h2>
          <h2 className='form-sub-heading'>{t(language, 'section2Topic')}</h2>
        </div>
        <button 
          className={`toggle-section-btn ${expandedSections.section2 ? 'expanded' : 'collapsed'}`}
          onClick={() => toggleSection('section2')}
          aria-label={expandedSections.section2 ? 'Collapse section' : 'Expand section'}
        >
          {expandedSections.section2 ? '▲' : '▼'}
        </button>
      </div>
      <div className={`section-content ${expandedSections.section2 ? 'expanded' : 'collapsed'}`}>
        <div className="input-group">
        <label htmlFor="pdf-text-1">{t(language, 'propertyAddress')}</label>
        <input
          type="text"
          id="pdf-text-1"
          value={inputText1}
          onChange={(e) => handleInputChange('inputText1', e.target.value, setInputText1)}
          placeholder={t(language, 'enterPropertyAddress')}
        />
      </div>
      </div>
      <hr className="form-section-divider" />
      <div className="section-header">
        <div className="section-subheader">
          <h2 className='form-sub-heading'>{t(language, 'section3')}&nbsp;</h2>
          <h2 className='form-sub-heading'>{t(language, 'section3Topic')}</h2>
        </div>
        <button 
          className={`toggle-section-btn ${expandedSections.section3 ? 'expanded' : 'collapsed'}`}
          onClick={() => toggleSection('section3')}
          aria-label={expandedSections.section3 ? 'Collapse section' : 'Expand section'}
        >
          {expandedSections.section3 ? '▲' : '▼'}
        </button>
      </div>
      <div className={`section-content ${expandedSections.section3 ? 'expanded' : 'collapsed'}`}>
        <div className="input-group">
        <label htmlFor="pdf-text-2">{t(language, 'landlord')}</label>
        <input
          type="text"
          id="pdf-text-2"
          value={inputText2}
          onChange={(e) => handleInputChange('inputText2', e.target.value, setInputText2)}
          placeholder={t(language, 'enterLandlordName')}
        />
      </div>

        <div className="input-group input-group-50">
          <label htmlFor="landlordTel">{t(language, 'landlordTel')}</label>
          <input
            type="text"
            id="landlordTel"
            value={landlordTel}
            onChange={(e) => handleInputChange('landlordTel', e.target.value, setLandlordTel)}
            placeholder={t(language, 'enterTel')}
          />
        </div>
        <div className="input-group input-group-50">
        <div className="input-group-label-container">
            <div className="radio-label-group">
              <label htmlFor="landlordIdRadio">{t(language, 'landlordId')}</label>
              <input
                type="radio"
                id="landlordIdRadio"
                name="landlordIdType"
                checked={landlordIDorBR === 'id'}
                onChange={() => {
                  handleInputChange('landlordIDorBR', 'id' as string, setLandlordIDorBR);
                  const element = document.getElementById('landlordIdRadio') as HTMLInputElement;
                  if (element) element.checked = true;
                }}
              />
            </div>
            <div className="radio-label-group">
              <label htmlFor="landlordId2Radio">{t(language, 'landlordId2')}</label>
              <input
                type="radio"
                id="landlordId2Radio"
                name="landlordIdType"
                checked={landlordIDorBR === 'br'}
                onChange={() => {
                  handleInputChange('landlordIDorBR', 'br' as string, setLandlordIDorBR);
                  const element = document.getElementById('landlordId2Radio') as HTMLInputElement;
                  if (element) element.checked = true;
                }}
              />
            </div>
          </div>
          <input
            type="text"
            id="landLordId"
            value={landLordId}
            onChange={(e) => handleInputChange('landLordId', e.target.value, setLandLordId)}
            placeholder={t(language, 'enterID')}
          />
        </div>
      
      <div className="input-group">
        <label htmlFor="pdf-text-3">{t(language, 'landlordAddress')}</label>
        <input
          type="text"
          id="pdf-text-3"
          value={inputText3}
          onChange={(e) => handleInputChange('inputText3', e.target.value, setInputText3)}
          placeholder={t(language, 'enterAddress')}
        />
      </div>
      <div className="input-group">
        <label htmlFor="pdf-text-4">{t(language, 'tenant')}</label>
        <input
          type="text"
          id="pdf-text-4"
          value={inputText4}
          onChange={(e) => handleInputChange('inputText4', e.target.value, setInputText4)}
          placeholder={t(language, 'enterTenantName')}
        />
      </div>

        <div className="input-group input-group-50">
          <label htmlFor="tenantTel">{t(language, 'tenantTel')}</label>
          <input
            type="text"
            id="tenantTel"
            value={tenantTel}
            onChange={(e) => handleInputChange('tenantTel', e.target.value, setTenantTel)}
            placeholder={t(language, 'enterTel')}
          />
        </div>
        <div className="input-group input-group-50">
          <div className="input-group-label-container">
            <div className="radio-label-group">
              <label htmlFor="tenantIdRadio">{t(language, 'tenantId')}</label>
              <input
                type="radio"
                id="tenantIdRadio"
                name="tenantIdType"
                checked={tenantIDorBR === 'id'}
                onChange={() => {
                  handleInputChange('tenantIDorBR', 'id' as string, setTenantIDorBR);
                  const element = document.getElementById('tenantIdRadio') as HTMLInputElement;
                  if (element) element.checked = true;
                }}
              />
            </div>
            <div className="radio-label-group">
              <label htmlFor="tenantId2Radio">{t(language, 'tenantId2')}</label>
              <input
                type="radio"
                id="tenantId2Radio"
                name="tenantIdType"
                checked={tenantIDorBR === 'br'}
                onChange={() => {
                  handleInputChange('tenantIDorBR', 'br' as string, setTenantIDorBR);
                  const element = document.getElementById('tenantId2Radio') as HTMLInputElement;
                  if (element) element.checked = true;
                }}
              />
            </div>
          </div>
          <input
            type="text"
            id="tenantId"
            value={tenantId}
            onChange={(e) => handleInputChange('tenantId', e.target.value, setTenantId)}
            placeholder={t(language, 'enterID')}
          />

      </div>    
      <div className="input-group">
        <label htmlFor="pdf-text-5">{t(language, 'tenantAddress')}</label>
        <input
          type="text"
          id="pdf-text-5"
          value={inputText5}
          onChange={(e) => handleInputChange('inputText5', e.target.value, setInputText5)}
          placeholder={t(language, 'enterAddress')}
        />
      </div>
      </div>
      <hr className="form-section-divider" />
      <div className="section-header">
        <div className="section-subheader">
          <h2 className='form-sub-heading'>{t(language, 'section4')}&nbsp;</h2>
          <h2 className='form-sub-heading'>{t(language, 'section4Topic')}</h2>
        </div>
        <button 
          className={`toggle-section-btn ${expandedSections.section4 ? 'expanded' : 'collapsed'}`}
          onClick={() => toggleSection('section4')}
          aria-label={expandedSections.section4 ? 'Collapse section' : 'Expand section'}
        >
          {expandedSections.section4 ? '▲' : '▼'}
        </button>
      </div>
      <div className={`section-content ${expandedSections.section4 ? 'expanded' : 'collapsed'}`}>
        <div className="date-range-group">
        <div className="input-group">
          <label htmlFor="date-from">{t(language, 'from')}</label>
          <input
            type="date"
            id="date-from"
            value={dateFrom}
            onChange={(e) => handleInputChange('dateFrom', e.target.value, setDateFrom)}
            placeholder={t(language, 'enterDate')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="date-to">{t(language, 'to')}</label>
          <input
            type="date"
            id="date-to"
            value={dateTo}
            onChange={(e) => handleInputChange('dateTo', e.target.value, setDateTo)}
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
          onChange={(e) => handleInputChange('rentAmount', e.target.value, setRentAmount)}
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
          onChange={(e) => handleInputChange('securityDeposit', e.target.value, setSecurityDeposit)}
          placeholder={t(language, 'enterAmount')}
          min="0"
          step="0.01"
        />
      </div>
      </div>
      <hr className="form-section-divider" />
      <div className="section-header">
        <div className="section-subheader">
          <h2 className='form-sub-heading'>{t(language, 'section5')}&nbsp;</h2>
          <h2 className='form-sub-heading'>{t(language, 'section5Topic')}</h2>
        </div>
        <button 
          className={`toggle-section-btn ${expandedSections.section5 ? 'expanded' : 'collapsed'}`}
          onClick={() => toggleSection('section5')}
          aria-label={expandedSections.section5 ? 'Collapse section' : 'Expand section'}
        >
          {expandedSections.section5 ? '▲' : '▼'}
        </button>
      </div>
      <div className={`section-content ${expandedSections.section5 ? 'expanded' : 'collapsed'}`}>
        <div className="input-group">
        <label htmlFor="property-use">{t(language, 'propertyUse')}</label>
        <select
          id="property-use"
          value={propertyUse}
          onChange={(e) => handleInputChange('propertyUse', e.target.value, setPropertyUse)}
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
            onChange={(e) => handleInputChange('managementFee', e.target.value, setManagementFee)}
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
            onChange={(e) => handleInputChange('governmentRates', e.target.value, setGovernmentRates)}
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
            onChange={(e) => handleInputChange('governmentRent', e.target.value, setGovernmentRent)}
          >
            <option value="landlord">{t(language, 'landlord')}</option>
            <option value="tenant">{t(language, 'tenant')}</option>
          </select>
        </div>
      </div>
      </div>
      <hr className="form-section-divider" />
      <div className="section-header">
        <div className="section-subheader">
          <h2 className='form-sub-heading'>{t(language, 'section6')}&nbsp;</h2>
          <h2 className='form-sub-heading'>{t(language, 'section6Topic')}</h2>
        </div>
        <button 
          className={`toggle-section-btn ${expandedSections.section6 ? 'expanded' : 'collapsed'}`}
          onClick={() => toggleSection('section6')}
          aria-label={expandedSections.section6 ? 'Collapse section' : 'Expand section'}
        >
          {expandedSections.section6 ? '▲' : '▼'}
        </button>
      </div>
      <div className={`section-content ${expandedSections.section6 ? 'expanded' : 'collapsed'}`}>
        <div className="date-range-group">
        <div className="input-group">
          <label htmlFor="rent-free-from">{t(language, 'rentFreeFrom')}</label>
          <input
            type="date"
            id="rent-free-from"
            value={rentFreeFrom}
            onChange={(e) => handleInputChange('rentFreeFrom', e.target.value, setRentFreeFrom)}
            placeholder={t(language, 'enterDate')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="rent-free-to">{t(language, 'rentFreeTo')}</label>
          <input
            type="date"
            id="rent-free-to"
            value={rentFreeTo}
            onChange={(e) => handleInputChange('rentFreeTo', e.target.value, setRentFreeTo)}
            placeholder={t(language, 'enterDate')}
          />
        </div>
      </div>
      </div>
      <hr className="form-section-divider" />
      <div className="section-header">
        <div className="section-subheader">
          <h2 className='form-sub-heading'>{t(language, 'section7')}&nbsp;</h2>
          <h2 className='form-sub-heading'>{t(language, 'section7Topic')}</h2>
        </div>
        <button 
          className={`toggle-section-btn ${expandedSections.section7 ? 'expanded' : 'collapsed'}`}
          onClick={() => toggleSection('section7')}
          aria-label={expandedSections.section7 ? 'Collapse section' : 'Expand section'}
        >
          {expandedSections.section7 ? '▲' : '▼'}
        </button>
      </div>
      <div className={`section-content ${expandedSections.section7 ? 'expanded' : 'collapsed'}`}>
        <div className="break-clause-row">
        <div className="input-group">
          <label htmlFor="break-clause-1">{t(language, 'breakClause1')}</label>
          <select
            id="break-clause-1"
            value={breakClause1}
            onChange={(e) => handleInputChange('breakClause1', e.target.value, setBreakClause1)}
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
            onChange={(e) => handleInputChange('breakClause2', e.target.value, setBreakClause2)}
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
              onChange={(e) => handleInputChange('breakClause3', e.target.value, setBreakClause3)}
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
                onChange={(e) => handleInputChange('breakClause3Other', e.target.value, setBreakClause3Other)}
                placeholder={t(language, 'enterNumber')}
                min="0"
                step="1"
              />
            )}
          </div>
        </div>
      </div>
      </div>
      <hr className="form-section-divider" />
      <div className="section-header">
        <div className="section-subheader">
          <h2 className='form-sub-heading'>{t(language, 'section8')}&nbsp;</h2>
          <h2 className='form-sub-heading'>{t(language, 'section8Topic')}</h2>
        </div>
        <button 
          className={`toggle-section-btn ${expandedSections.section8 ? 'expanded' : 'collapsed'}`}
          onClick={() => toggleSection('section8')}
          aria-label={expandedSections.section8 ? 'Collapse section' : 'Expand section'}
        >
          {expandedSections.section8 ? '▲' : '▼'}
        </button>
      </div>
      <div className={`section-content ${expandedSections.section8 ? 'expanded' : 'collapsed'}`}>
        <div className="furniture-row">
        <div className="input-group">
          <label htmlFor="air-conditioner">{t(language, 'airConditioner')}</label>
          <input
            type="text"
            id="air-conditioner"
            value={airConditioner}
            onChange={(e) => handleInputChange('airConditioner', e.target.value, setAirConditioner)}
            placeholder={t(language, 'enterQuantity')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="ventilator">{t(language, 'ventilator')}</label>
          <input
            type="text"
            id="ventilator"
            value={ventilator}
            onChange={(e) => handleInputChange('ventilator', e.target.value, setVentilator)}
            placeholder={t(language, 'enterQuantity')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="oil-ventilator">{t(language, 'oilVentilator')}</label>
          <input
            type="text"
            id="oil-ventilator"
            value={oilVentilator}
            onChange={(e) => handleInputChange('oilVentilator', e.target.value, setOilVentilator)}
            placeholder={t(language, 'enterQuantity')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="water-heater">{t(language, 'waterHeater')}</label>
          <input
            type="text"
            id="water-heater"
            value={waterHeater}
            onChange={(e) => handleInputChange('waterHeater', e.target.value, setWaterHeater)}
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
            onChange={(e) => handleInputChange('gasStove', e.target.value, setGasStove)}
            placeholder={t(language, 'enterQuantity')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="lightings">{t(language, 'lightings')}</label>
          <input
            type="text"
            id="lightings"
            value={lightings}
            onChange={(e) => handleInputChange('lightings', e.target.value, setLightings)}
            placeholder={t(language, 'enterQuantity')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="refrigerator">{t(language, 'refrigerator')}</label>
          <input
            type="text"
            id="refrigerator"
            value={refrigerator}
            onChange={(e) => handleInputChange('refrigerator', e.target.value, setRefrigerator)}
            placeholder={t(language, 'enterQuantity')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="washing-machine">{t(language, 'washingMachine')}</label>
          <input
            type="text"
            id="washing-machine"
            value={washingMachine}
            onChange={(e) => handleInputChange('washingMachine', e.target.value, setWashingMachine)}
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
            onChange={(e) => handleInputChange('bed', e.target.value, setBed)}
            placeholder={t(language, 'enterQuantity')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="wardrobe">{t(language, 'wardrobe')}</label>
          <input
            type="text"
            id="wardrobe"
            value={wardrobe}
            onChange={(e) => handleInputChange('wardrobe', e.target.value, setWardrobe)}
            placeholder={t(language, 'enterQuantity')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="settee">{t(language, 'settee')}</label>
          <input
            type="text"
            id="settee"
            value={settee}
            onChange={(e) => handleInputChange('settee', e.target.value, setSettee)}
            placeholder={t(language, 'enterQuantity')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="other-furniture">{t(language, 'otherFurniture')}</label>
          <input
            type="text"
            id="other-furniture"
            value={otherFurniture}
            onChange={(e) => handleInputChange('otherFurniture', e.target.value, setOtherFurniture)}
            placeholder={t(language, 'enterOtherFixtures')}
          />
        </div>
      </div>
      </div>
      <hr className="form-section-divider" />
      <div className="section-header">
        <div className="section-subheader">
          <h2 className='form-sub-heading'>{t(language, 'section9')}&nbsp;</h2>
          <h2 className='form-sub-heading'>{t(language, 'section9Topic')}</h2>
        </div>
        <button 
          className={`toggle-section-btn ${expandedSections.section9 ? 'expanded' : 'collapsed'}`}
          onClick={() => toggleSection('section9')}
          aria-label={expandedSections.section9 ? 'Collapse section' : 'Expand section'}
        >
          {expandedSections.section9 ? '▲' : '▼'}
        </button>
      </div>
      <div className={`section-content ${expandedSections.section9 ? 'expanded' : 'collapsed'}`}>
        <div className="bank-row">
        <div className="input-group">
          <label htmlFor="landlord-bank-account">{t(language, 'landlordBankAccount')}</label>
          <input
            type="text"
            id="landlord-bank-account"
            value={landlordBankAccount}
            onChange={(e) => handleInputChange('landlordBankAccount', e.target.value, setLandlordBankAccount)}
            placeholder={t(language, 'enterAccountNumber')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="bank">{t(language, 'bank')}</label>
          <input
            type="text"
            id="bank"
            value={bank}
            onChange={(e) => handleInputChange('bank', e.target.value, setBank)}
            placeholder={t(language, 'enterBank')}
          />
        </div>
      </div>
      </div>
      <hr className="form-section-divider" />
      <div className="section-header">
        <div className="section-subheader">
          <h2 className='form-sub-heading'>{t(language, 'section10')}&nbsp;</h2>
          <h2 className='form-sub-heading'>{t(language, 'section10Topic')}</h2>
        </div>
        <button 
          className={`toggle-section-btn ${expandedSections.section10 ? 'expanded' : 'collapsed'}`}
          onClick={() => toggleSection('section10')}
          aria-label={expandedSections.section10 ? 'Collapse section' : 'Expand section'}
        >
          {expandedSections.section10 ? '▲' : '▼'}
        </button>
      </div>
      <div className={`section-content ${expandedSections.section10 ? 'expanded' : 'collapsed'}`}>
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
        
      
      </div>
      <hr className="form-section-divider" />

      {/* Background Color Section */}
      <div className="section-header background-color-section">
        <div className="section-subheader-background-color">
          <h2 className='form-sub-heading'>{t(language, 'backgroundColor')}</h2>
        </div>
        <div className="background-color-select-container">
          {/* Direct click handlers on the divs for immediate visual feedback */}
          <div 
            className={`color-circle green ${backgroundColor === 'green' ? 'selected' : ''}`}
            onClick={() => {
              // Only update if not already selected
              if (backgroundColor !== 'green') {
                // Cast the string literal to string to match the expected type
                const value: string = 'green';
                handleInputChange('backgroundColor', value, setBackgroundColor);
              }
            }}
          >
            <input
              type="radio"
              id="background-color-green"
              name="background-color"
              value="green"
              checked={backgroundColor === 'green'}
              readOnly
            />
          </div>
          <div 
            className={`color-circle white ${backgroundColor === 'white' ? 'selected' : ''}`}
            onClick={() => {
              // Only update if not already selected
              if (backgroundColor !== 'white') {
                // Cast the string literal to string to match the expected type
                const value: string = 'white';
                handleInputChange('backgroundColor', value, setBackgroundColor);
              }
            }}
          >
            <input
              type="radio"
              id="background-color-white"
              name="background-color"
              value="white"
              checked={backgroundColor === 'white'}
              readOnly
            />
          </div>
        </div>
      </div>
      <hr className="form-section-divider" />

      {/* T&C Checkbox */}
      <div className="terms-checkbox-container">
        {showTermsWarning && (
          <div className="terms-warning">
            {t(language, 'termsCheckboxWarning')}
          </div>
        )}
        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="terms-checkbox"
            checked={termsAccepted}
            onChange={(e) => {
              setTermsAccepted(e.target.checked);
              if (e.target.checked) {
                setShowTermsWarning(false);
              }
            }}
          />
          <label>
            {t(language, 'termsCheckboxPart1')}{' '}
            <Link to="/terms-and-conditions" target="_blank" className="terms-link">
              {t(language, 'termsCheckboxPart2')}
            </Link>{' '}
            {t(language, 'termsCheckboxPart3')}{' '}
            <Link to="/disclaimer" target="_blank" className="terms-link">
              {t(language, 'termsCheckboxPart4')}
            </Link>
          </label>
        </div>
      </div>

      <div className="controls">
        <button 
          className="reset-btn" 
          onClick={handleReset}
          onTouchStart={(e) => {
            // Prevent default to avoid any delay
            e.preventDefault();
            handleReset();
          }}
        >
          {t(language, 'reset') || 'Reset Form'}
        </button>
        <div className="button-group-right">
          <button 
            className="generate-btn" 
            onClick={(e) => {
              if (!termsAccepted) {
                e.preventDefault();
                setShowTermsWarning(true);
                // Scroll to the terms checkbox
                document.getElementById('terms-checkbox')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
              }
              isFreeMode ? handleRedirectToReturn() : handleRedirectToCheckout();
            }}
            onTouchStart={(e) => {
              // Prevent default to avoid any delay
              e.preventDefault();
              if (!termsAccepted) {
                setShowTermsWarning(true);
                // Scroll to the terms checkbox
                document.getElementById('terms-checkbox')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
              }
              isFreeMode ? handleRedirectToReturn() : handleRedirectToCheckout(); 
            }}
            // disabled={isLoading}
          >
            {(t(language, 'generatePDF') || 'Generate PDF')}
          </button>
          <button 
            className="preview-btn"
            onClick={handlePreview}
            onTouchStart={(e) => {
              if (isLoading) return;
              // Prevent default to avoid any delay
              e.preventDefault();
              handlePreview();
            }}
            disabled={isLoading}
          >
            {t(language, 'preview') || 'Preview'}
          </button>
        </div>
      </div>
    </>
  );
};

export default PdfInputForm;
