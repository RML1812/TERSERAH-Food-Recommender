<template>
  <div class="min-h-screen bg-[#f5f1eb] flex flex-col">
    <!-- Header -->
    <header class="p-4 flex justify-center mt-5">
      <div class="flex items-center space-x-2">
        <img src="/LogoKotak.png" alt="Terserah Logo" class="w-22 h-24">
        <div class="flex flex-col ml-6">
          <h1 class="text-6xl font-semibold ml-5">TERSERAH</h1>
          <p class="text-xl ml-auto">Solusi perut bingungmu</p>
        </div>
      </div>
    </header>    

    <!-- Main Content -->
    <main class="flex-grow flex items-center justify-center p-2">
      <div class="flex w-full items-center justify-center">
        <!-- Left Panel (Admin Dashboard) -->
        <div
          class="bg-[#969696] rounded-lg shadow-lg overflow-hidden w-1/3 bg-cover bg-center text-white flex flex-col items-center justify-center py-32"
          style="background-image: url('/admin-dashboard-pic.png')"
        >
          <h2 class="text-6xl font-bold text-center mb-4">Admin</h2>
          <h2 class="text-6xl font-bold text-center mt-3">Dashboard</h2>
        </div>

        <!-- Right Panel (Login Form) -->
        <div class="bg-white rounded-r-lg shadow-lg w-1/3 p-8 flex flex-col justify-center">
          <h3 class="text-3xl font-bold mb-6 ml-4 text-left">Login</h3>
          <form @submit.prevent="loginUser">
            <!-- Username Input -->
            <div class="mb-4 ml-4 flex items-center">
              <img class="inline h-5 md:h-7 mt-5 md:mt-6" src="/public/Menu.png" alt="">
              <input
                type="text"
                v-model="user"
                class="pl-4 text-black md:h-7 h-6 mt-5 md:w-[400px] w-[280px] ml-5 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                placeholder="Username"
                required
              >
            </div>
            <label class="absolute font-bold text-red-500 text-[11px] ml-13" v-if="userEmail">
              Masukkan {{ simbol }} digit karakter (Minimal 12 Karakter)
            </label>
            
            <!-- Password Input -->
            <div class="mb-6 ml-4 flex items-center">
              <img class="inline h-5 md:h-7 ml-1 mt-6 md:mt-7" src="/public/Password.png" alt="">
              <input
                :type="hidePw ? 'text' : 'password'"
                v-model="pw"
                class="pl-4 text-black md:h-7 h-6 mt-6 md:w-[300px] w-[230px] ml-6 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                placeholder="Password"
                required
              >
              <div @click="menuEye" class="ml-5 mt-6 h-7 w-7 cursor-pointer flex items-center justify-center bg-black rounded-xl">
                <ion-icon class="text-white text-xl" :name="hidePw ? 'eye-off' : 'eye'"></ion-icon>
              </div>
            </div>
            <label class="absolute font-bold text-red-500 text-[11px] ml-13" v-if="userPw">
              Masukkan {{ simbols }} digit karakter (Minimal 12 Karakter)
            </label>
            
            <!-- Login Button -->
            <div class="text-right mt-10">
              <button class="w-24 h-8 bg-[#1E1E1E] text-white rounded-2xl hover:bg-slate-300">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      user: '', // Input for username or email
      pw: '',   // Input for password
      loggedIn: false, // Tracks if the user is logged in
      userData: null,  // Stores logged-in user data
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BE}/admin-dashboard/login`, {
          email: this.user,
          password: this.pw,
        });

        if (response.data.message === 'Login successful') {
          console.log("Login response:", response.data);

          // Save the user's name to local state or localStorage
          this.loggedIn = true;
          this.userData = response.data.user; // Save all user data
          this.username = response.data.user.name; // Extract name
          localStorage.setItem('userName', this.username); // Optional: Save to localStorage

          // Redirect to dashboard
          window.location.href = '/admin/dashboard';
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred during login. Please try again.');
      }
    },
  },
};
</script>