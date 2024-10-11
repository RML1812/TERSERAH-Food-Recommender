<template>
    <div v-if="restaurant" class="font-[Poppins]">
        <div class="my-8 lg:mx-32 md:mx-20 sm:mx-10">
            <div class="sm:flex">
                <div>
                    <div class="relative md:w-[300px] md:h-[230px] lg:w-[400px] lg:h-[270px] sm:w-[250px] sm:h-[215px] mx-10 sm:mx-0 h-[250px] shadow-2xl border rounded-xl overflow-hidden">
                        <img :src="imageSrc" class="absolute top-0 left-0 w-full h-full object-cover z-0">
                        <div class="relative z-10">
                            <div class="bg-[#C2CFC2] lg:w-36 lg:h-8 md:w-32 md:h-7 lg:mx-32 md:mx-20 sm:mx-16 mx-24 h-7 mt-6 rounded-3xl flex shadow-xl border">
                                <div v-if="menu" @click="toggleMenu" class="bg-[#C2CFC2] lg:w-[72px] lg:h-[30px] md:w-[64px] md:h-[26px] sm:w-[64px] sm:h-[26px] w-full h-[26px] text-center rounded-l-3xl lg:pt-[6px] md:pt-[4px] sm:pt-[3px] pt-[2px] text-[14px] font-medium hover:text-white cursor-pointer">
                                    <p>Galeri</p>
                                </div>
                                <div v-if="menu" class="bg-[#636963] lg:w-[72px] lg:h-[30px] md:w-[64px] md:h-[26px] sm:w-[64px] sm:h-[26px] w-full h-[26px] text-center rounded-r-3xl lg:pt-[6px] md:pt-[4px] sm:pt-[3px] pt-[2px] text-[14px] font-medium text-white cursor-pointer">
                                    <p>Menu</p>
                                </div>
                                <div v-if="!menu" class="bg-[#636963] lg:w-[72px] lg:h-[30px] md:w-[64px] md:h-[26px] sm:w-[64px] sm:h-[26px] w-full h-[26px] text-center rounded-l-3xl lg:pt-[6px] md:pt-[4px] sm:pt-[3px] pt-[2px] text-[14px] font-medium text-white hover:bg-[#636963] cursor-pointer">
                                    <p>Galeri</p>
                                </div>
                                <div v-if="!menu" @click="toggleMenu" class="bg-[#C2CFC2] lg:w-[72px] lg:h-[30px] md:w-[64px] md:h-[26px] sm:w-[64px] sm:h-[26px] w-full h-[26px] text-center rounded-r-3xl lg:pt-[6px] md:pt-[4px] sm:pt-[3px] pt-[2px] text-[14px] font-medium text-black hover:text-white cursor-pointer">
                                    <p>Menu</p>
                                </div>
                            </div>
                        </div>
                        <div v-if="menu" class="flex mx-4 center items-center relative z-10">
                            <ion-icon @click="prevHidang" class="lg:mt-36 mt-28 mr-2 hover:scale-110 text-2xl h-6 w-7 bg-white rounded-2xl cursor-pointer" name="arrow-dropleft"></ion-icon>
                            <img v-for="(img, index) in visibleHidangan" :src="img" :key="index" @click="changeBackground(img)" class="lg:mt-36 mt-28 mr-2 hover:scale-105 cursor-pointer bg-no-repeat shadow-3xl border-2 bg-cover w-[105px] md:h-14 sm:h-10 h-14 rounded-xl">
                            <ion-icon @click="nextHidang" class="lg:mt-36 mt-28 hover:scale-110 text-2xl bg-white rounded-2xl h-6 w-7 cursor-pointer" name="arrow-dropright"></ion-icon>
                        </div>
                        <div v-if="!menu" class="flex mx-4 center items-center relative z-10">
                            <ion-icon @click="prevImages" class="lg:mt-36 mt-28 mr-2 hover:scale-110 text-2xl h-6 w-7 bg-white rounded-2xl cursor-pointer" name="arrow-dropleft"></ion-icon>
                            <img v-for="(img, index) in visibleImages" :src="img" :key="index" @click="changeBackground(img)" class="lg:mt-36 mt-28 mr-2 hover:scale-105 cursor-pointer bg-no-repeat shadow-3xl border-2 bg-cover w-[105px] md:h-14 sm:h-10 h-14 rounded-xl">
                            <ion-icon @click="nextImages" class="lg:mt-36 mt-28 hover:scale-110 text-2xl bg-white rounded-2xl h-6 w-7 cursor-pointer" name="arrow-dropright"></ion-icon>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col ml-10 text-justify mt-6 sm:mt-0">
                    <div class="flex md:mt-4 sm:mt-2">
                        <img class="lg:h-6 md:h-5 h-4 sm:h-4 mt-3 mr-4" src="/public/Map.png" alt="">
                        <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] mr-11 sm:mr-0 font-medium mt-3">{{ restaurant.address }}</p>
                    </div>
                    <div class="flex">
                        <div class="flex mt-4">
                            <img class="lg:h-6 md:h-5 h-4 sm:h-4 mt-1 mr-4" src="/public/Clock.png" alt="">
                            <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] font-medium mt-1">{{ restaurant.open_schedule }}</p>
                        </div>
                        <div class="flex mt-4">
                            <img class="ml-7 lg:h-5 md:h-4 h-4 sm:h-4 mt-1 mr-4" src="/public/Phone.png" alt="">
                            <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] mr-11 sm:mr-0 font-medium mt-1">{{ restaurant.phone }}</p>
                        </div>
                    </div>
                    <div class="flex">
                        <div class="flex mt-4">
                            <img class="ml-1 lg:h-5 md:h-4 h-4 sm:h-4 mt-1 mr-4" src="/public/Check.png" alt="">
                            <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] font-medium">{{ restaurant.is_branch ? 'Cabang' : '-' }}</p>
                        </div>
                        <div class="flex mt-4">
                            <img class="ml-7 lg:h-5 md:h-4 h-4 sm:h-4 mt-1 mr-4" src="/public/Money.png" alt="">
                            <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] font-medium">{{ restaurant.price_range }}</p>
                        </div>
                    </div>
                    <div class="flex mt-4">
                        <img class="lg:h-6 md:h-5 h-4 sm:h-4 mt-1 mr-4" src="/public/Cashier.png" alt="">
                        <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] font-medium mt-1">{{ restaurant.payment_methods }}</p>
                    </div>
                    <div class="flex mt-4">
                        <img class="lg:h-6 md:h-5 h-4 sm:h-4 mt-3 mr-4" src="/public/Hand.png" alt="">
                        <p class="lg:text-[16px] md:text-[14px] sm:text-[13px] text-[14px] font-medium mt-3">{{ restaurant.available_facilities }}</p>
                    </div>
                </div>
            </div>
            <div class="mt-5 mx-10 sm:mx-0">
                <div>
                    <div v-if="open">
                        <div class="absolute mt-6 sm:mt-0 bg-[#C28C9E] lg:h-40 lg:w-[400px] md:w-[300px] sm:w-[250px] md:h-36 h-64 rounded-lg">
                            <div class="grid grid-cols-2 gap-4 mt-12 lg:mx-5 md:mx-2 mx-3">
                                <div v-for="(value, key) in individualRatings" :key="key">
                                    <div class="flex mb-2 text-white justify-between">
                                        <p class="lg:text-[17px] md:text-[15px]">{{ key }}</p>
                                        <div class="flex">
                                            <img src="/public/Star.png" class="mt-1 h-4 w-4 ml-2" alt="">
                                            <p class="text-white mt-0.5 lg:text-[15px] md:text-[14px] ml-2 mr-1">{{ value }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="absolute bg-[#997380] lg:w-[400px] md:w-[300px] sm:w-[250px] md:h-[35px] h-[32px] shadow-xl border rounded-lg mt-6 sm:mt-0">
                        <div class="flex justify-between">
                            <div>
                                <h1 class="sm:pl-5 pl-2 pt-1 text-white font-semibold md:text-[18px] sm:text-[16px] text-[14px]">Total Rating</h1>
                            </div>
                            <div class="flex sm:mr-6 mr-2">
                                <img src="/public/Star.png" class="mt-2 lg:h-5 lg:w-5 md:h-[16px] sm:h-[15px] sm:w-[15px] h-[14px] w-[14px] ml-2" alt="">
                                <p class="font-bold text-white mt-1 lg:text-[18px] md:text-[17px] text-[15px] ml-2 mr-1">{{ restaurant.overall_rating }}</p>
                                <img @click="menuOpen()" src="/public/Down.png" class="hover:scale-125 cursor-pointer lg:mt-4 mt-3 h-2 w-3 ml-2" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex flex-col sm:flex-row float-right">
                        <p v-if="restaurant" class="sm:pt-1 lg:text-[15px] md:text-[14px] sm:text-[13px] text-[13px] font-semibold sm:mr-5 mx-5 sm:mx-0 mb-1 sm:mb-1 italic">
                            Slot Tersedia: {{ restaurant.slot }} Orang
                        </p>
                        <button @click="redirectToReservation" class="h-auto w-auto rounded-lg bg-black text-white text-center py-1 md:px-8 sm:px-6 hover:bg-slate-500 sm:text-[15px] lg:text-[17px]">
                            Reservasi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['restaurantId'],
    data() {
        return {
            restaurant: null,
            reservations: [],
            individualRatings: {
                "Ambience": 0,
                "Taste to Price": 0,
                "Service": 0,
                "Cleanliness": 0
            },
            open: false,
            currentImage: '',
            images: [],
            hidangan: [],
            startIndex: 0,
            menu: true,
            menuData: {}
        };
    },
    computed: {
        imageSrc() {
            return this.currentImage;
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
            this.open = !this.open;
        },
        toggleMenu() {
            this.menu = !this.menu;
        },
        changeBackground(image) {
            this.currentImage = image;
            console.log('Changing background to:', image); // Debug log
        },
        nextImages() {
            if (this.startIndex + 3 < this.images.length) {
                this.startIndex += 3;
            } else {
                this.startIndex = 0;
            }
        },
        prevImages() {
            if (this.startIndex - 3 >= 0) {
                this.startIndex -= 3;
            } else {
                this.startIndex = this.images.length - 3;
            }
        },
        nextHidang() {
            if (this.startIndex + 3 < this.hidangan.length) {
                this.startIndex += 3;
            } else {
                this.startIndex = 0;
            }
        },
        prevHidang() {
            if (this.startIndex - 3 >= 0) {
                this.startIndex -= 3;
            } else {
                this.startIndex = this.hidangan.length - 3;
            }
        },
        encodeImageUrl(url) {
            return encodeURI(url);
        },
        async fetchRestaurantData() {
            if (!this.restaurantId) {
                console.error('Restaurant ID is not defined');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3000/restaurant/${this.restaurantId}`);
                const { rating, restaurant, reservations, menu } = response.data;
                this.restaurant = restaurant;

                // Set individual ratings
                this.individualRatings.Ambience = rating.ambience_rating;
                this.individualRatings["Taste to Price"] = rating.taste_to_price_rating;
                this.individualRatings.Service = rating.service_rating;
                this.individualRatings.Cleanliness = rating.cleanliness_rating;

                // Set reservations
                this.reservations = reservations;

                // Parse and set menu images
                if (menu.menu_link) {
                    this.hidangan = menu.menu_link.split(';').map(this.encodeImageUrl);
                    if (this.hidangan.length > 0) {
                        this.currentImage = this.hidangan[0];
                    }
                }

                // Parse and set gallery images
                if (menu.gallery_link) {
                    this.images = menu.gallery_link.split(';').map(this.encodeImageUrl);
                    if (this.images.length > 0) {
                        this.currentImage = this.images[0];
                    }
                }
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        },
        async redirectToReservation() {
            const isLoggedIn = await this.checkLogin();
            if (isLoggedIn) {
                window.location.href = `http://localhost:5173/reservasi/${this.restaurantId}`;
            }
        },
        async checkLogin() {
            try {
                const response = await axios.get(`http://localhost:3000/user/${this.$route.params.id}`);
                if (response.status === 200 && response.data.userLogin) {
                    return true;
                } else {
                    window.location.href = 'http://localhost:5173/nolog';
                    return false;
                }
            } catch (error) {
                console.error("Error checking user login:", error);
                window.location.href = 'http://localhost:5173/nolog';
                return false;
            }
        },
    },
    mounted() {
        this.fetchRestaurantData();
    }
};
</script>
