<script>
    import AdminReview from '@/components/AdminReview/AdminReview.vue';
    import NavbarAdmin from '@/components/NavbarFooterAdmin/NavbarAdmin.vue';
    import FooterAdmin from '../components/NavbarFooterAdmin/FooterAdmin.vue';

    export default {
        components : {
            NavbarAdmin,
            AdminReview,
            FooterAdmin
        }
    }
</script>

<template>
    <NavbarAdmin/>
    <AdminReview/>
    <FooterAdmin/>
</template>