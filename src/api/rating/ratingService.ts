import api from '../apiConfig';
import { Movie } from '../../types';

export const ratingService = {
  rateMovie: (movieId: number, rating: number) => {
    return api.put<Movie>(`/rating`, { movieId, rating });
  },

  deleteRating: (movieId: number) => {
    return api.delete(`/rating/${movieId}`);
  }
};
