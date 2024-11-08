<script>
    import RestaurantKonten from '@/components/RestaurantKonten/RestaurantKonten.vue';
    import Navbar from '../components/NavbarFooterRestaurant/Navbar.vue';
    import Footer from '../components/NavbarFooterRestaurant/Footer.vue';

    export default {
        components : {
            Navbar,
            RestaurantKonten,
            Footer
        }
    }
</script>

<template>
    <Navbar/>
    <RestaurantKonten/>
    <Footer/>
</template>