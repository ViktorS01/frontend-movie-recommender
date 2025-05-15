import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
  const location = useLocation();
  
  // Check if user is logged in (in a real app, this would come from auth context or state)
  const isLoggedIn = location.pathname !== '/login';
  
  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/">MovieRecommender</Link>
      </div>
      
      {isLoggedIn && (
        <nav className="header__nav">
          <ul>
            <li className={location.pathname === '/recommended' ? 'active' : ''}>
              <Link to="/recommended">Recommended</Link>
            </li>
            <li className={location.pathname === '/movies' ? 'active' : ''}>
              <Link to="/movies">All Movies</Link>
            </li>
            <li className={location.pathname === '/profile' ? 'active' : ''}>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/login" className="logout-btn">Logout</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;