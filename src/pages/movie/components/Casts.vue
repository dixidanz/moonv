<script setup lang="ts">
import type { MovieDetail } from '@/types'
import { getImageUrl } from '@/api/movie'
import placeholderProfile from '@/assets/images/placeholder-profile.png'

const props = defineProps<{
  casts: MovieDetail['casts']
}>()

const initialVisible = 10

const isCastExpanded = ref(false)

const castsList = computed(() => {
  const cast = props.casts?.cast || []
  if (!cast.length) return []
  return isCastExpanded.value ? cast : cast.slice(0, initialVisible)
})
</script>

<template>
  <div
    v-if="casts.cast?.length > 0"
    class="mt-12">
    <SectionTitle :title="$t('title.casts')" />
    <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4 relative mt-6">
      <div
        v-for="actor of castsList"
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
          {{ actor.name }}
        </h4>
        <p class="text-xs text-gray-600">
          {{ actor.character }}
        </p>
      </div>
    </div>

    <button
      v-if="casts.cast?.length > initialVisible"
      class="flex items-center justify-center p-2 text-lg cursor-pointer text-primary mt-4"
      @click="isCastExpanded = !isCastExpanded">
      {{ isCastExpanded ? $t('movie.collapseCast') : $t('movie.expandCast') }}
      <span :class="isCastExpanded ? 'icon-[carbon--chevron-up]' : 'icon-[carbon--chevron-down]'"></span>
    </button>
  </div>
</template>
