<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-lg w-3/4 md:w-1/2">
        <h2 class="text-2xl font-bold mb-4">Detail Reservasi</h2>
        <p>Nama: {{ reservation.name }}</p>
        <p>Jumlah Orang: {{ reservation.jumlahOrang }}</p>
        <p>No HP: {{ reservation.noHP }}</p>
        <p>Tanggal Reservasi: {{ reservation.tanggalReservation }}</p>
        <p>Waktu Mulai: {{ reservation.waktuMulai }}</p>
        <p>Waktu Selesai: {{ reservation.waktuSelesai }}</p>
        <p>Total Harga: Rp {{ reservation.totalHarga | currency }}</p>
        <button @click="pay" class="mt-4 w-full bg-green-500 text-white py-2 rounded">Bayar Sekarang</button>
        <button @click="$emit('close')" class="mt-2 w-full bg-red-500 text-white py-2 rounded">Batal</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      reservation: Object,
      restaurantId: String
    },
    data() {
      return {
        userId: null,
        loading: true
      };
    },
    async mounted() {
      const script = document.createElement('script');
      script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
      script.type = 'text/javascript';
      script.setAttribute('data-client-key', 'SB-Mid-client-JJl5Mc6jLmJCyn-q');
      document.head.appendChild(script);
  
      try {
        const response = await axios.get(`${import.meta.env.VITE_BE}/user/${this.$route.params.id}`);
        if (response.status === 200) {
          this.userId = response.data.userLogin;
          this.loading = false;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    methods: {
      async pay() {
        if (this.loading || !this.userId) {
          console.error('User ID not available or still loading');
          return;
        }
  
        try {
          const reservationData = {
            ...this.reservation,
            user_id: this.userId,
            restaurant_id: this.restaurantId
          };
  
          const response = await axios.post(`${import.meta.env.VITE_BE}/save-reservation`, reservationData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          const data = response.data;
  
          // Retrieve the transaction token from the server-side
          const tokenResponse = await axios.get(`${import.meta.env.VITE_BE}/get-transaction-token?reservation_id=${data._id}`);
          const tokenData = tokenResponse.data;
  
          if (tokenData && tokenData.transactionToken) {
            window.snap.pay(tokenData.transactionToken, {
              onSuccess: function(result) {
                window.location.href = `${import.meta.env.VITE_BE}/payment/finish?reservation_id=${data._id}`;
              },
              onPending: function(result) {},
              onError: function(result) {},
              onClose: function() {}
            });
          } else {
            console.error('Transaction token is missing.');
          }
        } catch (error) {
          console.error('Error processing payment:', error);
        }
      }
    },
    filters: {
      currency(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
    }
  };
  </script>
  