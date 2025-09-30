<script setup lang="ts">
const { y } = useWindowScroll()

const showHeaderBg = computed(() => (y.value > 320))
</script>

<template>
  <div class="h-16">
    <header
      class="w-full fixed top-0 z-100"
      :class="[{ 'shadow-xl dark:shadow-primary/10 transition-all duration-200 bg-background-main': showHeaderBg }]">
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
            class="text-lg font-semibold text-primary dark:text-default">
            {{ $t('navigation.discover') }}
          </RouterLink>
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
  </div>
</template>
