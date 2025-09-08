<script setup lang="ts">
const { y } = useWindowScroll()

const isVisible = computed(() => y.value > 400)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-scale">
      <button
        v-show="isVisible"
        class="btn_gradient_primary fixed bottom-38 right-6 z-50 w-12 h-12 flex items-center justify-center group rounded-full md:w-14 md:h-14 md:bottom-33 md:right-8"
        aria-label="回到頂部"
        @click="scrollToTop">
        <span class="icon-[carbon--up-to-top] text-lg md:text-xl group-hover:scale-110 transition-transform duration-200"></span>
      </button>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-scale-enter-active {
  transition: all 0.3s ease-out;
}

.fade-scale-leave-active {
  transition: all 0.3s ease-in;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(1rem) scale(0.75);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
