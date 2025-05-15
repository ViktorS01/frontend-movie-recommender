import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Recommended from './pages/Recommended/Recommended';
import AllMovies from './pages/AllMovies/AllMovies';
import Profile from './pages/Profile/Profile';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
