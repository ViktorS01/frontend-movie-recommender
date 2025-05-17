import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import './PageGuard.scss';

interface PageGuardProps {
  children: React.ReactNode;
}

const PageGuard: React.FC<PageGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const isTokenValid = validateToken(token);
    setIsAuthenticated(isTokenValid);
  }, []);

  const validateToken = (token: string): boolean => {
    try {
      // Split the token into parts
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode the payload
      const payload = JSON.parse(atob(parts[1]));

      // Check if token is expired
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }

  };

  if (isAuthenticated === null) {
    return (
      <div className="page-guard-loading">
        <div className="loading-spinner"></div>
        <p>Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    localStorage.removeItem('token');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PageGuard;
