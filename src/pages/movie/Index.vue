<script setup lang="ts">
import type { MovieDetail, VideoItem } from '@/types'
import { getImageUrl } from '@/api/movie'
import placeholderPoster from '@/assets/images/placeholder-poster.png'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import Stream from './components/Stream.vue'
import Casts from './components/Casts.vue'
import { formatGenres } from '@/utils'

const route = useRoute()
const router = useRouter()

const movie = ref<MovieDetail>({
  'id': 0,
  'title': '',
  'overview': '',
  'poster_path': null,
  'backdrop_path': null,
  'release_date': '',
  'vote_average': 0,
  'vote_count': 0,
  'popularity': 0,
  'genre_ids': [],
  'adult': false,
  'original_language': '',
  'original_title': '',
  'video': false,
  'budget': 0,
  'genres': [],
  'homepage': null,
  'imdb_id': null,
  'production_companies': [],
  'production_countries': [],
  'revenue': 0,
  'runtime': null,
  'spoken_languages': [],
  'status': '',
  'tagline': null,
  'videos': {
    results: []
  },
  'casts': {
    cast: [],
    crew: []
  },
  'watch/providers': {
    results: {}
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

const openPttMovieSearch = (title: string) => {
  const query = encodeURIComponent(title)
  window.open(`https://www.ptt.cc/bbs/movie/search?q=${query}`, '_blank')
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
            <div class="space-y-2">
              <h3 class="text-2xl font-semibold text-default/60">
                {{ $t('movie.releaseDate') }}
              </h3>
              <p class="text-default tracking-wider">
                {{ movie.release_date ? $d(new Date(movie.release_date), 'short') : $t('movie.unknown') }}
              </p>
            </div>

            <div class="space-y-2">
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
                {{ formatGenres[genre.name] || genre.name }}
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

          <div class="space-x-4 flex flex-wrap space-y-2 items-start">
            <button
              v-if="hasYouTubeTrailer"
              class="link_button group bg-[#FF0233] text-white"
              @click="openYouTubeTrailer">
              {{ $t('movie.trailer') }}
              <span class="link_button_icon icon-[carbon--arrow-up-right]"></span>
            </button>
            <button
              v-if="hasImdbId"
              class="link_button group bg-[#FEC400] text-black"
              @click="openImdb">
              IMDb
              <span class="link_button_icon icon-[carbon--arrow-up-right]"></span>
            </button>
            <button
              class="link_button group bg-gray-400 text-black"
              @click="openPttMovieSearch(movie.title)">
              PTT
              <span class="link_button_icon icon-[carbon--arrow-up-right]"></span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <Stream
      class="mt-12"
      :stream="movie['watch/providers']" />
    <Casts
      class="mt-12"
      :casts="movie.casts" />
  </div>
</template>
