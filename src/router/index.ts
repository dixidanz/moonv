import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/Index.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/pages/search/Index.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('@/pages/discover/Index.vue')
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: () => import('@/pages/movie/Index.vue')
    },
    {
      path: '/collection/:id',
      name: 'collection',
      component: () => import('@/pages/collection/Index.vue')
    },
    {
      path: '/now-playing',
      name: 'now-playing',
      component: () => import('@/pages/now-playing/Index.vue')
    },
    {
      path: '/upcoming',
      name: 'upcoming',
      component: () => import('@/pages/upcoming/Index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/404/Index.vue')
    }
  ]
})

export default router
