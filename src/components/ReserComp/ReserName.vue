<template>
    <div class="font-[Poppins]">
      <div>
        <div class="p-4 bg-gradient-to-r from-[#5C665C] via-[#9CA69C] to-[#CEDBCE] text-white shadow">
          <div class="flex justify-between lg:mx-28 md:mx-20 mx-10">
            <div>
              <h1 class="font-bold md:text-[20px] text-[17px]">{{ restaurant?.name || 'Loading...' }}</h1>
              <p class="font-bold text-[14px] md:text-[17px] text-[#EDBBCC]">{{ restaurant?.culinary_type || 'Loading...' }}</p>
            </div>
            <div>
              <div v-if="wishlistLoading" class="mt-4">Loading...</div>
              <template v-else>
                <img 
                  v-if="!isInWishlist"
                  class="md:h-5 h-4 mt-4 hover:scale-105 cursor-pointer" 
                  src="/public/lop.png" 
                  alt="Logo" 
                  @click="addToWishlist"
                >
                <p v-else class="text-white font-bold mt-4">Sudah ada di <RouterLink to="/wishlist" class="text-green-700 underline">wishlist</RouterLink> kamu nih!</p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { RouterLink } from 'vue-router';
  
  export default {
    components: {
      RouterLink
    },
    props: {
      restaurantId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        restaurant: null,
        isInWishlist: false,
        wishlistLoading: true,
      };
    },
    methods: {
      async fetchRestaurantData() {
        if (!this.restaurantId) {
          console.error('Restaurant ID is not defined');
          return;
        }
  
        try {
          const response = await axios.get(`http://localhost:3000/restaurant/${this.restaurantId}`);
          this.restaurant = response.data.restaurant;
          await this.checkIfInWishlist();
        } catch (error) {
          console.error('Error fetching restaurant data:', error);
        } finally {
          this.wishlistLoading = false;
        }
      },
      async checkIfInWishlist() {
        try {
          const response = await axios.get('http://localhost:3000/wishlist', {
            withCredentials: true
          });
          this.isInWishlist = response.data.restaurants.some(resto => resto._id === this.restaurantId);
        } catch (error) {
          console.error('Error checking wishlist:', error);
        }
      },
      async addToWishlist() {
        if (!this.restaurantId || this.restaurantId.length !== 24) {
          alert('Invalid restaurant ID.');
          return;
        }
  
        try {
          const response = await axios.post('http://localhost:3000/wishlist', {
            restaurantId: this.restaurantId
          }, {
            withCredentials: true // Ensure credentials are included
          });
          if (response.status === 200) {
            alert('Wishlist berhasil ditambahkan!');
            this.isInWishlist = true;
          }
        } catch (error) {
          console.error('Error adding to wishlist:', error);
          alert('Gagal menambahkan ke wishlist.');
        }
      }
    },
    mounted() {
      console.log('Restaurant ID:', this.restaurantId);
      this.fetchRestaurantData();
    },
  };
  </script>
  
  <style scoped>
  .bg-gradient-to-r {
    background: linear-gradient(to right, #5C665C, #9CA69C, #CEDBCE);
  }
  </style>