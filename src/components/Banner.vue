<script setup lang="ts">
import type { MovieList } from '@/types'
import { register } from 'swiper/element'
import { Pagination, Autoplay } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types'
import { getImageUrl } from '@/api/movie'
import { formatReleaseYear } from '@/utils'
import PaginationStyle from 'swiper/element/css/pagination?url'
import AutoplayStyle from 'swiper/element/css/autoplay?url'

const props = defineProps<{
  list: MovieList['results']
  loading?: boolean
}>()

register()

const params: SwiperOptions = {
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

const activeIndex = ref(0)

const currentItem = computed(() => props.list[activeIndex.value] ?? null)

const onSlideChange = (e: any) => {
  const [swiper] = e.detail
  activeIndex.value = swiper.activeIndex
}

const initializeSwiper = () => {
  activeIndex.value = 0
  const swiperEl = document.querySelector('swiper-container')
  if (swiperEl) {
    if (swiperEl.swiper) {
      swiperEl.swiper.destroy(true, true)
    }
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

onActivated(() => {
  if (!props.loading && props.list.length > 0) {
    nextTick(() => {
      initializeSwiper()
    })
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

  <div
    v-else
    class="relative overflow-hidden shadow-2xl h-160">
    <div class="absolute inset-0">
      <Transition
        name="fade-in"
        mode="out-in">
        <img
          v-if="currentItem"
          :key="currentItem.id"
          :src="getImageUrl(currentItem.backdrop_path || '', 'w780')"
          :srcset="`${getImageUrl(currentItem.backdrop_path || '', 'w300')} 300w,
                    ${getImageUrl(currentItem.backdrop_path || '', 'w780')} 780w,
                    ${getImageUrl(currentItem.backdrop_path || '', 'w1280')} 1280w`"
          sizes="(max-width: 640px) 300w, (max-width: 1024px) 780px, (max-width: 1280px) 1280px"
          :alt="currentItem.title"
          class="absolute inset-0 w-full h-full object-cover object-center sm:object-top" />
      </Transition>
    </div>

    <div class="gradient_overlay absolute inset-0 z-10"></div>

    <div class="absolute inset-0 z-20 flex items-end">
      <swiper-container
        :init="false"
        class="w-full h-full"
        @swiperslidechange="onSlideChange">
        <swiper-slide
          v-for="item of list"
          :key="item.id"
          class="p-8 md:p-12">
          <div class="max-w-2xl text-white space-y-4 w-full">
            <div class="flex flex-wrap items-center gap-4 text-sm md:text-base">
              <Badge>{{ formatReleaseYear(item.release_date) }}</Badge>

              <Badge class="flex items-center gap-2">
                <span class="text-primary drop-shadow-sm icon-[carbon--star-filled]"></span>
                <span class="font-bold text-white">{{ item.vote_average?.toFixed(1) }}</span>
              </Badge>
            </div>
            <h1 class="movie_title text-4xl md:text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent line-clamp-3">
              {{ item.title }}
            </h1>
            <p
              v-if="item.overview"
              class="movie-overview text-lg md:text-xl leading-relaxed text-white/95 line-clamp-3 max-w-3xl">
              {{ item.overview }}
            </p>
            <RouterLink
              :to="{ name: 'movie', params: { id: item.id } }"
              class="my-4 flex w-full sm:w-fit items-center justify-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-md border-2 border-primary text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/30">
              <span class="icon-[carbon--information] text-xl"></span>
              {{ $t('common.moreInfo') }}
            </RouterLink>
          </div>
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
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

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.3s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}

swiper-container {
  --swiper-pagination-bullet-border-radius: 20px;
  --swiper-pagination-bullet-inactive-color: var(--c-primary-light);
}

swiper-slide {
  display: flex;
  align-items: flex-end;
}

swiper-container::part(bullet-active) {
  background-color: var(--c-primary);
  width: 20px;
  transition: width 0.3s, background 0.3s;
}
</style>
