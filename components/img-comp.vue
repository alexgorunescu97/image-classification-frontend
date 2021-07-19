<template>
    <img :src="src" alt="">
</template>

<script>
export default {
    props: ['src']
}
</script>

<style scoped>
    img {
        height: 50%;
        width: 50%;
    }
</style>