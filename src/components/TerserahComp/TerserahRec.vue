<template>
    <div  class="my-10 ">
        <div class="font-[Poppins]">
            <div class="text-left ml-10 md:ml-[80px]">
                <h1 class="font-bold text-3xl ">Hasil dari Kami <span class=" text-[#9CA69C]">untukmu</span></h1>
            </div>
            <div>
                <div class="lg:flex flex  lg:grid-cols-none lg:flex-row flex-col sm:grid-cols-2 sm:grid sm:gap-4  md:justify-between mx-10 md:mx-20">
                    <div v-for="resto in promos">  
                        <div class="md:mt-5 mt-4">
                            <div class="cursor-pointer hover:opacity-90 hover:scale-105 bg-[url('/public/gambar.png')] text-white h-[115px] lg:h-[210px] w-auto text-[15px] bg-cover rounded-3xl shadow-xl border-black">
                                <div class="bg-gradient-to-b border-black-l-neutral-600 from-[#636963] via-transparent to-[#636963] h-[115px] lg:h-[210px] w-auto opacity-100 rounded-3xl shadow-xl border-black">
                                    <div class="ml-7 mt-5">
                                        <div class="pt-5">
                                        <h1 class="font-bold">{{ resto.name }}</h1>
                                        <p class="mt-1 text-[12px] font">Tipe Kuliner</p>
                                        <div class="flex justify-between lg:mt-20">
                                            <p class="mt-3 text-[12px] text-[#f2f2f2] font-medium">Kecamatan</p>
                                            <div class="flex mr-6 lg:mt-5 lg:ml-3">
                                                <img src="/public/Star.png" class="mt-3 h-5 w-5 lg:h-4 lg:w-4" alt="">
                                                <p class="mt-2 text-[16px] text-[#f2f2f2] font-bold">4.2</p>
                                            </div>
                                        </div>

                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                    <div class="mt-4">
                        <div class="hidden lg:flex  cursor-pointer hover:opacity-90 hover:scale-105 bg-[url('/public/gambar.png')] text-white h-[115px] lg:h-[210px] w-auto text-[15px] bg-cover rounded-3xl shadow-xl border-black mx-auto">
                            <div class="bg-gradient-to-b border-black-l-neutral-600 from-[#636963] via-transparent to-[#636963] h-[115px] lg:h-[210px] w-auto opacity-100 rounded-3xl shadow-xl border-black">
                                <div class="ml-7">
                                    <div class="pt-5">
                                        <h1 class="font-bold">Restoran 5</h1>
                                        <p class="mt-1 text-[12px] font">Tipe Kuliner</p>
                                        <div class="flex justify-between lg:mt-20">
                                            <p class="mt-3 text-[12px] text-[#f2f2f2] font-medium">Kecamatan</p>
                                            <div class="flex mr-6 lg:mt-5 lg:ml-3">
                                                <img src="/public/Star.png" class="mt-3 h-5 w-5 lg:h-4 lg:w-4" alt="">
                                                <p class="mt-2 text-[16px] text-[#f2f2f2] font-bold">4.2</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-right md:mr-20 mr-10 mt-4 font-light">
                    <p class="italic text-[13px] cursor-pointer hover:font-medium">>Lihat Selengkapnya</p>
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
            promos: [
                {name : "Restoran 1", link: '#'},
                {name : "Restoran 2", link: '#'},
                {name : "Restoran 3", link: '#'},
                {name : "Restoran 4", link: '#'},
            ]
        }
    }
    
    }
</script>