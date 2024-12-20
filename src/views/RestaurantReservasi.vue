<script>
import RestaurantReservasi from '@/components/RestaurantReservasi/RestaurantReservasi.vue';
import Navbar from '@/components/NavbarFooterRestaurant/Navbar.vue';
import Footer from '@/components/NavbarFooterRestaurant/Footer.vue';
import axios from 'axios';

export default {
  components: {
    Navbar,
    RestaurantReservasi,
    Footer
  },
  async beforeRouteEnter(to, from, next) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BE}/api/restaurant-dashboard/status`, {
        withCredentials: true,
      });

      const status = response.data.status;

      if (status === 'Pending') {
        // Redirect to pending page
        next({ path: '/restaurant-dashboard/pending' });
      } else if (status === 'Failed') {
        // Redirect to failed page
        next({ path: '/restaurant-dashboard/failed' });
      } else if (status === 'Active') {
        // Allow access to the page
        next();
      } else {
        // Unknown status, redirect to login
        next({ path: '/account/restaurant/login' });
      }
    } catch (error) {
      console.error('Error checking account status:', error.response?.data || error.message);
      next({ path: '/account/restaurant/login' });
    }
  },
};
</script>

<template>
  <Navbar />
  <RestaurantReservasi />
  <Footer />
</template>