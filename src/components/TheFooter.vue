<script setup lang="ts">
const { locale, availableLocales } = useI18n()

const currentLocale = useLocalStorage('moonv-locale', locale.value)

const lacaleName: Record<string, string> = {
  'en-US': 'English',
  'zh-TW': '中文'
}

watchEffect(() => {
  locale.value = currentLocale.value
})
</script>

<template>
  <footer class="w-full shadow-xl bg-secondary dark:shadow-primary/10 mt-auto text-gray-300">
    <div class="px-6 py-8 flex justify-between items-center">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          <span>Data provided by</span>
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center hover:opacity-80 transition-opacity duration-200">
            <img
              src="/src/assets/images/tmdb-logo.svg"
              alt="TMDB Logo"
              class="h-4" />
          </a>
        </div>
        <p class="text-sm">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>

      <div class="flex-shrink-0 ml-4">
        <select
          v-model="currentLocale"
          class="bg-white dark:bg-gray-800 text-default border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option
            v-for="localeKey of availableLocales"
            :key="localeKey"
            :value="localeKey">
            {{ lacaleName[localeKey] || localeKey }}
          </option>
        </select>
      </div>
    </div>
  </footer>
</template>
