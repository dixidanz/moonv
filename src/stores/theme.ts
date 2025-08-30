import { watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, usePreferredDark, useDark } from '@vueuse/core'

export const useThemeStore = defineStore('theme', () => {
  const preferredDark = usePreferredDark()
  const theme = useLocalStorage<'auto' | 'dark' | 'light'>('theme', 'auto')
  const isDarkMode = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: ''
  })

  watchEffect(() => {
    if (theme.value === 'auto') {
      isDarkMode.value = preferredDark.value
    } else {
      isDarkMode.value = theme.value === 'dark'
    }
  })

  // Create toggle function that updates stored preference
  function toggleDarkMode() {
    if (theme.value === 'auto') {
      // If currently auto, toggle to opposite of current system preference
      theme.value = preferredDark.value ? 'light' : 'dark'
    } else {
      // Toggle between dark and light
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }
  }

  return {
    isDarkMode,
    toggleDarkMode,
    theme,
    preferredDark
  }
})
