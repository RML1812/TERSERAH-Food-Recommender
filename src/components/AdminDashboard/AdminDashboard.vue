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
      <button class="apply-button" @click="applyFilters">Apply</button>
    </div>
    <p class="info-text">Naik/turun angka dibandingkan dengan range waktu yang sama</p>

    <!-- Stacked Cards for Statistics -->
    <div class="dashboard-content">
      <!-- Total User and Total Restaurant -->
      <div class="section-card">
        <div class="stat-card red">
          <p class="stat-title">Total User</p>
          <p class="stat-value">{{ stats.totalUsers }}</p>
          <p :class="getStatChangeClass(stats.userChange)" class="stat-change">
            <span v-if="stats.userChange > 0">▲ {{ stats.userChange }}</span>
            <span v-else-if="stats.userChange < 0">▼ {{ Math.abs(stats.userChange) }}</span>
            <span v-else>-</span>
          </p>
        </div>
        <div class="stat-card blue">
          <p class="stat-title">Total Restaurant</p>
          <p class="stat-value">{{ stats.totalRestaurants }}</p>
          <p :class="getStatChangeClass(stats.restaurantChange)" class="stat-change">
            <span v-if="stats.restaurantChange > 0">▲ {{ stats.restaurantChange }}</span>
            <span v-else-if="stats.restaurantChange < 0">▼ {{ Math.abs(stats.restaurantChange) }}</span>
            <span v-else>-</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Pending and Rejected Section -->
    <div class="status-section">
      <div class="status-card pending">
        <p class="status-title">PENDING</p>
        <p class="status-value">{{ stats.pendingRestaurantsCount }}</p>
      </div>
      <div class="status-card rejected">
        <p class="status-title">REJECTED</p>
        <p class="status-value">{{ stats.rejectedRestaurantsCount }}</p>
      </div>
    </div>

    <!-- Action Button -->
    <div class="review-button-container">
      <button class="review-button" @click="goToReview">Pergi ke Review Akun</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Dashboard",
  data() {
    return {
      startDate: "",
      endDate: "",
      stats: {
        totalUsers: 0,
        totalRestaurants: 0,
        pendingRestaurantsCount: 0, // Default to 0
        rejectedRestaurantsCount: 0, // Default to 0
        userChange: 0, // Change in users
        restaurantChange: 0, // Change in restaurants
      },
    };
  },
  mounted() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const response = await axios.get("http://localhost:3000/admin-dashboard");
        const data = response.data;

        // Calculate changes (example logic, adjust as needed)
        const previousUsers = localStorage.getItem("previousUsers") || 0;
        const previousRestaurants = localStorage.getItem("previousRestaurants") || 0;

        this.stats = {
          totalUsers: data.totalUsers,
          totalRestaurants: data.totalRestaurants,
          pendingRestaurantsCount: data.pendingRestaurantsCount || 0,
          rejectedRestaurantsCount: data.rejectedRestaurantsCount || 0, 
          userChange: data.totalUsers - previousUsers,
          restaurantChange: data.totalRestaurants - previousRestaurants,
        };

        // Save current data for future comparisons
        localStorage.setItem("previousUsers", data.totalUsers);
        localStorage.setItem("previousRestaurants", data.totalRestaurants);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    },
    applyFilters() {
      alert("Filters applied! (Not yet implemented)");
    },
    goToReview() {
      window.location.href = "/admin/review";
    },
    getStatChangeClass(change) {
      if (change > 0) {
        return "green-text";
      } else if (change < 0) {
        return "red-text";
      } else {
        return "black-text";
      }
    },
  },
};
</script>
  
  <style scoped>
/* Color classes for stat-change */
.green-text {
  color: green;
}
.red-text {
  color: red;
}
.black-text {
  color: black;
}
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
    font-size: 2.5em;
    color: #ffff;
    font-weight: bold;
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
    transition: background-color 0.3s;
  }
  
  .filter-button:hover,
  .apply-button:hover {
    background-color: #9ca69c;
  }
  
  .date-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 5px;
    text-align: center;
    width: 140px;
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
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .section-card {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .stat-card {
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    flex: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .stat-card.red {
    border-top: 4px solid red;
  }
  
  .stat-card.blue {
    border-top: 4px solid blue;
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
    color: #ff4d4d;
    font-size: 1em;
  }
  
  .status-section {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 20px 0;
  }
  
  .status-card {
    flex: 1;
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .status-card.pending {
    border-left: 4px solid orange;
  }
  
  .status-card.rejected {
    border-left: 4px solid red;
  }
  
  .status-title {
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .status-value {
    font-size: 2em;
    font-weight: bold;
  }
  
  .review-button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  
  .review-button {
    background-color: #9ca69c;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 200px;
  }
  
  .review-button:hover {
    background-color: #636963;
  }
  </style>
  