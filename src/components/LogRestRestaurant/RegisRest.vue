<template>
  <div class="register-form-page min-h-screen flex flex-col"> <!-- Ensures footer is at bottom if content is short -->
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

    <!-- Judul di Luar Card dengan Background Gradient dari Kiri ke Kanan -->
    <div class="header-text mt-10" style="background: linear-gradient(to right, #9CA69C, #636963); text-align: center; padding: 30px; width: 100%;">
      <h1 class="text-5xl text-white font-bold">Usaha-mu mau jadi bagian dari <span class="text-[#C2CFC2] italic">Terserah</span>?</h1>
      <h1 class="text-5xl text-white font-bold mt-4">Isi dulu yuk!</h1>
    </div>

    <!-- Card yang Berisi Form Biodata -->
    <div class="form-card mt-10 flex-grow"> <!-- `flex-grow` helps to push footer down if content is less -->
      <form @submit.prevent="submitForm">
        <!-- Akun Section -->
        <div class="section">
          <h3 class="font-bold"><strong>Akun</strong></h3>
          <div class="grid grid-cols-2 gap-4">
            <!-- Email Input -->
            <div class="form-group">
              <strong>Email</strong>
              <input
                type="email"
                v-model="form.email"
                placeholder="Email Address"
                class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                @input="validateEmail" 
                required
              />
              <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
            </div>
          
            <!-- Password Input -->
            <div class="form-group">
              <strong>Password</strong>
              <div class="flex items-center">
                <input
                  :type="hidePw ? 'password' : 'text'"
                  v-model="form.password"
                  @input="validatePassword"
                  placeholder="Password"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                  required
                />
                <div
                  @click="menuEye"
                  class="ml-3 h-8 w-8 cursor-pointer flex items-center justify-center bg-black rounded-xl"
                >
                  <ion-icon class="text-white text-lg" :name="hidePw ? 'eye-off' : 'eye'"></ion-icon>
                </div>
              </div>
              <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
            </div>
            
            <div class="form-group">
              <strong>Repeat Password</strong>
              <div class="flex items-center">
                <input
                  :type="hideRepeatPw ? 'password' : 'text'"
                  v-model="form.repeatPassword"
                  @input="validateRepeatPassword"
                  placeholder="Repeat Password"
                  class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                  required
                />
                <div
                  @click="menuEyeRepeat"
                  class="ml-3 h-8 w-8 cursor-pointer flex items-center justify-center bg-black rounded-xl"
                >
                  <ion-icon class="text-white text-lg" :name="hideRepeatPw ? 'eye-off' : 'eye'"></ion-icon>
                </div>
              </div>
              <p v-if="repeatPasswordError" class="text-red-500 text-sm mt-1">{{ repeatPasswordError }}</p>
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
                required
              />
            </div>
            <div class="form-group">
              <strong>No. Telepon</strong>
              <input
                type="tel"
                v-model="form.phoneNumber"
                placeholder="No. Telepon"
                class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                required
              />
            </div>
            <div class="form-group">
              <strong>Tipe Usaha</strong>
              <div class="flex items-center space-x-4">
                <input type="radio" v-model="form.businessType" value="UMKM" required /> <span>UMKM</span>
                <input type="radio" v-model="form.businessType" value="Perusahaan" required /> <span>Perusahaan</span>
              </div>
            </div>
            <div class="form-group" :class="{ disabled: form.businessType !== 'Perusahaan' }">
              <strong>Nama Perusahaan</strong>
              <input
                type="text"
                v-model="form.companyName"
                :disabled="form.businessType !== 'Perusahaan'"
                placeholder="Nama Perusahaan"
                class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black transition-all"
              />
            </div>
            <div class="form-group col-span-2">
              <strong>Alamat Lengkap</strong>
              <textarea
                v-model="form.address"
                placeholder="Alamat Lengkap"
                class="pl-4 text-black h-24 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                required
              ></textarea>
            </div>
            <div class="form-group">
              <strong>NPWP</strong>
              <input
                type="text"
                v-model="form.npwp"
                placeholder="NPWP"
                class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                required
              />
            </div>
            <div class="form-group">
              <strong>Foto NPWP</strong>
              <input
                type="text"
                v-model="form.npwpPhoto"
                placeholder="Link Foto NPWP"
                class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                required
              />
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
                required
              />
            </div>
            <div class="form-group">
              <strong>NIK</strong>
              <input
                type="text"
                v-model="form.nik"
                placeholder="NIK"
                class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                required
              />
            </div>
            <div class="form-group">
              <strong>Jenis Kelamin</strong>
              <div class="flex items-center space-x-4">
                <input type="radio" v-model="form.gender" value="Male" required /> <span>Laki-laki</span>
                <input type="radio" v-model="form.gender" value="Female" required /> <span>Perempuan</span>
              </div>
            </div>
            <div class="form-group">
              <strong>Tanggal Lahir</strong>
              <input
                type="date"
                v-model="form.birthDate"
                class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                required
              />
            </div>
            <div class="form-group">
              <strong>No. Handphone</strong>
              <input
                type="tel"
                v-model="form.phoneNumberOwner"
                placeholder="No. Handphone"
                class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                required
              />
            </div>
            <div class="form-group">
              <strong>Domicile</strong>
              <input
                type="text"
                v-model="form.domicile"
                placeholder="Domicile"
                class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                required
              />
            </div>
            <div class="form-group">
              <strong>Foto KTP</strong>
              <input
                type="text"
                v-model="form.ktpPhoto"
                placeholder="Link Foto KTP"
                class="pl-4 text-black h-10 bg-[#D3D3D3] rounded-2xl shadow-sm border-black"
                required
              />
            </div>
          </div>
        </div>

        <!-- Submit Button Aligned to the Right -->
        <div class="flex justify-end">
          <button type="submit" class="mt-5">Sign Up</button>
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
      hideRepeatPw: true,
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
        npwpPhoto: null,
        ownerName: '',
        nik: '',
        gender: '',
        birthDate: '',
        phoneNumberOwner: '',
        domicile: '',
        ktpPhoto: null,
      },
      emailError: '',
      passwordError: '',
      repeatPasswordError: '',
    };
  },
  methods: {
    validateEmail() {
      const validDomains = ['gmail.com', 'yahoo.com', 'company.com', 'apple.com', 'microsoft.com', 'amazon.com', 'google.com', 'facebook.com', 'linkedin.com', 'twitter.com', 'ibm.com', 'adobe.com', 'salesforce.com'];
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(this.form.email)) {
        this.emailError = 'Format email tidak valid.';
        return false;
      }

      const emailDomain = this.form.email.split('@')[1];
      if (!validDomains.includes(emailDomain)) {
        this.emailError = `Email harus menggunakan domain resmi.`;
        return false;
      }

      this.emailError = '';
      return true;
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;

      if (!passwordRegex.test(this.form.password)) {
        this.passwordError = 'Password harus minimal 8 karakter dan mengandung huruf dan angka.';
        return false;
      }

      this.passwordError = '';
      return true;
    },
    validateRepeatPassword() {
      if (this.form.repeatPassword !== this.form.password) {
        this.repeatPasswordError = 'Repeat password harus sama dengan password.';
        return false;
      }

      this.repeatPasswordError = '';
      return true;
    },
    async submitForm() {
      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();
      const isRepeatPasswordValid = this.validateRepeatPassword();

      if (!isEmailValid || !isPasswordValid || !isRepeatPasswordValid) {
        return;
      }

      const payload = {
        email: this.form.email,
        password: this.form.password,
        repeatPassword: this.form.repeatPassword,
        restaurant_name: this.form.businessName,
        phone_number: this.form.phoneNumber,
        business_type: this.form.businessType,
        company_name: this.form.companyName,
        full_address: this.form.address,
        npwp: this.form.npwp,
        npwp_photo: this.form.npwpPhoto,
        full_name: this.form.ownerName,
        nik: this.form.nik,
        gender: this.form.gender,
        birth_date: this.form.birthDate,
        personal_phone: this.form.phoneNumberOwner,
        domicile: this.form.domicile,
        ktp_photo: this.form.ktpPhoto,
      };

      try {
        const response = await axios.post(`${import.meta.env.VITE_BE}/restaurant-dashboard/signup`, payload);
        console.log('Signup successful:', response.data);
        alert('Signup successful! Redirecting...');
        this.$router.push('/restaurant-dashboard/pending');
      } catch (error) {
        console.error('Error during signup:', error.response?.data || error.message);
        alert(`Signup failed: ${error.response?.data?.message || error.message}`);
      }
    },
    menuEye() {
      this.hidePw = !this.hidePw;
    },
    menuEyeRepeat() {
      this.hideRepeatPw = !this.hideRepeatPw;
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

button[type="submit"] {
  width: auto;
  padding: 8px 60px;
  font-size: 16px;
  color: #ffffff;
  background-color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #555;
}

input[type="email"],
input[type="password"],
input[type="text"],
input[type="tel"],
textarea {
  width: 100%;
  max-width: 100%; /* Buat lebar konsisten */
}

.disabled input {
  background-color: #b0b0b0 !important; /* Lebih gelap */
  filter: brightness(85%); /* Reduksi kecerahan */
  cursor: not-allowed; /* Tunjukkan bahwa input tidak dapat diisi */
}
.disabled input:focus {
  outline: none; /* Hilangkan fokus saat di klik */
}

.text-red-500 {
  color: #f56565; /* Warna merah untuk pesan error */
}
.text-sm {
  font-size: 0.875rem; /* Ukuran font kecil */
}
.mt-1 {
  margin-top: 0.25rem; /* Memberikan jarak kecil ke atas */
}
</style>
