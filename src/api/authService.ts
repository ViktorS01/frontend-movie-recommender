import api from './apiConfig';
import { User, AuthCredentials } from '../types';

// Auth service for handling authentication-related API calls
export const authService = {
  // Login user
  login: (credentials: AuthCredentials): Promise<User> => {
    return api.post<User>('/auth/login', credentials);
  },
  
  // Register user
  register: (userData: AuthCredentials & { name: string }): Promise<User> => {
    return api.post<User>('/auth/register', userData);
  },
  
  // Logout user
  logout: (): Promise<void> => {
    return api.post<void>('/auth/logout', {});
  },
  
  // Get current user profile
  getCurrentUser: (): Promise<User> => {
    return api.get<User>('/auth/me');
  },
  
  // Mock implementation for development
  mockLogin: async (username: string, password: string): Promise<User | null> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock authentication logic
    if (username === 'user1' && password === 'password') {
      return {
        id: 1,
        username: 'user1',
        name: 'John Doe',
        ratedMovies: [
          { movieId: 1, rating: 5 },
          { movieId: 3, rating: 4 },
          { movieId: 5, rating: 3 },
        ],
      };
    }
    
    return null;
  }
};

export default authService;