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
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px]  text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer ">
            <p>Wishlist</p>
          </div>
        </RouterLink>
        <RouterLink to="/review">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] rounded-b-2xl text-center pt-3 bg-[#DBDBDB] cursor-pointer ">
            <p>Review-mu</p>
          </div>
        </RouterLink>
      </div>
        <div class="h-auto w-full md:mr-52 mr-10  bg-[#F2F2F2] rounded-xl items-center  shadow-lg border">
            <div class="">
              <div class="flex flex-col mt-5 mb-10">
                <div v-for="resto in reviews" class="text-white">  
                  <div class="bg-[#997380] h-24 w-auto mt-4 md:mx-7 lg:mx-10 mx-5 rounded-lg hover:bg-[#BD97A4] cursor-pointer">
                    <div class="flex flex-col md:mx-7 mx-2 gap-1 sm:gap-0">
                      <div class="flex justify-end mt-3">
                        <img class="cursor-pointer md:h-5 h-4 hover:scale-125 mt-1 mr-4" src="/public/Trash.png" alt="">
                        <img class="cursor-pointer md:h-5 h-4 hover:scale-125 mt-1" @click="menuOpen()" src="/public/Edit.png" alt="">
                      </div>
                      <div class="flex">
                        <p class="font-bold md:text-2xl text-xl">{{ resto.name }}</p>
                        <img class="cursor-pointer md:h-5 h-4 hover:scale-125 mt-1 ml-4" src="/public/Back.png" alt="">
                      </div>
                      <div class="text-right">
                        <p class="lg:text-[15px] sm:text-[13px] text-[12px] italic">{{ resto.date }}</p>
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
  <div v-if="open">
        <div class="font-[Poppins] bg-[#F2F2F2] text-black h-auto lg:w-[1100px] md:w-[800px] sm:w-[600px] w-[420px] sm:ml-20 ml-8  top-[100px] absolute rounded-2xl border-spacing-60 shadow-xl">
            <div class="mb-10">    
                <div class=" bg-gradient-to-r text-white font-bold w-full h-28 from-[#C28C9E] via-[#9F5A7B] to-[#5C424B] rounded-t-2xl">
                    <div @click="menuOpen()" class="text-right mr-10">
                        <ion-icon class="absolute hover:scale-125 text-2xl  h-8 w-8 cursor-pointer rounded-xl mt-3" name= "close"></ion-icon>
                    </div>
                    <h1 class="sm:text-[32px] text-[30px] text-center pt-8">Tuliskan <span class="text-[#EDBBCC]">Review</span>-mu!</h1>
                </div>
                <div class="sm:columns-3 text-center my-10 md:mx-16 lg:mx-0 sm:mx-10 ">
                    <div>
                        <div>
                            <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Rasa</h1>
                        </div>
                        <div class="mt-4">
                            <div>
                                <input  type="range" id="points" class="range w-60" v-model="nilai1" name="points" min="0" max="5" step="0.1">
                            </div>
                            <div>
                                <span class="text-black">⭐ {{ nilaih1 }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Suasana</h1>
                        </div>
                        <div class="mt-4">
                            <div>
                                <input  type="range" id="points" class="range w-60" v-model="nilai2" name="points" min="0" max="5" step="0.1">
                            </div>
                            <div>
                                <span class="text-black">⭐ {{ nilaih2 }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Harga : Rasa</h1>
                        </div>
                        <div class="mt-4">
                            <div>
                                <input  type="range" id="points" class="range w-60" v-model="nilai3" name="points" min="0" max="5" step="0.1">
                            </div>
                            <div>
                                <span class="text-black">⭐ {{ nilaih3 }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Pelayanan</h1>
                        </div>
                        <div class="mt-4">
                            <div>
                                <input  type="range" id="points" class="range w-60" v-model="nilai4" name="points" min="0" max="5" step="0.1">
                            </div>
                            <div>
                                <span class="text-black">⭐ {{ nilaih4 }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Kebersihan</h1>
                        </div>
                        <div class="mt-4">
                            <div>
                                <input  type="range" id="points" class="range w-60" v-model="nilai5" name="points" min="0" max="5" step="0.1">
                            </div>
                            <div>
                                <span class="text-black">⭐ {{ nilaih5 }}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Aroma</h1>
                        </div>
                        <div class="mt-4">
                            <div>
                                <input  type="range" id="points" class="range w-60" v-model="nilai6" name="points" min="0" max="5" step="0.1">
                            </div>
                            <div>
                                <span class="text-black">⭐ {{ nilaih6 }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md:mx-20 sm:mx-10">
                    <div class="">
                        <h1 class="font-bold text-[20px] mt-5 sm:mt-0 ml-5">Review-mu</h1>
                    </div>
                    <div class="mt-6 mb-5">
                        <form action="">
                            <textarea name="" id="" class="bg-[#D3D3D3] w-96 sm:w-full rounded-md h-56 shadow-xl border p-5 mb-7 ml-5" placeholder="Ketik Review-mu disini....." ></textarea>
                            <button class="bg-black text-white px-14 float-right py-1 rounded-2xl mb-14 mr-10">Kirim</button>
                        </form>
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
          reviews: [
              {name : "Restaurant 1", date: '21/05/2024'},
              {name : "Restaurant 2", date: '22/05/2024'},
              {name : "Restaurant 3", date: '23/05/2024'},
              {name : "Restaurant 4", date: '24/05/2024'},
              {name : "Restaurant 5", date: '25/05/2024'},
          ],
          value : 5,
          open : false,
                nilai1 : "",
                nilai2 : "",
                nilai3 : "",
                nilai4 : "",
                nilai5 : "",
                nilai6 : "",
      }
  },
  methods: {
      menuLefts(){
          if(this.value >=5 && this.value <=100) {
              this.value = 5
          }
      },
      menuLeft(){
          if(this.value >5 && this.value <=100) {
              this.value-=5
          }
      },
      menuRights(){
          if(this.value >=5 && this.value <=100) {
              this.value = 100
          }
      },
      menuRight(){
          if(this.value >=5 && this.value <100) {
              this.value += 5
          }
      },
      menuOpen() {
          this.open = !this.open
      }
  },
  watch: {
            nilai1(value) {
                this.nilaih1 = value
            },
            nilai2(value) {
                this.nilaih2 = value
            },
            nilai3(value) {
                this.nilaih3 = value
            },
            nilai4(value) {
                this.nilaih4 = value
            },
            nilai5(value) {
                this.nilaih5 = value
            },
            nilai6(value) {
                this.nilaih6 = value
            },
        },

  
  }
</script>