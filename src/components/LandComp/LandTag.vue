<template>
  <div class="mt-14 mb-10 font-[Poppins]">
    <div class="bg-[url('/public/Background.png')] text-white h-[320px] md:mx-20 mx-10 lg:w-auto text-center bg-cover rounded-2xl">
      <p class="text-center text-[15px] pt-6 md:pt-8"></p>
      <div class="mx-10 my-2">
        <h1 class="font-bold text-[44px] mx:10 mx:10 md:text-[46px] lg:text-[48px]">Mau <span class="text-[#C2CFC2] italic">makan</span> apa hari ini?</h1>
      </div>
      <form @submit.prevent="performSearch">
        <div class="opacity-50 mt-10 md:mt-14">
          <div class="bg-[white] relative md:h-10 h-7 w-auto cursor-pointer md:mx-20 mx-16 flex rounded-3xl">
            <img src="/public/Maps.png" class="hover:scale-125 opacity-100 my-auto ml-4 mr-2 h-3 w-3 md:h-4 md:w-4" alt="">
            <input type="text" v-model="searchName" placeholder="Search by name" class="w-screen border-none cursor-pointer text-black outline-none">
            <img src="/public/Filter.png" @click="menuOpen" class="hover:scale-125 opacity-100 my-auto h-3 w-3 md:h-4 md:w-4 ml-3 mr-1" alt="">
            <button type="submit" class="hover:scale-125 opacity-100 my-auto h-3 w-3 md:h-5 md:w-5 mr-5 lg:mt-2.5 mt-2 md:mt-3">
              <img src="/public/Search.png" alt="">
            </button>
          </div>
        </div>
      </form>
      <div v-if="open" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-[#F2F2F2] text-black h-auto w-[90%] md:w-2/3 lg:w-1/2 mx-4 my-4 rounded border-spacing-60 shadow-xl p-4 relative">
          <div @click="menuOpen" class="text-right">
            <ion-icon class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer rounded-xl" name="close"></ion-icon>
          </div>
          <h1 class="font-bold text-2xl text-black text-center mb-4">Filter</h1>
          <div>
            <h1 class="font-bold text-[18px] text-black md:mr-10">Harga</h1>
            <div class="mt-2 flex justify-between">
              <div class="flex items-center">
                <label class="text-[14px] text-black font-normal" for="">Rp</label>
                <input type="text" class="hover:scale-105 rounded-xl w-28 h-6 bg-[#D3D3D3] ml-2 pl-7 py-1" placeholder="00.000">
              </div>
              <p class="text-black">-</p>
              <div class="flex items-center">
                <label class="text-[14px] text-black font-normal" for="">Rp</label>
                <input type="text" class="hover:scale-105 rounded-xl w-28 h-6 bg-[#D3D3D3] ml-2 pl-7 py-1" placeholder="00.000">
              </div>
            </div>
          </div>
          <div class="mt-6">
            <h1 class="font-bold text-[18px] text-black">Rating</h1>
            <div class="mt-4">
              <div>
                <label for="" class="text-black mr-2">0</label>
                <input type="range" id="points" class="range" v-model="nilai" name="points" min="0" max="5" step="0.1">
                <label for="" class="text-black ml-2">5</label>
              </div>
              <div>
                <span class="text-black">⭐ {{ nilaih }}</span>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <h1 class="text-black text-[18px] font-bold">Pembayaran</h1>
            <div class="flex flex-wrap gap-2 mt-2">
              <div class="bg-[#D3D3D3] h-[30px] w-[85px] text-black shadow rounded-2xl cursor-pointer border hover:opacity-90 hover:scale-105 flex items-center justify-center" v-for="(buy, index) in Bayar" :key="index" @click="menuBayar(buy)">
                <p>{{ buy }}</p>
              </div>
            </div>
            <div class="text-black mt-3 flex flex-wrap gap-2">
              <div v-for="fil in filter" class="bg-gray-300 p-1 rounded-lg">{{ fil }}</div>
            </div>
          </div>
          <div class="mt-6">
            <h1 class="text-black text-[18px] font-bold">Fasilitas</h1>
            <div class="flex flex-wrap gap-2 mt-2">
              <div class="bg-[#D3D3D3] h-[30px] w-auto text-black shadow rounded-2xl cursor-pointer border hover:opacity-90 hover:scale-105 flex items-center justify-center" v-for="(fas, index) in Fasil" :key="index" @click="menuFasil(fas)">
                <p>{{ fas }}</p>
              </div>
            </div>
            <div class="text-black mt-3 flex flex-wrap gap-2">
              <div v-for="fil2 in filter2" class="bg-gray-300 p-1 rounded-lg">{{ fil2 }}</div>
            </div>
          </div>
          <div class="mt-6">
            <h1 class="text-black text-[18px] font-bold">Asal Kuliner</h1>
            <div class="flex flex-wrap gap-2 mt-2">
              <div class="bg-[#D3D3D3] h-[30px] w-auto text-black shadow rounded-2xl cursor-pointer border hover:opacity-90 hover:scale-105 flex items-center justify-center" v-for="(asal, index) in Asal" :key="index" @click="menuAsal(asal)">
                <p>{{ asal }}</p>
              </div>
            </div>
            <div class="text-black mt-3 flex flex-wrap gap-2">
              <div v-for="fil3 in filter3" class="bg-gray-300 p-1 rounded-lg">{{ fil3 }}</div>
            </div>
          </div>
          <div class="mt-6">
            <h1 class="text-black text-[18px] font-bold">Tipe Kuliner</h1>
            <div class="flex flex-wrap gap-2 mt-2">
              <div class="bg-[#D3D3D3] h-[30px] w-auto text-black shadow rounded-2xl cursor-pointer border hover:opacity-90 hover:scale-105 flex items-center justify-center" v-for="(tipe, index) in Tipe" :key="index" @click="menuTipe(tipe)">
                <p>{{ tipe }}</p>
              </div>
            </div>
            <div class="text-black mt-3 flex flex-wrap gap-2">
              <div v-for="fil4 in filter4" class="bg-gray-300 p-1 rounded-lg">{{ fil4 }}</div>
            </div>
          </div>
          <div class="flex justify-center mt-6">
            <button @click="applyFilters" class="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-700">Terapkan Filter</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="searchError">{{ searchError }}</div>
    <div v-else>
      <div v-if="searchResults.length > 0" class="my-10">
        <div class="font-[Poppins]">
          <div class="flex justify-between mx-10 md:mx-20">
            <div class="text-left text-md flex">
              <h1>Menampilkan {{ paginatedResults.length }} Hasil dari {{ searchResults.length }}</h1>
            </div>
            <div class="text-right">
              <span class="font-bold text-md"> Rating</span>
              <ion-icon class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" @click="onToggleMenuss" :name="sortAscending ? 'arrow-up' : 'arrow-down'"></ion-icon>
            </div>
          </div>
          <div>
            <div class="flex flex-col gap-4 mx-10 md:mx-20">
              <div v-for="restaurant in paginatedResults" :key="restaurant._id" class="relative w-full">
                <RouterLink :to="`/restaurant/${restaurant._id}`">
                  <div class="cursor-pointer hover:opacity-90 hover:scale-105 bg-[url('/public/gambar.png')] text-white h-[250px] w-full text-[15px] bg-cover rounded-3xl shadow-xl border-black">
                    <div class="bg-gradient-to-b from-[#636963] via-transparent to-[#636963] h-full w-full opacity-100 rounded-3xl shadow-xl border-black p-5 flex flex-col justify-between">
                      <div>
                        <div class="flex justify-between">
                          <h1 class="font-bold text-[26px]">{{ restaurant.name }}</h1>
                          <h1 class="font-semibold mr-5 text-[18px]">{{ restaurant.price_range }}</h1>
                        </div>
                        <p class="mt-1 text-[16px] font">{{ restaurant.culinary_type }}</p>
                      </div>
                      <div class="flex justify-between items-end">
                        <p class="text-[16px] text-[#f2f2f2] font-semibold">{{ restaurant.address }}</p>
                        <div class="flex items-center">
                          <img src="/public/Star.png" class="h-5 w-5 lg:h-4 lg:w-4 mr-1" alt="star">
                          <p class="text-[20px] text-[#f2f2f2] font-bold">{{ restaurant.overall_rating }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
            <div class="md:mx-20 mx-10 mt-8 font-light">
              <div class="flex justify-center">
                <div>
                  <ion-icon @click="prevPage" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropleft-circle"></ion-icon>
                  <ion-icon @click="prevPage" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropleft"></ion-icon>
                </div>
                <div>
                  <p class="font-bold text-[16px] mx-14">{{ currentPage + 1 }} dari {{ totalPages }}</p>
                </div>
                <div>
                  <ion-icon @click="nextPage" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropright"></ion-icon>
                  <ion-icon @click="nextPage" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropright-circle"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchName: "",
      nilai: "",
      open: false,
      nilaih: "",
      Bayar: ['Gopay', 'OVO', 'Dana', 'Tunai', 'Debet', 'Visa', 'Master'],
      Fasil: ['Reservasi', '100% Halal', 'Wifi', 'Area Outdoor', 'Pesan Antar', '24 Jam', 'Vegetarian', 'Area Merokok', 'Ruang VIP', 'Alkohol', 'Area Parkir'],
      Asal: ['Barat', 'Vietnam', 'China', 'India', 'Perancis', 'Singapura', 'Korea', 'Meksiko', 'Jerman', 'Argentina', 'Thailand', 'Indonesia', 'Malaysia', 'Belanda', 'Eropa', 'Jepang', 'Brazil', 'Hawaii', 'Arab'],
      Tipe: ['Toko Roti', 'Yoghurt', 'Es Krim', 'Bar', 'Lounge', 'Dessert', 'Snack', 'Vegetarian', 'Bubble Tea', 'Kafe', 'Toko Kue', 'Minuman', 'Club', 'Salad', 'Cokelat'],
      filter: [],
      filter2: [],
      filter3: [],
      filter4: [],
      searchResults: [],
      paginatedResults: [],
      searchError: null,
      status: false,
      currentPage: 0,
      itemsPerPage: 5,
      sortAscending: true
    };
  },
  methods: {
    menuBayar(beli) {
      const filterIndex = this.filter.indexOf(beli);
      if (filterIndex > -1) {
        this.filter.splice(filterIndex, 1);
      } else {
        this.filter.push(beli);
      }
    },
    menuFasil(fas) {
      const filterIndex = this.filter2.indexOf(fas);
      if (filterIndex > -1) {
        this.filter2.splice(filterIndex, 1);
      } else {
        this.filter2.push(fas);
      }
    },
    menuAsal(asal) {
      const filterIndex = this.filter3.indexOf(asal);
      if (filterIndex > -1) {
        this.filter3.splice(filterIndex, 1);
      } else {
        this.filter3.push(asal);
      }
    },
    menuTipe(tipe) {
      const filterIndex = this.filter4.indexOf(tipe);
      if (filterIndex > -1) {
        this.filter4.splice(filterIndex, 1);
      } else {
        this.filter4.push(tipe);
      }
    },
    menuOpen() {
      this.open = !this.open;
    },
    performSearch() {
      const searchParams = {
        name: this.searchName,
        overall_rating: this.nilai,
        culinary_type: [...this.filter3, ...this.filter4],
        location: '',
        price_range: this.priceRange,
        available_facilities: this.filter2,
        payment: this.filter,
      };

      axios.get(`${import.meta.env.VITE_BE}/search`, { params: searchParams })
        .then(response => {
          this.searchResults = response.data.restaurants;
          this.searchError = null;
          this.updatePaginatedResults();
        })
        .catch(error => {
          this.searchResults = [];
          if (error.response && error.response.status === 404) {
            this.searchError = 'No restaurants found matching the criteria';
          } else {
            this.searchError = 'An error occurred while searching';
          }
        });
    },
    applyFilters() {
      this.performSearch();
      this.menuOpen();
    },
    updatePaginatedResults() {
      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedResults = this.searchResults.slice(start, end);
    },
    nextPage() {
      if ((this.currentPage + 1) * this.itemsPerPage < this.searchResults.length) {
        this.currentPage++;
        this.updatePaginatedResults();
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.updatePaginatedResults();
      }
    },
    onToggleMenuss() {
      this.sortAscending = !this.sortAscending;
      this.sortByRating();
    },
    sortByRating() {
      this.paginatedResults.sort((a, b) => {
        return this.sortAscending 
          ? a.overall_rating - b.overall_rating 
          : b.overall_rating - a.overall_rating;
      });
    },
  },
  watch: {
    nilai(value) {
      this.nilaih = value;
    },
    searchResults() {
      this.currentPage = 0;
      this.updatePaginatedResults();
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.searchResults.length / this.itemsPerPage);
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>
