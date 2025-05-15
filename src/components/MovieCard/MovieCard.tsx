import React, { useState } from 'react';
import { Movie } from '../../types';
import './MovieCard.scss';

interface MovieCardProps {
  movie: Movie;
  onRate?: (movieId: number, rating: number) => void;
  showRating?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onRate, showRating = true }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  
  const handleRating = (rating: number) => {
    if (onRate) {
      onRate(movie.id, rating);
    }
  };
  
  return (
    <div className="movie-card">
      <div className="movie-card__image">
        <img src={movie.imageUrl} alt={movie.title} />
        <div className="movie-card__year">{movie.releaseYear}</div>
      </div>
      
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        
        <div className="movie-card__genres">
          {movie.genres.map((genre, index) => (
            <span key={index} className="movie-card__genre">{genre}</span>
          ))}
        </div>
        
        <p className="movie-card__description">{movie.description}</p>
        
        {showRating && (
          <div className="movie-card__rating">
            <div className="movie-card__rating-label">Your rating:</div>
            <div className="movie-card__stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`movie-card__star ${
                    (hoveredRating !== null ? hoveredRating >= star : movie.rating && movie.rating >= star)
                      ? 'active'
                      : ''
                  }`}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(null)}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;