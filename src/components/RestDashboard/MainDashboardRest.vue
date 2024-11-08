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
      <button class="apply-button">Apply</button>
    </div>
    <p class="info-text">Naik/turun angka dibandingkan dengan range waktu yang sama</p>

    <!-- Stacked Cards for Statistics -->
    <div class="dashboard-content">
      <!-- Total Klik and Total Wishlist -->
      <div class="section-card">
        <div class="stat-card">
          <p class="stat-title">Total Klik</p>
          <p class="stat-value">100</p>
          <p class="stat-change">▼ 10</p>
        </div>
        <div class="stat-card">
          <p class="stat-title">Total Wishlist</p>
          <p class="stat-value">30</p>
          <p class="stat-change">▼ 10</p>
        </div>
      </div>

      <!-- Total Reservasi and Total Pemasukan -->
      <div class="section-card">
        <div class="stat-card">
          <p class="stat-title">Total Reservasi</p>
          <p class="stat-value">20</p>
          <p class="stat-change">▼ 10</p>
        </div>
        <div class="stat-card">
          <p class="stat-title">Total Pemasukan</p>
          <p class="stat-value">Rp 500.000</p>
          <p class="stat-change">▲ Rp 100.000</p>
        </div>
      </div>
    </div>
    <!-- Bottom Section for Rating -->
    <div class="section-card">
      <div class="stat-card">
        <p class="stat-title">Total Rating</p>
        <p class="stat-value">⭐ 4.5</p>
      </div>
      <div class="stat-card">
        <p class="stat-title">Total Review</p>
        <p class="stat-value">10</p>
        <p class="stat-change">▼ 10</p>
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
            <p class="review-username">Username</p>
            <p class="review-date">21/05/2024</p>
          </div>
          <p class="review-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dapibus turpis eget quam luctus...
          </p>
          <div class="review-footer">
            <button class="action-button">🗑️</button>
            <button class="rating-button">Total Rating ⭐ 4.5</button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button class="pagination-button">«</button>
        <button class="pagination-button">‹</button>
        <span class="mt-2">1 dari 3</span>
        <button class="pagination-button">›</button>
        <button class="pagination-button">»</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

export default {
  name: "MainDashboard",
  components: {
    LineChart: {
      extends: Line,
      props: ["data", "options"],
      mounted() {
        this.renderChart(
          {
            labels: ["1", "2", "3", "4"],
            datasets: [
              {
                label: "Data 1",
                data: [5, 10, 15, 20],
                borderColor: "red",
                fill: false,
              },
              {
                label: "Data 2",
                data: [15, 10, 5, 25],
                borderColor: "blue",
                fill: false,
              },
            ],
          },
          { responsive: true, maintainAspectRatio: false }
        );
      },
    },
  },
  data() {
    return {
      showModal: false,
      reviews: [
        // Placeholder reviews; replace with actual review data
        { username: "Username", date: "21/05/2024", text: "Lorem ipsum dolor sit amet..." },
        { username: "Username", date: "21/05/2024", text: "Lorem ipsum dolor sit amet..." },
      ],
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
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
  padding: 20px;
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
  padding: 15px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.modal-title {
  color: #C2CFC2;
  font-size: 1.5em;
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

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  gap: 5px;
}

.pagination-button {
  background: none;
  border: none;
  font-size: 2em;
  cursor: pointer;
  padding: 3px 20px
}
</style>
