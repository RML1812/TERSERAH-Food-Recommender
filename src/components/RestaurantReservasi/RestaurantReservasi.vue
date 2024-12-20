<template>
  <!-- Title Section -->
  <div class="title-section">
    <h1 class="title">Reservasi</h1>
  </div>
  <div class="reservasi-container">
    <!-- Content Layout -->
    <div class="reservasi-content">
      <!-- Sidebar with Filter Card -->
      <div class="sidebar">
        <div class="filter-card">
          <button
            class="filter-button"
            :class="{ active: activeFilter === 'Previous' }"
            @click="setFilter('Previous')"
          >
            Previous
          </button>
          <button
            class="filter-button"
            :class="{ active: activeFilter === 'Ongoing' }"
            @click="setFilter('Ongoing')"
          >
            Ongoing
          </button>
          <button
            class="filter-button"
            :class="{ active: activeFilter === 'Upcoming' }"
            @click="setFilter('Upcoming')"
          >
            Upcoming
          </button>
        </div>
      </div>

      <!-- Reservation List and Pagination inside the content layout -->
      <div class="reservation-content-right">
        <!-- Reservation List -->
        <div class="reservation-list">
          <!-- Jika tidak ada reservasi -->
          <p v-if="filteredReservations.length === 0" class="no-reservation-message">
            Masih belum terdapat Reservasi nih!
          </p>
          
          <!-- Jika ada reservasi -->
          <div
            v-for="reservation in filteredReservations"
            :key="reservation.id"
            class="reservation-card"
            @click="openPopup(reservation)"
          >
            <p class="reservation-name">{{ reservation.name }}</p>
            <p class="reservation-details">
              {{ reservation.jumlahOrang }} Orang - {{ reservation.tanggalReservation }} - {{ reservation.waktuMulai }}
            </p>
          </div>
        </div>

        <!-- Pop-up Detail View -->
        <div v-if="open" class="popup-overlay">
          <div class="popup-content">
            <div class="popup-header bg-gradient-to-r from-[#CEDBCE] via-[#8C958C] to-[#5C665C] rounded-t-2xl text-white font-bold p-5">
              <h1 class="text-[32px] text-center">{{ selectedReservation.name }}</h1>
              <button @click="closePopup" class="close-button">X</button>
            </div>
            <div class="popup-body p-5 grid grid-cols-2 gap-4">
              <!-- Waktu Reservasi -->
              <div>
                <label class="popup-label">Waktu Reservasi</label>
                <div class="flex items-center gap-2">
                  <input disabled type="text" class="popup-input" :value="selectedReservation.waktuMulai" />
                  <span>-</span>
                  <input disabled type="text" class="popup-input" :value="selectedReservation.waktuSelesai" />
                </div>
              </div>

              <!-- Tanggal Reservasi -->
              <div>
                <label class="popup-label">Tanggal Reservasi</label>
                <input disabled type="text" class="popup-input" :value="selectedReservation.tanggalReservation" />
              </div>

              <!-- Atas Nama -->
              <div>
                <label class="popup-label">Atas Nama</label>
                <input disabled type="text" class="popup-input" :value="selectedReservation.name" />
              </div>

              <!-- Jumlah Orang -->
              <div>
                <label class="popup-label">Jumlah Orang</label>
                <input disabled type="text" class="popup-input" :value="selectedReservation.jumlahOrang" />
              </div>

              <!-- No. Handphone -->
              <div>
                <label class="popup-label">No. Handphone</label>
                <input disabled type="text" class="popup-input" :value="selectedReservation.noHP" />
              </div>

              <!-- Harga -->
              <div>
                <label class="popup-label">Harga</label>
                <div class="font-bold text-lg">Rp {{ selectedReservation.totalHarga }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 0" class="pagination">
          <button class="pagination-button" @click="goToFirstPage" :disabled="currentPage === 1">«</button>
          <button class="pagination-button" @click="previousPage" :disabled="currentPage === 1">‹</button>
          <span>{{ currentPage }} dari {{ totalPages }}</span>
          <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">›</button>
          <button class="pagination-button" @click="goToLastPage" :disabled="currentPage === totalPages">»</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      open: false,
      selectedReservation: {}, // Data reservasi yang dipilih
      activeFilter: "Ongoing", // Filter aktif
      currentPage: 1, // Halaman aktif
      reservationsPerPage: 5, // Jumlah reservasi per halaman
      reservations: {
        Previous: [],
        Ongoing: [],
        Upcoming: [],
      },
    };
  },
  computed: {
    filteredReservations() {
      const reservations = this.reservations[this.activeFilter] || [];
      const start = (this.currentPage - 1) * this.reservationsPerPage;
      const end = start + this.reservationsPerPage;
      return reservations.slice(start, end);
    },
    totalPages() {
      const reservations = this.reservations[this.activeFilter] || [];
      return reservations.length > 0
        ? Math.ceil(reservations.length / this.reservationsPerPage)
        : 0;
    },
  },
  methods: {
    async fetchReservations() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BE}/restaurant-dashboard`, {
          withCredentials: true,
        });
        const { previousReservations, ongoingReservations, nextReservations } = response.data;
        this.reservations = {
          Previous: previousReservations,
          Ongoing: ongoingReservations,
          Upcoming: nextReservations,
        };
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    },
    openPopup(reservation) {
      this.selectedReservation = reservation;
      this.open = true;
    },
    closePopup() {
      this.open = false;
      this.selectedReservation = {};
    },
    setFilter(filter) {
      this.activeFilter = filter;
      this.currentPage = 1;
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    goToFirstPage() {
      this.currentPage = 1;
    },
    goToLastPage() {
      this.currentPage = this.totalPages;
    },
  },
  mounted() {
    this.fetchReservations();
  },
};
</script>

<style scoped>
/* Title Section */
.title-section {
  background: linear-gradient(to right, #9CA69C, #636963);
  text-align: center;
  padding: 30px;
  width: 100%;
  margin-top: 80px;
}

.title {
  font-size: 3em;
  color: #ffffff;
  font-weight: bold;
  margin: 0;
}

.reservasi-container {
  font-family: Poppins, sans-serif;
  max-width: 1200px;
  margin: auto;
}

.reservasi-content {
  display: flex;
  gap: 20px;
  padding: 20px;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 450px;
}

.filter-card {
  background-color: #f2f2f2;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.filter-button {
  padding: 15px;
  width: 100%;
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
  border: none;
  outline: none;
  transition: background-color 0.3s;
}

.filter-button.active {
  background-color: #d2d2d2;
  color: black;
}

.filter-button:first-child {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.filter-button:last-child {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.reservation-content-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reservation-list {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 8px;
}

.reservation-card {
  background-color: #636963;
  color: #fff;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  cursor: pointer;
}

.reservation-name {
  font-size: 1.2em;
  font-weight: bold;
}

.reservation-details {
  font-size: 0.9em;
}

/* Popup styling */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.popup-content {
  background-color: #F2F2F2;
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

.popup-header {
  position: relative;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #ffffff;
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.popup-label {
  font-weight: bold;
  font-size: 1.1em;
  margin-bottom: 5px;
}

.popup-input {
  background-color: #D3D3D3;
  border-radius: 8px;
  width: 100%;
  padding: 8px;
  border: none;
  text-align: left;
  font-size: 1em;
  color: #6C757D;
  margin-top: 5px;
}

.popup-body {
  display: grid;
  gap: 20px;
}

.popup-body .flex {
  gap: 8px;
  align-items: center;
}

.popup-body input::placeholder {
  color: #6C757D;
}

/* Pagination inside content layout */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 15px 0;
  background-color: #f2f2f2;
  border-radius: 8px;
  font-size: 20px;
}

.pagination-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: #333;
  transition: transform 0.2s;
}

.pagination-button:hover {
  transform: scale(1.1);
}

.no-reservation-message {
  text-align: center;
  font-size: 1.2em;
  color: #888;
  margin-top: 20px;
}
</style>