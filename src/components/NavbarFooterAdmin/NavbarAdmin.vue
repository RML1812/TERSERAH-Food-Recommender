<template>
  <div class="navbar">
    <router-link to="/admin/dashboard" class="nav-item">Main Dashboard</router-link>
    <router-link to="/admin/review" class="nav-item">Review Akun</router-link>
    <div class="nav-item user-info" @click="togglePopup" ref="userInfo">
      | {{ username || 'Admin' }}
    </div>

    <div v-if="showPopup" class="popup" :style="popupStyle">
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  data() {
    return {
      showPopup: false,
      popupStyle: {
        top: '0px',
        left: '0px',
      },
      username: null, // To store the logged-in user's name
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  mounted() {
    this.username = localStorage.getItem('userName'); // Retrieve name from localStorage
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;

      if (this.showPopup) {
        const userInfo = this.$refs.userInfo;
        const rect = userInfo.getBoundingClientRect();
        this.popupStyle = {
          top: `${rect.bottom + window.scrollY}px`,
          left: `${rect.left}px`,
        };
      }
    },
    async logout() {
      try {
        console.log('Logging out...');
        await axios.get('http://localhost:3000/logout'); // Call logout endpoint

        this.showPopup = false;
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName'); // Clear username

        this.router.push('/admin');
      } catch (error) {
        console.error('Error logging out:', error);
        alert('An error occurred during logout. Please try again.');
      }
    },
  },
};
</script>


<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 35px;
  background-color: #696969;
  color: white;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.nav-item {
  cursor: pointer;
}

.popup {
  position: absolute;
  background-color: white;
  border-radius: 15px; /* Rounded border */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 2000;
}

.logout-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
}

.logout-button:hover {
  background-color: #ff6666;
}
</style>
