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
import RouteProtection from './components/login/RouteProtection';
import NoAccessPage from './pages/NoAccessPage';
import NotFoundPage from './pages/NotFoundPage';

//import './App.css'
import TaxManagerPage from './pages/TaxManagerPage';

import PageFooter from './utils/PageFooter';
import './i18n';
// import './App.css'


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
        <Route path="/main" element={<RouteProtection><MainPage /></RouteProtection>} />
        <Route path="/taxpayer-info" element={<RouteProtection><TaxpayerInfoPage /></RouteProtection>} />
        <Route path="/multipleLogin" element={<MultipleLoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/taxes/:formType/:formID" element={<RouteProtection><TaxFormInfoPage /></RouteProtection>} />
        <Route path="/taxes/:formType" element={<RouteProtection><TaxFormInfoPage /></RouteProtection>} />
        <Route path="/results" element={<RouteProtection><ResultsPage /></RouteProtection>} />
        <Route path="/UserTaxes" element={<RouteProtection><TaxManagerPage /></RouteProtection>} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/no-access" element={<NoAccessPage />} />
      </Routes>
      <PageFooter />
    </Router>
  )
}

export default App
