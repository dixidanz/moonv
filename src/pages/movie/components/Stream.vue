<script setup lang="ts">
import type { MovieDetail, MovieProvider } from '@/types'
import { movieProvidersUrl } from '@/utils'

const props = defineProps<{
  stream: MovieDetail['watch/providers']
}>()

const filterStreamProviders = (providers: MovieProvider[] | undefined): MovieProvider[] => {
  if (!providers) return []
  return providers.filter(provider => provider.provider_id && movieProvidersUrl[provider.provider_id])
}

interface StreamList {
  title: string
  list: MovieProvider[]
}

const { t } = useI18n()

const streamList = computed<StreamList[]>(() => {
  const providers = props.stream?.results?.TW
  const list: StreamList[] = []
  if (!providers) return list
  if (providers.flatrate && providers.flatrate.length > 0) {
    list.push({
      title: t('movie.stream'),
      list: filterStreamProviders(providers.flatrate)
    })
  }
  if (providers.buy && providers.buy.length > 0) {
    list.push({
      title: t('movie.buy'),
      list: filterStreamProviders(providers.buy)
    })
  }
  if (providers.rent && providers.rent.length > 0) {
    list.push({
      title: t('movie.rent'),
      list: filterStreamProviders(providers.rent)
    })
  }
  return list
})
</script>

<template>
  <div
    v-if="stream.results?.TW"
    class="space-y-6">
    <div class="flex items-center space-x-4">
      <SectionTitle :title="$t('title.streamingServices')" />
      <a
        v-if="stream.results?.TW?.link"
        class="flex items-center  group hover:dark:bg-white/10 py-0.5 px-2 rounded-sm hover:bg-black/5"
        :href="stream.results?.TW?.link"
        target="_blank">
        <span class="bg-clip-text bg-gradient-to-r from-[#90cea1] to-[#01b4e4] text-transparent font-bold text-lg">TMDB</span>
        <span class="icon-[carbon--arrow-up-right] ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500 text-[#01b4e4]"></span>
      </a>
    </div>
    <div
      v-for="streams of streamList"
      :key="streams.title"
      class="mb-1 pl-4">
      <h3 class="text-xl font-semibold text-default/60 mb-2">
        {{ streams.title }}
      </h3>
      <div class="flex flex-wrap">
        <a
          v-for="item of streams.list"
          :key="item.provider_id"
          :href="movieProvidersUrl[item.provider_id]"
          target="_blank"
          class="mr-4 mb-4 text-lg dark:bg-white/20 dark:border-white/30 dark:text-white bg-primary/10 border-primary text-primary backdrop-blur-md px-3 py-1 rounded-md font-semibold border group flex justify-center items-center">
          <span>{{ item.provider_name }}</span>
          <span class="icon-[carbon--arrow-up-right] ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500"></span>
        </a>
      </div>
    </div>
  </div>
</template>
