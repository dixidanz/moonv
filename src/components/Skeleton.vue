<script setup lang="ts">
const props = withDefaults(defineProps<{
  class?: string
  height?: string
  width?: string
  rounded?: boolean | string
}>(), {
  class: '',
  height: '1rem',
  width: '100%',
  rounded: true
})

const computedClass = computed(() => {
  const baseClasses = 'bg-gray-300 dark:bg-gray-700 animate-pulse'
  const roundedClass = typeof props.rounded === 'string'
    ? props.rounded
    : props.rounded
      ? 'rounded'
      : ''

  return `${baseClasses} ${roundedClass} ${props.class}`
})

const style = computed(() => ({
  height: props.height,
  width: props.width
}))
</script>

<template>
  <div
    :class="computedClass"
    :style="style"></div>
</template>
