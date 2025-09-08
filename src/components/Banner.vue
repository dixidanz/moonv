<script setup lang="ts">
import type { MovieList } from '@/types'
import { register } from 'swiper/element'
import { Pagination, Autoplay } from 'swiper/modules'
import { getImageUrl } from '@/api/movie'
import { formatReleaseYear } from '@/utils'
import PaginationStyle from 'swiper/element/css/pagination?url'
import AutoplayStyle from 'swiper/element/css/autoplay?url'

const props = defineProps<{
  list: MovieList['results']
  loading?: boolean
}>()

register()

const params = {
  modules: [Pagination, Autoplay],
  injectStylesUrls: [PaginationStyle, AutoplayStyle],
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    clickable: true
  }
}

const initializeSwiper = () => {
  const swiperEl = document.querySelector('swiper-container')
  if (swiperEl) {
    Object.assign(swiperEl, params)
    swiperEl.initialize()
  }
}

watch(() => props.loading, loading => {
  if (!loading && props.list.length > 0) {
    nextTick(() => {
      initializeSwiper()
    })
  }
}, { immediate: true })

onMounted(() => {
  if (!props.loading && props.list.length > 0) {
    initializeSwiper()
  }
})
</script>

<template>
  <div
    v-if="loading"
    class="relative overflow-hidden shadow-2xl h-160">
    <Skeleton
      height="100%"
      width="100%"
      :rounded="false"
      class="absolute inset-0" />
  </div>

  <swiper-container
    v-else
    :init="false"
    class="overflow-hidden shadow-2xl">
    <swiper-slide
      v-for="item of list"
      :key="item.id"
      :loop="list.length >= 3">
      <div class="relative overflow-hidden">
        <img
          :src="getImageUrl(item.backdrop_path || '', 'w780')"
          :srcset="`${getImageUrl(item.backdrop_path || '', 'w300')} 300w,
                    ${getImageUrl(item.backdrop_path || '', 'w780')} 780w,
                    ${getImageUrl(item.backdrop_path || '', 'w1280')} 1280w`"
          sizes="(max-width: 640px) 300w, (max-width: 1024px) 780px, (max-width: 1280px) 1280px"
          :alt="item.title"
          class="w-full h-160 object-cover object-center sm:object-top" />

        <div class="gradient_overlay absolute inset-0"></div>

        <div class="absolute inset-0 flex items-end p-8 md:p-12">
          <div class="max-w-2xl text-white space-y-4">
            <div class="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <Badge>{{ formatReleaseYear(item.release_date) }}</Badge>

              <Badge class="flex items-center gap-2">
                <span class="text-primary drop-shadow-sm icon-[carbon--star-filled]"></span>
                <span class="font-bold text-white">{{ item.vote_average?.toFixed(1) }}</span>
              </Badge>
            </div>
            <h1 class="movie_title text-4xl md:text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              {{ item.title }}
            </h1>
            <p class="movie-overview text-lg md:text-xl leading-relaxed text-white/95 line-clamp-3 max-w-3xl">
              {{ item.overview }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <RouterLink
                :to="{ name: 'movie', params: { id: item.id } }"
                class="btn-shadow flex items-center justify-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md border-2 border-primary text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-105">
                <span class="icon-[carbon--information] text-xl"></span>
                更多資訊
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
  </swiper-container>
</template>

<style scoped>
.gradient_overlay {
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.6) 40%, rgba(15, 23, 42, 0.3) 70%, transparent 80%),
    linear-gradient(0deg, rgba(15, 23, 42, 0.8) 0%, transparent 20%);
}

.movie_title {
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

swiper-container {
  --swiper-pagination-bullet-border-radius: 20px;
  --swiper-pagination-bullet-inactive-color: var(--c-primary-light);
}

swiper-container::part(bullet-active) {
  background-color: var(--c-primary);
  width: 20px;
  transition: width 0.3s, background 0.3s;
}
</style>
