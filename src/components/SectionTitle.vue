<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="w-1 h-8 bg-gradient-to-b from-primary to-primary-light rounded-full"></div>
    <h2 class="text-2xl md:text-3xl font-bold text-default">
      {{ title }}
    </h2>
  </div>
</template>
