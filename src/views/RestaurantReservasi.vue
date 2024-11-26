<script>
    import RestaurantReservasi from '@/components/RestaurantReservasi/RestaurantReservasi.vue';
    import Navbar from '@/components/NavbarFooterRestaurant/Navbar.vue';
    import Footer from '@/components/NavbarFooterRestaurant/Footer.vue';

    export default {
        components : {
            Navbar,
            RestaurantReservasi,
            Footer
        }
    }
</script>

<template>
    <Navbar/>
    <RestaurantReservasi/>
    <Footer/>
</template>