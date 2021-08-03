import { flushPromises, mount } from '@vue/test-utils';
import PopularMoviesList from '@/components/PopularMoviesList.vue';
import { moviesApi } from '@/api/movies-api-impl';
import { generateMovies } from '../../utils/test-utils';

describe('PopularMoviesList', function () {
  jest.useFakeTimers();

  const MOVIE_ITEM_SELECTOR = '[data-test="popular-movie-item"]';
  const MOVIE_TITLE = 'Trolling title';

  it('should render movies list', async (): Promise<void> => {
    const spy = jest.spyOn(moviesApi, 'getPopularMovies');
    const mockData = generateMovies(5, MOVIE_TITLE);
    spy.mockResolvedValue({ results: mockData });
    const wrapper = mount(PopularMoviesList);
    jest.runAllTimers();
    await flushPromises();

    const movieItems = wrapper.findAll(MOVIE_ITEM_SELECTOR);

    expect(movieItems.length).toEqual(5);
    movieItems.map((item) => {
      expect(item.find('p').text()).toBe(MOVIE_TITLE);
    });
  });
});
