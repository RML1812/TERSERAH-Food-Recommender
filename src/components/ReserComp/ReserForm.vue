<template>
  <div class="mb-16 font-[Poppins]">
    <div class="h-auto w-auto md:mx-32 mx-10 bg-[#F2F2F2] rounded-xl items-center shadow-lg border">
      <div class="pt-5">
        <form @submit.prevent="checkSlot">
          <div class="md:columns-2">
            <div class="">
              <div class="pt-8 flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20 md:mr-7" for="">Waktu Reservasi</label>
                <div class="flex justify-between">
                  <input v-model="awal" type="time" class="ml-10 lg:ml-20 hover:scale-105 w-32 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" required>
                  <p class="mt-6">-</p>
                  <input v-model="akhir" type="time" class="mr-10 lg:mr-20 hover:scale-105 w-32 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" required>
                </div>
              </div>
            </div>
            <div class="">
              <div class="pt-8 flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Tanggal Reservasi</label>
                <input v-model="tanggal" type="date" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" required>
              </div>
            </div>
          </div>
          <div class="text-center my-16">
            <button type="submit" class="w-auto h-10 px-10 bg-[#1E1E1E] text-white rounded-2xl hover:bg-[#5F685F]">
              Cek Slot
            </button>
          </div>
          <div v-if="validationError" class="mx-10 md:mx-20 mt-2 mb-8 text-center">
            <p class="text-red-600 font-semibold text-lg">{{ validationError }}</p>
          </div>
        </form>
        <hr class="my-10 border-t-black md:mx-20 mx-10">
          <div class="mb-10">
            <div class="bg-[#636963] h-12 w-auto mx-10 md:mx-20 py-2 rounded-2xl border shadow-xl">
              <p class="text-center font-bold text-white text-xl">
                <!-- Tampilkan pesan default jika belum cek slot -->
                <span v-if="availableSlots === null">Silahkan pilih tanggal dan waktu reservasimu terlebih dahulu ^^</span>
                <span v-else-if="availableSlots > 0">Slot: {{ availableSlots }} Orang</span>
                <span v-else>Yahh, slot reservasi untuk jadwal yang kamu pilih tidak tersedia nih :(</span>
              </p>
            </div>
          </div>
        <form @submit.prevent="showTransactionDetails">
          <div class="lg:columns-2 md:columns-2">
            <div>
              <div class="flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Atas Nama</label>
                <input type="text" class="mx-10 lg:mx-20 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1 transition-all"
                        placeholder="Nama" v-model="nama" :class="{ 'disabled-field': isDisabled }" :disabled="isDisabled" required>
              </div>
            </div>
            <div>
              <div class="pt-8 flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">No. Handphone</label>
                <input type="text" class="mx-10 lg:mx-20 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1 transition-all"
                        placeholder="No. Handphone" v-model="handphone" :class="{ 'disabled-field': isDisabled }" :disabled="isDisabled" required>
              </div>
            </div>
            <div class="pt-8 flex flex-col">
              <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Jumlah Orang</label>
              <input type="number" v-model="jumlah" class="mx-10 lg:mx-20 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1 transition-all"
                      placeholder="Jumlah Orang" :class="{ 'disabled-field': isDisabled }" :disabled="isDisabled" required>
            </div>
            <div class="pt-8">
              <div class="flex flex-col">
                <div class="h-auto mx-10 lg:mx-20 w-auto mt-5 rounded-xl bg-[#ffffff] px-4 py-4">
                  <div v-if="tanggal && nama">
                    <p class="text-[16px] font-semibold">
                      Tanggal Reservasi: {{ tanggal }}<br>
                      Waktu Reservasi: {{ awal }} - {{ akhir }} (@15.000/Jam)<br>
                      Jumlah Orang: {{ jumlah }} (@15.000)
                    </p><br><br>
                    a.n. {{ nama }} ({{ handphone }})
                  </div>
                </div>
                <div class="flex justify-between mt-2">
                  <label class="font-bold text-[20px] ml-10 lg:ml-20"> Total Harga</label>
                  <p class="lg:mr-20 mr-10">Rp {{ total | currency }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center my-16 lg:my-[60px]">
            <button type="submit" class="w-auto h-10 px-10 bg-[#1E1E1E] text-white rounded-2xl hover:bg-[#5F685F] transition-all"
                :class="{ 'disabled-button': isDisabled }" :disabled="isDisabled">
                Bayar & Reservasi
            </button>
          </div>
        </form>
        <DetailTransaction
          v-if="showPopup"
          :reservation="reservationDetails"
          :restaurant-id="$route.params.restaurantId"
          @close="showPopup = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DetailTransaction from './DetailTransaction.vue';

export default {
  components: {
    DetailTransaction
  },
  data() {
    return {
      nama: "",
      jumlah: 0,
      handphone: "",
      awal: '',
      akhir: '',
      tanggal: '',
      total: 0,
      availableSlots: null,
      showPopup: false,
      reservationDetails: {},
      restaurantSchedule: {}, // Data jadwal buka restoran
      validationError: '', // Untuk menyimpan pesan validasi waktu
    };
  },
  computed: {
    isDisabled() {
    // Field hanya akan dinonaktifkan jika slot belum dicek atau slot tidak tersedia
    return (
      this.availableSlots === null || // Kondisi awal (belum cek slot)
      this.availableSlots <= 0 // Slot tidak tersedia
    );
  }
  },
  watch: {
    awal: 'handleInputChange',
    akhir: 'handleInputChange',
    jumlah: 'handleInputChange',
    tanggal: 'validateReservationTime',
  },
  methods: {
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
    },
    async fetchRestaurantSchedule() {
      try {
        const response = await axios.get(`http://localhost:3000/restaurant/${this.$route.params.restaurantId}`);
        const { restaurant } = response.data;

        // Check if the open_schedule is a JSON-formatted string
        try {
          restaurant.open_schedule = JSON.parse(restaurant.open_schedule);
        } catch (error) {
          // If JSON.parse fails, it means it's not a JSON string, so parse it as a custom format
          restaurant.open_schedule = this.parseSchedule(restaurant.open_schedule);
        }

        this.restaurantSchedule = restaurant.open_schedule;
      } catch (error) {
        console.error("Error fetching restaurant schedule:", error);
      }
    },
    parseSchedule(scheduleStr) {
            const dayMap = {
                'Senin': 'Senin', 'Selasa': 'Selasa', 'Rabu': 'Rabu',
                'Kamis': 'Kamis', 'Jumat': 'Jumat', 'Sabtu': 'Sabtu', 'Minggu': 'Minggu'
            };
            let schedule = {};
            scheduleStr.split(', ').forEach(part => {
                // Check if the part indicates closure
                if (part.includes("Tutup")) {
                    const dayClosed = part.split(' ')[0]; // Assumes format "Day Tutup"
                    if (dayMap[dayClosed]) { // Check if it's a valid day
                        schedule[dayMap[dayClosed]] = "Tutup";
                    }
                    return; // Skip further processing for this part
                }

                let [daysRange, times] = part.split(' (');
                if (times) {
                    times = times.slice(0, -1); // Remove the closing parenthesis if times is not undefined
                }

                let daysSplit = daysRange.split(' - ');
                let startDay = daysSplit[0].trim();
                let endDay = daysSplit.length > 1 ? daysSplit[1].trim() : startDay;

                let startIndex = Object.keys(dayMap).indexOf(startDay);
                let endIndex = endDay ? Object.keys(dayMap).indexOf(endDay) : startIndex;

                for (let i = startIndex; i <= endIndex; i++) {
                    let day = Object.keys(dayMap)[i];
                    schedule[day] = times; // Use times, assumes it's not "Tutup"
                }
            });
            return schedule;
        },
      validateReservationTime() {
        if (!this.tanggal || !this.awal || !this.akhir || !this.restaurantSchedule) {
            this.validationError = '';
            return;
        }

        const dayOfWeek = new Date(this.tanggal).toLocaleDateString('id-ID', { weekday: 'long' });
        const schedule = this.restaurantSchedule[dayOfWeek];

        console.log("Day of week:", dayOfWeek); // Check the computed day of week
        console.log("Schedule for the day:", schedule); // What does the schedule look like?

        if (!schedule || schedule === 'Tutup' || schedule.Closed) {
            this.validationError = `Restoran tidak bisa melakukan reservasi pada hari ${dayOfWeek} yang kamu pilih.`;
            return;
        }

        let openTime, closeTime;
        if (typeof schedule === 'string' && schedule.includes('-')) {
            // Split the string by '-' to extract the open and close times
            [openTime, closeTime] = schedule.split(' - ').map(s => s.trim());
        } else if (schedule.open && schedule.close) {
            // Use the open and close properties directly if they exist
            openTime = schedule.open;
            closeTime = schedule.close;
        } else {
            this.validationError = `Tidak ada informasi waktu buka untuk hari ${dayOfWeek}.`;
            return;
        }

        // Convert the times to Date objects for comparison
        const reservationStartTime = this.parseTime(this.awal);
        const reservationEndTime = this.parseTime(this.akhir);
        openTime = this.parseTime(openTime);
        closeTime = this.parseTime(closeTime);

        if (reservationStartTime < openTime || reservationEndTime > closeTime) {
            this.validationError = `Waktu reservasi harus di antara ${openTime.toLocaleTimeString('id-ID', { timeStyle: 'short' })} dan ${closeTime.toLocaleTimeString('id-ID', { timeStyle: 'short' })}.`;
        } else if (reservationStartTime >= reservationEndTime) {
            this.validationError = "Waktu mulai harus lebih awal daripada waktu selesai.";
        } else {
            this.validationError = '';
        }
    },
    parseTime(time) {
      const [hours, minutes] = time.split(':').map(Number);
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    },
    async checkSlot() {
      if (this.validationError) {
        alert(this.validationError);
        return;
      }

      if (!this.tanggal || !this.awal || !this.akhir) {
        alert("Silahkan pilih tanggal dan waktu terlebih dahulu.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/check-slot/${this.$route.params.restaurantId}`, {
          params: {
            tanggal: this.tanggal,
            waktuMulai: this.awal,
            waktuSelesai: this.akhir
          }
        });
        this.availableSlots = response.data.availableSlots;
      } catch (error) {
        console.error(error);
        alert("An error occurred while checking the slot availability.");
      }
    },
    handleInputChange() {
      this.validateReservationTime();
      this.calculateTotal();
    },
    calculateTotal() {
      // Parse waktu awal dan akhir
      const awalTime = this.parseTime(this.awal);
      const akhirTime = this.parseTime(this.akhir);

      // Hitung perbedaan jam
      const hoursDifference = (akhirTime - awalTime) / (1000 * 60 * 60);

      // Hitung total biaya (15.000 per orang + 15.000 per jam)
      if (hoursDifference > 0 && this.jumlah > 0) {
        this.total = (this.jumlah * 15000) + (hoursDifference * 15000);
      } else {
        this.total = 0;
      }
    },
    showTransactionDetails() {
      this.reservationDetails = {
        name: this.nama,
        jumlahOrang: this.jumlah,
        noHP: this.handphone,
        tanggalReservation: this.tanggal,
        waktuMulai: this.awal,
        waktuSelesai: this.akhir,
        totalHarga: this.total
      };
      this.showPopup = true;
    }
  },
  filters: {
    currency: function(value) {
      return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  async mounted() {
    await this.checkLogin();
    await this.fetchRestaurantSchedule();
  }
};
</script>


<style scoped>
/* Gaya untuk input field yang disabled */
.disabled-field {
  filter: brightness(70%);
  cursor: not-allowed;
}
.disabled-field:hover {
  filter: brightness(70%); 
}

/* Gaya untuk tombol yang disabled */
.disabled-button {
  filter: brightness(70%); 
  cursor: not-allowed; 
}
.disabled-button:hover {
  background-color: #1E1E1E;
}
</style>