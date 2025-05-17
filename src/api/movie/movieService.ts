import api from '../apiConfig';
import { Movie } from '../../types';

export const movieService = {
  getAllMovies: (search?: string): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies', {params: {search}});
  },

  getRecommendedMovies: (): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies/recommendations');
  },

  getRatedMovies: (): Promise<Movie[]> => {
    return api.get<Movie[]>('/movies/rated');
  },
};
