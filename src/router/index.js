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
import PaymentFinish from '../views/PaymentFinish.vue'
import Verif from '../views/Verifikasi.vue'
import LogRestaurant from '../views/RestaurantLanding.vue'
import RegRestaurant from '../views/RestaurantRegister.vue'
import ProfileRest from '../views/RestaurantProfile.vue'
import RestaurantDashboard from '@/views/RestaurantDashboard.vue'
import RestaurantKonten from '@/views/RestaurantKonten.vue'
import RestaurantReservasi from '@/views/RestaurantReservasi.vue'
import Admin from '../views/AdminLandingPage.vue'
import DashboardAdmin from '../views/AdminDashboard.vue'
import AdminReview from '../views/AdminReview.vue'
import PengaturanAkunRejected from '@/components/LogRestRestaurant/PengaturanAkunRejected.vue'

import PendingDashboard from '../components/RestDashboard/DasboardPending.vue';
import DasboardFailed from '../components/RestDashboard/DasboardFailed.vue';
import MainDashboard from '../components/RestDashboard/MainDashboardRest.vue';

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
      path: '/restaurant/:restaurantId',
      name: 'restaurant',
      component: Restaurant,
      props: true
    },
    {
      path: '/reservasi/:restaurantId',
      name: 'reservasi',
      component: Reservasi,
      props: true
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
      path: '/restaurant/:restaurantId',
      name: 'review',
      component: Review,
      props: true
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
      path: '/artikel/:artikelId',
      name: 'artikel',
      component: Artikel,
      props: true
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
    {
      path: '/verif',
      name: 'verif',
      component: Verif
    },
    {
      path: '/paymentfinish',
      name: 'paymentFinish',
      component: PaymentFinish
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: Eror
    },
    {
      path: '/account/restaurant/login',
      name: 'LoginAccountRestaurant',
      component: LogRestaurant,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/account/restaurant/register',
      name: 'RegisterAccountRestaurant',
      component: RegRestaurant,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/restaurant/profile',
      name: 'ProfileRestaurant',
      component: ProfileRest,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/restaurant/dashboard',
      name: 'RestaurantDashboard',
      component: RestaurantDashboard,
      meta: { hideNavbarFooter: true },
    },
    {
      path: '/restaurant/main/dashboard',
      name: 'MainDashboard',
      component: MainDashboard,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/restaurant-dashboard/pending',
      name: 'PendingDashboard',
      component: PendingDashboard,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/restaurant-dashboard/failed',
      name: 'FailedDashboard',
      component: DasboardFailed,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/restaurant/pengaturan-akun',
      name: 'PengaturanAkunRejected',
      component: PengaturanAkunRejected,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/restaurant/konten',
      name: 'RestaurantKonten',
      component: RestaurantKonten,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/restaurant/reservasi',
      name: 'RestaurantReservasi',
      component: RestaurantReservasi,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/admin/dashboard',
      name: 'DashboardAdmin',
      component: DashboardAdmin,
      meta: { hideNavbarFooter: true }
    },
    {
      path: '/admin/review',
      name: 'AdminReview',
      component: AdminReview,
      meta: { hideNavbarFooter: true }
    },

  ]
})

export default router
