<script setup lang="ts">
import type { Movie } from '@/types'

defineProps<{
  movies: Movie[]
  loading: boolean
  hasMore: boolean
}>()
defineEmits<{
  load: []
}>()
</script>

<template>
  <div>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      <template v-if="loading && movies.length === 0">
        <PosterCard
          v-for="index of 12"
          :key="index"
          loading />
      </template>

      <PosterCard
        v-for="movie of movies"
        :key="movie.id"
        :movie="movie"
        class="p-2" />
    </div>

    <div
      v-if="hasMore"
      class="flex justify-center mt-8">
      <button
        :disabled="loading"
        class="px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 cursor-pointer"
        @click="$emit('load')">
        <span v-if="!loading">載入更多</span>
        <span v-else>載入中...</span>
      </button>
    </div>
  </div>
</template>
