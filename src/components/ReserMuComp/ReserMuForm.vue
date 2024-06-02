<template>
    <div class="mb-16 font-[Poppins] my-16">
      <div class="flex justify-center">
        <div class="h-[200px] w-64 bg-[#F2F2F2] rounded-2xl shadow-lg border mr-3 flex flex-col md:ml-28 ml-4">
          <RouterLink to="/profil">
            <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] hover:bg-[#DBDBDB] text-[14px] rounded-t-2xl text-center pt-3 cursor-pointer ">
              <p>Profil</p>
            </div>
          </RouterLink>
          <RouterLink to="/reservasimu">
            <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] text-center pt-3 bg-[#DBDBDB] cursor-pointer ">
              <p>Reservasi-mu</p>
            </div>
          </RouterLink>
          <RouterLink to="/wishlist">
            <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px]  text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer ">
              <p>Wishlist</p>
            </div>
          </RouterLink>
          <RouterLink to="/review">
            <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] rounded-b-2xl text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer ">
              <p>Review-mu</p>
            </div>
          </RouterLink>
        </div>
          <div class="h-auto w-full lg:mr-52 md:mr-40 mr-10  bg-[#F2F2F2] rounded-xl items-center  shadow-lg border">
              <div class="">
                <div class="flex flex-col mt-5 mb-10">
                  <div v-for="resto in reservs" class="text-white">  
                    <div class="bg-[#997380] h-24 w-auto mt-4 md:mx-10 mx-5 rounded-lg hover:bg-[#BD97A4] cursor-pointer">
                      <div class="flex flex-col md:mx-7 mx-2 gap-1 sm:gap-0">
                        <div class="mt-3">
                          <img @click="menuOpen()" class="cursor-pointer md:h-5 h-4 hover:scale-125 mt-1 float-right" src="/public/Seru.png" alt="">
                        </div>
                        <div class="flex">
                          <p class="font-bold md:text-2xl text-xl">{{ resto.name }}</p>
                          <img class="cursor-pointer md:h-5 h-4 hover:scale-125 mt-1 ml-4" src="/public/Back.png" alt="">
                        </div>
                        <div class="text-right ">
                          <p class="lg:text-[15px] sm:text-[13px] text-[12px]">{{ resto.jumlah }} Orang - {{ resto.date }} - {{ resto.jam }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="lg:mx-20 md:mx-8 mx-4 my-8 font-light">
                    <div class="flex justify-center">
                        <div>
                            <ion-icon @click="menuLefts()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name= "arrow-dropleft-circle"></ion-icon>
                            <ion-icon @click="menuLeft()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name= "arrow-dropleft"></ion-icon>
                        </div>
                        <div>
                            <p class="font-bold text-[16px] md:mx-14 mx-6">{{ value }} dari 100</p>
                        </div>
                        <div>
                            <ion-icon @click="menuRight()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name= "arrow-dropright"></ion-icon>
                            <ion-icon @click="menuRights()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name= "arrow-dropright-circle"></ion-icon>
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </div>
      <div v-if="open">
        <div class="font-[Poppins] bg-[#F2F2F2] text-black h-auto lg:w-[900px] md:w-[800px] sm:w-[600px] w-[420px] sm:ml-20 ml-8  top-[100px] absolute rounded-2xl border-spacing-60 shadow-xl">
            <div class="mb-10">    
                <div class=" bg-gradient-to-r text-white font-bold w-full h-28 from-[#CEDBCE] via-[#8C958C] to-[#5C665C] rounded-t-2xl">
                    <div @click="menuOpen()" class="text-right mr-10">
                        <ion-icon class="absolute hover:scale-125 text-2xl  h-8 w-8 cursor-pointer rounded-xl mt-3" name= "close"></ion-icon>
                    </div>
                    <h1 class="sm:text-[32px] text-[30px] text-center pt-8">Restaurant 1</h1>
                </div>
                <div class="md:columns-2">
                        <div class="">
                          <div class="pt-8 flex flex-col">
                            <label class=" font-bold text-[20px] ml-10 lg:ml-20 md:mr-7" for="">Waktu Reservasi</label>
                            <div class="flex justify-between">
                              <input disabled type="time" class="ml-10 lg:ml-20 hover:scale-105 w-32 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" required>
                              <p class="mt-6 ">-</p>
                              <input disabled type="time" class="mr-10 lg:mr-20 hover:scale-105 w-32 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" required>
                            </div>
                          </div>
                        </div>
                        <div class="">
                          <div class="pt-8 flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20 " for="">Tanggal Reservasi</label>
                            <input disabled type="date" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1"required>
                          </div>
                        </div>
                        <div class="pt-8">
                          <div class="flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Atas Nama</label>
                            <input disabled type="month" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Nama" v-model="nama" required>
                          </div>
                        </div>
                        <div class="">
                          <div class="pt-8 flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">No. Handphone</label>
                            <input disabled type="month" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="No. Handphone" v-model="handphone" required>
                          </div>                          
                        </div>
                          <div class="pt-8 flex flex-col">
                            <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Jumlah Orang</label>
                            <input disabled type=" number" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Jumlah Orang" v-model="jumlah" required>
                          </div>
                        <div class="pt-8">
                            <div class="mt-2">
                              <label class="font-bold text-[20px] ml-10 lg:ml-20" for="" placeholder="" required>Harga</label>
                              <p class="ml-10 lg:ml-20 mt-5">Rp 69.999</p>
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
            reservs: [
                {name : "Restaurant 1", date: '21/05/2024', jumlah: 10, jam: "12:00"},
                {name : "Restaurant 2", date: '22/05/2024', jumlah: 15, jam: "13:00"},
                {name : "Restaurant 3", date: '23/05/2024', jumlah: 13, jam: "14:00"},
                {name : "Restaurant 4", date: '24/05/2024', jumlah: 12, jam: "16:00"},
                {name : "Restaurant 5", date: '25/05/2024', jumlah: 18, jam: "17:00"},
            ],
            value : 10,
            open : false
        }
    },
    methods: {
        menuLefts(){
            if(this.value >=10 && this.value <=100) {
                this.value = 10
            }
        },
        menuLeft(){
            if(this.value >10 && this.value <=100) {
                this.value-=10
            }
        },
        menuRights(){
            if(this.value >=10 && this.value <=100) {
                this.value = 100
            }
        },
        menuRight(){
            if(this.value >=10 && this.value <100) {
                this.value += 10
            }
        },
        menuOpen() {
          this.open = !this.open
      }
    }
    
    }
</script>