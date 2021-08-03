<template>
  <div class="header-wrap">
    <SearchMovie></SearchMovie>
    <header :class="{ 'headroom--unpinned': scrolled }" class="headroom header">
      <div class="wrap">
        <ul class="site-nav site-nav-first">
          <li><a href="">POPULAR</a></li>
          <li><a href="">NOW PLAYING</a></li>
          <li><a href="">UPCOMING</a></li>

          <li class="header-banner">
            <router-link to="/" class="header-logo">
              <img src="@/assets/images/logo.png" alt="logo" />
            </router-link>
          </li>

          <li>
            <router-link to="/watchlist">
              WATCHLIST
              <span
                class="bg-yellow-500 px-2 rounded font-medium"
                v-if="moviesStore.state.watchList.length"
              >
                {{ moviesStore.state.watchList.length }}
              </span>
            </router-link>
          </li>
          <li><a href="">TV</a></li>
          <li><a href="">MOVIES</a></li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SearchMovie from '@/components/SearchMovie.vue';
import { useMovies } from '@/composables/use-movies';

export default defineComponent({
  name: 'Header',
  components: { SearchMovie },
  setup() {
    const moviesStore = useMovies();
    const scrolled = ref<boolean>(false);

    return {
      moviesStore,
      scrolled
    };
  }
});
</script>
