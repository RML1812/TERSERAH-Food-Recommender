<script>
    import RestaurantReservasi from '@/components/RestaurantReservasi/RestaurantReservasi.vue';
    import Navbar from '@/components/NavbarFooterRestaurant/Navbar.vue';

    export default {
        components : {
            Navbar,
            RestaurantReservasi,
        }
    }
</script>

<template>
    <Navbar/>
    <RestaurantReservasi/>
</template>