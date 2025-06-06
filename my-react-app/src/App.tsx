import './App.css';
import './styles/DropdownStyles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PdfGenerateSection from './components/PdfGenerateSection';
import LandingPage from './components/LandingPage';
// Pricing component kept but commented out for future use
// import Pricing from './components/Pricing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LanguageSelector from './components/LanguageSelector';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { t } from './translations';
import { Link } from 'react-router-dom';
import Checkout from './components/Checkout';
import Return from './components/Return';
import PaymentSuccess from './components/PaymentSuccess';
import HowToUse from './components/HowToUse';
import TermsAndConditions from './components/TermsAndConditions';
import Disclaimer from './components/Disclaimer';
import PrivacyPolicy from './components/PrivacyPolicy';

function AppContent() {
  const { language } = useLanguage();

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="App-Title-Link">
            <h1 className="App-Title">{t(language, 'appTitle')}</h1>
          </Link>  
          <div className="header-right">
            <div className="header-right-desktop">
              <Navbar />
              <LanguageSelector />
            </div>
            <div className="header-right-mobile">
              <LanguageSelector />
              <Navbar />
            </div>
          </div>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/rental-agreement" element={<PdfGenerateSection />} />
            {/* Pricing route removed but component kept for future use */}
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/return" element={<Return />} />
            <Route path="/payment-success" element={<PaymentSuccess email={''} />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
