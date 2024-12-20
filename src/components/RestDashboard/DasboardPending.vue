<template>
  <div>
    <Navbar />
    <div class="pending-status">
      <div class="content">
        <div class="lock-icon">
          <img src="/lock-icon.png" alt="Lock Icon" />
        </div>
        <div class="text-content">
          <h2 class="font-bold">Ups, status akunmu sekarang adalah</h2>
          <h1 class="status">PENDING</h1>
          <p class="font-semibold">Tunggu tim Terserah untuk memeriksa akun-mu dahulu ya! Jika akun-mu diterima, kami ingatkan lewat email kok jangan takut!</p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Navbar from '../NavbarFooterRestaurant/Navbar.vue'; // Import Navbar
import Footer from '../NavbarFooterRestaurant/Footer.vue'; // Import Footer

import axios from 'axios';

export default {
  name: 'PendingStatus',
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      statusCheckInterval: null, // Untuk menyimpan ID interval
    };
  },
  created() {
    this.startStatusCheck();
  },
  beforeDestroy() {
    // Pastikan interval dihentikan jika komponen dihancurkan
    if (this.statusCheckInterval) {
      clearInterval(this.statusCheckInterval);
    }
  },
  methods: {
    startStatusCheck() {
      // Jalankan pengecekan status setiap 1 menit
      this.statusCheckInterval = setInterval(this.checkStatus, 10000);
    },
    async checkStatus() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BE}/api/restaurant-dashboard/status`);
        const status = response.data.status;

        if (status === 'Active') {
          // Hentikan interval setelah status bukan 'Pending'
          clearInterval(this.statusCheckInterval);
          this.statusCheckInterval = null;

          // Arahkan ke Main Dashboard jika akun aktif
          this.$router.push('/restaurant/dashboard');
        } else if (status === 'Failed') {
          // Hentikan interval setelah status berubah ke 'Failed'
          clearInterval(this.statusCheckInterval);
          this.statusCheckInterval = null;

          // Arahkan ke halaman gagal atau tampilkan notifikasi
          console.error('Account status check failed.');
          this.$router.push('/restaurant/dashboard');
        }
      } catch (error) {
        console.error('Error checking account status:', error.response?.data || error.message);
      }
    },
  },
};
</script>

<style scoped>
.pending-status {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f6f1ed;
  color: #333;
}

.content {
  display: flex;
  align-items: center;
  text-align: left;
  padding: 2em;
}

.lock-icon {
  margin-right: 20px;
}

.lock-icon img {
  width: 350px; /* Sesuaikan ukuran */
  height: 430px; /* Sesuaikan ukuran */
}

.text-content {
  max-width: 700px;
  font-size: 24px;
  margin-left: 100px;
}

.status {
  color: #d87b1c;
  font-size: 3em;
  font-weight: bold;
}
</style>
