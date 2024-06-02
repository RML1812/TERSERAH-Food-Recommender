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
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer ">
            <p>Reservasi-mu</p>
          </div>
        </RouterLink>
        <RouterLink to="/wishlist">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px]  text-center pt-3 bg-[#DBDBDB] cursor-pointer ">
            <p>Wishlist</p>
          </div>
        </RouterLink>
        <RouterLink to="/review">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] rounded-b-2xl text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer ">
            <p>Review-mu</p>
          </div>
        </RouterLink>
      </div>
        <div class="h-auto w-full lg:mr-52 md:mr-40 mr-10 bg-[#F2F2F2] rounded-xl items-center  shadow-lg border">
            <div class="mt-10">
              <div class="lg:columns-3 md:columns-2  gap-10 mx-10">
                    <div v-for="resto in wishs" class="">  
                        <div class="mb-10">
                                <div class=" cursor-pointer hover:opacity-90 bg-[url('/public/gambar.png')] text-white h-[200px] lg:h-[250px] md:h-[220px] w-auto text-[15px] bg-cover rounded-3xl shadow-xl border-black">
                                    <div class="bg-gradient-to-b border-black-l-neutral-600 from-[#636963] via-transparent to-[#636963] h-[200px] lg:h-[250px] md:h-[220px] w-auto opacity-100 rounded-3xl shadow-xl border-black">
                                      <div class="float-right">
                                        <div class="absolute bg-[#997380] hover:scale-110 sm:h-14 sm:w-14 h-12 w-12 rounded-full sm:-mt-5 -mt-3 -ml-10">
                                          <div class="sm:h-2 sm:w-8 h-2 w-6 bg-white sm:mt-6 mt-5 ml-3">

                                          </div>
                                        </div>  
                                      </div>
                                      <div class="ml-7">
                                            <div class="pt-5">
                                                <h1 class="font-bold lg:text-lg md:text-md">{{ resto.name }}</h1>
                                                <p class="mt-1 text-[12px] font">Tipe Kuliner</p>
                                                <div class="flex justify-between lg:mt-28 mt-20">
                                                    <p class="mt-3 text-[12px] text-[#f2f2f2] font-medium">Kecamatan</p>
                                                    <div class="flex mr-6 lg:mt-5 lg:ml-3">
                                                        <img src="/public/Star.png" class="mt-3 h-5 w-5 lg:h-4 lg:w-4" alt="">
                                                        <p class="mt-2 text-[16px] text-[#f2f2f2] font-bold">4.2</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
  </div>
</template>

<script>

  export default {
  components : {

  },
  data(){
      return {
          wishs: [
              {name : "Restaurant 1", date: '21/05/2024', jumlah: 10, jam: "12:00"},
              {name : "Restaurant 2", date: '22/05/2024', jumlah: 15, jam: "13:00"},
              {name : "Restaurant 3", date: '23/05/2024', jumlah: 13, jam: "14:00"},
              {name : "Restaurant 4", date: '24/05/2024', jumlah: 12, jam: "16:00"},
              {name : "Restaurant 5", date: '25/05/2024', jumlah: 18, jam: "17:00"},
              {name : "Restaurant 6", date: '26/05/2024', jumlah: 21, jam: "11:00"},
          ],
          value : 10
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
      }
  }
  
  }
</script>