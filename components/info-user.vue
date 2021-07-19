<template>
    <h1>{{`${normalizeField(field)}: ${info}`}}</h1>
</template>

<script>
export default {
    props: ['info', 'field'],
    methods: {
        normalizeField(field) {
            return field.split('_')
                        .map(elem => elem[0].toUpperCase() + elem.substring(1))
                        .join(' ');
        }
    }
}
</script>

<style scoped>
    h1 {
        color: white;
        margin: 2% 10%;
        width: 100%
    }
</style>