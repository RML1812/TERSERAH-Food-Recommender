<template>
  <div class="mb-9 mt-24 font-[Poppins]">
    <div class="lg:mx-32 md:mx-24 sm:mx-14 mx-10">
      <div class="ml-4 mb-5">
        <h1 class="text-3xl text-[#9CA69C] font-bold">Review</h1>
      </div>
      <div class="flex flex-col text-justify">
        <div class="bg-white h-3 w-full shadow-xl rounded-t-xl font-light"></div>
        <div v-if="loading" class="bg-[#FFFFFF] h-auto w-auto shadow-xl border-b-2 p-5">
          <p class="text-center text-gray-500">Loading...</p>
        </div>
        <div v-else>
          <div v-if="reviews.length === 0" class="bg-[#FFFFFF] h-auto w-auto shadow-xl border-b-2 p-5">
            <p class="text-center text-gray-500">{{ noReviewsMessage }}</p>
          </div>
          <div v-else>
            <div v-for="(rev, index) in visibleReviews" :key="index">
              <div class="bg-[#FFFFFF] h-auto w-auto shadow-xl border-b-2">
                <div class="flex justify-between mb-20 pt-7">
                  <div class="flex flex-col text-center">
                    <h1 class="font-bold md:mx-10 mx-5">{{ rev.userName }}</h1>
                    <p class="italic text-[13px] text-[#777777]">{{ rev.review_date }}</p>
                  </div>
                  <div class="md:mr-10 mr-5 text-[14px]">
                    <p class="font-bold">{{ rev.title }}</p>
                    <p>{{ rev.review }}</p>
                  </div>
                </div>
                <div class="float-right mr-[260px] -mt-14">
                  <div v-if="revs">
                    <div class="">
                      <div class="absolute bg-[#C28C9E] h-60 w-56 rounded-lg ">
                        <div class="mt-11 lg:mx-5 md:mx-2 mx-3">
                          <div v-for="rat in rev.ratings" :key="rat.name">
                            <div class="flex mb-2 text-white justify-between">
                              <p class="lg:text-[17px] md:text-[15px] ">{{ rat.name }}</p>
                              <div class="flex">
                                <img src="/public/Star.png" class="mt-1 h-4 w-4 ml-2" alt="">
                                <p class="text-white mt-0.5 lg:text-[15px] md:text-[14px] ml-2 mr-1">{{ rat.rate }}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-[#997380] absolute w-56 h-[35px] shadow-xl border rounded-lg object-right">
                    <div class="flex justify-between">
                      <div class="">
                        <h1 class="pl-5 pt-1 text-white font-semibold mr-3 ">Total Rating</h1>
                      </div>
                      <div class="flex mr-3">
                        <img src="/public/Star.png" class="mt-2 h-4 w-4" alt="">
                        <p class="text-white mt-1.5 lg:text-[15px] md:text-[14px] ml-2 mr-1">{{ rev.rating_id.combined_rating }}</p>
                        <img @click="menuRev()" src="/public/Down.png" class="hover:scale-125 cursor-pointer mt-3 h-2 w-3 ml-2" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-[#FFFFFF] h-auto w-auto shadow-xl rounded-b-xl font-light">
              <div class="flex justify-center mb-2 mt-3">
                <div>
                  <ion-icon @click="menuLefts()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name="arrow-dropleft-circle"></ion-icon>
                  <ion-icon @click="menuLeft()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name="arrow-dropleft"></ion-icon>
                </div>
                <div>
                  <p class="font-bold text-[16px] mx-14">{{ startIndex + 1 }} dari {{ reviews.length }}</p>
                </div>
                <div>
                  <ion-icon @click="menuRight()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name="arrow-dropright"></ion-icon>
                  <ion-icon @click="menuRights()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name="arrow-dropright-circle"></ion-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="text-center mt-10 mb-14 font-semibold">
          <h1 class="font-semibold mb-5">Ceritakan juga Pengalaman-mu!</h1>
          <div @click="openReviewForm" class="h-10 mx-20 rounded-lg bg-black text-white text-center py-2 cursor-pointer hover:bg-slate-500 px-6">Review Aku!</div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="open">
    <div class="font-[Poppins] bg-[#F2F2F2] text-black h-auto lg:w-[1100px] md:w-[800px] sm:w-[600px] w-[420px] sm:ml-20 ml-8 md:top-[450px] lg:top-[370px] top-[400px] absolute rounded-2xl border-spacing-60 shadow-xl">
      <div class="mb-10">
        <div class=" bg-gradient-to-r text-white font-bold w-full h-28 from-[#C28C9E] via-[#9F5A7B] to-[#5C424B] rounded-t-2xl">
          <div @click="menuOpen()" class="text-right mr-10">
            <ion-icon class="absolute hover:scale-125 text-2xl h-8 w-8 cursor-pointer rounded-xl mt-3" name="close"></ion-icon>
          </div>
          <h1 class="sm:text-[32px] text-[30px] text-center pt-8">Tuliskan <span class="text-[#EDBBCC]">Review</span>-mu!</h1>
        </div>
        <div class="sm:columns-3 text-center my-10 md:mx-16 lg:mx-0 sm:mx-10 ">
          <div>
            <div>
              <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Rasa</h1>
            </div>
            <div class="mt-4">
              <div>
                <input type="range" id="points" class="range w-60" v-model="nilai1" name="points" min="0" max="5" step="0.1">
              </div>
              <div>
                <span class="text-black">⭐ {{ nilaih1 }}</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Suasana</h1>
            </div>
            <div class="mt-4">
              <div>
                <input type="range" id="points" class="range w-60" v-model="nilai2" name="points" min="0" max="5" step="0.1">
              </div>
              <div>
                <span class="text-black">⭐ {{ nilaih2 }}</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Harga : Rasa</h1>
            </div>
            <div class="mt-4">
              <div>
                <input type="range" id="points" class="range w-60" v-model="nilai3" name="points" min="0" max="5" step="0.1">
              </div>
              <div>
                <span class="text-black">⭐ {{ nilaih3 }}</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Pelayanan</h1>
            </div>
            <div class="mt-4">
              <div>
                <input type="range" id="points" class="range w-60" v-model="nilai4" name="points" min="0" max="5" step="0.1">
              </div>
              <div>
                <span class="text-black">⭐ {{ nilaih4 }}</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Kebersihan</h1>
            </div>
            <div class="mt-4">
              <div>
                <input type="range" id="points" class="range w-60" v-model="nilai5" name="points" min="0" max="5" step="0.1">
              </div>
              <div>
                <span class="text-black">⭐ {{ nilaih5 }}</span>
              </div>
            </div>
          </div>
          <div>
            <div>
              <h1 class="font-bold text-[20px] mt-5 sm:mt-0 text-black">Aroma</h1>
            </div>
            <div class="mt-4">
              <div>
                <input type="range" id="points" class="range w-60" v-model="nilai6" name="points" min="0" max="5" step="0.1">
              </div>
              <div>
                <span class="text-black">⭐ {{ nilaih6 }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="md:mx-20 sm:mx-10">
          <div class="">
            <h1 class="font-bold text-[20px] mt-5 sm:mt-0 ml-5">Review-mu</h1>
          </div>
          <div class="mt-6 mb-5">
            <form @submit.prevent="submitReview">
              <textarea v-model="reviewText" class="bg-[#D3D3D3] w-96 sm:w-full rounded-md h-56 shadow-xl border p-5 mb-7 ml-5" placeholder="Ketik Review-mu disini....."></textarea>
              <input v-model="reviewTitle" class="bg-[#D3D3D3] w-96 sm:w-full rounded-md shadow-xl border p-5 mb-7 ml-5" placeholder="Judul Review" />
              <button type="submit" class="bg-black text-white px-14 float-right py-1 rounded-2xl mb-14 mr-10">Kirim</button>
            </form>
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
      reviews: [],
      value: 1,
      revs: false,
      open: false,
      nilai1: "",
      nilai2: "",
      nilai3: "",
      nilai4: "",
      nilai5: "",
      nilai6: "",
      reviewText: "",
      reviewTitle: "",
      noReviewsMessage: "Belum ada review, Yuk isi reviewmu!",
      startIndex: 0,
      loading: true
    };
  },
  computed: {
    visibleReviews() {
      return this.reviews.slice(this.startIndex, this.startIndex + 2);
    }
  },
  methods: {
    menuLefts() {
      this.startIndex = 0;
    },
    menuLeft() {
      if (this.startIndex - 2 >= 0 && this.reviews.length) {
        this.startIndex -= 2;
      }
    },
    menuRights() {
      this.startIndex = this.reviews.length - 2;
    },
    menuRight() {
      if (this.startIndex + 2 < this.reviews.length) {
        this.startIndex += 2;
      }
    },
    menuOpen() {
      this.open = !this.open;
    },
    menuRev() {
      this.revs = !this.revs;
    },
    async fetchReviews(restaurantId) {
      try {
        const response = await axios.get(`http://localhost:3000/review/${restaurantId}`);
        const reviewsData = response.data.reviews;
        if (Array.isArray(reviewsData)) {
          this.reviews = reviewsData.map(review => ({
            ...review,
            userName: review.user_id.name,
            title: review.title,
            ratings: [
              { name: "Rasa", rate: review.rating_id.taste_to_price_rating },
              { name: "Harga : Rasa", rate: review.rating_id.taste_to_price_rating },
              { name: "Kebersihan", rate: review.rating_id.cleanliness_rating },
              { name: "Suasana", rate: review.rating_id.ambience_rating },
              { name: "Pelayanan", rate: review.rating_id.service_rating },
              { name: "Aroma", rate: review.rating_id.combined_rating }
            ]
          }));
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        this.loading = false;
      }
    },
    async checkLogin() {
      try {
        const response = await axios.get(`http://localhost:3000/user/${this.$route.params.id}`);
        if (response.status !== 200 || !response.data.userLogin) {
          window.location.href = 'http://localhost:5173/nolog';
        } else {
          return true;
        }
      } catch (error) {
        console.error("Error checking user login:", error);
        window.location.href = 'http://localhost:5173/nolog';
      }
    },
    async openReviewForm() {
      const isLoggedIn = await this.checkLogin();
      if (isLoggedIn) {
        this.menuOpen();
      }
    },
    async submitReview() {
      const restaurantId = this.$route.params.restaurantId;
      const reviewData = {
        review: this.reviewText,
        reviewDate: new Date().toISOString().split('T')[0],
        title: this.reviewTitle,
        combined_rating: this.nilai1,
        ambience_rating: this.nilai2,
        taste_to_price_rating: this.nilai3,
        service_rating: this.nilai4,
        cleanliness_rating: this.nilai5
      };

      try {
        await axios.post(`http://localhost:3000/review/${restaurantId}`, reviewData);
        this.fetchReviews(restaurantId);
        this.menuOpen();
        this.resetForm();
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    },
    resetForm() {
      this.reviewText = "";
      this.reviewTitle = "";
      this.nilai1 = "";
      this.nilai2 = "";
      this.nilai3 = "";
      this.nilai4 = "";
      this.nilai5 = "";
      this.nilai6 = "";
    }
  },
  watch: {
    nilai1(value) {
      this.nilaih1 = value;
    },
    nilai2(value) {
      this.nilaih2 = value;
    },
    nilai3(value) {
      this.nilaih3 = value;
    },
    nilai4(value) {
      this.nilaih4 = value;
    },
    nilai5(value) {
      this.nilaih5 = value;
    },
    nilai6(value) {
      this.nilaih6 = value;
    }
  },
  mounted() {
    const restaurantId = this.$route.params.restaurantId;
    this.fetchReviews(restaurantId);
  }
};
</script>
