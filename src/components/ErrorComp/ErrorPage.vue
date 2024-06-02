<template>
    <div class="font-[Poppins]">
        <div class="my-28">
            <div class="flex justify-between lg:mx-44 md:mx-32 sm:mx-24 mx-6">
                <div class=" text-[#525752]">
                    <p class="font-bold lg:text-9xl md:text-8xl sm:text-6xl text-7xl  mb-5">404</p>
                    <p class="font-bold lg:text-3xl md:text-2xl sm:text-xl mb-5">Halaman tidak ditemukan</p>
                    <p class="lg:text-md sm:text-sm text-[11px]  ">Perasaan kita ga punya fitur tersesatin deh :( <br> Sini dibantu agar kembali ke jalan yang benar</p>
                </div>
                <div class="">
                    <img src="/public/Error.png" class="lg:h-64 md:h-44 sm:h-32 h-32" alt="">
                </div>
            </div>
            <RouterLink to="/">
                <div class="mt-20 text-center">
                    <p class="hover:opacity-90 cursor-pointer underline lg:text-3xl md:text-2xl text-xl font-bold text-[#525752]"><< Kembali ke <span class="italic"> Halaman Utama</span></p>
                </div>
            </RouterLink>
        </div>
    </div>
</template>