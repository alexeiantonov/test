// Movies API interface definition
// What's interface - @link https://www.tutorialsteacher.com/typescript/typescript-interface
export interface MoviesApi {
  /**
   * Fetches popular movies from the external API
   *
   * @link https://developers.themoviedb.org/3/movies/get-popular-movies
   * @return {Promise<PaginatedResponse>}
   */
  getPopularMovies(request: PaginatedRequest): Promise<PaginatedResponse>;

  /**
   * Fetches single movie details
   *
   * @link https://developers.themoviedb.org/3/movies/get-movie-details
   * @param {string} id - movie identifier
   * @return {Promise<Movie>}
   */
  getMovie(id: string): Promise<Movie>;

  /**
   * Performs a movie search API request
   *
   * @link https://developers.themoviedb.org/3/search/search-movies
   * @param {SearchRequest} request
   * @return {Promise<PaginatedResponse>}
   */
  searchMovies(request: SearchRequest): Promise<PaginatedResponse>;

  // TODO: implement method - get the list of official genres for movies.
  // @link https://developers.themoviedb.org/3/genres/get-movie-list
  getMovieRecommendations(id: number): Promise<PaginatedResponse>;

  // TODO: implement method - get a list of recommended movies for a movie.
  // @link https://developers.themoviedb.org/3/movies/get-movie-recommendations
}

// This interface defines property types of the Movie object that we fetch from the API
export interface Movie {
  poster_path: string;
  title: string;
  id: number;
  adult: boolean;
  video: boolean;
  overview: string;
  release_date: string;
  original_title: string;
  backdrop_path?: string;
  genre_ids?: number[];
  genres?: Genre[];
  status?: Status;
  original_language?: string;
  popularity?: number;
  vote_count?: number;
  vote_average?: number;
}

export interface Genre {
  id?: number;
  name?: string;
}

export enum Status {
  RUMORED,
  PLANNED,
  IN_PRODUCTION,
  POST_PRODUCTION,
  RELEASED,
  CANCELED
}

export interface PaginatedResponse extends PaginationMetadata {
  results: Movie[];
}

export interface PaginationMetadata {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface PaginatedRequest {
  page?: number;
}

export interface SearchRequest extends PaginatedRequest {
  query: string;
  include_adult?: boolean;
  year?: number;
  primary_release_year?: number;
}
