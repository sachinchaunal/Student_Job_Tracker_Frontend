import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobsPage from './pages/JobsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<JobsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
