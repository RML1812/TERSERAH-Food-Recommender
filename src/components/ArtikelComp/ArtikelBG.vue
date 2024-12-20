<template>
    <div :style="backgroundImageStyle" class="w-full h-auto bg-cover">
        <h1 class="mx-5 tracking-wider py-12 lg:text-[48px] md:text-[39px] font-Poppins text-[30px] text-center items-center text-white font-bold shadow-outline"> 
            {{ artikel.Judul }} 
        </h1>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            artikel: {}
        }
    },
    computed: {
        backgroundImageStyle() {
            return {
                backgroundImage: `url(${this.artikel.Gambar})`
            };
        }
    },
    created() {
        this.fetchArtikel();
    },
    methods: {
        async fetchArtikel() {
            const artikelId = this.$route.params.artikelId;
            try {
                const response = await axios.get(`${import.meta.env.VITE_BE}/artikel/${artikelId}`);
                this.artikel = response.data;
            } catch (error) {
                console.error('Error fetching artikel:', error);
            }
        }
    }
}
</script>

<style scoped>
h1.shadow-outline {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    -webkit-text-stroke: 1px black;
}
</style>
