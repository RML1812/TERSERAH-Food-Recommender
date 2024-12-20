<template>
  <div class="mb-16 font-[Poppins]">
    <div class="h-[1120px] w-auto md:mx-32 mx-10 bg-[#F2F2F2] rounded-xl lg:h-[750px] md:h-[660px] items-center shadow-lg border">
      <div class="pt-5">
        <form @submit.prevent="handleSignup">
          <div class="lg:columns-2 md:columns-2">
            <div class="">
              <div class="pt-8 flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20 md:mr-7" for="">Username</label>
                <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Username" v-model="username" required>
              </div>
              <label for="" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userNama">Masukkan {{ user1 }} digit karakter (Minimal 12 Karakter)</label>
            </div>
            <div class="">
              <div class="pt-8 flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Email Address</label>
                <input type="email" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Email Address" v-model="email" required>
              </div>
              <label for="" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userEmel">{{ emailErrorMessage }}</label>
            </div>
            <div class="">
              <div class="pt-8 flex flex-col relative">
                <label class="font-bold text-[20px] ml-10 lg:ml-20 md:mr-9" for="">Password</label>
                <input :type="passwordFieldType" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Password" v-model="password" required>
                <span @click="togglePasswordVisibility" class="absolute right-12 top-12 lg:top-12 cursor-pointer">
                  <i :class="[passwordFieldType === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash']"></i>
                </span>
              </div>
              <label for="" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userPassword">Masukkan {{ user3 }} digit karakter (Minimal 12 Karakter)</label>
            </div>
            <div class="">
              <div class="pt-8 flex flex-col relative">
                <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Repeat Password</label>
                <input :type="passwordFieldType" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" v-model="passwordRetype" placeholder="Repeat Password" required>
                <span @click="togglePasswordVisibility" class="absolute right-12 top-12 lg:top-12 cursor-pointer">
                  <i :class="[passwordFieldType === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash']"></i>
                </span>
              </div>
              <label for="" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userPwRetype">Password yang dimasukkan tidak sama</label>
              <label for="" class="font-bold absolute text-green-400 text-[12px] ml-12 lg:ml-[86px]" v-if="userCocok">Password Sudah Cocok!!</label>
            </div>
          </div>
          <hr class="mt-10 border-t-4 mx-7">
          <div class="lg:columns-2 md:columns-2">
            <div class="pt-8">
              <label class="ml-10 lg:mx-20 font-bold text-[20px]" for="">Jenis Kelamin</label> <br>
              <div class="md:text-[14px] lg:text-base mx-10">
                <input type="radio" name="choose" class="lg:ml-10 mt-5 rounded-xl bg-[#D3D3D3]" v-model="jenisKelamin" value="Pria">
                <label for="" class="ml-3">Pria</label>
                <input type="radio" name="choose" class="ml-5 lg:ml-10 mt-5 rounded-xl bg-[#D3D3D3]" v-model="jenisKelamin" value="Wanita">
                <label for="" class="ml-3">Wanita</label>
              </div>
            </div>
            <div class="">
              <div class="pt-8 flex flex-col">
                <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">No. Handphone</label>
                <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="No. Handphone" v-model="handphone" required>
              </div>
              <label for="" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userHandphone">Masukkan {{ user4 }} digit karakter (Minimal 10 Karakter)</label>
            </div>
            <div class="pt-8 flex flex-col">
              <label class="ml-10 lg:ml-20 font-bold text-[20px]" for="">Tanggal Lahir</label>
              <input type="date" class="hover:scale-105 w-auto mx-10 lg:mx-20 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" v-model="tanggalLahir" placeholder="DD/MM/YYYY" required>
            </div>
            <div class="pt-8">
              <label class="mx-10 lg:mx-20 font-bold text-[20px]" for="">Domisili</label><br>
              <div class="ml-10 lg:ml-20">
                <select name="Provinsi" id="Provinsi" class="hover:bg-slate-300 mr-1 mt-5 pl-2 lg:w-[90px] md:w-[63px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]" v-model="domisili.provinsi">
                  <option value="">Provinsi</option>
                  <option value="Jawa Barat">Jawa Barat</option>
                </select>
                <select name="Kota" id="Kota" class="hover:bg-slate-300 mr-1 mt-5 pl-2 lg:w-[90px] md:w-[63px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]" v-model="domisili.kota">
                  <option value="">Kota</option>
                  <option value="Bandung">Bandung</option>
                </select>
                <select name="Kec." id="Kec." class="hover:bg-slate-300 mt-5 pl-2 lg:w-[90px] md:w-[63px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]" v-model="domisili.kecamatan">
                  <option value="">Kec.</option>
                  <option value="Jatinangor">Jatinangor</option>
                </select>
              </div>
            </div>
          </div>
          <div class="text-center mt-16 lg:mt-[60px]">
            <button class="w-auto h-10 px-10 bg-[#1E1E1E] text-white rounded-2xl hover:bg-[#5F685F]">Sign-Up</button>
          </div>
        </form>
        <div class="text-center mt-4">
          Atau
        </div>
        <div class="text-center mt-4">
          <button class="w-auto h-10 px-10 bg-black text-white border-2 rounded-2xl hover:bg-gray-700 flex items-center justify-center mx-auto" @click="handleGoogleLogin">
            <img src="https://www.pngmart.com/files/16/official-Google-Logo-PNG-Image.png" alt="Google Logo" class="h-6 w-6 mr-2"/>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    return {
      router
    };
  },
  data() {
    return {
      username: "",
      password: "",
      email: "",
      passwordRetype: "",
      handphone: "",
      jenisKelamin: "",
      tanggalLahir: "",
      domisili: {
        provinsi: "",
        kota: "",
        kecamatan: ""
      },
      userNama: false,
      userPassword: false,
      userEmel: false,
      userPwRetype: false,
      userCocok: false,
      userHandphone: false,
      user1: "",
      user2: "",
      user3: "",
      user4: "",
      emailErrorMessage: "",
      passwordFieldType: "password",
      allowedEmailDomains: ["gmail.com", "apple.com", "microsoft.com", "amazon.com", "google.com", "facebook.com", "linkedin.com", "twitter.com", "ibm.com", "adobe.com", "salesforce.com"]
    };
  },
  watch: {
    username(value) {
      if (value !== "") {
        if (value.length < 12) {
          this.userNama = true;
          this.user1 = 12 - value.length;
        } else {
          this.userNama = false;
        }
      } else {
        this.userNama = false;
      }
    },
    password(value) {
      if (value !== "") {
        if (value.length < 12) {
          this.userPassword = true;
          this.user3 = 12 - value.length;
        } else {
          this.userPassword = false;
        }
      } else {
        this.userPassword = false;
      }
    },
    handphone(value) {
      if (value !== "") {
        if (value.length < 10) {
          this.userHandphone = true;
          this.user4 = 10 - value.length;
        } else {
          this.userHandphone = false;
        }
      } else {
        this.userHandphone = false;
      }
    },
    email(value) {
      const domain = value.split('@')[1];
      const isAcId = domain && domain.endsWith('.ac.id');
      if (value !== "") {
        if (value.length < 12) {
          this.userEmel = true;
          this.user2 = 12 - value.length;
          this.emailErrorMessage = `Masukkan ${this.user2} digit karakter (Minimal 12 Karakter)`;
        } else if (!isAcId && !this.allowedEmailDomains.includes(domain)) {
          this.userEmel = true;
          this.emailErrorMessage = "Email domain is not allowed.";
        } else {
          this.userEmel = false;
          this.emailErrorMessage = "";
        }
      } else {
        this.userEmel = false;
        this.emailErrorMessage = "";
      }
    },
    passwordRetype(value) {
      if ((this.password !== "" && value !== "")) {
        if (this.password.length >= 12 && value.length >= 12) {
          if (value !== this.password) {
            this.userPwRetype = true;
            this.userCocok = false;
          } else {
            this.userCocok = true;
            this.userPwRetype = false;
          }
        }
      } else {
        this.userCocok = false;
        this.userPwRetype = false;
      }
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    },
    async handleSignup() {
      const userData = {
        name: this.username,
        password: this.password,
        repeatPassword: this.passwordRetype,
        email: this.email,
        jenisKelamin: this.jenisKelamin,
        tanggalLahir: this.tanggalLahir,
        noHP: this.handphone,
        domisili: `${this.domisili.provinsi}, ${this.domisili.kota}, ${this.domisili.kecamatan}`
      };

      if (this.userEmel) {
        alert(this.emailErrorMessage);
        return;
      }

      try {
        const response = await axios.post(`${import.meta.env.VITE_BE}/signup`, userData);
        alert(response.data.message);
        if (response.status === 200) {
          this.router.push('/verif');
        }
      } catch (error) {
        console.error("There was an error during the signup process:", error);
        alert(error.response.data.message || "Signup failed. Please try again.");
      }
    },
    handleGoogleLogin() {
      // Handle Google login here
      // This can involve redirecting to your backend's Google OAuth endpoint
      window.location.href = `${import.meta.env.VITE_BE}/auth/google`;
    }
  }
};
</script>
