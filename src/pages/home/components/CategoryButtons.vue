<script setup lang="ts">
import Card from './Card.vue'
</script>

<template>
  <div class="relative overflow-hidden py-5 sm:py-10">
    <div class="relative z-10 container mx-auto px-4 py-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 justify-items-center items-center max-w-4xl mx-auto">
        <RouterLink
          to="/now-playing"
          class="flex justify-center items-center w-full">
          <Card
            title="現正熱映"
            gradient-from="#FF6B6B"
            gradient-to="#FF8E53" />
        </RouterLink>

        <RouterLink
          to="/upcoming"
          class="flex justify-center items-center w-full">
          <Card
            title="即將上映"
            gradient-from="#4ECDC4"
            gradient-to="#44A08D" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
