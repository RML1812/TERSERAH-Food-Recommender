<script>
    import AdminDashboard from '@/components/AdminDashboard/AdminDashboard.vue';
    import NavbarAdmin from '@/components/NavbarFooterAdmin/NavbarAdmin.vue';
    import FooterAdmin from '../components/NavbarFooterAdmin/FooterAdmin.vue';

    export default {
        components : {
            NavbarAdmin,
            AdminDashboard,
            FooterAdmin
        }
    }
</script>

<template>
    <NavbarAdmin/>
    <AdminDashboard/>
    <FooterAdmin/>
</template>