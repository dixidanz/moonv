<script setup lang="ts">
import type { TimeWindow } from '@/types'
import { useMovieStore } from '@/stores/movie'
import { register } from 'swiper/element'
import { Navigation } from 'swiper/modules'
import NavigationStyle from 'swiper/element/css/navigation?url'

const movieStore = useMovieStore()
const { movieTrendingDay, movieTrendingWeek, isLoadingTrending } = storeToRefs(movieStore)

register()

const params = {
  modules: [Navigation],
  injectStylesUrls: [NavigationStyle],
  slidesPerView: 'auto',
  spaceBetween: 16,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}

const swiperContainer = useTemplateRef('swiperContainer')

const initializeSwiper = () => {
  const swiperEl = swiperContainer.value?.querySelector('swiper-container')
  if (swiperEl) {
    if (swiperEl.swiper) {
      swiperEl.swiper.destroy(true, true)
    }
    Object.assign(swiperEl, params)
    swiperEl.initialize()
  }
}

const activeTab = ref<TimeWindow>('day')

const movieTrending = computed(() => {
  return activeTab.value === 'day' ? movieTrendingDay.value : movieTrendingWeek.value
})

const switchTab = async (timeWindow: TimeWindow) => {
  activeTab.value = timeWindow
  await movieStore.loadMovieTrending(timeWindow)

  await nextTick()
  const swiperEl = swiperContainer.value?.querySelector('swiper-container')
  if (swiperEl?.swiper) {
    swiperEl.swiper.slideTo(0, 0)
  }
}

onMounted(async () => {
  await switchTab('day')
})

useLocaleReload(async () => {
  await switchTab(activeTab.value)
})

onActivated(() => {
  if (isLoadingTrending.value || !movieTrending.value?.results?.length) return
  nextTick(() => {
    initializeSwiper()
  })
})

watch(() => isLoadingTrending.value, loading => {
  if (loading || !movieTrending.value?.results?.length) return
  nextTick(() => {
    initializeSwiper()
  })
}, { immediate: true })
</script>

<template>
  <section class="w-full container mx-auto px-2 py-8">
    <div class="flex items-center justify-between mb-2 @container">
      <SectionTitle :title="$t('title.trending')" />
      <div class="flex bg-white/10 rounded-full p-1 border dark:border-white/20 border-black/20 text-sm @md:text-base">
        <button
          class="px-2 @md:px-6 py-2 rounded-full font-semibold transition-color duration-300"
          :class="[
            activeTab === 'day'
              ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
              : 'text-default/70 hover:text-default'
          ]"
          @click="switchTab('day')">
          {{ $t('trending.day') }}
        </button>
        <button
          class="px-2 @md:px-6 py-2 rounded-full font-semibold transition-color duration-300"
          :class="[
            activeTab === 'week'
              ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
              : 'text-default/70 hover:text-default'
          ]"
          @click="switchTab('week')">
          {{ $t('trending.week') }}
        </button>
      </div>
    </div>

    <div
      ref="swiperContainer"
      class="relative mt-6">
      <template v-if="isLoadingTrending">
        <div class="flex gap-4 py-2">
          <PosterCard
            v-for="index of 2"
            :key="index"
            loading
            width="192px"
            height="288px" />
        </div>
      </template>

      <template v-else>
        <swiper-container :init="false">
          <swiper-slide
            v-for="(movie, index) of movieTrending.results"
            :key="movie.id"
            class="py-2 w-48">
            <PosterCard
              :movie="movie"
              :rank="index + 1"
              width="192px"
              height="288px"
              :lazy="index >= 10" />
          </swiper-slide>
        </swiper-container>

        <button class="swiper-button-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 btn_gradient_primary">
          <span class="icon-[carbon--chevron-left] text-xl"></span>
        </button>
        <button class="swiper-button-next absolute right-0 top-1/2 z-10 -translate-y-1/2 btn_gradient_primary">
          <span class="icon-[carbon--chevron-right] text-xl"></span>
        </button>
      </template>
    </div>
  </section>
</template>

<style scoped>
@reference "@/assets/main.css";

.swiper-button-prev,
.swiper-button-next {
  @apply w-10 h-10 rounded-full flex items-center justify-center border;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  display: none;
}

.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
