<script>
    import LandTags from '../components/LandComp/LandTag.vue';
    import LandRecs from '../components/LandComp/LandRec.vue';
    import LandPromos from '../components/LandComp/LandPromo.vue';
    import LandArtikels from '../components/LandComp/LandArtikel.vue';

    export default {
        components : {
            LandTags,
            LandRecs,
            LandPromos,
            LandArtikels
        }
    }
</script>

<template>
    <LandTags />
    <LandRecs />
    <LandPromos />
    <LandArtikels />
</template>