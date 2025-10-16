<script setup lang="ts">
import { useMovieStore } from '@/stores/movie'

const movieStore = useMovieStore()
const { movieTopRated, isLoadingTopRated, hasMoreTopRated } = storeToRefs(movieStore)

onMounted(async () => {
  if (movieTopRated.value.results.length === 0) {
    await movieStore.reloadTopRated()
  }
})

useLocaleReload(async () => {
  await movieStore.reloadTopRated()
})
</script>

<template>
  <section class="w-full container mx-auto px-2 space-y-6">
    <SectionTitle :title="$t('title.topRated')" />

    <MovieList
      :movies="movieTopRated.results"
      :loading="isLoadingTopRated"
      :has-more="hasMoreTopRated"
      lazy
      @load="movieStore.loadMoreTopRated" />
  </section>
</template>
