<template>
  <div class="min-h-screen bg-[#f5f1eb] flex flex-col"> <!-- Main container with full-screen height -->
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
          class="bg-[#969696] rounded-lg shadow-lg overflow-hidden w-1/3 bg-cover bg-center text-white flex flex-col items-center justify-center py-16"
          style="background-image: url('/admin-dashboard-pic.png')"
        >
          <h2 class="text-6xl font-bold text-center mb-4">Restaurant</h2>
          <h2 class="text-6xl font-bold text-center mt-3">Dashboard</h2>
          <h3 class="text-xl font-semibold text-center mt-8">Atur dan pantau semua hal <br>mengenai restaurant-mu disini!</h3>
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

    <!-- Bottom Panel -->
    <div
      class="bg-center h-auto p-6 flex flex-col items-center justify-center"
      style="background-image: url('/gambar-register-restaurant.png');"
    >
      <h3 class="text-5xl font-bold text-white text-center mb-4">Bergabung-lah dan menjadi</h3>
      <h3 class="text-5xl font-bold text-white text-center mt-3 mb-4">
        bagian dari <span class="text-[#C2CFC2] italic">Terserah</span>!
      </h3>
      <p class="text-lg font-bold text-white text-center mb-6 mt-3">Mulai dari buat akun restaurant-mu</p>
      <button class="bg-white text-black rounded-xl py-1 px-16 hover:bg-slate-300">
        Sign Up
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LoginPage',
  setup() {
    const user = ref('');
    const pw = ref('');
    const hidePw = ref(false);
    const simbol = ref(12); // Minimum karakter untuk username
    const simbols = ref(12); // Minimum karakter untuk password
    const userEmail = ref(false); // Kondisi untuk menampilkan pesan validasi username
    const userPw = ref(false); // Kondisi untuk menampilkan pesan validasi password

    const loginUser = () => {
      console.log('Login attempted with:', user.value, pw.value);
      // Implement actual login logic here
    };

    const menuEye = () => {
      hidePw.value = !hidePw.value;
    };

    return {
      user,
      pw,
      hidePw,
      simbol,
      simbols,
      userEmail,
      userPw,
      loginUser,
      menuEye,
    };
  },
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
}

.min-h-screen {
  min-height: 100vh; /* Ensures the page takes up full viewport height */
}

.flex-grow {
  flex-grow: 1; /* Allows main content to expand as needed without adding scroll */
}
</style>
