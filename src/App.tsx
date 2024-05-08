import '../node_modules/@trussworks/react-uswds/lib/uswds.css';
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams  } from 'react-router-dom'
import { initializeAuth } from './features/auth/authSlice'
import { useDispatch } from 'react-redux'
import TaxpayerInfoPage from './pages/TaxpayerInfoPage'
import TaxFormInfoPage from './pages/TaxformPage'
import LoginPage from './pages/LoginPage'
import NavBar from './utils/NavBar'
import SignUpPage from './pages/SignUpPage'
import LandingPage from './pages/LandingPage'
import MainPage from './pages/MainPage';
import ResultsPage from './pages/ResultsPage';
import MultipleLoginPage from './pages/MultipleLogin';
import PageFooter from './utils/PageFooter';
import './i18n';
import './App.css'
import TaxManagerPage from './pages/TaxManagerPage';

function App() {
  //const {formID} = useParams();

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
        <Route path="/taxes/:formType/:formID" element={<TaxFormInfoPage />} />
        <Route path="/taxes/:formType" element={<TaxFormInfoPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/UserTaxes" element={<TaxManagerPage />} />
      </Routes>
      <PageFooter />
    </Router>
  )
}

export default App
