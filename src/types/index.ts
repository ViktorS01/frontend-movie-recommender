export interface Movie {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  genres: string[];
  releaseYear: number;
  rating?: number;
}

export interface User {
  id: number;
  username: string;
  name: string;
  ratedMovies: UserRatedMovie[];
}

export interface UserRatedMovie {
  movieId: number;
  rating: number;
}

export interface AuthCredentialsRequest {
  username: string;
  password: string;
}

export interface AuthCredentialsResponse {
  access_token: string;
}