<script setup lang="ts">
import type { Collection } from '@/types'
import { getImageUrl } from '@/api/movie'
import placeholderPoster from '@/assets/images/placeholder-poster.png'

const router = useRouter()

const loading = ref(true)
const collection = ref<Collection>({
  id: 0,
  name: '',
  overview: '',
  poster_path: null,
  backdrop_path: null,
  parts: []
})

const route = useRoute()
const collectionId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? parseInt(id) : 0
})

onMounted(async () => {
  if (collectionId.value) {
    const result = await getCollection(collectionId.value)
    if (result && 'id' in result) {
      collection.value = result
      loading.value = false
    } else {
      router.push({ name: 'NotFound' })
    }
  }
})

const collectionParts = computed(() => {
  return [...collection.value.parts].sort((a, b) => {
    return new Date(a.release_date).getTime() - new Date(b.release_date).getTime()
  })
})
</script>

<template>
  <div
    v-if="loading"
    class="p-20">
    <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
  </div>
  <div
    v-else
    class="container mx-auto px-4 pt-12 pb-20">
    <div class="relative rounded-2xl shadow-2xl dark:shadow-black/50 overflow-hidden">
      <div
        v-if="collection.backdrop_path"
        class="absolute inset-0">
        <img
          :src="getImageUrl(collection.backdrop_path, 'w780')"
          class="w-full h-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40"></div>
      </div>

      <div class="relative flex flex-col lg:flex-row gap-8 p-8 min-h-[400px]">
        <div class="lg:w-2/5 flex justify-center lg:justify-start">
          <img
            :src="getImageUrl(collection.poster_path || '', 'w500')"
            :alt="collection.name"
            class="w-full max-w-sm rounded-xl shadow-lg"
            @error="(e) => {
              (e.target as HTMLImageElement).src = placeholderPoster
            }" />
        </div>

        <div class="lg:w-3/5 space-y-6 px-4 flex flex-col justify-center items-start">
          <h1 class="text-4xl font-bold text-white mb-4">
            {{ collection.name }}
          </h1>

          <Badge>
            <span class="font-bold text-white">{{ collection.parts?.length ?? 0 }} 部電影</span>
          </Badge>

          <div
            v-if="collection.overview"
            class="space-y-2">
            <h3 class="text-2xl font-semibold text-white/80">
              簡介
            </h3>
            <p class="text-white text-xl leading-relaxed">
              {{ collection.overview }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="collection.parts.length > 0"
      class="mt-12 space-y-6">
      <SectionTitle title="系列電影" />
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <template v-if="loading">
          <PosterCard
            v-for="index of 6"
            :key="index"
            loading />
        </template>
        <RouterLink
          v-for="movie of collectionParts"
          v-else
          :key="movie.id"
          :to="{ name: 'movie', params: { id: movie.id } }"
          class="group cursor-pointer">
          <PosterCard
            :movie="movie"
            :loading="false"
            width="100%" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
