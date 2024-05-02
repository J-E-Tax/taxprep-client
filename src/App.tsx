import '../node_modules/@trussworks/react-uswds/lib/uswds.css';
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useParams  } from 'react-router-dom'
import { initializeAuth } from './features/auth/authSlice'
import { useDispatch } from 'react-redux'
import TaxpayerInfoPage from './pages/TaxpayerInfoPage'
import TaxFormInfoPage from './pages/TaxformPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import NavBar from './utils/NavBar'
import SignUpPage from './pages/SignUpPage'
// import './App.css'

function App() {
  const {formID} = useParams();

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(initializeAuth());
// }, [dispatch]);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/taxpayer-info" element={<TaxpayerInfoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/taxes/:formID" element={<TaxFormInfoPage />} />
        <Route path="/taxes" element={<TaxFormInfoPage />} />
      </Routes>
    </Router>
  )
}

export default App
