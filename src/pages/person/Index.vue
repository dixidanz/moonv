<script setup lang="ts">
import type { PersonDetail, PersonCredit } from '@/types'
import { getImageUrl, getPersonDetail } from '@/api/movie'
import placeholderProfile from '@/assets/images/placeholder-profile.png'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const router = useRouter()

const person = ref<PersonDetail | null>(null)
const loading = ref(true)

const personId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? parseInt(id) : 0
})

const hasImdbId = computed(() => !!person.value?.imdb_id)

const { t } = useI18n()

const castCredits = computed(() => {
  if (!person.value?.combined_credits?.cast) return []
  console.log('🚀 ~ person.value?.combined_credits?.cast:', person.value?.combined_credits?.cast)

  const grouped: Record<string, PersonCredit[]> = {}

  const unknownYear = t('person.unknown')

  person.value?.combined_credits?.cast.forEach(credit => {
    if (!credit.title) return
    const year = credit.release_date ? credit.release_date.substring(0, 4) : unknownYear
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(credit)
  })

  return Object.keys(grouped)
    .sort((a, b) => {
      if (a === unknownYear) return 1
      if (b === unknownYear) return -1
      return parseInt(b) - parseInt(a)
    })
    .map(year => ({
      year,
      credits: grouped[year].sort((a, b) => {
        const aDate = a.release_date ? new Date(a.release_date).getTime() : 0
        const bDate = b.release_date ? new Date(b.release_date).getTime() : 0
        return bDate - aDate
      })
    }))
})

const openImdb = () => {
  if (hasImdbId.value && person.value?.imdb_id) {
    window.open(`https://www.imdb.com/name/${person.value.imdb_id}`, '_blank')
  }
}

const loadPersonDetail = async () => {
  if (personId.value) {
    loading.value = true
    const result = await getPersonDetail(personId.value)
    if (result && 'id' in result) {
      person.value = result
      loading.value = false
    } else {
      router.push({ name: 'NotFound' })
    }
  }
}

onMounted(async () => {
  await loadPersonDetail()
})

useLocaleReload(async () => {
  await loadPersonDetail()
})
</script>

<template>
  <LoadingSpinner v-if="loading" />
  <div
    v-else-if="person"
    class="container mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <div class="lg:w-1/4 flex-shrink-0">
        <div class="sticky top-20 space-y-6">
          <div class="rounded-xl shadow-lg overflow-hidden flex justify-center">
            <img
              v-if="person.profile_path"
              :src="getImageUrl(person.profile_path, 'w500')"
              :alt="person.name"
              class="max-w-sm lg:max-w-full rounded-xl shadow-lg"
              @error="(e) => {
                (e.target as HTMLImageElement).src = placeholderProfile
              }" />
            <img
              v-else
              :src="placeholderProfile"
              :alt="person.name"
              class="max-w-sm lg:max-w-full rounded-xl shadow-lg" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-default">
              {{ person.name }}
            </h1>
          </div>
          <div class="space-y-4 border-t border-default/20 pt-4">
            <div
              v-if="person.birthday"
              class="space-y-1">
              <h4 class="text-sm font-semibold text-default/60 uppercase tracking-wide">
                {{ $t('person.birthday') }}
              </h4>
              <p class="text-base text-default">
                {{ $d(new Date(person.birthday), 'short') }}
              </p>
            </div>
            <div
              v-if="person.place_of_birth"
              class="space-y-1">
              <h4 class="text-sm font-semibold text-default/60 uppercase tracking-wide">
                {{ $t('person.placeOfBirth') }}
              </h4>
              <p class="text-base text-default">
                {{ person.place_of_birth }}
              </p>
            </div>
          </div>
          <button
            v-if="hasImdbId"
            class="w-full link_button group bg-[#FEC400] text-black justify-center"
            @click="openImdb">
            IMDb
            <span class="link_button_icon icon-[carbon--arrow-up-right]"></span>
          </button>
        </div>
      </div>

      <div class="lg:w-3/4 space-y-8">
        <div
          v-if="person.biography"
          class="space-y-4">
          <h2 class="text-3xl font-bold text-default">
            {{ $t('person.biography') }}
          </h2>
          <p class="text-default leading-relaxed whitespace-pre-wrap">
            {{ person.biography }}
          </p>
        </div>

        <div v-if="castCredits.length > 0">
          <h2 class="text-3xl font-bold text-default mb-6">
            {{ $t('person.acting') }}
          </h2>

          <div class="space-y-8">
            <div
              v-for="item of castCredits"
              :key="item.year"
              class="space-y-4">
              <h3 class="text-3xl font-bold text-default/70 dark:text-default/30 opacity-50 mb-0">
                {{ item.year }}
              </h3>

              <div class="space-y-2">
                <RouterLink
                  v-for="credit of item.credits"
                  :key="credit.credit_id"
                  :to="{ name: 'movie', params: { id: credit.id } }"
                  class="px-5 py-3 rounded-lg hover:bg-default/5 cursor-pointer transition-colors group block">
                  <h4 class="font-semibold text-default group-hover:text-primary transition-colors">
                    {{ credit.title }}
                  </h4>
                  <p
                    v-if="credit.character"
                    class="text-sm text-default/70 mt-1">
                    {{ $t('person.as') }} <span class="font-medium">{{ credit.character }}</span>
                  </p>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
