<script>
    import TerserahTags from '../components/TerserahComp/TerserahTag.vue';
    import TerserahRecs from '../components/TerserahComp/TerserahRec.vue';
    import TerserahAbouts from '../components/TerserahComp/TerserahAbout.vue';

    export default {
        components : {
            TerserahTags,
            TerserahRecs,
            TerserahAbouts
        }
    }
</script>

<template>
    <TerserahTags />
    <TerserahRecs />
    <TerserahAbouts />
</template>