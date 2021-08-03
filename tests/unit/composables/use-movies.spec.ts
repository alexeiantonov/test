import { MoviesStore, useMovies } from '@/composables/use-movies';
import { moviesApi } from '@/api/movies-api-impl';
import { generateMovies } from '../../utils/test-utils';

describe('Use movies composable', () => {
  let store: MoviesStore;

  beforeAll(() => {
    store = useMovies();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getPopularMovies', async (): Promise<void> => {
    const spy = jest.spyOn(moviesApi, 'getPopularMovies');
    const mockData = generateMovies(2);
    spy.mockResolvedValue({
      results: mockData
    });
    await store.fetchPopularMovies();
    expect(store.state.popularMovies.length).toEqual(2);
    expect(store.state.popularMovies).toStrictEqual(mockData);
  });
});
