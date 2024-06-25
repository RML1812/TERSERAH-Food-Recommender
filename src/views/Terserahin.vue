<template>
    <div>
      <TerserahTags @restaurants-updated="updateRestaurants" @selected-kecamatan="updateKecamatan" />
      <TerserahRecs :restaurants="restaurants" :kecamatan="selectedKecamatan" />
      <TerserahAbouts />
    </div>
  </template>
  
  <script>
  import TerserahTags from '../components/TerserahComp/TerserahTag.vue';
  import TerserahRecs from '../components/TerserahComp/TerserahRec.vue';
  import TerserahAbouts from '../components/TerserahComp/TerserahAbout.vue';
  
  export default {
    components: {
      TerserahTags,
      TerserahRecs,
      TerserahAbouts
    },
    data() {
      return {
        restaurants: [],
        selectedKecamatan: '' // Tambahkan ini
      };
    },
    methods: {
      updateRestaurants(data) {
        this.restaurants = data;
      },
      updateKecamatan(kecamatan) {
        this.selectedKecamatan = kecamatan;
      }
    }
  }
  </script>
  