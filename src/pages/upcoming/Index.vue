<script setup lang="ts">
import SectionTitle from '@/components/SectionTitle.vue'
import MovieList from '@/components/MovieList.vue'
import { getUpcoming } from '@/api/movie'
import { pageNameMap } from '@/router'

defineOptions({
  name: pageNameMap.upcoming
})

const { data, loading, hasMore, loadMore, reload } = useLoadMore(getUpcoming)

const movies = computed(() => data.value.results)

onMounted(() => {
  reload()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8 space-y-6">
    <SectionTitle title="即將上映" />
    <LoadingSpinner v-if="loading && movies.length === 0" />
    <MovieList
      v-else
      :movies="movies"
      :loading="loading"
      :has-more="hasMore"
      @load="loadMore" />
  </div>
</template>
