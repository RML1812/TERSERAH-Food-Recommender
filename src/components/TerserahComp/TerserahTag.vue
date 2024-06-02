<template>
    <div class="mt-14 mb-10 font-[Poppins]">
        <div class=" bg-[url('/public/Promo.png')]  h-auto  md:mx-20 mx-10 lg:w-auto text-center bg-cover rounded-2xl py-10">
            <div class="mx-10 pb-8 lg:pb-10 text-white">
                <h1 class="font-bold text-[36px] mx:10 sm:text-[38px] md:text-[40px] lg:text-[48px]">Hasilkan <span class="text-[#C2CFC2] italic">Terserahin</span>-mu!?</h1>
            </div>
            <form action="">
                <div class="">
                    <select name="Provinsi" id="Provinsi" class="italic text-center mr-3 lg:w-[120px] h-6 md:w-[100px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]">
                        <option value="" > Provinsi </option>
                        <option value="Jawa Barat"> Jawa Barat </option>
                    </select>
                    <select name="Kota" id="Kota" class="italic text-center mr-3 lg:w-[120px] h-6 md:w-[100px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]">
                        <option value="" > Kota </option>
                        <option value="Bandung"> Bandung </option>
                    </select>
                    <select name="Kec." id="Kec." class="italic text-center lg:w-[120px] h-6 md:w-[100px] shadow-md border-md rounded-sm bg-[#D3D3D3] text-[14px]">
                        <option value="" > Kec. </option>
                        <option value="Jatinangor"> Jatinangor </option>
                    </select>
                </div>
                <div>
                    <div class="text-center mt-10 lg:mt-[50px]">
                        <button class="w-auto lg:h-8 sm:h-7 h-6 px-10 bg-[#F2F2F2] text-black rounded-2xl hover:bg-slate-300">
                            Generate
                        </button>
                    </div>
                </div>
            </form>    
        </div>
    </div>
</template>

<script>

export default {
  components : {

  },
  data(){


  },

  methods : {
    
  },
}
</script>