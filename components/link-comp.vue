<template>
    <nuxt-link class='link-class' :to="`/${page}`">{{page === '/' ? 'Log out' : page[0].toUpperCase() + page.substring(1)}}</nuxt-link>
</template>
<script>
export default {
    props: ['page']
}
</script>

<style scoped>
    .link-class {
        font-size: 2vw;
        margin: 0 1%;
        cursor: pointer;
        text-decoration: none;
        color: rgb(201, 153, 153);
    }

    .link-class:hover {
        text-decoration: underline;
    }
</style>