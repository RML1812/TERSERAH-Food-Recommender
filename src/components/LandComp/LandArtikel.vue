<template>
    <div class="font-[Poppins]">
        <div class="mb-3">
            <h1 class="font-bold text-3xl text-right md:mr-20 mr-10">Artikel <span class="text-[#C2CFC2]">Terbaru</span></h1>
        </div>
        <div class="grid grid-rows-2 grid-flow-col gap-4 mb-10 text-white md:mx-20 mx-10">
            <div v-for="artikel in artikels" :key="artikel._id" class="cursor-pointer hover:opacity-90 hover:scale-105 bg-cover h-96 w-auto rounded-lg" :style="{ backgroundImage: `url(${artikel.Gambar})` }">
                <div class="ml-4">
                    <h1 class="text-[22px] font-bold pt-40 border-slate-100 tracking-wider text-outline">{{ artikel.Judul }}</h1>
                </div>
                <div>
                    <h1 class="text-center mt-14 text-[12px] font-light">Lihat Lebih Banyak</h1>
                    <RouterLink :to="`/artikel/${artikel._id}`">
                        <img src="/public/Bawah.png" class="cursor-pointer hover:opacity-90 hover:scale-105 mx-auto mt-4 object-right h-4 w-10" alt="Lihat Lebih Banyak">
                    </RouterLink>
                </div>
            </div>
        </div>
        <hr class="border-black mx-20 mt-5">
    </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            artikels: []
        };
    },
    components: {
        RouterLink
    },
    created() {
        this.fetchArtikels();
    },
    methods: {
        async fetchArtikels() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BE}/artikel`);
                console.log('Artikel:', response)
                this.artikels = response.data;
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        }
    }
};
</script>

<style scoped>
.text-outline {
    -webkit-text-stroke: 1px black; /* Outline color and width for WebKit browsers */
    text-stroke: 1px black; /* Outline color and width for non-WebKit browsers */
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5); /* Shadow effect */
}
</style>
