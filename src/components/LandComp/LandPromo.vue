<template>
    <div class=" mb-9 font-[Poppins]">
        <div class="cursor-pointer hover:opacity-90 hover:scale-105 bg-[url('/public/Promo.png')] text-white h-[125px] w-auto text-[15px] pl-10  rounded-3xl shadow-xl border mx-10 md:mx-20">
            <div class="">
                <div class="flex justify-between">
                    <h1 class="font-bold tracking-wide mt-4 ml-12 text-[17px] md:hidden"> Bingung?</h1>
                    <h1 class="font-bold tracking-wide mt-4 ml-12 md:text-[26px] lg:text-[28px] hidden md:flex"> Bingung Mau Makan Apa?</h1>
                    <div class="flex mr-[70px]">
                        <img src="/public/Logo-White.png" class="hover:opacity-90 hover:scale-110" alt="">
                        <RouterLink to="/terserah">
                            <img src="/public/Arrow.png" class="hover:opacity-90 hover:scale-110 h-6 mt-5 ml-2" alt="">
                        </RouterLink>
                    </div>
                </div>
                <h1 class="hover:opacity-90 hover:scale-105 font-bold text-4xl ml-12"><span class="text-[#C2CFC2]">Terserahin!</span> Aja</h1>
            </div>
        </div>
    </div>
</template>