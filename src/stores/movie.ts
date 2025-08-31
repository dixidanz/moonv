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

  const { isLoading: isLoadingTrending, movies: movieTrendingDay } = useMovieListTemplate()
  const { movies: movieTrendingWeek } = useMovieListTemplate()
  const loadMovieTrending = async (timeWindow: TimeWindow = 'day') => {
    if (timeWindow === 'day' && movieTrendingDay.value?.results?.length) return
    if (timeWindow === 'week' && movieTrendingWeek.value?.results?.length) return
    isLoadingTrending.value = true
    const res = await getMovieTrending(timeWindow)
    if (timeWindow === 'day') movieTrendingDay.value = res
    else if (timeWindow === 'week') movieTrendingWeek.value = res
    isLoadingTrending.value = false
  }

  const { data: movieTopRated, loading: isLoadingTopRated, hasMore: hasMoreTopRated, loadMore: loadMoreTopRated, reload: reloadTopRated } = useLoadMore(
    (page: number) => getMovieTopRate(page)
  )
  return {
    moviePopular,
    isLoadingPopular,
    loadMoviePopular,

    movieTrendingDay,
    movieTrendingWeek,
    isLoadingTrending,
    loadMovieTrending,

    movieTopRated,
    isLoadingTopRated,
    hasMoreTopRated,
    loadMoreTopRated,
    reloadTopRated
  }
})
