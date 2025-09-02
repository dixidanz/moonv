import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/Index.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/pages/search/Index.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('@/pages/discover/Index.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('@/pages/movie/Index.vue'),
      meta: { keepAlive: false }
    },
    {
      path: '/collection/:id',
      name: 'collection',
      component: () => import('@/pages/collection/Index.vue'),
      meta: { keepAlive: false }
    },
    {
      path: '/now-playing',
      name: 'now-playing',
      component: () => import('@/pages/now-playing/Index.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/upcoming',
      name: 'upcoming',
      component: () => import('@/pages/upcoming/Index.vue'),
      meta: { keepAlive: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/404/Index.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const keepAliveStore = useKeepAliveStore()

  if (to.name === 'movie' && from.meta?.keepAlive) {
    keepAliveStore.addPage(getPageName(from.name as string))
  } else if (from.name !== 'movie' && to.meta?.keepAlive) {
    keepAliveStore.removePage(getPageName(to.name as string))
  }
})

export const pageNameMap: Record<string, string> = {
  'home': 'HomePage',
  'search': 'SearchPage',
  'discover': 'DiscoverPage',
  'now-playing': 'NowPlayingPage',
  'upcoming': 'UpcomingPage'
}

function getPageName(routeName: string): string {
  return pageNameMap[routeName] || ''
}

export default router
