# API Service Layer

This folder contains the API service layer for the Movie Recommender application. It provides a clean and consistent way to make HTTP requests to the backend API.

## Structure

- `apiConfig.ts`: Configures the Axios instance with default settings and provides helper methods for making HTTP requests.
- `interceptors.ts`: Sets up request and response interceptors for handling authentication and error handling.
- `authService.ts`: Provides methods for authentication-related API calls.
- `movieService.ts`: Provides methods for movie-related API calls.
- `index.ts`: Exports all API services and utilities for easy importing.

## Usage

### Setting the Base URL

You can set the base URL for all API requests using the `setBaseUrl` function:

```typescript
import { setBaseUrl } from './api';

// Set the base URL for all API requests
setBaseUrl('https://api.example.com/v1');
```

### Making API Calls

Import the services you need and use them to make API calls:

```typescript
import { authService, movieService } from './api';

// Authentication
const login = async (username: string, password: string) => {
  try {
    const user = await authService.login({ username, password });
    // Handle successful login
    return user;
  } catch (error) {
    // Handle error
    console.error('Login failed:', error);
    return null;
  }
};

// Get recommended movies
const getRecommendedMovies = async () => {
  try {
    const movies = await movieService.getRecommendedMovies();
    // Handle successful response
    return movies;
  } catch (error) {
    // Handle error
    console.error('Failed to get recommended movies:', error);
    return [];
  }
};

// Rate a movie
const rateMovie = async (movieId: number, rating: number) => {
  try {
    const updatedMovie = await movieService.rateMovie(movieId, rating);
    // Handle successful response
    return updatedMovie;
  } catch (error) {
    // Handle error
    console.error('Failed to rate movie:', error);
    return null;
  }
};
```

### Mock Implementation

For development and testing purposes, each service provides mock implementations that simulate API calls:

```typescript
import { authService, movieService } from './api';

// Mock authentication
const mockLogin = async (username: string, password: string) => {
  try {
    const user = await authService.mockLogin(username, password);
    // Handle successful login
    return user;
  } catch (error) {
    // Handle error
    console.error('Mock login failed:', error);
    return null;
  }
};

// Mock get recommended movies
const mockGetRecommendedMovies = async () => {
  try {
    const movies = await movieService.mockGetRecommendedMovies();
    // Handle successful response
    return movies;
  } catch (error) {
    // Handle error
    console.error('Failed to get mock recommended movies:', error);
    return [];
  }
};
```

## Extending the API Service

To add new API endpoints, create a new service file or extend an existing one:

```typescript
// userService.ts
import api from './apiConfig';
import { User } from '../types';

export const userService = {
  // Get user profile
  getProfile: (): Promise<User> => {
    return api.get<User>('/user/profile');
  },
  
  // Update user profile
  updateProfile: (userData: Partial<User>): Promise<User> => {
    return api.put<User>('/user/profile', userData);
  },
  
  // Mock implementation
  mockGetProfile: async (): Promise<User> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock user data
    return {
      id: 1,
      username: 'user1',
      name: 'John Doe',
      ratedMovies: [],
    };
  },
};

export default userService;
```

Then add it to the `index.ts` file:

```typescript
// index.ts
export { default as userService } from './userService';
```