import { defineStore } from 'pinia'
import type { TimeWindow } from '@/types'
import { getMoviePopular, getMovieTrending, getMovieTopRate } from '@/api/movie'

export const useMovieStore = defineStore('movie', () => {
  const { isLoading: isLoadingPopular, movies: moviePopular } = useMovieListTemplate()
  const loadMoviePopular = async (page = 1) => {
    if (moviePopular.value?.results?.length) return
    isLoadingPopular.value = true
    moviePopular.value = await getMoviePopular(page)
    isLoadingPopular.value = false
  }

  const { isLoading: isLoadingTrending, movies: movieTrending } = useMovieListTemplate()
  const loadMovieTrending = async (timeWindow: TimeWindow = 'day') => {
    if (movieTrending.value?.results?.length) return
    isLoadingTrending.value = true
    movieTrending.value = await getMovieTrending(timeWindow)
    isLoadingTrending.value = false
  }

  const { data: movieTopRated, loading: isLoadingTopRated, hasMore: hasMoreTopRated, loadMore: loadMoreTopRated, reload: reloadTopRated } = useLoadMore(
    (page: number) => getMovieTopRate(page)
  )
  return {
    moviePopular,
    isLoadingPopular,
    loadMoviePopular,

    movieTrending,
    isLoadingTrending,
    loadMovieTrending,

    movieTopRated,
    isLoadingTopRated,
    hasMoreTopRated,
    loadMoreTopRated,
    reloadTopRated
  }
})
