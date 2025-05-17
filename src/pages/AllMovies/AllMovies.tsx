import {useState, useEffect, FC, ChangeEvent} from 'react';
import { movieService, ratingService } from '../../api';
import { Movie } from '../../types';
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import './AllMovies.scss';
import { useDebounce } from '../../hooks/useDebounce';

const ITEMS_PER_PAGE = 6;

const AllMovies: FC = () => {
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchMovies = async (needLoader = true) => {
    needLoader && setIsLoading(true);
    try {
      const allMoviesData = await movieService.getAllMovies(debouncedSearchQuery);
      setAllMovies(allMoviesData);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [debouncedSearchQuery]);

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

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
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

        <div className="all-movies-search">
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearchChange}
              disabled={isLoading}
            />
            <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            {searchQuery && !isLoading && (
              <button
                className="clear-search-button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
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
