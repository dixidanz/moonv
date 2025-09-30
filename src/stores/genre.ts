import { defineStore } from 'pinia'
import type { Genre } from '@/types'
import { formatGenres } from '@/utils'

export const useGenreStore = defineStore('genre', () => {
  const genres = ref<Genre[]>([])
  const loading = ref(false)

  const loadMovieGenre = async () => {
    if (genres.value?.length) return
    loading.value = true
    const res = await getMovieGenre()
    genres.value = res.genres?.map(genre => ({
      id: genre.id,
      name: formatGenres[genre.name] || genre.name
    }))
    loading.value = false
  }

  const clearCache = () => {
    genres.value = []
  }

  return {
    genres,
    loadMovieGenre,
    loading,
    clearCache
  }
})
