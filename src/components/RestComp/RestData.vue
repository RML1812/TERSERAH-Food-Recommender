<template>
    <div class="font-[Poppins]">
        <div class="my-8 lg:mx-32 md:mx-20 sm:mx-10">
            <div class="sm:flex">
                <div>
                    <div :class="backgroundClass"  class=" bg-no-repeat bg-cover md:w-[300px] md:h-[230px] lg:w-[400px] lg:h-[270px] sm:w-[250px] sm:h-[215px] mx-10 sm:mx-0 h-[250px]  shadow-2xl border rounded-xl ">
                        <div class="">
                            <div class="bg-[#C2CFC2] lg:w-36 lg:h-8 md:w-32 md:h-7 lg:mx-32 md:mx-20 sm:mx-16 mx-24 h-7 mt-6 rounded-3xl flex shadow-xl border">
                                <div v-if="menu" @click="galeri()"  class="bg-[#C2CFC2] lg:w-[72px] lg:h-[30px] md:w-[64px] md:h-[26px] sm:w-[64px] sm:h-[26px] w-full h-[26px] text-center rounded-l-3xl lg:pt-[6px] md:pt-[4px] sm:pt-[3px] pt-[2px] text-[14px] font-medium hover:text-white  cursor-pointer">
                                    <p>Galeri</p>
                                </div>
                                <div v-if="menu" class="bg-[#636963] lg:w-[72px] lg:h-[30px] md:w-[64px] md:h-[26px] sm:w-[64px] sm:h-[26px] w-full h-[26px] text-center rounded-r-3xl lg:pt-[6px] md:pt-[4px] sm:pt-[3px] pt-[2px] text-[14px] font-medium text-white cursor-pointer">
                                    <p>Menu</p>
                                </div>
                                <div v-if="!menu" class="bg-[#636963]  lg:w-[72px] lg:h-[30px] md:w-[64px] md:h-[26px] sm:w-[64px] sm:h-[26px] w-full h-[26px] text-center rounded-l-3xl lg:pt-[6px] md:pt-[4px] sm:pt-[3px] pt-[2px] text-[14px] font-medium text-white hover:bg-[#636963] cursor-pointer">
                                    <p>Galeri</p>
                                </div>
                                <div v-if="!menu" @click="galeri()" class="bg-[#C2CFC2] lg:w-[72px] lg:h-[30px] md:w-[64px] md:h-[26px] sm:w-[64px] sm:h-[26px] w-full h-[26px] text-center rounded-r-3xl lg:pt-[6px] md:pt-[4px] sm:pt-[3px] pt-[2px] text-[14px] font-medium text-black  hover:text-white cursor-pointer">
                                    <p>Menu</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="menu" class="flex mx-4 center items-center">
                            <ion-icon @click="prevHidang" class="lg:mt-36 mt-28 mr-2 hover:scale-110 text-2xl h-6 w-7 bg-white rounded-2xl cursor-pointer" name="arrow-dropleft"></ion-icon>
                            <img v-for="(img, index) in visibleHidangan" :src="img" :key="index" @click="changeBackground(img)" class="lg:mt-36 mt-28 mr-2 hover:scale-105 cursor-pointer bg-no-repeat shadow-3xl border-2 bg-cover w-[105px] md:h-14 sm:h-10 h-14 rounded-xl">
                            <ion-icon @click="nextHidang" class="lg:mt-36 mt-28 hover:scale-110 text-2xl bg-white rounded-2xl h-6 w-7 cursor-pointer" name="arrow-dropright"></ion-icon>
                        </div>
                        <div v-if="!menu" class="flex mx-4 center items-center">
                            <ion-icon @click="prevImages" class="lg:mt-36 mt-28 mr-2 hover:scale-110 text-2xl h-6 w-7 bg-white rounded-2xl cursor-pointer" name="arrow-dropleft"></ion-icon>
                            <img v-for="(img, index) in visibleImages" :src="img" :key="index" @click="changeBackground(img)" class="lg:mt-36 mt-28 mr-2 hover:scale-105 cursor-pointer bg-no-repeat shadow-3xl border-2 bg-cover w-[105px] md:h-14 sm:h-10 h-14 rounded-xl">
                            <ion-icon @click="nextImages" class="lg:mt-36 mt-28 hover:scale-110 text-2xl bg-white rounded-2xl h-6 w-7 cursor-pointer" name="arrow-dropright"></ion-icon>
                        </div>
                    </div>
                </div>
                <div  class="flex flex-col ml-10 text-justify mt-6 sm:mt-0">
                    <div class="flex md:mt-4 sm:mt-2">
                        <img class="lg:h-6 md:h-5 h-4 sm:h-4  mt-3 mr-4" src="/public/Map.png" alt="">
                        <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] mr-11 sm:mr-0 font-medium">Jalan Bendi Besar Ujung No.19B, Tanah Kusir, Kebayoran Lama, Jakarta Selatan </p>
                    </div> 
                    <div class="flex">
                        <div class="flex mt-4">
                            <img class="lg:h-6 md:h-5 h-4 sm:h-4 mt-1 mr-4" src="/public/Clock.png" alt="">
                            <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] font-medium">10:00 - 22:00</p>
                        </div>
                        <div class="flex mt-4">
                            <img class="ml-7 lg:h-5 md:h-4 h-4 sm:h-4 mt-1 mr-4" src="/public/Phone.png" alt="">
                            <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] mr-11 sm:mr-0 font-medium">021 7290576</p>
                        </div>
                    </div> 
                    <div class="flex">
                        <div class="flex mt-4">
                            <img class="ml-1 lg:h-5 md:h-4 h-4 sm:h-4 mt-1 mr-4" src="/public/Check.png" alt="">
                            <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] font-medium">Cabang</p>
                        </div>
                        <div class="flex mt-4">
                            <img class="ml-7 lg:h-5 md:h-4 h-4 sm:h-4 mt-1 mr-4" src="/public/Money.png" alt="">
                            <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] mr-11 sm:mr-0 font-medium">Rp. 100.000 - Rp. 200.000</p>
                        </div>
                    </div> 
                    <div class="flex mt-4">
                        <img class="lg:h-6 md:h-5 h-4 sm:h-4 mt-1 mr-4" src="/public/Cashier.png" alt="">
                        <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] mr-11 sm:mr-0 font-medium">Tunai, Visa, Master, Debet, Gopay, Ovo</p>
                    </div> 
                    <div class="flex mt-4">
                        <img class="lg:h-6 md:h-5 h-4 sm:h-4  mt-3 mr-4" src="/public/Hand.png" alt="">
                        <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] mr-11 sm:mr-0 font-medium">Wifi, Area merokok, Area outdoor, Ruang VIP, Bisa reservasi, Area parkir</p>
                    </div> 
                </div>
            </div>
            <div class="mt-5 mx-10 sm:mx-0">
                <div>
                    <div v-if="open">
                        <div class="absolute mt-6 sm:mt-0 bg-[#C28C9E] lg:h-40 lg:w-[400px] md:w-[300px] sm:w-[250px] md:h-36 h-64 rounded-lg ">
                            <div class="md:columns-2 mt-12 lg:mx-5 md:mx-2 mx-3">
                                <div v-for="rat in rating">
                                    <div class="flex mb-2 text-white justify-between">
                                        <p class="lg:text-[17px] md:text-[15px] ">{{rat.name}}</p>
                                        <div class="flex">
                                            <img src="/public/Star.png" class="mt-1 h-4 w-4 ml-2" alt="">
                                            <p class="text-white mt-0.5 lg:text-[15px] md:text-[14px] ml-2 mr-1">{{rat.rate}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="absolute bg-[#997380] lg:w-[400px] md:w-[300px] sm:w-[250px] md:h-[35px] h-[32px] shadow-xl border rounded-lg mt-6 sm:mt-0">
                        <div class="flex justify-between">
                            <div class="">
                                <h1 class="sm:pl-5 pl-2 pt-1 text-white font-semibold md:text-[18px] sm:text-[16px] text-[14px]">Total Rating</h1>
                            </div>
                            <div class="flex sm:mr-6 mr-2">
                                <img src="/public/Star.png" class="mt-2 lg:h-5 lg:w-5 md:h-[16px] sm:h-[15px] sm:w-[15px] h-[14px] w-[14px] ml-2" alt="">
                                <p class="font-bold text-white mt-1 lg:text-[18px] md:text-[17px] text-[15px] ml-2 mr-1">4.5</p>
                                <img @click="menuOpen()" src="/public/Down.png" class="hover:scale-125 cursor-pointer lg:mt-4 mt-3 h-2 w-3 ml-2" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex flex-col sm:flex-row float-right">
                        <p class="sm:pt-1 lg:text-[16px]  md:text-[14px] sm:text-[13px] text-[13px] font-bold sm:mr-5 mx-5 sm:mx-0 mb-1 sm:mb-1 ">Slot: 5 Orang </p>
                        <a href="" class="h-auto w-auto rounded-lg bg-black text-white text-center py-1 md:px-8 sm:px-6 hover:bg-slate-500 sm:text-[15px] lg:text-[17px]">Reservasi</a>
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
                rating: [
                {name : "Rasa", rate : "4.5"},
                {name : "Harga:Rasa", rate : "4.6"},
                {name : "Kebersihan", rate : "4.3"},
                {name : "Suasana", rate : "4.5"},
                {name : "Pelayanan", rate : "4.2"},
                {name : "Aroma", rate : "4.9"},
                ],
                open : false,
                currentImage: '/public/batagor.jpg',
                images: [
                '/public/download.jpg',
                '/public/gambar.png',
                '/public/Image(1).png',
                '/public/Image(1).png',
                '/public/gambar.png',
                '/public/download.jpg',
                '/public/download.jpg',
                '/public/gambar.png',
                '/public/Image(1).png',
                ],
                hidangan: [
                '/public/ayam.jpeg',
                '/public/sate.jpeg',
                '/public/gacoan.jpeg',
                '/public/soto.jpg',
                '/public/kwetiaw.jpg',
                '/public/batagor.jpg',
                '/public/bakso.jpg',
                '/public/bubur.jpg',
                '/public/karedok.jpg',
                ],
                startIndex: 0,
                menu : true
            }
        },

        computed: {
            backgroundClass() {
                return `bg-[url('${this.currentImage}')]`;
            },
            visibleImages() {
                return this.images.slice(this.startIndex, this.startIndex + 3);
            },
            visibleHidangan() {
                return this.hidangan.slice(this.startIndex, this.startIndex + 3);
            }
        },
        
        methods: {
            menuOpen() {
                this.open = !this.open
            },
            galeri() {
                this.menu = !this.menu
            },
            changeBackground(image) {
                this.currentImage = image;
            },
            nextImages() {
                if (this.startIndex + 3 < this.images.length) {
                    this.startIndex += 3;
                } else{
                    this.startIndex = 0;
                }
            },
            prevImages() {
                if (this.startIndex - 3 >= 0) {
                    this.startIndex -= 3;
                } else{
                    this.startIndex = this.images.length-3;
                }
            },
            nextHidang() {
                if (this.startIndex + 3 < this.hidangan.length) {
                this.startIndex += 3;
                } else{
                    this.startIndex = 0;
                }
            },
            prevHidang() {
                if (this.startIndex - 3 >= 0) {
                    this.startIndex -= 3;
                } else{
                    this.startIndex = this.hidangan.length-3;
                }
            }
        },

       
    }
</script>