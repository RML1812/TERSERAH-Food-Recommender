<template>
  <div class="navbar">
    <router-link to="/restaurant/dashboard" class="nav-item">Main Dashboard</router-link>
    <router-link 
      :to="isAccountActive ? '/restaurant/konten' : null" 
      class="nav-item" 
      :class="{ 'disabled': !isAccountActive }"
      @click.prevent="isAccountActive && fetchContentData()"
    >
      Konten
    </router-link>
    <router-link 
      :to="isAccountActive ? '/restaurant/reservasi' : null" 
      class="nav-item" 
      :class="{ 'disabled': !isAccountActive }"
      @click.prevent="!isAccountActive"
    >
      Reservasi
    </router-link>
    <router-link to="/restaurant/profile" class="nav-item user-info">
      | {{ restaurantName || 'Restaurant' }}
    </router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Navbar',
  setup() {
    const restaurantName = ref('');
    const isAccountActive = ref(true); // Default to active; will be updated
    const restaurantData = ref(null); // Tempat menyimpan data "restaurant"

    // Fungsi untuk mengecek status akun
    const checkAccountStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/restaurant-dashboard/status', {
          withCredentials: true,
        });
        isAccountActive.value = response.data.status === 'Active';
      } catch (error) {
        console.error('Error checking account status:', error.response?.data || error.message);
        isAccountActive.value = false; // Assume inactive if API fails
      }
    };

    // Fungsi untuk mengambil data "restaurant"
      const fetchContentData = async () => {
        try {
          const response = await axios.get('http://localhost:3000/restaurant-dashboard', {
            withCredentials: true,
          });
          const restaurant = response.data.restaurant;
          if (restaurant && restaurant._id) {
            restaurantData.value = { _id: restaurant._id }; // Simpan hanya _id
            localStorage.setItem('restaurantID', restaurant._id); // Menyimpan ID ke local storage
            console.log('Restaurant ID:', restaurantData.value._id);
          } else {
            console.error('Restaurant ID not found.');
          }
        } catch (error) {
          console.error('Error fetching restaurant data:', error.response?.data || error.message);
        }
      };

    // Saat komponen dimuat, lakukan inisialisasi
    onMounted(() => {
      const storedName = localStorage.getItem('restaurantName');
      if (storedName) {
        restaurantName.value = storedName;
      }
      checkAccountStatus();
    });

    return {
      restaurantName,
      isAccountActive,
      fetchContentData, // Ekspos fungsi untuk diakses di template
      restaurantData,
    };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 35px; /* Adjusted padding to reduce vertical space */
  background-color: #c79aa4;
  color: white;
  font-weight: bold;
  position: fixed; /* Fixes the navbar to the top of the viewport */
  top: 0; /* Anchors it to the top */
  left: 0; /* Ensures it spans from the left */
  z-index: 1000; /* Keeps it above other content */
}

.nav-item {
  cursor: pointer;
}

.nav-item.disabled {
  cursor: not-allowed;
  color: #ccc;
}
</style>
