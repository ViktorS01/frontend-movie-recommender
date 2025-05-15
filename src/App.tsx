import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Recommended from './pages/Recommended/Recommended';
import AllMovies from './pages/AllMovies/AllMovies';
import Profile from './pages/Profile/Profile';
import PageGuard from './components/PageGuard/PageGuard';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={
            <PageGuard>
              <Auth />
            </PageGuard>
          } />
          <Route path="/recommended" element={
            <PageGuard>
              <Recommended />
            </PageGuard>
          } />
          <Route path="/movies" element={
            <PageGuard>
              <AllMovies />
            </PageGuard>
          } />
          <Route path="/profile" element={
            <PageGuard>
              <Profile />
            </PageGuard>
          } />
          <Route path="/" element={<Navigate to="/recommended" replace />} />
          <Route path="*" element={<Navigate to="/recommended" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
