<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  src?: string
  alt?: string
  lazy?: boolean
  errorImg?: string
  rootMargin?: string
}>(), {
  alt: '',
  lazy: false,
  errorImg: '',
  rootMargin: '120px'
})

const imageRef = useTemplateRef('imageRef')
const isIntersected = ref(!props.lazy)
const isError = ref(false)

if (props.lazy) {
  useIntersectionObserver(imageRef, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isIntersected.value = true
    }
  }, {
    rootMargin: props.rootMargin
  })
}

watch(() => props.src, () => {
  isError.value = false
})

const shouldLoadImage = computed(() => !props.lazy || isIntersected.value)

const displaySrc = computed(() => {
  if (isError.value) {
    return props.errorImg
  }

  if (!props.src) {
    return props.errorImg
  }

  return shouldLoadImage.value ? props.src : ''
})

const onError = () => {
  if (shouldLoadImage.value && props.errorImg) {
    isError.value = true
  }
}
</script>

<template>
  <img
    ref="imageRef"
    v-bind="$attrs"
    :src="displaySrc"
    :alt="alt"
    @error="onError" />
</template>
