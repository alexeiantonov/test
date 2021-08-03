import { computed, ComputedRef, reactive } from 'vue';
import { UnwrapRef } from '@vue/reactivity';
import {
  Movie,
  PaginatedRequest,
  PaginatedResponse,
  SearchRequest
} from '@/api/movies-api';
import { MOVIES_IMAGE_BASE_URL } from '@/constants';
import { moviesApi } from '@/api/movies-api-impl';

// this interface defines our movie state object
// kinda like internal storage where we can cache/persist data
// some info @link https://www.thisdot.co/blog/custom-composable-methods-with-vue-3
export interface MoviesState {
  popularMovies: PaginatedResponse;
  searchMovies: Movie[];
  watchList: Movie[];
  loading: boolean;
  error?: Error;
  imageBasePath?: string;
}

export interface MoviesStore {
  state: Readonly<MoviesState>;

  fetchPopularMovies(request?: PaginatedRequest): Promise<void>;

  searchMovies(request: SearchRequest): Promise<void>;

  getMovieImage(poster: string, size?: number): string;

  getBannerMovie(): ComputedRef<Movie>;

  clearSearchMovies(): void;

  addToWatchlist(movie: UnwrapRef<Movie>): void;

  removeFromWatchList(id: number): void;

  inWatchListAlready(id: number): boolean;
}

// this can be exposed and accessed inside our views/components during setup stage
const state = reactive<MoviesState>({
  popularMovies: {
    results: [],
    page: 0,
    total_pages: 0,
    total_results: 0
  },
  searchMovies: [],
  watchList: [],
  loading: false
});

export const useMovies = (): MoviesStore => {
  /**
   * Performs an API call to fetch popular movies and updates state
   * @return {Promise<void>}
   */
  const fetchPopularMovies = async (
    request?: PaginatedRequest
  ): Promise<void> => {
    const page = request?.page || 1;
    state.loading = true;
    const response = await moviesApi.getPopularMovies({ page });
    state.loading = false;
    state.popularMovies = response;
  };

  /**
   * Performs a search API call and updates state
   *
   * @param {SearchRequest} request
   * @return {Promise<void>}
   */
  const searchMovies = async (request: SearchRequest): Promise<void> => {
    const result = await moviesApi.searchMovies(request);
    state.searchMovies = result?.results || [];
  };

  /**
   * Resets search result
   */
  const clearSearchMovies = (): void => {
    state.searchMovies = [];
  };

  /**
   * Computes an image url based on movie poster property
   * and base path @link https://image.tmdb.org/t/p
   *
   * @param {string} poster - image path
   * @param {number} size - image size
   * @return {string}
   */
  const getMovieImage = (poster: string, size?: number): string => {
    const path = size ? `w${size}` : 'original';
    return `${MOVIES_IMAGE_BASE_URL}/${path}${poster}`;
  };

  /**
   * Picks random movie from the popularMovies array for home banner
   * @returns {ComputedRef<Movie>}
   */
  const getBannerMovie = (): ComputedRef<Movie> => {
    return computed(
      () =>
        state.popularMovies.results[
          Math.floor(Math.random() * state.popularMovies.results.length)
        ]
    );
  };

  /**
   * Checks if movie has already been added to the watchlist
   * @param {number} id - movie id
   * @returns {boolean}
   */
  const inWatchListAlready = (id: number): boolean => {
    return computed(() =>
      state.watchList.some((movieInWatchList) => movieInWatchList.id === id)
    ).value;
  };

  /**
   * Adds movies to the watchlist
   * @param {Movie} movie
   */
  const addToWatchlist = (movie: Movie): void => {
    if (!inWatchListAlready(movie.id)) {
      state.watchList.push(movie);
    }
  };

  /**
   * Removes movie from the watchlist based on id
   * @param {number} id - movie id
   */
  const removeFromWatchList = (id: number): void => {
    state.watchList = state.watchList.filter((movie) => movie.id !== id);
  };

  return {
    state,
    fetchPopularMovies,
    searchMovies,
    getMovieImage,
    getBannerMovie,
    clearSearchMovies,
    addToWatchlist,
    removeFromWatchList,
    inWatchListAlready
  };
};
