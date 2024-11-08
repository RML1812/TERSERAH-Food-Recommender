<script>
    import PendingDashboard from '../components/RestDashboard/DasboardPending.vue';
    import Navbar from '../components/NavbarFooterRestaurant/Navbar.vue';
    import Footer from '../components/NavbarFooterRestaurant/Footer.vue';
    import DasboardFailed from '@/components/RestDashboard/DasboardFailed.vue';
    import MainDashboard from '@/components/RestDashboard/MainDashboardRest.vue';

    export default {
        components : {
            Navbar,
            MainDashboard,
            Footer
        }
    }
</script>

<template>
    <Navbar/>
    <MainDashboard/>
    <Footer/>
</template>