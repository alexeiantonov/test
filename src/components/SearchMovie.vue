<template>
  <section class="search-wrap">
    <div class="container wrap">
      <input
        placeholder="Search"
        v-model="searchInput"
        @keyup.enter="onSubmit"
        @keyup="onChange"
        type="text"
        class="
          appearance-none
          min-w-0
          w-full
          bg-white
          border border-gray-300
          rounded-md
          shadow-sm
          text-base text-gray-900
          placeholder-gray-500
          focus:outline-none
          focus:ring-indigo-500
          focus:border-indigo-500
          focus:placeholder-gray-400
        "
      />
      <div class="search-results">
        <div class="container wrap">
          <div
            class="search-quick-item"
            v-for="foundMovie in moviesStore.state.searchMovies"
            :key="foundMovie.id"
          >
            <router-link :to="`/movies/${foundMovie.id}`">
              <img
                class="poster"
                :src="moviesStore.getMovieImage(foundMovie.poster_path, 342)"
                alt="{{ foundMovie.title }}"
              />
              <div class="right">
                <div class="title">
                  {{ foundMovie.title }}
                </div>
              </div>
            </router-link>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMovies } from '@/composables/use-movies';

export default defineComponent({
  name: 'SearchMovie',
  methods: {
    async onSubmit() {
      await this.moviesStore.searchMovies({ query: this.searchInput });
    },
    onChange() {
      if (this.searchInput === '' || this.searchInput == null) {
        this.moviesStore.clearSearchMovies();
      }
    }
  },
  setup() {
    const searchInput = ref<string>('');
    const moviesStore = useMovies();

    return {
      moviesStore,
      searchInput
    };
  }
});
</script>
