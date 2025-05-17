import React, { useState, useEffect } from 'react';
import { movieService, ratingService } from '../../api';
import { Movie } from '../../types';
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import './Recommended.scss';

const ITEMS_PER_PAGE = 6;

const Recommended: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const recommendedMovies = await movieService.getRecommendedMovies();
      setMovies(recommendedMovies);
    } catch (error) {
      console.error('Error fetching recommended movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleRateMovie = async (movieId: number, rating: number) => {
    try {
      await ratingService.rateMovie(movieId, rating);

      setMovies(prevMovies =>
        prevMovies.map(movie =>
          movie.id === movieId ? { ...movie, rating } : movie
        )
      );
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  const handleDeleteRating = async (movieId: number) => {
    try {
      await ratingService.deleteRating(movieId);

      setMovies(prevMovies =>
        prevMovies.map(movie =>
          movie.id === movieId ? { ...movie, rating: undefined } : movie
        )
      );
    } catch (error) {
      console.error('Error delete rating movie:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleRefresh = () => {
    fetchMovies();
  };

  // Calculate pagination
  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = movies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="recommended-page">
      <Header />

      <div className="recommended-content">
        <div className="recommended-header">
          <h1>Recommended Movies</h1>
          <p>Movies we think you'll love based on your ratings</p>
        </div>

        <div className="recommended-buttons">
          <button className="refresh-button" onClick={handleRefresh} disabled={isLoading}>
            <svg className="refresh-icon" viewBox="0 0 24 24">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading recommendations...</p>
          </div>
        ) : (
          <>
            {movies.length === 0 ? (
              <div className="no-movies">
                <p>No recommended movies available. Try rating more movies!</p>
              </div>
            ) : (
              <>
                <div className="movies-grid">
                  {paginatedMovies.map(movie => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      onRate={handleRateMovie}
                      onDelete={handleDeleteRating}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Recommended;
