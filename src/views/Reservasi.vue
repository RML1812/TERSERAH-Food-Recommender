<script>
    import ReserName from '../components/ReserComp/ReserName.vue';
    import ReserTag from '../components/ReserComp/ReserTag.vue';
    import ReserForm from '../components/ReserComp/ReserForm.vue';

    export default {
        components : {
            ReserName,
            ReserForm,
            ReserTag
        }
    }
</script>

<template>
    <ReserName />
    <ReserTag />
    <ReserForm />
</template>