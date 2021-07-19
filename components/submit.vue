<template>
    <input type="submit" :value="value">
</template>

<script>
export default {
    props: ['value']
}
</script>
<style scoped>
    input {
        font-size: 2vw;
        margin-top: 4%;
        cursor: pointer;
        color: white;
        background-color: teal;
        border-style: none;
        padding: 1%;
        border-radius: 5%;
    }
</style>