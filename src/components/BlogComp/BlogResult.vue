<template>
    <div  class="my-10 ">
        <div class="font-[Poppins]">
            <div>
                <div class=" flex-col mx-10 md:mx-20">
                    <div v-for="resto in artikel">  
                        <div class="md:mt-5 mt-4">
                            <div class="cursor-pointer hover:opacity-90 bg-[url('/public/Berita.png')] text-white h-[115px] lg:h-[160px] w-auto text-[15px] bg-cover rounded-3xl shadow-xl border-black">
                                <div class="bg-gradient-to-b border-black-l-neutral-600 from-[#636963] via-transparent to-[#636963] h-[115px] lg:h-[160px] w-auto opacity-100 rounded-3xl shadow-xl border-black">
                                    <div class="ml-7 mt-5">
                                        <div class="pt-5">   
                                            <div class="flex flex-row justify-between">
                                                <h1 class="font-bold lg:text-4xl sm:text-2xl text-xl">{{ resto.name }}</h1>
                                                <h1 class="mr-6 italic">{{ resto.date }}</h1>
                                            </div>
                                            <RouterLink to="/artikel">
                                                <img src="/public/Bawah.png" class="cursor-pointer hover:opacity-90 hover:scale-105 mx-auto lg:mt-16 sm:mt-9 mr-10 float-right h-4 w-10" alt="">
                                            </RouterLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
                <div class="md:mx-20 mx-10 mt-8 font-light">
                    <div class="flex justify-center">
                        <div>
                            <ion-icon @click="menuLefts()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name= "arrow-dropleft-circle"></ion-icon>
                            <ion-icon @click="menuLeft()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name= "arrow-dropleft"></ion-icon>
                        </div>
                        <div>
                            <p class="font-bold text-[16px] mx-14">{{ value }} dari 30</p>
                        </div>
                        <div>
                            <ion-icon @click="menuRight()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name= "arrow-dropright"></ion-icon>
                            <ion-icon @click="menuRights()" class="hover:scale-110 text-2xl h-6 w-6 cursor-pointer " name= "arrow-dropright-circle"></ion-icon>
                        </div>
                    </div>
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
            artikel: [
                {name : "Heboh! Resto Iben Kebakaran", date : "31/05/2024", link: '#'},
                {name : "Heboh! Resto Iben Kebakaran", date : "31/05/2024", link: '#'},
                {name : "Heboh! Resto Iben Kebakaran", date : "31/05/2024", link: '#'},

            ],
            value : 3
        }
    },
    methods: {
        menuLefts(){
            if(this.value >=3 && this.value <=30) {
                this.value = 3
            }
        },
        menuLeft(){
            if(this.value >3 && this.value <=30) {
                this.value-=3
            }
        },
        menuRights(){
            if(this.value >=3 && this.value <=30) {
                this.value = 30
            }
        },
        menuRight(){
            if(this.value >=3 && this.value <30) {
                this.value += 3
            }
        }
    }
    
    }
</script>