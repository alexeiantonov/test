<template>
  <div class="container">
    <h1 class="text-3xl font-semi mb-4">Popular movies</h1>
    <!-- Pre-loader to prevent undefined errors while data is being fetched -->
    <div v-if="moviesStore.state.loading" class="lds-grid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <ul
      data-test="popular-movies-list"
      v-else
      role="list"
      class="
        trolling
        grid grid-cols-2
        gap-x-4 gap-y-8
        sm:grid-cols-3 sm:gap-x-6
        lg:grid-cols-4
        xl:gap-x-8
      "
    >
      <!-- For loop to render popular movies -->
      <li
        data-test="popular-movie-item"
        v-for="movie in moviesStore.state.popularMovies.results"
        :key="movie.id"
        class="relative"
      >
        <div
          class="
            group
            block
            w-full
            aspect-w-10 aspect-h-7
            rounded-lg
            focus-within:ring-2
            focus-within:ring-offset-2
            focus-within:ring-offset-gray-100
            focus-within:ring-indigo-500
            overflow-hidden
          "
        >
          <!-- Link to the single movie route /movies/:id -->
          <!-- check src/router/index.ts -->
          <router-link
            :to="`/movies/${movie.id}`"
            type="button"
            class="inset-0 focus:outline-none"
          >
            <img
              :src="moviesStore.getMovieImage(movie.poster_path, 342)"
              alt=""
              class="object-cover pointer-events-none group-hover:opacity-75"
            />
          </router-link>
        </div>
        <p class="mt-2 block text-sm font-medium truncate pointer-events-none">
          {{ movie.title }}
        </p>
        <p class="block text-sm font-medium pointer-events-none">
          {{ movie.release_date }}
        </p>
        <p class="text-yellow-600">
          <span
            v-if="moviesStore.inWatchListAlready(movie.id)"
            class="cursor-not-allowed"
            >Added
          </span>
          <span
            v-else
            @click="moviesStore.addToWatchlist(movie)"
            class="cursor-pointer"
            >Add to watchlist
          </span>
        </p>
      </li>
    </ul>

    <ul>
      <!-- NOT optimized, because we render all pages in one shot, as oppose to dynamic rendering -->
      <li
        v-for="pageNumber in moviesStore.state.popularMovies.total_pages"
        :key="pageNumber"
      >
        <span
          v-if="
            Math.abs(pageNumber - moviesStore.state.popularMovies.page) < 3 ||
            pageNumber === moviesStore.state.popularMovies.total_pages ||
            pageNumber === 1
          "
          @click="moviesStore.fetchPopularMovies({ page: pageNumber })"
          :class="{
            current: moviesStore.state.popularMovies.page === pageNumber,
            last:
              pageNumber === moviesStore.state.popularMovies.total_pages &&
              Math.abs(pageNumber - moviesStore.state.popularMovies.page) > 3,
            first:
              pageNumber === 1 &&
              Math.abs(pageNumber - moviesStore.state.popularMovies.page) > 3
          }"
        >
          {{ pageNumber }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMovies } from '@/composables/use-movies';

export default defineComponent({
  name: 'PopularMoviesList',
  computed: {},
  setup() {
    // This is composable function where state(data) gets stored and accessed
    const moviesStore = useMovies();

    // this return gives us an access to our data inside <template></template>
    // for example {{ moviesStore.state.popularMovies }}

    return {
      moviesStore
    };
  }
});
</script>
