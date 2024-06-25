<script>
    import BlogTag from '../components/BlogComp/BlogTag.vue';
    import BlogArtikel from '../components/BlogComp/BlogArtikel.vue';
    import BlogResult from '../components/BlogComp/BlogResult.vue';

    export default {
        components : {
            BlogResult,
            BlogTag,
            BlogArtikel
        }
    }
</script>

<template>
    <BlogTag />
    <BlogArtikel />
    <BlogResult />
</template>