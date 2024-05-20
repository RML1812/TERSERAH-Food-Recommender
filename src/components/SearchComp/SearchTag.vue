<template>
    <div class="mt-14 mb-10 font-[Poppins]">
        <div class=" bg-[url('/public/Background.png')] text-white  h-[320px]  md:mx-20 mx-10 lg:w-auto text-center bg-cover rounded-2xl ">
            <p class="text-center text-[15px]  pt-6 md:pt-8">Sumedang, Jawa Barat | ✓ 2 Filter</p>
            <div class="mx-10 my-2">
                <h1 class="font-bold text-[44px] mx:10 mx:10 md:text-[46px] lg:text-[48px]">Hasil <span class="text-[#C2CFC2] italic">Pencarian-</span> mu</h1>
            </div>
            <form action="">
                <div class="opacity-50 mt-10 md:mt-14">
                    <div class=" bg-[white] relative  md:h-10  h-7 w-auto  cursor-pointer md:mx-20 mx-16 flex rounded-3xl">
                        <img src="/public/Maps.png" class="hover:scale-125 opacity-100 my-auto ml-4 mr-2 h-3 w-3 md:h-4 md:w-4" alt="">
                        <input type="text" class=" w-screen border-none  cursor-pointer text-black outline-none">
                        <img src="/public/Filter.png" @click="menuOpen" class="hover:scale-125 opacity-100 my-auto  h-3 w-3 md:h-4 md:w-4 ml-1 mr-2  "  alt="">
                        <img src="/public/Search.png" class="hover:scale-125 opacity-100 my-auto h-3 w-3  md:h-4 md:w-4 mr-6" alt="">
                    </div>
                </div>
            </form>
            <div v-if="open">
                <div class="bg-[#F2F2F2] text-black h-auto w-auto mx-4 my-4 lg:left-[450px] md:left-[100px] left-1 md:top-[450px] lg:top-[370px] top-[400px] absolute rounded border-spacing-60 shadow-xl">
                    <div @click="menuOpen()" class="text-right mr-4 mt-4">
                        <ion-icon class="hover:scale-110 text-2xl  h-6 w-6 cursor-pointer rounded-xl" name= "close"></ion-icon>
                    </div>
                    <div class="-ml-[350px] md:-ml-[450px] ">
                        <h1 class="font-bold text-2xl text-black">Filter</h1>
                    </div>
                    <div class="-ml-[75px] mt-6">
                        <div class="columns-2">
                            <div class="">
                                <div>
                                    <h1 class="font-bold text-[18px]  text-black md:mr-10">Harga</h1>
                                </div>
                                <div class="mt-2">
                                    <label class="text-[14px] ml-20 text-black font-normal" for="">Rp</label>
                                    <input type="text" class="hover:scale-105 rounded-xl w-28 h-6 bg-[#D3D3D3] ml-2 pl-7 py-1" placeholder="00.000">
                                </div>
                                <div>
                                    <p class="text-black ml-28">-</p>
                                </div>
                                <div>
                                    <label class="text-[14px] ml-20 text-black font-normal" for="">Rp</label>
                                    <input type="text" class="hover:scale-105 rounded-xl w-28 h-6 bg-[#D3D3D3] ml-2 pl-7 py-1" placeholder="00.000">
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1 class="font-bold text-[18px] mr-28 text-black">Rating</h1>
                                </div>
                                <div class="mt-4">
                                    <div>
                                        <label for="" class="text-black mr-2">0</label>
                                        <input  type="range" id="points" class="range" v-model="nilai" name="points" min="0" max="5" step="0.1">
                                        <label for="" class="text-black ml-2">5</label>
                                    </div>
                                    <div>
                                        <span class="text-black">⭐ {{ nilaih }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="-ml-[210px] md:-ml-[300px] mt-6 mb-2">
                                <h1 class="text-black text-[18px] font-bold">Pembayaran</h1>
                            </div>
                            <div class="ml-[100px]">
                                <div>
                                    <div class="columns-4 mr-6">
                                        <div class="bg-[#D3D3D3] h-[30px] md:mb-1 w-[85px] ml-1 text-black shadow rounded-2xl cursor-pointer border hover:opacity-90 hover:scale-105" v-for="(buy, index) in Bayar">
                                            <p @click="menuBayar(buy, index)">{{ buy }}</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="text-black mt-3">
                                    <div class="columns-4 md:columns-6">
                                        <div v-for="fil in filter" class="mr-4">
                                            <span>{{ fil }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="md:-ml-[350px] -ml-[250px] mt-1 mb-2">
                                <h1 class="text-black text-[18px] font-bold">Fasilitas</h1>
                            </div>
                            <div class="ml-24 gap-3 md:mr-4 ">
                                <div class="columns-3 md:columns-4 mr-5">
                                    <div class="bg-[#D3D3D3] h-[30px] mb-1 w-auto ml-1 text-black shadow rounded-2xl cursor-pointer border hover:opacity-90 hover:scale-105 " v-for="(fas, index) in Fasil">
                                        <p @click="menuFasil(fas, index)" >{{ fas }}</p>
                                    </div>
                                </div>
                                <div class="text-black mt-3">
                                    <div class="columns-3 md:columns-4">
                                        <div v-for="fil2 in filter2" class="mr-4">
                                            <span>{{ fil2 }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="md:-ml-[320px] -ml-[250px] mt-1 mb-2">
                                <h1 class="text-black text-[18px] font-bold">Asal Kuliner</h1>
                            </div>
                            <div class="ml-24 mu-2 gap-3 md:mr-4">
                                <div class="columns-3 md:columns-4 mr-5">
                                    <div class="bg-[#D3D3D3] h-[30px] mb-1 w-auto ml-1 text-black shadow rounded-2xl cursor-pointer border hover:opacity-90 hover:scale-105 " v-for="(asal, index) in Asal">
                                        <p @click="menuAsal(asal, index)" >{{ asal }}</p>
                                    </div>
                                </div>
                                <div class="text-black mt-3">
                                    <div class="columns-3 md:columns-4  mb-6">
                                        <div v-for="fil3 in filter3" class="mr-4">
                                            <span>{{ fil3 }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="md:-ml-[320px] -ml-[250px] mt-1 mb-2">
                                <h1 class="text-black text-[18px] font-bold">Tipe Kuliner</h1>
                            </div>
                            <div class="ml-24 mu-2 gap-3 md:mr-4">
                                <div class="columns-3 md:columns-4 mr-5">
                                    <div class="bg-[#D3D3D3] h-[30px] mb-1 w-auto ml-1 text-black shadow rounded-2xl cursor-pointer border hover:opacity-90 hover:scale-105 " v-for="(tipe, index) in Tipe">
                                        <p @click="menuTipe(tipe, index)" >{{ tipe }}</p>
                                    </div>
                                </div>
                                <div class="text-black mt-3">
                                    <div class="columns-3 md:columns-4  mb-6">
                                        <div v-for="fil4 in filter4" class="mr-4">
                                            <span>{{ fil4 }}</span>
                                        </div>
                                    </div>
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

export default {
  components : {

  },
  data(){
    return {
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
      status: false
    }
  },

  methods : {
    menuBayar(beli, index) {
        if(beli == this.filter){
            this.filter.splice(index, 1)
        } else {
            this.filter.push(beli)
        }
        
    },
    menuFasil(fas) {
        if(fas == this.filter2){
            this.filter2.splice(index, 1)
        } else {
            this.filter2.push(fas)
        }
    },
    menuAsal(asal) {
        if(asal == this.filter3){
            this.filter3.splice(index, 1)
        } else {
            this.filter3.push(asal)
        }
    },
    menuTipe(tipe) {
        if(tipe == this.filter4){
            this.filter4.splice(index, 1)
        } else {
            this.filter4.push(tipe)
        }
    },
    menuOpen() {
        this.open = !this.open
    }
  },

  watch: {
    nilai(value) {
      this.nilaih = value
    },

  },
}
</script>