import { useAuthStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/error',
      component: () => import('../views/Error.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/creator',
      name: 'creator',
      component: () => import('../views/Creator.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/auth/patreon',
      component: () => import('../views/patreon/Login.vue'),
    },
    {
      path: '/auth/patreon/callback',
      component: () => import('../views/patreon/Callback.vue'),
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  const { code, state } = to.query
  if (code && state) {
    await authStore.codeExchange(to.path, code, state)
  }

  const { requiresAuth } = to.meta

  // requiresAuth
  if (requiresAuth) {
    const { user } = authStore
    if (!user) {
      authStore.login()
      return
    }
  }

  next()
})

export default router
