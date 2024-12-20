<template>
  <!-- Title Section -->
  <div class="title-section">
    <h1 class="title"><span class="text-[#C2CFC2]">Main</span> Dashboard</h1>
  </div>
  <div class="main-dashboard">
    <!-- Date Range and Filter Controls -->
    <div class="filters">
      <button class="filter-button">All Time</button>
      <input type="date" v-model="startDate" class="date-input" />
      <span>-</span>
      <input type="date" v-model="endDate" class="date-input" />
      <button class="filter-button">Same Day</button>
      <button class="apply-button" @click="fetchDashboardData">Apply</button>
    </div>
    <p class="info-text">Naik/turun angka dibandingkan dengan range waktu yang sama</p>

      <!-- Stacked Cards for Statistics -->
      <div class="dashboard-content">
        <!-- Total Klik and Total Wishlist -->
        <div class="section-card">
          <div class="stat-card">
            <p class="stat-title">Total Klik</p>
            <p class="stat-value">{{ dashboardData.totalUserInteractions }}</p>
          </div>
          <div class="stat-card">
            <p class="stat-title">Total Wishlist</p>
            <p class="stat-value">{{ dashboardData.wishlistCount }}</p>
          </div>
        </div>
      
        <!-- Total Reservasi and Total Pemasukan -->
        <div class="section-card">
          <div class="stat-card">
            <p class="stat-title">Total Reservasi</p>
            <p class="stat-value">{{ dashboardData.totalReservations }}</p>
          </div>
          <div class="stat-card">
            <p class="stat-title">Total Pemasukan</p>
            <p class="stat-value">Rp {{ dashboardData.totalRevenue }}</p>
          </div>
        </div>
      
        <!-- Total Rating and Total Review -->
        <div class="section-card">
          <div class="stat-card">
            <p class="stat-title">Total Rating</p>
            <p class="stat-value">⭐ {{ restaurant.overall_rating || "N/A" }}</p>
          </div>
          <div class="stat-card">
            <p class="stat-title">Total Review</p>
            <p class="stat-value">{{ dashboardData.reviews.length }}</p>
          </div>
        </div>
      
      <!-- Centered Button Container -->
      <div class="review-button-container">
        <button class="review-button" @click="showModal = true">Lihat Review</button>
      </div>
    </div>
  </div>

  <!-- Review Modal -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h2 class="modal-title">Review <span class="highlight">Restaurant-mu</span></h2>
        <button class="close-button" @click="closeModal">✕</button>
      </div>

      <!-- Reviews Section -->
      <div class="reviews">
        <div class="review-card" v-for="(review, index) in reviews" :key="index">
          <div class="review-header">
            <!-- Ambil Nama dari ratings._id.name -->
            <p class="review-username">{{ review.username }}</p>
            <p class="review-date">{{ review.date }}</p>
          </div>
          <p class="review-text">{{ review.text }}</p>
          <div class="review-footer">
            <button class="action-button">🗑️</button>
            <!-- Ambil Total Rating dari restaurant.overall_rating -->
            <button class="rating-button" @click="openRatingModal(review)">
              Total Rating ⭐ {{ review.rating_id.combined_rating || "N/A" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Modal untuk Rating Details -->
      <div v-if="showRatingModal" class="modal-overlay" @click.self="closeRatingModal">
        <div class="modal-content rating-details">
          <!-- Modal Header -->
          <div class="modal-header modal-header-rating-details">
            <h2>
              <span class="text-[#C2CFC2]">Rating</span> Details <span class="text-[#C2CFC2]">{{ selectedRating.username || "Anonymous" }} </span>
            </h2>
            <button class="close-button" @click="closeRatingModal">✕</button>
          </div>

          <!-- Ratings Detail -->
          <div class="ratings-detail">
            <p><strong>Combined Rating:</strong> {{ selectedRating.combined_rating }}</p>
            <p><strong>Ambience Rating:</strong> {{ selectedRating.ambience_rating }}</p>
            <p><strong>Taste to Price Rating:</strong> {{ selectedRating.taste_to_price_rating }}</p>
            <p><strong>Service Rating:</strong> {{ selectedRating.service_rating }}</p>
            <p><strong>Cleanliness Rating:</strong> {{ selectedRating.cleanliness_rating }}</p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button class="pagination-button" @click="goToPreviousPage" :disabled="currentPage === 1">«</button>
        <button class="pagination-button" @click="goToPreviousPage" :disabled="currentPage === 1">‹</button>
        <span class="mt-2">{{ currentPage }} dari {{ Math.ceil(totalReviews / reviewsPerPage) }}</span>
        <button class="pagination-button" @click="goToNextPage" :disabled="currentPage === Math.ceil(totalReviews / reviewsPerPage)">›</button>
        <button class="pagination-button" @click="goToNextPage" :disabled="currentPage === Math.ceil(totalReviews / reviewsPerPage)">»</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MainDashboard',
  data() {
    return {
      currentPage: 1, // Halaman aktif
      reviewsPerPage: 5, // Jumlah review per halaman
      totalReviews: 0, // Total jumlah review (diisi dari respons backend)
      reviews: [], // Data ulasan
      paginatedReviews: [], // Ulasan yang ditampilkan per halaman
      showRatingModal: false, // Status modal untuk rating
      showModal: false, // Status modal ulasan
      selectedRating: {}, // Data rating yang dipilih untuk modal detail rating
      startDate: '', // Tanggal mulai untuk filter
      endDate: '', // Tanggal akhir untuk filter
      dashboardData: {
        wishlistCount: 0,
        totalReservations: 0,
        totalRevenue: 0,
        reviews: [], // Data reviews dari backend
        totalUserInteractions: 0,
      },
      restaurant: {
        overall_rating: 0, // Rating keseluruhan restoran
      },
    };
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BE}/restaurant-dashboard`, {
          params: {
            start_date: this.startDate,
            end_date: this.endDate,
          },
          withCredentials: true, // Sertakan cookie sesi
        });

        // Simpan data dari respons backend
        this.dashboardData = response.data;

        // Mapping data reviews
        this.reviews = response.data.reviews.map(review => ({
          username: review.user_id?.name || 'Anonymous',
          date: review.review_date || 'N/A',
          text: review.review || 'No review provided.',
          rating_id: review.rating_id || {},
        }));

        this.totalReviews = this.reviews.length;
        this.updatePaginatedReviews();

        // Simpan overall rating restoran
        this.restaurant.overall_rating = response.data.restaurant?.overall_rating || 0;
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        alert('Failed to load dashboard data.');
        this.$router.push('/account/restaurant/login');
      }
    },

    async checkAccountStatus() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BE}/api/restaurant-dashboard/status`, {
          withCredentials: true, // Sertakan cookie sesi
        });

        const status = response.data.status;

        if (status === 'Pending') {
          this.$router.push('/restaurant-dashboard/pending');
        } else if (status === 'Failed') {
          this.$router.push('/restaurant-dashboard/failed');
        } else if (status === 'Active') {
          // Status Active, lanjutkan
          await this.fetchDashboardData();
        }
      } catch (error) {
        console.error('Error checking account status:', error.response?.data || error.message);
        alert('Error checking account status. Redirecting to login.');
        this.$router.push('/account/restaurant/login');
      }
    },

    updatePaginatedReviews() {
      const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
      const endIndex = startIndex + this.reviewsPerPage;
      this.paginatedReviews = this.reviews.slice(startIndex, endIndex);
    },

    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updatePaginatedReviews();
      }
    },

    goToNextPage() {
      const totalPages = Math.ceil(this.totalReviews / this.reviewsPerPage);
      if (this.currentPage < totalPages) {
        this.currentPage++;
        this.updatePaginatedReviews();
      }
    },

    closeModal() {
      this.showModal = false;
    },

    closeRatingModal() {
      this.showRatingModal = false;
      this.selectedRating = {};
    },

    openRatingModal(review) {
      this.selectedRating = {
        ...review.rating_id,
        username: review.username || 'Anonymous',
      };
      this.showRatingModal = true;
    },
  },
  async mounted() {
    // Periksa status akun saat komponen di-mount
    await this.checkAccountStatus();
  },
};
</script>

<style scoped>
.main-dashboard {
  width: 100%;
  padding: 20px;
  background-color: #f6f1ed;
  color: #333;
}

/* Title Section */
.title-section {
  background: linear-gradient(to right, #9CA69C, #636963); /* Gradient background */
  text-align: center;
  padding: 30px;
  width: 100%;
  margin-top: 80px; /* Additional top margin to prevent overlap with navbar */
}

.title {
  font-size: 3em; /* Larger font size */
  color: #ffffff; /* White text color */
  font-weight: bold;
  margin: 0;
}

.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.filter-button,
.apply-button {
  background-color: #c5c5c5;
  padding: 8px 12px;
  border-radius: 5px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s; /* Smooth hover transition */
}

.filter-button:hover,
.apply-button:hover {
  background-color: #9ca69c; /* Darker shade on hover */
}

.date-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 0 5px;
  text-align: center;
  width: 140px; /* Adjust width to fit date input format */
}

.info-text {
  text-align: center;
  font-size: 0.85em;
  color: #888;
  margin-bottom: 20px;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between sections */
  margin-bottom: 20px;
}

.section-card {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  align-items: center; /* Center contents horizontally */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  gap: 10px; /* Space between elements */
}

.stat-card {
  background-color: transparent;
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}

.stat-title {
  font-weight: bold;
  font-size: 1.2em;
}

.stat-value {
  font-size: 2em;
  font-weight: bold;
}

.stat-change {
  color: #ff4d4d; /* Red for decrease */
  font-size: 1em;
}

.review-button-container {
  display: flex;
  justify-content: center; /* Center horizontally */
  width: 100%; /* Full width to align in the center */
}

.review-button {
  background-color: #c5c5c5;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Content */
.modal-content {
  background-color: #ffffff;
  border-radius: 8px;
  width: 80%;
  max-width: 800px;
  overflow-y: auto;
  max-height: 90vh;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

/* Modal Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #9CA69C, #636963);
  padding: 25px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.modal-header-rating-details {
  padding: 10px; /* Kurangi padding */
  font-size: 1.2em; /* Ukuran font lebih kecil */
  background: linear-gradient(to right, #9CA69C, #636963); /* Pertahankan gaya jika diperlukan */
  color: #fff; /* Warna teks tetap putih */
  text-align: center; /* Teks tetap di tengah */
  border-top-left-radius: 8px; /* Sudut melengkung jika ada */
  border-top-right-radius: 8px;
}
.modal-title {
  color: #C2CFC2;
  font-size: 2.0em;
  font-weight: bold;
}

.highlight {
  color: #ffffff;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5em;
  color: #ffffff;
  cursor: pointer;
}

/* Ratings Detail Modal */
.modal-content.rating-details {
  width: 40%; /* Lebar lebih kecil */
  position: absolute;
  top: 20%; /* Atur posisi vertikal */
  right: 10%; /* Atur posisi ke kanan */
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1050; /* Pastikan berada di atas popup belakang */
}

.modal-content.rating-details .ratings-detail {
  padding: 20px; /* Tambahkan padding untuk kenyamanan */
  text-align: center; /* Pusatkan teks */
  color: #333; /* Warna teks default */
}

.modal-content.rating-details .modal-header {
  background: linear-gradient(to right, #9CA69C, #636963);
  padding: 15px;
  color: #fff;
  font-size: 1.5em;
  font-weight: bold;
  text-align: center;
}

/* Reviews Section */
.reviews {
  padding: 15px;
}

.review-card {
  padding: 15px;
  border-top: 1px solid #ddd;
}

.review-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.review-username {
  color: #333;
}

.review-date {
  color: #888;
}

.review-text {
  color: #333;
  margin: 10px 0;
}

.review-footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

.action-button {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}

.rating-button {
  background-color: #636963;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  cursor: pointer;
  color: #ffffff;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.pagination-button {
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1em;
}

.pagination-button:disabled {
  cursor: not-allowed;
}
</style>
