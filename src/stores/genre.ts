import { defineStore } from 'pinia'
import type { Genre } from '@/types'
import { formatGenres } from '@/utils'

export const useGenreStore = defineStore('genre', () => {
  const genres = ref<Genre[]>([])

  const loadMovieGenre = async () => {
    if (genres.value?.length) return
    const res = await getMovieGenre()
    genres.value = res.genres?.map(genre => ({
      id: genre.id,
      name: formatGenres[genre.name] || genre.name
    }))
  }

  const clearCache = () => {
    genres.value = []
  }

  return {
    genres,
    loadMovieGenre,
    clearCache
  }
})
