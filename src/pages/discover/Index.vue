<script setup lang="ts">
import type { MovieDiscoverQuery } from '@/types'
import { genres } from '@/api/genre'
import { pageNameMap } from '@/router'

defineOptions({
  name: pageNameMap.discover
})

const selectedGenres = ref<number[]>([])

const { data, loading, hasMore, loadMore: loadMoreData, reload } = useLoadMore(
  (page: number, query: MovieDiscoverQuery) => getMovieDiscover(page, query)
)
const movies = computed(() => data.value.results)

const currentFilters = computed((): MovieDiscoverQuery => {
  const filters: MovieDiscoverQuery = {}
  if (selectedGenres.value.length > 0) {
    filters.with_genres = selectedGenres.value.join(',')
  }
  return filters
})

const toggleGenre = (genreId: number) => {
  const index = selectedGenres.value.indexOf(genreId)
  if (index === -1) {
    selectedGenres.value.push(genreId)
  } else {
    selectedGenres.value.splice(index, 1)
  }
}

const isGenreSelected = (genreId: number) => {
  return selectedGenres.value.includes(genreId)
}

const loadMore = async () => {
  await loadMoreData(currentFilters.value)
}

watch(currentFilters, async () => {
  await reload(currentFilters.value)
})

onMounted(async () => {
  await reload(currentFilters.value)
})
</script>

<template>
  <div class="container mx-auto bg-main text-default">
    <div class="max-w-7xl mx-auto p-6">
      <div class="mb-8">
        <div class="rounded-xl p-6 shadow-lg dark:shadow-black/50">
          <div class="mb-6">
            <h3 class="text-xl font-medium mb-4 text-default">
              類型
            </h3>
            <div class="flex flex-wrap gap-3">
              <Badge
                v-for="genre of genres"
                :key="genre.id"
                can-click
                :active="isGenreSelected(genre.id)"
                @click="toggleGenre(genre.id)">
                {{ genre.name }}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <LoadingSpinner v-if="loading && movies.length === 0" />
      <div
        v-else-if="movies.length === 0"
        class="text-center py-12">
        <p class="text-xl text-default">
          找不到符合條件的電影
        </p>
      </div>

      <MovieList
        v-else
        :movies="movies"
        :loading="loading"
        :has-more="hasMore"
        @load="loadMore" />
    </div>
  </div>
</template>
