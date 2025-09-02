<script setup lang="ts">
const keepAliveStore = useKeepAliveStore()
const { keepAlivePages } = storeToRefs(keepAliveStore)
</script>

<template>
  <div class="min-h-screen bg-background-main">
    <TheHeader />
    <main class="min-h-[calc(100vh-64px-124px)]">
      <RouterView v-slot="{ Component, route }">
        <keep-alive :include="keepAlivePages">
          <component
            :is="Component"
            :key="route.fullPath" />
        </keep-alive>
      </RouterView>
    </main>
    <TheFooter />
  </div>
</template>
