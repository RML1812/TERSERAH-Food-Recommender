<script>
    import ProfileRest from '../components/ProfileRest/ProfileRest.vue';
    import Navbar from '../components/NavbarFooterRestaurant/Navbar.vue';
    import Footer from '../components/NavbarFooterRestaurant/Footer.vue';

    export default {
        components : {
            Navbar,
            ProfileRest,
            Footer
        }
    }
</script>

<template>
    <Navbar/>
    <ProfileRest />
    <Footer/>
</template>