import React, { useState } from 'react';
import './PdfGenerateSection.css';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit'
import { toChinese, toChineseWithUnits } from 'chinese-number-format';

interface PdfGenerateSectionProps {
  // Add props here as needed
}

const PdfGenerateSection: React.FC<PdfGenerateSectionProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
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
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [inputDate2, setInputDate2] = useState('');

  const getMonthInEnglish = (dateString: string): string => {
    const date = new Date(dateString);
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month}, ${year}`;
  };

  const getDayWithOrdinal = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  const getMonthNumber = (dateString: string): string => {
    const date = new Date(dateString);
    return String(date.getMonth() + 1).padStart(2, '0');
  };

  const getDateNumber = (dateString: string): string => {
    const date = new Date(dateString);
    return String(date.getDate()).padStart(2, '0');
  };

  const getYear = (dateString: string): string => {
    const date = new Date(dateString);
    return String(date.getFullYear());
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generatePDF = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/src/assets/Tenancy_Agreement_Template_20250311.pdf');
      const pdfBuffer = await response.arrayBuffer();
      
      const pdfDoc = await PDFDocument.load(pdfBuffer);

      // Fonts
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      pdfDoc.registerFontkit(fontkit)
      const defaultFontBuffer = await fetch(
        '/src/assets/fonts/NotoSansTC-Regular.ttf',
    ).then(res => res.arrayBuffer());
    const chineseFont = await pdfDoc.embedFont(defaultFontBuffer);


      const pages = pdfDoc.getPages();
      const { height } = pages[0].getSize()

      const fontColor = rgb(0, 0, 0);
      const lineColor = rgb(0, 0, 0);
      
      // Add date information if date is provided
      if (inputDate2.trim()) {
        // Original displays (day with ordinal and month, year)
        const monthInEnglish = getMonthInEnglish(inputDate2);
        pages[0].drawText(monthInEnglish, {
          x: 260,
          y: height - 128,
          size: 14,
          font: helveticaFont,
          color: fontColor,
        });

        const dayWithOrdinal = getDayWithOrdinal(inputDate2);
        pages[0].drawText(dayWithOrdinal, {
          x: 168,
          y: height - 128,
          size: 14,
          font: helveticaFont,
          color: fontColor,
        });

        // New displays
        // Date at top left
        const dateNumber = getDateNumber(inputDate2);
        pages[0].drawText(dateNumber, {
          x: 394,
          y: height - 156,
          size: 14,
          font: helveticaFont,
          color: fontColor,
        });

        // Month number at top right
        const monthNumber = getMonthNumber(inputDate2);
        pages[0].drawText(monthNumber, {
          x: 353,
          y: height - 156,
          size: 14,
          font: helveticaFont,
          color: fontColor,
        });

        // Year at bottom left
        const year = getYear(inputDate2);
        pages[0].drawText(year, {
          x: 293,
          y: height - 156,
          size: 14,
          font: helveticaFont,
          color: fontColor,
        });
      }



      // Add user input text 1: The Premises
      if (inputText1.trim()) {
        pages[3].drawText(inputText1, {
          x: 128,
          y: height - 96,
          size: 14,
          font: chineseFont,
          color: fontColor,
        })
      }

      // Add user input text 2: The Landlord
      if (inputText2.trim()) {
        pages[3].drawText(inputText2, {
          x: 128,
          y: height - 132,
          size: 14,
          font: chineseFont,
          color: fontColor,
        })
      }

      // Add user input text 3: Landlord Address
      if (inputText3.trim()) {
        pages[3].drawText(inputText3, {
          x: 128,
          y: height - 160,
          size: 14,
          font: chineseFont,
          color: fontColor,
        })
      }

      // Add user input text 4: The Tenant
      if (inputText4.trim()) {
        pages[3].drawText(inputText4, {
          x: 128,
          y: height - 192,
          size: 14,
          font: chineseFont,
          color: fontColor,
        })
      }

      // Add user input text 5: Tenant Address
      if (inputText5.trim()) {
        pages[3].drawText(inputText5, {
          x: 128,
          y: height - 220,
          size: 14,
          font: chineseFont,
          color: fontColor,
        })
      }

      // Add date range of the Term at the top of page 3
      if (dateFrom) {
        // Display full date in DD/MM/YYYY format
        pages[3].drawText(formatDate(dateFrom), {
          x: 170,
          y: height - 242,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        })

        // Add date components
        const fromDate = new Date(dateFrom);
        const fromDay = String(fromDate.getDate()).padStart(2, '0');
        const fromMonth = String(fromDate.getMonth() + 1).padStart(2, '0');
        const fromYear = String(fromDate.getFullYear());

        // Day
        pages[3].drawText(fromDay, {
          x: 248,
          y: height - 257,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        });

        // Month
        pages[3].drawText(fromMonth, {
          x: 208,
          y: height - 257,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        });

        // Year
        pages[3].drawText(fromYear, {
          x: 148,
          y: height - 257,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        });
      }
      
      if (dateTo) {
        // Display full date in DD/MM/YYYY format
        pages[3].drawText(formatDate(dateTo), {
          x: 310,
          y: height - 242,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        })

        // Add date components
        const toDate = new Date(dateTo);
        const toDay = String(toDate.getDate()).padStart(2, '0');
        const toMonth = String(toDate.getMonth() + 1).padStart(2, '0');
        const toYear = String(toDate.getFullYear());

        // Day
        pages[3].drawText(toDay, {
          x: 404,
          y: height - 257,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        });

        // Month
        pages[3].drawText(toMonth, {
          x: 366,
          y: height - 257,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        });

        // Year
        pages[3].drawText(toYear, {
          x: 308,
          y: height - 257,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        });
      }

      // Add rent amount
      if (rentAmount) {
        // Display at original position
        pages[3].drawText(rentAmount + " -", {
          x: 160,
          y: height - 278,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        });

        // Display Chinese
        const amount = Number(rentAmount);
        pages[3].drawText(toChineseWithUnits(amount, 'zh-TW')+"元正", {
          x: 186,
          y: height - 293,
          size: 12,
          font: chineseFont,
          color: fontColor,
        });
      }

      // Add security deposit amount
      if (securityDeposit) {
        // Display at page 3
        pages[3].drawText(securityDeposit + " -", {
          x: 160,
          y: height - 323,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        });

        //Display at page 1
        pages[1].drawText(securityDeposit + " -", {
          x: 80,
          y: height - 551,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        });

        // Display Chinese
        const depositAmount = Number(securityDeposit);
        const singlePlace = depositAmount%10;
        const tenPlace = ((Math.floor(depositAmount / 10) * 10)%100)/10;
        const hundredPlace = ((Math.floor(depositAmount / 100) * 100)%1000)/100;
        const thousandPlace = ((Math.floor(depositAmount / 1000) * 1000)%10000)/1000;
        const tenThousandPlace = (Math.floor(depositAmount / 10000) * 10000)/10000;
        console.log(toChinese(tenPlace), toChinese(hundredPlace), toChinese(thousandPlace), toChinese(tenThousandPlace));
        
        // Display at page 3
        // Display 10
        pages[3].drawText(toChinese(tenPlace), {
          x: 288,
          y: height - 335,
          size: 10,
          font: chineseFont,
          color: fontColor,
        });

        // Display 100
        pages[3].drawText(toChinese(hundredPlace), {
          x: 248,
          y: height - 335,
          size: 10,
          font: chineseFont,
          color: fontColor,
        });

        // Display 1000
        pages[3].drawText(toChinese(thousandPlace), {
          x: 206,
          y: height - 335,
          size: 10,
          font: chineseFont,
          color: fontColor,
        });

        // Display 10000
        pages[3].drawText(toChineseWithUnits(tenThousandPlace), {
          x: 151,
          y: height - 335,
          size: 10,
          font: chineseFont,
          color: fontColor,
        });

        // Display at page 1
        const heightAdjustmentPage1 = 587;
        // Display 1
        pages[1].drawText(toChinese(singlePlace), {
          x: 178,
          y: height - heightAdjustmentPage1,
          size: 10,
          font: chineseFont,
          color: fontColor,
        });
        // Display 10
        pages[1].drawText(toChinese(tenPlace), {
          x: 148,
          y: height - heightAdjustmentPage1,
          size: 10,
          font: chineseFont,
          color: fontColor,
        });

        // Display 100
        pages[1].drawText(toChinese(hundredPlace), {
          x: 118,
          y: height - heightAdjustmentPage1,
          size: 10,
          font: chineseFont,
          color: fontColor,
        });

        // Display 1000
        pages[1].drawText(toChinese(thousandPlace), {
          x: 89,
          y: height - heightAdjustmentPage1,
          size: 10,
          font: chineseFont,
          color: fontColor,
        });

        // Display 10000
        pages[1].drawText(toChineseWithUnits(tenThousandPlace), {
          x: 59,
          y: height - heightAdjustmentPage1,
          size: 10,
          font: chineseFont,
          color: fontColor,
        });
      }

      // Add property use
      if (propertyUse) {
        // Display property use at top right of page 3
        pages[3].drawText(propertyUse, {
          x: 62,
          y: height - 448,
          size: 12,
          font: helveticaFont,
          color: fontColor,
        });

        // Display Chinese
        let propertyUseChinese = "";
        if (propertyUse === "residential") {
          propertyUseChinese = "住宅";
        } else if (propertyUse === "commercial") {
          propertyUseChinese = "商業";
        } else if (propertyUse === "office") {
          propertyUseChinese = "辦公室";
        } else if (propertyUse === "shop") {
          propertyUseChinese = "商店";
        } else if (propertyUse === "industrial") { 
          propertyUseChinese = "工業";
        }

        pages[3].drawText(propertyUseChinese, {
          x: 146,
          y: height - 476,
          size: 12,
          font: chineseFont,
          color: fontColor,
        });
      }

      

      // Add management fee indicator
      const managementFeeY = height - 566;
      const managementFeeYChinese = height - 595;
      if (managementFee === 'landlord') {
        //Draw red line at English position
        pages[3].drawLine({
          start: { x: 236, y: managementFeeY },
          end: { x: 278, y: managementFeeY },
          thickness: 1,
          color: lineColor,
        })
        // Draw red line at Chinese position
        pages[3].drawLine({
          start: { x: 142, y: managementFeeYChinese },
          end: { x: 164, y: managementFeeYChinese },
          thickness: 1,
          color: lineColor,
        });
      } else if (managementFee === 'tenant') {
        //Draw red line at English position
        pages[3].drawLine({
          start: { x: 186, y: managementFeeY },
          end: { x: 230, y: managementFeeY },
          thickness: 1,
          color: lineColor,
        })

        // Draw red line at Chinese position
        pages[3].drawLine({
          start: { x: 112, y: managementFeeYChinese },
          end: { x: 134, y: managementFeeYChinese },
          thickness: 1,
          color: lineColor,
        });
      }

      // Add government rates indicator
      const governmentRatesY = height - 619;
      const governmentRatesYChinese = height - 633;
      if (governmentRates === 'landlord') {
        // Draw red line at English position
        pages[3].drawLine({
          start: { x: 246, y: governmentRatesY },
          end: { x: 284, y: governmentRatesY },
          thickness: 1,
          color: lineColor,
        })
        // Draw red line at Chinese position
        pages[3].drawLine({
          start: { x: 130, y: governmentRatesYChinese },
          end: { x: 154, y: governmentRatesYChinese },
          thickness: 1,
          color: lineColor,
        });
      } else if (governmentRates === 'tenant') {
        // Draw red line at English position
        pages[3].drawLine({
          start: { x: 194, y: governmentRatesY },
          end: { x: 242, y: governmentRatesY },
          thickness: 1,
          color: lineColor,
        })
        // Draw red line at Chinese position (top left + 25px)
        pages[3].drawLine({
          start: { x: 100, y: governmentRatesYChinese },
          end: { x: 122, y: governmentRatesYChinese },
          thickness: 1,
          color: lineColor,
        });
      }

      // Add government rent indicator
      const governmentRentY = height - 655;
      const governmentRentYChinese = height - 667;
      if (governmentRent === 'landlord') {
        // Draw red line at English position
        pages[3].drawLine({
          start: { x: 242, y: governmentRentY },
          end: { x: 278, y: governmentRentY },
          thickness: 1,
          color: lineColor,
        })
        // Draw red line at Chinese position
        pages[3].drawLine({
          start: { x: 130, y: governmentRentYChinese },
          end: { x: 154, y: governmentRentYChinese },
          thickness: 1,
          color: lineColor,
        });
      } else if (governmentRent === 'tenant') {
        // Draw red line at English position
        pages[3].drawLine({
          start: { x: 189, y: governmentRentY },
          end: { x: 235, y: governmentRentY },
          thickness: 1,
          color: lineColor,
        })
        // Draw red line at Chinese position (top left + 25px)
        pages[3].drawLine({
          start: { x: 100, y: governmentRentYChinese },
          end: { x: 122, y: governmentRentYChinese },
          thickness: 1,
          color: lineColor,
        });
      }

      // Add rent free period dates

      if (rentFreeFrom) {
        pages[3].drawText(formatDate(rentFreeFrom), {
          x: 340,
          y: height - 741,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        pages[3].drawText(formatDate(rentFreeFrom), {
          x: 202,
          y: height - 800,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }

      if (rentFreeTo) {
        pages[3].drawText(formatDate(rentFreeTo), {
          x: 480,
          y: height - 741,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        pages[3].drawText(formatDate(rentFreeTo), {
          x: 288,
          y: height - 800,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }

      // Calculate date difference if both dates are available
      if (rentFreeFrom && rentFreeTo) {
        const fromDate = new Date(rentFreeFrom);
        const toDate = new Date(rentFreeTo);
        const diffTime = toDate.getTime() - fromDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffDaysInclusive = diffDays + 1;
        pages[3].drawText(diffDaysInclusive.toString(), {
          x: 106,
          y: height - 800,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }

      // Add Break Clause 1 indicator
      if (breakClause1 === 'landlord') {
        // Draw red line zone1
        pages[4].drawLine({
          start: { x: 434, y: height - 64 },
          end: { x: 532, y: height - 64 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone2
        pages[4].drawLine({
          start: { x: 345, y: height - 94 },
          end: { x: 390, y: height - 94 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        pages[4].drawLine({
          start: { x: 428, y: height - 94 },
          end: { x: 485, y: height - 94 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone3
        pages[4].drawLine({
          start: { x: 152, y: height - 137 },
          end: { x: 237, y: height - 137 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone4
        pages[4].drawLine({
          start: { x: 267, y: height - 137 },
          end: { x: 294, y: height - 137 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        pages[4].drawLine({
          start: { x: 334, y: height - 137 },
          end: { x: 364, y: height - 137 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
      } else if (breakClause1 === 'tenant') {
        // Draw red line zone1
        pages[4].drawLine({
          start: { x: 387, y: height - 64 },
          end: { x: 434, y: height - 64 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        pages[4].drawLine({
          start: { x: 470, y: height - 64 },
          end: { x: 532, y: height - 64 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone2
        pages[4].drawLine({
          start: { x: 391, y: height - 94 },
          end: { x: 485, y: height - 94 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone3
        pages[4].drawLine({
          start: { x: 121, y: height - 137 },
          end: { x: 148, y: height - 137 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        pages[4].drawLine({
          start: { x: 184, y: height - 137 },
          end: { x: 237, y: height - 137 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone4
        pages[4].drawLine({
          start: { x: 300, y: height - 137 },
          end: { x: 367, y: height - 137 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
      } else if (breakClause1 === 'either') {
        // Draw red line zone1
        pages[4].drawLine({
          start: { x: 387, y: height - 64 },
          end: { x: 470, y: height - 64 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone2
        pages[4].drawLine({
          start: { x: 345, y: height - 94 },
          end: { x: 428, y: height - 94 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone3
        pages[4].drawLine({
          start: { x: 120, y: height - 137 },
          end: { x: 183, y: height - 137 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone4
        pages[4].drawLine({
          start: { x: 268, y: height - 137 },
          end: { x: 333, y: height - 137 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
      }

      // Add Break Clause 2 
      if (breakClause2) {
        pages[4].drawText(breakClause2, {
          x: 507,
          y: height - 82,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        pages[4].drawText(breakClause2, {
          x: 186,
          y: height - 97,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        pages[4].drawText(breakClause2, {
          x: 410,
          y: height - 140,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        pages[4].drawText(breakClause2, {
          x: 523,
          y: height - 140,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }

      // Add Break Clause 3
      if (breakClause3 === '12') {
        // Draw red line zone1
        pages[4].drawLine({
          start: { x: 430, y: height - 108 },
          end: { x: 480, y: height - 108 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone2
        pages[4].drawLine({
          start: { x: 436, y: height - 152 },
          end: { x: 475, y: height - 152 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        //Display zone3 & 4
        pages[4].drawText(breakClause3, {
          x: 478,
          y: height - 126,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        pages[4].drawText(breakClause3, {
          x: 104,
          y: height - 169,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      } else if (breakClause3 === '14') {
        // Draw red line zone1
        pages[4].drawLine({
          start: { x: 412, y: height - 108 },
          end: { x: 430, y: height - 108 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        pages[4].drawLine({
          start: { x: 447, y: height - 108 },
          end: { x: 480, y: height - 108 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        // Draw red line zone2
        pages[4].drawLine({
          start: { x: 419, y: height - 152 },
          end: { x: 435, y: height - 152 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        pages[4].drawLine({
          start: { x: 452, y: height - 152 },
          end: { x: 475, y: height - 152 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        //Display zone3 & 4
        pages[4].drawText(breakClause3, {
          x: 478,
          y: height - 126,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        pages[4].drawText(breakClause3, {
          x: 104,
          y: height - 169,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      } else if (breakClause3 === 'other' && breakClause3Other) {
        // Display other value zone 1
        pages[4].drawLine({
          start: { x: 412, y: height - 108 },
          end: { x: 446, y: height - 108 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        pages[4].drawText(breakClause3Other, {
          x: 457,
          y: height - 111,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        // Display other value zone 2
        pages[4].drawLine({
          start: { x: 419, y: height - 152 },
          end: { x: 451, y: height - 152 },
          thickness: 1,
          color: rgb(1, 0, 0),
        });
        pages[4].drawText(breakClause3Other, {
          x: 457,
          y: height - 155,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        //Display zone3 & 4
        pages[4].drawText(breakClause3Other, {
          x: 478,
          y: height - 126,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
        pages[4].drawText(breakClause3Other, {
          x: 104,
          y: height - 169,
          size: 10,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }

      pdfDoc.removePage(2);

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url);
      return url;
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please check the console for details.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePDF = async () => {
    const url = await generatePDF();
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = "modified_tenancy_agreement.pdf";
      link.click();
    }
  };

  const handlePreview = async () => {
    const url = await generatePDF();
    if (url) {
      setShowPreview(true);
    }
  };

  return (
    <div className="pdf-generate-section">
      <div className="left-section">  
        <p className="input-group-heading">Please fill in the following information:</p>
        <div className="input-group">
          <label htmlFor="pdf-date-2">Sign Date:</label>
          <input
            type="date"
            id="pdf-date-2"
            value={inputDate2}
            onChange={(e) => setInputDate2(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="pdf-text-1">The Premises:</label>
          <input
            type="text"
            id="pdf-text-1"
            value={inputText1}
            onChange={(e) => setInputText1(e.target.value)}
            placeholder="Enter text to add to PDF"
          />
        </div>
        <div className="input-group">
          <label htmlFor="pdf-text-2">The Landlord:</label>
          <input
            type="text"
            id="pdf-text-2"
            value={inputText2}
            onChange={(e) => setInputText2(e.target.value)}
            placeholder="Enter text to add to PDF"
          />
        </div>
        <div className="input-group">
          <label htmlFor="pdf-text-3">Landlord Address:</label>
          <input
            type="text"
            id="pdf-text-3"
            value={inputText3}
            onChange={(e) => setInputText3(e.target.value)}
            placeholder="Enter text to add to PDF"
          />
        </div>
        <div className="input-group">
          <label htmlFor="pdf-text-4">Tenant:</label>
          <input
            type="text"
            id="pdf-text-4"
            value={inputText4}
            onChange={(e) => setInputText4(e.target.value)}
            placeholder="Enter text to add to PDF"
          />
        </div>
        <div className="input-group">
          <label htmlFor="pdf-text-5">Tenant Address:</label>
          <input
            type="text"
            id="pdf-text-5"
            value={inputText5}
            onChange={(e) => setInputText5(e.target.value)}
            placeholder="Enter text to add to PDF"
          />
        </div>
        <div className="date-range-group">
          <div className="input-group">
            <label htmlFor="date-from">From:</label>
            <input
              type="date"
              id="date-from"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="date-to">To:</label>
            <input
              type="date"
              id="date-to"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="rent-amount">Rent:</label>
          <input
            type="number"
            id="rent-amount"
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
            placeholder="Enter rent amount"
            min="0"
            step="0.01"
          />
        </div>
        <div className="input-group">
          <label htmlFor="security-deposit">Security Deposit:</label>
          <input
            type="number"
            id="security-deposit"
            value={securityDeposit}
            onChange={(e) => setSecurityDeposit(e.target.value)}
            placeholder="Enter security deposit amount"
            min="0"
            step="0.01"
          />
        </div>
        <div className="input-group">
          <label htmlFor="property-use">Property Use:</label>
          <select
            id="property-use"
            value={propertyUse}
            onChange={(e) => setPropertyUse(e.target.value)}
          >
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="office">Office</option>
            <option value="shop">Shop</option>
            <option value="industrial">Industrial</option>
          </select>
        </div>
        <div className="fee-row">
          <div className="input-group">
            <label htmlFor="management-fee">Management Fee:</label>
            <select
              id="management-fee"
              value={managementFee}
              onChange={(e) => setManagementFee(e.target.value)}
            >
              <option value="landlord">Landlord</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="government-rates">Government Rates:</label>
            <select
              id="government-rates"
              value={governmentRates}
              onChange={(e) => setGovernmentRates(e.target.value)}
            >
              <option value="landlord">Landlord</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="government-rent">Government Rent:</label>
            <select
              id="government-rent"
              value={governmentRent}
              onChange={(e) => setGovernmentRent(e.target.value)}
            >
              <option value="landlord">Landlord</option>
              <option value="tenant">Tenant</option>
            </select>
          </div>
        </div>
        <div className="date-range-group">
          <div className="input-group">
            <label htmlFor="rent-free-from">Rent Free From:</label>
            <input
              type="date"
              id="rent-free-from"
              value={rentFreeFrom}
              onChange={(e) => setRentFreeFrom(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="rent-free-to">Rent Free To:</label>
            <input
              type="date"
              id="rent-free-to"
              value={rentFreeTo}
              onChange={(e) => setRentFreeTo(e.target.value)}
            />
          </div>
        </div>
        <div className="break-clause-row">
          <div className="input-group">
            <label htmlFor="break-clause-1">Break Clause 1:</label>
            <select
              id="break-clause-1"
              value={breakClause1}
              onChange={(e) => setBreakClause1(e.target.value)}
            >
              <option value="landlord">Landlord</option>
              <option value="tenant">Tenant</option>
              <option value="either">Either Party</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="break-clause-2">Break Clause 2:</label>
            <input
              type="number"
              id="break-clause-2"
              value={breakClause2}
              onChange={(e) => setBreakClause2(e.target.value)}
              placeholder="Enter a number"
              min="0"
              step="1"
            />
          </div>
          <div className="input-group break-clause-3-group">
            <label htmlFor="break-clause-3">Break Clause 3:</label>
            <div className="break-clause-3-inputs">
              <select
                id="break-clause-3"
                value={breakClause3}
                onChange={(e) => setBreakClause3(e.target.value)}
              >
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="other">Others</option>
              </select>
              {breakClause3 === 'other' && (
                <input
                  type="number"
                  id="break-clause-3-other"
                  value={breakClause3Other}
                  onChange={(e) => setBreakClause3Other(e.target.value)}
                  placeholder="Enter a number"
                  min="0"
                  step="1"
                />
              )}
            </div>
          </div>
        </div>
        <div className="controls">
          <button 
            className="generate-btn" 
            onClick={handleGeneratePDF}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate PDF'}
          </button>
          <button 
            className="preview-btn" 
            onClick={handlePreview}
            disabled={isLoading}
          >
            Preview
          </button>
        </div>
      </div>
      <div className="right-section">
        {showPreview && pdfUrl ? (
          <div className="pdf-preview">
            <iframe 
              src={pdfUrl+"#toolbar=0&zoom=150"} 
              title="PDF Preview"
            />
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
              <p>Click the Preview button to view the PDF here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfGenerateSection;
