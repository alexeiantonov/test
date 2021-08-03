<template>
  <div v-if="moviesStore.state.loading" class="text-4xl">Loading...</div>
  <section class="hero" v-else> 
    <div class="hero-wrap">
      <div class="hero-shadow">
        
      </div>
      <div class="hero-image"
        
        :style="`background-image: url(${moviesStore.getMovieImage(
        bannerMovie.poster_path
      )}) `"
      ></div>
      <div class="container flexbox-container">
        <div class="hero-info flexbox-item">  
          <h1>{{ bannerMovie.title }}</h1>
          <a href="#" class="btn btn-green" @click="moviesStore.addToWatchlist(bannerMovie)">WATCH LATER</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMovies } from '@/composables/use-movies';

export default defineComponent({
  name: 'Banner',
  setup() {
    const moviesStore = useMovies();

    return {
      moviesStore,
      bannerMovie: moviesStore.getBannerMovie()
    };
  }
});
</script>
