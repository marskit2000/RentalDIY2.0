import React, { useState } from 'react';
import './PdfGenerateSection.css';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { toUpperCase, toChineseWithUnits } from 'chinese-number-format';

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
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages();
      const { height } = pages[0].getSize()
      
      // Add date information if date is provided
      if (inputDate2.trim()) {
        // Original displays (day with ordinal and month, year)
        const monthInEnglish = getMonthInEnglish(inputDate2);
        pages[0].drawText(monthInEnglish, {
          x: 260,
          y: height - 128,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        const dayWithOrdinal = getDayWithOrdinal(inputDate2);
        pages[0].drawText(dayWithOrdinal, {
          x: 168,
          y: height - 128,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // New displays
        // Date at top left
        const dateNumber = getDateNumber(inputDate2);
        pages[0].drawText(dateNumber, {
          x: 394,
          y: height - 156,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // Month number at top right
        const monthNumber = getMonthNumber(inputDate2);
        pages[0].drawText(monthNumber, {
          x: 353,
          y: height - 156,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // Year at bottom left
        const year = getYear(inputDate2);
        pages[0].drawText(year, {
          x: 293,
          y: height - 156,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }



      // Add user input text 1: The Premises
      if (inputText1.trim()) {
        pages[3].drawText(inputText1, {
          x: 128,
          y: height - 96,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        })
      }

      // Add user input text 2: The Landlord
      if (inputText2.trim()) {
        pages[3].drawText(inputText2, {
          x: 128,
          y: height - 132,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        })
      }

      // Add user input text 3: Landlord Address
      if (inputText3.trim()) {
        pages[3].drawText(inputText3, {
          x: 128,
          y: height - 160,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        })
      }

      // Add user input text 4: The Tenant
      if (inputText4.trim()) {
        pages[3].drawText(inputText4, {
          x: 128,
          y: height - 192,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        })
      }

      // Add user input text 5: Tenant Address
      if (inputText5.trim()) {
        pages[3].drawText(inputText5, {
          x: 128,
          y: height - 220,
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0),
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
          color: rgb(0, 0, 0),
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
          color: rgb(0, 0, 0),
        });

        // Month
        pages[3].drawText(fromMonth, {
          x: 208,
          y: height - 257,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });

        // Year
        pages[3].drawText(fromYear, {
          x: 148,
          y: height - 257,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
        });
      }
      
      if (dateTo) {
        // Display full date in DD/MM/YYYY format
        pages[3].drawText(formatDate(dateTo), {
          x: 310,
          y: height - 242,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
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
          color: rgb(0, 0, 0),
        });

        // Month
        pages[3].drawText(toMonth, {
          x: 366,
          y: height - 257,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0)
        });

        // Year
        pages[3].drawText(toYear, {
          x: 308,
          y: height - 257,
          size: 12,
          font: helveticaFont,
          color: rgb(0, 0, 0),
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
          color: rgb(0, 0, 0),
        });

        // Display Chinese
        const amount = Number(rentAmount);
        console.log(toChineseWithUnits(amount, 'zh-CN'));
        pages[3].drawText(toChineseWithUnits(amount, 'zh-CN'), {
          x: 50,
          y: height - 50,
          size: 12,
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
        <h2>PDF Generator</h2>     
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
              src={pdfUrl} 
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
