import React, { useState, useEffect } from 'react';
import { movieService } from '../../api';
import { Movie } from '../../types';
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import './AllMovies.scss';

const ITEMS_PER_PAGE = 6;

const AllMovies: React.FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch all movies from the API
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        // In a production environment, we would use movieService.getAllMovies
        // For development/demo, we use the mock implementation
        const allMoviesData = await movieService.mockGetAllMovies();
        setAllMovies(allMoviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
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
      setAllMovies(prevMovies => 
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
  const totalPages = Math.ceil(allMovies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = allMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="all-movies-page">
      <Header />

      <div className="all-movies-content">
        <div className="all-movies-header">
          <h1>All Movies</h1>
          <p>Browse and rate our collection of movies</p>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading movies...</p>
          </div>
        ) : (
          <>
            {allMovies.length === 0 ? (
              <div className="no-movies">
                <p>No movies available.</p>
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

export default AllMovies;
