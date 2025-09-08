import type { MovieList } from '@/types'

export const useMovieListTemplate = () => {
  const isLoading = ref(false)
  const movies = ref<MovieList>({
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0
  })

  const initMovies = () => {
    movies.value = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    }
  }

  return {
    isLoading,
    movies,
    initMovies
  }
}
