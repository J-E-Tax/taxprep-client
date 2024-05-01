import '../node_modules/@trussworks/react-uswds/lib/uswds.css';
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { initializeAuth } from './features/auth/authSlice'
import { useDispatch } from 'react-redux'
import TaxpayerInfoPage from './pages/TaxpayerInfoPage'
import LoginPage from './pages/LoginPage'
import NavBar from './utils/NavBar'
import SignUpPage from './pages/SignUpPage'
import LandingPage from './pages/LandingPage'
import MainPage from './pages/MainPage';
import ResultsPage from './pages/ResultsPage';
import MultipleLoginPage from './pages/MultipleLogin';
// import './App.css'

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAuth());
}, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/taxpayer-info" element={<TaxpayerInfoPage />} />
        <Route path="/multipleLogin" element={<MultipleLoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  )
}

export default App
