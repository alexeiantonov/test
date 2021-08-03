<template>
  <div v-if="loading">Loading...</div>
  <div v-else class="m-wrapper">
    <h1 class="text-3xl">{{ movie.title }}</h1>
    <p>{{ movie.overview }}</p>

    <h1 class="text-3xl">Recommendations</h1>
    <!-- RENDER RESULTS -->
    <ul>
      <li v-for="movie in recommendations" :key="movie.id">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Movie } from '@/api/movies-api';
import { useRoute } from 'vue-router';
import { moviesApi } from '@/api/movies-api-impl';

export default defineComponent({
  name: 'Movie',
  setup() {
    const movie = ref<Movie>({} as Movie);
    const recommendations = ref<Movie[]>([] as Movie[]);
    const loading = ref<boolean>(false);
    const route = useRoute();

    return {
      route,
      loading,
      movie,
      recommendations
    };
  },
  async created(): Promise<void> {
    this.loading = true;
    const movieId = this.route.params.id as string;
    const parsedMovieId = Number(movieId);
    const moviesResponse = await moviesApi.getMovieRecommendations(
      parsedMovieId
    );
    this.movie = await moviesApi.getMovie(movieId);
    this.recommendations = moviesResponse.results || [];
    this.loading = false;
  }
});
</script>
