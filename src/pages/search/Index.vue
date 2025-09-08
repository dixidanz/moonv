<script setup lang="ts">
import { pageNameMap } from '@/router'

defineOptions({
  name: pageNameMap.search
})

const searchQuery = ref('')
const hasSearched = ref(false)
const currentQuery = ref('')

const { data, loading, hasMore, loadMore: loadMoreData, reload } = useLoadMore(
  (page: number, query: string) => searchMovie(query, page)
)

const search = async (query: string) => {
  if (!query.trim()) return

  hasSearched.value = true
  currentQuery.value = query.trim()
  await reload(currentQuery.value)
}

const loadMore = async () => {
  if (!currentQuery.value) return
  await loadMoreData(currentQuery.value)
}

const searchResults = computed(() => data.value.results)

const handleSearch = () => {
  search(searchQuery.value)
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="bg-main text-default p-6">
    <div class="max-w-6xl mx-auto">
      <div class="mb-8">
        <div class="flex gap-4 max-w-2xl mx-auto">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('common.typeMovieName')"
            class="flex-1 px-4 py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            @keypress="handleKeyPress" />
          <button
            :disabled="!searchQuery.trim() || loading"
            class="btn_gradient_primary min-w-20 px-4 py-3 font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="handleSearch">
            <span v-if="!loading">{{ $t('common.search') }}</span>
            <span v-else>{{ $t('common.searching') }}</span>
          </button>
        </div>
      </div>

      <div v-if="hasSearched">
        <LoadingSpinner v-if="loading && searchResults.length === 0" />
        <div
          v-else-if="searchResults.length === 0"
          class="text-center py-12">
          <p class="text-xl text-default">
            找不到相關電影
          </p>
        </div>

        <MovieList
          v-else
          :movies="searchResults"
          :loading="loading"
          :has-more="hasMore"
          @load="loadMore" />
      </div>
    </div>
  </div>
</template>
