import type { MovieDetail, MovieList, TimeWindow, Collection, NotFound, MovieDiscoverQuery } from '@/types'
import request from '@/utils/request'

const getQuery = () => {
  const locale = localStorage.getItem('moonv-locale')
  return {
    language: locale,
    region: 'TW'
  }
}

export const getImageUrl = (path: string, size: 'w200' | 'w300' | 'w400' | 'w500' | 'w780' | 'w1280' | 'original' = 'w500'): string => {
  if (!path) return ''
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export const getMoviePopular = async (page = 1): Promise<MovieList> => {
  try {
    return await request.get('/movie/popular', { params: { ...getQuery(), page } })
  } catch (error) {
    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    }
  }
}

export const getMovieTrending = async (timeWindow: TimeWindow = 'day'): Promise<MovieList> => {
  try {
    return await request.get(`/trending/movie/${timeWindow}`, { params: { ...getQuery() } })
  } catch (error) {
    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    }
  }
}

export const getMovieTopRate = async (page = 1): Promise<MovieList> => {
  try {
    return await request.get('/movie/top_rated', { params: { ...getQuery(), page } })
  } catch (error) {
    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    }
  }
}

export const getMovieDetail = async (movieId: number): Promise<MovieDetail | NotFound> => {
  try {
    return await request.get(`/movie/${movieId}`, { params: { ...getQuery(), append_to_response: 'videos,casts' } })
  } catch (error) {
    return {
      status_code: 34,
      status_message: 'The resource you requested could not be found.',
      success: false
    }
  }
}

export const getNowPlaying = async (page = 1): Promise<MovieList> => {
  try {
    return await request.get('/movie/now_playing', { params: { ...getQuery(), page } })
  } catch (error) {
    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    }
  }
}

export const getUpcoming = async (page = 1): Promise<MovieList> => {
  try {
    return await request.get('/movie/upcoming', { params: { ...getQuery(), page } })
  } catch (error) {
    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    }
  }
}

export const getCollection = async (collectionId: number): Promise<Collection | NotFound> => {
  try {
    return await request.get(`/collection/${collectionId}`, { params: { ...getQuery() } })
  } catch (error) {
    return {
      status_code: 34,
      status_message: 'The resource you requested could not be found.',
      success: false
    }
  }
}

export const searchMovie = async (queryString: string, page = 1): Promise<MovieList> => {
  try {
    return await request.get('/search/movie', {
      params: {
        ...getQuery(),
        query: queryString,
        page
      }
    })
  } catch (error) {
    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    }
  }
}

export const getMovieDiscover = async (page = 1, queryString?: MovieDiscoverQuery): Promise<MovieList> => {
  try {
    return await request.get('/discover/movie', {
      params: { ...getQuery(), page, ...queryString }
    })
  } catch (error) {
    return {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0
    }
  }
}
