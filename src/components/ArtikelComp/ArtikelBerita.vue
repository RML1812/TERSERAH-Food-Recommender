<template>
    <div  class="my-10 ">
        <div class="font-[Poppins]">
            <div class="flex flex-row my-10">
                <hr class="border-black w-full mr-10 ml-20 mt-3">
                <p class="text-[#777777] mr-20 text-[14px] font-medium">Dibuat oleh John Doe 31/05/2024</p>
            </div>
            <div class="mx-20 text-center">
                <div class="font-semibold my-10 ">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br><br></p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div class="">
                    <img src="/public/image.png" class="mx-auto" alt="">
                </div>
                <div class="font-semibold my-10 ">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br><br></p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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
                {name : "Restoran 1", price : "Rp. 100.000 - Rp. 900.000", link: '#'},
                {name : "Restoran 2", price : "Rp. 100.000 - Rp. 800.000", link: '#'},
                {name : "Restoran 3", price : "Rp. 100.000 - Rp. 1.000.000", link: '#'},
                {name : "Restoran 4", price : "Rp. 100.000 - Rp. 1.100.000", link: '#'},
                {name : "Restoran 5", price : "Rp. 100.000 - Rp. 800.000", link: '#'},
                {name : "Restoran 6", price : "Rp. 100.000 - Rp. 700.000", link: '#'},
                {name : "Restoran 7", price : "Rp. 100.000 - Rp. 850.000", link: '#'},
                {name : "Restoran 8", price : "Rp. 150.000 - Rp. 900.000", link: '#'},
                {name : "Restoran 9", price : "Rp. 100.000 - Rp. 1.400.000", link: '#'},
                {name : "Restoran 10", price : "Rp. 200.000 - Rp. 1.200.000", link: '#'},
            ],
            value : 10
        }
    },
    methods: {
        menuLefts(){
            if(this.value >=10 && this.value <=100) {
                this.value = 10
            }
        },
        menuLeft(){
            if(this.value >10 && this.value <=100) {
                this.value-=10
            }
        },
        menuRights(){
            if(this.value >=10 && this.value <=100) {
                this.value = 100
            }
        },
        menuRight(){
            if(this.value >=10 && this.value <100) {
                this.value += 10
            }
        }
    }
    
    }
</script>