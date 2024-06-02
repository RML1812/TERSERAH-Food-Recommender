<template>
    <div  class="my-10 ">
        <div class="font-[Poppins]">
            <div class=" flex-col grid-cols-2 grid ">
                <div class="text-left ml-10 md:ml-[80px] text-md flex">
                    <h1>Menampilkan {{ value }} Hasil dari 100</h1>
                </div>
                <div class="object-right mr-10 md:mr-[80px] text-right">
                    <span class="font-bold text-md"> Rating</span>
                    <ion-icon class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " onclick="onToggleMenuss(this)" name= "arrow-up"></ion-icon>
                </div>
            </div>
            <div>
                <div class=" flex-col sm:grid-cols-2 sm:grid sm:gap-4  md:justify-between mx-10 md:mx-20">
                    <div v-for="resto in promos">  
                        <div class="md:mt-5 mt-4">
                            <div class="cursor-pointer hover:opacity-90 hover:scale-105 bg-[url('/public/gambar.png')] text-white h-[115px] lg:h-[210px] w-auto text-[15px] bg-cover rounded-3xl shadow-xl border-black">
                                <div class="bg-gradient-to-b border-black-l-neutral-600 from-[#636963] via-transparent to-[#636963] h-[115px] lg:h-[210px] w-auto opacity-100 rounded-3xl shadow-xl border-black">
                                    <div class="ml-7 mt-5">
                                        <div class="pt-5">   
                                            <div class="flex flex-row justify-between">
                                                <h1 class="font-bold">{{ resto.name }}</h1>
                                                <h1 class="font-bold mr-6">{{ resto.price }}</h1>
                                            </div>
                                            <p class="mt-1 text-[12px] font">Tipe Kuliner</p>
                                            <div class="flex justify-between lg:mt-20">
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
                <div class="md:mx-20 mx-10 mt-8 font-light">
                    <div class="flex justify-center">
                        <div>
                            <ion-icon @click="menuLefts()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name= "arrow-dropleft-circle"></ion-icon>
                            <ion-icon @click="menuLeft()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name= "arrow-dropleft"></ion-icon>
                        </div>
                        <div>
                            <p class="font-bold text-[16px] mx-14">{{ value }} dari 100</p>
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
</template>

<script>

    export default {
    components : {

    },
    data(){
        return {
            promos: [
                {name : "Restoran 1", price : "Rp. 100.000 - Rp. 900.000", link: '#'},
                {name : "Restoran 2", price : "Rp. 100.000 - Rp. 800.000", link: '#'},
                {name : "Restoran 3", price : "Rp. 100.000 - Rp. 1.000.000", link: '#'},
                {name : "Restoran 4", price : "Rp. 100.000 - Rp. 1.100.000", link: '#'},
                {name : "Restoran 5", price : "Rp. 100.000 - Rp. 800.000", link: '#'},
                {name : "Restoran 6", price : "Rp. 100.000 - Rp. 700.000", link: '#'},
                {name : "Restoran 7", price : "Rp. 100.000 - Rp. 850.000", link: '#'},
                {name : "Restoran 8", price : "Rp. 150.000 - Rp. 900.000", link: '#'},
                {name : "Restoran 9", price : "Rp. 100.000 - Rp. 1.400.000", link: '#'},
                {name : "Restoran 10", price : "Rp. 200.000 - Rp. 1.200.000", link: '#'},
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