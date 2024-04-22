import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TaxpayerInfoPage from './pages/TaxpayerInfoPage'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/taxpayer-info" element={<TaxpayerInfoPage />} />
      </Routes>
    </Router>
  )
}

export default App
