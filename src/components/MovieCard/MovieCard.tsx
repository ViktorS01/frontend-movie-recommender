import { useState, FC } from 'react';
import { Movie } from '../../types';
import './MovieCard.scss';
import fallbackImageUrl from '../../assets/assets_task_01jvcjddyaf1krsa1jtm6rsm97_1747399995_img_0.webp';

interface MovieCardProps {
  movie: Movie;
  onRate?: (movieId: number, rating: number) => void;
  onDelete?: (movieId: number) => void;
  showRating?: boolean;
}

const MovieCard: FC<MovieCardProps> = ({ movie, onRate, showRating = true, onDelete }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [imageError, setImageError] = useState<boolean>(true);

  const handleRating = (rating: number) => {
    if (onRate) {
      onRate(movie.id, rating);
    }
  };

  const handleDelete = (movieId: number) => {
    onDelete?.(movieId);
  };

  return (
    <div className="movie-card">
      <div className="movie-card__image">
        <img src={imageError ? fallbackImageUrl : movie.imageUrl} alt={movie.title} onError={() => setImageError(true)}/>
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
            <div className="movie-card__rating-block">
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
              {movie.rating &&
                <div className='movie-card__rating-delete'>
                  <button className="delete-button" onClick={() => handleDelete(movie.id)}>
                    <svg className="delete-icon" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                      Delete
                  </button>
                </div>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;