<template>
    <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 text-center relative">
        <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none">
          <span class="sr-only">Close</span>
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div class="flex flex-col items-center">
          <div class="">
            <img src="/ceklis.png" alt="Checkmark" class="h-32 w-32 mb-5" />
          </div>
          <h1 class="text-[32px] font-bold mb-2">Reservasimu Berhasil!</h1>
          <a href="/reservasimu" class="text-[20px] font-semibold hover:text-green-700 underline">Pergi ke Reservasi-mu &gt;&gt;</a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      close() {
        this.$router.push('/');
      }
    }
  }
  </script>
  