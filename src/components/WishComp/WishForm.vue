<template>
  <div class="mb-16 font-[Poppins] my-16">
    <div class="flex justify-center">
      <div class="h-[200px] w-64 bg-[#F2F2F2] rounded-2xl shadow-lg border mr-3 flex flex-col md:ml-28 ml-4">
        <RouterLink to="/profil">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] hover:bg-[#DBDBDB] text-[14px] rounded-t-2xl text-center pt-3 cursor-pointer">
            <p>Profil</p>
          </div>
        </RouterLink>
        <RouterLink to="/reservasimu">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer">
            <p>Reservasi-mu</p>
          </div>
        </RouterLink>
        <RouterLink to="/wishlist">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] text-center pt-3 bg-[#DBDBDB] cursor-pointer">
            <p>Wishlist</p>
          </div>
        </RouterLink>
        <RouterLink to="/review">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] rounded-b-2xl text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer">
            <p>Review-mu</p>
          </div>
        </RouterLink>
      </div>
      <div class="h-auto w-full lg:mr-52 md:mr-40 mr-10 bg-[#F2F2F2] rounded-xl items-center shadow-lg border p-6">
        <div class="mt-10">
          <div v-if="isLoading" class="text-center text-gray-500">
            Loading...
          </div>
          <div v-else>
            <div v-if="wishs.length === 0" class="text-center text-gray-500">
              Kamu masih belum punya wishlist nih, yu cari restaurant yang kamu mau^^
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10">
              <div v-for="resto in paginatedWishs" :key="resto._id" class="relative bg-white rounded-3xl shadow-xl overflow-hidden card-hover-effect">
                <RouterLink :to="`/restaurant/${resto._id}`">
                  <div class="relative bg-cover bg-center h-[200px] lg:h-[250px] md:h-[220px]" :style="{ backgroundImage: `url('/public/gambar.png')` }">
                    <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
                  </div>
                  <div class="p-4">
                    <h1 class="font-bold text-lg">{{ resto.name }}</h1>
                    <p class="mt-1 text-sm text-gray-600">{{ resto.culinary_type }}</p>
                    <p class="mt-3 text-sm text-gray-600">{{ resto.address }}</p>
                    <div class="flex items-center mt-4">
                      <img src="/public/Star.png" class="h-5 w-5" alt="Rating star">
                      <p class="ml-2 text-lg font-bold text-gray-800">{{ resto.overall_rating }}</p>
                    </div>
                  </div>
                </RouterLink>
                <div @click.stop="deleteWishlist(resto._id)" class="absolute top-4 right-4 bg-[#997380] hover:scale-110 h-12 w-12 rounded-full flex items-center justify-center cursor-pointer z-10">
                  <div class="h-2 w-6 bg-white"></div>
                </div>
              </div>
            </div>
            <div v-if="wishs.length > 0" class="flex justify-center items-center my-8">
              <ion-icon @click="menuLefts" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropleft-circle"></ion-icon>
              <ion-icon @click="menuLeft" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer mx-2" name="arrow-dropleft"></ion-icon>
              <p class="font-bold text-lg">{{ currentPage }} dari {{ totalPages }}</p>
              <ion-icon @click="menuRight" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer mx-2" name="arrow-dropright"></ion-icon>
              <ion-icon @click="menuRights" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropright-circle"></ion-icon>
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
      wishs: [],
      currentPage: 1,
      itemsPerPage: 9,
      isLoading: true
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.wishs.length / this.itemsPerPage);
    },
    paginatedWishs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.wishs.slice(start, end);
    }
  },
  methods: {
    async fetchWishlist() {
      try {
        const response = await axios.get('http://localhost:3000/wishlist');
        console.log(response.data); // Log the response data
        this.wishs = response.data.restaurants; // Assign the restaurants array to wishs
      } catch (error) {
        console.error("There was an error fetching the wishlist!", error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteWishlist(restaurantId) {
      if (confirm('Anda yakin ingin menghapus?')) {
        console.log('Deleting wishlist item with ID:', restaurantId);
        try {
          const response = await axios.post('http://localhost:3000/delete-wishlist', { restaurantId });
          console.log('Delete response:', response.data); // Log the response data
          this.wishs = this.wishs.filter(resto => resto._id !== restaurantId); // Update the wishlist to remove the deleted item
          alert('Wishlist item berhasil dihapus');
        } catch (error) {
          console.error('There was an error deleting the wishlist item!', error);
          console.log('Error response:', error.response.data); // Log the error response data
        }
      }
    },
    menuLefts() {
      this.currentPage = 1;
    },
    menuLeft() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    menuRights() {
      this.currentPage = this.totalPages;
    },
    menuRight() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    async checkLogin() {
      try {
        const response = await axios.get(`http://localhost:3000/user/${this.$route.params.id}`);
        if (response.status !== 200 || !response.data.userLogin) {
          window.location.href = 'http://localhost:5173/nolog';
        }
      } catch (error) {
        console.error("Error checking user login:", error);
        window.location.href = 'http://localhost:5173/nolog';
      }
    }
  },
  async mounted() {
    await this.checkLogin();
    this.fetchWishlist();
  }
};
</script>

<style scoped>
.bg-cover {
  background-size: cover;
}
.bg-center {
  background-position: center;
}
.shadow-xl {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.hover\:scale-110:hover {
  transform: scale(1.1);
}
.card-hover-effect {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-hover-effect:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 20px -3px rgba(0, 0, 0, 0.1), 0 8px 10px -2px rgba(0, 0, 0, 0.05);
}
.z-10 {
  z-index: 10;
}
</style>
