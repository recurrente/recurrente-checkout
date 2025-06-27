import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CheckoutPage from './components/CheckoutPage';
import SuccessPage from './components/SuccessPage';
import FailurePage from './components/FailurePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CheckoutPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/failure" element={<FailurePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
