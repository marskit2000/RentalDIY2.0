import './App.css';
import PdfGenerateSection from './components/PdfGenerateSection';
import LanguageSelector from './components/LanguageSelector';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { t } from './translations';

function AppContent() {
  const { language } = useLanguage();

  return (
    <div className="App">
      <header className="App-header">
        <h1>{t(language, 'appTitle')}</h1>
        <div className="header-right">
          <div>Nav Bar to be developed</div>
          <LanguageSelector />
        </div>
      </header>
      <main className="App-main">
        <PdfGenerateSection />
      </main>
    </div>
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
