<template>
    <div class="my-10">
        <div class="font-[Poppins]">
            <div>
                <div class="flex-col mx-10 md:mx-20">
                    <div v-for="resto in displayedArtikel" :key="resto._id">  
                        <div class="md:mt-5 mt-4">
                            <div :style="{ backgroundImage: `url(${resto.Gambar})` }" class="cursor-pointer hover:opacity-90 text-white h-[115px] lg:h-[160px] w-auto text-[15px] bg-cover rounded-3xl shadow-xl border-black">
                                <div class="bg-gradient-to-b from-[#636963] via-transparent to-[#636963] h-[115px] lg:h-[160px] w-auto opacity-100 rounded-3xl shadow-xl border-black">
                                    <div class="ml-7 mt-5">
                                        <div class="pt-5">   
                                            <div class="flex flex-row justify-between">
                                                <h1 class="font-bold lg:text-4xl sm:text-2xl text-xl">{{ resto.Judul }}</h1>
                                                <h1 class="mr-6 italic">{{ resto.Tanggal }}</h1>
                                            </div>
                                            <RouterLink :to="`/artikel/${resto._id}`">
                                                <img src="/public/Bawah.png" class="cursor-pointer hover:opacity-90 hover:scale-105 mx-auto lg:mt-16 sm:mt-9 mr-10 float-right h-4 w-10" alt="Lihat Lebih Banyak">
                                            </RouterLink>
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
                            <ion-icon @click="menuLefts()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropleft-circle"></ion-icon>
                            <ion-icon @click="menuLeft()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropleft"></ion-icon>
                        </div>
                        <div>
                            <p class="font-bold text-[16px] mx-14">{{ currentPage }} dari {{ totalPages }}</p>
                        </div>
                        <div>
                            <ion-icon @click="menuRight()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropright"></ion-icon>
                            <ion-icon @click="menuRights()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropright-circle"></ion-icon>
                        </div>
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
    data() {
        return {
            artikel: [],
            currentPage: 1,
            itemsPerPage: 3  // Ubah sesuai dengan jumlah item per halaman yang Anda inginkan
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.artikel.length / this.itemsPerPage);
        },
        displayedArtikel() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.artikel.slice(startIndex, endIndex);
        }
    },
    created() {
        this.fetchArtikel();
    },
    methods: {
        async fetchArtikel() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BE}/artikel`);
                this.artikel = response.data;
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        },
        menuLefts() {
            if (this.currentPage > 1) {
                this.currentPage = 1;
            }
        },
        menuLeft() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        menuRights() {
            if (this.currentPage < this.totalPages) {
                this.currentPage = this.totalPages;
            }
        },
        menuRight() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        }
    }
};
</script>

<style scoped>
/* Tambahkan gaya CSS di sini jika diperlukan */
</style>
