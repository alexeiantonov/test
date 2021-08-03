<template>
  <h1 class="text-3xl mt-10">Watchlist</h1>
  <ul class="mt-20">
    <li v-for="movie in moviesStore.state.watchList" :key="movie.id">
      {{ movie.title }}
      <span
        class="text-red-600 cursor-pointer"
        @click="moviesStore.removeFromWatchList(movie.id)"
      >
        Remove from watchlist
      </span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMovies } from '@/composables/use-movies';

export default defineComponent({
  name: 'Watchlist',
  setup() {
    const moviesStore = useMovies();

    return {
      moviesStore
    };
  }
});
</script>
