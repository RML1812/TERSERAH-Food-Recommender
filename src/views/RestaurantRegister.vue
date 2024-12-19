<script>
    import RegisRest from '../components/LogRestRestaurant/RegisRest.vue';
    import Footer from '@/components/NavbarFooterRestaurant/Footer.vue';

    export default {
        components : {
            RegisRest,
            Footer
        }
    }
</script>

<template>
    <Navbar />
    <RegisRest />
    <Footer />
</template>