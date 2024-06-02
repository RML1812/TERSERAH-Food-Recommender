import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Registrasi from '../views/Registrasi.vue'
import Searching from '../views/Searching.vue'
import Recommendation from '../views/Recommendation.vue'
import Terserahin from '../views/Terserahin.vue'
import Profil from '../views/Profil.vue'
import Restaurant from '../views/Restaurant.vue'
import Reservasi from '../views/Reservasi.vue'
import ReservasiMu from '../views/ReservasiMu.vue'
import Wishlist from '../views/Wishlist.vue'
import Review from '../views/Review.vue'
import Blog from '../views/Blog.vue'
import Artikel from '../views/Artikel.vue'
import Eror from '../views/Error.vue'
import NoLog from '../views/NoLogin.vue'

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
    {
      path: '/reservasi',
      name: 'reservasi',
      component: Reservasi
    },
    {
      path: '/reservasimu',
      name: 'reservasimu',
      component: ReservasiMu
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: Wishlist
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/artikel',
      name: 'artikel',
      component: Artikel
    },
    {
      path: '/error',
      name: 'error',
      component: Eror
    },
    {
      path: '/nolog',
      name: 'nonog',
      component: NoLog
    },
  ]
})

export default router
