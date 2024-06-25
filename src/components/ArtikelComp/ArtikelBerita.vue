<template>
    <div class="my-10">
        <div class="font-[Poppins]">
            <div class="flex flex-row my-10">
                <hr class="border-black w-full mr-10 ml-20 mt-3">
                <p class="text-[#777777] mr-20 text-[14px] font-medium">Dibuat oleh {{ artikel.Penulis }} {{ artikel.Tanggal }}</p>
            </div>
            <div class="mx-20 text-center">
                <div class="font-semibold my-10">
                    <p v-html="artikel.Berita"></p>
                </div>
                <div>
                    <img :src="artikel.Gambar" class="mx-auto" alt="Artikel Gambar">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            artikel: {}
        };
    },
    created() {
        this.fetchArtikel();
    },
    methods: {
        async fetchArtikel() {
            const artikelId = this.$route.params.artikelId;
            try {
                const response = await axios.get(`http://localhost:3000/artikel/${artikelId}`);
                this.artikel = response.data;
            } catch (error) {
                console.error('Error fetching artikel:', error);
            }
        }
    }
}
</script>

<style scoped>
/* Tambahkan gaya CSS di sini jika diperlukan */
</style>
