<template>
    <div class="font-[Poppins]">
        <div>
            <div class="p-4 bg-gradient-to-r from-[#5C665C] via-[#9CA69C] to-[#CEDBCE] text-white shadow">
                <div class="flex justify-between lg:mx-28 md:mx-20 mx-10">
                    <div>
                        <h1 class="font-bold md:text-[20px] text-[17px]">{{ restaurant?.name || 'Loading...' }}</h1>
                        <p class="font-bold text-[14px] md:text-[17px] text-[#EDBBCC]">{{ restaurant?.culinary_type || 'Loading...' }}</p>
                    </div>
                    <div>
                        <img 
                            v-if="!isInWishlist"
                            class="md:h-5 h-4 mt-4 hover:scale-105 cursor-pointer" 
                            src="/public/lop.png" 
                            alt="Logo" 
                            @click="addToWishlist"
                        >
                        <p v-else class="text-white font-bold mt-4">Sudah ada di <RouterLink to="/wishlist" class="text-green-700 underline">wishlist</RouterLink> kamu nih!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    components: {
        RouterLink
    },
    props: {
        restaurantId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            restaurant: null,
            isInWishlist: false,
        };
    },
    methods: {
        async fetchRestaurantData() {
            if (!this.restaurantId) {
                console.error('Restaurant ID is not defined');
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_BE}/restaurant/${this.restaurantId}`);
                this.restaurant = response.data.restaurant;
                this.checkIfInWishlist();
            } catch (error) {
                console.error('Error fetching restaurant data:', error);
            }
        },
        async checkIfInWishlist() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BE}/wishlist`, {
                    withCredentials: true
                });
                this.isInWishlist = response.data.restaurants.some(resto => resto._id === this.restaurantId);
            } catch (error) {
                console.error('Error checking wishlist:', error);
            }
        },
        async addToWishlist() {
            if (!this.restaurantId || this.restaurantId.length !== 24) {
                alert('Invalid restaurant ID.');
                return;
            }

            try {
                const response = await axios.post(`${import.meta.env.VITE_BE}/wishlist`, {
                    restaurantId: this.restaurantId
                }, {
                    withCredentials: true // Pastikan ini diatur
                });
                if (response.status === 200) {
                    alert('Wishlist berhasil ditambahkan!');
                    this.isInWishlist = true;
                }
            } catch (error) {
                console.error('Error adding to wishlist:', error);
                alert('Gagal menambahkan ke wishlist. Silahkan Login terlebih dahulu');
            }
        }
    },
    mounted() {
        console.log('Restaurant ID:', this.restaurantId);
        this.fetchRestaurantData();
    },
};
</script>
