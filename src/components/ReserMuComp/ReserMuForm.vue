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
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] text-center pt-3 bg-[#DBDBDB] cursor-pointer">
            <p>Reservasi-mu</p>
          </div>
        </RouterLink>
        <RouterLink to="/wishlist">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer">
            <p>Wishlist</p>
          </div>
        </RouterLink>
        <RouterLink to="/review">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] rounded-b-2xl text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer">
            <p>Review-mu</p>
          </div>
        </RouterLink>
      </div>
      <div class="h-auto w-full lg:mr-52 md:mr-40 mr-10 bg-[#F2F2F2] rounded-xl items-center shadow-lg border">
        <div>
          <div class="flex flex-col mt-5 mb-10">
            <div v-if="loading" class="text-center text-gray-500">
              Loading...
            </div>
            <div v-else-if="reservs.length === 0" class="text-center text-gray-500">
              Belum ada reservasi, Yuk buat reservasi sekarang!
            </div>
            <div v-else v-for="resto in paginatedReservations" :key="resto._id" class="text-white">
              <div class="bg-[#997380] h-24 w-auto mt-4 md:mx-10 mx-5 rounded-lg hover:bg-[#BD97A4] cursor-pointer" @click="selectReservation(resto)">
                <div class="flex flex-col md:mx-7 mx-2 gap-1 sm:gap-0">
                  <div class="mt-3">
                    <img class="cursor-pointer md:h-5 h-4 hover:scale-125 mt-1 float-right" src="/public/Seru.png" alt="">
                  </div>
                  <div class="flex">
                    <p class="font-bold md:text-2xl text-xl">{{ resto.restaurantName }}</p>
                    <img @click.stop="deleteReservation(resto._id)" class="cursor-pointer md:h-5 h-4 hover:scale-125 mt-1 ml-4" src="/public/Back.png" alt="Delete">
                  </div>
                  <div class="text-right ">
                    <p class="lg:text-[15px] sm:text-[13px] text-[12px]">{{ resto.jumlahOrang }} Orang - {{ resto.tanggalReservation }} - {{ resto.waktuMulai }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!loading && reservs.length > 0" class="lg:mx-20 md:mx-8 mx-4 my-8 font-light">
            <div class="flex justify-center">
              <div>
                <ion-icon @click="menuLefts()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropleft-circle"></ion-icon>
                <ion-icon @click="menuLeft()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropleft"></ion-icon>
              </div>
              <div>
                <p class="font-bold text-[16px] md:mx-14 mx-6">{{ currentPage }} dari {{ totalPages }}</p>
              </div>
              <div>
                <ion-icon @click="menuRight()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropright"></ion-icon>
                <ion-icon @click="menuRights()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropright-circle"></ion-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="open">
      <div class="font-[Poppins] bg-[#F2F2F2] text-black h-auto lg:w-[900px] md:w-[800px] sm:w-[600px] w-[420px] sm:ml-20 ml-8 top-[100px] absolute rounded-2xl border-spacing-60 shadow-xl">
        <div class="mb-10">
          <div class="bg-gradient-to-r text-white font-bold w-full h-28 from-[#CEDBCE] via-[#8C958C] to-[#5C665C] rounded-t-2xl">
            <div @click="menuOpen()" class="text-right mr-10">
              <ion-icon class="absolute hover:scale-125 text-2xl h-8 w-8 cursor-pointer rounded-xl mt-3" name="close"></ion-icon>
            </div>
            <h1 class="sm:text-[32px] text-[30px] text-center pt-8">{{ selectedResto.restaurantName }}</h1>
          </div>
          <div class="md:columns-2">
            <div class="">
              <div class="pt-8 flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20 md:mr-7" for="">Waktu Reservasi</label>
                <div class="flex justify-between">
                  <input disabled type="time" class="ml-10 lg:ml-20 hover:scale-105 w-32 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" v-model="selectedResto.waktuMulai" required>
                  <p class="mt-6">-</p>
                  <input disabled type="time" class="mr-10 lg:mr-20 hover:scale-105 w-32 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" v-model="selectedResto.waktuSelesai" required>
                </div>
              </div>
            </div>
            <div class="">
              <div class="pt-8 flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Tanggal Reservasi</label>
                <input disabled type="date" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" v-model="selectedResto.tanggalReservation" required>
              </div>
            </div>
            <div class="pt-8">
              <div class="flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Atas Nama</label>
                <input disabled type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Nama" v-model="selectedResto.name" required>
              </div>
            </div>
            <div class="">
              <div class="pt-8 flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">No. Handphone</label>
                <input disabled type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="No. Handphone" v-model="selectedResto.noHP" required>
              </div>
            </div>
            <div class="pt-8 flex flex-col">
              <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Jumlah Orang</label>
              <input disabled type="number" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Jumlah Orang" v-model="selectedResto.jumlahOrang" required>
            </div>
            <div class="pt-8">
              <div class="mt-2">
                <label class="font-bold text-[20px] ml-10 lg:ml-20" for="" placeholder="" required>Harga</label>
                <p class="ml-10 lg:ml-20 mt-5">{{ selectedResto.totalHarga }}</p>
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
      reservs: [],
      currentPage: 1,
      reservationsPerPage: 5,
      open: false,
      loading: true,
      selectedResto: {
        restaurantName: '',
        waktuMulai: '',
        waktuSelesai: '',
        tanggalReservation: '',
        name: '',
        noHP: '',
        jumlahOrang: '',
        totalHarga: ''
      }
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.reservs.length / this.reservationsPerPage);
    },
    paginatedReservations() {
      const start = (this.currentPage - 1) * this.reservationsPerPage;
      const end = start + this.reservationsPerPage;
      return this.reservs.slice(start, end);
    }
  },
  async created() {
    await this.checkLogin();
    this.fetchReservations();
  },
  methods: {
    async checkLogin() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BE}/user/${this.$route.params.id}`);
        if (response.status !== 200 || !response.data.userLogin) {
          window.location.href = `${import.meta.env.VITE_FE}/nolog`;
        }
      } catch (error) {
        console.error("Error checking user login:", error);
        window.location.href = `${import.meta.env.VITE_FE}/nolog`;
      }
    },
    async fetchReservations() {
      try {
        const userResponse = await axios.get(`${import.meta.env.VITE_BE}/user/${this.$route.params.id}`);
        if (userResponse.status === 200) {
          const userData = userResponse.data.userLogin;
          if (userData) {
            const userId = userData._id;
            const response = await axios.get(`${import.meta.env.VITE_BE}/reservasimu/${userId}`);
            const reservations = response.data.reservations;

            const reservationPromises = reservations.map(async (reservation) => {
              const restaurantResponse = await axios.get(`${import.meta.env.VITE_BE}/restaurant/${reservation.restaurant_id}`);
              reservation.restaurantName = restaurantResponse.data.restaurant.name;
              return reservation;
            });

            this.reservs = await Promise.all(reservationPromises);
          } else {
            console.error("User data is undefined:", userResponse.data);
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      } finally {
        this.loading = false;
      }
    },
    async deleteReservation(reservationId) {
      if (confirm('Anda yakin ingin menghapus?')) {
        try {
          await axios.post(`${import.meta.env.VITE_BE}/delete-reservation`, { id_reservation: reservationId });
          alert('Reservation berhasil dihapus');
          this.fetchReservations();
        } catch (error) {
          console.error('Error deleting reservation:', error);
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
    menuOpen() {
      this.open = !this.open;
    },
    selectReservation(resto) {
      this.selectedResto = { ...resto };
      this.menuOpen();
    }
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
