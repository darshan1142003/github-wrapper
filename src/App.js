// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register'; // Ensure Register component is imported
import Login from './Login';
import AboutPage from './AboutPage';
import ReportGenerator from './ReportGenerator';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AboutPage />} />
          <Route path="/report-generator" element={<ReportGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
