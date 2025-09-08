export function useLocaleReload(reloadFn?: () => void | Promise<void>) {
  const { locale } = useI18n()

  watch(locale, async (newLocale, oldLocale) => {
    if (oldLocale === undefined || newLocale === oldLocale) return

    const movieStore = useMovieStore()
    movieStore.clearCache()

    if (reloadFn) {
      await reloadFn()
    }
  })

  return {
    locale
  }
}
