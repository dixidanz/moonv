<script setup lang="ts">
import { RouterLink } from 'vue-router'

const themeStore = useThemeStore()

const handleToggleTheme = () => {
  themeStore.toggleDarkMode()
}
</script>

<template>
  <header class="w-full shadow-xl bg-[var(--c-background-main)] dark:shadow-primary/10">
    <div class="flex items-center justify-between px-6">
      <RouterLink
        to="/"
        class="flex items-center gap-2">
        <img
          src="/src/assets/images/logo.png"
          alt="Logo"
          class="h-16 w-16 object-contain drop-shadow-md" />
      </RouterLink>
      <div class="flex items-center gap-6">
        <RouterLink
          to="/movies"
          class="text-lg font-semibold text-default hover:text-accent transition-colors duration-200">
          探索
        </RouterLink>
        <button
          class="rounded-lgs duration-200 flex items-center"
          @click="handleToggleTheme">
          <span
            v-if="themeStore.isDarkMode"
            class="icon-[carbon--sun] text-yellow-500 text-xl"></span>
          <span
            v-else
            class="icon-[carbon--moon] text-gray-700 text-xl"></span>
        </button>
        <div>
          <RouterLink
            to="/search"
            class="flex items-center gap-1 bg-gradient-to-r from-primary to-primary-light text-white px-4 py-2 rounded-full shadow-md hover:opacity-80 transition-opacity duration-200 min-w-22">
            <span class="icon-[carbon--search]"></span>
            搜尋
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>
