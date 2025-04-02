import React, { useState, useEffect, useCallback } from 'react';
import './PdfGenerateSection.css';
import { useLanguage } from '../contexts/LanguageContext';
import { t } from '../translations';
import { 
  generatePDF, 
  PdfGenerationParams, 
  updatePdfInputValues, 
  loadPdfInputValues,
  resetPdfInputValues,
  PdfInputValues
} from '../utils/pdfGenerator';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PdfGenerateSectionProps {
  // Add props here as needed
}

const PdfGenerateSection: React.FC<PdfGenerateSectionProps> = () => {
  const { language } = useLanguage();
  
  // Load saved values from session storage or use defaults
  const savedValues = loadPdfInputValues();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [inputText1, setInputText1] = useState(savedValues.inputText1);
  const [inputText2, setInputText2] = useState(savedValues.inputText2);
  const [inputText3, setInputText3] = useState(savedValues.inputText3);
  const [inputText4, setInputText4] = useState(savedValues.inputText4);
  const [inputText5, setInputText5] = useState(savedValues.inputText5);
  const [rentAmount, setRentAmount] = useState(savedValues.rentAmount);
  const [securityDeposit, setSecurityDeposit] = useState(savedValues.securityDeposit);
  const [propertyUse, setPropertyUse] = useState(savedValues.propertyUse);
  const [managementFee, setManagementFee] = useState(savedValues.managementFee);
  const [governmentRates, setGovernmentRates] = useState(savedValues.governmentRates);
  const [governmentRent, setGovernmentRent] = useState(savedValues.governmentRent);
  const [rentFreeFrom, setRentFreeFrom] = useState(savedValues.rentFreeFrom);
  const [rentFreeTo, setRentFreeTo] = useState(savedValues.rentFreeTo);
  const [breakClause1, setBreakClause1] = useState(savedValues.breakClause1);
  const [breakClause2, setBreakClause2] = useState(savedValues.breakClause2);
  const [breakClause3, setBreakClause3] = useState(savedValues.breakClause3);
  const [breakClause3Other, setBreakClause3Other] = useState(savedValues.breakClause3Other);
  const [airConditioner, setAirConditioner] = useState(savedValues.airConditioner);
  const [ventilator, setVentilator] = useState(savedValues.ventilator);
  const [oilVentilator, setOilVentilator] = useState(savedValues.oilVentilator);
  const [waterHeater, setWaterHeater] = useState(savedValues.waterHeater);
  const [gasStove, setGasStove] = useState(savedValues.gasStove);
  const [lightings, setLightings] = useState(savedValues.lightings);
  const [refrigerator, setRefrigerator] = useState(savedValues.refrigerator);
  const [washingMachine, setWashingMachine] = useState(savedValues.washingMachine);
  const [bed, setBed] = useState(savedValues.bed);
  const [wardrobe, setWardrobe] = useState(savedValues.wardrobe);
  const [settee, setSettee] = useState(savedValues.settee);
  const [otherFurniture, setOtherFurniture] = useState(savedValues.otherFurniture);
  const [landLordId, setLandLordId] = useState(savedValues.landLordId);
  const [landlordTel, setLandlordTel] = useState(savedValues.landlordTel);
  const [tenantId, setTenantId] = useState(savedValues.tenantId);
  const [tenantTel, setTenantTel] = useState(savedValues.tenantTel);
  const [landlordBankAccount, setLandlordBankAccount] = useState(savedValues.landlordBankAccount);
  const [bank, setBank] = useState(savedValues.bank);
  const [inputDate2, setInputDate2] = useState(savedValues.inputDate2);
  const [dateFrom, setDateFrom] = useState(savedValues.dateFrom);
  const [dateTo, setDateTo] = useState(savedValues.dateTo);
  const [remarksFields, setRemarksFields] = useState<string[]>(savedValues.remarksFields);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ConvertToImage State - used by the preview function
  const [images, setImages] = useState<string[]>([]);
  // These variables are used in the handlePreview function when passed to generatePDF
  // The linter doesn't recognize they're being used because they're passed as props to another function
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imageError, setImageError] = useState<string | null>(null);

  // Create a debounced update function with 500ms delay
  const debouncedUpdate = useCallback(() => {
    let timeoutId: number | null = null;
    
    return (updates: Partial<PdfInputValues>) => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      
      timeoutId = window.setTimeout(() => {
        updatePdfInputValues(updates);
        timeoutId = null;
      }, 500);
    };
  }, [])();

  // Generic change handler for input fields
  const handleInputChange = useCallback((fieldName: keyof PdfInputValues, value: any, setter: React.Dispatch<React.SetStateAction<any>>) => {
    setter(value);
    debouncedUpdate({ [fieldName]: value } as Partial<PdfInputValues>);
  }, [debouncedUpdate]);

  // Handle remarks changes separately due to array structure
  const handleRemarkChange = useCallback((index: number, value: string) => {
    setRemarksFields(prev => {
      const newFields = [...prev];
      newFields[index] = value;
      debouncedUpdate({ remarksFields: newFields });
      return newFields;
    });
  }, [debouncedUpdate]);

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

  const resetFormValues = () => {
    // Reset all form values to defaults
    const defaultValues = resetPdfInputValues();
        
    // Update all state values
    setInputText1(defaultValues.inputText1);
    setInputText2(defaultValues.inputText2);
    setInputText3(defaultValues.inputText3);
    setInputText4(defaultValues.inputText4);
    setInputText5(defaultValues.inputText5);
    setRentAmount(defaultValues.rentAmount);
    setSecurityDeposit(defaultValues.securityDeposit);
    setPropertyUse(defaultValues.propertyUse);
    setManagementFee(defaultValues.managementFee);
    setGovernmentRates(defaultValues.governmentRates);
    setGovernmentRent(defaultValues.governmentRent);
    setRentFreeFrom(defaultValues.rentFreeFrom);
    setRentFreeTo(defaultValues.rentFreeTo);
    setBreakClause1(defaultValues.breakClause1);
    setBreakClause2(defaultValues.breakClause2);
    setBreakClause3(defaultValues.breakClause3);
    setBreakClause3Other(defaultValues.breakClause3Other);
    setAirConditioner(defaultValues.airConditioner);
    setVentilator(defaultValues.ventilator);
    setOilVentilator(defaultValues.oilVentilator);
    setWaterHeater(defaultValues.waterHeater);
    setGasStove(defaultValues.gasStove);
    setLightings(defaultValues.lightings);
    setRefrigerator(defaultValues.refrigerator);
    setWashingMachine(defaultValues.washingMachine);
    setBed(defaultValues.bed);
    setWardrobe(defaultValues.wardrobe);
    setSettee(defaultValues.settee);
    setOtherFurniture(defaultValues.otherFurniture);
    setLandLordId(defaultValues.landLordId);
    setLandlordTel(defaultValues.landlordTel);
    setTenantId(defaultValues.tenantId);
    setTenantTel(defaultValues.tenantTel);
    setLandlordBankAccount(defaultValues.landlordBankAccount);
    setBank(defaultValues.bank);
    setInputDate2(defaultValues.inputDate2);
    setDateFrom(defaultValues.dateFrom);
    setDateTo(defaultValues.dateTo);
    setRemarksFields(defaultValues.remarksFields);
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
      resetFormValues();
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
      } else {
        throw new Error('Failed to generate PDF preview');
      }
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      alert(t(language, 'pdfPreviewError') || 'Error generating PDF preview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    resetFormValues();
    
    // Show confirmation message
    alert(t(language, 'resetConfirmation') || 'Form has been reset to default values.');
  };

  const handleAddRemark = () => {
    const newRemarksFields = [...remarksFields, ''];
    setRemarksFields(newRemarksFields);
    debouncedUpdate({ remarksFields: newRemarksFields });
  };

  const handleRemoveRemark = (index: number) => {
    const newRemarksFields = [...remarksFields];
    newRemarksFields.splice(index, 1);
    setRemarksFields(newRemarksFields);
    debouncedUpdate({ remarksFields: newRemarksFields });
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
            onChange={(e) => handleInputChange('inputDate2', e.target.value, setInputDate2)}
            placeholder={t(language, 'enterDate')}
          />
        </div>
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
        <div className="input-group-row-container">
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
            <label htmlFor="landLordId">{t(language, 'landlordId')}</label>
            <input
              type="text"
              id="landLordId"
              value={landLordId}
              onChange={(e) => handleInputChange('landLordId', e.target.value, setLandLordId)}
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
        <div className="input-group-row-container">
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
            <label htmlFor="tenantId">{t(language, 'tenantId')}</label>
            <input
              type="text"
              id="tenantId"
              value={tenantId}
              onChange={(e) => handleInputChange('tenantId', e.target.value, setTenantId)}
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
            onChange={(e) => handleInputChange('inputText5', e.target.value, setInputText5)}
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
            className="reset-btn" 
            onClick={handleReset}
          >
            {t(language, 'reset') || 'Reset Form'}
          </button>
          <div className="button-group-right">
            <button 
              className="generate-btn" 
              onClick={handleGeneratePDF}
              disabled={isLoading}
            >
              {isLoading ? (t(language, 'generating') || 'Generating...') : (t(language, 'generatePDF') || 'Generate PDF')}
            </button>
            <button 
              className="preview-btn"
              onClick={handlePreview}
              disabled={isLoading}
            >
              {t(language, 'preview') || 'Preview'}
            </button>
          </div>
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
