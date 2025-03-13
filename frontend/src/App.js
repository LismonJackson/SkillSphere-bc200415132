import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

// Components
import Navigation from './components/Navigation.js';
import ProfileForm from './components/ProfileForm.js';
import Dashboard from './components/Dashboard.js';
import Recommendations from './components/Recommendations.js';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check for logged in user on app load
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    
    if (savedEmail) {
      // Fetch user data from API
      fetch(`/api/users/${savedEmail}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('User not found');
        })
        .then(userData => {
          setUser(userData);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
          localStorage.removeItem('userEmail');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
  
  // Handle user login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('userEmail', userData.email);
  };
  
  // Handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('userEmail');
  };
  
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <Router>
      <div className="App">
        <Navigation user={user} onLogout={handleLogout} />
        
        <div className="container mt-4">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" /> : <ProfileForm onLogin={handleLogin} />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/" />} 
            />
            <Route 
              path="/recommendations" 
              element={user ? <Recommendations user={user} /> : <Navigate to="/" />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;