<script setup lang="ts">
import { RouterLink } from 'vue-router'

const themeStore = useThemeStore()

const handleToggleTheme = () => {
  themeStore.toggleDarkMode()
}
</script>

<template>
  <header class="w-full shadow-xl dark:shadow-primary/10 ">
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
          to="/discover"
          class="text-lg font-semibold text-default hover:text-accent transition-colors duration-200">
          {{ $t('navigation.discover') }}
        </RouterLink>
        <button
          class="rounded-lgs duration-200 flex items-center"
          @click="handleToggleTheme">
          <Transition
            name="sunset"
            mode="out-in">
            <span
              v-if="themeStore.isDarkMode"
              class="icon-[carbon--sun] text-primary text-xl"></span>
            <span
              v-else
              class="icon-[carbon--moon] text-gray-700 text-xl"></span>
          </transition>
        </button>
        <div>
          <RouterLink
            to="/search"
            class="btn_gradient_primary flex items-center gap-1 px-4 py-2 rounded-full min-w-22">
            <span class="icon-[carbon--search]"></span>
            {{ $t('navigation.search') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.sunset-enter-active {
  transition: transform 0.3s ease-out;
}

.sunset-leave-active {
  transition: transform 0.3s ease-in;
}

.sunset-enter-from {
  transform: translateY(-50px);
}

.sunset-enter-to,
.sunset-leave-from {
  transform: translateY(0);
}

.sunset-leave-to {
  transform: translateY(50px);
}
</style>
