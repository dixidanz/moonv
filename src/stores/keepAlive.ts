export const useKeepAliveStore = defineStore('keepAlive', () => {
  const keepAlivePages = ref<string[]>([])

  const addPage = (pageName: string) => {
    if (!keepAlivePages.value.includes(pageName)) {
      keepAlivePages.value.push(pageName)
    }
  }

  const removePage = (pageName: string) => {
    const index = keepAlivePages.value.indexOf(pageName)
    if (index > -1) {
      keepAlivePages.value.splice(index, 1)
    }
  }

  return {
    keepAlivePages,
    addPage,
    removePage
  }
})
