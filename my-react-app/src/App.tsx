import './App.css'
import PdfGenerateSection from './components/PdfGenerateSection'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rental Agreement DIY</h1>
      </header>
      <main>
        <PdfGenerateSection />
      </main>
    </div>
  )
}

export default App
