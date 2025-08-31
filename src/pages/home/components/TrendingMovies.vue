<script setup lang="ts">
import type { TimeWindow } from '@/types'
import { useMovieStore } from '@/stores/movie'

const movieStore = useMovieStore()
const { movieTrendingDay, movieTrendingWeek, isLoadingTrending } = storeToRefs(movieStore)

const activeTab = ref<TimeWindow>('day')
const movieTrending = computed(() => {
  return activeTab.value === 'day' ? movieTrendingDay.value : movieTrendingWeek.value
})

const scrollContainer = ref<HTMLElement>()

const switchTab = async (timeWindow: TimeWindow) => {
  activeTab.value = timeWindow
  await movieStore.loadMovieTrending(timeWindow)

  // Reset scroll to left
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft = 0
  }
}

onMounted(async () => {
  await switchTab('day')
})
</script>

<template>
  <section class="w-full container mx-auto px-2 py-8">
    <div class="flex items-center justify-between mb-2">
      <SectionTitle title="熱門電影" />
      <div class="flex bg-white/10 rounded-full p-1 border dark:border-white/20 border-black/20">
        <button
          class="px-6 py-2 rounded-full font-semibold transition-color duration-300"
          :class="[
            activeTab === 'day'
              ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
              : 'text-default/70 hover:text-default'
          ]"
          @click="switchTab('day')">
          本日熱門
        </button>
        <button
          class="px-6 py-2 rounded-full font-semibold transition-color duration-300"
          :class="[
            activeTab === 'week'
              ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg'
              : 'text-default/70 hover:text-default'
          ]"
          @click="switchTab('week')">
          本週熱門
        </button>
      </div>
    </div>

    <div
      ref="scrollContainer"
      class="overflow-x-auto overflow-y-hidden py-2 movie_container mt-6">
      <div class="flex gap-4">
        <template v-if="isLoadingTrending">
          <PosterCard
            v-for="index of 10"
            :key="index"
            loading
            width="192px"
            height="288px" />
        </template>

        <template v-else>
          <PosterCard
            v-for="(movie, index) of movieTrending.results"
            :key="movie.id"
            :movie="movie"
            :rank="index + 1"
            width="192px"
            height="288px" />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.movie_container::-webkit-scrollbar {
  height: 5px;
}

.movie_container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.movie_container::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, var(--c-primary), var(--c-primary-light));
  border-radius: 10px;
}

.movie_container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, var(--c-primary-light), var(--c-primary));
}
</style>
