<template>
    <div class="register-form-page min-h-screen flex flex-col">
      <!-- Header -->
      <header class="header p-4 flex justify-center mt-5">
        <div class="flex items-center space-x-2">
          <img src="/LogoKotak.png" alt="Terserah Logo" class="w-22 h-24" />
          <div class="flex flex-col ml-6">
            <h1 class="text-6xl font-semibold ml-5">TERSERAH</h1>
            <p class="text-xl ml-auto">Solusi perut bingungmu</p>
          </div>
        </div>
      </header>
  
      <!-- Judul di Luar Card -->
      <div
        class="header-text mt-10"
        style="background: linear-gradient(to right, #9CA69C, #636963); text-align: center; padding: 30px; width: 100%;"
      >
        <h1 class="text-5xl text-white font-bold">Perbaiki Data Usaha-Mu</h1>
      </div>
  
      <!-- Card yang Berisi Form -->
      <div class="form-card mt-10 flex-grow">
        <form @submit.prevent="submitForm">
          <!-- Akun Section -->
          <div class="section">
            <h3 class="font-bold"><strong>Akun</strong></h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="mb-4 ml-4 flex flex-col">
                <strong>Email</strong>
                <input
                  type="email"
                  v-model="form.email"
                  class="pl-4 text-black md:h-7 h-6 mt-1 md:w-[400px] w-[280px] bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                  placeholder="Email Address"
                  disabled
                />
              </div>
  
              <div class="mb-4 ml-4 flex flex-col">
                <strong>Password</strong>
                <div class="flex items-center">
                  <input
                    :type="hidePw ? 'password' : 'text'"
                    v-model="form.password"
                    class="pl-4 text-black md:h-7 h-6 mt-1 md:w-[300px] w-[230px] bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                    placeholder="Password"
                  />
                  <div
                    @click="menuEye"
                    class="ml-3 h-6 w-6 cursor-pointer flex items-center justify-center bg-black rounded-xl"
                  >
                    <ion-icon class="text-white text-lg" :name="hidePw ? 'eye-off' : 'eye'"></ion-icon>
                  </div>
                </div>
              </div>
  
              <div class="mb-4 ml-4 flex flex-col">
                <strong>Repeat Password</strong>
                <input
                  type="password"
                  v-model="form.repeatPassword"
                  class="pl-4 text-black md:h-7 h-6 mt-1 md:w-[400px] w-[280px] bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                  placeholder="Repeat Password"
                />
              </div>
            </div>
          </div>
  
          <!-- Badan Usaha Section -->
          <div class="section">
            <h3 class="font-bold mt-20">Badan Usaha</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <strong>Nama Usaha</strong>
                <input
                  type="text"
                  v-model="form.businessName"
                  placeholder="Nama Usaha"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                />
              </div>
              <div class="form-group">
                <strong>No. Telepon</strong>
                <input
                  type="tel"
                  v-model="form.phoneNumber"
                  placeholder="No. Telepon"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                />
              </div>
              <div class="form-group">
                <strong>Tipe Usaha</strong>
                <div class="flex items-center space-x-4">
                  <input type="radio" v-model="form.businessType" value="UMKM" /> <span>UMKM</span>
                  <input type="radio" v-model="form.businessType" value="Perusahaan" /> <span>Perusahaan</span>
                </div>
              </div>
              <div class="form-group">
                <strong>Nama Perusahaan</strong>
                <input
                  type="text"
                  v-model="form.companyName"
                  placeholder="Nama Perusahaan"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                />
              </div>
              <div class="form-group col-span-2">
                <strong>Alamat Lengkap</strong>
                <textarea
                  v-model="form.address"
                  placeholder="Alamat Lengkap"
                  class="pl-4 text-black h-24 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                ></textarea>
              </div>
            </div>
          </div>
  
          <!-- Identitas Pemilik Section -->
          <div class="section">
            <h3 class="font-bold mt-20">Identitas Pemilik</h3>
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <strong>Nama Lengkap</strong>
                <input
                  type="text"
                  v-model="form.ownerName"
                  placeholder="Nama Lengkap"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                />
              </div>
              <div class="form-group">
                <strong>NIK</strong>
                <input
                  type="text"
                  v-model="form.nik"
                  placeholder="NIK"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                />
              </div>
              <div class="form-group">
                <strong>Jenis Kelamin</strong>
                <div class="flex items-center space-x-4">
                  <input type="radio" v-model="form.gender" value="Male" /> <span>Laki-laki</span>
                  <input type="radio" v-model="form.gender" value="Female" /> <span>Perempuan</span>
                </div>
              </div>
              <div class="form-group">
                <strong>Tanggal Lahir</strong>
                <input
                  type="date"
                  v-model="form.birthDate"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                />
              </div>
              <div class="form-group">
                <strong>No. Handphone</strong>
                <input
                  type="tel"
                  v-model="form.phoneNumberOwner"
                  placeholder="No. Handphone"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                />
              </div>
              <div class="form-group">
                <strong>Domicile</strong>
                <input
                  type="text"
                  v-model="form.domicile"
                  placeholder="Domisili"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                />
              </div>
              <div class="form-group col-span-2">
                <strong>Foto KTP</strong>
                <input
                  type="text"
                  v-model="form.ktpPhoto"
                  placeholder="Link Foto KTP"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                />
              </div>
            </div>
          </div>
  
          <!-- Submit Button -->
          <div class="flex justify-end">
            <button type="submit" class="mt-5">Update</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        hidePw: true,
        form: {
          email: '',
          password: '',
          repeatPassword: '',
          businessName: '',
          phoneNumber: '',
          businessType: '',
          companyName: '',
          address: '',
          npwp: '',
          npwpPhoto: '',
          ownerName: '',
          nik: '',
          gender: '',
          birthDate: '',
          phoneNumberOwner: '',
          domicile: '',
          ktpPhoto: '',
        },
        statusMessage: '', // Untuk menyimpan status hasil pengecekan
      };
    },
    async created() {
      await this.checkAccountStatus();
    },
    methods: {
      async checkAccountStatus() {
        try {
          const response = await axios.get('http://localhost:3000/api/restaurant-dashboard/status');
          if (response.data.status === 'Active') {
            this.statusMessage = 'Akun Anda sekarang sudah Active.';
          } else if (response.data.status === 'Pending') {
            this.statusMessage = 'Akun Anda sedang dalam status Pending.';
          } else if (response.data.status === 'Failed' && response.data.data) {
            // Pre-fill form with all data from TempRejectedRestaurant
            const tempData = response.data.data;
            this.form.email = tempData.email;
            this.form.password = ''; // Password tidak dikembalikan demi keamanan
            this.form.repeatPassword = ''; // Kosong untuk diisi ulang
            this.form.businessName = tempData.restaurant_name;
            this.form.phoneNumber = tempData.phone_number;
            this.form.businessType = tempData.business_type;
            this.form.companyName = tempData.company_name || ''; // Optional field
            this.form.address = tempData.full_address;
            this.form.npwp = tempData.npwp;
            this.form.npwpPhoto = tempData.npwp_photo;
            this.form.ownerName = tempData.full_name;
            this.form.nik = tempData.nik;
            this.form.gender = tempData.gender;
            this.form.birthDate = tempData.birth_date ? tempData.birth_date.split('T')[0] : ''; // Hanya ambil tanggal
            this.form.phoneNumberOwner = tempData.personal_phone;
            this.form.domicile = tempData.domicile;
            this.form.ktpPhoto = tempData.ktp_photo;
            this.statusMessage = 'Akun Anda masih dalam status Failed. Silakan perbaiki data.';
          } else {
            console.error('Account data is not available or status is not Failed.');
          }
        } catch (error) {
          console.error('Error fetching account status:', error.response?.data || error.message);
        }
      },
      async submitForm() {
        try {
          const payload = { ...this.form };
          const response = await axios.put('http://localhost:3000/api/restaurant-dashboard/update', payload);
          alert('Update successful!');
  
          // Cek kembali status setelah update
          await this.checkAccountStatus();
  
          // Tampilkan status setelah update
          alert(this.statusMessage);
  
          // Jika status Active, navigasi ke dashboard
          if (this.statusMessage.includes('Active')) {
            this.$router.push('/restaurant/dashboard');
          }

          this.$router.push('/restaurant/dashboard');
        } catch (error) {
          console.error('Error updating account:', error.response?.data || error.message);
          alert(`Update failed: ${error.response?.data || error.message}`);
        }
      },
      menuEye() {
        this.hidePw = !this.hidePw;
      },
    },
  };
  </script>
  
  
  <style scoped>
.register-form-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  padding-bottom: 100px; /* Ensures enough space above the fixed footer */
}

.header {
  width: 100%;
}

.header-text {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
}

.form-card {
  width: 100%;
  max-width: 1200px;
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.section {
  margin-bottom: 20px;
}

.section h3 {
  font-size: 18px;
  color: #444;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

input, textarea {
  font-size: 14px;
  padding: 10px;
}

textarea {
  resize: none; /* Prevent resizing of textareas */
}

button[type="submit"] {
  width: auto;
  padding: 8px 60px;
  font-size: 16px;
  color: #ffffff;
  background-color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #555;
}

button.settings-button {
  background-color: #636963;
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.settings-button:hover {
  background-color: #9CA69C;
}

.lock-icon img {
  width: 50px;
  height: 50px;
}

.disabled input {
  background-color: #e0e0e0;
  cursor: not-allowed;
}
</style>

  