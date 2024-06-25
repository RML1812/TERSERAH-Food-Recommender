<script>
    import ReserName from '../components/ReserComp/ReserName.vue';
    import ReserTag from '../components/ReserComp/ReserTag.vue';
    import ReserForm from '../components/ReserComp/ReserForm.vue';

    export default {
        components : {
            ReserName,
            ReserForm,
            ReserTag
        },
        data() {
            return {
                restaurantId: null
            };
        },
        created() {
            // Example: Fetching restaurantId from route params
            this.restaurantId = this.$route.params.restaurantId;
            console.log('Restaurant ID:', this.restaurantId); // Debugging line
        }
    };
</script>

<template>
    <ReserName :restaurantId="restaurantId"/>
    <ReserTag />
    <ReserForm />
</template>