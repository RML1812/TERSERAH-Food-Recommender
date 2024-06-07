<template>
    <div class="mb-16 font-[Poppins]">
        <div class="h-auto w-auto md:mx-32 mx-10  bg-[#F2F2F2] rounded-xl items-center  shadow-lg border">
            <div class="pt-5">
                <form action="">
                    <div class="md:columns-2">
                        <div class="">
                          <div class="pt-8 flex flex-col">
                            <label class=" font-bold text-[20px] ml-10 lg:ml-20 md:mr-7" for="">Waktu Reservasi</label>
                            <div class="flex justify-between">
                              <input v-model="awal" type="time" class="ml-10 lg:ml-20 hover:scale-105 w-32 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" required>
                              <p class="mt-6 ">-</p>
                              <input v-model="akhir" type="time" class="mr-10 lg:mr-20 hover:scale-105 w-32 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" required>
                            </div>
                          </div>
                        </div>
                        <div class="">
                          <div class="pt-8 flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20 " for="">Tanggal Reservasi</label>
                            <input v-model="tanggal" type="date" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1"required>
                          </div>
                        </div>             
                    </div>
                    <div class="text-center my-16">
                      <button class="w-auto h-10 px-10 bg-[#1E1E1E] text-white rounded-2xl hover:bg-[#5F685F]">
                        Cek Slot
                      </button>
                    </div>
                  </form>
                  <hr class="my-10 border-t-black md:mx-20 mx-10">
                  <div class="mb-10">
                    <div class="bg-[#636963] h-12 w-auto mx-10 md:mx-20 py-2 rounded-2xl border shadow-xl ">
                      <p class="text-center font-bold text-white text-xl">Slot: {{ jumlah }} Orang</p>
                    </div>
                  </div>
                  <form action="">
                    <div class="lg:columns-2 md:columns-2">
                        <div class="">
                          <div class="flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Atas Nama</label>
                            <input  type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Nama" v-model="nama" required>
                          </div>
                        </div>
                        <div class="">
                          <div class="pt-8 flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">No. Handphone</label>
                            <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="No. Handphone" v-model="handphone" required>
                          </div>
                          
                          
                        </div>
                          <div class="pt-8 flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Jumlah Orang</label>
                            <input type=" number" v-model="jumlah" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Jumlah Orang" required>
                          </div>
                        <div class="pt-8">
                          <div class="flex flex-col">
                            <div name="" class="h-auto mx-10 lg:mx-20 w-auto mt-5 rounded-xl bg-[#ffffff] px-4 py-4">
                              <div v-if="tanggal && nama">
                                <p class="text-[16px] font-semibold">Tanggal Reservasi: {{ tanggal }}<br>
                                  Waktu Reservasi: {{ awal }} - {{ akhir }} (@15.000)<br>
                                  Jumlah Orang: {{ jumlah }} (@15.000)</p><br><br>
                                  a.n. {{ nama }} ({{ handphone }})
                                </div>
                            </div>
                            <div class="flex justify-between mt-2">
                              <label class="font-bold text-[20px] ml-10 lg:ml-20" for="" placeholder="" required>Harga</label>
                              <p class="lg:mr-20 mr-10">Rp {{ total | currency }}</p>
                            </div>
                          </div>
                        </div>
                    </div>
                    <div class="text-center my-16 lg:my-[60px]">
                      <button class="w-auto h-10 px-10 bg-[#1E1E1E] text-white rounded-2xl hover:bg-[#5F685F]">
                        Bayar & Reservasi
                      </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  components : {

  },
  data(){
    return {
      nama: "",
      jumlah: 0,
      handphone: "",
      awal: '',
      akhir: '',
      tanggal: '',
      total: 0,

    }
  },

  watch: {
        awal: 'calculateTotal',
        akhir: 'calculateTotal',
        jumlah: 'calculateTotal'
      },
      methods: {
        calculateTotal() {
          const awalTime = this.parseTime(this.awal);
          const akhirTime = this.parseTime(this.akhir);
          const hoursDifference = Math.ceil((akhirTime - awalTime) / (1000 * 60 * 60));

          if (!isNaN(hoursDifference) && hoursDifference > 0 && !isNaN(this.jumlah)) {
            this.total = (this.jumlah * 15000) + (hoursDifference * 15000);
          } else {
            this.total = 0;
          }
        },
        parseTime(time) {
          const [hours, minutes] = time.split(':').map(Number);
          const date = new Date();
          date.setHours(hours, minutes, 0, 0);
          return date;
        }
      },
      filters: {
        currency: function(value) {
          return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
      }

}
</script>