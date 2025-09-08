<script setup lang="ts">
import type { MovieDetail, VideoItem } from '@/types'
import { getImageUrl } from '@/api/movie'
import placeholderProfile from '@/assets/images/placeholder-profile.png'
import placeholderPoster from '@/assets/images/placeholder-poster.png'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()

const movie = ref<MovieDetail>({
  id: 0,
  title: '',
  overview: '',
  poster_path: null,
  backdrop_path: null,
  release_date: '',
  vote_average: 0,
  vote_count: 0,
  popularity: 0,
  genre_ids: [],
  adult: false,
  original_language: '',
  original_title: '',
  video: false,
  budget: 0,
  genres: [],
  homepage: null,
  imdb_id: null,
  production_companies: [],
  production_countries: [],
  revenue: 0,
  runtime: null,
  spoken_languages: [],
  status: '',
  tagline: null,
  videos: {
    results: []
  },
  casts: {
    cast: [],
    crew: []
  }
})
const loading = ref(true)

const movieId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? parseInt(id) : 0
})

const youtubeTrailers = computed(() => {
  if (!movie.value?.videos?.results) return []
  return movie.value.videos.results.filter(
    (video: VideoItem) => video.site === 'YouTube' && video.type === 'Trailer'
  )
})

const hasYouTubeTrailer = computed(() => youtubeTrailers.value.length > 0)

const hasImdbId = computed(() => !!movie.value?.imdb_id)

const { t } = useI18n()

const formatRuntime = (minutes: number | null): string => {
  if (!minutes) return t('movie.unknown')
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0
    ? `${hours} ${t('movie.hours')} ${mins} ${t('movie.minutes')}`
    : `${mins} ${t('movie.minutes')}`
}

const openYouTubeTrailer = () => {
  if (hasYouTubeTrailer.value) {
    const trailer = youtubeTrailers.value[0]
    window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')
  }
}

const openImdb = () => {
  if (hasImdbId.value && movie.value?.imdb_id) {
    window.open(`https://www.imdb.com/title/${movie.value.imdb_id}`, '_blank')
  }
}

const loadMovieDetail = async () => {
  if (movieId.value) {
    loading.value = true
    const result = await getMovieDetail(movieId.value)
    if (result && 'id' in result) {
      movie.value = result
      loading.value = false
    } else {
      router.push({ name: 'NotFound' })
    }
  }
}

onMounted(async () => {
  await loadMovieDetail()
})

useLocaleReload(async () => {
  await loadMovieDetail()
})
</script>

<template>
  <LoadingSpinner v-if="loading" />
  <div
    v-else
    class="container mx-auto px-4 py-8">
    <div class="relative rounded-2xl shadow-2xl dark:shadow-black/50 overflow-hidden">
      <div class="flex flex-col lg:flex-row gap-8 p-8">
        <div class="lg:w-2/5 mx-auto">
          <img
            :src="getImageUrl(movie.poster_path || '', 'w500')"
            :alt="movie.title"
            class="w-full max-w-sm lg:max-w-full  rounded-xl shadow-lg"
            @error="(e) => {
              (e.target as HTMLImageElement).src = placeholderPoster
            }" />
        </div>

        <div class="lg:w-3/5 space-y-6 px-4">
          <h1 class="text-4xl font-bold text-default mb-2">
            {{ movie.title }}
          </h1>
          <p
            v-if="movie.original_title !== movie.title"
            class="text-2xl text-default">
            {{ movie.original_title }}
          </p>

          <Badge class="inline-flex items-center gap-1">
            <span class="text-primary drop-shadow-sm icon-[carbon--star-filled]"></span>
            <span class="font-bold dark:text-white text-primary">{{ movie.vote_average?.toFixed(1) }}</span>
          </Badge>

          <div class="grid grid-cols-1 md:grid-cols-2 space-y-6 md:space-y-0">
            <div
              v-if="movie.genres.length > 0"
              class="space-y-2">
              <h3 class="text-2xl font-semibold text-default/60">
                {{ $t('movie.releaseDate') }}
              </h3>
              <p class="text-default tracking-wider">
                {{ $d(new Date(movie.release_date), 'short') }}
              </p>
            </div>

            <div
              v-if="movie.genres.length > 0"
              class="space-y-2">
              <h3 class="text-2xl font-semibold text-default/60">
                {{ $t('movie.runtime') }}
              </h3>
              <p class="text-default">
                {{ formatRuntime(movie.runtime) }}
              </p>
            </div>
          </div>

          <div
            v-if="movie.genres.length > 0"
            class="space-y-2">
            <h3 class="text-2xl font-semibold text-default/60">
              {{ $t('movie.genres') }}
            </h3>
            <div class="flex flex-wrap gap-2">
              <Badge
                v-for="genre of movie.genres"
                :key="genre.id">
                {{ genre.name }}
              </Badge>
            </div>
          </div>

          <div
            v-if="movie.overview"
            class="space-y-2">
            <h3 class="text-2xl font-semibold text-default/60">
              {{ $t('movie.overview') }}
            </h3>
            <p class="text-default text-xl">
              {{ movie.overview }}
            </p>
          </div>

          <div class="space-x-4 flex">
            <button
              v-if="hasYouTubeTrailer"
              class="py-2 px-4 bg-[#FF0233] text-white font-bold rounded-md hover:opacity-90 flex items-center text-lg group"
              @click="openYouTubeTrailer">
              {{ $t('movie.trailer') }}
              <span class="icon-[carbon--arrow-up-right] ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"></span>
            </button>
            <button
              v-if="hasImdbId"
              class="py-2 px-4 bg-[#FEC400] text-black font-bold rounded-md hover:opacity-90 flex items-center text-lg group"
              @click="openImdb">
              IMDb
              <span class="icon-[carbon--arrow-up-right] ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="movie.casts?.cast?.length > 0"
      class="mt-12 space-y-6">
      <SectionTitle :title="$t('title.casts')" />
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
        <div
          v-for="actor of movie.casts.cast"
          :key="actor.id"
          class="text-center group cursor-pointer">
          <div class="relative mb-3">
            <img
              :src="getImageUrl(actor.profile_path, 'w200')"
              :alt="actor.name"
              class="w-full aspect-[3/4] object-cover rounded-lg shadow-xl"
              @error="(e) => {
                (e.target as HTMLImageElement).src = placeholderProfile
              }" />
          </div>
          <h4 class="font-medium text-default text-sm mb-1">
            {{ actor.original_name }}
          </h4>
          <p class="text-xs text-gray-600">
            {{ actor.character }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
