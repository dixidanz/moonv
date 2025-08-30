<script setup lang="ts">
withDefaults(defineProps<{
  active?: boolean
}>(), {
  active: false
})
</script>

<template>
  <span
    class="backdrop-blur-md px-3 py-1 rounded-full font-semibold border transition-all duration-200 cursor-pointer"
    :class="[
      active
        ? 'bg-primary hover:bg-primary/80 border-primary text-white shadow-md'
        : 'dark:bg-white/20 dark:border-white/30 dark:text-white bg-primary/10 border-primary text-primary hover:bg-primary/20'
    ]">
    <slot></slot>
  </span>
</template>
