<template>
  <div class="mb-16 font-[Poppins] my-16">
    <div class="flex justify-center ml-6">
      <div class="h-[200px] w-40 bg-[#F2F2F2] rounded-2xl shadow-lg border mr-3 flex flex-col">
        <RouterLink to="/profil">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] bg-[#DBDBDB] text-[14px] rounded-t-2xl text-center pt-3 cursor-pointer">
            <p>Profil</p>
          </div>
        </RouterLink>
        <RouterLink to="/reservasimu">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer">
            <p>Reservasi-mu</p>
          </div>
        </RouterLink>
        <RouterLink to="/wishlist">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer">
            <p>Wishlist</p>
          </div>
        </RouterLink>
        <RouterLink to="/review">
          <div class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] rounded-b-2xl text-center pt-3 hover:bg-[#DBDBDB] cursor-pointer">
            <p>Review-mu</p>
          </div>
        </RouterLink>
      </div>
      <div class="h-[1120px] w-auto md:mr-32 mr-10 bg-[#F2F2F2] rounded-xl lg:h-[660px] md:h-[660px] items-center shadow-lg border">
        <div class="pt-5">
          <form @submit.prevent="saveChanges">
            <div class="lg:columns-2 md:columns-2">
              <div>
                <div class="pt-8 flex flex-col">
                  <label class="font-bold text-[20px] ml-10 lg:ml-20 md:mr-7" for="">Username</label>
                  <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Username" v-model="name" required>
                </div>
                <label v-if="userNama" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]">Masukkan {{ user1 }} digit karakter (Minimal 12 Karakter)</label>
              </div>
              <div>
                <div class="pt-8 flex flex-col">
                  <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Email Address</label>
                  <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Email Address" v-model="email" required>
                </div>
                <label v-if="userEmel" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]">Masukkan {{ user2 }} digit karakter (Minimal 8 Karakter)</label>
              </div>
              <div>
                <div class="pt-8 flex flex-col">
                  <label class="font-bold text-[20px] ml-10 lg:ml-20 md:mr-9" for="">Password</label>
                  <input type="password" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Password" v-model="password" required>
                </div>
                <label v-if="userPassword" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]">Masukkan {{ user3 }} digit karakter (Minimal 12 Karakter)</label>
              </div>
              <div>
                <div class="pt-8 flex flex-col">
                  <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Repeat Password</label>
                  <input type="password" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" v-model="passwordRetype" placeholder="Repeat Password" required>
                </div>
                <label v-if="userPwRetype" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]">Password yang dimasukkan tidak sama</label>
                <label v-if="userCocok" class="font-bold absolute text-green-400 text-[12px] ml-12 lg:ml-[86px]">Password Sudah Cocok!!</label>
              </div>
            </div>
            <hr class="mt-10 border-t-4 mx-7">
            <div class="lg:columns-2 md:columns-2">
              <div class="pt-8">
                <label class="ml-10 lg:mx-20 font-bold text-[20px]" for="">Jenis Kelamin</label> <br>
                <div class="md:text-[14px] lg:text-base mx-10">
                  <input type="radio" name="choose" class="lg:ml-10 mt-5 rounded-xl bg-[#D3D3D3]" v-model="jenisKelamin" value="Laki-laki">
                  <label class="ml-3">Laki-laki</label>
                  <input type="radio" name="choose" class="ml-5 lg:ml-10 mt-5 rounded-xl bg-[#D3D3D3]" v-model="jenisKelamin" value="Perempuan">
                  <label class="ml-3">Perempuan</label>
                </div>
              </div>
              <div>
                <div class="pt-8 flex flex-col">
                  <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">No. Handphone</label>
                  <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="No. Handphone" v-model="noHP" required>
                </div>
                <label v-if="userHandphone" class="font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]">Masukkan {{ user4 }} digit karakter (Minimal 10 Karakter)</label>
              </div>
              <div class="pt-8 flex flex-col">
                <label class="ml-10 lg:ml-20 font-bold text-[20px]" for="">Tanggal Lahir</label>
                <input type="date" class="hover:scale-105 w-auto mx-10 lg:mx-20 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" v-model="tanggalLahir" placeholder="DD/MM/YYYY" required>
              </div>
              <div class="pt-8">
                <div class="pt-8">
                  <label class="mx-10 lg:mx-20 font-bold text-[20px]" for="domisili">Domisili</label><br>
                  <div class="ml-10 lg:ml-20">
                    <select name="Provinsi" id="Provinsi" class="hover:bg-slate-300 mr-1 mt-5 pl-2 lg:w-[90px] md:w-[63px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]" v-model="domisili.provinsi" required>
                      <option value="">Provinsi</option>
                      <option value="Jawa Barat">Jawa Barat</option>
                      <!-- Add other provinces as needed -->
                    </select>
                    <select name="Kota" id="Kota" class="hover:bg-slate-300 mr-1 mt-5 pl-2 lg:w-[90px] md:w-[63px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]" v-model="domisili.kota" required>
                      <option value="">Kota</option>
                      <option value="Bandung">Bandung</option>
                      <!-- Add other cities as needed -->
                    </select>
                    <select name="Kecamatan" id="Kecamatan" class="hover:bg-slate-300 mt-5 pl-2 lg:w-[90px] md:w-[63px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]" v-model="domisili.kecamatan" required>
                      <option value="">Kecamatan</option>
                      <option value="Jatinangor">Jatinangor</option>
                      <!-- Add other districts as needed -->
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-16 lg:mt-[60px]">
              <button class="w-auto h-10 px-10 bg-[#1E1E1E] text-white rounded-2xl hover:bg-[#5F685F]">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button class="w-auto h-10 px-10 ml-16 mt-14 bg-[#997380] text-white rounded-2xl hover:bg-[#5F685F]" @click="logout">
        Log Out
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordRetype: "",
      noHP: "",
      jenisKelamin: "",
      tanggalLahir: "",
      domisili: "",
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
    }
  },
methods: {
  async fetchUserData() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BE}/user/${this.$route.params.id}`);
      if (response.status === 200) {
        const userData = response.data.userLogin; // Corrected part to access userLogin instead of user
        if (userData) {
          this.name = userData.name;
          this.email = userData.email;
          this.noHP = userData.noHP;
          this.jenisKelamin = userData.jenisKelamin;
          this.tanggalLahir = userData.tanggalLahir;
          this.domisili = userData.domisili;
        } else {
          console.error("User data is undefined:", response.data);
        }
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  },
  async saveChanges() {
    try {
      const userData = {
        name: this.name,
        email: this.email,
        noHP: this.noHP,
        jenisKelamin: this.jenisKelamin,
        tanggalLahir: this.tanggalLahir,
        domisili: this.domisili
      };
      
      const response = await axios.post(`${import.meta.env.VITE_BE}/update`, userData);
      if (response.status === 200) {
        console.log('Changes saved successfully:', response.data);
        window.location.reload();
        // Additional success handling logic here
      } else {
        console.error("Failed to save changes");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  },
  async logout() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BE}/logout`);
      console.log('Logout successful:', response.data);
      window.location.href = '/';
      // Additional logout handling logic here
    } catch (error) {
      console.error('Error logging out:', error);
      // Error handling logic here
    }
  }
},

  watch: {
    name(value) {
      if (value != "") {
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
      if (value != "") {
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
    noHP(value) {
      if (value != "") {
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
      if (value != "") {
        if (value.length < 12) {
          this.userEmel = true;
          this.user2 = 12 - value.length;
        } else {
          this.userEmel = false;
        }
      } else {
        this.userEmel = false;
      }
    },
    passwordRetype(value) {
      if (this.password != "" && value != "") {
        if (this.password.length >= 12 && value.length >= 12) {
          if (value != this.password) {
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
  mounted() {
    this.fetchUserData();
  }
}
</script>

