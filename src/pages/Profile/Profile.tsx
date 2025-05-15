import React, { useState, useEffect } from 'react';
import { authService, movieService } from '../../api';
import { Movie, User } from '../../types';
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import './Profile.scss';

const ITEMS_PER_PAGE = 6;

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data and rated movies from the API
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // In a production environment, we would use authService.getCurrentUser and movieService.getRatedMovies
        // For development/demo, we use the mock implementation

        // Mock user data - in a real app, this would come from authService.getCurrentUser()
        const userData = {
          id: 1,
          username: 'user1',
          name: 'John Doe',
          ratedMovies: [
            { movieId: 1, rating: 5 },
            { movieId: 3, rating: 4 },
            { movieId: 5, rating: 3 },
          ],
        };

        // Get rated movies
        const userRatedMovies = await movieService.mockGetRecommendedMovies(); // Using this as a placeholder

        // In a real implementation, we would filter and add ratings to the movies
        // For now, we'll just add ratings manually
        const ratedMoviesWithRatings = userRatedMovies.map(movie => ({
          ...movie,
          rating: userData.ratedMovies.find(rm => rm.movieId === movie.id)?.rating || 0
        }));

        setUser(userData);
        setRatedMovies(ratedMoviesWithRatings);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleRateMovie = async (movieId: number, rating: number) => {
    try {
      // In a production environment, we would use movieService.rateMovie
      // For development/demo, we use the mock implementation
      const updatedMovie = await movieService.mockRateMovie(movieId, rating);

      // Update the local state to reflect the rating
      setRatedMovies(prevMovies => 
        prevMovies.map(movie => 
          movie.id === movieId ? { ...movie, rating: updatedMovie.rating } : movie
        )
      );

      // Also update the user's rated movies if we were using a real API
      if (user) {
        const updatedRatedMovies = [...user.ratedMovies];
        const existingRatingIndex = updatedRatedMovies.findIndex(rm => rm.movieId === movieId);

        if (existingRatingIndex >= 0) {
          updatedRatedMovies[existingRatingIndex].rating = rating;
        } else {
          updatedRatedMovies.push({ movieId, rating });
        }

        setUser({
          ...user,
          ratedMovies: updatedRatedMovies
        });
      }
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
  const totalPages = Math.ceil(ratedMovies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = ratedMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading profile...</p>
          </div>
        ) : (
          <>
            {user && (
              <div className="profile-header">
                <div className="profile-avatar">
                  <span>{user.name.charAt(0)}</span>
                </div>
                <div className="profile-info">
                  <h1>{user.name}</h1>
                  <p className="profile-username">@{user.username}</p>
                  <div className="profile-stats">
                    <div className="profile-stat">
                      <span className="stat-value">{user.ratedMovies.length}</span>
                      <span className="stat-label">Rated Movies</span>
                    </div>
                    <div className="profile-stat">
                      <span className="stat-value">
                        {user.ratedMovies.length > 0 
                          ? (user.ratedMovies.reduce((sum, movie) => sum + movie.rating, 0) / user.ratedMovies.length).toFixed(1) 
                          : '0.0'}
                      </span>
                      <span className="stat-label">Avg. Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="profile-rated-movies">
              <h2>Your Rated Movies</h2>

              {ratedMovies.length === 0 ? (
                <div className="no-movies">
                  <p>You haven't rated any movies yet.</p>
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
