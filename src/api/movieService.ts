import api from './apiConfig';
import { Movie } from '../types';

// Movie service for handling movie-related API calls
export const movieService = {
  // Get all movies
  getAllMovies: (): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies');
  },
  
  // Get recommended movies for the current user
  getRecommendedMovies: (): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies/recommended');
  },
  
  // Get a specific movie by ID
  getMovie: (id: number): Promise<Movie> => {
    return api.get<Movie>(`/movies/${id}`);
  },
  
  // Rate a movie
  rateMovie: (movieId: number, rating: number): Promise<Movie> => {
    return api.post<Movie>(`/movies/${movieId}/rate`, { rating });
  },
  
  // Get user's rated movies
  getRatedMovies: (): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies/rated');
  },
  
  // Mock implementation for development
  mockGetAllMovies: async (): Promise<Movie[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock movies data
    return [
      {
        id: 1,
        title: 'Inception',
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        imageUrl: 'https://via.placeholder.com/300x450?text=Inception',
        genres: ['Action', 'Adventure', 'Sci-Fi'],
        releaseYear: 2010,
      },
      {
        id: 2,
        title: 'The Shawshank Redemption',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        imageUrl: 'https://via.placeholder.com/300x450?text=Shawshank',
        genres: ['Drama'],
        releaseYear: 1994,
      },
      // Add more mock movies as needed
    ];
  },
  
  mockGetRecommendedMovies: async (): Promise<Movie[]> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock recommended movies
    return [
      {
        id: 2,
        title: 'The Shawshank Redemption',
        description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        imageUrl: 'https://via.placeholder.com/300x450?text=Shawshank',
        genres: ['Drama'],
        releaseYear: 1994,
      },
      {
        id: 4,
        title: 'Pulp Fiction',
        description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        imageUrl: 'https://via.placeholder.com/300x450?text=Pulp+Fiction',
        genres: ['Crime', 'Drama'],
        releaseYear: 1994,
      },
      // Add more mock recommended movies as needed
    ];
  },
  
  mockRateMovie: async (movieId: number, rating: number): Promise<Movie> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return the movie with the updated rating
    return {
      id: movieId,
      title: 'Sample Movie',
      description: 'This is a sample movie description.',
      imageUrl: 'https://via.placeholder.com/300x450?text=Sample+Movie',
      genres: ['Drama'],
      releaseYear: 2020,
      rating: rating,
    };
  }
};

export default movieService;