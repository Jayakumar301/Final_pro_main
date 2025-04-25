import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import PartsPage from './PartsPage';
import ReportsPage from './ReportsPage'; // Assuming ReportsPage is the correct component for reports
import AdminLoginPage from './AdminLoginPage';
import AdminsPage from './AdminsPage'; // Admin Dashboard
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route exact path="/" element={<LandingPage />} />

        {/* Other Main Pages */}
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/parts" element={<PartsPage />} />
        <Route path="/reports" element={<ReportsPage />} />

        {/* Admin Login and Dashboard Routes */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admins-page" element={<AdminsPage />} />
      </Routes>
    </Router>
  );
}

export default App;