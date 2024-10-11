<template>
  <div class="my-10">
    <div class="font-[Poppins]">
      <div class="text-left ml-10 md:ml-[80px]">
        <h1 class="font-bold text-3xl">For You <span class="text-[#997380]">Recommendation</span></h1>
      </div>
      <div>
        <div v-if="loading" class="text-center text-gray-500 my-10">
          Loading...
        </div>
        <div v-else>
          <div class="lg:flex lg:flex-wrap md:justify-between mx-10 md:mx-20">
            <div v-for="resto in promos" :key="resto._id" class="md:mt-5 mt-4 flex-shrink-0">
              <RouterLink :to="`/restaurant/${resto._id}`">
                <div class="cursor-pointer hover:opacity-90 hover:scale-105 text-white h-[250px] w-[250px] text-[15px] bg-cover rounded-3xl shadow-xl border-black relative" :style="{ backgroundImage: `url(${resto.backgroundImage})` }">
                  <div class="bg-gradient-to-b from-[#636963] via-transparent to-[#636963] h-full w-full opacity-100 rounded-3xl shadow-xl border-black p-5 flex flex-col justify-between">
                    <div>
                      <h1 class="font-bold">{{ resto.name }}</h1>
                      <p class="mt-1 text-[12px] font">{{ resto.culinary_type }}</p>
                    </div>
                    <div class="flex justify-between items-end mb-">
                      <p class="text-[12px] text-[#f2f2f2] font-medium">{{ resto.address }}</p>
                      <div class="flex items-center mr-2">
                        <img src="/public/Star.png" class="h-5 w-5 lg:h-4 lg:w-4" alt="star">
                        <p class="text-[16px] text-[#f2f2f2] font-bold ml-2">{{ resto.overall_rating }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
          <div class="text-right md:mr-20 mr-10 mt-4 font-light">
            <RouterLink to="/recom">
              <p class="italic text-[13px] cursor-pointer hover:font-medium">>Lihat Selengkapnya</p>
            </RouterLink>
          </div>
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
      promos: [],
      loading: true,
      images: [],
      currentImage: '',
    };
  },
  mounted() {
    this.fetchRecommendations();
  },
  methods: {
    async fetchRecommendations() {
      try {
        const response = await axios.get('http://localhost:3000/');
        console.log('Full Response:', response); // Log the entire response object

        if (response.data && response.data.recommendedRestaurants) {
          console.log('Recommended Restaurants:', response.data.recommendedRestaurants); // Log the recommendedRestaurants array
          this.promos = response.data.recommendedRestaurants.map(resto => {
            const { menu } = resto;
            let backgroundImage = '/public/gambar.png'; // Default image

            // Check if menu object exists and if gallery_link is available
            if (menu && menu.gallery_link) {
              const images = menu.gallery_link.split(';').map(this.encodeImageUrl);
              console.log('Images:', images); // Log the images array
              backgroundImage = images.length > 0 ? images[0] : backgroundImage;
            } else {
              console.log('No gallery_link found for restaurant:', resto.name);
              // Optionally set a default image or handle this case as needed
            }

            return { ...resto, backgroundImage };
          });
        } else {
          console.log('Response data or recommendedRestaurants not found.');
        }

      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
</style>
