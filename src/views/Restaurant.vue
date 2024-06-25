<script>
import RestTags from '../components/RestComp/RestTag.vue';
import RestDatas from '../components/RestComp/RestData.vue';
import RestReviews from '../components/RestComp/RestReview.vue';

export default {
    components: {
        RestTags,
        RestDatas,
        RestReviews
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
    <RestTags :restaurantId="restaurantId" />
    <RestDatas :restaurantId="restaurantId" />
    <RestReviews />
</template>
