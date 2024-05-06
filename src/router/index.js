import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Registrasi from '../views/Registrasi.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Landing
    },
    {
      path: '/regis',
      name: 'regis',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Registrasi
    }
  ]
})

export default router
