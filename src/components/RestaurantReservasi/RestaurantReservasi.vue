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
            <button class="filter-button" :class="{ active: activeFilter === 'Previous' }" @click="setFilter('Previous')">Previous</button>
            <button class="filter-button" :class="{ active: activeFilter === 'Ongoing' }" @click="setFilter('Ongoing')">Ongoing</button>
            <button class="filter-button" :class="{ active: activeFilter === 'Upcoming' }" @click="setFilter('Upcoming')">Upcoming</button>
          </div>
        </div>
  
        <!-- Reservation List and Pagination inside the content layout -->
        <div class="reservation-content-right">
          <div class="reservation-list">
            <div v-for="reservation in filteredReservations" :key="reservation.id" class="reservation-card">
              <p class="reservation-name">Manusia A</p>
              <p class="reservation-details">5 Orang - 28/05/2024 - 15:00</p>
            </div>
          </div>
  
          <!-- Pagination directly after the reservation list -->
          <div class="pagination">
            <button class="pagination-button" @click="goToFirstPage">«</button>
            <button class="pagination-button" @click="previousPage">‹</button>
            <span>{{ currentPage }} dari {{ totalPages }}</span>
            <button class="pagination-button" @click="nextPage">›</button>
            <button class="pagination-button" @click="goToLastPage">»</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeFilter: 'Ongoing',
        currentPage: 1,
        reservationsPerPage: 5,
        reservations: Array(15).fill({
          id: 1,
          name: 'Manusia A',
          details: '5 Orang - 28/05/2024 - 15:00',
        }),
      };
    },
    computed: {
      filteredReservations() {
        // Placeholder: in a real app, filter based on actual reservation data and activeFilter
        const start = (this.currentPage - 1) * this.reservationsPerPage;
        const end = start + this.reservationsPerPage;
        return this.reservations.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.reservations.length / this.reservationsPerPage);
      },
    },
    methods: {
      setFilter(filter) {
        this.activeFilter = filter;
        this.currentPage = 1; // Reset to the first page when the filter changes
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
  };
  </script>
  
  <style scoped>
  /* Title Section */
  .title-section {
    background: linear-gradient(to right, #9CA69C, #636963);
    text-align: center;
    padding: 30px;
    width: 100%;
    margin-top: 80px; /* Additional top margin to prevent overlap with navbar */
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
  
  /* Styling for the active filter button */
  .filter-button.active {
    background-color: #d2d2d2;
    color: black;
  }
  
  /* Add border-radius to the top and bottom */
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
  }
  
  .reservation-name {
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .reservation-details {
    font-size: 0.9em;
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
    font-size: 20px

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
  </style>
  