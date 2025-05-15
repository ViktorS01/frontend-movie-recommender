import { Movie, User } from '../types';

// Mock movie data
export const movies: Movie[] = [
  {
    id: 1,
    title: 'Inception',
    description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    imageUrl: 'https://via.placeholder.com/300x450?text=Inception',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    releaseYear: 2010,
  },
  {
    id: 2,
    title: 'The Shawshank Redemption',
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    imageUrl: 'https://via.placeholder.com/300x450?text=Shawshank',
    genres: ['Drama'],
    releaseYear: 1994,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    imageUrl: 'https://via.placeholder.com/300x450?text=Dark+Knight',
    genres: ['Action', 'Crime', 'Drama'],
    releaseYear: 2008,
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    imageUrl: 'https://via.placeholder.com/300x450?text=Pulp+Fiction',
    genres: ['Crime', 'Drama'],
    releaseYear: 1994,
  },
  {
    id: 5,
    title: 'The Matrix',
    description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    imageUrl: 'https://via.placeholder.com/300x450?text=The+Matrix',
    genres: ['Action', 'Sci-Fi'],
    releaseYear: 1999,
  },
  {
    id: 6,
    title: 'Forrest Gump',
    description: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.',
    imageUrl: 'https://via.placeholder.com/300x450?text=Forrest+Gump',
    genres: ['Drama', 'Romance'],
    releaseYear: 1994,
  },
  {
    id: 7,
    title: 'The Godfather',
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    imageUrl: 'https://via.placeholder.com/300x450?text=The+Godfather',
    genres: ['Crime', 'Drama'],
    releaseYear: 1972,
  },
  {
    id: 8,
    title: 'Fight Club',
    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
    imageUrl: 'https://via.placeholder.com/300x450?text=Fight+Club',
    genres: ['Drama'],
    releaseYear: 1999,
  },
  {
    id: 9,
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    imageUrl: 'https://via.placeholder.com/300x450?text=Interstellar',
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    releaseYear: 2014,
  },
  {
    id: 10,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    imageUrl: 'https://via.placeholder.com/300x450?text=LOTR',
    genres: ['Adventure', 'Drama', 'Fantasy'],
    releaseYear: 2001,
  },
];

// Mock user data
export const user: User = {
  id: 1,
  username: 'user1',
  name: 'John Doe',
  ratedMovies: [
    { movieId: 1, rating: 5 },
    { movieId: 3, rating: 4 },
    { movieId: 5, rating: 3 },
  ],
};

// Helper function to get recommended movies (movies not rated by the user)
export const getRecommendedMovies = (): Movie[] => {
  const ratedMovieIds = user.ratedMovies.map(rm => rm.movieId);
  return movies.filter(movie => !ratedMovieIds.includes(movie.id));
};

// Helper function to get rated movies with ratings
export const getRatedMovies = (): Movie[] => {
  return user.ratedMovies.map(ratedMovie => {
    const movie = movies.find(m => m.id === ratedMovie.movieId);
    return { ...movie!, rating: ratedMovie.rating };
  });
};

// Mock authentication function
export const authenticate = (username: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === 'user1' && password === 'password') {
        resolve(user);
      } else {
        resolve(null);
      }
    }, 500); // Simulate network delay
  });
};