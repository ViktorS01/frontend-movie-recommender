import { useState, useEffect, FC } from 'react';
import { profileService, movieService, ratingService } from '../../api';
import { Movie } from '../../types';
import Header from '../../components/Header/Header';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/Pagination/Pagination';
import './Profile.scss';

import { Profile as ProfileType } from '../../types';

const ITEMS_PER_PAGE = 6;

const Profile: FC = () => {
  const [user, setUser] = useState<ProfileType | null>(null);
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async (needLoader = true) => {
    needLoader && setIsLoading(true);
    try {
      const profile = await profileService.getProfile();
      const ratedMovies = await movieService.getRatedMovies();

      setUser(profile);
      setRatedMovies(ratedMovies);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleRateMovie = async (movieId: number, rating: number) => {
    try {
      await ratingService.rateMovie(movieId, rating);
      await fetchUserData(false);
    } catch (error) {
      console.error('Error rating movie:', error);
    }
  };

  const handleDeleteRateMovie = async (movieId: number) => {
    try {
      await ratingService.deleteRating(movieId);
      await fetchUserData(false);
    } catch (error) {
      console.error('Error delete rating movie:', error);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
                  <span>{user.username.charAt(0)}</span>
                </div>
                <div className="profile-info">
                  <h1>{user.username}</h1>
                  <p className="profile-username">@{user.tag}</p>
                  <div className="profile-stats">
                    <div className="profile-stat">
                      <span className="stat-value">{user.rating.quantity}</span>
                      <span className="stat-label">Rated Movies</span>
                    </div>
                    <div className="profile-stat">
                      <span className="stat-value">
                        {user.rating.average}
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
