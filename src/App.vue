<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-background-main">
    <TheHeader />
    <main class="min-h-[calc(100vh-64px-124px)]">
      <RouterView />
    </main>
    <TheFooter />
  </div>
</template>
