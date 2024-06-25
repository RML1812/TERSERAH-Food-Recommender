<script>
    import RestTags from '../components/RestComp/RestTag.vue';
    import RestDatas from '../components/RestComp/RestData.vue';
    import RestReviews from '../components/RestComp/RestReview.vue';
    export default {
        components : {
            RestTags,
            RestDatas,
            RestReviews
        }
    }
</script>

<template>
    <RestTags />
    <RestDatas />
    <RestReviews />
</template>