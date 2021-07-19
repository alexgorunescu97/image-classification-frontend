<template>
    <div id="question-container">
        <p>{{question}}</p>
        <div id="radio-container">
            <radio-input
                v-for="(name, index) in names"
                :key="index"
                :name="name"
                :value="name"/> 
        </div>       
    </div>
</template>

<script>
import radioInput from './radio-input.vue';
export default {
    components: { radioInput },
    props: ['question'],
    data() {
        return {
            names: ['Engineer', 'Doctor', 'Lawyer']
        }
    }
}
</script>

<style scoped>
    #radio-container {
        display: flex;
        justify-content: space-around;
        width: 100%;
    }

    #question-container {
        display: flex;
        flex-direction: column;
        width: 70%;
        color: white;
    }

    p {
        align-self: flex-start;
        font-size: 2vw;
        margin-bottom: 1%;
    }
</style>