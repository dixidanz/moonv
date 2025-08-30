<template>
  <footer class="w-full shadow-xl bg-secondary dark:shadow-primary/10 mt-auto">
    <div class="px-6 py-8 text-center">
      <div class="flex items-center justify-center gap-2 mb-4">
        <span class="text-default">Data provided by</span>
        <a
          href="https://www.themoviedb.org"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center hover:opacity-80 transition-opacity duration-200">
          <img
            src="/src/assets/images/tmdb-logo.svg"
            alt="TMDB Logo"
            class="h-4" />
        </a>
      </div>
      <p class="text-sm text-muted">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
  </footer>
</template>
