<template>
  <div class="mt-14 mb-10 font-[Poppins]">
    <div class="bg-[url('/Promo.png')] h-auto md:mx-20 mx-10 lg:w-auto text-center bg-cover rounded-2xl py-10">
      <div class="mx-10 pb-8 lg:pb-10 text-white">
        <h1 class="font-bold text-[36px] mx:10 sm:text-[38px] md:text-[40px] lg:text-[48px]">
          Hasilkan <span class="text-[#C2CFC2] italic">Terserahin</span>-mu!?
        </h1>
      </div>
      <form @submit.prevent="generate">
        <div>
          <select v-model="provinsi" name="Provinsi" id="Provinsi" class="italic text-center mr-3 lg:w-[120px] h-6 md:w-[100px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]">
            <option value=""> Provinsi </option>
            <option value="DKI Jakarta"> DKI Jakarta </option>
            <option value="Jawa Barat"> Jawa Barat </option>
            <option value="Jawa Timur"> Jawa Timur </option>
          </select>
          <select v-model="kota" name="Kota" id="Kota" class="italic text-center mr-3 lg:w-[120px] h-6 md:w-[100px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]">
            <option value=""> Kota </option>
            <option v-for="city in filteredCities" :key="city" :value="city"> {{ city }} </option>
          </select>
          <select v-model="kecamatan" name="Kec." id="Kec." class="italic text-center lg:w-[120px] h-6 md:w-[100px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]">
            <option value=""> Kec. </option>
            <option v-for="district in filteredDistricts" :key="district" :value="district"> {{ district }} </option>
          </select>
        </div>
        <div>
          <div class="text-center mt-10 lg:mt-[50px]">
            <button class="w-auto lg:h-8 sm:h-7 h-6 px-10 bg-[#F2F2F2] text-black rounded-2xl hover:bg-slate-300">
              Generate
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TerserahinComponent',
  data() {
    return {
      provinsi: '',
      kota: '',
      kecamatan: '',
        cities: {
                'Jawa Barat': ['Bandung', 'Bogor', 'Depok', 'Bekasi'],
                'Jawa Timur': ['Surabaya'],
                'DKI Jakarta': ['Jakarta', 'Jakarta Barat', 'Jakarta Utara', 'Jakarta Pusat', 'Jakarta Timur', 'Jakarta Selatan'],
                'Banten': ['Tangerang', 'Tangerang Selatan']
            },
        districts: {
            'Jakarta': [
                'Central Park',
                'Cilandak',
                'Kelapa Gading',
                'Kemang',
                'Kuningan',
                'Menteng',
                'Pluit',
                'Pondok Indah',
                'Sudirman',
                'Tebet',
                'Thamrin'
            ],
            'Bandung': [
                'Aceh',
                'Andir',
                'Antapani',
                'Banda',
                'Braga',
                'Buah Batu',
                'Burangrang',
                'Cibiru',
                'Cihampelas',
                'Cilaki',
                'Cipaganti',
                'Citarum',
                'Ciumbuleuit',
                'Dago Atas',
                'Dago Bawah',
                'Gedung Sate',
                'Karapitan',
                'Merdeka',
                'Pasir Kaliki',
                'Progo',
                'Riau',
                'Sarijadi',
                'Setiabudhi',
                'Sudirman',
                'Sukajadi',
                'Trunojoyo'
            ],
            'Surabaya': [
                'Ngagel',
                'Rungkut',
                'Tegalsari',
                'Wiyung'
            ],
            'Jakarta Barat': [
                'Puri',
                'Meruya',
                'Tanjung Duren',
                'Cengkareng'
            ],
            'Jakarta Utara': [
                'Pluit',
                'Pantai Indah Kapuk',
                'Sunter',
                'Kelapa Gading'
            ],
            'Bogor': [
                'Sawangan'
            ],
            'Depok': [
                'Margonda'
            ],
            'Jakarta Pusat': [
                'Menteng',
                'Tanah Abang',
                'Kemayoran',
                'Senen'
            ],
            'Bekasi': [
                'Summarecon Bekasi',
                'Harapan Indah',
                'Jatiwaringin'
            ],
            'Tangerang Selatan': [
                'Serpong',
                'Bintaro',
                'BSD'
            ],
            'Jakarta Timur': [
                'Rawamangun',
                'Kramat Jati',
                'Cibubur'
            ],
            'Tangerang': [
                'Alam Sutera',
                'Gading Serpong',
                'Karawaci'
            ],
            'Jakarta Selatan': [
                'Blok M',
                'Kemang',
                'Senopati',
                'Pondok Indah'
            ]
        }
    };
  },
  computed: {
    filteredCities() {
      return this.cities[this.provinsi] || [];
    },
    filteredDistricts() {
      return this.districts[this.kota] || [];
    }
  },
  methods: {
    async generate() {
      const address = `${this.kecamatan}, ${this.kota}`.trim();
      try {
        const response = await fetch(`http://localhost:3000/terserahinAja?address=${encodeURIComponent(address)}`);
        
        const contentType = response.headers.get("content-type");
        if (!response.ok || !contentType || !contentType.includes("application/json")) {
          const errorMessage = await response.text();
          throw new Error(`Network response was not ok: ${errorMessage}`);
        }

        const data = await response.json();
        console.log('Parsed data:', data);
        this.$emit('restaurants-updated', data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }
  }
}
</script>

<style scoped>
/* Your styles here */
</style>
