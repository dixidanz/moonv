<script setup lang="ts">
defineProps<{
  title: string
  gradientFrom: string
  gradientTo: string
}>()
</script>

<template>
  <div class="mx-auto w-full max-w-sm cursor-pointer group">
    <div class="relative h-64 transform-gpu transition-all duration-700 ease-out group-hover:-rotate-3 group-hover:scale-105">
      <!-- 主要卡片 -->
      <div class="relative w-full h-full z-20 transform-gpu transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl">
        <div
          class="relative w-full h-full rounded-3xl overflow-hidden border border-white/30 backdrop-blur-md"
          :style="{
            background: `linear-gradient(135deg, ${gradientFrom}95, ${gradientTo}85, ${gradientFrom}75, ${gradientTo}95)`,
            boxShadow: `0 20px 40px ${gradientFrom}30, 0 0 0 1px ${gradientFrom}20`
          }">
          <div class="text-center relative h-full flex flex-col justify-center items-center text-white">
            <h3 class="text-4xl font-black tracking-tight leading-tight mb-2 drop-shadow-2xl">
              {{ title }}
            </h3>
            <div class="mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-white/60 to-white/30 transform-gpu transition-all duration-500 group-hover:w-25 group-hover:shadow-lg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
