import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CompilerPage from './pages/CompilerPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CompilerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
