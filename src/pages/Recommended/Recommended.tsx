import React, { useState, useEffect } from 'react';
import { movieService } from '../../api';
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

  useEffect(() => {
    // Fetch recommended movies from the API
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        // In a production environment, we would use movieService.getRecommendedMovies
        // For development/demo, we use the mock implementation
        const recommendedMovies = await movieService.mockGetRecommendedMovies();
        setMovies(recommendedMovies);
      } catch (error) {
        console.error('Error fetching recommended movies:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleRateMovie = async (movieId: number, rating: number) => {
    try {
      // In a production environment, we would use movieService.rateMovie
      // For development/demo, we use the mock implementation
      const updatedMovie = await movieService.mockRateMovie(movieId, rating);

      // Update the local state to reflect the rating
      setMovies(prevMovies => 
        prevMovies.map(movie => 
          movie.id === movieId ? { ...movie, rating: updatedMovie.rating } : movie
        )
      );
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo(0, 0);
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
