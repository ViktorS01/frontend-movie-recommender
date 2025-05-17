import api from '../apiConfig';
import { Movie } from '../../types';

export const movieService = {
  getAllMovies: (): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies');
  },

  getRecommendedMovies: (): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies/recommendations');
  },

  getRatedMovies: (): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies/rated');
  },
};
