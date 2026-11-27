import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import OrganizationPage from './pages/OrganizationPage';
import CreditPurchasePage from './pages/CreditPurchasePage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* 예전 주소 호환: 결제 완료 후 이동, 즐겨찾기 ... */}
        <Route path="/main" element={<Navigate to="/home" replace />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/organization" element={<OrganizationPage />} />
        <Route path="/credits/payment" element={<CreditPurchasePage />} />
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
