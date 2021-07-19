<template>
    <div>
        <input type="radio" name="Profession" :value="name" @input="setRadio" required>
        <label for="Profession">{{name}}</label>
    </div>
</template>
<script>
export default {
    props: ['name'],
    methods: {
        setRadio(event) {
            this.$store.commit('changeRadio', event.target.value);
        }
    }
}
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 2vw;
    }
</style>