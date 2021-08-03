import { Movie } from '@/api/movies-api';

export const generateRandomString = (length = 6): string => {
  return Math.random().toString(36).substring(2, length);
};

export const generateMovies = (num?: number, title?: string): Movie[] => {
  const size = num ? num : 1;
  const movies: Movie[] = [];
  for (let i = 1; i <= size; i++) {
    movies.push({
      poster_path: generateRandomString(5),
      title: title ? title : generateRandomString(5),
      id: i,
      adult: false,
      video: true,
      overview: generateRandomString(5),
      release_date: generateRandomString(5),
      original_title: generateRandomString(5)
    });
  }
  return movies;
};
