<script setup lang="ts">
import TrendingMovies from './components/TrendingMovies.vue'
import TopRatedMovies from './components/TopRatedMovies.vue'
import Collections from '@/pages/home/components/Collections.vue'

const movieStore = useMovieStore()
const { moviePopular, isLoadingPopular } = storeToRefs(movieStore)

onMounted(() => {
  movieStore.loadMoviePopular()
})
</script>

<template>
  <div class="pb-12">
    <Banner
      :list="[...moviePopular.results].sort(() => Math.random() - 0.5)"
      :loading="isLoadingPopular" />
    <TrendingMovies />
    <Collections />
    <TopRatedMovies />
  </div>
</template>
