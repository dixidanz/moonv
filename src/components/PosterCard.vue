<script setup lang="ts">
import type { Movie } from '@/types'
import { getImageUrl } from '@/api/movie'
import { formatReleaseYear } from '@/utils'
import placeholderPoster from '@/assets/images/placeholder-poster.png'

withDefaults(defineProps<{
  movie?: Movie
  rank?: number
  loading?: boolean
  width?: string
  height?: string
}>(), {
  width: '100%',
  height: '100%'
})
</script>

<template>
  <div v-if="loading">
    <div
      class="relative w-full h-full rounded-xl overflow-hidden"
      :style="{ width, height }">
      <Skeleton
        height="100%"
        width="100%"
        rounded="rounded-xl" />
      <div class="absolute bottom-0 left-0 right-0 p-4 space-y-2">
        <Skeleton
          height="1rem"
          width="75%" />
        <Skeleton
          height="1.5rem"
          width="3.5rem"
          rounded="rounded-full" />
      </div>
    </div>
  </div>
  <RouterLink
    v-else-if="movie"
    :to="{ name: 'movie', params: { id: movie.id } }"
    class="group cursor-pointer">
    <div
      class="relative w-full h-full block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      :style="{ width, height }">
      <img
        :src="getImageUrl(movie.poster_path || '', 'w500')"
        :alt="movie.title"
        class="w-full h-full object-cover"
        @error="(e) => {
          (e.target as HTMLImageElement).src = placeholderPoster
        }" />

      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      <div
        v-if="rank"
        class="absolute top-3 left-3">
        <div class="relative px-3 py-1 bg-gradient-to-r from-primary via-primary-light to-yellow-400 rounded-lg shadow-xl border-2 border-white/30 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
          <span class="text-white font-black text-lg drop-shadow-lg">
            {{ rank }}
          </span>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 p-4">
        <h3 class="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-md">
          {{ movie.title }}
        </h3>
        <div class="flex items-center gap-2 mt-2">
          <Badge class="flex items-center gap-1">
            <span class="text-primary drop-shadow-sm icon-[carbon--star-filled] text-sm"></span>
            <span class="text-white font-semibold text-sm">{{ movie.vote_average?.toFixed(1) }}</span>
          </Badge>

          <Badge class="group-hover:opacity-100 group-active:opacity-100 opacity-0 transition-opacity duration-500 text-sm">
            {{ formatReleaseYear(movie.release_date) }}
          </Badge>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
