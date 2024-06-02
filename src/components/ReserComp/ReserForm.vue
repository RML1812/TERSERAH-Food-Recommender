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
                              <input type="time" class="ml-10 lg:ml-20 hover:scale-105 w-32 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" required>
                              <p class="mt-6 ">-</p>
                              <input type="time" class="mr-10 lg:mr-20 hover:scale-105 w-32 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" required>
                            </div>
                          </div>
                        </div>
                        <div class="">
                          <div class="pt-8 flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20 " for="">Tanggal Reservasi</label>
                            <input type="date" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1"required>
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
                  <div class="">
                    <div class="bg-[#636963] h-12 w-auto mx-10 md:mx-20 py-2 rounded-2xl border shadow-xl ">
                      <p class="text-center font-bold text-white text-xl">Slot: 10 Orang</p>
                    </div>
                  </div>
                  <form action="">
                    <div class="lg:columns-2 md:columns-2">
                        <div class="pt-8">
                          <div class="flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Atas Nama</label>
                            <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Nama" v-model="nama" required>
                          </div>
                          <label for="" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userNama">Masukkan {{ user1 }} digit karakter (Minimal 10 Karakter)</label>
                        </div>
                        <div class="">
                          <div class="pt-8 flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">No. Handphone</label>
                            <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="No. Handphone" v-model="handphone" required>
                          </div>
                          <label for="" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userHandphone">Masukkan {{ user4 }} digit karakter (Minimal 10 Karakter)</label>
                          
                        </div>
                          <div class="pt-8 flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Jumlah Orang</label>
                            <input type=" number" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Jumlah Orang" v-model="jumlah" required>
                          </div>
                          <label for="" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userJumlah">Masukkan {{ user3 }} digit angka (Max 2 Angka)</label>
                        <div class="pt-8">
                          <div class="flex flex-col">
                            <textarea name="" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1"></textarea>
                            <div class="flex justify-between mt-2">
                              <label class="font-bold text-[20px] ml-10 lg:ml-20" for="" placeholder="" required>Harga</label>
                              <p class="lg:mr-20 mr-10">Rp 69.999</p>
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
      jumlah: "",
      handphone: "",
      userNama: false,
      userJumlah: false,
      userHandphone: false,
      user1: "",
      user2: "",
      user3: "",
      user4: "",
    }
  },

  watch: {
    nama(value) {
      if(value != ""){
        if(value.length <12){
          this.userNama = true
          this.user1 = 12 - value.length
        } else {
          this.userNama = false
        }
      } else {
        this.userNama = false
      }
    },

    jumlah(value) {
      if(value != ""){
        if(value.length <= 2){
          this.userJumlah = true
          this.user3 = 12 - value.length
        } else {
          this.userJumlah = false
        }
      } else{
        this.userJumlah = false
      }
    },

    handphone(value) {
      if(value != ""){
        if(value.length <10){
          this.userHandphone = true
          this.user4 = 10 - value.length
        } else {
          this.userHandphone = false
        }
      } else {
        this.userHandphone = false
      }
    },
 
  },
}
</script>