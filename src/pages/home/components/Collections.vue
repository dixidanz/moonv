<script setup lang="ts">
import { getImageUrl } from '@/api/movie'
import type { Collection } from '@/types'
import placeholderPoster from '@/assets/images/placeholder-poster.png'

const collections = ref<Collection[]>([])
const isLoadingCollections = ref(false)
const loadRandomCollections = async () => {
  isLoadingCollections.value = true
  const randomIds = collectionsId.sort(() => 0.5 - Math.random()).slice(0, 4)

  try {
    const promises = randomIds.map(id => getCollection(id))
    const results = await Promise.all(promises)
    collections.value = results.filter(collection => collection && 'id' in collection)
  } catch (error) {
    collections.value = []
  }

  isLoadingCollections.value = false
}

onMounted(() => {
  loadRandomCollections()
})
</script>

<template>
  <div class="relative overflow-hidden bg-background-main py-4 container mx-auto px-2 space-y-6">
    <SectionTitle
      v-if="collections.length"
      title="系列電影" />

    <div class="relative z-10 container mx-auto px-4 py-4">
      <div
        v-if="isLoadingCollections"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div
          v-for="n of 4"
          :key="n"
          class="aspect-video bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <RouterLink
          v-for="collection of collections"
          :key="collection.id"
          :to="{ name: 'collection', params: { id: collection.id } }"
          class="relative aspect-video rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300">
          <img
            :src="getImageUrl(collection.backdrop_path || '', 'w780')"
            :alt="collection.name"
            class="w-full h-full object-cover"
            @error="(e) => {
              (e.target as HTMLImageElement).src = placeholderPoster
            }" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <h3 class="text-white font-semibold text-lg line-clamp-2">
              {{ collection.name }}
            </h3>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
