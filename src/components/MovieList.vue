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
        class="btn_gradient_primary px-6 py-3 font-semibold rounded-full disabled:cursor-not-allowed cursor-pointer"
        @click="$emit('load')">
        <span v-if="!loading">{{ $t('common.loadmore') }}</span>
        <span v-else>{{ $t('common.loading') }}</span>
      </button>
    </div>
  </div>
</template>
