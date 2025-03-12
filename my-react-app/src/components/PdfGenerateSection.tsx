import React, { useState } from 'react';
import './PdfGenerateSection.css';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface PdfGenerateSectionProps {
  // Add props here as needed
}

const PdfGenerateSection: React.FC<PdfGenerateSectionProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [inputText1, setInputText1] = useState('');

  const generatePDF = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/src/assets/Tenancy_Agreement_Template_20250311.pdf');
      const pdfBuffer = await response.arrayBuffer();
      
      const pdfDoc = await PDFDocument.load(pdfBuffer);
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages();
      const { width, height } = pages[0].getSize()
      
      // Add width value in small text
      // pages[0].drawText(width.toString(), {
      //   x: 5,
      //   y: 5,
      //   size: 12,
      //   font: helveticaFont,
      //   color: rgb(0.95, 0.1, 0.1),
      // })

      // Add user input text
      if (inputText1.trim()) {
        pages[0].drawText(inputText1, {
          x: 168,
          y: height - 128, // Position from top
          size: 14,
          font: helveticaFont,
          color: rgb(0, 0, 0), // Black color
        })
      }

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
          <label htmlFor="pdf-text-1">Field 1:</label>
          <input
            type="text"
            id="pdf-text-1"
            value={inputText1}
            onChange={(e) => setInputText1(e.target.value)}
            placeholder="Enter text to add to PDF"
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
