import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PdfGenerateSection from './components/PdfGenerateSection';
import LandingPage from './components/LandingPage';
import Pricing from './components/Pricing';
import Navbar from './components/Navbar';
import LanguageSelector from './components/LanguageSelector';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { t } from './translations';

function AppContent() {
  const { language } = useLanguage();

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>{t(language, 'appTitle')}</h1>
          <div className="header-right">
            <LanguageSelector />
            <Navbar />
          </div>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/rental-agreement" element={<PdfGenerateSection />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </main>
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
