import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Registrasi from '../views/Registrasi.vue'
import Searching from '../views/Searching.vue'
import Recommendation from '../views/Recommendation.vue'
import Terserahin from '../views/Terserahin.vue'
import Profil from '../views/Profil.vue'
import Restaurant from '../views/Restaurant.vue'

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
      component: Registrasi
    },
    {
      path: '/search',
      name: 'search',
      component: Searching
    },
    {
      path: '/recom',
      name: 'recom',
      component: Recommendation
    },
    {
      path: '/terserah',
      name: 'terserah',
      component: Terserahin
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil
    },
    {
      path: '/restaurant',
      name: 'restaurant',
      component: Restaurant
    },
  ]
})

export default router
