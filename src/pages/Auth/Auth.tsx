import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authService } from '../../api';
import { AuthCredentialsRequest } from '../../types';
import './Auth.scss';

const Auth: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
  } = useForm<AuthCredentialsRequest>();

  const onSubmit = async (data: AuthCredentialsRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const { access_token } = await authService.login(data);

      if (access_token) {
        localStorage.setItem('token', access_token);
        navigate('/recommended');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <h1 className="auth-title">Movie Recommender</h1>
          <p className="auth-subtitle">Sign in to get personalized movie recommendations</p>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register('username', { required: 'Username is required' })}
                className={errors.username ? 'error' : ''}
              />
              {errors.username && (
                <span className="error-message">{errors.username.message}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password', { required: 'Password is required' })}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            <button 
              type="submit" 
              className="auth-button" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="auth-info">
            <p>Demo credentials:</p>
            <p>Username: a@test.com</p>
            <p>Password: root</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
