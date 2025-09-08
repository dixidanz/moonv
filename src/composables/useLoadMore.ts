import type { MovieList } from '@/types'

export function useLoadMore<T = any>(
  apiFunction: (page: number, ...args: T[]) => Promise<MovieList>
) {
  const data = ref<MovieList>({
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
  })
  const loading = ref(false)

  const fetch = async (page: number, ...args: T[]) => {
    if (loading.value) return

    loading.value = true

    try {
      const result = await apiFunction(page, ...args)

      if (page === 1) {
        data.value = result
      } else {
        data.value = {
          ...result,
          results: [...data.value.results, ...result.results]
        }
      }
    } catch (error) {
      console.error('Load error:', error)
    } finally {
      loading.value = false
    }
  }

  const loadMore = async (...args: T[]) => {
    if (loading.value || data.value.page >= data.value.total_pages) return
    await fetch(data.value.page + 1, ...args)
  }

  const reload = async (...args: T[]) => {
    await fetch(1, ...args)
  }

  const initData = () => {
    data.value = {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0
    }
  }

  const hasMore = computed(() => {
    return data.value.page < data.value.total_pages
  })

  return {
    data,
    loading,
    hasMore,
    fetch,
    loadMore,
    reload,
    initData
  }
}
