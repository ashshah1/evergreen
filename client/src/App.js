import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login'; // Import your Login component
import HomePage from './HomePage'; // Your authenticated main page (e.g., leaderboard)
import './App.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // User is logged in if token exists
    }
  }, []);

  return (
    <Router>
      <div>
        {/* Routes */}
        <Routes>
          {/* If not authenticated, show the Login page */}
          <Route path="/login" element={<Login />} />

          {/* If authenticated, show the Dashboard (Main App) */}
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Login />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
