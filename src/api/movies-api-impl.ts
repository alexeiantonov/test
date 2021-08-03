import {
  Movie,
  MoviesApi,
  PaginatedRequest,
  PaginatedResponse,
  SearchRequest
} from '@/api/movies-api';

// This class implements our interface definition and it has the fetch logic
// We want to have all requests in one place to avoid repetition
export class MoviesApiImpl implements MoviesApi {
  private readonly apiSecret: string;
  private readonly apiBaseUrl: string;

  constructor() {
    // fetching environment variables from .env/.env.local file
    this.apiSecret = process.env.VUE_APP_MOVIES_SECRET_KEY;
    this.apiBaseUrl = process.env.VUE_APP_MOVIES_BASE_URL;
  }
  getMovieRecommendations(id: number): Promise<PaginatedResponse> {
    const url = `${this.apiBaseUrl}/movie/${id}/recommendations?api_key=${this.apiSecret}`;
    return this.withFetch(url);
  }

  async getPopularMovies(
    request?: PaginatedRequest
  ): Promise<PaginatedResponse> {
    const url = `${this.apiBaseUrl}/movie/popular?api_key=${this.apiSecret}&language=en-US&page=${request?.page}`;
    return this.withFetch(url);
  }

  async searchMovies(request: SearchRequest): Promise<PaginatedResponse> {
    const url = `${this.apiBaseUrl}/search/movie?api_key=${
      this.apiSecret
    }&page=${request?.page || 1}&include_adult=${
      request?.include_adult || false
    }&query=${encodeURIComponent(request?.query)}`;
    return this.withFetch(url);
  }

  async getMovie(id: string): Promise<Movie> {
    // constructs url based on id, so we can pass different ids and get movie details
    const url = `${this.apiBaseUrl}/movie/${id}?api_key=${this.apiSecret}&language=en-US`;
    return this.withFetch(url);
  }

  /**
   * Fetches data from url
   *
   * @param {string} url - movies api resource url
   * @return {Promise<T>} - promise of generic type
   * @private
   */
  private async withFetch<T>(url: string): Promise<T> {
    // private method means that it cannot be accessed outside of this class

    // <T> explanation
    // @link https://www.typescriptlang.org/docs/handbook/2/generics.html
    const fetchResult = await fetch(url);
    return await fetchResult.json();
  }
}

export const moviesApi = new MoviesApiImpl();
