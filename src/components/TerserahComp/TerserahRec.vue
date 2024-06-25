<template>
    <div class="my-10">
      <div class="font-[Poppins]">
        <div class="text-left ml-10 md:ml-[80px]" v-if="restaurants.length > 0">
          <h1 class="font-bold text-3xl">Hasil dari Kami <span class="text-[#9CA69C]">untukmu</span></h1>
        </div>
        <div>
          <div class="lg:flex lg:grid-cols-none lg:flex-row flex-col sm:grid-cols-2 sm:grid sm:gap-4 md:justify-between mx-10 md:mx-20">
            <div v-for="resto in visibleRestaurants" :key="resto.id" class="md:mt-5 mt-4">
              <router-link :to="`/restaurant/${resto._id}`">
                <div class="restaurant-card cursor-pointer hover:opacity-90 hover:scale-105">
                  <div class="image-container" :style="{ backgroundImage: 'url(/public/Background.png)' }">
                  </div>
                  <div class="info-container">
                    <div class="info-top">
                      <h2 class="restaurant-name">{{ resto.name }}</h2>
                      <p class="restaurant-price">{{ resto.price_range }}</p>
                    </div>
                    <p class="restaurant-type">{{ resto.culinary_type }}</p>
                    <p class="restaurant-location">{{ resto.address }}</p>
                    <div class="rating-container">
                      <span class="rating-value">{{ resto.overall_rating }}</span>
                      <span class="rating-star">⭐</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div v-if="visibleRestaurants.length < restaurants.length" class="text-right md:mr-20 mr-10 mt-4 font-light">
            <button @click="showAllRestaurants" class="italic text-[13px] cursor-pointer hover:font-medium">Lihat Selengkapnya</button>
          </div>
          <div class="text-left ml-10 md:ml-[80px] mt-4 font-light" v-if="restaurants.length > 0">
            <p class="italic text-[13px]">Menampilkan {{ visibleRestaurants.length }} dari {{ restaurants.length }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      restaurants: {
        type: Array,
        required: true
      },
      totalResults: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        visibleCount: 4
      };
    },
    computed: {
      visibleRestaurants() {
        return this.restaurants.slice(0, this.visibleCount);
      }
    },
    methods: {
      showAllRestaurants() {
        this.visibleCount = this.restaurants.length;
      }
    }
  }
  </script>
  
  <style scoped>
  .restaurant-card {
    display: flex;
    flex-direction: row;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 16px;
    background-color: white;
    width: 100%; /* Lebar kartu 100% */
    max-width: 800px; /* Maksimum lebar kartu */
    height: 200px; /* Tinggi kartu */
  }
  
  .image-container {
    width: 40%;
    height: auto;
    overflow: hidden;
    background-size: cover;
    background-position: center;
  }
  
  .info-container {
    width: 60%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .info-top {
    display: flex;
    justify-content: space-between;
  }
  
  .restaurant-name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .restaurant-price {
    font-size: 10px;
    color: #666;
  }
  
  .restaurant-type, .restaurant-location {
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
  }
  
  .rating-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 8px;
  }
  
  .rating-star {
    color: gold;
    margin-left: 4px;
  }
  
  .rating-value {
    font-size: 14px;
    font-weight: bold;
  }
  
  /* Existing Styles */
  .my-10 {
    margin-top: 2.5rem;
    margin-bottom: 2.5rem;
  }
  .font-[Poppins] {
    font-family: 'Poppins', sans-serif;
  }
  .text-left {
    text-align: left;
  }
  .ml-10 {
    margin-left: 2.5rem;
  }
  .md\:ml-\[80px\] {
    margin-left: 80px;
  }
  .font-bold {
    font-weight: bold;
  }
  .text-3xl {
    font-size: 1.875rem;
  }
  .text-\[\#9CA69C\] {
    color: #9CA69C;
  }
  .lg\:flex {
    display: flex;
  }
  .lg\:grid-cols-none {
    grid-template-columns: none;
  }
  .lg\:flex-row {
    flex-direction: row;
  }
  .flex-col {
    flex-direction: column;
  }
  .sm\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .sm\:grid {
    display: grid;
  }
  .sm\:gap-4 {
    gap: 1rem;
  }
  .md\:justify-between {
    justify-content: space-between;
  }
  .mx-10 {
    margin-left: 2.5rem;
    margin-right: 2.5rem;
  }
  .md\:mx-20 {
    margin-left: 5rem;
    margin-right: 5rem;
  }
  .md\:mt-5 {
    margin-top: 1.25rem;
  }
  .mt-4 {
    margin-top: 1rem;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .hover\:opacity-90:hover {
    opacity: 0.9;
  }
  .hover\:scale-105:hover {
    transform: scale(1.05);
  }
  .text-white {
    color: white;
  }
  .text-\[15px\] {
    font-size: 15px;
  }
  .rounded-3xl {
    border-radius: 1.5rem;
  }
  .shadow-xl {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  .border-black {
    border-color: black;
  }
  .text-\[\#f2f2f2\] {
    color: #f2f2f2;
  }
  .font-medium {
    font-weight: 500;
  }
  .text-\[16px\] {
    font-size: 16px;
  }
  .text-right {
    text-align: right;
  }
  .md\:mr-20 {
    margin-right: 5rem;
  }
  .mr-10 {
    margin-right: 2.5rem;
  }
  .mt-4 {
    margin-top: 1rem;
  }
  .font-light {
    font-weight: 300;
  }
  .italic {
    font-style: italic;
  }
  .hover\:font-medium:hover {
    font-weight: 500;
  }
  </style>
  