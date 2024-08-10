import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutPage from './AboutPage';
import ReportGenerator from './ReportGenerator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AboutPage />} />
        <Route path="/report-generator" element={<ReportGenerator />} />
      </Routes>
    </Router>
  );
}

export default App;
