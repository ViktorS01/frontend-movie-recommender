export type Movie = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  genres: string[];
  releaseYear: number;
  rating?: number;
}
