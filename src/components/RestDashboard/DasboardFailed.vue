<template>
  <Navbar />
  <div class="rejected-status">
    <div class="content">
      <div class="left-section">
        <div class="lock-icon">
          <img src="/lock-icon.png" alt="Lock Icon" />
        </div>
        <button class="settings-button" @click="goToAccountSettings">Pergi ke Pengaturan Akun</button>
      </div>
      <div class="text-content">
        <h2 class="title font-bold">Ups, status akunmu sekarang adalah</h2>
        <h1 class="status">REJECTED</h1>
        <p class="font-semibold">Alasan ditolak:</p>
        <div class="reason-box">
          <p>{{ rejectionReason }}</p>
        </div>
        <p class="font-semibold">
          Jika kamu masih ingin akun-mu diterima, silahkan ubah isian akun-mu di
          <span class="link" @click="goToAccountSettings">Pengaturan Akun</span>. Kami akan selalu menginginkan kamu menjadi bagian dari kami :)
        </p>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import axios from 'axios';

import Navbar from '@/components/NavbarFooterRestaurant/Navbar.vue';
import Footer from '@/components/NavbarFooterRestaurant/Footer.vue';

export default {
  name: 'RejectedStatus',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      rejectionReason: '', // Default reason
    };
  },
  methods: {
    goToAccountSettings() {
      // Navigasi ke halaman pengaturan akun
      this.$router.push('/restaurant/pengaturan-akun');
    },
  },
  async created() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BE}/api/restaurant-dashboard/status`);
      if (response.data.status === 'Failed' && response.data.data) {
        // Menampilkan alasan penolakan dari properti data
        this.rejectionReason = response.data.data.rejection_reason || 'Akunmu ditolak karena alasan yang tidak disebutkan.';
      }
    } catch (error) {
      console.error('Error fetching rejection reason:', error.response?.data || error.message);
    }
  },
};
</script>

<style scoped>
.rejected-status {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f6f1ed;
  color: #333;
}

.content {
  display: flex;
  align-items: flex-start;
  text-align: left;
  padding: 2em;
}

.left-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
}

.lock-icon img {
  width: 350px; 
  height: 430px; 
}

.text-content {
  max-width: 700px;
  font-size: 20px;
  margin-left: 50px;
}

.status {
  color: #ff3b00; /* Bright red color for REJECTED status */
  font-size: 3em;
  font-weight: bold;
}

.reason-box {
  background-color: #fff;
  padding: 1em;
  margin: 1em 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.link {
  color: #d87b1c;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
}
.link:hover {
  color: #b56300; /* Darker shade on hover */
}

.settings-button {
  background-color: #6b6b6b;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 40px;
  width: 300px;
  text-align: center;
  font-size: 20px;
}

.settings-button:hover {
  background-color: #555555; /* Darker shade on hover */
}

.title {
  font-size: 30px;
}
</style>
