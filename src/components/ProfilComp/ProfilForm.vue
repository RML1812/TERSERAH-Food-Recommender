<template>
    <div class="mb-16 font-[Poppins] my-16">
      <div class="flex justify-center ml-6">
        <div class="h-[150px] w-40 bg-[#F2F2F2] rounded-2xl shadow-lg border mr-3 flex flex-col">
          <div v-on:click="menuProf" class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] rounded-2xl text-center pt-3 hover:bg-slate-300 cursor-pointer ">
            <p>Profil</p>
          </div>
          <div v-on:click="menuRev" class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] rounded-2xl text-center pt-3 hover:bg-slate-300 cursor-pointer ">
            <p>Reservasi-mu</p>
          </div>
          <div v-on:click="menuWish" class="h-[50px] w-auto lg:text-[16px] md:text-[15px] text-[14px] rounded-2xl text-center pt-3 hover:bg-slate-300 cursor-pointer ">
            <p>Wishlist</p>
          </div>
        </div>
        <div v-if="prof">
          <div class="h-[1120px] w-auto md:mr-32 mr-10  bg-[#F2F2F2] rounded-xl lg:h-[660px]  md:h-[660px] items-center  shadow-lg border">
              <div class="pt-5">
                  <form action="">
                      <div class="lg:columns-2  md:columns-2">
                          <div class="">
                            <div class="pt-8 flex flex-col">
                              <label class=" font-bold text-[20px] ml-10 lg:ml-20 md:mr-7" for="">Username</label>
                              <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Username" v-model="username" required>
                            </div>
                            <label for="" class=" font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userNama">Masukkan {{ user1 }} digit karakter (Minimal 12 Karakter)</label>
                          </div>
                          <div class="">
                            <div class="pt-8 flex flex-col">
                              <label class="font-bold text-[20px] ml-10 lg:ml-20 " for="">Email Address</label>
                              <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Email Address" v-model="email" required>
                            </div>
                            <label for="" class=" font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userEmel">Masukkan {{ user2 }} digit karakter (Minimal 8 Karakter)</label>
                          </div>
                          <div class="">
                            <div class="pt-8 flex flex-col">
                              <label class="font-bold text-[20px] ml-10 lg:ml-20 md:mr-9" for="">Password</label>
                              <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="Password" v-model="password" required>
                            </div>
                            <label for="" class=" font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px]" v-if="userPassword">Masukkan {{ user3 }} digit karakter (Minimal 12 Karakter)</label>
                          </div>
                          <div class="">
                            <div class="pt-8 flex flex-col">
                              <label class="font-bold text-[20px] ml-10 lg:ml-20" for="">Repeat Password</label>
                              <input type="text" class="mx-10 lg:mx-20 hover:scale-105 w-auto mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" v-model="passwordRetype" placeholder="Repeat Password" required>
                            </div>
                            <label for="" class=" font-bold absolute text-red-500 text-[12px] ml-12 lg:ml-[86px] " v-if="userPwRetype">Password yang dimasukkan tidak sama</label>
                            <label for="" class=" font-bold absolute text-green-400 text-[12px] ml-12 lg:ml-[86px] " v-if="userCocok">Password Sudah Cocok!!</label>
                          </div>
                      </div>
                      <hr class="mt-10 border-t-4 mx-7">
                      <div class="lg:columns-2 md:columns-2">
                          <div class="pt-8">
                              <label class="ml-10 lg:mx-20 font-bold text-[20px]" for="">Jenis Kelamin</label> <br>
                              <div class="md:text-[14px] lg:text-base mx-10">
                                  <input type="radio" name="choose" class=" lg:ml-10 mt-5 rounded-xl bg-[#D3D3D3] " >
                                  <label for="" class="ml-3 ">Pria</label>
                                  <input type="radio" name="choose" class="ml-5 lg:ml-10 mt-5 rounded-xl bg-[#D3D3D3] " >
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
                              <input type="date" class="hover:scale-105 w-auto mx-10 lg:mx-20 mt-5 rounded-xl bg-[#D3D3D3] pl-5 py-1" placeholder="DD/MM/YYYY" required>
                            </div>
                          <div class="pt-8">
                              <label class="mx-10 lg:mx-20 font-bold text-[20px]" for="">Domisili</label><br>
                              <div class="ml-10 lg:ml-20">
                                  <select name="Provinsi" id="Provinsi" class="hover:bg-slate-300 mr-1 mt-5 pl-2 lg:w-[90px] md:w-[63px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]">
                                      <option value="" > Provinsi </option>
                                      <option value="Jawa Barat"> Jawa Barat </option>
                                  </select>
                                  <select name="Kota" id="Kota" class="hover:bg-slate-300 mr-1 mt-5 pl-2 lg:w-[90px] md:w-[63px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]">
                                      <option value="" > Kota </option>
                                      <option value="Bandung"> Bandung </option>
                                  </select>
                                  <select name="Kec." id="Kec." class="hover:bg-slate-300 mt-5 pl-2 lg:w-[90px] md:w-[63px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]">
                                      <option value="" > Kec. </option>
                                      <option value="Jatinangor"> Jatinangor </option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div class="text-center mt-16 lg:mt-[60px]">
                          <button class="w-auto h-10 px-10 bg-[#1E1E1E] text-white rounded-2xl hover:bg-[#5F685F]">
                          Sign-Up
                      </button>
                      </div>
                  </form>
              </div>
          </div>
        </div>
        <div v-if="rev">
          <div class="h-[1120px] w-auto md:mr-32 mr-10  bg-[#F2F2F2] rounded-xl lg:h-[660px]  md:h-[660px] items-center  shadow-lg border">

          </div>
        </div>
        <div v-if="wish">
          <div class="h-[1120px] w-auto md:mr-32 mr-10  bg-[#F2F2F2] rounded-xl lg:h-[660px]  md:h-[660px] items-center  shadow-lg border">
            
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  components : {

  },
  data(){
    return {
      username: "",
      password: "",
      email: "",
      passwordRetype: "",
      handphone: "",
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
      prof: true,
      wish: false,
      rev: false
    }
  },

  watch: {
    username(value) {
      if(value != ""){
        if(value.length <12){
          this.userNama = true
          this.user1 = 12 - value.length
        } else {
          this.userNama = false
        }
      } else {
        this.userNama = false
      }
    },

    password(value) {
      if(value != ""){
        if(value.length <12){
          this.userPassword = true
          this.user3 = 12 - value.length
        } else {
          this.userPassword = false
        }
      } else{
        this.userPassword = false
      }
    },

    handphone(value) {
      if(value != ""){
        if(value.length <10){
          this.userHandphone = true
          this.user4 = 10 - value.length
        } else {
          this.userHandphone = false
        }
      } else {
        this.userHandphone = false
      }
    },

    email(value) {
      if(value != ""){
        if(value.length <12){
          this.userEmel = true
          this.user2 = 12 - value.length
        } else {
          this.userEmel = false
        }
      } else {
        this.userEmel = false
      }
    },

    passwordRetype(value) {
      if((this.password != "" && value != "")){
        if(this.password.length >= 12 && value.length >= 12){
          if(value != this.password){
            this.userPwRetype = true
            this.userCocok = false
          }

          else {
            this.userCocok = true
            this.userPwRetype = false
          }
        }
      } else {
        this.userCocok = false
        this.userPwRetype = false
      }
       
    }
  },

  methods: {
    menuProf() {
      this.prof = true,
      this.rev = false,
      this.wish = false
    },
    menuWish() {
      this.prof = false,
      this.rev = false,
      this.wish = true
    },
    menuRev() {
      this.prof = false,
      this.rev = true,
      this.wish = false
    }
  },
}
</script>