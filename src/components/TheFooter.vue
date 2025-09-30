<script setup lang="ts">
const { locale, availableLocales } = useI18n()
const themeStore = useThemeStore()

const currentLocale = useLocalStorage('moonv-locale', locale.value)

const lacaleName: Record<string, string> = {
  'en-US': 'English',
  'zh-TW': '中文'
}

watchEffect(() => {
  locale.value = currentLocale.value
})

const handleToggleTheme = () => {
  themeStore.toggleDarkMode()
}
</script>

<template>
  <footer class="w-full shadow-xl bg-secondary dark:shadow-primary/10 mt-auto text-gray-300">
    <div class="px-6 py-8 flex justify-between items-center flex-col md:flex-row">
      <div class="flex-1 mb-4 md:mb-0">
        <div class="flex items-center gap-2 mb-1 flex-wrap">
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
        <p class="mb-2">
          Streaming data provided by
          <a
            href="https://www.justwatch.com/"
            class="text-[#FACE41]">JustWatch</a>.
        </p>
        <p class="text-sm">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>

      <div class="flex-shrink-0 ml-4 flex flex-col items-end gap-3">
        <button
          class="relative inline-flex h-8 w-23 items-center rounded-full bg-white dark:bg-gray-800 dark:border-gray-600 transition-colors duration-200 focus:outline-none border border-gray-300"
          @click="handleToggleTheme">
          <span class="sr-only">Toggle theme</span>
          <span
            class="h-6 w-6 transform rounded-full bg-primary-light dark:bg-primary shadow-lg transition-transform duration-200 flex items-center justify-center"
            :class="[
              themeStore.isDarkMode ? 'translate-x-16' : 'translate-x-1'
            ]">
            <span
              v-if="themeStore.isDarkMode"
              class="icon-[carbon--moon] text-default text-sm"></span>
            <span
              v-else
              class="icon-[carbon--sun] text-default text-sm"></span>
          </span>
        </button>

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
