import { useState, useEffect, FC } from 'react';
import { movieService, ratingService } from '../../api';
import { Movie } from '../../types';
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import './AllMovies.scss';

const ITEMS_PER_PAGE = 6;

const AllMovies: FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async (needLoader = true) => {
    needLoader && setIsLoading(true);
    try {
      const allMoviesData = await movieService.getAllMovies();
      setAllMovies(allMoviesData);
    } catch (error) {
      console.error('Error fetching movies:', error);
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
      await fetchMovies(false);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  const handleDeleteRateMovie = async (movieId: number) => {
    try {
      await ratingService.deleteRating(movieId);
      await fetchMovies(false);
    } catch (error) {
      console.error('Error delete rating movie:', error);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                      onDelete={handleDeleteRateMovie}
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
