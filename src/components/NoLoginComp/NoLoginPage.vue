<template>
    <div class="font-[Poppins]">
      <div class="my-28">
        <div class="flex justify-between lg:mx-44 md:mx-32 sm:mx-24 mx-6">
          <div class=" text-[#525752]">
            <p class="font-bold lg:text-5xl md:text-4xl sm:text-3xl text-4xl  mb-5">Belum Login</p>
            <div>
              <p class="lg:text-md sm:text-sm text-[11px] ">Kamu mencoba mengakses fitur yang perlu login nih, Login dulu yuk, ada di bagian atas!!</p>
              <p class="lg:text-md sm:text-sm text-[11px]  ">Belum punya akun? Sign Up juga ada di bagian atas ya~</p>
            </div>
          </div>
          <div class="">
            <img src="/public/Error.png" class="lg:h-64 md:h-44 sm:h-32 h-32" alt="">
          </div>
        </div>
        <p @click="goBack" class="text-center hover:opacity-90 cursor-pointer underline lg:text-3xl md:text-2xl text-xl font-bold text-[#525752] mt-4">Kembali</p>
        <div class="mt-10 text-center">
          <RouterLink to="/">
            <p class="hover:opacity-90 cursor-pointer underline lg:text-2xl md:text-2xl text-xl font-bold text-[#525752]"><< Kembali ke <span class="italic"> Halaman Utama</span></p>
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1);
      }
    }
  };
  </script>
  