<template>
  <header>
    <nav class="p-5 bg-gradient-to-b from-[#9CA69C] to-[#8B968B] font-['Poppins'] text-white shadow">
      <div class="flex flex-row justify-between m-auto lg:hidden">
        <div @click="menuOpen">
          <ion-icon class="hover:scale-110 text-2xl mt-3 cursor-pointer" name="menu"></ion-icon>
        </div>
        <RouterLink to="/">
          <img class="h-14 hover:scale-105 lg:bg-transparent" src="/public/Logo.png" alt="">
        </RouterLink>
        <span>
          <p @click="menuPopup" class="hover:font-semibold cursor-pointer">Login</p>
          <RouterLink to="/regis" class="hover:font-semibold">Sign Up</RouterLink>
        </span>
      </div>
      <div></div>
      <div v-if="open">
        <div class="container flex lg:flex-row flex-col lg:items-center lg:justify-between lg:static mx-auto">
          <span class="hover:font-semibold lg:my-0 lg:ml-[60px] mb-2 mt-6">
            <RouterLink to="/terserah">Terserahin!(?)</RouterLink>
          </span>
          <span class="hover:font-semibold my-2 lg:my-0">
            <RouterLink to="/blog">Blog</RouterLink>
          </span>
          <span class="hover:font-semibold my-2 lg:my-0">
            <RouterLink to="/reservasimu">Reservasi</RouterLink>
          </span>
          <RouterLink to="/">
            <img class="relative h-12 hover:scale-105 lg:bg-transparent lg:flex hidden" src="/public/Logo.png" alt="">
          </RouterLink>
          <RouterLink to="/wishlist">
            <span class="hover:font-semibold lg:my-0">
              Wishlist <img class="my-3 w-4 inline" src="/public/lop.png" alt="">
            </span>
          </RouterLink>
          <span class="my-2 lg:flex lg:my-0 hidden">
            <p @click="menuPopup" class="hover:font-semibold cursor-pointer">Login</p>
          </span>
          <span class="hover:font-semibold lg:flex lg:mr-[75px] lg:my-0 my-2 hidden">
            <RouterLink to="/regis">Sign Up</RouterLink>
          </span>
        </div>
      </div>
      <div v-else>
        <div class="container lg:flex lg:flex-row flex-col lg:items-center lg:justify-between absolute lg:static mx-auto hidden">
          <span class="hover:font-semibold lg:my-0 lg:ml-[60px] mb-2 mt-6">
            <RouterLink to="/terserah">Terserahin!(?)</RouterLink>
          </span>
          <span class="hover:font-semibold my-2 lg:my-0">
            <RouterLink to="/blog">Blog</RouterLink>
          </span>
          <span class="hover:font-semibold my-2 lg:my-0">
            <RouterLink to="/reservasimu">Reservasi</RouterLink>
          </span>
          <RouterLink to="/">
            <img class="relative h-12 hover:scale-105 lg:bg-transparent lg:flex hidden" src="/public/Logo.png" alt="">
          </RouterLink>
          <RouterLink to="/wishlist">
            <span class="my-3 hover:font-semibold lg:my-0">
              Wishlist <img class="w-4 inline" src="/public/lop.png" alt="">
            </span>
          </RouterLink>
          <!-- Add a conditional to display user data if logged in -->
          <span v-if="loggedIn">
            <RouterLink to="/profil" class="hover:font-semibold">
              <p>Welcome, {{ userData.name }}</p>
            </RouterLink>
          </span>
          <span v-else>
            <p @click="menuPopup" class="hover:font-semibold cursor-pointer">Login</p>
            <RouterLink to="/regis" class="hover:font-semibold">Sign Up</RouterLink>
          </span>     
        </div>
      </div>
      <div v-if="popup">
        <div class="bg-[#F2F2F2] md:h-[260px] h-[235px] w-[380px] md:w-[400px] lg:left-[600px] md:left-[300px] left-14 top-20 absolute rounded border-spacing-60 shadow-xl">
          <div @click="menuPopup" class="text-right mr-4 mt-4">
            <ion-icon class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer bg-black rounded-xl" name="close"></ion-icon>
          </div>
          <div class="ml-7 -mt-[20px]">
            <label for="" class="text-center font-bold text-black text-2xl">Login</label>
            <div>
              <form @submit.prevent="loginUser">
                <div class="flex">
                  <img class="inline h-5 md:h-7 mt-5 md:mt-6" src="/public/Menu.png" alt="">
                  <input type="text" v-model="user" class="pl-4 text-black md:h-7 h-6 mt-5 md:w-[280px] w-[280px] ml-5 bg-[#D3D3D3] rounded-2xl shadow-sm border-black" placeholder="Username">
                </div>
                <label for="" class="absolute font-bold text-red-500 text-[11px] ml-13" v-if="userEmail">Masukkan {{ simbol }} digit karakter (Minimal 12 Karakter)</label>
                <div class="flex">
                  <img class="inline h-5 md:h-7 ml-1 mt-6 md:mt-7" src="/public/Password.png" alt="">
                  <input v-if="hidePw" type="text" v-model="pw" class="pl-4 text-black md:h-7 h-6 mt-6 md:w-[220px] w-[230px] ml-6 bg-[#D3D3D3] rounded-2xl shadow-sm border-black" placeholder="Password">
                  <input v-else type="password" v-model="pw" class="pl-4 text-black md:h-7 h-6 mt-6 md:w-[220px] w-[230px] ml-6 bg-[#D3D3D3] rounded-2xl shadow-sm border-black" placeholder="Password">
                  <div @click="menuEye">
                    <ion-icon class="hover:scale-110 text-2xl mt-6 ml-5 h-7 w-7 cursor-pointer bg-black rounded-xl" name="eye"></ion-icon>
                  </div>
                </div>
                <label for="" class="absolute font-bold text-red-500 text-[11px] ml-13" v-if="userPw">Masukkan {{ simbols }} digit karakter (Minimal 12 Karakter)</label>
                <div class="text-right mr-10 mt-7">
                  <button class="w-24 h-8 bg-[#1E1E1E] rounded-2xl hover:bg-slate-300">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from 'axios';

axios.defaults.withCredentials = true;

export default {
  data() {
    return {
      open: false,
      popup: false,
      pw: "",
      user: "",
      simbol: "",
      userEmail: false,
      userPw: false,
      hidePw: false,
      loggedIn: false,
      userData: {}
    };
  },
  created() {
    this.checkLoginStatus();
  },
  methods: {
    async checkLoginStatus() {
      try {
        const response = await axios.get('http://localhost:3000/login');
        if (response.data.user) {
          this.loggedIn = true;
          this.userData = response.data.user;
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    },
    menuOpen() {
      this.open = !this.open;
    },
    menuPopup() {
      this.popup = !this.popup;
    },
    menuEye() {
      this.hidePw = !this.hidePw;
    },
    async loginUser() {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          name: this.user,
          password: this.pw
        });
        console.log("Login response:", response.data);
        if (response.data === 'User name not found' || response.data === 'Incorrect password') {
          alert(response.data);
        } else {
          this.loggedIn = true;
          this.userData = response.data; // Update with the correct user data
          console.log("Logged in user data:", this.userData);
          // window.location.href = '/'; // Uncomment if you want to redirect
        }
        window.location.reload();
      } catch (error) {
        console.error('Error logging in:', error);
      }
    }
  }
};
</script>
