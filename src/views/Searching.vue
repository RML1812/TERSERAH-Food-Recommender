<script>
    import SearchTag from '../components/SearchComp/SearchTag.vue';
    import SearchResult from '../components/SearchComp/SearchResult.vue';

    export default {
        components : {
            SearchResult,
            SearchTag
        }
    }
</script>

<template>
    <SearchTag />
    <SearchResult />
</template>