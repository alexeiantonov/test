<template>
  <main id="bg">
    <Banner></Banner>
    <PopularMoviesList></PopularMoviesList>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PopularMoviesList from '@/components/PopularMoviesList.vue';
import Banner from '@/components/Banner.vue';
import { useMovies } from '@/composables/use-movies';

export default defineComponent({
  name: 'Home',
  components: { Banner, PopularMoviesList },
  setup() {
    // This is composable function where state(data) gets stored and accessed
    const moviesStore = useMovies();

    // this return gives us an access to our data inside <template></template>
    // for example {{ moviesStore.state.popularMovies }}
    return {
      moviesStore
    };
  },
  async created(): Promise<void> {
    // @link https://v3.vuejs.org/guide/composition-api-lifecycle-hooks.html
    // When component gets created we want to fetch popular movies right away
    // to display them on the page
    await this.moviesStore.fetchPopularMovies();
  }
});
</script>
