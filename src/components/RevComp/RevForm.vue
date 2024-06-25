<template>
  <div class="mb-16 font-[Poppins] my-16">
      <div class="flex justify-center">
          <div class="h-[200px] w-64 bg-[#F2F2F2] rounded-2xl shadow-lg border mr-3 flex flex-col md:ml-28 ml-4">
              <RouterLink to="/profil">
                  <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] hover:bg-[#DBDBDB] text-[14px] rounded-t-2xl text-center pt-3 cursor-pointer ">
                      <p>Profil</p>
                  </div>
              </RouterLink>
              <RouterLink to="/reservasimu">
                  <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer ">
                      <p>Reservasi-mu</p>
                  </div>
              </RouterLink>
              <RouterLink to="/wishlist">
                  <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer ">
                      <p>Wishlist</p>
                  </div>
              </RouterLink>
              <RouterLink to="/review">
                  <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] rounded-b-2xl text-center pt-3 bg-[#DBDBDB] cursor-pointer ">
                      <p>Review-mu</p>
                  </div>
              </RouterLink>
          </div>
          <div class="h-auto w-full md:mr-52 mr-10 bg-[#F2F2F2] rounded-xl items-center shadow-lg border">
              <div>
                  <div class="flex flex-col mt-5 mb-10">
                      <div v-if="loading" class="text-center text-gray-500">
                          Loading...
                      </div>
                      <div v-else-if="reviews.length === 0" class="text-center text-gray-500">
                          Belum ada review, Yuk isi reviewmu!
                      </div>
                      <div v-else v-for="(review, index) in paginatedReviews" :key="index" class="text-white">
                          <div class="bg-[#997380] h-24 w-auto mt-4 md:mx-7 lg:mx-10 mx-5 rounded-lg hover:bg-[#BD97A4] cursor-pointer" @click="openReviewDetail(review)">
                              <div class="flex flex-col md:mx-7 mx-2 gap-1 sm:gap-0">
                                  <div class="flex justify-end mt-3">
                                      <img @click.stop="deleteReview(review._id)" class="cursor-pointer md:h-5 h-4 hover:scale-125 mt-1 mr-4" src="/public/Trash.png" alt="Delete">
                                      <img @click.stop="openEditReview(review)" class="cursor-pointer md:h-5 h-4 hover:scale-125 mt-1 ml-4" src="/public/Edit.png" alt="Edit">
                                  </div>
                                  <div class="flex">
                                      <p class="font-bold md:text-2xl text-xl">{{ review.restaurant }}</p>
                                      <img class="cursor-pointer md:h-5 h-4 hover:scale-125 mt-1 ml-4" src="/public/Back.png" alt="">
                                  </div>
                                  <div class="text-right">
                                      <p class="lg:text-[15px] sm:text-[13px] text-[12px] italic">{{ review.review_date }}</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div v-if="!loading && reviews.length > 0" class="lg:mx-20 md:mx-8 mx-4 my-8 font-light">
                      <div class="flex justify-center">
                          <div>
                              <ion-icon @click="menuLefts()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropleft-circle"></ion-icon>
                              <ion-icon @click="menuLeft()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer" name="arrow-dropleft"></ion-icon>
                          </div>
                          <div>
                              <p class="font-bold text-[16px] md:mx-14 mx-6">{{ currentPage }} dari {{ totalPages }}</p>
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
      <div v-if="open && isEditMode">
          <div class="font-[Poppins] bg-[#F2F2F2] text-black h-auto lg:w-[1100px] md:w-[800px] sm:w-[600px] w-[420px] sm:ml-20 ml-8 top-[100px] absolute rounded-2xl border-spacing-60 shadow-xl">
              <div class="mb-10">
                  <div class="bg-gradient-to-r text-white font-bold w-full h-28 from-[#C28C9E] via-[#9F5A7B] to-[#5C424B] rounded-t-2xl">
                      <div @click="menuOpen()" class="text-right mr-10">
                          <ion-icon class="absolute hover:scale-125 text-2xl h-8 w-8 cursor-pointer rounded-xl mt-3" name="close"></ion-icon>
                      </div>
                      <h1 class="sm:text-[32px] text-[30px] text-center pt-8">Tuliskan <span class="text-[#EDBBCC]">Review</span>-mu!</h1>
                  </div>
                  <div class="sm:columns-3 text-center my-10 md:mx-16 lg:mx-0 sm:mx-10">
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
      <div v-if="selectedReview && !isEditMode" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white p-8 rounded-lg shadow-lg">
              <h2 class="text-2xl font-bold mb-4">{{ selectedReview.restaurant }}</h2>
              <p class="mb-2"><strong>User:</strong> {{ selectedReview.userName }}</p>
              <p class="mb-2"><strong>Title:</strong> {{ selectedReview.title }}</p>
              <p class="mb-2"><strong>Review Date:</strong> {{ selectedReview.review_date }}</p>
              <p class="mb-2"><strong>Review:</strong> {{ selectedReview.review }}</p>
              <p class="mb-2"><strong>Combined Rating:</strong> {{ selectedReview.rating_id.combined_rating }}</p>
              <p class="mb-2"><strong>Ambience Rating:</strong> {{ selectedReview.rating_id.ambience_rating }}</p>
              <p class="mb-2"><strong>Taste to Price Rating:</strong> {{ selectedReview.rating_id.taste_to_price_rating }}</p>
              <p class="mb-2"><strong>Service Rating:</strong> {{ selectedReview.rating_id.service_rating }}</p>
              <p class="mb-2"><strong>Cleanliness Rating:</strong> {{ selectedReview.rating_id.cleanliness_rating }}</p>
              <button @click="closeReviewDetail" class="bg-red-500 text-white px-4 py-2 rounded mt-4">Close</button>
          </div>
      </div>
      <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white p-8 rounded-lg shadow-lg text-center">
              <p class="text-xl font-bold mb-4">Edit Review-Mu Berhasil!</p>
              <button @click="closeSuccessModal" class="bg-green-500 text-white px-4 py-2 rounded mt-4">OK</button>
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
          open: false,
          nilai1: "",
          nilai2: "",
          nilai3: "",
          nilai4: "",
          nilai5: "",
          nilai6: "",
          reviewText: "",
          reviewTitle: "",
          selectedReview: null,
          isEditMode: false,
          showSuccessModal: false,
          currentPage: 1,
          reviewsPerPage: 5,
          loading: true
      };
  },
  computed: {
      totalPages() {
          return Math.ceil(this.reviews.length / this.reviewsPerPage);
      },
      paginatedReviews() {
          const start = (this.currentPage - 1) * this.reviewsPerPage;
          return this.reviews.slice(start, start + this.reviewsPerPage);
      }
  },
  methods: {
      menuLefts() {
          this.currentPage = 1;
      },
      menuLeft() {
          if (this.currentPage > 1) {
              this.currentPage--;
          }
      },
      menuRights() {
          this.currentPage = this.totalPages;
      },
      menuRight() {
          if (this.currentPage < this.totalPages) {
              this.currentPage++;
          }
      },
      menuOpen() {
          this.open = !this.open;
          if (!this.open) {
              this.isEditMode = false;
              this.selectedReview = null;
          }
      },
      async fetchUserReviews() {
          try {
              const userResponse = await axios.get(`http://localhost:3000/user/${this.$route.params.id}`);
              if (userResponse.status === 200) {
                  const userData = userResponse.data.userLogin;
                  if (userData) {
                      const userId = userData._id;

                      const response = await axios.get(`http://localhost:3000/review/user/${userId}`);
                      const reviews = response.data.reviews;

                      const reviewPromises = reviews.map(async (review) => {
                          review.userName = review.user_id.name;
                          review.title = review.title;
                          review.review = review.review;
                          review.review_date = review.review_date;
                          review.restaurant = review.restaurant_id.name;
                          return review;
                      });

                      this.reviews = await Promise.all(reviewPromises);
                  } else {
                      console.error("User data is undefined:", userResponse.data);
                  }
              } else {
                  console.error("Failed to fetch user data");
              }
          } catch (error) {
              console.error("Error fetching user reviews:", error);
          } finally {
              this.loading = false;
          }
      },
      async submitReview() {
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
              if (this.isEditMode) {
                  await axios.post(`http://localhost:3000/edit-review/${this.selectedReview._id}`, reviewData);
                  this.showSuccessModal = true;
              } else {
                  const restaurantId = this.$route.params.restaurantId;
                  await axios.post(`http://localhost:3000/review/${restaurantId}`, reviewData);
              }
              this.fetchUserReviews();
              this.resetForm();
          } catch (error) {
              console.error("Error submitting review:", error);
          }
      },
      async deleteReview(reviewId) {
          if (confirm("Anda yakin ingin menghapus review ini?")) {
              try {
                  await axios.post(`http://localhost:3000/delete-review`, { reviewId });
                  this.fetchUserReviews();
              } catch (error) {
                  console.error("Error deleting review:", error);
              }
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
          this.selectedReview = null;
          this.isEditMode = false;
      },
      openReviewDetail(review) {
          if (!this.isEditMode) {
              this.selectedReview = review;
          }
      },
      closeReviewDetail() {
          this.selectedReview = null;
      },
      openEditReview(review) {
          this.selectedReview = review;
          this.reviewText = review.review;
          this.reviewTitle = review.title;
          this.nilai1 = review.rating_id.combined_rating;
          this.nilai2 = review.rating_id.ambience_rating;
          this.nilai3 = review.rating_id.taste_to_price_rating;
          this.nilai4 = review.rating_id.service_rating;
          this.nilai5 = review.rating_id.cleanliness_rating;
          this.nilai6 = review.rating_id.aroma_rating;
          this.isEditMode = true;
          this.menuOpen();
      },
      closeSuccessModal() {
          this.showSuccessModal = false;
          this.menuOpen();
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
      this.fetchUserReviews();
  }
};
</script>
